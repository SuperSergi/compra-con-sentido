# COMPRA CON SENTIDO
## Documento MASTER

**Última actualización:** 29/10/2026 19:48
**Mercado inicial:** España
**Idioma principal:** Español
**Dominio canónico:** `https://compraconsentido.es/`
**Repositorio de producción:** `SuperSergi/compra-con-sentido`
**Rama de producción:** `main`

> **Reescritura de consolidación (04/10/2026).** Este documento sustituye a la versión acumulativa anterior. Se han fusionado los registros por fechas en normas vigentes, se han retirado los bloques superados (por ejemplo, la puntuación de calidad-precio de PLA con precio incluido) y se han eliminado los hashes de commit. El historial completo está en el historial de Git de este archivo.

---

# 0. Cómo leer este documento

1. Describe el **estado vigente**. Si una nota antigua contradice una norma posterior, prevalece la más reciente y debe corregirse el texto antiguo.
2. **GitHub es la fuente definitiva del código publicado.** Antes de modificar una URL hay que contrastar su estado real en `main`.
3. Los datos de producto (especificaciones, ASIN) de cada comparativa viven en la página publicada y en `.github/content-drafts/`. Aquí solo se conservan selección, variantes, ASIN y cautelas editoriales.
4. Los Tracking IDs de Amazon se registran en `.github/amazon-tracking-ids.json`, que es la fuente de verdad.
5. Cada actualización debe incluir fecha y hora local en formato `DD/MM/YYYY HH:MM`.

---

# 1. Objetivo del proyecto

Crear, posicionar y hacer crecer **Compra con Sentido** como web de comparativas, guías de compra y análisis de productos orientada a:

1. SEO orgánico e intención de búsqueda.
2. Calidad y utilidad real del contenido.
3. Velocidad de carga y arquitectura clara.
4. Buen enlazado interno.
5. Conversión hacia enlaces de afiliado.
6. Costes fijos mínimos y facilidad de mantenimiento.
7. Crecimiento sostenible.

Fuente principal de tráfico: Google Search. Monetización inicial: Amazon Afiliados (Amazon España).

No crear contenido para aumentar el número de páginas. Priorizar oportunidades donde una web pequeña pueda competir y aportar valor. Objetivo inicial orientativo: 20-30 URLs de alta calidad, a un ritmo de 1-2 páginas buenas por semana, subordinado a calidad y oportunidad real.

---

# 2. Marca, dominio y costes

- **Marca definitiva:** Compra con Sentido. Se abandonó el nombre provisional Compra con Criterio porque `compraconcriterio.es` no estaba disponible, la variante con guiones era menos limpia y existía una web próxima con ese nombre en `.net`.
- **Dominio:** `compraconsentido.es`, registrado en DonDominio el 28/09/2026 (6,95 € + IVA/año en el momento de la compra). No se contrató hosting, SSL de pago, VPS, WordPress ni correo asociado.
- **Costes fijos iniciales:** esencialmente el dominio. Cloudflare Pages, DNS, CDN, SSL, GitHub, Search Console y Bing Webmaster Tools: 0 €.
- **Herramientas SEO de pago** (Semrush, Ahrefs, Sistrix, DinoRank): no contratar por ahora. Usar Google, Search Console, Google Trends, Keyword Planner, Bing Webmaster Tools, SERP, autocompletado, búsquedas relacionadas, foros y análisis manual. Reconsiderar cuando tráfico o ingresos justifiquen el coste.

Pendiente administrativo: comprobar que la renovación automática del dominio está activada.

---

# 3. Infraestructura

Arquitectura: **Desarrollo → GitHub → Cloudflare Pages → `compraconsentido.es` → Google / usuarios.**

## 3.1 GitHub y flujo de trabajo

- Repositorio `SuperSergi/compra-con-sentido`, rama `main` = producción.
- Ruleset **Protección de main** activo y sin bypass: protege contra borrado y force push, exige pull request, permite solo `squash` y exige el check `build`. 0 aprobaciones obligatorias mientras lo mantenga una sola persona. No se exige despliegue de Cloudflare como condición de merge.
- **Flujo obligatorio:** `rama → PR → check build → squash → main`. Nada se publica sin PR.

## 3.2 Cloudflare Pages

- Proyecto `compra-con-sentido`, URL técnica `https://compra-con-sentido.pages.dev` (nunca usar como URL pública ni canónica).
- Framework: ninguno. Build command: `exit 0`. Output directory: `.`. Root directory vacío. Sin variables de entorno. La web es HTML, CSS y JavaScript estático servido desde la raíz.

## 3.3 DNS y dominio canónico

- DNS gestionado por Cloudflare. Nameservers en DonDominio: `katja.ns.cloudflare.com` y `nico.ns.cloudflare.com`.
- CNAME raíz y CNAME `www` → `compra-con-sentido.pages.dev`, con proxy activado y TTL automático.
- `https://www.compraconsentido.es/*` redirige con **301** a `https://compraconsentido.es/${1}`, conservando ruta y query string.
- Norma estable: usar siempre la versión sin `www` y consolidar señales SEO en el dominio raíz.
- DNSSEC desactivado en esta fase. No crear una entrada DNSSEC manual salvo decisión posterior.

## 3.4 SSL/TLS

SSL Universal activo (`compraconsentido.es` y `*.compraconsentido.es`), modo Completo, "Usar siempre HTTPS" y reescrituras automáticas activadas, TLS 1.3 activado, mínimo TLS 1.2, encriptación oportunista activada. **HSTS desactivado** hasta que HTTPS y las redirecciones lleven suficiente tiempo estables. Advanced Certificate Manager y Total TLS no son necesarios.

## 3.5 Cloudflare y bots

- Se detectó que la regla `Block AI training crawlers - BOBA-199` bloqueaba solicitudes legítimas de Googlebot a `sitemap.xml`.
- Regla creada: **`Permitir bots verificados`**, condición `cf.client.bot and http.request.uri.path eq "/sitemap.xml"`, acción Skip (todas las reglas administradas), primera en orden, activa y con logging. Se comprobó una petición real de Googlebot con acción `skip`.
- Estado actual: Búsqueda, Agente y Entrenamiento en **Permitir**.
- **Decisión:** no reactivar el bloqueo de bots de entrenamiento mientras exista riesgo de interferir con Googlebot.

---

# 4. Stack técnico y rendimiento

- Tecnologías: HTML, CSS, JavaScript, imágenes WebP (AVIF cuando compense).
- Evitar inicialmente WordPress, PHP, MySQL, plugins y VPS.
- Core Web Vitals objetivo: LCP < 2,5 s, INP < 200 ms, CLS < 0,1.
- Prioridades: HTML accesible directamente por Google, CSS optimizado, JavaScript mínimo, imágenes ligeras con lazy loading cuando corresponda, CDN Cloudflare, sin dependencias innecesarias.

---

# 5. SEO técnico obligatorio

Toda página pública mantiene:

- `<title>` único, meta description, un único H1 coherente, jerarquía H2/H3 lógica.
- Canonical bajo `https://compraconsentido.es/...`, Open Graph y Twitter Card completos.
- Breadcrumbs visibles y clicables en todas las páginas salvo la home, reflejando la jerarquía real, con `BreadcrumbList` cuando corresponda. La home no muestra `Inicio › Inicio`.
- `<meta name="theme-color" content="#063d26">` y `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`.
- HTTPS, versión única del dominio, redirecciones correctas, página 404 adecuada.
- Imágenes optimizadas y lazy loading cuando tenga sentido.
- Schema.org según corresponda (ver sección 8.9).

## robots.txt y sitemap

- `robots.txt`: `User-agent: *`, `Allow: /` y referencia a `https://compraconsentido.es/sitemap.xml`. Cloudflare puede añadir su bloque de Content Signals.
- `sitemap.xml` usa el dominio definitivo y contiene **27 URLs públicas**, comprobadas en `main` el 29/10/2026. `lastmod` se actualiza solo cuando cambia contenido sustancial de la URL, no por cambios técnicos o de navegación global.
- No modificar ni reenviar el sitemap sin una razón concreta si Google puede obtenerlo correctamente.

---

# 6. Search Console, Bing y analítica

- **Search Console:** propiedad de dominio `compraconsentido.es`, verificada por DNS mediante Cloudflare. Se eliminaron las propiedades antiguas de Google Sites y GitHub Pages. Es la fuente principal de datos SEO reales.
- **Bing Webmaster Tools:** pendiente de configurar.
- **GA4:** propiedad `535630166` (nombre heredado mostrado: `Compra con criterio`), ID `G-WQ9KB0DDP7`, con consentimiento previo. `js/main-v4.js` carga GA4 y registra `amazon_click` solo en `compraconsentido.es` desde la PR #72 (28/10/2026, `d9848d62`); las previews dejaron de emitir eventos nuevos, aunque el histórico conserva los anteriores. El evento contempla ruta, título, producto, ASIN, tag y destino; no equivale a una compra.
- **Conector de lectura:** Windsor.ai `searchconsole` sobre `sc-domain:compraconsentido.es` y `googleanalytics4` sobre `535630166`. Windsor es una vía de acceso a los datos, no su fuente original. GSC Wizard no es operativo de forma fiable en este proyecto (`payment_required`).

## Última revisión de Search Console y GA4 (29/10/2026)

**Ventanas y cautelas:** lectura realizada el 29/10/2026; los registros finalizados disponibles llegaban al **26/10/2026**. La consulta de datos recientes/no finalizados devolvía 3 impresiones el 27/10 y 0 el 28/10, cifras que no deben tratarse como cierres diarios. No sumar consultas visibles para reconstruir totales de dominio: Google oculta consultas de volumen bajo.

- **Search Console, dominio, 28/09-26/10/2026:** **661 impresiones, 8 clics y CTR 1,21 %**. La revisión anterior (hasta 25/10) registraba 634 impresiones y 8 clics: incremento neto de 27 impresiones el 26/10, sin clics adicionales. Semana 13-19/10: 243 impresiones; semana 20-26/10: 232 (variación -4,5 %). No atribuir las variaciones de estos volúmenes pequeños a un cambio técnico concreto sin más observaciones.
- **Páginas con oportunidad SEO, 01/10-26/10 (impresiones / clics / posición media por URL):** gatos hidráulicos para coche 41 / 3 / 9,85; mejores deshumidificadores 38 / 2 / 11,47; llaves de impacto 31 / 1 / 16,29; mejores filamentos PLA 40 / 0 / 10,03; guía de litros por m² 17 / 0 / 6,82. En el tramo 20-26/10, deshumidificadores obtuvo 15 impresiones y posición media 6,13; llaves 8 y 4,75. Las posiciones agregadas por página **no son rankings de una keyword concreta**. Vigilar estas páginas, sin reescrituras precipitadas tras la humanización de 28/10.
- **Páginas con impresiones pero posición media aún baja, 01/10-26/10:** guía de filamentos 116 / 76,33; accesorios 3D 91 / 59,64; mejores impresoras 3D 85 / 63,19; robots aspiradores 53 / 65,15. Son impresiones / posición media, con 0 clics en este desglose. Las consultas visibles `filamento tpu vs pla` (29 impresiones, posición 69,10) y `pla vs tpu` (16, posición 72,44) no justifican modificar todavía la nueva URL PLA vs TPU: faltan datos suficientes de su rendimiento propio.
- **GA4, 01/10-28/10 (últimos eventos visibles 26/10):** toda la propiedad: **30 sesiones, 275 vistas y 13 eventos `amazon_click`**. Hostname de producción `compraconsentido.es`: **27 sesiones, 95 vistas y 11 `amazon_click`**; preview antigua: 3 sesiones, 180 vistas y 2 `amazon_click`. Los 11 clics de producción proceden de secar ropa (5), comparativa general de deshumidificadores (4) y llaves de impacto (2), ocurridos del 19 al 26/10. Incluyen posibles pruebas internas; no implican pedidos ni comisiones.
- **Origen de las 27 sesiones de producción:** 11 `Referral` procedentes de previews de Cloudflare (navegación desde páginas de prueba), 8 clasificadas como `Organic Search` (4 `google / organic`, 4 `search.google.com / referral`), 4 `AI Assistant` atribuidas a `chatgpt.com` y 4 `Direct`. Las 4 de `search.google.com` no deben darse por usuarios externos procedentes de la SERP sin más evidencia. La muestra es demasiado pequeña y está contaminada por visitas del propio proyecto.
- **Dimensiones personalizadas de GA4:** Windsor ya expone `customevent_product_name`, `customevent_asin` y `customevent_affiliate_tag`, correspondientes a las tres dimensiones de evento configuradas por Sergio el 28/10. Sin embargo, en todos los `amazon_click` históricos consultados los valores aparecen como `(not set)`; no hay todavía un evento nuevo que valide la captura de valores por producto. `conversions` devolvió 0 para esos eventos, pese a que Sergio declaró haber marcado `amazon_click` como evento clave. **Pendiente:** verificar administración de GA4 y generar/inspeccionar un evento posterior al cambio, con consentimiento, sin confundirlo con una conversión comercial.
- **Sitemap:** `main` contiene **27 URLs** (29/10). Windsor/Google informaba **26 enviadas**, con **0 errores y 0 warnings**, y última descarga el 27/10/2026 a las 14:02 UTC. La diferencia temporal es compatible con la publicación de gatos de botella del 28/10; comprobar la próxima descarga antes de considerarla incidencia. El `indexed=0` del resumen de sitemap vía Windsor **no es un recuento de indexación fiable** y no permite afirmar que no haya páginas indexadas.
- **Coste:** Windsor continúa en `Trial` el 29/10. **No contratar herramientas de SEO/analítica de pago** por ahora. Al acabar la prueba, revisar límites reales del plan gratuito; usar GSC y GA4 nativos si Windsor restringe las lecturas. Las mediciones originales permanecen en Google.

