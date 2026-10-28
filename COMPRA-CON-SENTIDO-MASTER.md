# COMPRA CON SENTIDO
## Documento MASTER

**Última actualización:** 28/10/2026
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
- `sitemap.xml` usa el dominio definitivo y debe contener toda URL pública. A 04/10/2026 contiene aproximadamente 24 URLs (verificar en `main`). `lastmod` se actualiza solo cuando cambia contenido sustancial de la URL, no por cambios técnicos o de navegación global.
- No modificar ni reenviar el sitemap sin una razón concreta si Google puede obtenerlo correctamente.

---

# 6. Search Console, Bing y analítica

- **Search Console:** propiedad de dominio `compraconsentido.es`, verificada por DNS mediante Cloudflare. Se eliminaron las propiedades antiguas de Google Sites y GitHub Pages. Es la fuente principal de datos SEO reales.
- **Bing Webmaster Tools:** pendiente de configurar.
- **Analítica:** Search Console, Cloudflare Web Analytics y GA4 (`G-WQ9KB0DDP7`), con consentimiento previo. `js/main-v4.js` carga GA4 y permite emitir `amazon_click` exclusivamente en el hostname `compraconsentido.es` desde la PR #72, fusionada en `main` el 28/10/2026 (`d9848d62d17c3f339a36a46f743e15263f65be24`). Las versiones de prueba de Cloudflare Pages quedan excluidas de la nueva medición; los datos históricos de GA4 siguen incluyendo visitas de prueba. GA4 accesible mediante Windsor.ai (`googleanalytics4`, propiedad `535630166`, nombre mostrado `Compra con criterio`). El evento `amazon_click` registra ruta, título, producto, ASIN, Tracking ID y enlace. El usuario confirmó el 28/10/2026 que creó en GA4 las dimensiones de ámbito Evento `product_name`, `asin`, `affiliate_tag` y marcó `amazon_click` como evento clave; aún falta verificar su disponibilidad en informes y su estado en la administración de GA4. No deducir compras o ingresos de estos clics.
- **Conector operativo para Search Console:** Windsor.ai sobre `sc-domain:compraconsentido.es`. Permite consultar rendimiento por fecha, página y consulta (clics, impresiones, CTR y posición), además del estado básico del sitemap. Search Console sigue siendo la fuente principal y Windsor.ai solo actúa como vía de acceso a esos datos. El antiguo GSC Wizard sigue sin ser fiable para este proyecto (`payment_required`).

## Revisión de medición y decisión de coste (28/10/2026)

- **Search Console mediante Windsor.ai:** ventana 28/09-25/10/2026: 634 impresiones, 8 clics, CTR 1,26 % y posición media global 51,54. Entre quincenas consecutivas, impresiones 165 → 469; clics 4 → 4. Datos de dominio, no sumar consultas visibles para reconstruir el total, por la ocultación de consultas de bajo volumen.
- **GA4 mediante Windsor.ai:** 01/10-27/10/2026: 30 sesiones, 10 usuarios activos, 275 vistas y 13 eventos `amazon_click` en toda la propiedad. Separando por hostname: producción `compraconsentido.es` 27 sesiones, 8 usuarios activos y 11 eventos; previews 3 sesiones, 2 usuarios activos y 2 eventos. En producción, salidas registradas: deshumidificadores para secar ropa 5, comparativa general de deshumidificadores 4, llaves de impacto 2. Los resultados pueden incluir visitas internas propias y no prueban compras.
- **Dimensiones de GA4:** configuración declarada realizada por el usuario (`product_name`, `asin`, `affiliate_tag`, ámbito Evento) y `amazon_click` como evento clave. Aún no aparecen verificadas en el listado de campos del conector y podrían tardar en procesarse; no confundir declaración de configuración con validación técnica.
- **Herramientas sin cuota:** decisión del usuario de **no pagar suscripciones de analítica/SEO**. Windsor.ai está en `Trial` (el 28/10 el usuario informó de 5 días restantes); tras finalizar, comprobar los límites reales del plan gratuito antes de contar con acceso simultáneo a Search Console y GA4. Priorizar Search Console y usar la interfaz gratuita de GA4 directamente si el conector deja de permitir ambas fuentes. Google no depende de Windsor.ai para guardar las mediciones. No dar por garantizado el acceso futuro ni adquirir planes de pago.
- **Próximo trabajo:** validar eventos post-PR #72 y dimensiones personalizadas en GA4, comprobar Windsor.ai al finalizar la prueba, optimizar con criterio páginas con impresiones y pasar las candidatas SEO de la investigación 28/10/2026 (sección 7.3) por verificación final de SERP, productos, fabricante y ASIN antes de publicar. No contratar herramientas de pago.

