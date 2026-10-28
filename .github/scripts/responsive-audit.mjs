import { chromium } from "playwright";
import fs from "node:fs";

const base = "http://127.0.0.1:4173";
const sitemap = fs.readFileSync("sitemap.xml", "utf8");
const paths = [...sitemap.matchAll(/<loc>https:\/\/compraconsentido\.es([^<]*)<\/loc>/g)]
  .map(match => match[1] || "/");

if (!paths.length) {
  throw new Error("No se han encontrado URLs en sitemap.xml");
}


const viewports = [
  { name: "mobile-360", width: 360, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 1000 }
];

const slug = p => p === "/" ? "home" : p.replace(/^\//, "").replace(/\/$/, "").replaceAll("/", "__");

fs.mkdirSync("responsive-audit", { recursive: true });

const browser = await chromium.launch({ headless: true });
const report = [];
let failures = 0;

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1
  });

  await context.addInitScript(() => {
    try { localStorage.setItem("ccc_analytics_consent", "denied"); } catch {}
  });

  for (const path of paths) {
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", msg => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", err => consoleErrors.push("PAGEERROR: " + err.message));

    const response = await page.goto(base + path, { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(250);

    const data = await page.evaluate(({ isComparison, isMobile, isDesktop }) => {
      const visible = el => {
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return s.display !== "none" && s.visibility !== "hidden" && r.width > 0 && r.height > 0;
      };

      const clippedByAncestor = el => {
        const er = el.getBoundingClientRect();
        let parent = el.parentElement;
        while (parent && parent !== document.body) {
          const ps = getComputedStyle(parent);
          if (["hidden","clip"].includes(ps.overflowX) || ["hidden","clip"].includes(ps.overflow)) {
            const pr = parent.getBoundingClientRect();
            if (er.left < pr.left - 1 || er.right > pr.right + 1) return true;
          }
          parent = parent.parentElement;
        }
        return false;
      };

      const doc = document.documentElement;
      const bodyOverflowPx = Math.max(0, doc.scrollWidth - window.innerWidth);
      const h1Count = document.querySelectorAll("h1").length;
      const breadcrumbCount = document.querySelectorAll('[aria-label="Migas de pan"]').length;
      const menuButton = document.querySelector(".menu-toggle");
      const nav = document.querySelector("#main-nav");
      const hero = document.querySelector(".hero,.tools-hero,.jacks-hero,.drill-hero,.ccs-hero,.print3d-hero,.printers-hero,.filaments-hero,.accessories-hero,.home-hero,.vacuum-hero,.dehum-hero,.cap-hero,.legal-hero,.about-hero,.method-hero");
      const intro = document.querySelector(".ccs-intro-card,.ccs-comparison-opening-card");
      const heroActions = document.querySelector(".hero-actions,.ccs-hero-actions,.dehum-hero-actions");

      const brokenImages = [...document.images]
        .filter(img => visible(img) && img.complete && img.naturalWidth === 0)
        .map(img => img.getAttribute("src") || "")
        .slice(0, 10);

      const outside = [...document.querySelectorAll("main *, header *, footer *")]
        .filter(el => visible(el))
        .filter(el => !el.closest("table"))
        .filter(el => !el.closest(".dropdown,.dropdown-submenu"))
        .filter(el => {
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          if (s.position === "fixed") return false;
          if (clippedByAncestor(el)) return false;
          return r.left < -3 || r.right > window.innerWidth + 3;
        })
        .slice(0, 12)
        .map(el => ({
          tag: el.tagName,
          cls: typeof el.className === "string" ? el.className.slice(0, 120) : "",
          left: Math.round(el.getBoundingClientRect().left),
          right: Math.round(el.getBoundingClientRect().right)
        }));

      const overflowCandidates = [...document.querySelectorAll("body *")]
        .filter(el => visible(el))
        .map(el => {
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          const parent = el.parentElement ? getComputedStyle(el.parentElement) : null;
          return {
            el,
            r,
            s,
            parentOverflowX: parent?.overflowX || ""
          };
        })
        .filter(x => x.s.position !== "fixed")
        .filter(x => x.r.left < -3 || x.r.right > window.innerWidth + 3 || x.el.scrollWidth > x.el.clientWidth + 3)
        .sort((a,b) => Math.max(b.r.right - window.innerWidth, b.el.scrollWidth - b.el.clientWidth) - Math.max(a.r.right - window.innerWidth, a.el.scrollWidth - a.el.clientWidth))
        .slice(0, 30)
        .map(x => ({
          tag: x.el.tagName,
          id: x.el.id || "",
          cls: typeof x.el.className === "string" ? x.el.className.slice(0,120) : "",
          left: Math.round(x.r.left),
          right: Math.round(x.r.right),
          width: Math.round(x.r.width),
          clientWidth: x.el.clientWidth,
          scrollWidth: x.el.scrollWidth,
          overflowX: x.s.overflowX,
          parentOverflowX: x.parentOverflowX,
          minWidth: x.s.minWidth,
          whiteSpace: x.s.whiteSpace
        }));

      let heroIntroGap = null;
      if (hero && intro && heroActions && visible(heroActions)) {
        heroIntroGap = Math.round(intro.getBoundingClientRect().top - heroActions.getBoundingClientRect().bottom);
      }

      const tableResults = [...document.querySelectorAll("table")].map(table => {
        const wrapper = table.closest(".table-wrap,.ccs-table-wrap,.quick-table,.comparison-table-wrap");
        if (!wrapper) return { wrapper: false };
        const s = getComputedStyle(wrapper);
        return {
          wrapper: true,
          overflowX: s.overflowX,
          clientWidth: Math.round(wrapper.clientWidth),
          scrollWidth: Math.round(wrapper.scrollWidth),
          bodyLeak: table.getBoundingClientRect().right > window.innerWidth + 3 && wrapper.scrollWidth <= wrapper.clientWidth
        };
      });

      const profileRects = [...document.querySelectorAll(".ccs-comparison-profile")].map(el => {
        const r = el.getBoundingClientRect();
        return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) };
      });

      const productRects = [...document.querySelectorAll(".product-card,.product,.robot-card")].map(el => {
        const r = el.getBoundingClientRect();
        return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) };
      });

      return {
        title: document.title,
        bodyOverflowPx,
        h1Count,
        breadcrumbCount,
        menuButtonVisible: !!menuButton && visible(menuButton),
        navVisible: !!nav && visible(nav),
        heroFound: !!hero,
        introFound: !!intro,
        heroIntroGap,
        brokenImages,
        outside,
        overflowCandidates,
        tableResults,
        profileRects,
        productRects,
        comparisonClass: document.body.classList.contains("ccs-comparison-v3"),
        openingCardCount: document.querySelectorAll(".ccs-comparison-opening-card").length,
        profileCount: document.querySelectorAll(".ccs-comparison-profile").length,
        mobileHintVisible: [...document.querySelectorAll(".table-scroll-hint")].some(visible),
        isComparison,
        isMobile,
        isDesktop
      };
    }, {
      isComparison: false,
      isMobile: vp.width <= 390,
      isDesktop: vp.width >= 1200
    });

    const issues = [];
    const sharedStyleQA = await page.evaluate(() => {
      const bodyFont = getComputedStyle(document.body).fontFamily;
      const visible = el => el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0;
      const fontMismatches = [...document.querySelectorAll("h1,h2,h3,.logo,.brand,.ccs-product-card,.ccs-intro-card,.ccs-comparison-profile")]
        .filter(visible).filter(el => getComputedStyle(el).fontFamily !== bodyFont)
        .map(el => ({tag: el.tagName, text: el.textContent.trim().slice(0,60), font: getComputedStyle(el).fontFamily}));
      const rgb = value => (value.match(/[\d.]+/g) || []).map(Number);
      const luminance = values => values.slice(0,3).map(v => v / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
        .reduce((sum,v,i) => sum + v * [0.2126,0.7152,0.0722][i], 0);
      const labels = [...document.querySelectorAll(".ccs-product-specs small,.ccs-product-specs span")].filter(visible);
      const contrasts = labels.map(el => {
        let ancestor = el, background;
        while (ancestor) {
          const value = rgb(getComputedStyle(ancestor).backgroundColor);
          if (value.length === 3 || value[3] === 1) { background = value; break; }
          ancestor = ancestor.parentElement;
        }
        background ||= [255,255,255];
        const foreground = rgb(getComputedStyle(el).color);
        const [low,high] = [luminance(background),luminance(foreground)].sort((a,b) => a-b);
        return {text: el.textContent.trim(),ratio: (high+0.05)/(low+0.05)};
      });
      return {
        bodyFont, fontMismatches,
        minSpecContrast: contrasts.length ? Math.min(...contrasts.map(c => c.ratio)) : null,
        lowContrastLabels: contrasts.filter(c => c.ratio < 4.5),
        stylesheets: document.querySelectorAll('link[rel="stylesheet"]').length
      };
    });
    data.sharedStyleQA = sharedStyleQA;
    if (!sharedStyleQA.bodyFont.startsWith("system-ui")) issues.push("non-system-body-font=" + sharedStyleQA.bodyFont);
    if (sharedStyleQA.fontMismatches.length) issues.push("inconsistent-fonts=" + sharedStyleQA.fontMismatches.length);
    if (sharedStyleQA.lowContrastLabels.length) issues.push("spec-label-contrast=" + sharedStyleQA.minSpecContrast.toFixed(3));
    if (sharedStyleQA.stylesheets !== 1) issues.push("css-request-count=" + sharedStyleQA.stylesheets);
    if (!response || response.status() !== 200) issues.push("HTTP " + (response?.status() ?? "no-response"));
    if (data.h1Count !== 1) issues.push("H1=" + data.h1Count);
    if (path === "/" ? data.breadcrumbCount !== 0 : data.breadcrumbCount !== 1) issues.push("breadcrumbs=" + data.breadcrumbCount);
    if (data.bodyOverflowPx > 3) issues.push("body-overflow=" + data.bodyOverflowPx + "px");
    if (data.outside.length) issues.push("elements-outside=" + data.outside.length);
    if (data.brokenImages.length) issues.push("broken-images=" + data.brokenImages.length);

    if (vp.width <= 390 && !data.menuButtonVisible) issues.push("mobile-menu-toggle-hidden");
    if (vp.width >= 1200 && data.menuButtonVisible) issues.push("desktop-menu-toggle-visible");

    if (data.heroIntroGap !== null && data.heroIntroGap < 12) {
      issues.push("hero-actions-too-close-to-overlap-card=" + data.heroIntroGap + "px");
    }

    if (data.comparisonClass) {
      if (!data.comparisonClass) issues.push("missing-comparison-class");
      if (data.openingCardCount !== 1) issues.push("opening-cards=" + data.openingCardCount);
      if (data.profileCount !== 3) issues.push("profiles=" + data.profileCount);
      if (vp.width <= 390 && !data.mobileHintVisible) issues.push("mobile-table-hint-hidden");
      if (data.tableResults.some(t => !t.wrapper)) issues.push("table-without-scroll-wrapper");
      if (data.tableResults.some(t => t.wrapper && !["auto","scroll"].includes(t.overflowX))) issues.push("table-wrapper-overflow-x=" + data.tableResults.map(t => t.overflowX).join(","));
      if (data.profileRects.some(r => r.left < -3 || r.right > vp.width + 3)) issues.push("profile-outside-viewport");
      if (data.productRects.some(r => r.left < -3 || r.right > vp.width + 3)) issues.push("product-card-outside-viewport");
    }

    if (vp.width <= 390) {
      const button = page.locator(".menu-toggle");
      if (await button.count()) {
        await button.click();
        await page.waitForTimeout(180);
      }
      const navTest = await page.evaluate(() => {
        const btn = document.querySelector(".menu-toggle");
        const nav = document.querySelector("#main-nav");
        if (!btn || !nav) return { ok: false, reason: "missing" };
        const r = nav.getBoundingClientRect();
        const s = getComputedStyle(nav);
        const open = nav.classList.contains("open");
        const documentOverflowPx = Math.max(0, document.documentElement.scrollWidth - innerWidth);
        return {
          ok: open && s.display !== "none" && s.position === "fixed" && r.left >= 7 && r.right <= innerWidth - 7 && documentOverflowPx <= 3,
          open,
          documentOverflowPx,
          display: s.display,
          position: s.position,
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width)
        };
      });
      if (!navTest.ok) issues.push("mobile-nav=" + JSON.stringify(navTest));
    }

    if (consoleErrors.length) issues.push("console-errors=" + consoleErrors.length);

    const file = `responsive-audit/${vp.name}__${slug(path)}.png`;
    await page.screenshot({ path: file, fullPage: true });

    if (issues.length) failures++;
    report.push({
      viewport: vp,
      path,
      status: response?.status() ?? null,
      issues,
      consoleErrors,
      data
    });
    console.log(JSON.stringify({ viewport: vp.name, path, issues }));
    await page.close();
  }
  await context.close();
}