## Indexación y prioridades de seguimiento

Las cuatro URLs que figuraban como `Descubierta: actualmente sin indexar` el 09/10 recibieron solicitudes manuales y después empezaron a registrar impresiones. El hecho de tener impresiones demuestra visibilidad de páginas en Google, **pero no sustituye la inspección de URL ni el informe de páginas indexadas de Search Console**.

**Acciones siguientes:** (1) revisar el rendimiento móvil tras el despliegue D2, comparándolo con la referencia posterior a D/E; (2) validar las dimensiones y el estado de `amazon_click` en GA4 con datos nuevos y la configuración de eventos clave; (3) confirmar la siguiente descarga del sitemap y el estado de la nueva URL de gatos de botella y PLA vs TPU; (4) seguir las URLs con posiciones aproximadas 8-20 antes de modificar sus títulos o contenido; (5) contrastar la siguiente oportunidad comercial de la sección 7.3 con SERP, fabricantes, ASIN y enlazado antes de crear una página.

---

# 7. Estrategia SEO y arquitectura

## 7.1 Proceso antes de crear una página

**SEO estratégico → contenido → diseño → publicación.** Antes de crear una URL:

1. investigar la SERP e identificar la intención;
2. analizar competidores;
3. fijar keyword principal, secundarias y preguntas relacionadas;
4. valorar dificultad real e intención comercial/afiliación;
5. comprobar relación con clusters existentes y riesgo de canibalización;
6. decidir si merece la pena crear la página;
7. diseñar el enlazado interno antes de publicarla.

No crear una URL por una simple variación de keyword. No inventar volúmenes de búsqueda.

## 7.2 Clusters y URLs

- Clusters actuales: `/herramientas/`, `/hogar/`, `/impresion-3d/`. Otras categorías (tecnología, automoción) se valorarán con investigación suficiente.
- URLs cortas, descriptivas, permanentes, sin fechas ni palabras innecesarias.
- Separar siempre intención **informacional** ("cómo elegir") y **comparativa/transaccional** ("mejores X"). Ambas URLs pueden convivir y posicionar búsquedas distintas.
- **Criterio de expansión vigente desde 23/10/2026:** ya no es necesario esperar a 50-100 impresiones para crear contenido nuevo. Se pueden abrir nuevas URLs cuando exista una **intención de búsqueda claramente diferenciada**, una SERP propia y contenido sustancialmente distinto que aporte valor, apoyándose en Search Console, SERP y análisis de canibalización. Las páginas que estén subiendo no se modifican solo para perseguir nuevas queries: las nuevas intenciones se trabajan en URLs separadas y se enlazan desde/ hacia la página principal del cluster.
- Se mantiene la prohibición de crear URLs por simples modificadores o atributos que la página existente ya cubre. En particular, no abrir por ahora páginas separadas para gatos 3 toneladas, perfil bajo o SUV; llaves de impacto `a batería`, `para coche` o `para ruedas`; sierras 165 mm, 18 V, brushless o compactas; ni PLA barato, PLA+, alta velocidad, AMS o packs. Estas variantes permanecen dentro de las comparativas actuales salvo que una investigación posterior demuestre una intención independiente.
- No crear una subcategoría `/herramientas/sierras/` hasta que exista contenido real que la justifique.

## 7.3 Prioridades SEO y expansión

**Páginas actuales a vigilar sin modificar mientras mantengan tendencia ascendente:** comparativa de gatos hidráulicos, comparativa PLA, llaves de impacto, comparativa de deshumidificadores y guía de litros por metros cuadrados. Robots aspiradores e impresoras 3D comparativa no son prioridad de expansión inmediata.

**Primer bloque de nuevas URLs a investigar y publicar una a una, siempre tras SERP, competencia, productos/ASIN y enlazado:**

1. `Mejores deshumidificadores para secar ropa` — **publicada el 23/10/2026** tras PR #66 y squash merge a `main` (`b82ec35c7885b12205ca0b779e2282849d0b1bb2`). Incluye hero propio, seis imágenes exactas aportadas manualmente, enlazado interno, menú/submenú y sitemap. Build, optimización de imágenes y auditoría responsive quedaron en verde; revisión visual aprobada antes del merge.
2. `PLA vs TPU: cuál usar según la pieza` — **publicada el 24/10/2026; archivo confirmado en `main` el 28/10/2026** `/impresion-3d/filamentos-3d/pla-vs-tpu/`. La intención es informacional de decisión: el usuario ya duda entre PLA y TPU y necesita elegir según el comportamiento de la pieza. La SERP reconoce una intención específica y existe hueco editorial para resolver casos reales, matizar qué significa «resistencia», explicar impresión/humedad y compatibilidad Bambu/AMS, y señalar cuándo conviene otro material. Se mantiene separada de `/impresion-3d/filamentos-3d/` (guía general de materiales) y de `/impresion-3d/filamentos-3d/mejores-filamentos-pla/` (comparativa comercial de PLA). No se convertirá en comparativa de bobinas ni se introducirán productos solo para monetizar. Enlazado editorial definido (comprobar enlaces existentes al auditar): guía general → PLA vs TPU; hub `/impresion-3d/` → PLA vs TPU; comparativa PLA → PLA vs TPU; nueva URL → guía general, comparativa PLA y accesorios 3D cuando se trate secado/almacenamiento. La investigación técnica previa fija además estas cautelas: evitar cifras universales para familias completas; distinguir rigidez, impacto y deformación; TPU genérico no equivale a `TPU for AMS`; AMS 2 Pro admite `TPU for AMS` pero excluye TPU genérico y Bambu TPU 95A, mientras AMS HT usa bypass para TPU genérico/95A sin alimentación/retorno automáticos.
3. `Mejores gatos hidráulicos de botella para coche` — subtipo físicamente diferente de la comparativa general y con menor riesgo de canibalización.
4. `Mejores taladros percutores a batería` — comparativa específica por capacidad de perforación/percusión, diferenciada de la comparativa general si la SERP confirma intención propia.
5. `Mejores deshumidificadores silenciosos para dormitorio` — criterios de ruido, modo noche y uso prolongado distintos de la comparativa general.

La lista es una prioridad de investigación, no una autorización automática para publicar sin completar el proceso de la sección 7.1.

### Investigación comercial SEO del 28/10/2026

**Objetivo:** acelerar el tráfico útil con coste cero, sin generar páginas por simples variaciones de keyword. Fuentes: Search Console (28/09-25/10: 634 impresiones, 8 clics), sitemap de main y muestreo de buscador en español. El muestreo de resultados no sustituye una SERP geolocalizada exhaustiva de Google ni mide volumen mensual. Prioridades editoriales cualitativas; no autoriza publicar sin validación completa.

| Oportunidad | SERP y potencial | Decisión |
| --- | --- | --- |
| Secadores de filamento 3D | Comparativas de Criterio Tech y TodoImpresión3D; decisión comercial por temperatura, bobinas, AMS | **Prioridad 1**; cluster impresión 3D, canibalización baja |
| Gatos hidráulicos de botella para vehículos altos | Motor16 y Zona Taller cubren también carretilla y botella; compra concreta | **Prioridad 2**; diferenciar SUV/furgonetas y altura; solape medio con gatos actual |
| Compresores portátiles para coche | El Maletero compara 12 V y batería; compra clara | **Prioridad 3**; exige decidir cluster automoción antes |
| Deshumidificadores para baño sin ventana | InteriorSano y EspacioSeco; búsqueda por problema | **Prioridad 4**; explicar ventilación, Peltier y seguridad, no exagerar extracción |
| Mejores filamentos PETG | 3DJake y Compara3D; compras de bobinas específicas | **Prioridad 5**; distinguir del PLA, hub y guía de materiales |
| Cargadores/mantenedores batería coche/moto | El Maletero; compatibilidad por química de batería | Candidata secundaria, futuro cluster automoción |
| Arrancadores portátiles de batería | La Vanguardia y sitios especializados; competencia fuerte | Posponer por dificultad |
| Lectores OBD2 Bluetooth | OBD2Scan y Rankin; compatibilidad de coche/apps | Candidata secundaria para automoción |
| Niveles láser autonivelantes 360 | TallerPreciso y Rankin; precisión y alcance | Candidata secundaria en herramientas |
| Lijadoras orbitales a batería | RadarOfertas y GuíaHerramientas | Candidata secundaria; distinguir orbital y rotorbital |
| Taladros percutores a batería | Rankin y comparadores; compra específica | Riesgo medio-alto con página de taladros actual, no aprobar todavía |
| Deshumidificadores silenciosos para dormitorio | InteriorSano y varias comparativas | Riesgo alto: contenido de ruido ya en comparativa principal; optimizar esta primero |
| Higrómetros digitales para casa | InteriorSano y CasaKWh; tickets inferiores | Secundaria de apoyo al cluster humedad |
| Kits de almacenamiento de filamento | 3DJake y Criterio Tech | Integrar en accesorios; valorar URL solo con intención propia |
| PLA vs PETG | Varias guías y comparativas de servicios 3D | Informacional, competencia numerosa; postergar |
| Impresoras 3D cerradas | Criterio Tech y FindMy3DPrinter | Riesgo alto con comparativa de impresoras existente |
| Filamentos TPU 95A | Productos por Shore/compatibilidad | Solape parcial con PLA vs TPU; investigar antes de URL comercial |
| Deshumidificadores de bajo consumo | Comparativas de consumo especializadas | Riesgo alto con la comparativa general: integrar consumo allí |
| Deshumidificadores desecantes para frío | Intención técnica por temperatura de uso | SERP y productos insuficientemente contrastados, no aprobar |
| Llaves dinamométricas para ruedas | Complemento comercial de herramientas y vehículo | SERP/productos insuficientemente contrastados, no aprobar |

**Referencias SERP consultadas:** https://criteriotech.es/impresion-3d/mejor-secador-filamento/ ; https://todoimpresion3d.com/mejores-secadores-de-filamento-2026/ ; https://www.motor16.com/comparativas/mejor-gato-hidraulico-para-coche/ ; https://zonataller.com/blogs/taller/gato-hidraulico-para-coche-perfil-bajo-botella-carretilla-y-2t-3t ; https://elmaletero.es/mejores-compresores-de-aire-portatiles/ ; https://espacioseco.com/mejor-deshumidificador-bano/ ; https://compara3d.com/filamentos-petg/