## Estado de indexación y primeras señales SEO (actualizado 23/10/2026)

El sitemap mantiene 24 URLs enviadas, sin warnings ni errores en las últimas lecturas, y Google lo sigue descargando con normalidad. Las cuatro URLs que el 09/10/2026 estaban como `Descubierta: actualmente sin indexar` (`/hogar/deshumidificadores/mejores-deshumidificadores/`, `/impresion-3d/accesorios-3d/`, `/impresion-3d/filamentos-3d/` y `/impresion-3d/impresoras-3d/`) recibieron solicitud manual de indexación y posteriormente empezaron a generar impresiones; la indexación ya no se considera el principal cuello de botella.

En ventana de 28 días consultada el 23/10/2026, las señales principales son: comparativa de gatos hidráulicos 36 impresiones / 3 clics / posición media 8,5; PLA 29 / 0 / 11,0; llaves de impacto 26 / 1 / 19,35; deshumidificadores 24 / 1 / 15,67; guía de litros 8 / 0 / 7,38. Search Console oculta parte de las consultas de bajo volumen por privacidad, por lo que no se debe inferir el reparto de impresiones entre queries no visibles.

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

Reglas de uso real: buscar el modelo exacto sin extrapolar de otra variante; buscar experiencias positivas y negativas; identificar patrones repetidos y distinguir incidencias aisladas de problemas recurrentes; dar más peso a experiencias detalladas; no convertir percepciones subjetivas en datos técnicos; contrastar afirmaciones importantes con más de una fuente; si la base es insuficiente, no inventar conclusiones ni usar esa característica como argumento de compra. La capa de uso real enriquece **toda la ficha**, no solo los bloques finales.

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

`Imagen + badge/perfil → H3 y subtítulo → especificaciones → texto editorial → "Lo que destaca" / "A tener en cuenta" → "La elegiría si…" → [valoración y formatos si aplica] → CTA`

Cada ficha responde: qué diferencia al modelo, para quién tiene sentido, cuál es su ventaja concreta, cuál es su limitación real y cuándo compensa frente a otro.

- **"La elegiría si…"**: debe responder "¿qué tiene este modelo que puede hacer que lo compre antes que otro?". No repite el subtítulo ni los bloques anteriores. El ecosistema de batería es un criterio secundario salvo que no haya diferencias más importantes.
- **"Lo que destaca"**: la ventaja práctica más relevante, apoyada en experiencia real cuando exista.
- **"A tener en cuenta"**: una contrapartida real de compra o uso, no una especificación ya explicada.
- Los tres bloques no se repiten entre sí ni duplican el texto principal. Las conclusiones de uso real se reparten por la ficha.
- Los bloques "La elegiría si…" usan fondo azul suave, borde azul y texto azul (`product-cards-v1.css`).

## 8.8 Imágenes