await browser.close();
fs.writeFileSync("responsive-audit-report.json", JSON.stringify(report, null, 2));

const summary = {
  pages: paths.length,
  viewports: viewports.length,
  checks: paths.length * viewports.length,
  failedChecks: failures,
  passedChecks: paths.length * viewports.length - failures
};
console.log("AUDIT_SUMMARY " + JSON.stringify(summary));

const failed = report.filter(item => item.issues.length);
const md = [
  "## Auditoría responsive automática",
  "",
  "- URLs: **" + summary.pages + "**",
  "- Viewports: **" + summary.viewports + "** (360, 390, 768 y 1440 px)",
  "- Comprobaciones: **" + summary.checks + "**",
  "- Pasadas: **" + summary.passedChecks + "**",
  "- Con incidencias: **" + summary.failedChecks + "**",
  "",
  failed.length ? "### Incidencias" : "### Resultado",
  "",
  failed.length
    ? failed.map(item => "- `" + item.viewport.name + "` · `" + item.path + "`: " + item.issues.join("; ")).join("\n")
    : "Sin incidencias automáticas de overflow, navegación, tablas, perfiles, tarjetas, imágenes, H1 o breadcrumbs.",
  "",
  "Capturas completas y JSON guardados como artifact `responsive-audit`."
].join("\n");

fs.writeFileSync("responsive-audit-summary.md", md);
if (failures) process.exitCode = 1;