**Enlazado previsto si se aprueban futuras páginas:** secadores desde accesorios 3D, hub filamentos y PLA vs TPU; baños desde hub deshumidificadores, guía litros y comparativa; PETG desde hub de filamentos y comparativa PLA. **Gatos de botella: enlazado ya realizado** desde el hub Herramientas, la guía de gatos y la comparativa de carretilla, además del menú global. Revisar enlaces contextuales adicionales al humanizar el resto de la web. Compresores requiere antes arquitectura de automoción, no crear URL huérfana.

**Trabajo paralelo en páginas existentes:** revisar consultas, CTR, intención y enlazado para gatos hidráulicos (38 impresiones, posición media 8,37), comparativa PLA (37, 10,49), deshumidificadores (37, 11,70), llaves de impacto (32, 16,56) y guía de litros (17, 6,82), periodo 28/09-25/10/2026. Son medias de URL, no ranking de keyword. No hacer cambios sin SERP y tendencia.

**Antes de publicar:** confirmar SERP actual, canibalización, marca/modelo exacto, especificaciones en fabricante/manual, ficha activa de Amazon.es, ASIN y variante/kit, tracking y enlaces internos, menú, sitemap, schema, build y responsive. No se ha verificado aún disponibilidad Amazon de las candidatas ni volúmenes mensuales; este estudio no implica publicación automática.

### Secadores de filamento: selección y protocolo cerrados (29/10/2026)

**Decisión cerrada por Sergi:** secadores de filamento será la próxima comparativa; **PETG se mantiene como segunda comparativa futura**. La selección y el protocolo quedan aprobados. La prueba aún no se ha realizado y la comparativa no se publica ahora.

| Selección principal | Perfil | ASIN Amazon.es |
| --- | --- | --- |
| SUNLU S2 | 1 bobina | `B09XHVVPX8` |
| Creality Space Pi Plus | 2 bobinas | `B0CXDNBKHT` |
| SUNLU S4 | 4 bobinas, hasta 70 °C | `B0CPLNR989` |
| SUNLU S4 Pro | Hasta 85 °C, 2 zonas independientes | `B0H6X1JXPG` |

**S4 Pro cerrado:** referencia del fabricante `AWDE-FD-S4PRO-BK-EU`, versión europea confirmada por Sergi en Amazon.es, título «S4 Pro», vendido por SUNLU-EU. No reabrir la selección ni sustituirlo por una referencia de Amazon US.

**Alternativas:** Creality Space Pi `B0CX6MV1BM`, Creality X4 `B0F9FP4C6G` y Sovol SH03 `B0FRS5JZ8Q`. No sustituir el X4 por `B0GL8L8ZLM` (no disponible en la comprobación de Sergi) ni por `B0FKMVGCSC` (vendedor externo). Las verificaciones de Amazon aportadas por Sergi son un registro de esa comprobación; antes de publicar se revisarán disponibilidad, variante, enchufe y ficha oficial. El perfil principal de 85 °C ya está resuelto con S4 Pro.

**Fase 1 aprobada, solo con AMS 2 Pro:** usar PETG húmedo y seguir la secuencia imprimir antes → pesar la bobina → secar en AMS 2 Pro → volver a pesar → imprimir después. Mantener condiciones de impresión comparables y registrar material, ajustes, duración y temperatura de secado, fotos propias del antes/después, humedad indicada por el AMS y pesos antes/después con la diferencia en gramos. La báscula será de cocina, con **resolución de 1 g**. Una diferencia de **0-1 g se registra como medición**, sin concluir que la bobina ya estaba seca: la resolución de la báscula y las condiciones de medida limitan esa interpretación. La humedad mostrada por el AMS tampoco equivale a medir directamente el contenido de agua del filamento.

**Equipo de Sergi, actualizado según su comprobación a 29/10/2026:** Bambu Lab P2S con firmware `01.03.00.00`, AMS 2 Pro `05.00.22.22` y Filament Buffer for P2 `01.01.16.19`. **Pendiente comprobar en una impresión real si permite imprimir mientras seca** y aportar captura. Hasta entonces, describir esa capacidad como «según Bambu Lab y la versión de firmware del equipo probado», sin presentarla como observación propia. No publicar números de serie en fotos ni capturas.

**Alcance y evidencia:** esta fase basta para preparar la sección «¿Necesito un secador si tengo AMS 2 Pro?». La comparación práctica con un secador externo depende de que Sergi compre uno; si lo hace, será de 85 °C para poder probar ABS o TPU. Utilizar fotos propias y no emplear «Probado por nosotros» hasta realizar la prueba; cualquier afirmación de experiencia se limitará al equipo y a las condiciones realmente probados.

**Próximo paso, a cargo de Sergi:** completar la fase 1, comprobar la impresión mientras seca y aportar fotos y datos. Después se redactará la comparativa **en borrador**, sin publicación automática. Esta actualización integra únicamente documentación en el MASTER.

## 7.4 Enlazado interno y navegación

- Una página nueva debe enlazarse desde su hub de categoría, desde páginas relacionadas con anchors descriptivos y, si es estratégica, desde Inicio. Inicio no debe ser un listado de todas las URLs: enlaza comparativas comerciales importantes y contenidos que se quieran reforzar. El hub de categoría, los breadcrumbs y los enlaces contextuales reparten el resto de autoridad.
- Las tarjetas de hubs e Inicio usan la imagen hero de la URL de destino cuando exista.
- Enlazados vigentes: `/hogar/` → guía de litros de deshumidificador; guías de taladros y gatos → sus comparativas con anchors variados; `/impresion-3d/filamentos-3d/` ↔ comparativa PLA; `/impresion-3d/` → comparativa PLA.
- **Navegación al publicar una URL nueva:** actualizar hub, menú global (HTML estático de todas las páginas), `submenuData` en `/js/main-v4.js` si es una URL hija, versión de caché de `main-v4.js` en todas las páginas, breadcrumbs, enlaces contextuales y sitemap. Comprobar escritorio y móvil, enlaces duplicados y caracteres residuales. El cambio de menú se aplica a todas las páginas publicadas en el mismo PR.
- **Menú principal:** la entrada informativa visible es `Sobre nosotros` y enlaza a `/sobre-nosotros/`. `Información` se mantiene como título de agrupación en el footer, donde conviven Sobre el proyecto, Metodología, Aviso legal, Privacidad y Contacto.

---

# 8. Estándares editoriales y de comparativas

## 8.1 Estrategia de contenido

El contenido debe aportar más que una ficha de producto. Priorizar comparaciones, tablas, criterios de selección, ventajas e inconvenientes reales, diferencias entre modelos, escenarios de uso, explicación técnica, recomendaciones según necesidad, FAQ útiles, alternativas y cuándo compensa pagar más. No copiar descripciones de fabricantes o Amazon.

Compra con Sentido no es otra lista de "los 10 mejores": su diferenciación es explicar para quién tiene sentido cada producto, qué cambia frente a otro, qué limitación puede importar y qué información está respaldada.

## 8.2 Metodología de investigación

Para cualquier dato que pueda influir en la compra:

1. fuente oficial del fabricante; 2. manuales y documentación técnica; 3. si falta, distribuidores especializados, retailers fiables y análisis expertos que identifiquen el modelo exacto; 4. contrastar discrepancias; 5. no inventar ni deducir cifras inciertas.

Se trabaja en dos capas:

- **Datos objetivos:** fabricante, manual, ficha técnica, variante exacta, accesorios, compatibilidades, contenido del paquete, seguridad y magnitudes **solo cuando sean comparables**.
- **Uso real:** opiniones verificables de propietarios y profesionales, pruebas independientes, análisis especializados, foros técnicos cuando aporten casos concretos, reseñas de retailers fiables y vídeos prácticos.

Reglas de uso real: buscar el modelo exacto sin extrapolar de otra variante; buscar experiencias positivas y negativas; identificar patrones repetidos y distinguir incidencias aisladas de problemas recurrentes; dar más peso a experiencias detalladas; no convertir percepciones subjetivas en datos técnicos; contrastar afirmaciones importantes con más de una fuente; si la base es insuficiente, no inventar conclusiones ni usar esa característica como argumento de compra. La capa de uso real enriquece **toda la ficha**, no solo los bloques finales. Cada opinión o prueba de terceros citada públicamente necesita una fuente concreta enlazada y atribución al modelo exacto; si no se puede documentar, retirar el juicio. No sustituirlo por una experiencia propia supuesta.

La popularidad (nº de reseñas, ventas visibles) **no puntúa como calidad**: solo informa de la cantidad de experiencia acumulada y de la confianza de la valoración.

## 8.3 Pruebas físicas y tono

- **Nunca afirmar que se ha probado físicamente un producto si no es cierto.**
- La etiqueta positiva **`Probado por nosotros`** solo se usa cuando existe una prueba real y documentable (fotos, fecha o periodo de uso, notas, contexto suficiente).
- No usar etiquetas ni avisos negativos o defensivos repetidos ("No probado", "Basado en ficha y opiniones"). La metodología global (`/metodologia/`) explica cómo se investigan los productos.
- Redacción natural, con criterio experto. Evitar fichas demasiado simétricas, conclusiones repetidas, estructuras mecánicas, lenguaje comercial copiado y afirmaciones absolutas sin soporte.
- Ningún párrafo visible debe empezar con signos huérfanos (`:`, `-`, `·`); los primeros párrafos de las fichas son frases completas.
- **Revisión editorial con `humanizer-sergi` (decisión 28/10/2026):** redactar para lectores, no como salida de una ficha técnica. Cada ficha habla del modelo propio, de su uso y limitaciones; las comparaciones directas entre productos van principalmente en la tabla o en apartados explícitos de comparación. Evitar repeticiones, frases defensivas y metacomentarios editoriales sobre cómo se verificaron datos o por qué se retiró información. Las fuentes se enlazan sin introducir notas obsoletas en el texto público. Mantener la trazabilidad de discrepancias y derivaciones técnicas en documentos internos.


## 8.4 Estructura de una comparativa

`Hero → tarjeta blanca solapada → exactamente 3 perfiles → contenido específico → tabla → fichas → resto (guía, FAQ, metodología)`

- La clasificación informacional / comparativa / híbrida es un criterio **editorial**, no crea plantillas visuales distintas. Las comparativas híbridas incluyen más explicación pero sin cabecera ni tarjeta exclusiva.
- La tarjeta de apertura es breve (dos párrafos como máximo): introduce el criterio de comparación, no repite lo que viene después.
- Las nuevas páginas parten de `.github/content-templates/pagina-comparativa.html` o `pagina-informacional.html`, no de estructuras antiguas.

## 8.5 "3 elecciones según necesidad"

Los tres perfiles obligatorios funcionan explícitamente como **3 elecciones según necesidad**. Cada uno indica:

- necesidad o tipo de usuario;
- modelo recomendado y la diferencia concreta que justifica elegirlo;
- una limitación relevante cuando exista;
- un CTA cuando reduzca fricción, especialmente si el bloque está separado de las fichas.

Reglas: exactamente tres; nunca numerados como ranking (1.º, 2.º, 3.º); los perfiles dependen de cada categoría y no siguen una fórmula universal (por ejemplo, un perfil "la más barata" o "la más potente" solo si encaja en esa categoría). Si dos modelos encajan en el mismo escenario, uno es la recomendación principal y el otro puede aparecer como alternativa.

**Estado aplicado 04/10/2026:** las 9 comparativas publicadas (amoladoras, llaves de impacto, gatos hidráulicos, taladros, sierras circulares, impresoras 3D, filamentos PLA, deshumidificadores y robots aspiradores) ya usan este formato. Las recomendaciones se derivaron exclusivamente de las fichas y criterios ya publicados en cada página; no se introdujeron criterios de producto nuevos.
Los CTA de estas tres tarjetas usan un componente visual común: botón Amazon amarillo, ancho completo, separación mínima respecto al texto y alineación en la parte inferior de cada tarjeta para mantener la misma línea visual aunque cambie la cantidad de texto.

