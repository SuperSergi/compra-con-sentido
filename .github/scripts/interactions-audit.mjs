import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser = await chromium.launch({headless:true});
const base='http://127.0.0.1:4173';
try {
 for (const width of [390,1440]) {
  for (const hostname of ['compraconsentido.es','preview.example']) {
   const context=await browser.newContext({viewport:{width,height:900}});
   let analyticsRequests=0;
   // Simulate production locally. Never send test events to GA or clicks to Amazon.
   await context.route('**/*',async route=>{
    const url=new URL(route.request().url());
    if(url.hostname===hostname){const response=await route.fetch({url:base+url.pathname+url.search});await route.fulfill({response});}
    else if(url.hostname==='www.googletagmanager.com'){analyticsRequests++;await route.fulfill({contentType:'application/javascript',body:'/* GA stub: no network events */'});}
    else await route.abort();
   });
   const page=await context.newPage();
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(()=>document.addEventListener('click',e=>{if(e.target.closest('a[href*="amazon.es"],a[href*="amzn.to"]'))e.preventDefault()},true));
   const path='/herramientas/amoladoras-a-bateria/';
   const visit=()=>page.goto('https://'+hostname+path,{waitUntil:'networkidle'});
   const events=()=>page.evaluate(()=>Array.from(window.dataLayer||[],x=>Array.from(x)).filter(x=>x[0]==='event'&&x[1]==='amazon_click'));
   const clickAmazon=()=>page.locator('a[href*="amazon.es/dp/"]').first().evaluate(el=>el.click());
   await visit();
   assert.equal(await page.locator('script[src*="main-v4.js"]').getAttribute('defer'),'');
   await page.locator('.ccc-cookie-banner').waitFor({state:'visible'});
   assert.equal(analyticsRequests,0);await clickAmazon();assert.equal((await events()).length,0);
   await page.getByRole('button',{name:'Rechazar analíticas',exact:true}).click();
   await page.locator('.ccc-cookie-banner').waitFor({state:'hidden'});
   await visit();assert.equal(await page.evaluate(()=>localStorage.getItem('ccc_analytics_consent')),'denied');
   assert.equal(analyticsRequests,0);await clickAmazon();assert.equal((await events()).length,0);
   if(width===390){await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');}
   else assert.equal(await page.locator('#main-nav').isVisible(),true);
   assert.ok(await page.locator('#main-nav a[href="/impresion-3d/filamentos-3d/pla-vs-tpu/"]').count());
   await page.locator('.ccc-cookie-prefs').click();
   await page.getByRole('button',{name:'Aceptar analíticas',exact:true}).click();
   await page.locator('.ccc-cookie-banner').waitFor({state:'hidden'});
   await page.waitForLoadState('networkidle');
   await clickAmazon();
   if(hostname==='compraconsentido.es'){
    assert.equal(analyticsRequests,1);const captured=await events();assert.equal(captured.length,1);
    const payload=captured[0][2];assert.equal(payload.page_path,path);assert.match(payload.asin,/^[A-Z0-9]{10}$/);assert.ok(payload.affiliate_tag);assert.ok(payload.product_name);assert.match(payload.link_url,/amazon.es/);
    await visit();assert.equal(await page.evaluate(()=>window.cccAnalyticsGranted()),true);
    await clickAmazon();assert.equal((await events()).length,1);
   }else{assert.equal(analyticsRequests,0);assert.equal((await events()).length,0);}
   await page.locator('.ccc-cookie-prefs').click();await page.getByRole('button',{name:'Rechazar analíticas',exact:true}).click();
   const before=(await events()).length;await clickAmazon();assert.equal((await events()).length,before);
   assert.deepEqual(errors,[]);console.log(JSON.stringify({width,hostname,menu:'OK',consent:'OK',amazon:'OK'}));
   await context.close();
  }
 }
} finally {await browser.close();}