- No usar Google Drive como servidor permanente: las imágenes viven en el proyecto, preferiblemente WebP (AVIF si compensa), con dimensiones y peso adecuados, lazy loading y alt útil. Texto importante en HTML, no incrustado en la imagen.
- **Producto:** imagen individual por producto, sin collages. Las imágenes de modelos exactos **no se generan con IA**: Sergio las obtiene en su revisión manual de Amazon.es, ChatGPT las normaliza (recorte, fondo, WebP, nombre, ruta) y Sergio las sube a la rama.
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

**Estado:** en revisión, rama `editorial/humanizar-siguiente-10-20261028`, PR #77 en borrador; no fusionada con `main`. El usuario solicitó aplicar íntegramente los criterios de la primera y segunda pasada del lote anterior.

**Alcance (10 URLs existentes):**
- Aspiradoras: guía de aspiradoras y comparativa de robots aspiradores.
- Deshumidificadores: guía de capacidad por superficie y comparativa para secar ropa.
- Impresión 3D: hub de categoría, guía de accesorios, guía de filamentos, PLA vs TPU, guía de impresoras y comparativa de impresoras.

**Trabajo:** humanización de introducciones, perfiles y fichas, especialmente seis robots y seis impresoras; retirada de «Cómo analizamos», «En uso real», selección por puntuación y bloques de metodología redundantes. Enlace interno con 20 tarjetas hero usando `css/related-heroes-v1.css` y los heroes ya existentes, dos por página. Se preservan comparativas, productos, información técnica, datos estructurados y enlaces Amazon. Actualizados `dateModified`, las fechas visibles donde existen y el `lastmod` de las diez URLs. Corregido un cierre `</section>` sobrante previo en PLA vs TPU.

**Control:** revisión estructural local del HTML y JSON-LD: diez H1 únicos, tablas y enlaces comerciales conservados, imágenes enlazadas a destinos existentes y sin restos de los textos editoriales señalados. Pendientes checks automáticos finales y aprobación visual/editorial del lote por Sergio. No fusionar sin aprobación explícita.

---

## 11.6 Últimas seis páginas: humanización y navegación · PR #78 (28/10/2026)