## 8.6 Tablas comparativas

- Solo información que ayude a elegir. Sin columnas que no diferencian (por ejemplo, 18 V o cuadradillo si son comunes a todos).
- No mezclar magnitudes no equivalentes (peso con y sin batería, vatios equivalentes entre marcas, autonomía genérica).
- Dato sin fuente fiable: `–` (o `No declarada` si el criterio de la tabla lo recoge), sin rellenar con explicaciones ni inferencias.
- En móvil: scroll horizontal con aviso visible `← Desliza la tabla para ver todas las columnas →`, celdas compactas y **sin primera columna fija** (la tabla se mueve completa).
- Accesibilidad: `<caption>` y `scope="col"`/`scope="row"`. Tras cualquier transformación masiva de tablas, validar aperturas y cierres (`<table>`, `<thead>`, `<tbody>`); no hacer reemplazos sobre `<th` que puedan alcanzar `<thead>`.
- CTA compacto de tabla: ver sección 9.3.

## 8.7 Fichas de producto

Orden canónico (referencia: sierras circulares y PLA):

`Imagen + badge/perfil → H3 y subtítulo → especificaciones → texto editorial → "Lo que destaca" / "A tener en cuenta" → "Encaja si…" → [valoración y formatos si aplica] → CTA`

Cada ficha responde: qué diferencia al modelo, para quién tiene sentido, cuál es su ventaja concreta, cuál es su limitación real y cuándo compensa frente a otro.

- **"Encaja si…"**: debe responder "¿qué tiene este modelo que puede hacer que lo compre antes que otro?". No repite el subtítulo ni los bloques anteriores. El ecosistema de batería es un criterio secundario salvo que no haya diferencias más importantes.
- **"Lo que destaca"**: la ventaja práctica más relevante, apoyada en experiencia real cuando exista.
- **"A tener en cuenta"**: una contrapartida real de compra o uso, no una especificación ya explicada.
- Los tres bloques no se repiten entre sí ni duplican el texto principal. Las conclusiones de uso real se reparten por la ficha.
- Los bloques "Encaja si…" usan fondo azul suave, borde azul y texto azul (`product-cards-v1.css`).

## 8.8 Imágenes

- No usar Google Drive como servidor permanente: las imágenes viven en el proyecto, preferiblemente WebP (AVIF si compensa), con dimensiones y peso adecuados, lazy loading y alt útil. Texto importante en HTML, no incrustado en la imagen.
- **Producto:** imagen individual por producto, sin collages ni imágenes IA que pretendan representar un modelo exacto. Las fotografías actuales alojadas localmente se consideran **provisionales** y las escenas ilustrativas se etiquetan como tales (lote E, PR #86). **Lote C aparcado por decisión de Sergio:** no sustituir imágenes ahora. Cuando exista acceso elegible a la API de Amazon, comprobar sus condiciones de uso y obtener/mostrar imágenes oficiales de forma permitida, sin asumir derecho a almacenarlas; retirar la etiqueta «Imagen ilustrativa» solo de las imágenes exactas que realmente se sustituyan. Para cualquier fotografía alojada localmente, verificar antes los derechos de reproducción.
- **Hero y tarjeta de página nueva:** imagen propia generada con IA, ilustrativa, sin marcas ni modelo exacto, con nombre `/images/<tema>/hero-<keyword>.webp`. Hace falta también imagen de tarjeta si la página aparece en un hub o en Inicio, y imagen OG si corresponde. No publicar con la imagen genérica de la categoría si ya existe una propia.
- Las imágenes generadas por IA son ilustrativas y no se presentan como reproducción exacta de un modelo.
- Límite de QA para imágenes raster: 350.000 bytes. Cuando se sustituye un archivo defectuoso, subirlo con nombre nuevo para evitar caché/CDN (caso `hero-mejores-filamentos-pla-v2.webp`; el archivo anterior sin `-v2` no debe referenciarse).

## 8.9 Cabecera editorial, afiliación y schema

- Las comparativas muestran "Compra con Sentido" (enlace a `/sobre-nosotros/`) y fecha de actualización.
- **No repetir un aviso de afiliación en la cabecera** si el aviso global del sitio informa claramente de la relación con Amazon. (Pendiente solo de la comprobación contractual descrita en la sección 14.)
- Schema según corresponda: `WebSite`, `Organization`, `BreadcrumbList`, `Article`, `FAQPage` (solo si coincide exactamente con FAQ visibles), `Product`/`Review` solo con datos legítimos. No inventar valoraciones ni añadir `Product`, `Review` o ratings para aumentar el marcado. El autor del schema es la organización (ver autoría en la sección 14).

---

# 9. Amazon Afiliados

## 9.1 Requisitos de producto

Un producto principal de comparativa comercial debe: existir en Amazon.es, tener ficha activa, coincidir en modelo y variante, tener ASIN comprobado, indicar correctamente si es cuerpo solo o kit y poder enlazarse con afiliación. Un producto sin ficha válida puede mencionarse como referencia técnica, pero no como recomendación principal salvo decisión expresa.

**Revisión manual obligatoria antes de publicar.** Sergio abre en Amazon.es cada ASIN y confirma: ficha activa, ASIN, modelo y variante exactos, cuerpo solo o kit, batería y cargador, coherencia con el texto, Tracking ID, CTA e imagen. No se fusiona a `main` hasta que Sergio lo confirme. El acceso automatizado a fichas de Amazon.es no es fiable; no sustituir esta revisión por resultados ambiguos del buscador.

## 9.2 Enlaces y tracking

- Todos los enlaces afiliados llevan `rel="nofollow sponsored"` y el Tracking ID de su cluster, registrado en `.github/amazon-tracking-ids.json`. Un nuevo Tracking ID se registra ahí antes del merge.
- Tracking IDs documentados: llaves de impacto `ccc-llaveimpac-21`, amoladoras `ccc-amoladoras-21`, sierras circulares `ccc-sierras-21`, filamentos 3D `ccc-filam3d-21`. Tag general (Store ID principal): `librosde0a1-21`. Consultar el fichero central para el resto.

## 9.3 CTA

| Dónde | Texto |
|---|---|
| Estándar (fichas, "3 elecciones") | `Ver precio en Amazon` |
| Contextualizado, si hay varias variantes, cuerpo solo y kit, packs, o el botón aparece fuera de su ficha | `Ver precio del K2 Combo en Amazon`, `Ver precio del kit en Amazon`, `Ver precio del pack de 4 en Amazon` |
| Tabla comparativa (componente compartido `amazon-mini ccs-table-amazon`) | `🛒 Ver en Amazon` |

No usar el nombre del producto cuando el contexto ya sea inequívoco. Los CTA no muestran precios.

**Estilo del botón:** amarillo/dorado tipo Amazon, degradado suave, borde, sombra ligera, carrito genérico, hover discreto con ligera elevación, efecto de pulsación, responsive, sin logotipo de Amazon; reflejo animado solo si no perjudica el rendimiento. Cuando una ficha tiene varios formatos, el botón individual es el principal y los packs son secundarios, con el mismo estilo y jerarquía por tamaño/énfasis.

## 9.4 Precios

- **No mostrar precios fijos** (ni €/kg, ni cupones) si no se pueden mantener actualizados. Los precios observados pueden usarse internamente para analizar gama y posicionamiento, pero la web prioriza el CTA de consulta. Fórmula aceptada: `Consulta el precio y la disponibilidad actuales en Amazon`.
- Las valoraciones públicas **no incluyen el precio**. Las ofertas o packs se explican de forma cualitativa.
- No se adopta por ahora un indicador de gama económica/media/alta: depende de precios variables y exigiría mantenimiento sin API fiable. Puede reconsiderarse más adelante.

## 9.5 Creators API (bloqueada por elegibilidad)

- Aplicación `compra-con-sentido-api` creada en Amazon Afiliados (Store ID principal `librosde0a1-21`), credencial versión 3.2, Partner Tag de integración `ccs-api-21`. El Credential Secret se guarda fuera del repositorio y nunca va en HTML, JavaScript cliente ni GitHub.
- Cloudflare Worker `compra-con-sentido-api` en producción, con secretos `AMAZON_CREATORS_CLIENT_ID` y `AMAZON_CREATORS_CLIENT_SECRET` y variable `AMAZON_PARTNER_TAG=ccs-api-21`. Prueba real con `GetItems` y ASIN `B0BGBQSHPK`: la autenticación funciona, pero Amazon responde 403 `AssociateNotEligible`.
- **Causa confirmada por Amazon.es (04/10/2026):** la API exige **10 compras adscritas en 10 pedidos separados dentro de una ventana móvil de 30 días**; varios productos de un mismo pedido cuentan como una compra. A esa fecha: 13 productos en 8 pedidos válidos (faltaban 2).
- **Operativa:** no modificar Worker, OAuth, credenciales, Partner Tag ni endpoints por este error. Mientras esté bloqueada, crear enlaces con SiteStripe / Barra Web o Mobile GetLink. Reintentar cuando los informes de Amazon reflejen al menos 10 pedidos separados en 30 días y mantener un volumen regular, porque la elegibilidad depende de una ventana móvil.
- Uso previsto: consultar productos por ASIN, datos oficiales e imágenes, variantes y disponibilidad, y precios o ofertas dinámicos solo conforme a las condiciones de Amazon, siempre del lado servidor y con la web estática.

---

# 10. Sistema visual

- **Hero V5.1** (`/css/hero-v5.css`): una única geometría para categorías, guías y comparativas. Secuencia: menú fijo → breadcrumbs (un solo bloque visible, integrado sobre el hero) → espacio constante → kicker/tag → H1 → texto → firma editorial/chips/acciones. Sin alturas mínimas artificiales: la altura crece con el contenido. No volver a reajustar salvo problema real de responsive o accesibilidad.
- **Tarjeta de apertura global** (`/css/intro-v1.css`): `ccs-intro-overlap` / `ccs-intro-card` en todas las páginas internas. Referencia canónica: Inicio / Herramientas. Kicker en mayúsculas, verde medio, 13 px; H2 verde oscuro `clamp(30px,3vw,42px)` peso 800; texto gris editorial 17 px; tipografía Inter / system-ui. La apariencia de la tarjeta se controla solo desde `intro-v1.css`.
- **Apertura de comparativas** (`/css/comparison-opening-v1.css`): `ccs-comparison-opening` + `ccs-comparison-opening-card`, `main` con `ccs-comparison-main` y tres tarjetas `ccs-comparison-profile` dentro de `ccs-comparison-profiles`. Otros CSS compartidos: `/css/comparativas-v3.css` (tablas) y `/css/product-cards-v1.css` (fichas).
- **Espaciado global** (`/css/style-v4.css`): variables `--gap-content` (16 px), `--gap-card` (24 px), `--gap-section` (64 px), `--gap-page-end` (80 px) y `--pad-card`, con valores responsive reducidos (tarjetas 18 px, secciones 40 px, cierre 52 px). Utilidades `.ccs-stack`, `.ccs-card-grid`, `.ccs-section-gap`, `.ccs-card-pad`. No introducir `margin` o `gap` arbitrarios cuando una variable resuelva el caso.
- **Footer:** componente visual único, idéntico en todas las páginas, con estilos aislados del CSS específico de cada página. Cualquier cambio de contenido, enlaces o estructura se aplica a todas las páginas actuales y futuras.
- La página `404.html` utiliza también el footer global desde el 04/10/2026.
- **Contenido dentro de `<main>`:** nada después de `</html>`; bloques como "Cómo analizamos" van dentro de `<main>`.
- No compactar `hero-v5.css` ni `intro-v1.css` sin una regresión visual completa de toda la web.
- **Cierre de navegación con tarjetas hero clicables (aprobación de estilo 28/10/2026):** el formato preparado en la comparativa de gatos de botella, PR #75, utiliza un párrafo breve seguido de dos tarjetas con sus propias imágenes hero; cada tarjeta entera funciona como enlace, sin botones separados. Presentación de dos columnas en escritorio y una en móvil. **Plan:** una vez publicada y validada esta página, revisar y extender el patrón al resto de páginas donde existan dos destinos internos relevantes; no crear tarjetas sin utilidad editorial ni afirmar que este cambio ya está aplicado a toda la web.
- **Componente compartido de enlaces con hero (`/css/related-heroes-v1.css`):** diseñado en PR #76 para evitar duplicar CSS en cada página. Dos tarjetas con imagen existente, enlace en toda la superficie, sin botones separados, dos columnas en escritorio y una en móvil. La selección debe ser contextual: guías/comparativas relacionadas, no enlaces de relleno. Aplicación a 10 páginas fusionada con `main` mediante PR #76 el 28/10/2026. El patrón se sigue extendiendo en PR #77.


---

# 11. QA y flujo de publicación

## 11.1 Checks automáticos (obligatorios en cada PR)

- `.github/scripts/site-audit.py` (parte del check `build`) valida para todas las páginas públicas: correspondencia sitemap ↔ `index.html`, `lastmod` válido y no futuro, un H1, title, meta description, canonical exacta, Open Graph y Twitter Card, breadcrumbs, cierre HTML sin contenido tras `</html>`, `rel="nofollow sponsored"` en enlaces Amazon, Tracking IDs registrados, párrafos con separadores huérfanos, `caption` y `scope` en tablas, estructura de tablas, favicon declarado y existente, consistencia del menú global (rutas normalizadas), imágenes raster pesadas y que toda URL de tercer nivel o más esté en la navegación dinámica (salvo excepción declarada).
- `.github/scripts/responsive-audit.mjs` toma las URLs del `sitemap.xml` (sin lista manual) y comprueba 360, 390, 768 y 1440 px: HTTP, H1, breadcrumbs, overflow, elementos fuera de viewport, imágenes rotas, menú móvil/escritorio y, en comparativas, tarjeta inicial, exactamente 3 perfiles, aviso de tabla y fichas.
- `.github/workflows/optimize-webp.yml` convierte automáticamente a WebP los PNG/JPG/JPEG pesados (umbral 300.000 bytes, lado máximo 1600 px, calidad 82), reescribe referencias, elimina el original y recomprime WebP pesados cuando compensa.

## 11.2 Control previo a publicación (residuos editoriales)

El control está automatizado en `.github/scripts/site-audit.py` y forma parte del check `build`. Detecta, entre otros casos, lenguaje de borrador, atributos internos de prepublicación, `decoding=` mal colocado tras el cierre de una imagen y entidades HTML residuales asociadas a atributos visibles.

Incidencias cerradas el 04/10/2026:
- Taladros: corregidas las 6 fichas donde `decoding="async">` aparecía como texto visible por un cierre incorrecto de `<img>`.
- Sierras circulares: eliminados `review-before-merge` y textos de prepublicación/internos; corregida también la discrepancia editorial de “tres enfoques” frente a seis viñetas.
- Hogar: retirada la nota interna “Publicaremos nuevas categorías…”.
- El workflow `Responsive audit` vuelve a ejecutarse en pull requests contra `main` y comenta sobre la PR actual.


Antes de publicar o actualizar una página comercial buscar, como mínimo:

- `pendiente`, `antes de publicar`, `validar`, `borrador`, `publicaremos`, notas dirigidas al equipo;
- atributos HTML visibles (`decoding=`, `loading=`, fragmentos `">&gt;`);
- importes fijos con `€` que incumplan la política de precios;
- atributos internos de validación o prepublicación sin valor en el HTML final.

## 11.3 Checklist de cierre de una página nueva

Contenido y SEO cerrados; hero específico; imagen de tarjeta si aparece en hub/Inicio; imágenes exactas de producto; ASIN verificados manualmente; tracking; CTA; menú (HTML y `submenuData`); breadcrumbs; enlazado interno; sitemap; schema; favicon; revisión responsive; control de residuos; `build` en success; preview visual aprobada por Sergio; autorización explícita de merge.

---

## 11.4 Lote de humanización y enlaces internos · PR #76 (28/10/2026)

**Estado:** usuario aprobó la primera y segunda revisión, PR #76 fusionada con `main` el 28/10/2026 mediante squash merge `5acd6bb40c23a201fcf305e180aadf6b1cb99fc0`.

**Alcance (10 URLs ya existentes):** guía de gatos hidráulicos, comparativa de carretilla, guía y comparativa de taladros, llaves de impacto, amoladoras, sierras circulares, guía y comparativa de deshumidificadores y comparativa de PLA. Se preservan URL, canonical, tablas, cifras, productos, ASIN y tracking.

**Trabajo preparado:** dos pasadas con `humanizer-sergi` de introducciones, recomendaciones y descripción de experiencia de uso; limpieza de recuadros «Cómo analizamos», «Cómo puntuamos», referencias defensivas a procedimientos/cálculos y notas genéricas de documentación. Se mantiene la información que resuelve dudas reales y los datos técnicos no verificados no se presentan como confirmados. Dos tarjetas hero y destinos internos específicos al final de cada una de las 10 URLs; nuevo CSS compartido; byline, `dateModified` y `lastmod` del sitemap actualizados.

**Control estructural tras segunda pasada:** las 10 páginas se han auditado sin encontrar restos de los recuadros, frases de cálculo o metacomentarios señalados; todas conservan H1, tablas, CTA y enlaces de afiliado, sus dos tarjetas hero y datos estructurados parseables. Los valores no publicados por fabricante se conservan como no confirmados donde son materialmente relevantes, sin inventarlos. Build y optimización de imágenes correctos; auditoría responsive completada con 108/108 comprobaciones correctas antes de la fusión.

**Cierre:** publicación autorizada por Sergio tras revisar la vista previa de la comparativa de carretilla y validar la limpieza de contenido. La primera tanda está cerrada.

## 11.5 Segundo lote de humanización y enlazado interno · PR #77 (28/10/2026)

**Estado:** PR #77 fusionada en main mediante squash `5410fdb5`. El usuario solicitó aplicar íntegramente los criterios de la primera y segunda pasada del lote anterior. La auditoría consolidada posterior identifica correcciones de contenido que se preparan en el lote B.

**Alcance (10 URLs existentes):**
- Aspiradoras: guía de aspiradoras y comparativa de robots aspiradores.
- Deshumidificadores: guía de capacidad por superficie y comparativa para secar ropa.
- Impresión 3D: hub de categoría, guía de accesorios, guía de filamentos, PLA vs TPU, guía de impresoras y comparativa de impresoras.

**Trabajo:** humanización de introducciones, perfiles y fichas, especialmente seis robots y seis impresoras; retirada de «Cómo analizamos», «En uso real», selección por puntuación y bloques de metodología redundantes. Enlace interno con 20 tarjetas hero usando `css/related-heroes-v1.css` y los heroes ya existentes, dos por página. Se preservan comparativas, productos, información técnica, datos estructurados y enlaces Amazon. Actualizados `dateModified`, las fechas visibles donde existen y el `lastmod` de las diez URLs. Corregido un cierre `</section>` sobrante previo en PLA vs TPU.

**Control:** revisión estructural local del HTML y JSON-LD: diez H1 únicos, tablas y enlaces comerciales conservados, imágenes enlazadas a destinos existentes y sin restos de los textos editoriales señalados. La publicación de esta tanda se cerró; las nuevas correcciones de la auditoría consolidada se revisan en su propia PR.

---

# 12. Estado del sitio

## 12.1 Páginas publicadas

**Estado del sitemap comprobado en `main` el 29/10/2026: 27 URLs públicas.** Las rutas abreviadas de la tabla se interpretan dentro del cluster correspondiente; el sitemap contiene las rutas canónicas completas.

| Cluster | URL | Tipo |
|---|---|---|
| General | `/`, `/sobre-nosotros/`, `/metodologia/`, `/aviso-legal/` | Inicio e institucionales |
| Herramientas | `/herramientas/` | Hub |
| | `/herramientas/gatos-hidraulicos/` y `/mejores-gatos-hidraulicos-para-coche/` | Guía y comparativa de carretilla |
| | `/herramientas/gatos-hidraulicos/mejores-gatos-hidraulicos-botella/` | Comparativa de gatos de botella 2–6 t (28/10/2026) |
| | `/herramientas/taladros-a-bateria/` y `/mejores-taladros-a-bateria/` | Guía y comparativa |
| | `/herramientas/llaves-de-impacto/` | Comparativa |
| | `/herramientas/amoladoras-a-bateria/` | Comparativa |
| | `/herramientas/sierras-circulares-a-bateria/` | Comparativa |
| Hogar | `/hogar/` | Hub |
| | `/hogar/aspiradoras/` y `/mejores-robots-aspiradores/` | Guía y comparativa |
| | `/hogar/deshumidificadores/`, `/cuantos-litros-deshumidificador-metros-cuadrados/` y `/mejores-deshumidificadores/` | Guía, guía de capacidad y comparativa |
| | `/hogar/deshumidificadores/deshumidificadores-para-secar-ropa/` | Comparativa de secado de ropa (23/10/2026) |
| Impresión 3D | `/impresion-3d/` | Hub |
| | `/impresion-3d/impresoras-3d/` y `/mejores-impresoras-3d/` | Guía y comparativa |
| | `/impresion-3d/filamentos-3d/` y `/mejores-filamentos-pla/` | Guía y comparativa |
| | `/impresion-3d/filamentos-3d/pla-vs-tpu/` | Guía comparativa informacional (24/10/2026) |
| | `/impresion-3d/accesorios-3d/` | Guía |

Las ocho comparativas anteriores a PLA y la propia PLA comparten el sistema visual de las secciones 8 y 10. Diseño V1 está cerrado y publicado (auditoría responsive final: 88/88 comprobaciones sin incidencias antes del merge). La unificación incluyó breadcrumbs integrados sobre el hero, menús sin enlaces duplicados, footer único y recursos locales (sin CSS remoto ni imágenes de fondo con dominio absoluto).

## 12.1.1 Gatos hidráulicos de botella · publicación aprobada (28/10/2026)

- URL: `/herramientas/gatos-hidraulicos/mejores-gatos-hidraulicos-botella/`; PR #75 de `content/gatos-botella-20261028` a `main` (squash).
- Seis modelos y ASIN verificados manualmente en Amazon.es por Sergio el 28/10/2026: Bahco BH4G2 `B0DS64V5V3`, KS Tools 160.0351 `B001NYWYBK`, Michelin 009559 `B0099R28RS`, KS Tools 160.0352 `B001NYVDKS`, SIXTOL SX1147 `B0CVBD954Z` y SIXTOL SX3080 Premium `B0DYTZ4Y5L`. Tracking `ccc-gatohid-21`.
- Revisión con `humanizer-sergi`: textos centrados en el uso de cada modelo, sin notas editoriales defensivas en el HTML. Fotografías WebP individuales y hero contextual; la tabla muestra dimensiones, recorrido, tornillo y peso. Trazabilidad de cifras y discrepancias en `.github/content-drafts/gatos-botella-investigacion-20261028.md`.
- Enlaces internos incorporados a la navegación global, el hub Herramientas, la guía de gatos hidráulicos y la comparativa de carretilla; nueva URL en sitemap. Menú global `submenuData` actualizado y versión JS actualizada en páginas actuales. Más enlaces contextuales se revisarán al humanizar otras páginas.
- Cierre editorial: párrafo corto y dos tarjetas con sus respectivos heroes clicables que llevan a la guía y a la comparativa de carretilla. **Patrón aprobado** para extenderlo después, cuando exista una pareja de destinos internos pertinentes.
- QA previo a publicación: `PR build` correcto, `Optimizar imágenes` correcto y auditoría responsive 108/108 correcta; aprobación visual y autorización expresa de publicación confirmadas por el usuario.

## 12.2 Comparativas antiguas (revisión técnica cerrada el 30/09/2026)

Las cinco comparativas anteriores a llaves de impacto pasaron la revisión `Amazon.es → ASIN → variante exacta → fabricante → documentación → especificaciones comparables → cuerpo/kit → disponibilidad → discrepancias`.

- **Gatos hidráulicos:** seis modelos contrastados (por ejemplo, BGS 2889: 2,5 t, 100-460 mm; Einhell CC-TJ 2000: 2 t, 135-330 mm; Tarpofix 3T: 3 t, 85-475 mm). Cerrada sin cambios de producto.
- **Taladros:** seis modelos revisados. La promesa "menos de 200 €" seguía siendo válida a 30/09/2026 (DeWalt, el más cercano al límite). Se eliminaron referencias a precios observados.
- **Robots aspiradores:** especificaciones contrastadas; se eliminaron recuentos de valoraciones y frases basadas en popularidad de Amazon; la tabla muestra "Ideal para" en lugar de valoraciones observadas.
- **Deshumidificadores:** seis modelos; discrepancia de conectividad en Midea DF20 entre ficha comercial y documentación oficial, dejada explícita sin inventar el dato.
- **Impresoras 3D:** seis modelos con documentación oficial; en Flashforge AD5X se mantiene la distinción entre velocidad de impresión y de desplazamiento.

## 12.3 Llaves de impacto a batería · cerrada y publicada (29/09/2026)

Keyword `mejores llaves de impacto a batería`; enfoque coche y bricolaje; tracking `ccc-llaveimpac-21`.

Productos y ASIN: Bosch GDS 18V-450 HC `B0BGBQSHPK`, Ryobi RIW18BL-0 `B0DDKX9TQ1`, Einhell IMPAXXO 18/450 `B09VPV3NZD`, Makita DTW700Z `B08HN48666`, DeWalt DCF891NT-XJ `B0B3N6WM34`, Milwaukee M18 FMTIW2F12-0X `B08TZRFZTR`.

Decisiones: separar siempre apriete y desapriete; no asumir que más Nm es mejor ni garantizar aflojar cualquier fijación; peso sin batería; incluir longitud; sin columna de cuadradillo (1/2" en los seis); sin autonomía genérica. La página explica que se puede usar para desmontar y aproximar tuercas, que el apriete final se comprueba con llave dinamométrica al par del fabricante, y que se usan vasos de impacto (no cromados convencionales). 5 FAQ visibles con `FAQPage`. Hero: imagen contextual Ryobi con overlay verde y texto HTML.

## 12.4 Amoladoras a batería · cerrada y publicada (30/09/2026)

URL `/herramientas/amoladoras-a-bateria/`; title `Mejores amoladoras a batería de 125 mm: 6 modelos 18 V`; tracking `ccc-amoladoras-21`; 5 FAQ con `FAQPage`; 12 enlaces Amazon.

Productos y ASIN: Bosch GWS 18V-11 S (cuerpo solo, `06019N4000`) `B0DQV82L7J`; Makita DGA511Z `B079QF54JP`; DeWalt DCG405N-XJ `B074V6QSNH`; Einhell Professional TP-AG 18/125-13 Q P BL Solo `B0H3NVNRTX`; Milwaukee M18 BLSAG125X-0 `B0CHK5DX4C`; Metabo WVB 18 LT BL 11-125 Quick `B0B7RB9PYZ`.

Cautelas editoriales: no atribuir AFT ni AWS a la Makita DGA511Z en el mercado español; no comparar peso ni potencia equivalente en vatios entre marcas; diferenciar freno de disco, protección anti-kickback y desconexión por interruptor de hombre muerto; dato no confirmado → `–`.

## 12.5 Sierras circulares a batería · cerrada y publicada (03/10/2026)

URL `/herramientas/sierras-circulares-a-bateria/`; title `Mejores sierras circulares a batería: 6 modelos de 165 mm`; tracking `ccc-sierras-21`; 12 CTA; hero y tarjeta propios en `/images/sierras-circulares/`; seis imágenes de producto aportadas por Sergio.

Productos y ASIN: Bosch GKS 18V-57-2 GX (`06016C1001`, con L-BOXX, sin batería) `B0DFWZTHNK`; Makita DHS680Z `B00WW83F4Q`; DeWalt DCS565N-XJ `B099X7HBQF`; Einhell TP-CS 18/165 Li BL Solo `B0DX71B1JN`; Metabo KS 18 LTX 57 BL (`611857840`) `B0CW192FVD`; WORX WX530 (kit con batería 2 Ah) `B07GY6LYTT`.

Tres elecciones: cortes guiados y precisos → Bosch; uso general compacto → Makita; empezar desde cero con batería y cargador → WORX.

Cautelas: Einhell 44 mm a 45° ya aparece en la ficha y tabla; la nota interna de discrepancia se retira del contenido en el lote B; Makita con carril mediante adaptador `196953-0`, no compatibilidad directa; WORX bisel 50° y nomenclatura PowerShare "20 V Max" explicada, no escrita como "18 V" sin contexto; Bosch Stop Control no es un "freno eléctrico"; DeWalt sin compatibilidad dedicada con carril. Reservas: Ryobi R18CS-0 (inconsistencia de denominación en Amazon), Milwaukee M18 FCS552-0 (ficha/ASIN no confirmados), HiKOKI C1806DA.

## 12.6 Mejores filamentos PLA · cerrada y publicada (04/10/2026)

URL `/impresion-3d/filamentos-3d/mejores-filamentos-pla/`; keyword `mejores filamentos PLA`; title `Mejores filamentos PLA: 6 opciones según el uso`; H1 `Mejores filamentos PLA: cuál comprar según lo que vas a imprimir`; tracking `ccc-filam3d-21`; schema `Article`, `BreadcrumbList` y `FAQPage` (8 FAQ visibles); hero `/images/filamentos-pla/hero-mejores-filamentos-pla-v2.webp` y OG `og-mejores-filamentos-pla.webp`. Enlazada desde Inicio, `/impresion-3d/` y `/impresion-3d/filamentos-3d/`. La guía de filamentos sigue siendo informacional (qué material elegir); esta responde qué PLA concreto comprar.

**Selección (una bobina individual por producto, 1,75 mm, comparada en tabla):**

| Producto | ASIN | Packs (2 / 4) | AMS / AMS 2 Pro | Perfil |
|---|---|---|---|---|
| ELEGOO PLA negro 1 kg | `B0CD7BTN37` | `B0CD789G2S` / `B0CD7C5GFH` | ⚠️ cartón (anillo/adaptador recomendable) | PLA estándar fácil y de coste contenido |
| eSUN PLA+ 1 kg | `B07FQ98RNP` | `B0B749Z8H1` / `B0CVVRPMJR` | ✅ bobina plástica | PLA+ generalista con amplia experiencia de uso |
| SUNLU High Speed PLA+ 2.0 1 kg | `B0FDGKJ1BJ` | `B0FDGCPMWJ` / `B0FDGFWFYP` | ✅ bobina plástica | Alta velocidad |
| OVERTURE PLA Professional 1 kg | `B09PDCLSLY` | `B0CQ1SP6YD` / `B0DQ53M2BN` (pack de 4 negro) | ⚠️ cartón | Equilibrado, piezas de uso frecuente o exigencia moderada |
| JAYO PLA 1,1 kg (PLA normal, ref. `PLA-BK-1100G`) | `B0BHQR69RW` | `B0BHR3SKCV` / `B0DPKQYS2X` | ✅ bobina plástica | Mucha cantidad por coste |
| Winkle PLA HD 1 kg | `B08LQJ8W1F` | sin pack equivalente | ❌ para AMS / AMS 2 Pro (bobina ≈175 × 77 mm; algunas fichas indican AMS Lite) | Consistencia, acabado y fabricación española |

Reserva: Creality Hyper PLA RFID negro `B0DJXMLW6P`. Descartados: Polymaker/Panchroma Matte y Creality Rainbow/efectos especiales (para una futura comparativa de filamentos especiales). El ASIN `B0DQTSZ4ZH` (pack mixto OVERTURE negro/blanco) no se usa. No usar la imagen "PLA Matte" de JAYO ni la cifra de 140 mm de una imagen de Amazon: contradice otras fuentes (≈200 × 61 mm).

**Criterio AMS:** referencia Bambu Lab para AMS/AMS 2 Pro: ancho 50-68 mm, diámetro 197-202 mm, bobina plástica recomendada y adaptador para cartón. ✅ uso directo; ⚠️ compatible con precauciones; ❌ no compatible directamente. El símbolo se asigna a la bobina exacta de la referencia, no a la marca. En la tabla va el símbolo con etiqueta visible y leyenda; la explicación concreta va en la ficha.

**Columnas de la tabla:** Modelo · Tipo · Tolerancia · Temperatura de boquilla · Velocidad fabricante · AMS · Mejor para · CTA. El nombre completo de temperatura se aplica en el lote B. Sin columna de peso ni de precio. Tolerancia solo con dato oficial (Winkle: `No declarada` hasta tener fuente primaria; los distribuidores discrepan entre ±0,02 y ±0,03 mm). Velocidad solo si el fabricante la publica (ELEGOO: 30-70 mm/s); si no se puede verificar, `—`. La velocidad es siempre una declaración del fabricante: 600 mm/s de SUNLU es un máximo declarado, no un rendimiento garantizado.

**Valoración técnica:** las puntuaciones y barras descritas en versiones anteriores del MASTER ya no aparecen en main. No restaurarlas ni aludir a una nota de fiabilidad inexistente. El lote B retira esas referencias residuales y los juicios de opiniones sin fuente; las decisiones de compra se apoyan en las prestaciones y límites explicados. El histórico de notas se conserva en Git, sin presentarlo como ensayo propio ni valoración pública vigente.

**Packs:** la tabla compara siempre una bobina individual. En cada ficha, el bloque "Si compras más cantidad" explica de forma cualitativa cuándo compensa un pack (sin importes ni cupones) y los botones de pack son secundarios. No afirmar que un pack o una bobina es más barato por kilo sin un dato actual mantenido. El lote B sustituye conclusiones históricas de precio por comprobación de formato, peso total y precio actual.

**Orden de ficha PLA:** el canónico de la sección 8.7 con "Si compras más cantidad" antes del CTA, sin bloque de puntuación actualmente publicado. El orden visual se fija con `order` CSS (los bloques PLA personalizados deben llevarlo asignado). Hero con una sola capa verde (se neutraliza `.ccs-hero::before` en esta página para no tapar la imagen).
**Ajuste visual 04/10/2026:** la comparativa PLA carga `comparison-opening-v1.css?v=20261004-2`, igual que las otras comparativas. Se cerró así la incidencia de caché por la que los CTA de las tres elecciones podían verse como simples enlaces en producción. Verificado visualmente por el usuario tras el despliegue.

---

# 13. Decisiones cerradas (consolidado)

**Infraestructura y SEO:** marca Compra con Sentido y dominio `compraconsentido.es` sin `www`, con `www` → 301; GitHub es la fuente del código; Cloudflare Pages es el hosting y gestiona DNS, CDN y HTTPS; infraestructura estática siempre que sea posible; TLS mínimo 1.2; HSTS desactivado por ahora; no usar `pages.dev` como URL pública; Search Console principal = propiedad de dominio; no tocar DNS ni sitemap sin razón; no bloquear bots de entrenamiento por ahora; crecimiento mediante URLs nuevas solo para intenciones diferenciadas demostrables por SERP/GSC y sin exigir un umbral fijo de 50-100 impresiones; no crear páginas por simples variaciones de keyword.

**Contenido y afiliación:** Amazon España es el destino principal; verificar ASIN y variante antes de publicar; sin precios fijos; sin pruebas físicas inexistentes; fuentes oficiales primero; no mezclar magnitudes no equivalentes; sin ranking global; exactamente 3 perfiles ("3 elecciones según necesidad") sin numerar; tabla móvil sin columna fija; CTA estándar `Ver precio en Amazon`, contextualizado con variantes; `Probado por nosotros` solo con prueba documentada y sin etiquetas negativas; sin aviso de afiliación repetido en cabecera; separación informacional / comparativa; control previo a publicación de residuos editoriales; breadcrumbs en todas las páginas salvo la home; navegación revisada globalmente al publicar.

**Decisiones no adoptadas por ahora:** indicador de gama relativa; mover la teoría de guías a desplegables; precio de Amazon dentro de la valoración pública.

---

# 14. Decisiones abiertas y pendientes

## Decisiones abiertas

1. **Autoría:** organización como autor (actual), autor personal con Compra con Sentido como publisher o sistema mixto por categoría. Decisión transversal pendiente; evaluar privacidad, coherencia editorial y schema. No hay datos sólidos que justifiquen cambiarla ahora.
2. **Valoración técnica de PLA:** documentar/verificar la ponderación vigente tras retirar el precio, sin reintroducir puntuaciones subjetivas por defecto.

**Decisiones ya ejecutadas:** retirada del tope de 200 € de la comparativa de taladros (lote B, PR #84) y de la promesa «calidad-precio» en PLA. Tipografía de sistema, nombres de menú/pie y etiquetas de fotos ilustrativas aplicados mediante D/E (#85/#86); no tratarlos como pendientes.

## Auditoría consolidada: decisiones aprobadas el 28/10/2026

- Base revisada: 27 URLs en sitemap y 49 imágenes sin alguna dimensión declarada. Aceptadas las correcciones P1 y P2 del plan consolidado.
- Literal de decisión aprobado: «Encaja si…» (§8.7). Aplicado a las once comparativas mediante el lote B, PR #84, con revisión del usuario y publicación autorizadas el 28/10/2026 tras las correcciones finales.
- Tipografía de sistema común y nombres «Sobre nosotros», «Aviso legal, privacidad y afiliación» y «Guías destacadas»: **aplicados en producción** mediante lotes D y E (PR #85 y #86), sin cambios de URL.
- Se mantienen el CTA compacto de tabla de §9.3 y el desplazamiento de la tabla completa sin columna fija. Autoría personal, revisión legal y rediseño de portada se tratan aparte.
- Una PR por lote, siempre contra main. Tras publicar, entregar textos y archivos concretos que comprobar en producción.
- El usuario autoriza corregir ya el enlace de «Cuántos litros» y sustituir la imagen defectuosa de Cecotec por la imagen existente del mismo modelo/ASIN usada en «Secar ropa». Se añade la leyenda «–: no declarado en la ficha española» bajo la tabla de amoladoras, sin atribuir ni negar AFT a Makita.
- **Lote A cerrado:** PR #83 fusionada contra main mediante squash `e995b626908534fc218bed6f2bd1e8b415018e47`. Build, optimización y Cloudflare correctos; responsive 108/108. Enlace de litros, Cecotec y leyenda de amoladoras comprobados en producción por el usuario el 28/10/2026.
- Datos iniciales de PageSpeed móvil recibidos el 28/10/2026 y contrastados tras D/E (ver registro de medición). El lote D2 de CSS/JS/portada también se publicó el 28/10, pero **su PageSpeed de producción aún no se ha medido**. La sustitución puntual del Cecotec está cerrada.

### Lote B de contenido · PR #84

Rama `editorial/auditoria-lote-b`, basada en main tras #83. El usuario ha revisado la PR #84 comparándola con main y autoriza publicarla tras corregir la duplicación de Lefant y los destacados genéricos. Las correcciones y la revisión transversal de destacados están incorporadas en la misma PR. Integrado en main y comprobado por el usuario en producción: los seis puntos están correctos. Incluye «Encaja si…», retirada de atribuciones de opiniones/pruebas sin fuente, notas internas y ASIN visibles de amoladoras, perfiles sin numeración, limpieza de precio en taladros/PLA, coherencia de FAQ y metadatos, y enlaces primarios junto a afirmaciones verificadas. Se conserva la leyenda y la incertidumbre técnica de Makita.

Los seis destacados de PLA explican diferencias de tolerancia, formulación, bobina, velocidad declarada, cantidad y origen de fabricación. Los destacados de otras comparativas sustituidos por opiniones se han revisado también; no se convierten en instrucciones genéricas de comprobación. Los restos «Selección actual», «Peso*», «2,95 kg producto», «Manitas», «Para nosotros» y «Tabla comparable» se reservan para el lote E por indicación del usuario.

Las imágenes, dimensiones, srcset, CSS, tipografía, precargas y JavaScript no se modifican en este lote. Los nombres globales de navegación se aplicarán en el lote correspondiente. La revisión de autoría, obligaciones legales y portada sigue separada.

Pendientes técnicos: correspondencia ASIN/referencia y Wi-Fi de Midea; comparación acústica con condiciones homogéneas; base de peso de sierras; verificación completa de las variantes de gatos, taladros, PLA y Lefant. La vinculación De'Longhi de la guía de litros se concreta como DDSX220WFA y 21 L/24 h a 32 °C/80 % HR según la hoja técnica enlazada; la discrepancia con otros materiales comerciales de 30 °C se conserva como cautela interna. No se trasladan rangos ni prestaciones de otra variante por inferencia.

### Referencia inicial móvil aportada por el usuario (28/10/2026)

| Página | Primera pantalla | Página completa |
| --- | ---: | ---: |
| Portada | 224 KB | 1.666 KB |
| Amoladoras | 156 KB | 753 KB |
| Gatos para coche | 124 KB | 1.537 KB |

HTML, CSS y JS: entre 24 y 36 KB según página. El usuario observa 0 saltos de diseño en las tres.

**PageSpeed móvil (28/10/2026, 17:54-17:58, datos del usuario):** portada 98 / LCP 1,1 s / CLS 0 / TBT 0 ms / Speed Index 3,8 s; amoladoras 99 / 1,1 s / 0 / 0 ms / 3,7 s; gatos para coche 99 / 1,1 s / 0 / 0 ms / 3,6 s. CSS bloqueante estimado: 420 / 710 / 650 ms. Ahorro potencial de imágenes: 402 KiB / 46 KiB / no indicado. Accesibilidad: 100 / 96 / 96; SEO: 92 en las tres. Conservar KB y KiB como unidades distintas. Son mediciones iniciales aportadas por el usuario, no una prueba de regresión de la preview del lote B.

No hay evidencia de un problema de LCP o CLS en estas pruebas. Prioridades del siguiente lote: evaluar agrupación o CSS crítico sin alterar cascada; etiquetas de fichas de #6b7770 a un color con contraste suficiente, propuesta #5f6d65 sobre #f7faf8; banner «Más información sobre cookies». Imágenes y precargas quedan como mejoras secundarias basadas en ahorro medido. No prometer que todo el tiempo señalado como CSS bloqueante se recuperará en Speed Index. El usuario repetirá las mismas mediciones al publicar ese lote.

No constan aún dispositivo, caché o condiciones de red; comparar antes/después con las mismas condiciones. Registro detallado en `.github/measurement/mobile-baseline-20261028.md` y plan en `.github/measurement/performance-plan-20261028.md`.

## Pendientes inmediatos

- [x] CTA PLA alineados con el estándar (04/10/2026); correcciones editoriales y de UX de PR #76 a #86 integradas, incluidos los lotes A/B/D/E.
- [x] D2 (#87) fusionado en `main` y desplegado correctamente en Cloudflare el 28/10/2026; auditoría PageSpeed móvil de las tres URL de referencia completada el 29/10. Solo queda la comprobación visual/funcional final.
- [x] **PageSpeed móvil post-D2 de las tres referencias cerrado:** portada, amoladoras y gatos de carretilla medidos por el usuario el 29/10/2026: todas rendimiento 99, accesibilidad 100, buenas prácticas 100, SEO 100, LCP <= 1,1 s, TBT 0 ms y CLS 0. Ver sección «PageSpeed móvil después de D2».
- [ ] **Comprobación visual/funcional final** de navegación y consentimiento en producción, sin contaminar GA4. No rehacer optimizaciones generales para perseguir un punto Lighthouse.
- [ ] **Validar GA4:** `amazon_click` como evento clave y dimensiones `product_name`, `asin`, `affiliate_tag` con eventos nuevos; confirmar que no salen eventos de previews.
- [ ] **Revisar indexación concreta:** confirmar que Google recarga el sitemap de 27 URLs y observar gatos de botella y PLA vs TPU; no interpretar `indexed=0` del conector como verdad.
- [ ] Confirmar manualmente el menú «Sobre nosotros» y el footer de `404.html` en producción; no repetir verificaciones ya documentadas sin motivo.
- [ ] Revisar el aviso de afiliación frente a las condiciones vigentes de Amazon y la estructura legal de privacidad/cookies. Autoría e información institucional requieren decisión editorial aparte.
- [ ] Mantener el lote C de imágenes aparcado hasta contar con elegibilidad, acceso y derechos de uso de las fotografías oficiales.

## SEO / Search Console

- [ ] Reinspeccionar las URLs no indexadas el 30/09 y las publicadas después (sierras y PLA); revisar el informe agregado del sitemap cuando se actualice.
- [ ] Analizar consultas e impresiones cuando haya datos; priorizar posiciones aproximadamente 8-20 y revisar Core Web Vitals reales.
- [ ] Configurar Bing Webmaster Tools.
- [x] Search Console accesible mediante Windsor.ai para `sc-domain:compraconsentido.es`; mantener GSC como fuente de verdad y no depender de GSC Wizard.
- [x] Señal GSC 23/10/2026 en `/impresion-3d/filamentos-3d/`: 62 impresiones (14–20/10) frente a 12 (7–13/10); `filamento tpu vs pla` 15 vs 2 y `pla vs tpu` 13 vs 1. Investigación SERP, intención, canibalización y matriz técnica cerradas el 23/10/2026. Resultado: `/impresion-3d/filamentos-3d/pla-vs-tpu/` publicada el 24/10/2026, tras redacción, revisión editorial y visual, imágenes WebP, enlaces contextuales entrantes desde hub de impresión 3D, guía de filamentos, mejores PLA y accesorios 3D, enlaces salientes relacionados, navegación dinámica global, sitemap y comprobaciones de build/responsive/optimización. Pendiente: inspección e indexación en Search Console y seguimiento de consultas.

## Contenido

- [ ] Continuar la keyword research del cluster Herramientas y validar por SERP las nuevas URLs antes de producirlas.
- [ ] Continuar el bloque de expansión por intención diferenciada: `deshumidificadores para secar ropa`, PLA vs TPU y gatos hidráulicos de botella completadas. Siguiente orden de estudio: taladros percutores a batería → deshumidificadores silenciosos/dormitorio. Validar cada nueva URL por SERP antes de producirla.
- [ ] Investigar plataformas de herramientas/baterías 18 V (hub estratégico para elegir ecosistema de batería, no para duplicar comparativas existentes) y analizar el encaje arquitectónico de hidrolimpiadoras para coche.
- [ ] Definir progresivamente las primeras 20-30 URLs de alta calidad. No crear variantes por simples keywords/modificadores si la intención ya queda cubierta por una URL existente.

## Sitio y transparencia

- [ ] Revisar la estructura legal de privacidad, cookies y afiliación.
- [ ] Mantener `/sobre-nosotros/` y la firma editorial coherentes (`/metodologia/` ya está publicada y enlazada desde el footer y Sobre nosotros).
- [ ] Revisar la página 404 y otros elementos técnicos globales.

## Infraestructura

- [ ] Comprobar la renovación automática del dominio.
- [ ] Mantener HSTS desactivado hasta nueva decisión y vigilar las reglas de bots de Cloudflare.
- [ ] Reintentar la Creators API cuando se cumpla el mínimo de pedidos adscritos.

---


## Publicación editorial y UX del 28/10/2026

- **Estado de integración comprobado:** PR #77 llegó a main mediante squash `5410fdb5`. Las fusiones iniciales de #78 y #79 fueron a ramas intermedias; sus cambios llegaron efectivamente a main mediante la PR correctiva #82 (`43db213ae468db21896ab3b88553d4b44616afc8`). No equiparar fusión de una PR con publicación en producción. No hubo nuevas URLs por esta fase.
- Patrón visual final de FAQ: título «Preguntas frecuentes» independiente de la caja contenedora, preguntas individuales en `<details>/<summary>`, CSS compartido `css/faq-standard-v1.css`. Se ha retirado la tarjeta envolvente en la actualización final de PR #79.
- Pruebas de PR #79: 108/108 controles responsive automatizados correctos en 27 páginas y cuatro viewports (360, 390, 768, 1440 px) para el commit funcional `575d599`; cambios posteriores en CSS y documentación se integraron en la misma PR. En la revisión de `main` posterior a las tres fusiones se confirmaron los checks `build` y `Cloudflare Pages` satisfactorios. No equiparar esta auditoría automática a una revisión visual humana exhaustiva.
- **Estado posterior:** las correcciones A/B/D/E ya fueron integradas y comprobadas en producción en sus respectivos cierres; D2 también está desplegado y solo requiere medición/inspección final. Mantener separadas y sin reapertura automática las imágenes intermedias de guías densas, la profundidad de fichas de llaves de impacto y la revisión de afirmaciones sobre experiencia de uso de deshumidificadores.

---

# 15. Organización del proyecto y reglas operativas

## 15.1 Proyecto en ChatGPT

Proyecto **Compra con Sentido**, con estos chats: `00 - MASTER y dirección` (decisiones globales, estrategia, MASTER), `01 - Dominio + Cloudflare + GitHub` (infraestructura y publicación), `02 - SEO + Keywords + Arquitectura` (SERP, clusters, keywords), `03 - Diseño + Plantilla web` (diseño global, HTML, CSS, componentes, responsive), `04 - Migración páginas actuales` y `05 - Search Console + SEO real`. Avisar al usuario cuando convenga continuar una fase en otro chat.

## 15.2 Regla de traspaso entre chats

Cuando una tarea deba continuar en otro chat, entregar en la misma respuesta un texto **listo para copiar y pegar**, dentro de una caja de código, con: nombre exacto del chat de destino, instrucción de consultar primero el `COMPRA-CON-SENTIDO-MASTER.md` actual en `main`, estado real del trabajo, decisiones que no deben rehacerse, archivos o borradores relevantes, siguiente bloque de tareas, restricciones (especialmente `no publicar` cuando proceda), el flujo `rama → PR → check build → squash → main` y las validaciones pendientes. No limitarse a decir "continúa en el chat 03".

## 15.3 Autorización y avance autónomo

- Cuando Sergio responde `ok`, `vale`, `dale`, `sigue` o equivalente tras un siguiente paso claramente definido, es autorización para ejecutarlo sin pedir confirmación otra vez.
- ChatGPT avanza por su cuenta en todo lo seguro, reversible y coherente con las decisiones cerradas (revisión, investigación, correcciones técnicas, código, documentación, comprobaciones), informando al final de cada hito: qué ha hecho, qué cambió, qué queda y cuál es el siguiente paso.
- Solo para y pide intervención cuando necesita realmente a Sergio, con el mensaje explícito `Necesito que tú hagas esto:` y la acción concreta. Tras esa intervención continúa sin volver a pedir confirmación si el siguiente paso ya está definido.
- Una corrección transversal debe quedar protegida por una comprobación automática equivalente, para que Sergio no tenga que recordar reglas manualmente.

## 15.4 Mantenimiento y versionado del MASTER

Actualizar este documento cuando cambie infraestructura, se contrate algo, se publique una URL, se cierre una decisión SEO o una comparativa, aparezca un problema importante, se complete una tarea, cambie una norma, se incorpore una herramienta o se modifique la arquitectura. Cada actualización lleva fecha y hora local (`DD/MM/YYYY HH:MM`) en la cabecera. Al integrar información nueva, **sustituir** el texto afectado en lugar de añadir un bloque contradictorio al final.

## Estado vigente de rendimiento, editorial e imágenes (29/10/2026)

**Lotes completados y publicados en `main`:**
- **D (#85; `aa51c598`):** CSS agrupado, tipografía de sistema, contraste de etiquetas y banner «Más información sobre cookies». Build, optimización, Cloudflare y responsive 108/108 correctos.
- **E (#86; `75086134`):** restos editoriales retirados, nombres globales corregidos y 29 nuevas etiquetas «Imagen ilustrativa» en fichas con escenas ambiente. Sin sustitución de imágenes ni de destinos de Amazon.
- **D2 (#87; `2009b1683987052e1e5c005fd540cdebc6d78c79`):** fusionado en `main` el **28/10/2026 a las 21:31, hora peninsular**, y confirmado en Cloudflare Pages (despliegue de producción `9e5bb869-8fc8-427b-b517-b07399e301ab`, etapa `deploy` con estado `success`; commit de despliegue igual a `main`). No queda pendiente fusionar esa PR.

**Detalles técnicos activos tras D2:**
- `main-v4.js` cargado con `defer` en 28 HTML; pruebas funcionales locales de menú, consentimiento y evento `amazon_click` con red interceptada. En preview no se envía GA4. Referencia de auditoría: `.github/scripts/interactions-audit.mjs`.
- Una única hoja CSS minificada por página, incluida 404. Fuentes editables bajo `css/` y `css/pages/`; compilados generados bajo `css/compiled/`; manifiesto `.github/css-bundles.json`. Usar `.github/requirements-css.txt`, `python3 .github/scripts/build-css.py` y `--check` antes del build. No editar CSS compilado a mano. `rcssmin==1.2.2` conserva el orden de las reglas. El CSS base deja de tener caché independiente entre páginas: evaluar comportamiento real al navegar.
- Cinco tarjetas de portada con `srcset`/`sizes` y variantes WebP de 400/800 px: sierras a batería, Hogar, Impresión 3D, Herramientas y guía de impresoras 3D. Originales conservados; sin cambios en fotos de producto. Texto de portada simplificado y explicación de GitHub/Cloudflare retirada de privacidad, sin variar los tratamientos de datos.
- Validación local del lote D2: **112/112** comparaciones de estilos y geometría equivalentes a `main` anterior y **108/108** controles responsive correctos a 360, 390, 768 y 1440 px. Registro: `.github/measurement/lote-d2-validation-20261028.md`. Estas pruebas no prueban una mejora de PageSpeed real.

**Referencia de rendimiento antes de D2 (medición D/E del usuario, 28/10/2026):** portada, amoladoras, gatos: rendimiento móvil 98/99/99; LCP 1,1 s en las tres; SEO 100 y accesibilidad 100. CSS bloqueante 420/550/420 ms; Speed Index 3,8/3,7/3,7 s. Ver `.github/measurement/mobile-post-de-20261028.md`. No atribuir estos resultados a D2.

### PageSpeed móvil después de D2, cierre de las tres URL de referencia (29/10/2026)

Mediciones Lighthouse 13.5.0 en PageSpeed Insights con Moto G Power emulado, navegación inicial, red 4G lenta y Chromium 153. **Sin datos de campo suficientes de usuarios reales (CrUX)**. No confundir las puntuaciones de laboratorio con el rendimiento observado por usuarios, ni atribuir necesariamente las pequeñas diferencias a D2.

| URL | Medición CET | Rendimiento | Accesibilidad | Buenas prácticas | SEO | Navegación agéntica | FCP | LCP | TBT | CLS | Speed Index |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | 29/10 19:13 | 99 | 100 | 100 | 100 | 2/2 | 0,9 s | 1,1 s | 0 ms | 0 | 3,6 s |
| `/herramientas/amoladoras-a-bateria/` | 29/10 19:10 | 99 | 100 | 100 | 100 | 2/2 | 0,9 s | 1,0 s | 0 ms | 0 | 3,6 s |
| `/herramientas/gatos-hidraulicos/mejores-gatos-hidraulicos-para-coche/` | 29/10 19:12 | 99 | 100 | 100 | 100 | 2/2 | 0,9 s | 1,1 s | 0 ms | 0 | 3,6 s |

Comparación con D/E del 28/10: **portada 98 → 99** puntos, LCP estable en 1,1 s, Speed Index 3,8 → 3,6 s; amoladoras mantiene 99 puntos, LCP 1,1 → 1,0 s y Speed Index 3,7 → 3,6 s; gatos mantiene 99 puntos y LCP 1,1 s, Speed Index 3,7 → 3,6 s. **Las tres referencias quedan medidas tras D2, sin regresiones observadas.** Las variaciones pequeñas pueden deberse al ruido de laboratorio y no demuestran causalidad.

**Oportunidades técnicas no urgentes, sin cambios de código acordados:**
- Portada: CSS minificado único de 9,18 KiB con 150 ms de duración y ahorro estimado de renderizado de 120 ms. Imágenes de tarjetas `categoria-herramientas-800w.webp` y `categoria-impresion-3d-800w.webp`, ambas con `srcset` 400/800, cargadas a 800 px en un viewport que las muestra aproximadamente a 662 × 372 px; Lighthouse sugiere ahorro conjunto de 28,7 KiB (14,6 + 14,1 KiB). No modificar los tamaños solo por esta estimación. El LCP identificado es `<header class="hero">`; no forzar prioridad de las imágenes de tarjetas en carga diferida que no son el LCP.
- Amoladoras: imagen `/images/amoladoras/bosch-gws-18v-11-s.webp` 1200 × 1200 usada a unos 385 × 385 px, 51,3 KiB; Lighthouse estima 46 KiB de ahorro potencial con dimensiones adaptables. CSS minificado único de 13,57 KiB, 150 ms de recurso bloqueante; latencia de ruta crítica máx. 232 ms.
- Gatos para coche: `/images/gatos/tarpofix-3t-ambiente-v2.webp` 1536 × 1024 usada a unos 578 × 385 px, 205,5 KiB; ahorro estimado 176,4 KiB con versión responsive. CSS minificado de 13,48 KiB, 150 ms de recurso bloqueante; ahorro potencial de renderizado estimado en 80 ms. 501 nodos DOM, profundidad máxima 10; sin incidencia crítica detectada.
- En ambas páginas Lighthouse señala descubrimiento/preferencia de carga para el hero, mostrado con imagen de fondo CSS mediante variable `--ccs-hero-image`. Si se estudia una optimización, medir primero la carga efectiva del LCP y valorar preload con `fetchpriority` compatible con este patrón, evitando cambios automáticos de prioridad de imágenes. Lighthouse no identificó orígenes externos útiles para preconnect.
- Resultado actual **99/100** y métricas excelentes; no crear una PR de CSS, JavaScript o imágenes solo por estas advertencias, y **mantener el lote C de fotos de producto aparcado** según decisión previa.

**Lote C (imágenes):** **aparcado por decisión de Sergio**. Fotos de producto locales provisionales hasta disponer de la elegibilidad de Amazon Creators API y confirmar condiciones de reproducción/almacenamiento. No sustituirlas por ahora ni retirar etiquetas ilustrativas sin reemplazo exacto válido. Comprobar autorización antes de alojar fotografías de terceros.

**Pendientes editoriales independientes:** considerar imágenes explicativas concretas para guías densas si aportan comprensión; revisar profundidad de fichas de llaves de impacto y afirmaciones de uso en deshumidificadores a partir de fuentes verificables. Revisar también correspondencia ASIN/variante de Midea, Lefant, gatos, taladros y PLA, base de peso de sierras y condiciones de comparación acústica. No convertir tareas de verificación en datos inventados.

**Siguiente control:** revisión visual/funcional final de navegación y consentimiento (la comprobación PageSpeed de portada, amoladoras y gatos **ya está cerrada**); después, verificar GA4 con eventos nuevos y seguir indexación y SERP. Sin suscripciones SEO de pago.