**Estado:** pendiente de aprobación; rama `editorial/humanizar-ultimas-6-20261028` creada desde la rama del segundo bloque `editorial/humanizar-siguiente-10-20261028` (PR #77). La PR #78 se presenta **apilada sobre PR #77** para que su diferencia incluya solo las seis páginas finales. Ninguna de las dos PR se ha fusionado con `main`.

**Inventario:** 27 páginas HTML en el sitio. La comparativa de gatos de botella ya está publicada, la primera tanda de 10 páginas se publicó con PR #76, el segundo bloque de 10 queda en PR #77 y las otras seis páginas se revisan en PR #78. Los cambios de las últimas 16 quedan pendientes de aprobación.

**Páginas revisadas en este bloque:** portada `/`, categoría Herramientas, categoría Hogar, Sobre nosotros, Metodología y Aviso legal. Además, tras la revisión visual se ajusta la categoría Impresión 3D, que pertenecía al segundo bloque PR #77. La PR #78 modifica siete HTML en total. El enfoque editorial en la portada y las categorías deja de hablar de «nuestros criterios» y explica medidas, limitaciones y costes que el lector debe comprobar. Se sustituyeron inicialmente los cierres con botones por dos enlaces hero en portada y categorías; tras la revisión de UX se mantienen en portada, pero las tres categorías se rediseñan con una única biblioteca visual, sin navegación repetitiva al final. Sobre nosotros y Metodología enlazan a dos ejemplos reales de comparativas cada una; se conserva la explicación transparente de fuentes, afiliación y la ausencia de pruebas físicas propias. En Aviso legal no se añaden cards promocionales: se conserva la estructura de afiliación, privacidad, cookies y contacto.

**Corrección importante:** la antigua referencia a `GitHub Pages` dentro de Aviso legal se sustituye por `Cloudflare Pages` como alojamiento de la web; GitHub continúa como repositorio del código.

**Revisión de UX de categorías (28/10/2026):** tras revisar las 16 páginas, el usuario aprueba portada, Sobre nosotros, Metodología y Aviso legal, pero detecta duplicación entre «Categorías», «Comparativas destacadas», «Biblioteca» y los heroes finales en Herramientas, Hogar e Impresión 3D. Decisión: **una biblioteca visual única por categoría**, con **tarjetas completas de imagen + título + descripción**, dos columnas en escritorio y una en móvil. Todas las URLs publicadas aparecen una sola vez: Herramientas 8, Hogar 6 e Impresión 3D 6. Se elimina el resto de bloques duplicados y la navegación final duplicativa, se conservan los heroes de cabecera, la introducción y las URL/canonicals originales. Se incorpora `css/category-library-v1.css` compartido. Los hubs se editan solo en PR #78, que está apilada sobre PR #77; el rediseño de `/impresion-3d/` ya modificado en PR #77 será visible en la vista previa de PR #78. No publicar sin aprobar.

**Otros hallazgos de UX del usuario pendientes de materializar y validar antes de cerrar PR #77/#78:** añadir imágenes contextuales donde reducen densidad textual (guía de aspiradoras y perfiles de uso, capacidad de deshumidificadores, tramo final de secar ropa, accesorios 3D y tipos de filamentos); unificar el título «Preguntas frecuentes» y el componente desplegable; retirar secciones visibles «Fuentes técnicas consultadas» y similares sin eliminar la trazabilidad interna; revisar microconclusiones redundantes (especialmente PLA vs TPU) y otros enlaces duplicados (guía de impresoras). No meter imágenes genéricas de relleno ni reutilizar la misma imagen en tarjetas contiguas.

**Comprobaciones de trabajo:** siete H1 únicos, HTML equilibrado, JSON-LD parseable, canonicals y title conservados. Se conservan seis enlaces hero (portada, Sobre nosotros y Metodología) y se añaden tres bibliotecas visuales con 20 tarjetas de imagen a destinos distintos: Herramientas 8, Hogar 6 e Impresión 3D 6. Todas las URLs e imágenes WebP se han contrastado en GitHub. Sitemap con lastmod 28/10/2026 para las seis URLs inicialmente revisadas. Cero enlaces de afiliado modificados. Para activar el CI se apunta temporalmente la PR #78 a `main`; una vez ejecutados los checks se devuelve a la rama base de PR #77. Build y optimización de imágenes completados con éxito; después del rediseño de categorías, auditoría responsive del commit `d01fe94cc05aa99a2dd415175a0e84b827c30622` superada con 108/108 comprobaciones sin incidencias, ver ejecución `40701827794`. La rama se devuelve a base PR #77 tras los checks; el último cambio de este MASTER solo actualiza la documentación. Pendiente aprobación visual/editorial del usuario y verificación de la vista previa de Cloudflare. No fusionar ni publicar PR #77 ni PR #78 sin autorización del usuario. En el momento de publicar, fusionar primero PR #77 y después retargetar PR #78 a main (o realizar los merges en orden conservando historial de cambios).

---

# 12. Estado del sitio

## 12.1 Páginas publicadas

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
| Impresión 3D | `/impresion-3d/` | Hub |
| | `/impresion-3d/impresoras-3d/` y `/mejores-impresoras-3d/` | Guía y comparativa |
| | `/impresion-3d/filamentos-3d/` y `/mejores-filamentos-pla/` | Guía y comparativa |
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

Cautelas: Einhell 44 mm a 45° (el 41 mm del copy es una inconsistencia); Makita con carril mediante adaptador `196953-0`, no compatibilidad directa; WORX bisel 50° y nomenclatura PowerShare "20 V Max" explicada, no escrita como "18 V" sin contexto; Bosch Stop Control no es un "freno eléctrico"; DeWalt sin compatibilidad dedicada con carril. Reservas: Ryobi R18CS-0 (inconsistencia de denominación en Amazon), Milwaukee M18 FCS552-0 (ficha/ASIN no confirmados), HiKOKI C1806DA.

## 12.6 Mejores filamentos PLA · cerrada y publicada (04/10/2026)

URL `/impresion-3d/filamentos-3d/mejores-filamentos-pla/`; keyword `mejores filamentos PLA`; title `Mejores filamentos PLA calidad-precio: 6 opciones según el uso`; H1 `Mejores filamentos PLA: cuál comprar según lo que vas a imprimir`; tracking `ccc-filam3d-21`; schema `Article`, `BreadcrumbList` y `FAQPage` (8 FAQ visibles); hero `/images/filamentos-pla/hero-mejores-filamentos-pla-v2.webp` y OG `og-mejores-filamentos-pla.webp`. Enlazada desde Inicio, `/impresion-3d/` y `/impresion-3d/filamentos-3d/`. La guía de filamentos sigue siendo informacional (qué material elegir); esta responde qué PLA concreto comprar.

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

**Columnas de la tabla:** Modelo · Tipo · Tolerancia · Boquilla · Velocidad fabricante · AMS · Mejor para · Valoración técnica · CTA. Sin columna de peso ni de precio. Tolerancia solo con dato oficial (Winkle: `No declarada` hasta tener fuente primaria; los distribuidores discrepan entre ±0,02 y ±0,03 mm). Velocidad solo si el fabricante la publica (ELEGOO: 30-70 mm/s); si no se puede verificar, `—`. La velocidad es siempre una declaración del fabricante: 600 mm/s de SUNLU es un máximo declarado, no un rendimiento garantizado.

**Valoración técnica:** sustituye a la antigua nota de calidad-precio y **no incluye precio**. Componentes: calidad y acabado, fiabilidad y experiencia real, facilidad y prestaciones para el uso objetivo. Cada ficha muestra una barra HTML/CSS por componente (sin librerías ni JavaScript) y la nota con un decimal. Se explica una sola vez, en un bloque discreto al final de la página con enlace a `/metodologia/`. No hay estrellas. Es una valoración editorial, no un ensayo propio: no afirmar que se han probado físicamente. Se mantiene internamente una señal de confianza (Alta / Media-Alta) según volumen y calidad de la evidencia: Alta para ELEGOO, eSUN y OVERTURE; Media-Alta para SUNLU (feedback más polarizado), JAYO (variantes históricas de bobina) y Winkle (muestra menor pero muy favorable). Notas de trabajo v2 (calidad / fiabilidad / facilidad / prestaciones): JAYO 7,8 / 7,4 / 8,1 / 7,5; OVERTURE 8,5 / 8,2 / 8,0 / 8,6; ELEGOO 8,2 / 8,2 / 8,9 / 7,5; eSUN 8,4 / 8,4 / 8,3 / 8,5; SUNLU 8,4 / 7,6 / 7,9 / 9,4; Winkle 8,7 / 8,6 / 8,3 / 8,0. La fuente de las cifras publicadas es la página, no esta tabla.

**Packs:** la tabla compara siempre una bobina individual. En cada ficha, el bloque "Si compras más cantidad" explica de forma cualitativa cuándo compensa un pack (sin importes ni cupones) y los botones de pack son secundarios. JAYO es el caso donde la unidad puede salir mejor por kilo que sus packs.

**Orden de ficha PLA:** el canónico de la sección 8.7 con "Nuestra valoración" y "Si compras más cantidad" antes del CTA. El orden visual se fija con `order` CSS (los bloques PLA personalizados deben llevarlo asignado). Hero con una sola capa verde (se neutraliza `.ccs-hero::before` en esta página para no tapar la imagen).
**Ajuste visual 04/10/2026:** la comparativa PLA carga `comparison-opening-v1.css?v=20261004-2`, igual que las otras comparativas. Se cerró así la incidencia de caché por la que los CTA de las tres elecciones podían verse como simples enlaces en producción. Verificado visualmente por el usuario tras el despliegue.

---

# 13. Decisiones cerradas (consolidado)

**Infraestructura y SEO:** marca Compra con Sentido y dominio `compraconsentido.es` sin `www`, con `www` → 301; GitHub es la fuente del código; Cloudflare Pages es el hosting y gestiona DNS, CDN y HTTPS; infraestructura estática siempre que sea posible; TLS mínimo 1.2; HSTS desactivado por ahora; no usar `pages.dev` como URL pública; Search Console principal = propiedad de dominio; no tocar DNS ni sitemap sin razón; no bloquear bots de entrenamiento por ahora; crecimiento mediante URLs nuevas solo para intenciones diferenciadas demostrables por SERP/GSC y sin exigir un umbral fijo de 50-100 impresiones; no crear páginas por simples variaciones de keyword.

**Contenido y afiliación:** Amazon España es el destino principal; verificar ASIN y variante antes de publicar; sin precios fijos; sin pruebas físicas inexistentes; fuentes oficiales primero; no mezclar magnitudes no equivalentes; sin ranking global; exactamente 3 perfiles ("3 elecciones según necesidad") sin numerar; tabla móvil sin columna fija; CTA estándar `Ver precio en Amazon`, contextualizado con variantes; `Probado por nosotros` solo con prueba documentada y sin etiquetas negativas; sin aviso de afiliación repetido en cabecera; separación informacional / comparativa; control previo a publicación de residuos editoriales; breadcrumbs en todas las páginas salvo la home; navegación revisada globalmente al publicar.

**Decisiones no adoptadas por ahora:** indicador de gama relativa; mover la teoría de guías a desplegables; precio de Amazon dentro de la valoración pública.

---

# 14. Decisiones abiertas y pendientes

## Decisiones abiertas

1. **Autoría:** organización como autor (actual), autor personal con Compra con Sentido como publisher, o sistema mixto por categoría. Debe decidirse a nivel de marca (privacidad, escalabilidad por categorías, efecto en Sobre nosotros y schema, experiencia práctica que mostrar junto al nombre). Si cambia, se aplica a todo el sitio a la vez, en contenido visible, Sobre nosotros y schema. No hay evidencia medida de SERP o conversión que lo respalde todavía.
2. **Topes de precio en títulos** (por ejemplo, "menos de 200 €" en taladros): no son un precio mostrado, pero envejecen. Decidir si se permiten con revisión en cada actualización y, en su caso, declararlo como excepción del control de residuos.
3. **Ponderación de la Valoración técnica de PLA:** documentar en el MASTER la ponderación aplicada tras retirar el precio.

## Pendientes inmediatos

- [x] CTA de la comparativa PLA alineados el 04/10/2026 con la sección 9.3: fichas en `Ver precio en Amazon` y packs en `Ver precio del pack de N en Amazon`; la tabla conserva `Ver en Amazon`.

- [ ] Confirmar visualmente en producción que el menú muestra `Sobre nosotros` → `/sobre-nosotros/` y que `404.html` carga el footer global. La comparativa PLA ya ha sido verificada visualmente tras el despliegue con sus CTA de las tres elecciones renderizados como botones y con `comparison-opening-v1.css?v=20261004-2` activo.
- [ ] Confirmar en el contrato de Amazon Afiliados qué exige sobre el aviso de afiliación antes de mantener la política de no repetirlo en cabecera.
- [ ] Usar Search Console para decidir qué tres acciones o contenidos van en el primer pantallazo de Inicio (el titular y el peso visual de la home se revisarán con SEO, arquitectura y datos reales).
- [ ] Revisar con los criterios actuales las páginas no incluidas en la auditoría externa: filamentos 3D (guía), accesorios 3D, aspiradoras, deshumidificadores (guía y comparativa de litros), `/metodologia/` y `/aviso-legal/`.

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