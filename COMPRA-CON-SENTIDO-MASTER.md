# COMPRA CON SENTIDO
## Documento MASTER

**Última actualización:** 4 de octubre de 2026 · 09:22  
**Mercado inicial:** España  
**Idioma principal:** Español  
**Dominio canónico:** `https://compraconsentido.es/`  
**Repositorio de producción:** `SuperSergi/compra-con-sentido`  
**Rama de producción:** `main`

---

# 1. Objetivo del proyecto

Crear, posicionar y hacer crecer **Compra con Sentido** como una web de comparativas, guías de compra y análisis de productos orientada principalmente a:

1. SEO orgánico.
2. Intención de búsqueda.
3. Calidad y utilidad real del contenido.
4. Velocidad de carga.
5. Arquitectura web clara.
6. Buen enlazado interno.
7. Conversión hacia enlaces de afiliado.
8. Costes fijos mínimos.
9. Facilidad de mantenimiento.
10. Crecimiento sostenible.

Fuente principal de tráfico prevista: Google Search.

Monetización inicial: Amazon Afiliados.

No crear contenido simplemente para aumentar el número de páginas. Priorizar oportunidades donde una web pequeña pueda competir y aportar valor.

---

# 2. Marca y dominio

## Marca definitiva

**Compra con Sentido**

Se abandonó el nombre provisional **Compra con Criterio**.

Motivos principales:

- `compraconcriterio.es` no estaba disponible.
- `compra-con-criterio.es` se descartó por el guion y por ser menos limpio como marca.
- se detectó `compraconcriterio.net` utilizado por una web de comparativas/recomendaciones próxima al planteamiento del proyecto.
- el proyecto estaba todavía en una fase suficientemente temprana para cambiar de marca antes de acumular indexación y tráfico.

## Dominio

Dominio definitivo:

`compraconsentido.es`

Registrador:

DonDominio.

Fecha de compra:

28/09/2026.

Precio mostrado en el momento de la compra:

6,95 € + IVA/año.

No se contrataron inicialmente:

- hosting de DonDominio
- SSL de pago
- VPS
- WordPress
- correo asociado al hosting

Pendiente administrativo: comprobar que la renovación automática del dominio esté activada.

---

# 3. Infraestructura definitiva

Arquitectura:

Desarrollo  
→ GitHub  
→ Cloudflare Pages  
→ `compraconsentido.es`  
→ Google / usuarios

## GitHub

Repositorio:

`SuperSergi/compra-con-sentido`

Rama de producción:

`main`

GitHub es la **fuente definitiva del código publicado**.

Se reutilizó el repositorio existente porque ya contenía HTML, CSS, JavaScript, imágenes, páginas y estructura SEO.

Se creó temporalmente la rama `compra-con-sentido` para la migración y posteriormente se fusionó a `main`.

Cambios de migración realizados:

- marca cambiada de Compra con Criterio a Compra con Sentido
- URLs absolutas migradas a `https://compraconsentido.es`
- canonical actualizadas
- Open Graph actualizado
- Schema actualizado
- `robots.txt` actualizado
- `sitemap.xml` actualizado
- README adaptado a Cloudflare Pages
- añadido `.gitignore`
- eliminada una antigua verificación HTML de Google
- adaptadas múltiples páginas y recursos al dominio nuevo

## Cloudflare Pages

Proyecto:

`compra-con-sentido`

URL técnica:

`https://compra-con-sentido.pages.dev`

Repositorio conectado:

`SuperSergi/compra-con-sentido`

Rama:

`main`

Configuración:

- Framework: Ninguno
- Build command: `exit 0`
- Output directory: `.`
- Root directory: vacío
- Variables de entorno: ninguna

Motivo: la web es HTML, CSS y JavaScript estático y los archivos públicos están directamente en la raíz.

La URL `pages.dev` no debe utilizarse como URL pública o canónica.

## DNS

DNS gestionado completamente por Cloudflare.

Nameservers configurados en DonDominio:

- `katja.ns.cloudflare.com`
- `nico.ns.cloudflare.com`

DNSSEC:

- no estaba activado en DonDominio
- se mantiene desactivado durante esta fase
- no crear una entrada DNSSEC manual salvo decisión posterior

Registros principales:

- CNAME raíz → `compra-con-sentido.pages.dev`
- CNAME `www` → `compra-con-sentido.pages.dev`
- proxy Cloudflare activado
- TTL automático

## Dominio canónico y redirección

Dominio principal:

`https://compraconsentido.es`

`https://www.compraconsentido.es/*` redirige mediante **301 Permanent Redirect** a:

`https://compraconsentido.es/${1}`

Se conservan ruta y query string.

Norma estable:

- utilizar siempre la versión sin `www`
- consolidar las señales SEO en el dominio raíz
- no usar `pages.dev` como canonical

## SSL/TLS

Estado:

- SSL Universal activo
- certificado válido para `compraconsentido.es` y `*.compraconsentido.es`
- modo SSL/TLS: Completo
- Usar siempre HTTPS: activado
- Reescrituras automáticas HTTPS: activadas
- TLS 1.3: activado
- versión mínima TLS: 1.2
- HSTS: desactivado por ahora
- Encriptación oportunista: activada
- Advanced Certificate Manager: no necesario
- Total TLS: no necesario

No activar HSTS hasta que HTTPS y las redirecciones lleven suficiente tiempo estables.

---

# 4. Stack técnico y rendimiento

Tecnologías principales:

- HTML
- CSS
- JavaScript
- imágenes WebP o AVIF cuando convenga

Evitar inicialmente:

- WordPress
- PHP
- MySQL
- plugins
- servidores VPS

Objetivos Core Web Vitals:

- LCP < 2,5 s
- INP < 200 ms
- CLS < 0,1

Prioridades:

- HTML accesible directamente por Google
- CSS optimizado
- JavaScript mínimo
- imágenes ligeras
- lazy loading cuando corresponda
- CDN Cloudflare
- evitar dependencias innecesarias

---

# 5. Cloudflare y bots

Configuración inicial elegida:

- Bots de búsqueda: permitir
- Agentes de IA: permitir
- Bots de entrenamiento: bloquear
- Bot Preference Sync: activado

Posteriormente se detectó que Cloudflare estaba bloqueando solicitudes legítimas de Googlebot al `sitemap.xml` mediante la regla:

`Block AI training crawlers - BOBA-199`

Googlebot aparecía correctamente identificado como **Search Engine Crawler**.

Se creó una regla:

**Nombre:** `Permitir bots verificados`

Condición:

`cf.client.bot and http.request.uri.path eq "/sitemap.xml"`

Acción:

`Skip / Omitir`

Configuración:

- saltar todas las reglas administradas
- orden de ejecución: primero
- estado: activo
- logging activado

Se comprobó posteriormente una petición real de Googlebot con acción `skip`.

Como medida adicional quedaron temporalmente:

- Búsqueda: Permitir
- Agente: Permitir
- Entrenamiento: Permitir

**Decisión actual:** no reactivar el bloqueo de entrenamiento mientras exista riesgo de volver a interferir con Googlebot.

---

# 6. SEO técnico obligatorio

Toda la web debe mantener:

- `<title>` único
- meta description
- H1 único y coherente
- H2/H3 lógicos
- canonical
- Open Graph
- breadcrumbs
- `sitemap.xml`
- `robots.txt`
- HTTPS
- redirecciones correctas
- versión única del dominio
- página 404 adecuada
- Schema.org cuando corresponda
- imágenes optimizadas
- lazy loading cuando tenga sentido

## robots.txt

URL:

`https://compraconsentido.es/robots.txt`

El archivo propio contiene:

- `User-agent: *`
- `Allow: /`
- referencia al sitemap

Sitemap declarado:

`https://compraconsentido.es/sitemap.xml`

Cloudflare puede añadir su bloque de Content Signals.

## sitemap.xml

URL:

`https://compraconsentido.es/sitemap.xml`

El sitemap utiliza el dominio definitivo.

No modificar o reenviar repetidamente el sitemap sin una razón concreta si Google puede obtenerlo correctamente.

## Canonical

Todas las páginas deben utilizar canonical bajo:

`https://compraconsentido.es/...`

La portada declara:

`https://compraconsentido.es/`

---

# 7. Google Search Console

Propiedad principal:

`compraconsentido.es`

Tipo:

Propiedad de dominio.

Verificación:

DNS mediante Cloudflare.

Se eliminaron las propiedades antiguas correspondientes a Google Sites y GitHub Pages.

Mantener únicamente la propiedad de dominio actual.

## Estado confirmado a 29/09/2026

- dominio verificado
- portada accesible para Google
- rastreo permitido
- obtención de página correcta
- indexación permitida
- canonical declarada correctamente
- indexación de la portada solicitada
- `sitemap.xml` enviado correctamente
- estado del sitemap: **Correcto**
- última lectura confirmada: **29/09/2026**
- páginas descubiertas: **19**
- informe `Indexación > Páginas`: todavía procesando datos

Pendiente:

- revisar las URLs cuando el informe termine de procesarse; Search Console había descubierto 19 el 29/09 y el sitemap actual contiene 20 tras publicar llaves de impacto
- vigilar páginas indexadas y excluidas
- revisar Core Web Vitals
- analizar impresiones, clics, CTR y posición media
- analizar consultas y páginas
- prestar especial atención a keywords aproximadamente en posiciones 8-20

Google Search Console será la fuente principal de datos SEO reales.

---

# 8. Bing Webmaster Tools y analítica

Bing Webmaster Tools:

Pendiente de configurar.

Analítica inicial:

- Google Search Console
- Cloudflare Web Analytics

Valorar GA4 más adelante.

---

# 9. Estrategia SEO general

La web se construye alrededor de **intenciones de búsqueda**, no del número de artículos.

Antes de crear una nueva página:

1. investigar la SERP
2. identificar intención de búsqueda
3. analizar competidores
4. determinar keyword principal
5. identificar keywords secundarias
6. detectar preguntas relacionadas
7. estudiar posibles subtemas
8. valorar dificultad real
9. valorar intención comercial y afiliación
10. comprobar relación con clusters existentes
11. decidir si merece la pena crear la página
12. diseñar el enlazado interno antes de publicarla

No crear una URL simplemente porque exista una variación de keyword.

Orden de trabajo:

**SEO estratégico → contenido → diseño → publicación**

---

# 10. Arquitectura y clusters

Trabajar mediante clusters temáticos.

Estructura actual/conceptual:

- `/herramientas/`
- `/hogar/`
- `/impresion-3d/`

Otras categorías como tecnología o automoción se valorarán cuando exista investigación suficiente.

URLs:

- cortas
- descriptivas
- permanentes
- sin fechas salvo necesidad
- sin palabras innecesarias

Evitar canibalización.

## Auditoría inicial de las 19 URLs anteriores a llaves de impacto

Conclusión inicial:

- no se detecta canibalización grave
- las intenciones “cómo elegir” y “qué comprar/comparativa” están razonablemente separadas
- los posibles solapamientos deben vigilarse con Search Console antes de crear nuevas URLs

Áreas a vigilar:

- gatos hidráulicos
- taladros a batería
- impresoras 3D
- deshumidificadores

No crear por ahora páginas separadas para:

- gatos hidráulicos 3 toneladas
- gatos hidráulicos perfil bajo
- gatos hidráulicos para SUV
- taladros a batería menos de 100 €

Primero reforzar URLs existentes si Google empieza a mostrar esas consultas.

---

# 11. URLs prioritarias para seguimiento SEO

Orden inicial:

1. `/hogar/deshumidificadores/cuantos-litros-deshumidificador-metros-cuadrados/`
2. comparativa de taladros a batería
3. comparativa de gatos hidráulicos
4. comparativa de deshumidificadores
5. comparativa de impresoras 3D
6. comparativa de robots aspiradores

---

# 12. Enlazado interno ya mejorado

Cambios realizados:

- desde `/hogar/` se añadió enlace directo a la guía de litros de deshumidificador
- mejorados anchors desde la guía de taladros hacia su comparativa
- variados anchors desde la guía de gatos hacia su comparativa
- actualizado `lastmod` del sitemap para páginas modificadas
- añadido schema `WebSite` en portada

Regla global:

Cuando una nueva sección o página deba aparecer en navegación, revisar el menú en todas las páginas actuales.

Comprobar:

- enlaces duplicados
- caracteres residuales
- funcionamiento escritorio/móvil
- coherencia de jerarquía

---

# 13. Breadcrumbs

Decisión global:

- todas las páginas salvo la home deben mostrar breadcrumbs visibles y clicables
- deben reflejar la jerarquía real
- mantener `BreadcrumbList` cuando corresponda
- la home no necesita `Inicio › Inicio`

Esta regla ya se extendió a páginas que anteriormente no mostraban breadcrumbs visibles.

---

# 14. Estrategia de contenido

El contenido debe aportar más que una ficha de producto.

Priorizar:

- comparaciones
- tablas
- criterios de selección
- ventajas e inconvenientes reales
- diferencias entre modelos
- escenarios de uso
- explicación técnica
- recomendaciones según necesidad
- análisis de especificaciones
- información práctica
- preguntas frecuentes útiles
- alternativas
- cuándo compensa pagar más

No copiar descripciones de fabricantes o Amazon.

No publicar cientos de páginas.

Objetivo inicial orientativo:

20-30 URLs de alta calidad.

Ritmo orientativo:

1-2 páginas buenas por semana, subordinado a calidad y oportunidad real.

---

# 15. Metodología de investigación de productos

Para cualquier dato que pueda influir en la compra:

1. buscar primero la fuente oficial del fabricante
2. revisar manuales/documentación técnica si es necesario
3. si falta el dato, investigar distribuidores especializados, retailers fiables, análisis expertos y otras fuentes secundarias que identifiquen el modelo exacto
4. contrastar discrepancias
5. no inventar ni deducir cifras inciertas

Especialmente importante para:

- peso
- dimensiones
- potencia/par
- modos
- accesorios
- compatibilidades

Los datos comparados deben utilizar el mismo criterio.

No mezclar magnitudes no equivalentes.

No añadir una cifra de autonomía genérica cuando no exista una metodología comparable entre fabricantes.

---

# 16. Pruebas de producto y tono editorial

Nunca afirmar que se ha probado físicamente un producto si no es cierto.

La metodología debe expresarse de forma positiva y transmitir criterio experto.

No limitar el análisis a fichas técnicas. Para valorar un producto se deben cruzar:

- especificaciones oficiales y manuales
- documentación técnica
- experiencias reales de propietarios y profesionales
- análisis especializados del modelo exacto
- pruebas publicadas cuando existan
- incidencias, limitaciones y patrones que se repitan entre fuentes fiables
- comentarios recurrentes sobre ergonomía, ruido, vibraciones, autonomía, facilidad de uso, mantenimiento, durabilidad y problemas reales

La investigación de cada producto debe tener dos capas:

1. **Datos objetivos**
   - fabricante
   - manual
   - ficha técnica
   - variante exacta
   - accesorios
   - compatibilidades
   - contenido del paquete
   - funciones de seguridad
   - dimensiones, peso, potencia, velocidad, par, autonomía u otras magnitudes solo cuando sean comparables

2. **Uso real**
   - opiniones verificables de propietarios
   - experiencias de profesionales
   - pruebas independientes
   - análisis especializados
   - foros técnicos y comunidades cuando aporten casos concretos
   - reseñas de retailers fiables
   - vídeos o pruebas prácticas cuando permitan comprobar comportamiento real

Para la capa de uso real:

- buscar siempre el modelo exacto, no extrapolar automáticamente desde otra variante de la misma familia
- buscar tanto experiencias positivas como negativas
- identificar patrones repetidos, no basarse en una sola opinión
- dar más peso a experiencias detalladas que describan contexto de uso, tiempo de uso y tipo de trabajo
- diferenciar una incidencia aislada de un problema recurrente
- evitar convertir percepciones subjetivas en datos técnicos
- contrastar cualquier afirmación importante con más de una fuente cuando sea posible
- si hay pocas experiencias reales de un modelo, ampliar la búsqueda antes de sacar conclusiones
- si aun así no hay base suficiente, no inventar una conclusión ni usar esa característica como argumento de compra

Esta capa de experiencia real debe servir para enriquecer **toda la ficha**, no solo los bloques finales. Puede utilizarse para:

- explicar cómo se siente el producto en uso
- detectar ventajas que no se aprecian solo en la ficha técnica
- identificar limitaciones prácticas
- matizar una especificación oficial
- decidir para qué perfil de usuario tiene más sentido
- construir el bloque “La elegiría si…”
- construir “Lo que destaca”
- construir “A tener en cuenta”
- explicar cuándo merece la pena pagar más o elegir otra alternativa

Nunca dar a entender que Compra con Sentido ha probado físicamente un producto si no es cierto.

Evitar repetir defensivamente “no lo hemos probado” en cada ficha.

La redacción debe ser natural y útil para una persona que está intentando decidir.

Evitar:

- fichas demasiado simétricas
- repetir la misma conclusión
- estructuras mecánicas
- copiar lenguaje comercial
- afirmaciones absolutas sin soporte

---

# 17. Amazon Afiliados

Amazon España será el destino principal de monetización inicial.

Los productos principales de comparativas comerciales deben:

1. existir en Amazon.es
2. tener ficha activa
3. coincidir con modelo y variante
4. disponer de ASIN comprobado
5. indicar correctamente si es cuerpo solo o kit
6. poder enlazarse mediante afiliación

Un producto sin ficha válida en Amazon España puede mencionarse como referencia técnica, pero no debe utilizarse como recomendación principal salvo decisión expresa.

CTA habitual:

`Ver precio en Amazon`

Los enlaces de afiliado deben llevar:

`rel="nofollow sponsored"`

## Creators API

Estado a 30/09/2026 20:00:

- creada en Amazon Afiliados la aplicación `compra-con-sentido-api`
- Application ID: asociado a la Store ID principal `librosde0a1-21`
- creada una credencial activa de versión `3.2`
- Credential Secret guardado por Sergio fuera del repositorio
- no almacenar Credential ID ni Credential Secret en HTML, JavaScript cliente o GitHub
- la integración prevista debe realizarse del lado servidor, preferentemente mediante Cloudflare Worker o equivalente
- para credenciales versión 3.2, la autenticación OAuth 2.0 de Creators API utiliza el endpoint europeo correspondiente
- Amazon puede tardar hasta 48 horas en confirmar la elegibilidad efectiva de acceso tras crear la credencial

Objetivo de uso:

- consultar productos por ASIN
- obtener datos oficiales de producto e imágenes cuando corresponda
- comprobar variantes y disponibilidad
- valorar uso de precios/ofertas dinámicos únicamente conforme a las condiciones de Amazon
- mantener la web estática y las credenciales fuera del frontend

Pendiente inmediato:

- configurar las credenciales como secretos en el entorno servidor
- realizar una primera llamada de prueba a Creators API para Amazon.es
- Partner Tag específico creado para la integración API: `ccs-api-21`
- creado Cloudflare Worker `compra-con-sentido-api` en producción
- configurados en Cloudflare los secretos `AMAZON_CREATORS_CLIENT_ID` y `AMAZON_CREATORS_CLIENT_SECRET`
- configurada la variable `AMAZON_PARTNER_TAG=ccs-api-21`
- el Worker ya contiene una integración de prueba con Creators API para Amazon.es
- prueba real realizada con `GetItems` y ASIN `B0BGBQSHPK`
- autenticación y llamada llegan correctamente a Creators API, pero Amazon responde HTTP 403 con `AssociateNotEligible`
- Amazon.es confirma por soporte el 04/10/2026 la causa exacta del bloqueo:
  - la API exige al menos **10 compras adscritas correspondientes a 10 pedidos separados dentro de los últimos 30 días**
  - varios productos dentro de un mismo pedido cuentan como **una sola compra adscrita** a efectos de elegibilidad de la API
  - en el momento de la revisión Amazon muestra **13 productos**, pero agrupados en solo **8 compras adscritas / pedidos válidos**
  - por tanto faltan **2 pedidos adscritos separados** dentro de la ventana móvil de 30 días para alcanzar el mínimo
- este estado queda confirmado como un problema de elegibilidad comercial, no de autenticación, credenciales, Partner Tag, Worker ni endpoint
- no hacer cambios en credenciales ni Worker por este 403
- mientras no se cumpla el mínimo, utilizar SiteStripe / Barra Web o Mobile GetLink para crear enlaces
- volver a probar Creators API cuando los informes de Amazon reflejen al menos 10 pedidos adscritos separados en los últimos 30 días
- mantener un volumen regular de pedidos porque la elegibilidad depende de una ventana móvil de 30 días



### Confirmación oficial de elegibilidad Creators API · 04/10/2026

Amazon.es responde por soporte y confirma que el error `AssociateNotEligible` se debe exclusivamente al volumen de compras adscritas del último mes.

Dato confirmado por Amazon:

- 13 productos adscritos en los informes;
- agrupados en 8 pedidos/compras adscritas válidas;
- requisito de acceso a Creators API: 10 pedidos separados dentro de los últimos 30 días.

Implicación operativa:

- no modificar Worker, OAuth, credenciales, Partner Tag ni endpoints por este error;
- no interpretar varias unidades o productos dentro de un mismo pedido como varias compras válidas para la API;
- seguir usando SiteStripe o Mobile GetLink mientras el acceso esté bloqueado;
- reintentar la API cuando el panel refleje al menos 10 pedidos separados dentro de la ventana móvil de 30 días.

Este criterio sustituye la interpretación anterior basada únicamente en la posibilidad de retraso de actualización de elegibilidad.

## Precios

No mostrar precios fijos si no podemos garantizar que estén actualizados.

Los precios observados pueden utilizarse internamente para analizar gama y posicionamiento, pero en la web se prioriza el CTA de consulta de precio.

## Botones

Estándar:

- amarillo/dorado tipo Amazon
- degradado suave
- borde
- sombra ligera
- carrito genérico
- hover discreto
- ligera elevación/escala
- efecto de pulsación
- responsive
- reflejo animado solo si no perjudica rendimiento
- sin logotipo de Amazon integrado

---

# 18. Imágenes

No usar Google Drive como servidor permanente de imágenes.

Las imágenes necesarias deben almacenarse dentro del proyecto cuando sea legal y apropiado.

Preferencias:

- WebP
- AVIF cuando compense
- dimensiones adecuadas
- peso reducido
- lazy loading
- alt útil cuando corresponda

En comparativas:

- priorizar una imagen individual por producto
- evitar collages como imagen principal de ficha
- hero contextual
- texto importante en HTML, no incrustado innecesariamente en la imagen

Las imágenes generadas por IA son ilustrativas y no deben presentarse como reproducción exacta de un modelo cuando no lo sean.

Para representación exacta, valorar imágenes oficiales compatibles con las condiciones de uso y afiliación.

---

# 19. Estándar de tablas comparativas

Las tablas deben contener información que realmente ayude a elegir.

Evitar columnas que no diferencian productos.

Cuando un dato relevante no esté confirmado o no exista una fuente suficientemente fiable, mostrar `–` en la tabla en lugar de rellenar el hueco con explicaciones largas o inferencias.

Priorizar tablas compactas: si una característica puede deducirse claramente de otra columna o es común a todos los modelos, no crear una columna separada.

En móvil:

- permitir desplazamiento horizontal
- mostrar un aviso visible de que la tabla puede deslizarse
- mantener celdas compactas
- no fijar automáticamente la primera columna

En la comparativa de llaves de impacto se decidió expresamente que **toda la tabla se desplaza conjuntamente, sin primera columna fija**.

Aviso actual:

`← Desliza la tabla para ver todas las columnas →`

---

# 20. Fichas y bloques de decisión

Cada ficha debe responder:

- qué diferencia al modelo
- para quién tiene sentido
- cuál es su ventaja concreta
- cuál es su limitación real
- cuándo compensa frente a otro

## “La elegiría si…”

Debe responder:

**¿Qué tiene esta máquina que puede hacer que la compre antes que otra?**

No repetir simplemente la introducción.

El ecosistema de batería puede ser un criterio secundario, pero no debe convertirse automáticamente en el argumento principal cuando existan diferencias más importantes de potencia, control, tamaño, peso, modos o accesorios.

---

# 20.1. Sistema visual de heroes internos · decisión cerrada 01/10/2026

Se cierra el posicionamiento y ritmo vertical de los textos en los heroes internos.

Reglas vigentes:

- una única geometría base para categorías, guías y comparativas
- mismo ancho de contenido alineado con la shell principal
- misma secuencia visual: menú fijo → breadcrumbs → espacio constante → kicker/tag → H1 → texto → firma editorial/chips/acciones
- un solo bloque visible de breadcrumbs por página
- mismo espaciado interno entre los elementos del hero
- sin alturas mínimas artificiales que provoquen huecos distintos entre páginas
- la altura del hero debe crecer automáticamente según la longitud real del título y del contenido
- neutralizar paddings o alturas heredadas de CSS antiguos que rompan esta geometría
- la home principal puede conservar particularidades de contenido, pero debe respetar el mismo ritmo y alineación visual cuando use el sistema común
- no volver a reajustar este posicionamiento salvo que aparezca un problema real de responsive o accesibilidad

Implementación actual en la rama `comparativas-v3-unificacion`:

- CSS compartido: `/css/hero-v5.css`
- geometría consolidada como Hero V5.1
- navegación interna preparada para funcionar tanto en producción como en previews `.pages.dev`
- JS global cargado desde ruta local `/js/main-v4.js` para no salir de la preview durante la revisión

---

# 20.2. Clasificación editorial de páginas y componentes comunes · decisión cerrada 01/10/2026

A partir de ahora, antes de diseñar una página nueva, clasificarla en una de estas tres familias:

1. **Informacional**
   - Hero común
   - Tarjeta introductoria solapada `ccs-intro-overlap`
   - Desarrollo explicativo
   - Criterios y enlaces internos relevantes

2. **Comparativa / transaccional**
   - Hero común
   - Bloque de elección rápida
   - Tabla comparativa
   - Fichas de producto
   - Criterios / metodología
   - FAQ cuando aporte valor

3. **Híbrida**
   - Hero común
   - Tarjeta introductoria solapada `ccs-intro-overlap`
   - Breve bloque educativo
   - Elección rápida
   - Tabla / fichas
   - Resto de guía

Regla visual común:

- Hero, breadcrumbs, shell, radios, sombras, tipografía y ritmo vertical deben pertenecer a la misma familia visual.
- La tarjeta introductoria tras el hero usa un único componente global.
- Referencia visual canónica para esa tarjeta: Inicio / Herramientas.
- Kicker: mayúsculas, verde medio, 13 px en escritorio.
- H2: verde oscuro, `clamp(30px,3vw,42px)`, peso 800.
- Texto: gris editorial, 17 px, misma familia tipográfica global.
- La tipografía canónica del componente es Inter / system-ui; estilos antiguos de página no deben modificarla.

Implementación actual:

- `/css/intro-v1.css`
- clases `ccs-intro-overlap`, `ccs-intro-card`, `ccs-intro-heading`, `ccs-intro-copy`

---

## Decisión de diseño de comparativas · 01/10/2026

La clasificación informacional / comparativa / híbrida se mantiene como criterio editorial, pero **no crea plantillas visuales distintas dentro de las comparativas**.

Todas las comparativas deben compartir el mismo lenguaje visual y el mismo arranque base:

`Hero → bloque de decisión/perfiles → tabla → fichas de producto → resto de contenido`

Las páginas híbridas pueden incluir más explicación editorial, pero sin introducir una cabecera o tarjeta exclusiva que las haga parecer una familia visual diferente.

Implementación actual:

- `/css/comparison-opening-v1.css` para el primer bloque de decisión/perfiles
- `/css/comparativas-v3.css` para tablas
- `/css/product-cards-v1.css` para fichas individuales
- las siete comparativas actuales usan el mismo patrón visual de apertura
- Llaves de impacto y Amoladoras a batería dejan de usar una variante visual híbrida propia

---

## Apertura común de comparativas · decisión cerrada 01/10/2026

Se unifica la apertura visual de todas las páginas con intención comparativa, incluidas las híbridas.

Patrón obligatorio:

`Hero → tarjeta blanca solapada → tres perfiles/escenarios → contenido específico → tabla → fichas`

Reglas:

- La tarjeta blanca solapada usa siempre `ccs-comparison-opening` + `ccs-comparison-opening-card`.
- El `main` de comparativas usa `ccs-comparison-main` para eliminar paddings heredados que puedan romper el solape.
- Debajo aparecen exactamente tres tarjetas `ccs-comparison-profile` dentro de `ccs-comparison-profiles`.
- La tarjeta blanca comparte lenguaje visual con las aperturas del resto de la web: mismo radio, sombra, tipografía, kicker, H2 y texto.
- La diferencia entre página puramente comparativa e híbrida es editorial, no visual.
- Llaves de impacto y Amoladoras ya usan también esta misma apertura.
- Las siete comparativas actuales tienen 1 tarjeta de apertura + 3 perfiles.

Implementación:
- `/css/comparison-opening-v1.css`

---

# 21. Cabecera editorial, afiliación y schema

Las comparativas deben mostrar:

- Compra con Sentido
- enlace a `/sobre-nosotros/`
- fecha de actualización

No repetir un aviso de afiliación en la cabecera si el aviso global del sitio ya informa claramente de la relación con Amazon.

Schema según corresponda:

- WebSite
- Organization
- BreadcrumbList
- Article
- FAQPage cuando sea útil y coincida con contenido visible
- Product o Review solo cuando los datos sean legítimos

No inventar valoraciones.

No añadir `Product`, `Review` o ratings artificialmente para aumentar el marcado.

---

# 22. Cluster prioritario: Herramientas

Herramientas es el primer cluster prioritario de expansión.

Motivos:

- existen contenidos de taladros
- existen contenidos de gatos hidráulicos
- encaja con conocimiento técnico
- tiene intención comercial
- permite monetización con Amazon

Oportunidades investigadas:

- llaves de impacto a batería: creada y publicada
- amoladoras a batería 125 mm: **creada, revisada y publicada el 30/09/2026**
- sierras circulares a batería: **investigación SEO, selección de 6 modelos, matriz técnica, estructura SEO y borrador editorial cerrados el 02/10/2026; diseño/publicación pendientes**
- plataformas de herramientas/baterías 18 V: tercera prioridad; plantearla como hub comercial/estratégico cuando el cluster tenga más familias de herramientas
- hidrolimpiadoras para coche: cuarta prioridad; pendiente resolver antes su encaje arquitectónico

No crear todavía:

- gatos hidráulicos 3 toneladas
- gatos hidráulicos perfil bajo
- gatos hidráulicos SUV
- taladros menos de 100 €

## Decisión SEO cerrada · 30/09/2026

La siguiente página nueva a preparar será:

`/herramientas/amoladoras-a-bateria/`

Estado:

**DECISIÓN CERRADA Y PUBLICADA. Selección de 6 modelos, matriz técnica, estructura SEO/editorial, diseño, enlaces afiliados y revisión visual completados.**

Keyword principal provisional:

`mejores amoladoras a batería`

Enfoque editorial:

- comparativa de amoladoras a batería con especial foco en 18 V y disco de 125 mm
- no crear una URL independiente para la variante `125 mm` mientras la misma intención pueda resolverse bien en esta página
- seleccionar solo modelos y variantes comprobados en Amazon.es antes de cerrar la comparativa
- verificar cada modelo mediante fabricante y documentación oficial antes de usar especificaciones técnicas

Orden de prioridad acordado tras analizar intención, SERP, competencia, potencial comercial, canibalización y arquitectura:

1. amoladoras a batería de 125 mm
2. sierras circulares a batería
3. plataformas de herramientas/baterías 18 V
4. hidrolimpiadoras para coche

Motivo principal:

Amoladoras combina una intención comercial clara, encaje directo en el cluster prioritario de Herramientas, bajo riesgo de canibalización y buen potencial de afiliación. Además permite reforzar el enlazado con taladros y llaves de impacto y preparar después una página estratégica sobre plataformas de batería de 18 V.

## Selección de producto cerrada · 30/09/2026 19:36

Se cierra la selección inicial de seis modelos principales para la comparativa. Todos son 18 V, admiten disco de 125 mm y se han contrastado con documentación de fabricante y presencia actual en Amazon España o Amazon Marketplace ES.

Modelos y variantes:

- Bosch Professional GWS 18V-11 S — variante cuerpo solo `06019N4000` — ASIN `B0DQV82L7J`
- Makita DGA511Z — cuerpo solo — ASIN `B079QF54JP`
- DeWalt DCG405N-XJ — cuerpo solo — ASIN `B074V6QSNH`
- Einhell Professional TP-AG 18/125-13 Q P BL - Solo — artículo `4431197` — ASIN `B0H3NVNRTX`
- Milwaukee M18 BLSAG125X-0 — referencia `4933492643` — ASIN `B0CHK5DX4C`
- Metabo WVB 18 LT BL 11-125 Quick — referencia `613057840`, con metaBOX y sin batería/cargador — ASIN `B0B7RB9PYZ`

Tracking ID de amoladoras:

`ccc-amoladoras-21`

Criterio de selección:

- una referencia clara por marca
- motor brushless
- 18 V y 125 mm
- disponibilidad comercial comprobada
- variante identificable para afiliación
- diferencias técnicas suficientemente claras para evitar seis fichas prácticamente iguales
- equilibrio entre opciones de bricolaje exigente y gamas profesionales

Razón editorial prevista para cada modelo:

- Bosch GWS 18V-11 S: polivalencia, seis velocidades, 1.100 W equivalentes declarados y buen equilibrio general
- Makita DGA511Z: regulación 3.000-8.500 rpm y tecnología ADT; la ficha oficial actual de Makita España confirma anti-restart, protección de sobrecarga y ADT, pero no lista AFT para esta variante, por lo que AFT no debe atribuirse en la página
- DeWalt DCG405N-XJ: freno electrónico, embrague electrónico y formato profesional muy consolidado; interruptor deslizante
- Einhell TP-AG 18/125-13 Q P BL: 1.300 W equivalentes declarados, interruptor de paletas, antivibración y cambio de disco sin herramientas; candidata fuerte por relación entre equipamiento y coste
- Milwaukee M18 BLSAG125X-0: 11.000 rpm, diseño compacto y FIXTEC; orientada especialmente a corte rápido, con la limitación de que esta versión no incorpora freno RAPIDSTOP
- Metabo WVB 18 LT BL 11-125 Quick: regulación 2.800-10.000 rpm, freno de aproximadamente 1 s, M-Quick y embrague S-automatic; opción de alto control y seguridad

### Regla para la tabla técnica de amoladoras

No comparar peso mientras no se pueda normalizar con la misma base en los seis modelos. Algunos fabricantes publican peso sin batería y otros con una batería concreta.

Priorizar columnas realmente comparables y que ayuden a elegir:

- velocidad / rango de rpm
- velocidad regulable
- tipo de interruptor
- freno
- sistema anti-kickback o embrague de seguridad
- cambio de disco sin herramientas
- profundidad de corte solo si existe dato oficial comparable
- contenido del paquete

No dedicar columnas a 18 V o 125 mm si los seis modelos comparten esas características.

Las equivalencias en vatios publicadas por Bosch, Einhell, Milwaukee o Metabo se pueden explicar en las fichas, pero no deben presentarse como una medición de laboratorio directamente comparable entre marcas.

Antes de publicar, volver a comprobar que los seis ASIN siguen activos en Amazon.es y que cada enlace corresponde exactamente a la variante indicada.

## Matriz técnica y estructura editorial cerradas · 30/09/2026 19:45

La investigación técnica de los seis modelos ya permite construir una comparación con magnitudes equivalentes sin mezclar datos de distinto criterio.

### Tabla principal prevista

Columnas:

- modelo
- velocidad sin carga
- velocidad regulable
- tipo de interruptor
- freno
- protección ante bloqueo / kickback
- cambio de disco
- suministro

Datos normalizados:

| Modelo | Velocidad sin carga | Regulable | Interruptor | Freno | Protección ante bloqueo / kickback | Cambio de disco | Suministro |
|---|---:|---|---|---|---|---|---|
| Bosch GWS 18V-11 S | 3.000–9.000 rpm | Sí, 6 niveles | Deslizante con bloqueo | Intelligent Brake | KickBack Control + Drop Control | Tuerca rápida | Cuerpo y accesorios; sin batería/cargador |
| Makita DGA511Z | 3.000–8.500 rpm | Sí | Deslizante | No se indica freno eléctrico específico en la ficha española actual | ADT + protección contra sobrecarga + anti-restart; no atribuir AFT en esta variante para mercado español | Tuerca convencional con llave | Cuerpo y accesorios; sin batería/cargador/Makpac |
| DeWalt DCG405N-XJ | 9.000 rpm | No | Deslizante | Freno electrónico | Embrague electrónico / protección frente al retroceso | Quick Change Flange | Cuerpo y accesorios; sin batería/cargador |
| Einhell TP-AG 18/125-13 Q P BL | 10.000 rpm | No | Paleta / hombre muerto | No se indica freno rápido específico | Arranque suave, protección contra rearranque y sobrecarga; sin anti-kickback específico declarado | Tuerca rápida sin herramientas | Cuerpo y accesorios; sin batería/cargador |
| Milwaukee M18 BLSAG125X-0 | 11.000 rpm | No | Deslizante con bloqueo | Sin RAPIDSTOP en esta variante | Embrague de seguridad frente al retroceso | FIXTEC | Sin batería/cargador/maletín |
| Metabo WVB 18 LT BL 11-125 Quick | 2.800–10.000 rpm | Sí | Deslizante lateral | Freno rápido, aprox. 1 s | Embrague mecánico S-automatic | M-Quick | Con metaBOX; sin batería/cargador |

Reglas de comparación:

- no incluir peso en la tabla principal mientras los fabricantes no publiquen el mismo criterio en los seis modelos
- no usar potencia equivalente en vatios como columna comparativa entre marcas; son declaraciones de fabricante con metodologías que no deben asumirse equivalentes
- no incluir 18 V ni 125 mm como columnas porque son características comunes a los seis
- no incluir profundidad de corte en la tabla principal mientras no exista dato oficial equivalente para todos
- diferenciar siempre freno de disco, protección anti-kickback y simple desconexión al soltar un interruptor de hombre muerto
- antes de publicar, volver a comprobar que cada ASIN sigue activo y corresponde a la variante exacta

### Posicionamiento editorial de cada modelo

- **Bosch GWS 18V-11 S:** perfil equilibrado para quien quiera velocidad regulable y un paquete de seguridad completo.
- **Makita DGA511Z:** especialmente interesante para quien valore regulación de velocidad y gestión automática de carga mediante ADT.
- **DeWalt DCG405N-XJ:** opción de velocidad fija con freno y embrague electrónicos, orientada a un uso profesional sencillo y directo.
- **Einhell TP-AG 18/125-13 Q P BL:** candidata para bricolaje exigente por equipamiento, interruptor de hombre muerto y cambio de disco sin herramientas, sin basar la recomendación en un precio fijo.
- **Milwaukee M18 BLSAG125X-0:** orientada a corte rápido y formato compacto; 11.000 rpm, FIXTEC y embrague de seguridad, con la contrapartida de no tener regulación de velocidad ni RAPIDSTOP en esta variante.
- **Metabo WVB 18 LT BL 11-125 Quick:** perfil de control y seguridad, con amplio rango de rpm, freno rápido, M-Quick y embrague S-automatic.

### SEO y estructura de contenido preparados

Title final:

`Mejores amoladoras a batería de 125 mm: 6 modelos 18 V`

H1 final:

`Mejores amoladoras a batería de 125 mm: 6 modelos de 18 V comparados`

Meta description final:

`Comparamos 6 amoladoras a batería de 125 mm y 18 V de Bosch, Makita, DeWalt, Einhell, Milwaukee y Metabo: velocidad, seguridad y cambio de disco.`

Estructura prevista:

1. introducción breve y criterio de selección
2. resumen según necesidad, sin ranking global
3. tabla técnica normalizada
4. seis fichas de producto con diferencia real y bloque “La elegiría si…”
5. cómo elegir una amoladora a batería de 125 mm
6. velocidad fija frente a regulable
7. freno, anti-kickback y sistemas de seguridad
8. interruptor deslizante frente a paleta / hombre muerto
9. cambio de disco y ergonomía práctica
10. cuerpo solo, batería y cargador
11. qué modelo encaja según tipo de uso
12. FAQ visibles y `FAQPage` solo si coinciden exactamente

FAQ previstas:

1. ¿Qué ventajas tiene una amoladora a batería de 125 mm?
2. ¿Compensa una amoladora con velocidad regulable?
3. ¿Qué diferencia hay entre freno electrónico y protección anti-kickback?
4. ¿Es mejor un interruptor deslizante o de paleta / hombre muerto?
5. ¿Compensa comprar una amoladora sin batería ni cargador?

### Enlazado interno previsto

Al publicar:

- `/herramientas/` → nueva comparativa de amoladoras
- nueva comparativa → `/herramientas/`
- nueva comparativa ↔ contenidos de taladros a batería cuando el enlace sea contextual
- nueva comparativa ↔ `/herramientas/llaves-de-impacto/` cuando el enlace sea contextual
- futura `/herramientas/plataformas-bateria-18v/` ↔ amoladoras cuando esa página exista
- no forzar enlaces hacia gatos hidráulicos solo por compartir categoría

Si la nueva página se incorpora al menú, revisar navegación de escritorio y móvil en todas las páginas actuales antes de publicar.

Estado al cierre de esta fase:

**Investigación de producto, matriz técnica, arquitectura SEO y estructura editorial completadas. La URL fue redactada, revisada y publicada el 30/09/2026.**

## Revisión SEO y contenido cerrados · 30/09/2026 20:29

Se vuelve a contrastar la SERP española antes de redactar. La intención principal sigue siendo comercial / investigación previa a compra. La SERP continúa mostrando comparativas editoriales específicas de amoladoras a batería de 18 V y 125 mm junto a grandes retailers, por lo que se mantiene como keyword principal:

`mejores amoladoras a batería`

Keywords secundarias naturales dentro de la misma URL:

- `amoladora a batería 125 mm`
- `mejor amoladora a batería`
- `mejor amoladora a batería calidad precio`
- `amoladora 18v 125 mm`
- `radial a batería 125 mm`
- `amoladora angular a batería`

No se detecta canibalización con las URLs actuales. La categoría `/herramientas/` cubre intención de navegación; las páginas de taladros y llaves de impacto cubren familias de producto diferentes. La futura página de plataformas 18 V deberá mantenerse centrada en elegir ecosistema de batería, no en comparar amoladoras.

SEO definitivo:

- URL: `/herramientas/amoladoras-a-bateria/`
- Title: `Mejores amoladoras a batería de 125 mm: 6 modelos 18 V`
- H1: `Mejores amoladoras a batería de 125 mm: 6 modelos de 18 V comparados`
- Meta description: `Comparamos 6 amoladoras a batería de 125 mm y 18 V de Bosch, Makita, DeWalt, Einhell, Milwaukee y Metabo: velocidad, seguridad y cambio de disco.`
- Canonical: `https://compraconsentido.es/herramientas/amoladoras-a-bateria/`
- Breadcrumb: `Inicio › Herramientas › Amoladoras a batería`
- Schema previsto: `Article`, `BreadcrumbList` y `FAQPage` solo si coincide exactamente con las FAQ visibles
- no añadir `Product`, `Review` ni ratings artificiales

H2/H3 definitivos:

1. H2 `Qué amoladora a batería de 125 mm elegir según lo que necesitas`
2. H2 `Comparativa de amoladoras a batería de 125 mm`
3. H2 individual para cada uno de los 6 modelos
4. H2 `Cómo elegir una amoladora a batería de 125 mm`
   - H3 `Velocidad fija o regulable`
   - H3 `Freno, anti-kickback y protección ante bloqueos`
   - H3 `Interruptor deslizante o de paleta`
   - H3 `Cambio de disco y protector`
   - H3 `Cuerpo solo, batería y cargador`
5. H2 `Qué modelo encaja mejor según el uso`
6. H2 `Preguntas frecuentes sobre amoladoras a batería`

FAQ definitivas:

1. `¿Qué ventajas tiene una amoladora a batería de 125 mm?`
2. `¿Compensa una amoladora con velocidad regulable?`
3. `¿Qué diferencia hay entre freno electrónico y protección anti-kickback?`
4. `¿Es mejor un interruptor deslizante o de paleta?`
5. `¿Compensa comprar una amoladora sin batería ni cargador?`

Enlazado interno al publicar:

- añadir la nueva comparativa desde `/herramientas/` con anchor descriptivo
- enlazar desde la nueva página hacia `/herramientas/`
- añadir enlaces contextuales bidireccionales con taladros a batería y llaves de impacto cuando aporten valor
- reservar el enlace a la futura guía de plataformas 18 V hasta que exista
- no forzar enlaces a gatos hidráulicos

Corrección técnica importante detectada durante la verificación final:

La ficha oficial actual de Makita España para DGA511 confirma velocidad 3.000-8.500 rpm, motor brushless, ADT, velocidad constante, protección contra sobrecarga y anti-restart. No lista AFT en esta variante. Además, esa ficha española incluye una mención aislada a AWS que entra en conflicto con otras fuentes oficiales de Makita, donde DGA511 y DGA512/AWS se distinguen como variantes diferentes. Por prudencia editorial, la comparativa no debe atribuir a DGA511 ni AFT ni AWS como argumentos confirmados para el mercado español.

Estado:

**CERRADA, publicada y revisada el 30/09/2026.**

Publicación final:
- URL: `/herramientas/amoladoras-a-bateria/`
- commit de producción: `2e05bc2a3bf51beb54445c2523a01214f525e687`
- despliegue Cloudflare Pages: correcto
- build y deploy de GitHub Actions: correctos
- 6 ASIN y variantes revalidados
- Tracking ID: `ccc-amoladoras-21`
- 12 enlaces Amazon con `rel="nofollow sponsored"`
- tabla compactada y responsive con `–` cuando un dato no está suficientemente confirmado
- breadcrumbs corregidos
- navegación global actualizada
- `/herramientas/` actualizado con amoladoras y llaves de impacto
- 5 FAQ visibles y `FAQPage` coincidente
- metodología editorial reforzada con documentación oficial, experiencias reales y pruebas/análisis especializados
- bloque “La elegiría si…” orientado a decisión de compra, sin repetir “Lo que destaca” ni “A tener en cuenta”
- sitemap actualizado
- imágenes definitivas incorporadas en WebP: hero + 6 modelos
- PNG duplicados eliminados del repositorio
- hero actualizado también en `/herramientas/`
- las imágenes generadas por IA de producto se muestran como ilustrativas


## Investigación SEO cerrada · Sierras circulares a batería · 02/10/2026

Decisión:

**Sí merece una URL propia**, pero no se crea todavía. La siguiente fase será cerrar selección de producto, variantes y ASIN antes de redactar.

URL propuesta:

`/herramientas/sierras-circulares-a-bateria/`

Intención principal:

**Comercial / investigación previa a compra.**

La SERP española actual separa con bastante claridad tres tipos de intención:

- búsquedas tipo `mejores sierras circulares a batería` y `mejor sierra circular a batería calidad precio`: comparativas editoriales y guías de compra
- búsqueda genérica `sierra circular a batería`: mezcla de comparadores, retailers, categorías comerciales y comparativas
- búsquedas técnicas como `18V`, `165 mm`, `carril guía` o `profundidad de corte`: intención comercial más específica, pero no suficiente para justificar URLs independientes por ahora

Keyword principal:

`mejores sierras circulares a batería`

Keywords secundarias a trabajar dentro de la misma URL:

- `mejor sierra circular a batería`
- `mejor sierra circular a batería calidad precio`
- `sierra circular a batería 18v`
- `sierra circular batería 165 mm`
- `sierra circular sin cable`
- `sierra circular a batería para madera`
- `qué sierra circular a batería comprar`

No crear una URL independiente para `165 mm`, `18 V`, `brushless` o `calidad precio` mientras la intención se pueda resolver correctamente en la comparativa principal.

### Lectura de SERP

Competidores editoriales relevantes observados:

- Guía Herramientas: comparativa muy alineada con la intención, centrada en 18 V / 165 mm y tres modelos
- Zona Herramienta: comparativa de cuatro modelos con enfoque directo a afiliación
- Mister Herramientas: página específica dentro de un cluster amplio de sierras eléctricas
- TaladrosExpert: contenido más amplio sobre sierras circulares, mezclando cable y batería
- Bricostop y otros agregadores: contenido comercial con calidad y precisión variables

También aparecen dominios comerciales fuertes:

- Idealo
- Leroy Merlin
- Bauhaus
- TodoTaladros
- Amazon indirectamente mediante fichas enlazadas desde comparadores

Conclusión SERP:

La consulta genérica tiene bastante componente transaccional y competencia de retailers fuertes, pero las búsquedas editoriales de tipo `mejores...` admiten webs especializadas pequeñas y medianas. Existe hueco para una comparativa mejor estructurada y técnicamente más consistente.

### Dificultad real

Valoración editorial:

**Media.**

Matiz:

- keyword genérica `sierra circular a batería`: dificultad media-alta por presencia de grandes retailers y comparadores
- keyword principal editorial `mejores sierras circulares a batería`: dificultad media
- long-tail 18 V / 165 mm / calidad-precio: dificultad media o media-baja según consulta

No se dispone todavía de volumen fiable propio de Search Console para esta temática. No inventar cifras de búsquedas.

### Potencial comercial y afiliación

Valoración:

**Alto.**

Motivos:

- abundante oferta de modelos en Amazon.es y retail español
- ticket claramente superior al de accesorios pequeños
- muchos modelos se venden como cuerpo solo, lo que obliga al usuario a valorar batería y cargador
- posibilidad de compra complementaria de discos, carriles guía y baterías
- intención de búsqueda cercana a la decisión de compra

Antes de seleccionar productos finales se debe confirmar:

- ficha activa Amazon.es
- ASIN
- variante exacta
- cuerpo solo o kit
- diámetro de disco
- batería/cargador incluidos o no
- posibilidad de afiliación

### Segmento técnico dominante

La SERP y el catálogo comercial muestran una presencia muy fuerte de:

- 18 V
- disco de 165 mm
- profundidades de corte aproximadas de 55–60 mm a 90° en muchos modelos

Esto convierte 18 V / 165 mm en un eje editorial especialmente útil, pero **no obliga a que todos los modelos de la comparativa sean de 165 mm** si una referencia de 184/190 mm aporta una diferencia de uso real.

No convertir automáticamente el diámetro de disco en criterio de superioridad. Un disco mayor puede aportar más profundidad de corte, pero también cambia tamaño, peso y enfoque de uso.

### Subtemas y preguntas prioritarias

La futura página debe explicar como mínimo:

- 165 mm frente a 184/190 mm
- profundidad máxima de corte a 90° y 45°
- motor brushless frente a motor con escobillas cuando exista diferencia real
- compatibilidad con carril guía
- precisión y estabilidad de la base
- ajuste de profundidad y bisel
- freno del motor y elementos de seguridad
- aspiración / soplado de polvo y visibilidad de la línea de corte
- diámetro y número de dientes del disco incluido
- cuerpo solo frente a kit con batería y cargador
- batería recomendada según el modelo, sin inventar autonomía comparable
- sierra circular frente a mini circular, caladora y sierra de inmersión cuando ayude a evitar una compra equivocada

FAQ candidatas:

1. ¿Qué diámetro de disco es mejor en una sierra circular a batería: 165, 184 o 190 mm?
2. ¿Qué profundidad de corte necesito para tableros y madera?
3. ¿Compensa una sierra circular brushless?
4. ¿Merece la pena que sea compatible con carril guía?
5. ¿Cuántos dientes debe tener el disco para un corte limpio?
6. ¿Compensa comprar una sierra circular sin batería ni cargador?

### Entidades relevantes

Marcas y plataformas que aparecen de forma recurrente en SERP y catálogo:

- Bosch Professional 18V
- Makita LXT 18V
- DeWalt XR 18V
- Einhell Power X-Change 18V
- Metabo / CAS 18V
- Ryobi ONE+ 18V
- Milwaukee M18

Modelos que aparecen repetidamente en SERP o retail y merecen investigación de producto posterior:

- Bosch GKS 18V-57-2 / GKS 18V-57-2 GX
- Makita DHS680Z
- DeWalt DCS565N-XJ / familia DCS57x
- Einhell Professional TP-CS 18/165 Li BL y TE-CS 18/165
- Metabo KS 18 LTX 57 / variante BL
- Ryobi R18CS-0
- Milwaukee M18 FCS552-0

Esta lista es **pool de candidatos**, no selección cerrada.

### Disponibilidad comercial preliminar

La investigación confirma presencia comercial actual en Amazon.es o Amazon Marketplace ES para referencias/familias de Bosch, Makita, DeWalt, Einhell y Metabo. Ryobi tiene catálogo 18 V activo y disponibilidad directa en España. Milwaukee M18 FCS552-0 tiene disponibilidad clara en distribuidores españoles, pero su ficha exacta en Amazon.es no queda suficientemente confirmada en esta fase.

Por tanto:

**no cerrar todavía seis modelos ni ASIN hasta hacer una revisión individual Amazon.es → fabricante → documentación oficial.**

### Canibalización

Estado actual:

**Riesgo muy bajo.**

Comprobaciones:

- no existe ninguna URL actual dedicada a sierras circulares
- el repositorio no contiene una página que ataque esta intención
- `/herramientas/` funciona como hub de categoría, no como comparativa de sierras
- taladros, amoladoras y llaves de impacto responden a familias de producto diferentes

Riesgo futuro a controlar:

- una futura guía sobre plataformas 18 V debe responder a `qué ecosistema de batería elegir`, no a `qué sierra circular comprar`
- no crear por ahora una segunda URL `/herramientas/sierras-circulares/`, una guía `165-mm` ni una URL `calidad-precio`

### Encaje en arquitectura

Encaje recomendado:

`/herramientas/sierras-circulares-a-bateria/`

Debe tratarse como una comparativa principal del cluster Herramientas, al mismo nivel que:

- `/herramientas/amoladoras-a-bateria/`
- `/herramientas/llaves-de-impacto/`

No crear una subcategoría `/herramientas/sierras/` hasta que exista suficiente contenido real para justificar un hub propio.

### Enlazado interno diseñado antes de publicar

Cuando la página exista:

- `/herramientas/` → sierras circulares a batería
- sierras circulares → `/herramientas/`
- enlace contextual con taladros a batería cuando se hable de montar un equipo básico de bricolaje / carpintería
- enlace contextual con amoladoras a batería cuando se hable de herramientas 18 V y corte, evitando confundir aplicaciones
- enlace contextual con la futura página de plataformas 18 V cuando exista
- no forzar enlaces hacia gatos hidráulicos o llaves de impacto si el contexto no lo justifica
- si entra en navegación principal/submenú, aplicar el cambio globalmente en escritorio y móvil

### Decisión final de esta fase

**Crear la URL tiene sentido SEO y comercial.**

Justificación:

- intención comercial clara
- SERP editorial suficientemente abierta
- buen encaje con el cluster prioritario Herramientas
- canibalización actual mínima
- oferta de producto amplia y monetizable
- subtemas técnicos que permiten aportar más valor que una ficha o ranking superficial

La selección y verificación inicial de modelos ya se ha cerrado en la fase siguiente. No se ha creado la URL, no se ha redactado contenido final y no se ha publicado nada.

Search Console sigue acumulando datos. Esta decisión se basa en intención, SERP actual, arquitectura y potencial comercial, no en volumen propio todavía.

## Selección de producto cerrada · Sierras circulares a batería · 02/10/2026 13:07

Se cierra una selección inicial de seis modelos principales para la futura comparativa. La selección prioriza variantes identificables, disponibilidad comercial comprobable, documentación oficial suficiente y diferencias de uso que permitan una comparativa útil.

Modelos y variantes:

- **Bosch Professional GKS 18V-57-2 GX** — referencia `06016C1001` — 18 V, 165 mm, motor brushless, variante con L-BOXX y sin batería/cargador — ASIN `B0DFWZTHNK`
- **Makita DHS680Z** — 18 V LXT, 165 mm, motor brushless, cuerpo solo sin batería/cargador — ASIN `B00WW83F4Q`
- **DeWalt DCS565N-XJ** — 18 V XR, 165 mm, motor brushless, cuerpo solo sin batería/cargador — ASIN `B099X7HBQF`
- **Einhell Professional TP-CS 18/165 Li BL - Solo** — artículo `4331225`, EAN `4006825677881` — 18 V, 165 mm, brushless, sin batería/cargador — ASIN `B0DX71B1JN`
- **Metabo KS 18 LTX 57 BL** — referencia `611857840` — 18 V, 165 mm, brushless, con metaBOX y sin batería/cargador — ASIN `B0CW192FVD`
- **WORX WX530** — PowerShare 20 V Max (18 V nominal de la plataforma), 165 mm, motor con escobillas, kit con batería de 2 Ah y cargador, sistema ExacTrack — ASIN `B07GY6LYTT`

### Motivo editorial de la selección

La selección evita seis máquinas prácticamente iguales:

- **Bosch GKS 18V-57-2 GX:** candidata para quien valore especialmente precisión, compatibilidad con carril FSN/FSN X y funciones de control como KickBack Control, Stop Control y ajuste de revoluciones.
- **Makita DHS680Z:** modelo consolidado y ligero, con freno eléctrico, ADT y compatibilidad con guía mediante adaptador; encaja bien para usuarios de LXT que buscan una sierra compacta.
- **DeWalt DCS565N-XJ:** propuesta profesional directa, con freno electrónico, LED, soplado de línea de corte y conexión AirLock; prioriza sencillez y control.
- **Einhell TP-CS 18/165 Li BL:** opción muy equipada dentro de Power X-Change, con 59 mm declarados a 90°, freno eléctrico, ajustes sin herramientas y compatibilidad con carril Einhell.
- **Metabo KS 18 LTX 57 BL:** destaca por su compatibilidad directa con carriles de múltiples fabricantes, motor brushless y freno de deceleración; es especialmente interesante para quien ya usa guías de otras marcas.
- **WORX WX530:** aporta un perfil distinto con ExacTrack y kit completo de batería/cargador; permite cubrir al usuario que empieza desde cero y valora cortes longitudinales guiados sin comprar la batería aparte.

### Datos técnicos ya confirmados que orientarán la futura matriz

Sin cerrar todavía la tabla final:

- Bosch: 5.000 rpm, 165 mm, hasta 57 mm a 90°, bisel hasta 50°, brushless
- Makita: 5.000 rpm, 165 mm, 57 mm a 90°, 41 mm a 45°, freno eléctrico, ADT
- DeWalt: 4.950 rpm, 165 mm, 55 mm a 90°, 42 mm a 45°, bisel hasta 50°, freno electrónico
- Einhell: 5.000 rpm, 165 mm, 59 mm a 90°, brushless, freno eléctrico
- Metabo: 5.000 rpm, 165 mm, 57 mm a 90°, brushless, freno de deceleración
- WORX: 4.900 rpm, 165 mm, 55 mm a 90°, 39 mm a 45°, freno eléctrico, ExacTrack

No utilizar todavía como tabla definitiva hasta revisar todas las magnitudes con el mismo criterio.

### Discrepancias y cautelas detectadas

- **Einhell:** la ficha oficial española muestra 44 mm a 45° en la tabla técnica, pero 41 mm en un bloque descriptivo de la misma página. Antes de publicar la matriz se debe resolver mediante manual/documentación adicional y no escoger una cifra arbitrariamente.
- **Makita:** la compatibilidad con carril guía de la DHS680 requiere tratarse con precisión; existe adaptador específico `196953-0` para esta familia. No presentar como compatibilidad directa si la documentación final confirma uso mediante adaptador.
- **WORX:** la marca comercializa PowerShare como `20 V Max`; para la comparativa no escribir simplemente `18 V` sin explicar la nomenclatura. La plataforma se describe también como 18 V (20 V Max) en documentación de la marca.
- **Amazon:** los seis ASIN quedan vinculados a las variantes seleccionadas para esta fase, pero deben volver a comprobarse inmediatamente antes de crear los enlaces afiliados, porque ficha, vendedor y disponibilidad pueden cambiar.

### Candidatos descartados o en reserva

- **Ryobi R18CS-0:** técnicamente encaja bien, pero la ficha Amazon asociada al ASIN localizado presenta una inconsistencia de denominación (`R18CSP-0`) frente al modelo oficial `R18CS-0`. Se deja fuera hasta poder validar una ficha exacta sin ambigüedad.
- **Milwaukee M18 FCS552-0:** técnicamente es una candidata fuerte y tiene distribución española clara, pero no se ha podido confirmar con suficiente fiabilidad una ficha/ASIN exactos en Amazon.es. Se mantiene como reserva.
- **HiKOKI C1806DA:** tiene especificaciones adecuadas, pero la disponibilidad exacta en Amazon.es no queda suficientemente clara para utilizarla como producto principal.

### Regla para la siguiente fase

La próxima fase será construir la **matriz técnica normalizada** y el **posicionamiento editorial**. Comparar solo magnitudes equivalentes, priorizando:

- profundidad de corte a 90° y 45°
- diámetro de disco
- velocidad sin carga
- bisel máximo
- motor brushless o con escobillas
- freno de hoja
- compatibilidad real con carril guía
- extracción/soplado y visibilidad de línea de corte
- contenido del paquete
- peso solo si puede normalizarse con el mismo criterio en los seis modelos

No usar autonomía genérica entre marcas ni convertir automáticamente mayor profundidad de corte o mayor rpm en una recomendación superior.

Estado:

**SELECCIÓN DE 6 MODELOS CERRADA. MATRIZ TÉCNICA Y CONTENIDO PENDIENTES. NO SE HA CREADO NI PUBLICADO LA URL.**

## Matriz técnica, SEO y borrador editorial cerrados · 02/10/2026 13:30

Se completa la siguiente fase sin crear la URL pública.

### Matriz técnica normalizada

Los seis modelos seleccionados utilizan disco de 165 mm. Tabla de trabajo definitiva:

| Modelo | Corte 90° | Corte 45° | rpm | Bisel máx. | Peso herramienta | Motor | Carril guía | Seguridad / control |
|---|---:|---:|---:|---:|---:|---|---|---|
| Bosch GKS 18V-57-2 GX | 57 mm | 42 mm | 5.000 | 50° | 3,4 kg sin batería | Brushless | Directo: Bosch FSN / FSN X | KickBack Control + Stop Control |
| Makita DHS680Z | 57 mm | 41 mm | 5.000 | 50° | 2,7 kg sin batería | Brushless | Mediante adaptador 196953-0 | Freno eléctrico + ADT |
| DeWalt DCS565N-XJ | 55 mm | 42 mm | 4.950 | 50° | 2,8 kg sin batería | Brushless | Sin compatibilidad dedicada declarada | Freno electrónico |
| Einhell TP-CS 18/165 Li BL | 59 mm | 44 mm | 5.000 | 45° | 2,95 kg, peso de producto declarado en variante Solo | Brushless | Carril Einhell | Freno de motor + arranque suave |
| Metabo KS 18 LTX 57 BL | 57 mm | 43 mm | 5.000 | 50° | 2,7 kg sin batería | Brushless | Directo con Metabo y múltiples carriles compatibles | Freno de deceleración |
| WORX WX530 | 55 mm | 39 mm | 4.900 | 50° | 2,3 kg sin batería | Con escobillas | Sistema propio ExacTrack | Freno eléctrico |

Decisiones técnicas:

- Einhell: usar **44 mm a 45°**. La tabla técnica y el manual oficial coinciden; el texto comercial que menciona 41 mm se trata como una inconsistencia de copy.
- Makita: describir la compatibilidad con carril **mediante adaptador 196953-0**, no como acoplamiento directo.
- WORX: usar **50°** como bisel máximo. La tabla técnica y el manual indican 0–50° aunque existe un bullet comercial aislado que menciona 55°.
- Bosch: no llamar a Stop Control “freno eléctrico”; mantener separadas sus funciones de control respecto a un freno convencional.
- DeWalt: no atribuir compatibilidad con carril guía dedicada a DCS565N-XJ.
- no comparar autonomía entre marcas
- no asumir que más profundidad o más rpm significan automáticamente mejor compra

### Posicionamiento editorial cerrado

- **Bosch:** para quien vaya a utilizar de verdad FSN/FSN X y valore control electrónico; la variante elegida no incluye carril.
- **Makita:** opción compacta y equilibrada de uso general, especialmente lógica dentro de LXT; carril mediante adaptador.
- **DeWalt:** enfoque directo, freno, LED, soplado de línea y AirLock; no orientarla a usuario que busque integración con carril.
- **Einhell:** gran capacidad dentro del formato de 165 mm y equipamiento completo dentro de Power X-Change.
- **Metabo:** diferencia principal en compatibilidad directa con carriles de múltiples fabricantes y bajo peso declarado.
- **WORX:** perfil de entrada desde cero gracias al kit con batería/cargador y ExacTrack; motor con escobillas y enfoque más de bricolaje.

La capa de uso real se ha investigado también con pruebas especializadas y experiencias del modelo exacto. Se utilizará solo para matizar manejo, guiado, polvo, esfuerzo o limitaciones prácticas; nunca como supuesto ensayo propio de Compra con Sentido.

### SEO on-page definitivo

- URL futura: `/herramientas/sierras-circulares-a-bateria/`
- keyword principal: `mejores sierras circulares a batería`
- title: `Mejores sierras circulares a batería: 6 modelos de 165 mm`
- H1: `Mejores sierras circulares a batería: 6 modelos de 165 mm comparados`
- meta description: `Comparamos 6 sierras circulares a batería de 165 mm de Bosch, Makita, DeWalt, Einhell, Metabo y WORX: corte, carril guía, freno y equipamiento.`
- canonical: `https://compraconsentido.es/herramientas/sierras-circulares-a-bateria/`
- breadcrumb: `Inicio › Herramientas › Sierras circulares a batería`
- schema previsto: Article + BreadcrumbList + FAQPage únicamente si coincide exactamente con las FAQ visibles
- no añadir Product, Review ni ratings artificiales

### Apertura de comparativa

Usar el patrón global de Diseño V1:

`Hero → tarjeta blanca solapada → exactamente 3 perfiles → contenido específico → tabla → fichas → guía`

Tres perfiles definidos:

1. cortes guiados y trabajo preciso → Bosch GKS 18V-57-2 GX
2. uso general compacto y directo → Makita DHS680Z
3. empezar desde cero con batería y cargador → WORX WX530

No implica ranking global; son recomendaciones por necesidad.

### Estructura editorial

- H2 `Qué sierra circular a batería elegir según lo que necesitas`
- H2 `Comparativa de sierras circulares a batería de 165 mm`
- seis H2 individuales de producto
- H2 `Cómo elegir una sierra circular a batería`
  - H3 `Profundidad de corte y diámetro de disco`
  - H3 `Carril guía: cuándo merece la pena`
  - H3 `Motor brushless o con escobillas`
  - H3 `Freno, visibilidad y control del polvo`
  - H3 `Disco y número de dientes`
  - H3 `Cuerpo solo o kit con batería y cargador`
- H2 `Qué modelo encaja mejor según el uso`
- H2 `Preguntas frecuentes sobre sierras circulares a batería`

FAQ previstas:

1. ¿Qué diámetro de disco es mejor: 165, 184 o 190 mm?
2. ¿Qué profundidad de corte necesito?
3. ¿Compensa una sierra circular brushless?
4. ¿Merece la pena que sea compatible con carril guía?
5. ¿Compensa comprar una sierra circular sin batería ni cargador?

### Borrador estable para Diseño

Borrador completo guardado en:

`.github/content-drafts/sierras-circulares-a-bateria.md`

El archivo contiene introducción, tres perfiles, tabla, seis fichas completas, bloques “Lo que destaca”, “A tener en cuenta” y “La elegiría si…”, guía de compra, FAQ, enlazado interno y notas de verificación.

### Enlazado interno previsto

Al publicar:

- `/herramientas/` ↔ nueva comparativa
- enlaces contextuales con taladros a batería y amoladoras a batería cuando aporten contexto real
- futura `/herramientas/plataformas-bateria-18v/` ↔ sierras circulares
- no forzar enlaces a gatos hidráulicos o llaves de impacto
- si entra en submenú, actualizar navegación escritorio/móvil globalmente

### Pendiente antes de producción

- revalidar los seis ASIN y variantes exactas en Amazon.es
- preparar y revisar imágenes
- montar la página desde `.github/content-templates/pagina-comparativa.html`
- aplicar componentes compartidos de Diseño V1
- revisión visual/responsive
- actualizar navegación, hub Herramientas, sitemap y lastmod solo cuando se publique

Estado:

**INVESTIGACIÓN, MATRIZ, SEO Y CONTENIDO CERRADOS. LISTO PARA PASAR A DISEÑO. NO SE HA CREADO NI PUBLICADO LA URL.**


---

# 23. Comparativa de llaves de impacto a batería

URL:

`/herramientas/llaves-de-impacto/`

Estado:

**CERRADA, publicada y revisada el 29/09/2026.**

Keyword principal:

`mejores llaves de impacto a batería`

Intención:

Comercial / investigación previa a compra.

Enfoque:

Coche y bricolaje.

H1:

`Mejores llaves de impacto a batería: 6 modelos para coche y bricolaje`

Meta description final:

`Comparamos 6 llaves de impacto a batería para coche y bricolaje: par de apriete y desapriete, control, batería, peso y tipo de uso.`

## Productos y ASIN

- Bosch GDS 18V-450 HC — `B0BGBQSHPK`
- Ryobi RIW18BL-0 — `B0DDKX9TQ1`
- Einhell IMPAXXO 18/450 — `B09VPV3NZD`
- Makita DTW700Z — `B08HN48666`
- DeWalt DCF891NT-XJ — `B0B3N6WM34`
- Milwaukee M18 FMTIW2F12-0X — `B08TZRFZTR`

Tracking ID:

`ccc-llaveimpac-21`

## Datos normalizados

- Bosch: 450 Nm apriete / 800 Nm desapriete / 1,6 kg sin batería / 169 mm
- Ryobi: 700 / 900 Nm / 1,7 kg sin batería / 220 mm
- Einhell: 450 / 800 Nm / 2,0 kg sin batería / 205 mm
- Makita: 700 / 1000 Nm / 2,0 kg sin batería / 170 mm
- DeWalt: 812 / 1084 Nm / 1,67 kg sin batería / 175 mm
- Milwaukee: 745 / 881 Nm / 1,6 kg sin batería / 152 mm

Todos utilizan cuadradillo de 1/2".

## Decisiones editoriales

- separar siempre apriete y desapriete
- no asumir que más Nm significa automáticamente mejor producto
- no afirmar que una cifra garantiza aflojar cualquier fijación
- 450 Nm pueden ser suficientes para muchas aplicaciones habituales en turismos, pero no garantizan aflojar cualquier fijación
- comparar peso sin batería
- incluir longitud porque puede ser decisiva en espacios estrechos
- no dedicar columna al cuadradillo porque es idéntico en los seis
- no usar autonomía genérica no comparable
- priorizar diferencias reales en “La elegiría si…”
- antes de redactar estos bloques, investigar experiencias reales, pruebas, reseñas especializadas y casos de uso del modelo exacto
- “La elegiría si…” debe funcionar como llamada a compra: explicar qué situación concreta puede justificar elegir ese modelo frente a los demás, no resumir de nuevo la ficha
- “Lo que destaca” debe recoger la ventaja práctica más relevante, preferentemente apoyada también en experiencias reales cuando existan
- “A tener en cuenta” debe señalar una contrapartida real de compra o uso, no repetir una especificación ya explicada
- estos tres bloques no deben repetirse entre sí ni duplicar el texto principal de la ficha
- las conclusiones de uso real deben repartirse también por el texto principal de cada producto cuando aporten contexto útil; no concentrarlas todas al final
- plataforma de batería como criterio secundario
- tono editorial natural
- byline de Compra con Sentido
- aviso de afiliación global sin repetición superior

## Seguridad

La página explica que:

- una llave de impacto puede usarse para desmontar ruedas
- puede utilizarse para aproximar las tuercas
- el apriete final debe comprobarse con llave dinamométrica
- debe respetarse el par indicado por el fabricante del vehículo
- deben utilizarse vasos específicos para impacto
- no conviene usar habitualmente vasos cromados convencionales con impacto

## Tabla móvil

Estado definitivo:

- scroll horizontal
- aviso destacado
- **sin primera columna fija**
- toda la tabla se mueve conjuntamente

Commit:

`fcefa069ea59f5cf522bb9bab0e58dcc817fa62e`

## FAQ

Estado definitivo:

5 preguntas visibles:

1. Nm necesarios para ruedas
2. diferencia entre apriete y desapriete
3. uso de llave dinamométrica para apriete final
4. cuándo compensa comprar sin batería
5. cuadradillo habitual de 1/2"

`FAQPage` añadido y coincidente con el contenido visible.

No se añadió `Product` ni `Review` schema artificialmente.

Commit de cierre:

`640add485fc2858e6037c8a85ab0fc7b5160384a`

## Enlaces Amazon

Comprobación final:

- 12 enlaces Amazon
- 12 utilizan `ccc-llaveimpac-21`
- 12 llevan `rel="nofollow sponsored"`

## Imágenes

Carpeta:

`/images/llaves-impacto/`

Archivos:

- `hero-llaves-impacto-ryobi.webp`
- `llave-impacto-bosch.webp`
- `llave-impacto-dewalt.webp`
- `llave-impacto-einhell.webp`
- `llave-impacto-makita.webp`
- `llave-impacto-milwaukee.webp`
- `llave-impacto-ryobi.webp`
- `llave-impacto-rueda-dinamometrica.webp`
- `vasos-impacto-cuadradillo-media-pulgada.webp`

Hero definitivo:

imagen contextual Ryobi con overlay verde y texto HTML.

## Revisión técnica final

Comprobado:

- title
- meta description
- canonical
- un único H1
- Open Graph
- Article schema
- BreadcrumbList
- breadcrumbs visibles
- byline editorial
- enlaces afiliados correctos
- FAQ visible
- FAQPage

La página se considera cerrada.

---

# 24. Páginas y contenidos existentes

Existen contenidos en los clusters:

- Herramientas
- Hogar
- Impresión 3D

Entre las páginas trabajadas se encuentran:

- taladros a batería
- gatos hidráulicos
- llaves de impacto
- aspiradoras / robots aspiradores
- deshumidificadores
- impresoras 3D
- filamentos 3D
- accesorios 3D

El estado exacto de cada URL debe contrastarse con GitHub antes de hacer cambios, ya que GitHub es la fuente de verdad del código.

---

# 25. Herramientas SEO

No contratar inicialmente:

- Semrush
- Ahrefs
- Sistrix
- DinoRank

Utilizar primero:

- Google
- Search Console
- Google Trends
- Keyword Planner
- Bing Webmaster Tools
- SERP
- autocomplete
- búsquedas relacionadas
- Reddit y foros cuando aporten información
- análisis manual

Reconsiderar herramientas de pago cuando tráfico o ingresos justifiquen el coste.

---

# 26. Costes

Costes fijos iniciales:

- dominio `.es`: 6,95 € + IVA/año según tarifa contratada
- Cloudflare Pages: 0 €
- Cloudflare DNS: 0 €
- Cloudflare CDN: 0 €
- SSL/HTTPS: 0 €
- GitHub: 0 €
- Search Console: 0 €
- Bing Webmaster Tools: 0 €

El coste fijo inicial es esencialmente el dominio.

---

# 27. Organización del proyecto en ChatGPT

Proyecto específico:

**Compra con Sentido**

Chats:

- `00 - MASTER y dirección`
- `01 - Dominio + Cloudflare + GitHub`
- `02 - SEO + Keywords + Arquitectura`
- `03 - Diseño + Plantilla web`
- `04 - Migración páginas actuales`
- `05 - Search Console + SEO real`

Estado actual de uso:

- 00: trabajado
- 01: trabajado
- 02: sin trabajo relevante hasta ahora
- 03: trabajado ampliamente
- 04: sin trabajo relevante hasta ahora
- 05: trabajado

Funciones:

- 00: decisiones globales, estrategia y MASTER
- 01: infraestructura y publicación
- 02: SERP, clusters, keywords y arquitectura
- 03: diseño global, HTML, CSS, componentes y responsive
- 04: migración/integración de contenidos existentes
- 05: Search Console, indexación y optimización basada en datos reales

Norma:

Avisar al usuario cuando sea conveniente continuar una fase en otro chat.

### Regla de traspaso entre chats

Cuando una tarea deba continuar en otro chat del proyecto, ChatGPT debe entregar en la misma respuesta un texto **listo para copiar y pegar** en el chat de destino.

Ese texto debe presentarse dentro de una caja de código para que Sergio pueda copiarlo directamente sin reconstruir contexto.

El traspaso debe incluir, cuando corresponda:

- nombre exacto del chat de destino
- instrucción de consultar primero el `COMPRA-CON-SENTIDO-MASTER.md` actual en `main`
- estado real del trabajo ya cerrado
- decisiones que no deben rehacerse
- archivos, rutas o borradores internos relevantes
- siguiente bloque de tareas concreto
- restricciones importantes, especialmente `no publicar` cuando proceda
- flujo obligatorio de GitHub: `rama → PR → check build → squash → main`
- cualquier validación pendiente antes de producción

No limitarse a decir “continúa en el chat 03” o equivalente. Siempre que el cambio de chat sea el siguiente paso recomendado, generar automáticamente ese texto de traspaso listo para copiar.

---

# 28. Decisiones cerradas

- Marca definitiva: Compra con Sentido.
- Dominio definitivo: `compraconsentido.es`.
- Dominio canónico sin `www`.
- `www` redirige mediante 301 al dominio raíz.
- GitHub es la fuente definitiva del código.
- Cloudflare Pages es el hosting.
- Cloudflare gestiona DNS, CDN y HTTPS.
- Mantener infraestructura estática siempre que sea posible.
- TLS mínimo 1.2.
- HSTS desactivado por ahora.
- No usar Google Drive como servidor permanente de imágenes.
- No usar `pages.dev` como URL pública o canónica.
- Search Console principal: propiedad de dominio `compraconsentido.es`.
- No modificar DNS o sitemap sin una razón concreta si Google funciona correctamente.
- Amazon España es el destino principal de monetización inicial.
- Verificar ASIN y variante antes de publicar.
- No mostrar precios fijos si no se actualizan de forma fiable.
- No afirmar pruebas físicas inexistentes.
- Investigar primero fuentes oficiales y ampliar a fuentes secundarias fiables cuando falten datos.
- Separar magnitudes técnicas que no sean equivalentes.
- No crear nuevas URLs por simples variaciones de keyword sin datos o SERP que lo justifiquen.
- Breadcrumbs visibles en todas las páginas salvo la home.
- Revisar navegación global cuando una nueva página deba aparecer en el menú.
- Llaves de impacto: página cerrada y publicada.
- Tabla móvil de llaves de impacto: sin columna fija.

---

# 29. Pendientes actuales

## SEO / Search Console

- [ ] Esperar a que `Indexación > Páginas` termine de procesar los datos. El sitemap actual contiene 22 URLs tras publicar amoladoras; Search Console debe volver a procesar el sitemap y la nueva URL.
- [ ] Revisar páginas indexadas y excluidas.
- [ ] Analizar consultas e impresiones cuando haya datos suficientes.
- [ ] Detectar oportunidades en posiciones 8-20.
- [ ] Revisar Core Web Vitals con datos reales.
- [ ] Configurar Bing Webmaster Tools.

## Contenido

- [ ] Continuar keyword research del cluster Herramientas.
- [x] Priorizar amoladoras a batería 125 mm como siguiente página.
- [x] Cerrar selección de modelos, variantes y ASIN para `/herramientas/amoladoras-a-bateria/`.
- [x] Preparar tabla técnica normalizada, estructura editorial, FAQ y enlazado interno de `/herramientas/amoladoras-a-bateria/`.
- [x] Redactar, revisar y publicar `/herramientas/amoladoras-a-bateria/`.
- [x] Investigar sierras circulares a batería y decidir si merece URL propia.
- [x] Cerrar selección de modelos, variantes y ASIN para `/herramientas/sierras-circulares-a-bateria/`.
- [x] Preparar matriz técnica normalizada, posicionamiento editorial, SEO on-page, FAQ y estructura de contenido de `/herramientas/sierras-circulares-a-bateria/`.
- [x] Preparar borrador editorial completo de `/herramientas/sierras-circulares-a-bateria/` sin crear la URL pública.
- [ ] Revisar en preview la página de sierras circulares montada en Diseño V1, sustituir imágenes provisionales por imágenes autorizadas de producto, confirmar disponibilidad final Amazon.es/tracking y publicar solo tras aprobación.
- [ ] Investigar plataformas de herramientas/baterías 18 V.
- [ ] Analizar arquitectura para hidrolimpiadoras de coche.
- [ ] Definir progresivamente las primeras 20-30 URLs de alta calidad.
- [ ] No crear todavía variantes específicas de gatos/taladros sin evidencia SEO.

## Sitio y transparencia

- [x] Crear y conectar `/metodologia/`.
- [ ] Revisar estructura legal de privacidad/cookies/afiliación.
- [ ] Mantener `/sobre-nosotros/` y firma editorial coherentes.
- [ ] Revisar página 404 y demás elementos técnicos globales cuando corresponda.

## Infraestructura

- [ ] Comprobar renovación automática del dominio.
- [ ] Mantener HSTS desactivado hasta nueva decisión.
- [ ] Mantener vigilancia sobre reglas de bots de Cloudflare antes de reactivar bloqueo de entrenamiento.

---


## Saneamiento técnico/editorial realizado el 30/09/2026

Tras auditar las 19 páginas anteriores a `/herramientas/llaves-de-impacto/`, se aplicaron directamente en `main` correcciones globales que no requerían decisión editorial adicional:

- corregido el menú de `/herramientas/taladros-a-bateria/` para incluir `Llaves de impacto`
- eliminado el aviso superior de afiliación duplicado en la comparativa de gatos hidráulicos
- eliminado el aviso superior de afiliación duplicado en la comparativa de taladros
- sustituido el bloque superior de transparencia de robots aspiradores por una explicación positiva de metodología
- sustituido el bloque superior de transparencia de impresoras 3D por una explicación positiva de metodología
- reformuladas las frases defensivas sobre pruebas físicas en gatos y deshumidificadores
- eliminadas las referencias a precios observados en la comparativa de taladros, sustituyéndolas por `Consulta el precio y la disponibilidad actuales en Amazon`
- añadido el aviso móvil `← Desliza la tabla para ver todas las columnas →` a las tablas existentes de taladros, robots aspiradores, deshumidificadores e impresoras 3D
- añadido estilo global reutilizable para ese aviso de desplazamiento
- añadido `FAQPage` donde ya existían FAQ visibles y coincidentes: gatos hidráulicos, taladros, robots aspiradores e impresoras 3D
- actualizado `lastmod` a 30/09/2026 para las páginas modificadas
- confirmado que el repositorio real y activo es `SuperSergi/compra-con-sentido`

Commits principales del saneamiento:
- `ada1669e760394250258a8f95e6c92796274915b` — estilo global para tablas móviles
- `53ef383935717e1130735edeb10d70c9bf1b9e08` — menú de taladros
- `85c00d0a939a3e4f5b513dd7cdab78e46caac3dd` — gatos hidráulicos
- `ede49344afebe3e0e6da876c298ce9594da00ef3` — taladros
- `7fb34337b241f5a594b78dbb9f24adcc6de1d7a7` — robots aspiradores
- `20327b1ece72c1497a7773f18abe42ffa843424f` — deshumidificadores
- `f8bc6ed7c9f5182fdbef0476fe50da0a8d24c9e3` — impresoras 3D
- `1d9cb85f80111668e9378ce3556b4e05d6910988` — sitemap `lastmod`

Queda pendiente la revisión de producto con el estándar nuevo, empezando por gatos hidráulicos:
`Amazon.es → ASIN → variante exacta → fabricante → documentación oficial → especificaciones comparables → cuerpo/kit/accesorios → disponibilidad → discrepancias`.

Primeras comprobaciones de gatos realizadas:
- BGS 2889 confirmado en fabricante oficial: 2,5 t, 100 mm de altura mínima, 460 mm máxima, construcción aluminio/acero y doble pistón
- Einhell CC-TJ 2000 confirmado en fabricante oficial: 2 t, 135 mm mínima y 330 mm máxima
- no modificar el resto de modelos hasta cerrar sus fuentes y variantes exactas

---

# 30. Regla de mantenimiento del MASTER

Este documento es la referencia consolidada del proyecto.

Actualizarlo cuando:

- cambie infraestructura
- se compre o contrate algo
- se publique una URL
- se cierre una decisión SEO
- aparezca un problema importante
- se complete una tarea
- cambie una norma
- se incorpore una herramienta
- se modifique arquitectura
- se cierre una comparativa

Cuando una información antigua contradiga una decisión posterior, prevalece el **estado más reciente confirmado**.

GitHub sigue siendo la fuente definitiva del código publicado.

Cuando Sergio responda `ok`, `vale`, `dale`, `sigue` o equivalente después de que el siguiente paso haya quedado claramente definido, se considera autorización para ejecutarlo sin volver a pedir confirmación.

### Norma de avance autónomo

ChatGPT debe avanzar por su cuenta en todo lo que pueda completar de forma segura, reversible y coherente con las decisiones ya cerradas, sin esperar a Sergio entre pasos. Puede encadenar revisión, investigación, correcciones técnicas, actualización de código, documentación y comprobaciones mientras no requiera una decisión nueva del usuario ni una acción externa que solo Sergio pueda realizar.

Debe ir informando al final de cada bloque o hito relevante de lo que ha hecho, qué ha cambiado, qué queda pendiente y cuál es el siguiente paso lógico, pero esa explicación no debe implicar detener el trabajo si puede continuar de forma autónoma.

Solo debe parar y pedir intervención cuando necesite realmente a Sergio. En ese caso, el mensaje debe ser explícito y accionable, indicando claramente: `Necesito que tú hagas esto:` seguido de la acción o acciones concretas necesarias, sin ambigüedades. Una vez Sergio complete esa intervención, ChatGPT debe continuar automáticamente desde el punto pendiente sin volver a pedir confirmación si el siguiente paso ya está definido.

---

## Actualización adicional 30/09/2026 — cierre de comparativas antiguas y auditoría UX global

Se completó la revisión técnica principal de las cinco comparativas antiguas con el estándar nuevo:

- Gatos hidráulicos: seis modelos contrastados; Tarpofix 3T quedó verificado en fuente directa con 3 t, 85–475 mm, doble cilindro, acero, plato de 110 mm y 31 kg. Comparativa cerrada sin cambios de producto.
- Taladros a batería: seis modelos y variantes revisados; la promesa comercial de “menos de 200 €” seguía siendo válida a 30/09/2026, con DeWalt como modelo más cercano al límite. Comparativa cerrada técnicamente.
- Robots aspiradores: especificaciones principales de los seis modelos contrastadas; se eliminaron recuentos de valoraciones y frases basadas en popularidad de Amazon para hacer el contenido más atemporal. La tabla pasó de “Valoraciones observadas” a “Ideal para”.
- Deshumidificadores: seis modelos contrastados. Se detectó discrepancia de conectividad en Midea DF20 entre ficha comercial y documentación oficial; se dejó explícita sin inventar el dato. Se mejoró la explicación sobre condiciones de ensayo y superficies máximas.
- Impresoras 3D: seis modelos contrastados con documentación oficial; no se detectaron errores técnicos relevantes. Se mantuvo en Flashforge AD5X la distinción correcta entre velocidad de impresión y desplazamiento.

### Auditoría UX / navegación

Se detectaron y corrigieron varios problemas globales:

- los breadcrumbs visibles estaban fuera del hero en varias páginas, sobre fondo blanco; el estilo global se cambió para integrarlos sobre el hero
- se eliminaron duplicados de navegación donde la categoría y “Cómo elegir…” apuntaban a la misma URL en Gatos, Taladros, Impresoras 3D, Aspiradoras y Deshumidificadores
- se añadieron breadcrumbs visibles a las páginas que carecían de ellos, manteniendo la home sin migas
- se unificó la página de Llaves de impacto con el sistema global de breadcrumbs
- se actualizó el CTA corto “Ver en Amazon” de la tabla de Llaves de impacto a “Ver precio en Amazon”
- se añadió aviso móvil de desplazamiento horizontal a la tabla de Filamentos 3D
- se actualizó la versión de `style-v4.css` y `main-v4.js` en todas las páginas a `?v=20260930-2` para evitar caché antigua de navegador/Cloudflare
- se actualizaron fechas editoriales y `lastmod` cuando correspondía tras las revisiones

Commits destacados de esta fase:

- `3405d75841dde4140e17f90beb2f59d1460fe527` — limpieza de submenús duplicados
- `a73cff472aaa2d214b31bcfdac2c6b66c5c1af96` — breadcrumbs integrados sobre el hero
- `0dec4b889013d6a8d09c1a2ac73d21fd2df3cb68` — robots aspiradores más atemporal
- `a36339b6db6c9c98c07efededd1dac1f98b26e2c` — revisión técnica de deshumidificadores
- `b0bb9ba2586e45a93588ec3bcc4d90f6166d6fa2` — revisión de impresoras 3D
- `b0e0c2b6cb9382a596e4dc5ece686dc4899b4c88` — breadcrumbs y CTA de Llaves de impacto
- `8af15a7d092b0b1dc4cbb7bd2a2c95b665bd930f` — aviso móvil en tabla de Filamentos 3D
- `29ceecd40935c6520189e7c13f170ce0e36753a0` — actualización de `lastmod` tras ajustes UX

Estado al cierre de esta fase:

- las cinco comparativas antiguas ya han pasado la revisión técnica principal
- la navegación y breadcrumbs están mucho más homogeneizados
- queda pendiente una comprobación visual final en producción, especialmente en móvil y escritorio, y después crear `/metodologia/`


---

## Actualización 30/09/2026 — publicación de `/metodologia/` y conexión GSC Wizard

Se publicó la nueva página:

- `https://compraconsentido.es/metodologia/`

Objetivo de la página:

- explicar de forma transparente cómo se elaboran guías y comparativas
- detallar el orden de fuentes: fabricante → manuales/documentación → fuentes especializadas → contraste de discrepancias
- explicar cómo se identifican variantes exactas, ASIN y contenido del paquete
- aclarar que no se presenta como prueba física un análisis que no haya implicado uso directo del producto
- explicar cómo se tratan Amazon Afiliados, disponibilidad y precios cambiantes
- dejar claro que las comparativas priorizan diferencias reales, perfiles de uso y magnitudes equivalentes frente a rankings universales
- explicar el criterio de actualización editorial y que no se cambia una fecha sin revisión o cambio real

Cambios asociados:

- creada `metodologia/index.html`
- creada `css/metodologia.css`
- añadido enlace visible a `Metodología` en el footer de todas las páginas actuales
- añadido enlace contextual desde `/sobre-nosotros/`
- añadida `/metodologia/` al sitemap con `lastmod` 30/09/2026

Commits principales:

- `2a65f1050ebb3828e07f9a2a6874225d7a06a5ba` — publicación HTML de Metodología
- `d75c1fb7a07b0f1989a4e9f2009046f745ff149f` — estilos de Metodología
- `f6bf2a26debe39295e5fd6f573de5cf5323e8293` — Metodología añadida al sitemap
- `3b6cf57e527430fc5260e407f8910173e929059f` — enlace contextual desde Sobre el proyecto

### Search Console / GSC Wizard

El 30/09/2026 se conectó en GSC Wizard la propiedad real:

- `sc-domain:compraconsentido.es`
- permiso confirmado: `siteOwner`
- etiqueta: `Compra con Sentido`

Estado de datos al consultar el 30/09/2026:

- datos asentados hasta 27/09/2026
- 0 clics
- 0 impresiones
- sin consultas ni páginas con datos todavía en el periodo disponible

Estado del sitemap en Search Console antes de reenviarlo:

- `https://compraconsentido.es/sitemap.xml`
- sin errores
- sin warnings
- 20 URLs detectadas en la última descarga anterior
- 0 indexadas reportadas en ese momento
- última descarga observada: 30/09/2026 11:30 UTC aprox.

Tras publicar `/metodologia/`, se volvió a enviar el sitemap mediante Search Console:

- envío aceptado y confirmado
- estado inmediato: pendiente de nueva descarga
- el nuevo sitemap contiene 21 URLs

No interpretar el dato de 0 indexadas como estado definitivo hasta que Google vuelva a descargar y procesar el sitemap actualizado.

### Siguiente fase

Con el saneamiento técnico/editorial y `/metodologia/` ya cerrados, el siguiente bloque de trabajo pasa a ser:

1. comprobar que Google vuelve a descargar el sitemap actualizado y que reconoce las 21 URLs
2. revisar indexación real de las URLs principales
3. esperar datos de consultas reales en Search Console
4. cuando existan impresiones, priorizar oportunidades aproximadamente en posiciones 8–20
5. decidir optimizaciones o nuevas URLs solo a partir de intención real, SERP, canibalización y potencial comercial

Mientras Search Console todavía no tenga datos de consultas, evitar crear nuevas URLs por inercia. Se puede avanzar en comprobaciones técnicas, enlazado interno, indexación y preparación de arquitectura, pero las nuevas comparativas deben seguir el flujo SEO estratégico definido en este MASTER.


## Norma de versionado del MASTER

- Cada actualización del MASTER debe incluir también la hora local de actualización en formato `DD/MM/YYYY HH:MM` para que sea fácil identificar cuál es la versión más reciente subida al proyecto.
- Última actualización de esta versión: 04/10/2026 09:22.

---

# 30. Estado de indexación real · 30/09/2026 18:49

Se ha revisado mediante URL Inspection el estado real de las 21 URLs incluidas en el sitemap.

## Sitemap

- `https://compraconsentido.es/sitemap.xml`
- 21 URLs enviadas
- última descarga observada: 30/09/2026 16:24 UTC aprox.
- 0 warnings
- 0 errors
- el informe agregado del sitemap todavía muestra 0 indexadas, pero este dato va con retraso y no coincide aún con la inspección URL por URL.

## URLs confirmadas como indexadas

Google devuelve `Submitted and indexed`, con rastreo móvil y acceso permitido, para:

- `/`
- `/herramientas/`
- `/herramientas/gatos-hidraulicos/`
- `/herramientas/gatos-hidraulicos/mejores-gatos-hidraulicos-para-coche/`
- `/herramientas/taladros-a-bateria/`
- `/herramientas/taladros-a-bateria/mejores-taladros-a-bateria/`
- `/herramientas/llaves-de-impacto/`
- `/hogar/`
- `/hogar/aspiradoras/`
- `/hogar/aspiradoras/mejores-robots-aspiradores/`
- `/hogar/deshumidificadores/cuantos-litros-deshumidificador-metros-cuadrados/`
- `/impresion-3d/`
- `/impresion-3d/impresoras-3d/mejores-impresoras-3d/`
- `/sobre-nosotros/`
- `/aviso-legal/`

Total confirmado por inspección: **15 URLs indexadas**.

## URLs descubiertas pero todavía no indexadas

- `/hogar/deshumidificadores/`
- `/hogar/deshumidificadores/mejores-deshumidificadores/`
- `/impresion-3d/filamentos-3d/`

Estado: `Discovered - currently not indexed`.

## URLs todavía desconocidas para Google

- `/impresion-3d/impresoras-3d/`
- `/impresion-3d/accesorios-3d/`
- `/metodologia/`

Estado: `URL is unknown to Google`.

## Interpretación

La indexación general es mucho mejor de lo que muestra todavía el contador agregado del sitemap: 15 de 21 URLs ya están confirmadas individualmente como indexadas.

No hay indicios de bloqueo por robots en las URLs indexadas. Las seis pendientes son coherentes con una web nueva y con páginas publicadas o modificadas recientemente.

No realizar cambios agresivos ni crear nuevas URLs solo para intentar forzar indexación. Mantener sitemap correcto, enlazado interno y contenido estable, y volver a revisar estas seis URLs cuando Google haya tenido tiempo de rastrearlas.

## Siguiente acción

- vigilar las 6 URLs pendientes
- comprobar cuándo pasan a rastreadas/indexadas
- revisar el informe agregado del sitemap cuando se actualice
- esperar las primeras impresiones y consultas reales en Search Console antes de decidir nuevas páginas por datos


## Sistema global de aperturas · decisión cerrada 01/10/2026

Se unifica la apertura visual del site completo.

Regla global:

- Todas las páginas internas/editoriales usan la misma tarjeta blanca solapada sobre el hero mediante `ccs-intro-card` y `intro-v1.css`.
- Las comparativas e híbridas reutilizan esa misma tarjeta blanca; no tienen una tarjeta visual separada.
- Las comparativas e híbridas añaden debajo exactamente tres perfiles/escenarios mediante `ccs-comparison-profiles` y `ccs-comparison-profile`.
- `comparison-opening-v1.css` queda reservado a la estructura específica de comparativas y a los tres perfiles; la apariencia de la tarjeta blanca se controla únicamente desde `intro-v1.css`.
- Si cambia color, radio, sombra, tipografía, padding o geometría de `ccs-intro-card`, el cambio se propaga a todo el site sin editar cada HTML.
- Los bloques `La elegiría si...` quedan definitivamente con fondo azul suave, borde azul y texto/título azul mediante `product-cards-v1.css`.

Auditoría realizada sobre todas las URLs actuales del sitemap:
- todas usan `ccs-intro-card`
- las 7 comparativas actuales usan además 3 perfiles

Plantillas maestras añadidas para nuevas páginas:
- `.github/content-templates/pagina-informacional.html`
- `.github/content-templates/pagina-comparativa.html`

Las nuevas páginas deben partir de estas plantillas y no copiar estructuras antiguas de páginas existentes.

Última actualización: 01/10/2026 20:44.

---

---

## Actualización 01/10/2026 21:51 — auditoría estática final y limpieza CSS

Trabajo realizado en la rama `comparativas-v3-unificacion` del PR #3, todavía sin fusionar a `main`.

### Alcance

Se auditaron las 7 comparativas incluidas en la unificación v3:

- Amoladoras a batería
- Llaves de impacto
- Gatos hidráulicos
- Taladros a batería
- Robots aspiradores
- Deshumidificadores
- Impresoras 3D

### Limpieza CSS aplicada

Se eliminaron únicamente reglas específicas cuyo selector ya no puede coincidir con el HTML actual ni con clases utilizadas por el JavaScript global o inline.

Reducción total aproximada: **22.610 caracteres de CSS obsoleto**.

Recorte por capa específica:

- Gatos: 3.045 caracteres; 25 reglas retiradas
- Taladros: 7.904 caracteres; 61 reglas retiradas
- Impresoras 3D: 3.015 caracteres; 22 reglas retiradas
- Amoladoras: 2.370 caracteres; 26 reglas retiradas
- Llaves de impacto: 1.916 caracteres; 22 reglas retiradas
- Robots aspiradores: 2.246 caracteres; 21 reglas retiradas
- Deshumidificadores: 2.114 caracteres; 17 reglas retiradas

También se actualizaron las versiones de caché de los CSS específicos modificados y Deshumidificadores quedó alineado con `/css/style-v4.css?v=20261001-6`.

### Validación estática superada

En las 7 comparativas se confirmó:

- un único H1
- clase global `ccs-comparison-v3`
- hero común `ccs-hero`
- intro común `ccs-intro-card`
- perfiles de decisión `ccs-comparison-profiles`
- 6 fichas de producto por comparativa
- aviso móvil de desplazamiento de tabla
- CSS enlazado con estructura de llaves válida
- CSS inline restante con estructura válida

### Decisión de limpieza

No se compactaron `hero-v5.css` ni `intro-v1.css` aunque contienen capas históricas y algunas reglas sobrescritas, porque son estilos globales usados fuera de las comparativas. Modificarlos sin una regresión visual completa de toda la web introduciría un riesgo innecesario.

### Pendiente antes de fusionar

Queda únicamente la **comprobación visual final de la preview de la rama en escritorio y móvil**. La URL de preview de Cloudflare no fue accesible desde esta sesión, por lo que esta validación no se marca como realizada.

---

## Cierre de Diseño V1 · 01/10/2026 22:27

Estado: **CERRADO Y PUBLICADO**.

Rama de trabajo: `comparativas-v3-unificacion`  
PR: `#3`

### Resultado de la auditoría final responsive

Se ha completado una auditoría automática sobre las **22 URLs del sitemap** en cuatro anchos de viewport:

- 360 px
- 390 px
- 768 px
- 1440 px

Resultado final:

- 22 URLs comprobadas
- 88 combinaciones URL/viewport
- 88 comprobaciones superadas
- 0 incidencias
- HTTP 200 en todas las URLs comprobadas
- sin overflow de página detectado
- navegación móvil y escritorio correcta
- tablas comparativas contenidas en scroll horizontal cuando corresponde
- perfiles y tarjetas dentro del viewport
- imágenes visibles sin roturas detectadas
- un único H1 por página
- breadcrumbs correctos: ninguno en portada y uno en cada página interna

Ejecución final de GitHub Actions: `36921312843`.

### Interferencias responsive corregidas

Durante la auditoría se localizaron y corrigieron:

- una regla global que imponía `position: relative` a `.main-nav` y anulaba el `position: fixed` del menú móvil
- overflow móvil en la portada de Impresión 3D provocado por altura fija combinada con `aspect-ratio`
- overflow equivalente en tarjetas de Hogar
- ancho mínimo efectivo en tarjetas de Accesorios 3D
- desbordamiento del bloque final de Hogar a 360 px
- contención horizontal global para elementos decorativos sin interferir con el scroll interno de tablas

### CSS y recursos antiguos/remotos

Auditoría realizada sobre las 22 páginas:

- todas las hojas de estilo se cargan desde rutas locales `/css/...`
- no quedan hojas CSS remotas
- las imágenes de fondo que todavía apuntaban a `https://compraconsentido.es/images/...` dentro de CSS inline se pasaron a rutas locales `/images/...`
- se actualizaron versiones de caché de los CSS modificados para evitar que Cloudflare o el navegador sirvan reglas antiguas

### Sitemap

El sitemap contiene **22 URLs** y se actualiza `lastmod` a `2026-10-01` tras el cierre del rediseño global.

### Estado de Diseño V1

Diseño V1 queda cerrado y publicado en producción:

- sistema global de hero cerrado
- tarjeta de apertura global cerrada
- sistema de comparativas v3 unificado
- fichas de producto compartidas
- tablas responsive
- navegación y breadcrumbs homogeneizados
- responsive validado de 360 a 1440 px
- interferencias CSS detectadas durante la auditoría eliminadas
- recursos del preview desacoplados del dominio de producción

Publicación completada:

- PR #3 fusionado a `main` mediante squash
- commit de producción: `8392cca43291c533b4763e8ca10e3413dedadf33`
- Cloudflare Pages: despliegue completado correctamente para `8392cca`
- GitHub Pages / workflow de despliegue: completado correctamente
- estado final de Diseño V1: **CERRADO Y PUBLICADO**

La auditoría responsive final previa al merge queda como referencia de cierre: 88/88 comprobaciones superadas y 0 incidencias.

---

## Corrección post Diseño V1 · footer global y estructura HTML · 02/10/2026 07:27

Tras revisión visual en producción se detectaron inconsistencias que la auditoría responsive automática no cubría.

### Problemas detectados

- existían varias versiones históricas del footer con columnas y enlaces distintos
- Amoladoras aplicaba una regla general de `h2` que también alcanzaba los títulos del footer
- Gatos hidráulicos marcaba como `active` un enlace dentro de un dropdown blanco y heredaba el color blanco del estado activo global
- las comparativas de Gatos hidráulicos, Robots aspiradores, Impresoras 3D y Deshumidificadores tenían el bloque `Cómo analizamos` escrito después de `</html>`, por lo que aparecía visualmente debajo del footer

### Corrección aplicada

- footer unificado en las 22 URLs actuales con la misma estructura, títulos y enlaces
- rutas del footer normalizadas a URLs absolutas desde raíz
- estilos del footer aislados para impedir que CSS específico de una página cambie títulos, márgenes, fondos o disposición
- selector de Amoladoras limitado a `main h2`
- estado activo de enlaces dentro de dropdown corregido para escritorio y móvil
- los cuatro bloques `Cómo analizamos` se han movido dentro de `<main>`
- confirmado que no queda contenido después de `</html>` en ninguna de las 22 páginas
- versión global de `style-v4.css` actualizada a `20261002-1`

Commit principal: `b2f9c535b6f5340acda5c7901d6cf74a2a56dc5b`.

Cloudflare Pages y el workflow de despliegue completaron correctamente la publicación del cambio.

### Decisión

A partir de ahora el footer se considera un componente visual único del sitio. Cualquier cambio de contenido, enlaces o estructura del footer debe aplicarse a todas las páginas actuales y futuras.

---

## Regla global de espaciado · 02/10/2026

Se establece una escala común de separación visual para evitar diferencias entre páginas y componentes.

Variables globales en `/css/style-v4.css`:

- `--gap-content`: separación entre elementos relacionados dentro de una tarjeta o bloque
- `--gap-card`: separación entre tarjetas de un mismo grupo
- `--gap-section`: separación entre secciones independientes
- `--gap-page-end`: separación final entre el último bloque de contenido y el footer

Valores base escritorio:

- contenido: 16 px
- tarjetas: 24 px
- secciones: 64 px
- cierre antes del footer: 80 px

Valores responsive principales:

- tarjetas: 18 px
- secciones: 40 px
- cierre antes del footer: 52 px

Regla de mantenimiento:

- no introducir nuevos valores arbitrarios de `margin` o `gap` cuando una de estas variables pueda resolver el caso
- cualquier excepción debe responder a una necesidad concreta de diseño
- los componentes compartidos deben usar esta escala común
- la normalización del CSS heredado se hará progresivamente cuando se edite cada bloque, evitando cambios globales ciegos que puedan alterar composiciones existentes

Las tarjetas `Cómo analizamos` de las comparativas de Gatos hidráulicos, Robots aspiradores, Impresoras 3D y Deshumidificadores quedan sometidas a esta regla y reciben una separación final común antes del footer.

---

## Aplicación global del sistema de espaciado · 02/10/2026

La regla de espaciado deja de ser únicamente una referencia para componentes nuevos y pasa a aplicarse al conjunto del sitio.

### Contrato global

- `--gap-content`: separación entre elementos relacionados de un mismo bloque
- `--gap-card`: separación entre tarjetas de un mismo grupo
- `--gap-section`: separación entre secciones principales
- `--gap-page-end`: separación final entre el contenido principal y el footer
- `--pad-card`: padding reutilizable para tarjetas

Los valores se definen de forma responsive mediante la escala global de `style-v4.css`.

### Aplicación

- todas las páginas comparten el mismo espacio final antes del footer
- las secciones principales consecutivas usan una separación común
- los grids principales de tarjetas de Herramientas, Hogar, Impresión 3D y comparativas usan `--gap-card`
- los layouts editoriales amplios usan `--gap-section`
- listas, metadatos, acciones y grupos internos usan `--gap-content`
- las tarjetas `Cómo analizamos` mantienen la misma separación que el resto de secciones
- las utilidades `.ccs-stack`, `.ccs-card-grid`, `.ccs-section-gap` y `.ccs-card-pad` quedan disponibles para contenido nuevo

### Regla de mantenimiento

Las páginas nuevas deben usar este contrato. Los CSS específicos pueden modificar composición, columnas o comportamiento responsive, pero no deben introducir separaciones estructurales arbitrarias cuando exista una variable global equivalente.

---

## Protección de la rama de producción · 02/10/2026

Se activa el ruleset `Protección de main` sobre la rama por defecto `main`.

Configuración aplicada:

- protección contra borrado de `main`
- bloqueo de force push
- cambios a producción mediante pull request
- 0 aprobaciones obligatorias, adecuado mientras el repositorio lo mantiene una sola persona
- método de merge permitido: `squash`
- check obligatorio antes del merge: `build`
- no se exige que la rama esté actualizada con `main` antes de fusionar
- no se exige despliegue de Cloudflare como condición de merge
- ruleset activo y sin bypass

Decisión operativa:

A partir de esta fecha los cambios de código y documentación deben realizarse en una rama de trabajo y entrar en `main` mediante pull request. `main` sigue siendo la fuente de verdad de producción.

### Validación del flujo protegido

Se realiza una comprobación práctica del nuevo flujo de pull request para confirmar que el check `build` se ejecuta correctamente antes de volver a establecerlo como requisito obligatorio del ruleset.


## Diseño V1 en revisión · Sierras circulares a batería · 02/10/2026 14:27

Se ha montado en rama de trabajo la URL `/herramientas/sierras-circulares-a-bateria/` partiendo de la plantilla maestra de comparativas y del borrador editorial cerrado, sin fusionar a `main`.

Estado de la rama:

- hero global, breadcrumbs y tarjeta blanca solapada montados
- exactamente tres perfiles de apertura
- tabla comparativa responsive
- seis fichas de producto con datos normalizados, bloques «Lo que destaca», «A tener en cuenta» y «La elegiría si…»
- guía de compra, elección por uso, metodología, enlazado relacionado y FAQ visibles
- canonical, Open Graph, Article, BreadcrumbList y FAQPage preparados
- enlaces Amazon preparados por ASIN con `rel="nofollow sponsored"` y CTA `Ver precio en Amazon`
- enlazado desde/hacia `/herramientas/` y enlaces contextuales a taladros y amoladoras
- sitemap preparado en la rama

### Verificación Amazon previa al montaje

Se mantiene la selección cerrada de seis ASIN: `B0DFWZTHNK`, `B00WW83F4Q`, `B099X7HBQF`, `B0DX71B1JN`, `B0CW192FVD` y `B07GY6LYTT`. La correspondencia ASIN-modelo/variante sigue encontrándose en fuentes comerciales recientes que reflejan catálogo Amazon. La herramienta de consulta disponible no permite abrir directamente las fichas de Amazon.es, por lo que la disponibilidad final en Amazon España debe comprobarse una última vez antes del merge.

### Imágenes

La estructura está preparada, pero no se han copiado imágenes de Amazon ni de fabricantes sin una base clara de reutilización. El hero y las seis fichas utilizan temporalmente una imagen genérica ya existente del proyecto y muestran una nota visible de imagen provisional. Deben sustituirse por imágenes autorizadas del modelo exacto antes de publicar.

### Tracking

No existe todavía en el MASTER un Tracking ID específico para sierras circulares. La rama de revisión usa temporalmente el Store/Tracking ID principal `librosde0a1-21`. Antes de publicar se decidirá si se mantiene o se crea un Tracking ID específico para esta comparativa.

Estado: **DISEÑO MONTADO EN RAMA. NO PUBLICADO. PENDIENTE REVISIÓN VISUAL, IMÁGENES DEFINITIVAS Y VALIDACIÓN AMAZON FINAL.**


### Auditoría responsive de la rama

Auditoría Playwright ejecutada sobre las 23 URLs del sitemap en 4 viewports: 360, 390, 768 y 1440 px. Total: 92 comprobaciones. Resultado: **92/92 sin incidencias automáticas**. Se validaron HTTP, H1, breadcrumbs, overflow, elementos fuera de viewport, imágenes rotas, menú móvil/escritorio y, en comparativas, tarjeta inicial, exactamente 3 perfiles, aviso/scroll de tabla y tarjetas de producto.


### Ajuste de consistencia visual · 03/10/2026

Durante la revisión del preview de sierras circulares se corrigen dos puntos:

- la tarjeta blanca de apertura se reduce a dos párrafos breves; su función es introducir el criterio de comparación, no repetir el contenido editorial que ya aparece después
- los CTA compactos de las tablas comparativas deben usar el mismo texto y componente visual en todo el sitio: `🛒 Ver en Amazon` con las clases compartidas `amazon-mini ccs-table-amazon`
- el CTA principal de las fichas de producto mantiene `Ver precio en Amazon`

La apariencia de los botones de tabla se controla desde el componente CSS compartido; el texto sigue estando presente en el HTML estático y debe respetar exactamente este estándar en páginas nuevas.


### Revalidación Amazon previa al cierre · 03/10/2026

Nueva comprobación de los seis ASIN antes del cierre de la rama:

- Bosch GKS 18V-57-2 GX — `B0DFWZTHNK`: correspondencia exacta confirmada; fuente comercial reciente indica oferta vendida por Amazon Spain, variante con L-BOXX y sin batería/cargador.
- Makita DHS680Z — `B00WW83F4Q`: correspondencia exacta ASIN/modelo confirmada y cuerpo solo sin batería/cargador; el acceso disponible no permite confirmar directamente el estado actual de stock en Amazon.es.
- DeWalt DCS565N-XJ — `B099X7HBQF`: correspondencia exacta ASIN/modelo confirmada, bare unit; el acceso disponible no permite confirmar directamente el estado actual de stock en Amazon.es.
- Einhell TP-CS 18/165 Li BL - Solo — `B0DX71B1JN`: correspondencia exacta ASIN/modelo confirmada, variante Solo sin batería/cargador; presencia comercial reciente confirmada, pero sin acceso directo fiable al stock de Amazon.es.
- Metabo KS 18 LTX 57 BL — referencia `611857840`: oferta actual localizada en Amazon.es para la referencia exacta; la correspondencia con el ASIN de trabajo `B0CW192FVD` se mantiene en la matriz interna, pero debe comprobarse en la ficha de Amazon inmediatamente antes de publicar.
- WORX WX530 — `B07GY6LYTT`: correspondencia exacta confirmada y oferta reciente vendida por Amazon Spain; kit con batería de 2 Ah y cargador.

Conclusión: los seis modelos/variantes siguen siendo válidos como selección. No se declara todavía validación final de disponibilidad Amazon.es para los seis porque Amazon bloquea el acceso directo automatizado a varias fichas. Antes del merge se requiere una comprobación final de las seis URLs en Amazon.es desde navegador o una fuente autorizada de Amazon.

### Bloqueo de imágenes exactas

No se han descargado imágenes de producto desde Amazon ni desde fabricantes porque no hay confirmación de una licencia de reutilización que permita almacenarlas en el repositorio. La Creators API tampoco está disponible todavía por el estado `AssociateNotEligible`.

Para publicar con imágenes exactas hace falta una de estas vías:

1. imágenes proporcionadas/autorizadas por el fabricante o distribuidor con derecho de reutilización;
2. imágenes obtenidas mediante una vía autorizada de Amazon cuando la cuenta sea elegible;
3. mantener ilustraciones propias/IA claramente etiquetadas como ilustrativas y no como representación exacta del modelo.

Hasta resolver esta decisión, las imágenes de las seis fichas siguen siendo provisionales y el PR permanece en Draft.


### Imágenes de producto integradas · 03/10/2026

Sergio aporta y sube a la rama las seis imágenes de producto correspondientes a los modelos seleccionados. Se integran en las seis fichas con nombres normalizados, formato WebP optimizado y alt descriptivo:

- `bosch-gks-18v-57-2-gx.webp`
- `makita-dhs680z.webp`
- `dewalt-dcs565n-xj.webp`
- `einhell-tp-cs-18-165-li-bl.webp`
- `metabo-ks-18-ltx-57-bl.webp`
- `worx-wx530.webp`

Las fichas dejan de mostrar la imagen genérica provisional. El hero permanece por ahora con la imagen genérica de categoría hasta decidir una imagen específica de cabecera.


### Revisión visual aprobada · 03/10/2026

Sergio revisa la preview con las seis imágenes de producto integradas y da por correcta la maquetación actual.

Queda cerrado visualmente:

- hero actual
- tarjeta blanca de apertura reducida
- tres perfiles
- tabla responsive y CTA común `🛒 Ver en Amazon`
- seis fichas con imágenes WebP definitivas aportadas por Sergio
- guía de compra, FAQ, espaciado y footer

El PR #11 permanece sin fusionar únicamente hasta completar la comprobación final de las seis fichas Amazon.es y cerrar el uso del tracking ID.


### Tracking ID de sierras circulares · 03/10/2026

Sergio crea el Tracking ID específico:

`ccc-sierras-21`

Se sustituye el tag principal temporal por `ccc-sierras-21` en todos los enlaces Amazon de la comparativa de sierras circulares, tanto en la tabla como en las fichas de producto.

Estado: tracking específico cerrado.


### Validación final Amazon antes de merge · 03/10/2026

Se intenta abrir directamente en Amazon.es las seis URLs por ASIN, pero el acceso automatizado disponible no permite cargar las fichas de producto de Amazon.es.

Se amplía la comprobación con fuentes recientes que reflejan los ASIN y, cuando está disponible, la oferta de Amazon:

- Bosch `B0DFWZTHNK`: correspondencia exacta GKS 18V-57-2 GX confirmada y fuente reciente indica vendedor Amazon Spain.
- Makita `B00WW83F4Q`: correspondencia exacta DHS680Z confirmada y cuerpo solo; no se ha podido verificar directamente stock actual en Amazon.es.
- DeWalt `B099X7HBQF`: correspondencia exacta DCS565N-XJ confirmada, bare unit; no se ha podido verificar directamente stock actual en Amazon.es.
- Einhell `B0DX71B1JN`: correspondencia exacta TP-CS 18/165 Li BL - Solo confirmada; no se ha podido verificar directamente stock actual en Amazon.es.
- Metabo `B0CW192FVD`: correspondencia del ASIN con KS 18 LTX 57 BL confirmada en fuentes de catálogo Amazon; no se ha podido verificar directamente stock actual en Amazon.es.
- WORX `B07GY6LYTT`: correspondencia exacta WX530 kit con batería de 2 Ah confirmada y fuente reciente indica vendedor Amazon Spain.

Decisión: **NO MERGE todavía**. Para cumplir la norma del proyecto de verificar ficha activa en Amazon.es inmediatamente antes de publicar, falta una comprobación manual en navegador de Makita, DeWalt, Einhell y Metabo. Bosch y WORX cuentan con evidencia reciente de Amazon Spain, pero se recomienda comprobar también sus enlaces en el mismo repaso final.

Checklist manual antes de merge:

1. abrir las seis URLs Amazon.es del PR
2. comprobar que cargan ficha activa
3. confirmar modelo/variante exactos
4. confirmar cuerpo solo/kit según lo documentado
5. confirmar que el enlace incluye `tag=ccc-sierras-21`

Una vez superado este checklist, el PR #11 puede pasar de Draft a Ready y fusionarse por squash si `build` está en success.


### Verificación manual Amazon completada · 03/10/2026

Sergio comprueba manualmente en Amazon.es las seis fichas de producto y aporta capturas de cada una. Las fichas cargan correctamente y corresponden a los modelos previstos:

- Bosch GKS 18V-57-2 GX
- Makita DHS680Z
- DeWalt DCS565N-XJ
- Einhell Professional TP-CS 18/165 Li BL
- Metabo KS 18 LTX 57 BL
- WORX WX530

Las variantes visualizadas coinciden con la selección editorial: Bosch con L-BOXX y sin batería, Makita cuerpo solo, DeWalt sin batería, Einhell Solo/sin batería, Metabo cuerpo solo y WORX kit con batería 2 Ah y cargador.

Con esta comprobación se cierra el requisito de ficha activa Amazon.es previo a publicación. El tracking específico `ccc-sierras-21` ya está aplicado en los 12 CTA.

Estado: página completa, revisión visual aprobada, imágenes integradas, Amazon verificado y tracking cerrado. PR #11 preparado para pasar de Draft a Ready. Pendiente únicamente autorización explícita de merge/publicación.


### Publicación autorizada · 03/10/2026

Sergio autoriza la publicación de la comparativa de sierras circulares a batería.

Estado previo al merge:

- revisión visual aprobada
- seis imágenes definitivas integradas
- seis fichas Amazon.es verificadas manualmente
- tracking `ccc-sierras-21` aplicado
- auditoría responsive superada
- `build` en success
- Cloudflare Pages en success
- PR #11 Ready for review y mergeable

Se autoriza merge por `squash` a `main`.


### Publicación completada · 03/10/2026

La comparativa `/herramientas/sierras-circulares-a-bateria/` se publica en producción mediante el PR #11, fusionado por `squash` a `main`.

Commit de publicación: `696b5222e7a1efdae8cf6291a2df36be6ca5d038`.

Cloudflare Pages completa correctamente el despliegue de producción. La página queda publicada con:

- seis modelos y variantes validados
- seis imágenes WebP definitivas
- tracking `ccc-sierras-21`
- 12 CTA Amazon
- tabla comparativa responsive
- tres perfiles de uso
- FAQ visible y schema coherente
- enlazado interno desde/hacia Herramientas
- sitemap actualizado
- revisión visual aprobada
- auditoría responsive superada

Estado: **PUBLICADO EN PRODUCCIÓN**.


### Corrección global de navegación · Sierras circulares · 03/10/2026

Tras publicar la comparativa de sierras circulares se detecta que el menú global de Herramientas no se había actualizado en todas las páginas.

Corrección aplicada en las 24 páginas HTML publicadas del sitio:

- Gatos hidráulicos
- Taladros a batería
- Llaves de impacto
- Amoladoras a batería
- Sierras circulares a batería

El submenú de Herramientas queda normalizado con URLs absolutas desde raíz, por lo que la misma estructura funciona en escritorio y móvil desde cualquier nivel de profundidad.

Regla de mantenimiento reforzada: cuando una página nueva deba formar parte de la navegación global, el cambio debe aplicarse a todas las páginas publicadas en el mismo PR, no solo a la nueva URL o al hub de categoría.


### Imágenes y enlazado desde Inicio · Sierras circulares · 03/10/2026

Se sustituyen las imágenes genéricas de la comparativa de sierras circulares por dos imágenes propias generadas para el proyecto:

- hero: `/images/sierras-circulares/hero-sierras-circulares-a-bateria.webp`
- tarjeta de categoría: `/images/sierras-circulares/categoria-sierras-circulares-a-bateria.webp`

La imagen de categoría se aplica en `/herramientas/` y también se añade una tarjeta de acceso directo a la comparativa en la sección de contenidos destacados de Inicio.

Decisión de arquitectura: Inicio debe enlazar de forma directa a contenidos estratégicos y recientes que queramos reforzar, pero no convertirse en un listado exhaustivo de todas las URLs. Las páginas secundarias deben recibir autoridad principalmente desde su hub de categoría, breadcrumbs y enlaces contextuales. Las comparativas comerciales importantes, como sierras circulares, sí pueden aparecer en Inicio.


## Flujo estándar de imágenes y validación Amazon para páginas nuevas · 03/10/2026

A partir de la experiencia de publicación de la comparativa de sierras circulares, se fija este flujo para evitar que una página nueva llegue a producción con imágenes genéricas, menús incompletos o validaciones pendientes.

### Hero de páginas nuevas

Antes de publicar una comparativa o guía nueva debe existir un hero específico para esa URL.

Flujo:

1. ChatGPT genera una imagen propia con IA adaptada al tema de la página.
2. La imagen debe ser ilustrativa y genérica, sin copiar un modelo exacto ni mostrar marcas o logotipos.
3. ChatGPT entrega la imagen ya preparada con el nombre de archivo definitivo recomendado.
4. ChatGPT indica la ruta exacta del repositorio donde debe subirse.
5. Sergio sube el archivo a la rama de trabajo.
6. ChatGPT conecta la imagen al hero, Open Graph si corresponde y comprueba que no queda la imagen genérica anterior.

Formato preferido:

- WebP cuando sea posible
- tamaño y compresión adecuados para Core Web Vitals
- nombre descriptivo y permanente
- alt coherente con el contenido
- sin texto incrustado salvo necesidad real

Ejemplo de nomenclatura:

`/images/<tema>/hero-<keyword-principal>.webp`

### Imagen de tarjeta para hubs e Inicio

Cuando una página vaya a aparecer en un hub de categoría o en Inicio debe tener también una imagen adecuada para tarjeta.

Flujo:

1. ChatGPT genera o prepara una imagen específica para tarjeta.
2. La entrega con nombre final y ruta exacta.
3. Sergio la sube a la rama.
4. ChatGPT sustituye cualquier imagen genérica en el hub.
5. Si la página es estratégica o comercialmente importante, se valora también su inclusión en Inicio.

No se debe publicar una tarjeta nueva usando por defecto la imagen genérica de la categoría si la página ya dispone de una imagen propia.

### Imágenes de producto

Las imágenes de los modelos exactos no se generarán con IA.

Flujo acordado:

1. Sergio realiza siempre la revisión manual de cada ASIN en Amazon.es antes de publicar.
2. Durante esa misma revisión comprueba:
   - ficha activa
   - modelo exacto
   - variante exacta
   - cuerpo solo o kit
   - batería/cargador incluidos o no
   - ASIN correcto
3. En esa visita Sergio obtiene las imágenes de los productos que quiere utilizar y las facilita a ChatGPT.
4. ChatGPT:
   - comprueba que cada imagen corresponde al modelo correcto
   - recorta y normaliza proporciones
   - elimina fondo cuando convenga
   - convierte a WebP
   - optimiza peso
   - asigna nombre de archivo definitivo
   - indica la ruta exacta de subida
5. Sergio sube las imágenes a la rama.
6. ChatGPT conecta cada imagen a su producto y revisa los alt.

Nunca presentar una imagen generada por IA como representación exacta de un producto concreto.

### Checklist Amazon obligatorio antes de publicar

La revisión manual de Amazon.es forma parte del cierre de cada comparativa.

Para cada producto principal:

- ficha activa
- ASIN correcto
- modelo y variante exactos
- cuerpo solo o kit
- batería y cargador incluidos o no
- coherencia con el texto editorial
- tracking ID correcto
- CTA correcto
- imagen exacta aportada por Sergio

No se fusiona a `main` hasta que Sergio confirme esta revisión manual.

### Navegación e interlinking al publicar una URL nueva

Cuando una URL nueva se publique:

1. actualizar el hub de categoría
2. actualizar el menú global si la página debe formar parte de la navegación
3. aplicar el cambio de menú a todas las páginas publicadas, escritorio y móvil
4. añadir breadcrumbs
5. añadir enlaces contextuales desde páginas relacionadas
6. actualizar sitemap
7. valorar enlace desde Inicio

Regla para Inicio:

- no debe convertirse en un listado de todas las URLs
- sí debe enlazar comparativas comerciales importantes, contenidos estratégicos y páginas nuevas que queramos reforzar
- el hub de categoría sigue siendo el principal distribuidor de autoridad hacia sus páginas
- breadcrumbs y enlaces contextuales completan el reparto de autoridad interna

### Regla de cierre

Antes de publicar una página nueva deben estar cerrados, como mínimo:

- contenido
- SEO
- hero específico
- imagen de tarjeta si aparece en hub/Inicio
- imágenes exactas de producto
- ASIN verificados manualmente
- tracking
- CTA
- menú
- breadcrumbs
- enlazado interno
- sitemap
- schema
- revisión responsive
- build
- preview visual aprobada

Este flujo pasa a ser estándar para futuras páginas de Compra con Sentido.


### Regla editorial de arranque en fichas de producto · 03/10/2026

Durante la revisión visual de sierras circulares se detectó un error de maquetación/editorial: el primer párrafo de las fichas empezaba con dos puntos (`:`) por haber quedado un separador huérfano al trasladar el contenido.

Corrección aplicada:

- se eliminan los dos puntos iniciales en las seis fichas de sierras
- se convierten esas entradas en frases breves y naturales, con inicio en mayúscula y cierre correcto
- se revisan las comparativas principales existentes y no se detecta el mismo problema en amoladoras, llaves de impacto, taladros, gatos hidráulicos, robots aspiradores, deshumidificadores ni impresoras 3D

Regla para futuras comparativas:

- ningún párrafo visible debe comenzar con signos huérfanos como `:`, `-`, `·` o separadores equivalentes
- los primeros párrafos de las fichas deben empezar como una frase completa y natural
- antes de publicar, revisar específicamente el primer bloque de texto de cada ficha además del HTML y el responsive


---

## Refuerzo de QA automático y cierre de auditoría técnica 03.3 · 03/10/2026

Se completa la auditoría técnica posterior a la publicación de sierras circulares y se corrigen los fallos detectados. El objetivo de este bloque no es solo dejar el estado actual limpio, sino impedir que los mismos errores vuelvan a llegar a `main`.

### Correcciones aplicadas

- Las dos imágenes nuevas de sierras circulares dejan de estar en PNG pesado:
  - `categoria-sierras-circulares-a-bateria.png` (~2,15 MB) → `categoria-sierras-circulares-a-bateria.webp` (**150.884 bytes**)
  - `hero-sierras-circulares-a-bateria.png` (~2,34 MB) → `hero-sierras-circulares-a-bateria.webp` (**164.338 bytes**)
- El optimizador también detecta y corrige una imagen antigua de robots:
  - `preview-pack-01.jpg` (~501 KB) → `preview-pack-01.webp` (**245.834 bytes**)
- Todas las referencias HTML/OG afectadas se reescriben automáticamente al nuevo archivo WebP.
- `sitemap.xml` actualiza `lastmod` a `2026-10-03` en Inicio, `/herramientas/` y sierras circulares.
- Se actualiza `.github/amazon-tracking-ids.json`:
  - `llaves-impacto` → `ccc-llaveimpac-21`
  - `amoladoras-a-bateria` → `ccc-amoladoras-21`
  - `sierras-circulares-a-bateria` → `ccc-sierras-21`
  - se registra también el tracking principal `librosde0a1-21`
- Se completa Twitter Card en sierras circulares y se corrigen metadatos Twitter incompletos detectados en amoladoras y llaves de impacto.
- Se mejora la semántica accesible de todas las tablas detectadas:
  - `<caption>` accesible
  - `scope="col"` en encabezados de columna
  - `scope="row"` cuando corresponde
- La auditoría adicional detecta una tabla fuera de las ocho comparativas principales en `/impresion-3d/filamentos-3d/`; queda corregida igualmente.
- Se normaliza el menú de llaves de impacto, que todavía difería del patrón global en la sección de Impresión 3D.
- En `/herramientas/` la tarjeta destacada de sierras utiliza su imagen específica y no la imagen genérica de categoría.

### Responsive audit: nueva regla

`.github/scripts/responsive-audit.mjs` deja de mantener una lista manual de URLs.

A partir de ahora:

`sitemap.xml → URLs públicas → responsive audit`

Cualquier URL añadida al sitemap entra automáticamente en la auditoría responsive. Las páginas de comparativa se identifican por la clase real del HTML, sin mantener una segunda lista manual.

Esto elimina el fallo que permitió que sierras circulares estuviera publicada pero ausente del auditor permanente.

### Nuevo control obligatorio de calidad en cada PR

Se crea:

`.github/scripts/site-audit.py`

y el check obligatorio `build` ejecuta esta auditoría antes de permitir el merge.

Comprueba automáticamente, para todas las páginas públicas:

1. correspondencia completa entre `sitemap.xml` y los `index.html` publicados;
2. `lastmod` válido y nunca futuro;
3. exactamente un H1;
4. `title`;
5. meta description;
6. canonical exacta para la URL;
7. Open Graph;
8. Twitter Card;
9. breadcrumbs en todas las páginas salvo Inicio;
10. cierre HTML correcto y ausencia de contenido después de `</html>`;
11. enlaces Amazon con `rel="nofollow sponsored"`;
12. Tracking IDs Amazon registrados en el fichero central;
13. párrafos que empiecen por separadores huérfanos como `:`, `-` o `·`;
14. tablas con `caption` y `scope`;
15. consistencia del menú global, normalizando previamente rutas relativas y absolutas;
16. imágenes raster superiores al límite de QA.

Límite actual de QA para imágenes raster:

**350.000 bytes**

Si cualquiera de estas comprobaciones falla, el check `build` falla y el PR no debe fusionarse.

### Optimización automática de imágenes

El workflow `.github/workflows/optimize-webp.yml` deja de vigilar únicamente archivos WebP.

Nuevo comportamiento:

- se ejecuta también en pull requests internos;
- detecta PNG/JPG/JPEG pesados;
- convierte automáticamente a WebP;
- limita el lado máximo a 1600 px;
- utiliza calidad WebP 82;
- reescribe las referencias textuales al nuevo archivo;
- elimina el raster pesado original;
- sigue recomprimiendo WebP pesados cuando reduce realmente su tamaño;
- guarda el resultado en la propia rama del PR antes del merge.

Umbral actual para optimización automática:

**300.000 bytes**

El QA permite hasta 350.000 bytes para dejar un pequeño margen entre optimización y bloqueo.

### Regla de publicación reforzada

Antes de fusionar cualquier página nueva o cambio estructural:

- `build` debe estar en success;
- cualquier URL nueva debe estar en `sitemap.xml`;
- no se debe mantener una segunda lista manual de URLs para responsive;
- una imagen raster pesada debe quedar convertida/optimizada antes del merge;
- un nuevo Tracking ID debe registrarse en `.github/amazon-tracking-ids.json`;
- las tablas nuevas deben incluir `caption` y `scope`;
- los metadatos OG/Twitter deben quedar completos;
- el menú global debe mantener la misma estructura normalizada en todas las páginas.

`lastmod` sigue requiriendo criterio editorial: se actualizará cuando cambie contenido sustancial de una URL. No se fuerza automáticamente por cualquier cambio técnico o de navegación global para evitar fechas artificiales.

Estado de validación en la rama del PR #16:

- nueva auditoría `build`: **SUCCESS**
- imágenes pesadas detectadas y convertidas automáticamente
- errores adicionales encontrados por el propio QA: corregidos
- pendiente únicamente el cierre final del PR y despliegue a producción.


---

## Favicon y validación estructural de HTML · 03/10/2026 16:30

Durante la revisión manual posterior al cierre 03.3 se detecta que la comparativa de sierras circulares a batería no incluía la declaración de favicon en el `<head>`.

### Corrección aplicada

Se añade en:

`/herramientas/sierras-circulares-a-bateria/`

la declaración estándar:

`<link rel="icon" type="image/svg+xml" href="/favicon.svg">`

junto al `theme-color` común del sitio.

La revisión de todas las páginas públicas confirma que sierras circulares era la única URL publicada sin favicon declarado.

### Regla obligatoria para páginas nuevas

Toda página pública debe incluir en el `<head>`, como mínimo:

- `<meta name="theme-color" content="#063d26">`
- `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`

Las plantillas internas de página comparativa e informacional quedan actualizadas con este estándar.

### QA automático reforzado

`.github/scripts/site-audit.py` pasa a comprobar en cada PR:

- que todas las páginas públicas declaren favicon;
- que el recurso local del favicon exista realmente en el repositorio;
- que las estructuras `<table>`, `<thead>` y `<tbody>` tengan el mismo número de aperturas y cierres.

Si alguna de estas comprobaciones falla, el check `build` debe fallar y el PR no debe fusionarse.

### Regresión detectada durante esta revisión

Al revisar el HTML de sierras se detecta una regresión introducida en la corrección de accesibilidad de tablas del bloque 03.3: un reemplazo demasiado amplio convirtió `<thead>` en una etiqueta mal formada en varias páginas.

Patrón incorrecto detectado:

`<th scope="col"ead>`

Se revisan todas las páginas públicas y se corrige la estructura en las 9 URLs afectadas:

- amoladoras a batería;
- comparativa de gatos hidráulicos;
- llaves de impacto;
- sierras circulares;
- comparativa de taladros;
- robots aspiradores;
- comparativa de deshumidificadores;
- filamentos 3D;
- comparativa de impresoras 3D.

Regla adicional:

- no realizar reemplazos automáticos sobre `<th` que puedan coincidir también con `<thead>`;
- después de cualquier transformación masiva de tablas, el QA estructural debe validar aperturas y cierres antes del merge.

Esta revisión se considera parte del cierre técnico de 03.3 y refuerza el principio de que una corrección transversal debe quedar protegida por una comprobación automática equivalente.


---

## Oportunidad SEO/comercial: mejores filamentos PLA · 04/10/2026 08:39

Amazon.es ha confirmado que la elegibilidad de Creators API exige al menos 10 compras adscritas correspondientes a 10 pedidos separados dentro de una ventana móvil de 30 días. El estado confirmado era 13 productos agrupados en 8 pedidos válidos. Este objetivo refuerza el interés por productos baratos, fáciles de comprar y de recompra, pero no sustituye el criterio SEO/editorial.

### Decisión SEO

Se valida como oportunidad real la futura URL:

`/impresion-3d/filamentos-3d/mejores-filamentos-pla/`

Estado:

**OPORTUNIDAD SEO VALIDADA. No crear ni publicar todavía. Investigación de producto inicial cerrada; contenido y diseño pendientes.**

Keyword principal:

`mejores filamentos PLA`

Keywords secundarias naturales:

- `mejor filamento PLA calidad precio`
- `mejores marcas de filamento PLA`
- `qué filamento PLA comprar`
- `filamento PLA barato`
- `PLA+`
- `PLA alta velocidad`
- `filamento PLA 1.75`

No usar volúmenes de búsqueda inventados. La decisión se basa en SERP real, intención, competencia cualitativa, encaje de cluster y potencial comercial.

### Intención y dificultad

Intención principal:

**Comercial / investigación previa a compra.**

Intenciones secundarias:

- relación calidad/precio;
- marcas fiables;
- PLA estándar frente a PLA+;
- alta velocidad;
- formatos baratos o con más cantidad;
- acabado mate/estético;
- facilidad de impresión;
- uso práctico con sistemas de alimentación tipo AMS.

La SERP española mezcla comparativas editoriales, blogs nicho de impresión 3D, rankings afiliados genéricos, categorías de retailers, comparadores de precio y guías informacionales.

Competidores relevantes observados:

- All3DP;
- ImprimeFácil3D;
- 3Dimpresoras.com;
- ElGofio3D;
- Zelpio;
- retailers como PcComponentes, Leroy Merlin e Idealo.

Dificultad cualitativa:

**MEDIA.**

Hay un competidor editorial fuerte como All3DP y dominios grandes de retail, pero también posicionan webs nicho y rankings genéricos. Existe hueco para una comparativa española más concreta y útil.

### Oportunidades editoriales

La página no será un ranking genérico de “los 10 mejores”.

Diferenciación prevista:

- recomendaciones según escenario;
- referencias concretas, no solo marcas;
- distinguir PLA estándar, PLA+ y alta velocidad;
- explicar cuándo compensa pagar más y cuándo no;
- separar acabado estético de resistencia o velocidad;
- comparar cantidad real por bobina y formatos económicos;
- tratar AMS con prudencia, verificando material y dimensiones de bobina;
- explicar adaptadores/anillos cuando el fabricante los contemple;
- no mostrar precios fijos;
- CTA habitual `Ver precio en Amazon`.

### Canibalización

Riesgo actual:

**BAJO**, manteniendo intenciones separadas.

`/impresion-3d/filamentos-3d/` responde a **qué material elegir** entre PLA, PETG, ASA y TPU.

`/impresion-3d/filamentos-3d/mejores-filamentos-pla/` responderá a **qué PLA concreto comprar** una vez decidido el material.

Regla:

- la guía actual no debe convertirse en una comparativa de marcas PLA;
- la nueva página no debe intentar posicionar principalmente por PLA vs PETG/ASA/TPU;
- ambas páginas deben enlazarse contextualmente.

### Shortlist inicial de productos candidatos

Antes de publicar se volverá a verificar ficha activa, color/variante, contenido exacto y ASIN.

- **JAYO PLA 1.75 mm 1,1 kg negro** — ASIN `B0BHQR69RW`
  - perfil: imprimir mucho gastando poco / más cantidad por bobina.

- **ELEGOO PLA 1.75 mm 1 kg negro** — ASIN `B0CD7BTN37`
  - perfil: PLA estándar sencillo y fácil de comprar.
  - ELEGOO publica además un anillo para facilitar el uso de su bobina de cartón en AMS.

- **SUNLU PLA+ 2.0 1.75 mm 1 kg negro** — ASIN `B0DHCT8YDN`
  - perfil: equilibrio calidad/precio / PLA+.

- **eSUN PLA+ 1.75 mm 1 kg negro** — ASIN `B07FQDKR28`
  - perfil: PLA+ generalista con mayor tenacidad que un PLA básico.

- **Creality Hyper PLA RFID 1.75 mm 1 kg gris** — ASIN `B0DMVS9D3R`
  - perfil: alta velocidad.
  - no confundir esta referencia con Hyper PLA sin RFID.

- **Polymaker PolyTerra PLA 1.75 mm 1 kg Charcoal Black** — ASIN `B08QMBPZBF`
  - perfil: acabado mate.
  - Polymaker ha renombrado PolyTerra PLA como Panchroma Matte; Amazon puede mantener la denominación histórica PolyTerra.

La shortlist todavía no constituye un ranking ni una selección editorial inmutable. La siguiente fase debe normalizar criterios y comprobar que los seis aportan diferencias suficientes.

### Criterios técnicos a normalizar antes de redactar

- tipo: PLA / PLA+ / high-speed / matte;
- diámetro nominal y tolerancia declarada;
- peso neto;
- temperatura de boquilla;
- temperatura de cama;
- velocidad recomendada o máxima solo cuando el fabricante la publique claramente;
- material y dimensiones de bobina cuando afecten a AMS o alimentadores;
- formato: bobina, refill o pack;
- requisitos de secado/almacenamiento si se especifican.

No comparar propiedades mecánicas de fabricantes distintos si los métodos de ensayo no son equivalentes.

### Enlazado interno previsto

Desde `/impresion-3d/filamentos-3d/`:

Añadir en el bloque de PLA un enlace contextual hacia la comparativa para quien ya haya decidido utilizar PLA.

Desde `/impresion-3d/`:

Incorporar la nueva comparativa como contenido comercial específico del cluster de filamentos.

Desde la nueva comparativa:

- volver a `/impresion-3d/filamentos-3d/` para quien todavía dude entre materiales;
- enlazar a impresoras 3D cuando se trate compatibilidad o velocidad;
- enlazar a accesorios solo cuando almacenamiento, secado o alimentación lo justifiquen.

No crear por ahora páginas equivalentes de PETG, TPU o ASA. Investigar cada material por separado y crear URL solo si su SERP, demanda e intención justifican una página propia.

### Siguiente fase

1. cerrar matriz técnica de los seis candidatos con documentación oficial;
2. revisar experiencias reales y patrones recurrentes por referencia exacta;
3. decidir si los seis aportan perfiles suficientemente distintos;
4. cerrar title, meta description, H1, estructura H2/H3, FAQ y bloques de decisión;
5. revalidar Amazon.es/ASIN justo antes de preparar enlaces afiliados.

**No se crea ni publica todavía la URL.**


---

## Investigación SEO · Mejores filamentos PLA · 04/10/2026 09:22

### Decisión

**OPORTUNIDAD SEO/COMERCIAL APROBADA PARA PREPARAR. NO CREADA NI PUBLICADA.**

URL propuesta:

`/impresion-3d/filamentos-3d/mejores-filamentos-pla/`

La intención principal es **comercial / investigación previa a compra**: el usuario ya ha decidido imprimir con PLA y quiere saber qué producto o marca concreta comprar.

La SERP española actual confirma intención independiente respecto a la guía existente `/impresion-3d/filamentos-3d/`, que seguirá siendo informacional y centrada en elegir entre PLA, PETG, ASA o TPU.

Keyword principal:

`mejores filamentos PLA`

Keywords secundarias a trabajar dentro de la misma URL:

- `mejor filamento PLA`
- `mejor filamento PLA calidad precio`
- `mejores marcas de filamento PLA`
- `qué filamento PLA comprar`
- `filamento PLA barato`
- `filamento PLA 1.75 mm`
- `PLA+` / `filamento PLA Plus`
- `filamento PLA alta velocidad`
- `filamento PLA para Bambu Lab` / `AMS`
- `pack filamento PLA`

No crear por ahora URLs separadas para `PLA barato`, `PLA+`, `alta velocidad`, `AMS` o packs. Deben resolverse como perfiles/subtemas de la comparativa principal y solo separarse en el futuro si SERP y datos reales justifican una intención propia.

### SERP y competencia

La SERP mezcla comparativas editoriales, medios especializados fuertes como All3DP, webs nicho de impresión 3D, rankings afiliados genéricos, categorías de tiendas especializadas y páginas de fabricantes.

Dificultad cualitativa:

**MEDIA.**

Existe competencia con autoridad, pero también resultados genéricos, rankings de marcas y páginas comerciales que dejan espacio a una comparación más útil basada en variantes concretas, perfiles de uso y disponibilidad real en Amazon España.

### Oportunidad editorial

No hacer un ranking genérico de “los 10 mejores”.

Organizar recomendaciones por necesidad:

- imprimir mucho gastando poco
- PLA estándar sencillo para uso diario
- PLA+ con mayor tenacidad
- alta velocidad
- buen acabado/mate
- compatibilidad y uso práctico con sistemas multimaterial como AMS
- packs o formatos económicos

Diferenciadores:

- comparar referencias concretas, no solo marcas
- verificar variante exacta y ASIN
- separar PLA estándar, PLA+ y PLA de alta velocidad sin asumir que las denominaciones son equivalentes entre marcas
- explicar bobina, peso neto, formato y posibles implicaciones para AMS
- usar parámetros oficiales del fabricante sin comparar cifras de velocidad máxima como si fueran una prueba común
- explicar cuándo no compensa pagar más
- no usar precios fijos en la página publicada

### Canibalización

Riesgo actual:

**BAJO.**

Propiedad de intención:

- `/impresion-3d/filamentos-3d/` → cómo elegir material: PLA vs PETG vs ASA vs TPU
- nueva comparativa → qué filamento PLA concreto comprar

La página actual no trabaja marcas concretas, PLA+, alta velocidad ni recomendaciones de producto, por lo que ambas URLs pueden convivir con una separación clara.

### Candidatos de producto preseleccionados

Se priorizan cinco perfiles distintos. La comprobación de Amazon España se ha realizado con evidencia reciente de marketplace/trackers; antes de publicar deben revalidarse directamente la ficha activa, el color/pack exactos y la afiliación.

1. **ELEGOO PLA negro 1 kg**
   - perfil: PLA estándar económico y sencillo para uso diario
   - ASIN: `B0CD7BTN37`
   - 1,75 mm, 1 kg

2. **eSUN PLA+ blanco 1 kg**
   - perfil: PLA+ equilibrado / mayor tenacidad
   - ASIN: `B07FQ98RNP`
   - 1,75 mm, 1 kg

3. **SUNLU PLA+ 2.0 Fast negro 1 kg**
   - perfil: alta velocidad / PLA+ económico
   - ASIN: `B0FDGKJ1BJ`
   - 1,75 mm, 1 kg

4. **Polymaker PolyTerra PLA / actual Panchroma Matte, Charcoal Black 1 kg**
   - perfil: acabado mate / piezas visuales
   - ASIN de la variante PolyTerra observada en Amazon España: `B08QMBPZBF`
   - Polymaker ha renombrado PolyTerra PLA como Panchroma Matte; revisar disponibilidad y nomenclatura exacta de Amazon antes de cerrar selección definitiva

5. **OVERTURE PLA Plus negro, pack 2 x 1 kg**
   - perfil: pack económico / imprimir mucho
   - ASIN: `B0CQ1SP6YD`
   - 1,75 mm, 2 x 1 kg

Reserva:

- **Creality Hyper PLA RFID 1 kg negro** — ASIN `B0DJXMLW6P`
- considerar solo si aporta una sexta razón de compra clara o si falla disponibilidad de uno de los cinco principales

No forzar seis productos si cinco cubren mejor los perfiles sin duplicar argumentos.

### Enlazado interno previsto

- `/impresion-3d/filamentos-3d/` → nueva comparativa desde el bloque de PLA con anchor comercial descriptivo
- nueva comparativa → `/impresion-3d/filamentos-3d/` para quien aún no sepa qué material necesita
- `/impresion-3d/` → nueva comparativa como contenido comercial del cluster
- enlazado contextual con `/impresion-3d/impresoras-3d/` y/o su comparativa cuando aporte valor
- valorar enlace contextual a `/impresion-3d/accesorios-3d/` para almacenamiento, secado o accesorios de bobina
- no añadir enlaces a futuras comparativas PETG, TPU o ASA hasta que esas URLs existan y hayan superado su propia investigación SEO

### Search Console

No se han utilizado volúmenes inventados.

GSC Wizard no está disponible actualmente porque el conector devuelve que la suscripción ha terminado o no está activa. La decisión se basa en SERP real, arquitectura, intención y competencia; deberá contrastarse con Search Console cuando vuelva a estar disponible.

### Estado siguiente

**Siguiente paso recomendado: cerrar los cinco productos definitivos con revalidación final de Amazon.es/ASIN y construir la matriz técnica/editorial comparable antes de redactar. La URL no se ha creado ni publicado.**


---

## Criterios cerrados · tabla y valoración de filamentos PLA · 04/10/2026

Se cierran los criterios de presentación y valoración para la futura comparativa `/impresion-3d/filamentos-3d/mejores-filamentos-pla/`.

### Tabla comparativa principal

La tabla pública debe ser compacta y comparable. Criterios acordados:

- todos los productos se comparan en formato de una bobina individual, no packs;
- si una referencia ofrece packs, se podrán mencionar dentro de su ficha, pero no mezclar tamaños de pack en la tabla principal;
- todos los filamentos comparados son de 1,75 mm; el diámetro nominal se explicará una vez fuera de la tabla;
- se mantiene una columna de tolerancia de diámetro:
  - usar solo el dato del fabricante o documentación técnica fiable de la gama/referencia;
  - si no existe un dato fiable, indicar `No declarada`;
  - no rellenar huecos con cifras dudosas de marketplaces;
- mantener temperatura de boquilla y velocidad declarada por fabricante cuando sean comparables;
- no incluir temperatura de cama en la tabla principal si perjudica legibilidad; puede quedar en la ficha;
- incluir una columna AMS con un único símbolo;
- incluir una columna de calidad-precio;
- incluir una columna breve `Mejor para`.

### Regla AMS

La tabla utilizará únicamente:

- ✅ compatible directamente: bobina y dimensiones adecuadas para uso directo;
- ⚠️ compatible con precauciones: entra físicamente, pero material de bobina, bordes o diseño hacen recomendable adaptador/anillo u otra precaución;
- ❌ no compatible directamente: dimensiones/formato incompatibles o problema documentado que impide uso directo.

El símbolo debe corresponder a la bobina exacta de la referencia, no a una generalización por marca.

Las explicaciones sobre cartón, adaptadores, dimensiones u otras precauciones irán dentro de cada ficha, no en la tabla.

### Precio y formato comparable

Para el análisis interno:

- registrar el precio observado de una sola bobina en la misma fecha para todos los candidatos;
- calcular €/kg usando el peso neto real;
- JAYO 1,1 kg se normaliza por €/kg igual que una bobina de 1 kg;
- packs de 2, 4 o más unidades pueden analizarse como alternativa dentro de la ficha, pero no se utilizan como referencia principal de la tabla.

No mostrar precios fijos en la página publicada mientras no exista un sistema fiable de actualización.

### Puntuación de calidad-precio

Se utilizará una nota final de 0 a 10 calculada con cinco componentes:

- calidad y acabado de impresión: 20 %;
- consistencia y fiabilidad: 20 %;
- facilidad de impresión: 10 %;
- prestaciones para su uso objetivo: 15 %;
- precio por kg observado: 35 %.

Fórmula:

`calidad-precio = calidad × 0,20 + fiabilidad × 0,20 + facilidad × 0,10 + prestaciones × 0,15 + precio × 0,35`

La nota de precio se normalizará respecto al €/kg más bajo observado entre los productos comparados en la misma fecha:

`nota precio = (€/kg más barato ÷ €/kg del producto) × 10`

Conservar internamente las cinco notas individuales para mantener trazabilidad.

La categoría `prestaciones` se evalúa respecto al propósito del producto, no comparando funciones distintas entre sí. Un PLA mate puede obtener una puntuación alta si cumple bien su objetivo estético aunque no sea un filamento high-speed.

### Visualización en cada ficha

Cada ficha de producto mostrará una sección compacta `Nuestra valoración` con cinco barras horizontales:

- Calidad;
- Fiabilidad;
- Facilidad;
- Prestaciones;
- Precio.

Debajo se mostrará la nota final de `Calidad-precio: X,X/10`.

Implementación prevista:

- HTML + CSS;
- sin librerías gráficas;
- sin JavaScript necesario;
- ligera y responsive;
- barras horizontales, no estrellas ni gráfico radar.

La metodología se explicará una sola vez en la página. Las estrellas se descartan para evitar que parezca una valoración agregada de usuarios o de Amazon.

### Estado siguiente

La siguiente fase es preparar fichas de investigación completas para los seis candidatos actuales, cruzando:

1. fabricante y TDS/manuales;
2. referencia exacta y formato de bobina;
3. dimensiones y material de bobina / AMS;
4. pruebas independientes con metodología visible;
5. patrones positivos y negativos de usuarios;
6. incidencias recurrentes;
7. diferencias reales respecto a los otros candidatos;
8. precio de una bobina y €/kg observado en la misma fecha;
9. argumentos que sí se pueden publicar y afirmaciones que deben evitarse.

No crear ni publicar todavía la URL.


---

## Shortlist definitiva de investigación · mejores filamentos PLA · 04/10/2026

Se descarta definitivamente Polymaker/Panchroma Matte de esta comparativa. También queda fuera Creality Rainbow/efectos especiales, que se reservará para una futura comparativa específica de filamentos especiales.

La investigación principal continúa con seis referencias:

1. ELEGOO PLA
2. eSUN PLA+
3. SUNLU High Speed PLA+ 2.0
4. OVERTURE PLA Professional / PLA+
5. JAYO PLA 1,1 kg
6. Winkle PLA HD

### Criterio de trabajo

Para cada producto se debe cerrar:

- referencia y ASIN exactos;
- color/variante;
- peso neto;
- tolerancia de diámetro;
- temperatura de boquilla;
- velocidad de impresión declarada;
- material y dimensiones de bobina;
- compatibilidad AMS mediante símbolo ✅ / ⚠️ / ❌;
- documentación oficial y TDS;
- pruebas/reseñas independientes;
- patrones positivos y negativos de usuarios;
- precio de una bobina individual y €/kg observado en la misma fecha;
- cinco notas internas: calidad, fiabilidad, facilidad, prestaciones y precio;
- nota final de calidad-precio según la fórmula ya aprobada.

### Alertas detectadas

- JAYO: la imagen aportada por Sergio muestra explícitamente `PLA Matte Filament`. Antes de cerrar el producto hay que verificar si el ASIN seleccionado corresponde a PLA normal o PLA Matte. No mezclar documentación de ambas variantes.
- ELEGOO: la imagen aportada muestra bobina de cartón y marcado RFID. Confirmar que coincide con la referencia/ASIN exactos que se utilizarán.
- eSUN: la marca ha utilizado bobinas de cartón y plástico según periodo/lote. El símbolo AMS debe asignarse a la referencia real que llegue actualmente, no por historial de marca.
- OVERTURE B09PDCLSLY: queda como referencia principal a verificar para PLA Professional / PLA+ negro de 1 kg.
- Winkle B08LQJ8W1F: candidato fuerte; la referencia visual aportada usa bobina plástica y corresponde a PLA HD negro azabache fabricado en España.
- SUNLU: mantener únicamente la variante exacta High Speed PLA+ 2.0 si el argumento editorial principal es alta velocidad.

No crear ni publicar todavía la URL.


---

## Matriz de investigación v1 · seis filamentos PLA · 04/10/2026

Se completa una primera matriz normalizada para los seis candidatos definitivos de la futura comparativa de mejores filamentos PLA.

### Referencias

- ELEGOO PLA — ASIN `B0CD7BTN37`
- eSUN PLA+ — ASIN `B07FQ98RNP`
- SUNLU High Speed PLA+ 2.0 — ASIN `B0FDGKJ1BJ`
- OVERTURE PLA Professional / PLA+ — ASIN `B09PDCLSLY`
- JAYO PLA — ASIN `B0BHQR69RW`
- Winkle PLA HD — ASIN `B08LQJ8W1F`

### Datos técnicos normalizados

| Producto | Peso | Tolerancia | Boquilla | Velocidad fabricante | Bobina / AMS | Papel editorial |
|---|---:|---:|---:|---:|---|---|
| ELEGOO PLA | 1 kg | ±0,02 mm | rango oficial pendiente de fijar por referencia exacta | documentación comercial actual orientada a PLA estándar | cartón; ⚠️ por recomendación de adaptador en AMS | PLA económico y sencillo |
| eSUN PLA+ | 1 kg | ±0,03 mm | rango oficial de la gama PLA+ | fabricante lo presenta como apto para alta velocidad | cartón actual; ⚠️; eSUN ofrece adaptador oficial para AMS | PLA+ generalista |
| SUNLU High Speed PLA+ 2.0 | 1 kg | ±0,02 mm | 200-260 °C según velocidad | 50-600 mm/s | bobina plástica; validar diámetro exacto frente a rango AMS | alta velocidad |
| OVERTURE PLA Professional | 1 kg | ±0,02 mm | 190-220 °C | 40-70 mm/s | cartón; ⚠️ | PLA+/Pro para piezas funcionales |
| JAYO PLA | 1,1 kg | ±0,02 mm | 200-210/230 °C según página oficial | 40-80 mm/s | versión reutilizable/plástica disponible; validar ASIN exacto | cantidad por bobina / coste |
| Winkle PLA HD | 1 kg | no se ha localizado tolerancia ± oficial en TDS | 190-230 °C | 50-90 mm/s; 14 mm³/s máx. | bobina plástica; fabricante declara compatibilidad AMS | fabricación española / PLA HD bien documentado |

Todos los productos se comparan como 1 bobina individual. JAYO conserva 1,1 kg y se normalizará mediante €/kg.

### Compatibilidad AMS

Bambu Lab publica para AMS y AMS 2 Pro:

- ancho de bobina: 50-68 mm;
- diámetro de bobina: 197-202 mm;
- recomienda bobinas plásticas;
- para cartón recomienda adaptador para reducir deslizamiento y residuos.

Regla operativa:

- ELEGOO: ⚠️ por cartón;
- eSUN: ⚠️ por cartón;
- OVERTURE: ⚠️ por cartón;
- Winkle: candidato a ✅, pendiente de confirmar dimensiones exactas del ASIN;
- SUNLU: candidato a ✅, pendiente de reconciliar dimensiones oficiales de bobina con el rango Bambu;
- JAYO: pendiente de verificar que el ASIN `B0BHQR69RW` corresponde a la versión/bobina de la imagen definitiva. No usar la imagen aportada de PLA Matte para una ficha de PLA normal.

### Evidencia de uso real

Patrones encontrados:

- ELEGOO PLA: buena relación calidad/precio y facilidad de uso recurrente; con AMS el cartón puede requerir anillo o protección de borde.
- eSUN PLA+: reputación sólida como PLA+ generalista; aparecen experiencias mixtas con bobinas de cartón en AMS, desde uso directo sin incidencias hasta deslizamientos/errores.
- SUNLU High Speed PLA+ 2.0: existe feedback positivo con perfiles Bambu/SUNLU; la velocidad máxima depende de temperatura, caudal y calibración, por lo que no se presentará como velocidad garantizada.
- OVERTURE PLA Professional: buena reputación en piezas funcionales y facilidad de impresión, con algunos casos de ajuste necesario de adhesión/perfil.
- JAYO PLA: opiniones generalmente positivas por coste y 1,1 kg; no asumir que comparte formulación con SUNLU aunque exista relación empresarial/marca.
- Winkle PLA HD: buena base de opiniones españolas verificadas; PcComponentes muestra valoraciones altas y Revi/Tresding acumula una muestra amplia con comentarios positivos sobre acabado, ausencia de atascos y relación calidad/precio, aunque algunos usuarios requieren ajustar parámetros.

### Winkle PLA HD

El TDS oficial declara:

- 1,75 mm;
- bobinas de 300 g y 1 kg;
- 190-230 °C;
- cama 50-70 °C;
- 50-90 mm/s;
- velocidad volumétrica máxima 14 mm³/s;
- fabricación bajo ISO 9001 / ISO 14001 y REACH;
- no recomendado para alta temperatura ni impacto/flexión constante.

La ausencia de una tolerancia ± numérica oficial localizada se mostrará como `No declarada`.

### Precio y puntuación

La puntuación final de calidad-precio sigue pendiente porque debe calcularse con el precio de una bobina individual observado el mismo día en Amazon.es.

La herramienta automática no puede leer de forma fiable las seis páginas directas de Amazon.es en esta sesión, por lo que no se registrarán precios estimados ni datos de trackers como sustituto.

Cuando se disponga de los seis precios observados en Amazon.es:

1. calcular €/kg;
2. normalizar la nota de precio;
3. puntuar calidad, fiabilidad, facilidad y prestaciones;
4. calcular la nota final con la fórmula aprobada;
5. guardar las cinco notas individuales para trazabilidad.

No publicar todavía la URL.


---

## Valoración editorial v1 · filamentos PLA · 04/10/2026

Se aplica por primera vez la fórmula de calidad-precio aprobada a los seis candidatos.

Precios de una bobina individual observados manualmente en Amazon.es el 04/10/2026:

- ELEGOO PLA: 13,99 € hoy; precio mostrado habitual 14,99 €.
- eSUN PLA+: 15,99 €.
- SUNLU High Speed PLA+ 2.0: 15,99 €.
- OVERTURE PLA Professional: 15,99 € con cupón del 10 % → 14,39 € efectivos.
- JAYO PLA: 11,99 € por 1,1 kg.
- Winkle PLA HD: 20,90 €.

€/kg usados para la nota de precio:

- JAYO: 10,90 €/kg.
- ELEGOO: 13,99 €/kg.
- OVERTURE: 14,39 €/kg.
- eSUN: 15,99 €/kg.
- SUNLU: 15,99 €/kg.
- Winkle: 20,90 €/kg.

Nota de precio normalizada:

- JAYO: 10,00.
- ELEGOO: 7,79.
- OVERTURE: 7,57.
- eSUN: 6,82.
- SUNLU: 6,82.
- Winkle: 5,22.

### Notas editoriales v1

Estas notas no son mediciones físicas propias. Se basan en documentación oficial, pruebas publicadas, reseñas especializadas y patrones repetidos de usuarios. Deben revisarse si aparece nueva evidencia o si se cambia la referencia exacta.

| Producto | Calidad | Fiabilidad | Facilidad | Prestaciones | Precio | Calidad-precio |
|---|---:|---:|---:|---:|---:|---:|
| ELEGOO PLA | 8,2 | 7,8 | 8,8 | 7,5 | 7,79 | 7,93 |
| eSUN PLA+ | 8,3 | 7,8 | 8,2 | 8,4 | 6,82 | 7,69 |
| SUNLU High Speed PLA+ 2.0 | 8,5 | 8,1 | 8,0 | 9,4 | 6,82 | 7,92 |
| OVERTURE PLA Professional | 8,4 | 8,0 | 8,0 | 8,5 | 7,57 | 8,00 |
| JAYO PLA | 7,8 | 7,5 | 8,2 | 7,5 | 10,00 | 8,50 |
| Winkle PLA HD | 8,8 | 8,7 | 8,4 | 8,0 | 5,22 | 7,37 |

### Interpretación

- JAYO lidera actualmente la nota de calidad-precio por su precio por kg excepcionalmente bajo y 1,1 kg por bobina, aunque su base de evidencia externa es menos rica que la de eSUN, OVERTURE o Winkle.
- OVERTURE queda muy equilibrado por precio efectivo, documentación técnica y perfil PLA Professional.
- SUNLU consigue la mayor nota de prestaciones por su propuesta high-speed y documentación específica de temperatura/velocidad.
- ELEGOO destaca especialmente en facilidad y precio contenido.
- eSUN mantiene buen equilibrio técnico, pero su precio actual y cierta variabilidad reportada en experiencias de usuarios reducen su nota final.
- Winkle obtiene las mejores notas de calidad/fiabilidad de esta primera pasada gracias a documentación y feedback español muy favorable, pero su precio de 20,90 €/kg penaliza mucho la relación calidad-precio.

### Criterio de publicación

No presentar estas notas como verdad objetiva ni como resultados de ensayo propio.

En la página:

- mostrar `Nuestra valoración`;
- explicar la metodología una vez;
- mantener barras para Calidad, Fiabilidad, Facilidad, Prestaciones y Precio;
- mostrar la nota final de calidad-precio;
- indicar que el precio usado corresponde al momento del análisis;
- no afirmar que Compra con Sentido ha probado físicamente estos seis productos para esta comparativa.

Antes de publicación, revisar especialmente JAYO por menor profundidad de evidencia independiente y confirmar bobina/dimensiones AMS de las referencias exactas.


---

## Metodología de packs y valoración dinámica · filamentos PLA · 04/10/2026

Se cierra la forma de tratar packs y promociones en la futura comparativa de mejores filamentos PLA.

### Regla de comparación principal

La tabla principal compara siempre una bobina individual por producto.

La nota principal de calidad-precio se calcula con el precio efectivo observado de una bobina individual en Amazon.es en la fecha del análisis.

Los packs no alteran la comparabilidad de la tabla principal.

### Packs dentro de cada ficha

Cuando exista un pack de 2, 4 o más bobinas:

- registrar ASIN;
- registrar número de bobinas y peso total;
- calcular €/kg efectivo;
- comparar ese €/kg con la compra de unidades sueltas;
- recalcular únicamente la parte de precio de la valoración;
- mostrar cómo cambia la nota final de calidad-precio si el usuario compra ese pack.

La ficha podrá incluir una frase editorial breve del tipo:

`Si compras el pack de 4, el coste baja a X €/kg y nuestra valoración sube de X,X a X,X.`

O, cuando no compense:

`Al precio observado, el pack de 2 sale peor por kilo que comprar bobinas individuales.`

### Referencia de precio para normalización

Para evitar que una bobina individual excepcionalmente barata distorsione la comparación de formatos, la nota de precio se normaliza respecto al mejor €/kg real observado entre todos los formatos comparables analizados ese día.

Fórmula:

`nota precio = (mejor €/kg observado ÷ €/kg del formato) × 10`

La nota se limita a 10.

### Precios y packs observados el 04/10/2026

ELEGOO:
- 1 kg: 13,99 € hoy; habitual observado 14,99 €;
- 2 kg: 26,99 € hoy · ASIN `B0CD789G2S`;
- 4 kg: 39,99 € hoy · ASIN `B0CD7C5GFH`;
- mejor pack observado: 4 kg ≈ 10,00 €/kg.

eSUN:
- 1 kg: 15,99 €;
- 2 kg: 26,99 € hoy · ASIN `B0B749Z8H1`;
- 4 kg: 44,99 € · ASIN `B0CVVRPMJR`;
- mejor pack observado: 4 kg ≈ 11,25 €/kg.

SUNLU:
- 1 kg: 15,99 €;
- 2 kg: 29,99 € · ASIN `B0FDGCPMWJ`;
- 4 kg: 49,99 € · ASIN `B0FDGFWFYP`;
- mejor pack observado: 4 kg ≈ 12,50 €/kg.

OVERTURE:
- 1 kg: 15,99 € con cupón del 10 %;
- 2 kg: 27,99 € · ASIN `B0CQ1SP6YD`;
- 4 kg: 49,99 €, hoy 47,99 € + cupón del 10 %;
- ASIN del pack de 4 todavía pendiente;
- mejor pack observado: 4 kg ≈ 10,80 €/kg tras cupón.

JAYO:
- 1 bobina de 1,1 kg: 11,99 €;
- pack 2 × 1,1 kg: 27,98 € · ASIN `B0BHR3SKCV`;
- pack 4 × 1,1 kg: 48,99 € · ASIN `B0DPKQYS2X`;
- a los precios observados, la bobina individual ofrece mejor €/kg que ambos packs.

Winkle:
- 1 kg: 20,90 €;
- no se ha localizado pack equivalente en Amazon.es.

### Presentación

La tabla principal mostrará una sola nota de calidad-precio por producto, basada en una bobina individual.

Cada ficha podrá mostrar un pequeño bloque `Si compras más cantidad` con:

- pack;
- €/kg;
- ahorro o sobrecoste frente a la unidad;
- nueva nota de calidad-precio.

No usar dos decimales en notas públicas. Redondear siempre a un decimal.

No publicar precios como información permanente sin indicar que corresponden al momento del análisis.


---

## Estructura editorial cerrada · mejores filamentos PLA · 04/10/2026

Se define la arquitectura editorial de la futura URL:

`/impresion-3d/filamentos-3d/mejores-filamentos-pla/`

La URL sigue sin crearse ni publicarse.

### Title provisional

`Mejores filamentos PLA calidad-precio: 6 opciones según el uso`

Pendiente de ajuste final cuando se cierre la redacción.

### H1

`Mejores filamentos PLA: cuál comprar según lo que vas a imprimir`

### Orden de contenidos

1. Breadcrumbs.
2. H1.
3. Introducción breve orientada a decisión.
4. Resumen rápido de recomendaciones por perfil.
5. Tabla comparativa principal.
6. Explicación breve de metodología y sistema de valoración.
7. Seis fichas de producto.
8. Bloque comparativo transversal: qué cambia realmente entre PLA, PLA+ y High Speed PLA+ dentro de esta selección.
9. Bloque de packs y cuándo compensa comprar más cantidad.
10. Bloque AMS / bobinas de cartón y plástico.
11. Cómo elegir entre los seis.
12. FAQ.
13. Enlazado interno hacia guía de materiales y contenidos relacionados.

### Resumen rápido

La primera respuesta debe permitir decidir sin leer toda la página.

Perfiles provisionales:

- JAYO PLA → mejor si priorizas coste por kilo / cantidad.
- ELEGOO PLA → PLA sencillo y fácil para uso diario.
- eSUN PLA+ → PLA+ generalista equilibrado.
- SUNLU High Speed PLA+ 2.0 → mejor para alta velocidad.
- OVERTURE PLA Professional → piezas funcionales / PLA Pro equilibrado.
- Winkle PLA HD → fabricación española, buen acabado y consistencia.

No usar ranking 1.º, 2.º, 3.º.

### Tabla comparativa principal

Columnas:

- Modelo
- Tipo
- Peso
- Tolerancia
- Temperatura de boquilla
- Velocidad declarada
- AMS
- Calidad-precio
- Mejor para

Reglas:

- una bobina individual por producto;
- todos son 1,75 mm y se explicará una vez fuera de la tabla;
- notas con un decimal;
- AMS solo con símbolo ✅ / ⚠️ / ❌;
- tolerancia solo si está documentada; si no, `No declarada`;
- velocidad siempre presentada como declaración del fabricante, no como resultado de prueba propia;
- no incluir temperatura de cama en la tabla principal;
- no incluir precios fijos en la tabla pública.

### Metodología

Bloque breve antes de las fichas:

`Nuestra valoración` se calcula con:

- Calidad y acabado: 20 %.
- Fiabilidad y experiencia real: 20 %.
- Facilidad: 10 %.
- Prestaciones para su uso objetivo: 15 %.
- Precio por kg observado: 35 %.

La parte de fiabilidad incorpora:

- consistencia entre bobinas/lotes;
- incidencias recurrentes;
- atascos, enredos, roturas y humedad;
- comportamiento reportado en distintas impresoras;
- reseñas de usuarios;
- pruebas independientes;
- volumen y calidad de evidencia.

Mantener además una señal interna de confianza de la valoración: Alta / Media-Alta / Media / Baja.

No mostrar estrellas editoriales.

### Plantilla de cada ficha

Cada producto debe contener:

#### 1. Encabezado
- nombre exacto;
- perfil de recomendación;
- imagen;
- CTA `Ver precio en Amazon`.

#### 2. `La elegiría si...`
Una frase concreta que explique qué característica puede justificar comprar ese producto frente a los otros cinco.

#### 3. Datos clave
Bloque compacto con:
- tipo;
- peso;
- tolerancia;
- boquilla;
- velocidad fabricante;
- cama si aporta valor;
- secado si está especificado;
- bobina/material;
- AMS.

#### 4. `Lo que destaca`
2-4 puntos basados en diferencias reales.

#### 5. `A tener en cuenta`
Limitaciones, incidencias recurrentes o precauciones reales.

#### 6. `Qué dicen las pruebas y los usuarios`
Resumen editorial de patrones, sin copiar comentarios ni presentar una sola reseña como conclusión.

Debe distinguir:
- ventajas repetidas;
- problemas repetidos;
- nivel de confianza de la evidencia.

#### 7. `Nuestra valoración`
Cinco barras HTML/CSS:
- Calidad
- Fiabilidad
- Facilidad
- Prestaciones
- Precio

Debajo:
`Calidad-precio: X,X/10`

#### 8. `Si compras más cantidad`
Solo cuando existan packs:
- pack;
- €/kg observado;
- ahorro/sobrecoste frente a la unidad;
- nueva nota calidad-precio;
- CTA secundario opcional.

Si el pack no mejora el €/kg, indicarlo claramente.

#### 9. `La compraría frente a...`
Una comparación breve con el rival más cercano dentro de los seis.

### Diferenciación prevista por producto

ELEGOO:
- facilidad;
- precio contenido;
- PLA estándar;
- cartón/AMS como precaución.

eSUN:
- PLA+ generalista;
- equilibrio entre facilidad y prestaciones;
- amplia experiencia acumulada de usuarios;
- cartón/AMS como precaución.

SUNLU:
- alta velocidad;
- documentación de temperatura ligada a velocidad;
- bobina plástica;
- explicar que 600 mm/s es máximo declarado, no rendimiento garantizado.

OVERTURE:
- PLA Professional / PLA+;
- orientación a piezas funcionales;
- documentación técnica sólida;
- bobina de cartón.

JAYO:
- 1,1 kg;
- coste por kg muy competitivo;
- packs actuales no necesariamente mejores que unidad;
- evidencia independiente menos profunda, por lo que la confianza debe tratarse con más prudencia.

Winkle:
- fabricación española;
- documentación técnica clara;
- bobina plástica;
- buen feedback local;
- precio alto frente al resto, que debe justificar mediante calidad/consistencia y no con marketing.

### Bloque packs

Explicar que la tabla usa una bobina individual para comparar en igualdad.

Después mostrar ejemplos donde el pack cambia la compra:

- ELEGOO 4 kg: muy competitivo por kg;
- eSUN 4 kg: mejora notable;
- SUNLU 4 kg: mejora el €/kg;
- OVERTURE 4 kg: mejora fuerte con cupón observado;
- JAYO: a los precios observados, la unidad puede salir mejor que el pack;
- Winkle: no se localizó pack equivalente.

No convertir promociones puntuales en afirmaciones permanentes.

### Bloque AMS

Explicar una sola vez:

- ✅ uso directo;
- ⚠️ compatible con precauciones/adaptador;
- ❌ no compatible directamente.

Después:
- bobina plástica + dimensiones correctas → ✅;
- cartón con dimensiones correctas → normalmente ⚠️;
- incompatibilidad física/formato → ❌.

Las fichas explican el motivo concreto.

### FAQ previstas

Preguntas candidatas:

- ¿Qué filamento PLA tiene mejor relación calidad-precio?
- ¿Qué diferencia hay entre PLA y PLA+?
- ¿Qué PLA es mejor para impresoras rápidas?
- ¿Qué filamentos PLA funcionan bien con AMS?
- ¿Merece la pena comprar packs de varias bobinas?
- ¿Qué temperatura de boquilla usar con PLA?
- ¿Es importante la tolerancia del diámetro?
- ¿Hay que secar el PLA antes de imprimir?

Las FAQ definitivas deben responder a intención real y coincidir exactamente con FAQPage si se implementa schema.

### Enlazado interno

Desde la nueva página:

- enlace a `/impresion-3d/filamentos-3d/` para quien aún dude entre PLA, PETG, ASA y TPU;
- enlace contextual a impresoras 3D al hablar de high-speed y AMS;
- enlace a accesorios si se trata almacenamiento/secado/adaptadores de bobina.

Desde páginas existentes:

- `/impresion-3d/filamentos-3d/` debe enlazar a esta comparativa desde el bloque PLA;
- `/impresion-3d/` debe enlazarla como comparativa comercial del cluster.

### Estado siguiente

Siguiente fase:
1. completar evidencia de uso real por producto;
2. cerrar confianza de la valoración;
3. revisar y ajustar notas v1;
4. cerrar datos AMS definitivos;
5. cerrar textos de las seis fichas;
6. después preparar HTML y publicar mediante PR.



---

## Corrección de flujo de fichas y CTA múltiples · filamentos PLA · 04/10/2026

Se corrige la estructura de ficha definida anteriormente para la futura comparativa de filamentos PLA.

La referencia de orden vigente será la comparativa más reciente de sierras circulares, no las estructuras anteriores todavía presentes en algunas comparativas como amoladoras o llaves de impacto.

### Orden correcto dentro de cada ficha

1. Imagen + badge/perfil.
2. H3 con nombre exacto del producto.
3. Subtítulo / diferencia principal.
4. Bloque compacto de especificaciones.
5. Texto editorial principal:
   - datos oficiales relevantes;
   - experiencia real;
   - pruebas y reseñas;
   - ventajas y limitaciones prácticas;
   - sin crear un bloque separado de `Qué dicen los usuarios`.
6. Bloques paralelos:
   - `Lo que destaca`;
   - `A tener en cuenta`.
7. `La elegiría si…`.
8. `Nuestra valoración`:
   - Calidad;
   - Fiabilidad;
   - Facilidad;
   - Prestaciones;
   - Precio;
   - Calidad-precio X,X/10.
9. Bloque de formatos / packs cuando existan.
10. CTA de compra.

### Regla de “La elegiría si…”

Debe ir después de `Lo que destaca` y `A tener en cuenta`.

Su función es cerrar la decisión tras haber explicado ventajas y limitaciones:

`¿Qué característica o combinación de características puede justificar elegir este producto frente a los otros cinco?`

No debe repetir literalmente ni el subtítulo ni los bloques de pros/contras.

### CTA de la tabla

La tabla comparativa principal enlaza siempre a la referencia individual principal usada para comparar:

- una bobina;
- ASIN principal;
- mismo producto/variante analizado;
- CTA compacto `🛒 Ver en Amazon`.

### CTA dentro de la ficha

Cuando existan varios formatos válidos en Amazon.es, la ficha podrá mostrar varios botones de compra.

Orden previsto:

1. botón principal:
   - `Ver 1 kg en Amazon` o equivalente;
   - enlaza al mismo ASIN individual utilizado en la tabla;
2. botón secundario:
   - `Ver pack 2 kg en Amazon`;
3. botón secundario:
   - `Ver pack 4 kg en Amazon`.

Para JAYO, adaptar el texto al peso real:
- `Ver 1,1 kg en Amazon`;
- `Ver pack 2 × 1,1 kg`;
- `Ver pack 4 × 1,1 kg`.

Para Winkle, si no existe un pack equivalente, mostrar solo el CTA individual.

### Bloque “Si compras más cantidad”

Debe ir inmediatamente antes de los CTA cuando exista información útil de packs.

Debe explicar de forma compacta:

- precio/kg observado del formato individual;
- precio/kg observado del mejor pack;
- si existe ahorro real;
- cómo cambia la nota de calidad-precio;
- si el pack sale peor que comprar unidades sueltas, decirlo claramente.

No duplicar información de todos los packs cuando uno sea claramente irrelevante. Se pueden mostrar los botones de 2 y 4 kg, pero el texto editorial debe centrarse en la diferencia que realmente cambia la compra.

### Jerarquía visual de botones

- el formato individual es el CTA principal porque es la referencia de la comparativa;
- los packs son CTA secundarios;
- mantener el estilo Amazon dorado del sitio;
- diferenciar jerarquía mediante tamaño/énfasis, no mediante colores incompatibles con el sistema visual;
- todos los enlaces afiliados deben usar `rel="nofollow sponsored"`;
- no mostrar precios fijos dentro del botón.

### Estructura resumida definitiva de ficha PLA

`Imagen → H3/subtítulo → especificaciones → texto editorial → Lo que destaca / A tener en cuenta → La elegiría si… → Nuestra valoración → Si compras más cantidad → CTA 1 kg + CTA packs`

Esta decisión sustituye el orden de ficha registrado anteriormente en el bloque `Estructura editorial cerrada · mejores filamentos PLA · 04/10/2026`.



---

## Ajuste de textos CTA por formato · filamentos PLA · 04/10/2026

Se simplifican los textos de los botones de compra dentro de las fichas.

### CTA principal

El formato individual usa siempre:

`Ver en Amazon`

No mencionar `1 kg`, `1,1 kg` ni otra cantidad en el botón principal. El peso ya debe estar explicado en la ficha y en los datos clave.

### CTA de packs

Cuando existan formatos múltiples:

- `Ver pack de 2 en Amazon`
- `Ver pack de 4 en Amazon`

La cantidad se refiere al número de bobinas/unidades, no al peso total.

### Regla editorial

Evitar repetir información ya visible en la ficha.

El usuario debe entender el peso de cada bobina por el contenido de la ficha y la tabla. Los botones se limitan a identificar el formato de compra de forma clara y breve.

Esta decisión sustituye los textos anteriores del tipo `Ver 1 kg en Amazon`, `Ver 1,1 kg en Amazon`, `Ver pack 2 kg` o `Ver pack 4 kg`.



---

## Evidencia de uso real y valoración v2 · filamentos PLA · 04/10/2026

Se amplía la investigación de uso real con reseñas, pruebas independientes, comunidades técnicas y señales de volumen de opiniones.

### Regla sobre popularidad

La cantidad de reseñas, ventas visibles o compras recientes no puntúa por sí sola como calidad.

Se usa para:
- medir cuánta experiencia acumulada existe;
- aumentar o reducir la confianza de la valoración;
- detectar si un patrón negativo o positivo aparece sobre una base amplia.

Un producto con muchas reseñas no recibe automáticamente una nota mayor.

### Evidencia por producto

#### ELEGOO PLA · ASIN B0CD7BTN37

Señales encontradas:
- MerchantWords España: aproximadamente 1.000+ reseñas y 4,8/5 para el ASIN exacto en la captura consultada;
- otros índices internacionales del mismo ASIN muestran varios miles de valoraciones;
- Filament Swatch: 8,2/10 global, 9/10 en imprimibilidad y 10/10 en valor;
- patrones recurrentes: buena adhesión, impresión sencilla, buena relación coste/resultado;
- limitaciones repetidas: variación entre lotes/colores y acabado menos fino que materiales premium;
- fabricante: 1 kg, 1,75 mm, ±0,02 mm, 190-230 °C y bobina de cartón con anillo oficial para reducir problemas en AMS.

Confianza editorial: **Alta**.

#### eSUN PLA+ · ASIN B07FQ98RNP

Señales encontradas:
- MerchantWords: alrededor de 18.000-20.000 reseñas, ~4,4-4,5/5 según mercado/fecha;
- tienda oficial eSUN: 4,8/5 sobre 105 reseñas y señal de decenas de miles de unidades vendidas en su propia tienda;
- uso real muy extendido en distintas impresoras;
- patrones positivos: facilidad, buena adhesión, buen equilibrio entre rigidez y tenacidad, comportamiento conocido;
- patrones negativos: algunos casos de fragilidad si absorbe humedad, variación entre lotes/colores y experiencias puntuales de alimentación;
- ficha oficial: 1 kg, 1,75 mm, ±0,03 mm, 210-230 °C, 45-60 °C, <300 mm/s.

Confianza editorial: **Alta**.

#### SUNLU High Speed PLA+ 2.0 · ASIN B0FDGKJ1BJ

Señales encontradas:
- MerchantWords España: alrededor de 657 reseñas y 4,7/5 para el ASIN exacto;
- tienda SUNLU: 4,95/5 sobre 77 reseñas para la gama High Speed PLA+ 2.0;
- fabricante: 1,75 ±0,02 mm y hasta 600 mm/s con escalado de temperatura según velocidad;
- foros Bambu y Reddit muestran resultados muy buenos en algunos equipos, pero también experiencias claramente negativas con atascos, roturas o peor detalle fino;
- el patrón es más polarizado que en ELEGOO, eSUN u OVERTURE;
- no presentar 600 mm/s como calidad garantizada: requiere caudal, temperatura, perfil y hardware adecuados.

Confianza editorial: **Media-Alta** por ser una referencia relativamente nueva y tener feedback más polarizado.

#### OVERTURE PLA Professional · ASIN B09PDCLSLY

Señales encontradas:
- MerchantWords: ~7.800 reseñas y 4,6/5 para el ASIN;
- análisis recientes recogen ~7.500 valoraciones globales en Amazon;
- fabricante: ±0,02 mm, 190-220 °C, 25-60 °C, 40-70 mm/s, secado 50 °C/7 h;
- uso real: buena reputación para piezas funcionales y comportamiento repetible;
- también aparecen varios casos de adhesión problemática según superficie/perfil, especialmente en algunos usuarios de PEI/PET;
- no confundir PLA Professional con PLA básico de OVERTURE.

Confianza editorial: **Alta**.

#### JAYO PLA · ASIN B0BHQR69RW

Señales encontradas:
- MerchantWords España: ~5.680 reseñas, 4,3/5 y señal aproximada de 100+ compras recientes para el ASIN exacto;
- fabricante JAYO confirma para PLA 1,1 kg: 1,75 ±0,02 mm, 200-230 °C, cama 60-80 °C, 40-80 mm/s;
- opiniones comunitarias suelen destacar precio, 1,1 kg y facilidad;
- el 4,3/5 del ASIN es inferior al de ELEGOO, eSUN, SUNLU y OVERTURE, por lo que no debe recibir una nota de fiabilidad tan alta como esos modelos solo por ser barato;
- existen cambios históricos de bobina/cartón/plástico y distintas variantes PLA/PLA+/Matte; mantener máxima precaución para no mezclar referencias.

Confianza editorial: **Media-Alta**, con cautela adicional por variantes y bobina exacta.

#### Winkle PLA HD · ASIN B08LQJ8W1F

Señales encontradas:
- PcComponentes: 4,7/5 con unas 35-36 opiniones según variante y mayoría de valoraciones de 5 estrellas;
- Revi/Tresding: 4,9/5 con 187 opiniones y 97 % de recomendación;
- comentarios repetidos: buen acabado, ausencia de atascos y buena consistencia;
- aparecen también usuarios que necesitan ajustar parámetros y algún comentario sobre dificultad inicial;
- la muestra es bastante menor que eSUN/OVERTURE, pero las opiniones locales verificadas son especialmente positivas;
- fabricante Winkle declara fabricación española, 50-90 mm/s y 14 mm³/s en PLA HD actual.

Confianza editorial: **Media-Alta**.

### Correcciones técnicas

#### Winkle tolerancia

Se localizan múltiples distribuidores que publican para PLA HD:

- 1,75 mm;
- tolerancia ±0,03 mm.

Hasta localizar el mismo dato en TDS oficial de Winkle, registrar internamente:

**±0,03 mm corroborado por varios distribuidores; pendiente de fuente primaria.**

Esto sustituye el antiguo estado `No declarada` como hipótesis de trabajo, pero no debe publicarse como dato oficial del fabricante sin validación final.

#### Bobinas de plástico confirmadas visualmente

Según revisión manual de Amazon realizada por Sergio:
- SUNLU: plástico;
- JAYO: plástico;
- Winkle: plástico.

No inferir compatibilidad AMS únicamente por el material de la bobina.

### AMS / AMS 2 Pro / AMS Lite

Bambu Lab publica para AMS y AMS 2 Pro:
- ancho: 50-68 mm;
- diámetro: 197-202 mm;
- plástico recomendado;
- cartón con adaptador.

Hallazgo importante para Winkle:
- PcComponentes publica para PLA HD una bobina de aprox. 175 × 77 mm;
- esas dimensiones no encajan en el rango oficial de AMS/AMS 2 Pro;
- Winkle declara en algunas fichas compatibilidad `AMS Lite` y en otras fichas actuales `AMS`;
- existe por tanto una discrepancia que debe resolverse con la bobina exacta B08LQJ8W1F antes de asignar ✅.

Estado Winkle AMS: **pendiente / no asignar ✅ todavía**.

SUNLU:
- se encuentran dimensiones alrededor de 203 × 63 mm para bobinas SUNLU;
- el ancho encaja, el diámetro puede quedar 1 mm por encima del rango oficial Bambu;
- no cerrar ✅ sin validar la bobina exacta High Speed PLA+ 2.0.

JAYO:
- referencias comunitarias sitúan bobina plástica alrededor de 200 × 63 mm;
- encajaría en AMS/AMS 2 Pro si corresponde exactamente al ASIN actual;
- mantener pendiente de verificación final del formato exacto.

### Valoración v2

Se corrigen las notas para incorporar volumen de evidencia y patrones reales. La nota de precio usa como referencia el mejor €/kg observado entre todos los formatos estudiados ese día: ELEGOO 4 kg ≈ 10,00 €/kg.

| Producto | Calidad | Fiabilidad real | Facilidad | Prestaciones | Precio unidad | Calidad-precio unidad | Confianza |
|---|---:|---:|---:|---:|---:|---:|---|
| JAYO PLA | 7,8 | 7,4 | 8,1 | 7,5 | 9,2 | 8,2 | Media-Alta |
| OVERTURE PLA Professional | 8,5 | 8,2 | 8,0 | 8,6 | 6,9 | 7,9 | Alta |
| ELEGOO PLA | 8,2 | 8,2 | 8,9 | 7,5 | 7,1 | 7,8 | Alta |
| eSUN PLA+ | 8,4 | 8,4 | 8,3 | 8,5 | 6,3 | 7,7 | Alta |
| SUNLU High Speed PLA+ 2.0 | 8,4 | 7,6 | 7,9 | 9,4 | 6,3 | 7,6 | Media-Alta |
| Winkle PLA HD | 8,7 | 8,6 | 8,3 | 8,0 | 4,8 | 7,2 | Media-Alta |

Todas las notas públicas se redondean a un decimal.

### Lectura editorial v2

- JAYO sigue siendo la referencia de compra económica en formato individual, pero su nota de fiabilidad no debe inflarse: el precio explica buena parte de su ventaja.
- OVERTURE queda como la opción más equilibrada entre evidencia, calidad, prestaciones funcionales y precio.
- ELEGOO gana fuerza como opción fácil y económica gracias a la evidencia independiente y al gran volumen de uso.
- eSUN tiene la base de experiencia real más consolidada de la selección.
- SUNLU ofrece las mayores prestaciones de velocidad, pero el feedback más polarizado reduce su fiabilidad frente a eSUN/OVERTURE/ELEGOO.
- Winkle mantiene una valoración alta de calidad/fiabilidad, pero su precio individual perjudica de forma clara su calidad-precio.

### Uso público de reseñas

En las fichas:
- no mostrar un ranking por estrellas propio;
- no copiar reseñas;
- resumir patrones;
- se puede mencionar de forma contextual que una referencia acumula miles de valoraciones o que tiene una muestra local amplia si el dato ayuda a explicar la confianza;
- no convertir `más reseñas` en `mejor producto`.



---

## Compatibilidad AMS · revisión v2 · filamentos PLA · 04/10/2026

Se amplía la verificación de compatibilidad con Bambu Lab.

### Bambu Lab

Para AMS y AMS 2 Pro, Bambu Lab publica:
- ancho de bobina: 50-68 mm;
- diámetro: 197-202 mm;
- recomienda bobinas plásticas;
- para cartón recomienda adaptador.

### Winkle PLA HD

Las fichas oficiales actuales de Winkle para PLA HD estándar muestran en varios colores `Compatibilidad BambuLab: AMS Lite`.

Distribuidores publican para la bobina PLA HD unas dimensiones aproximadas de 175 × 77 mm.

Lectura editorial:
- no marcar Winkle como ✅ para AMS / AMS 2 Pro;
- la evidencia actual apunta a compatibilidad directa con AMS Lite en la gama PLA HD estándar;
- antes de publicar, comprobar la bobina exacta negra B08LQJ8W1F y si la versión vendida actualmente conserva esas dimensiones.

Estado provisional para columna AMS si se refiere a AMS/AMS 2 Pro: **❌/pendiente de validación exacta**, no ✅.

### SUNLU High Speed PLA+ 2.0

La bobina es plástica según revisión manual de Amazon.

Datos publicados para bobinas SUNLU rondan 203 × 63-64 mm, ligeramente por encima del máximo oficial Bambu en diámetro, pero existen experiencias repetidas de uso real en AMS y AMS 2 Pro, incluida la gama High Speed PLA+ 2.0.

SUNLU ha introducido generaciones de bobina específicamente adaptadas mejor a AMS.

Estado provisional: **✅ si el ASIN actual usa bobina V3 / compatible; verificar visualmente antes de publicar.**

No añadir advertencia genérica solo por ser SUNLU.

### JAYO PLA

La bobina actual observada por Sergio es plástica.

Referencias comunitarias de bobinas JAYO plásticas actuales rondan 200 × 63 mm y usuarios recientes reportan funcionamiento en AMS 2 Pro.

JAYO también ha vendido históricamente el mismo tipo de filamento en cartón, por lo que no generalizar a cualquier bobina JAYO.

Estado provisional: **✅ para la bobina plástica actual si se confirma que el ASIN B0BHQR69RW corresponde a esa versión.**

### ELEGOO / eSUN / OVERTURE

- ELEGOO: cartón → ⚠️.
- eSUN: cartón en la referencia actual → ⚠️.
- OVERTURE: cartón → ⚠️.

La precaución es por la bobina, no por el material PLA.



---

## Borrador estable de fichas · mejores filamentos PLA · 04/10/2026

Tras revisar conjuntamente las seis fichas se crea el borrador estable:

`.github/content-drafts/mejores-filamentos-pla.md`

Contiene las fichas de:
- ELEGOO PLA;
- eSUN PLA+;
- SUNLU High Speed PLA+ 2.0;
- OVERTURE PLA Professional;
- JAYO PLA;
- Winkle PLA HD.

### Orden definitivo de ficha

`Imagen → H3/subtítulo → especificaciones → texto editorial → Lo que destaca / A tener en cuenta → La elegiría si… → Nuestra valoración → Si compras más cantidad → CTA`

### Diferenciación editorial cerrada

- ELEGOO: facilidad y coste contenido.
- eSUN: PLA+ generalista con gran base de experiencia real.
- SUNLU: alta velocidad.
- OVERTURE: equilibrio y piezas funcionales.
- JAYO: coste por kilo y 1,1 kg.
- Winkle: consistencia, acabado y fabricación española.

No usar ranking global.

### Correcciones de cálculo incorporadas

Al revisar conjuntamente las fichas se recalculan las notas de packs con la fórmula aprobada y referencia aproximada de 10 €/kg:

- SUNLU pack 2: **7,7/10**; pack 4: **8,2/10**.
- OVERTURE pack 2: **7,9/10**; pack 4: **8,7/10**.
- JAYO pack 2: **7,7/10**; pack 4: **8,1/10**.

Estas cifras sustituyen aproximaciones anteriores que redondeaban SUNLU a 7,8/8,3, OVERTURE pack 2 a 8,0 y JAYO pack 2 a 7,8.

### Pendientes antes de HTML

1. cerrar AMS exacto de SUNLU;
2. cerrar AMS exacto de JAYO;
3. cerrar AMS/AMS 2 Pro frente a AMS Lite de Winkle;
4. validar ±0,03 mm de Winkle en fuente primaria si es posible;
5. confirmar definitivamente que B0BHQR69RW es JAYO PLA normal y no Matte;
6. obtener ASIN del pack de 4 de OVERTURE;
7. revalidar todos los ASIN y variantes justo antes de publicar.

La URL sigue sin crearse ni publicarse.


---

## Cierres técnicos adicionales · filamentos PLA · 04/10/2026

### JAYO B0BHQR69RW

Se confirma mediante múltiples fichas del mismo ASIN que:

- ASIN: `B0BHQR69RW`;
- modelo/referencia comercial: `PLA-BK-1100G`;
- tipo: PLA normal;
- peso: 1,1 kg;
- diámetro: 1,75 mm;
- tolerancia publicada: ±0,02 mm;
- parámetros publicados: 200-230 °C, cama 60-80 °C, 40-80 mm/s.

Esto permite cerrar que el ASIN principal corresponde a **JAYO PLA normal**, no PLA Matte.

La imagen aportada anteriormente que indicaba `PLA Matte Filament` no debe utilizarse para esta ficha.

### SUNLU High Speed PLA+ 2.0

La documentación oficial actual confirma:

- 1,75 ±0,02 mm;
- 1 kg;
- hasta 600 mm/s;
- relación temperatura/velocidad:
  - 200-215 °C → 50-150 mm/s;
  - 215-230 °C → 150-300 mm/s;
  - 230-260 °C → 300-600 mm/s;
- cama 50-60 °C / 55-65 °C según página oficial concreta.

Mantener el mensaje editorial de que 600 mm/s es un máximo declarado y depende de caudal, hardware y perfil.

### Winkle PLA HD · tolerancia

Se detecta discrepancia entre distribuidores:

- algunas fichas publican ±0,03 mm;
- otras publican ±0,02 mm;
- la fuente oficial/TDS localizada hasta ahora no muestra una tolerancia numérica inequívoca para cerrar la cifra.

Decisión:
- no presentar todavía ±0,02 ni ±0,03 como dato oficial del fabricante;
- mantener la cifra pendiente de validación primaria;
- en tabla final, si no se obtiene fuente primaria, usar `–` o `No declarada` según el criterio de tabla vigente.

### OVERTURE pack de 4

Se localiza un pack de 4 kg de OVERTURE PLA Professional / PLA+:

- ASIN `B0DQTSZ4ZH`;
- formato Black ×2 + White ×2;
- 4 × 1 kg.

También existen otras referencias de packs 4 kg en mercados distintos.

No asignar todavía este ASIN al CTA del pack de 4 de Amazon.es hasta confirmar que corresponde exactamente a la ficha que Sergio vio a 49,99 € / 47,99 € + cupón.

### Estado AMS

No se cierran todavía como definitivos:
- SUNLU High Speed PLA+ 2.0;
- JAYO PLA;
- Winkle PLA HD.

Motivo:
- el material de la bobina está confirmado visualmente como plástico en las referencias actuales revisadas por Sergio;
- falta validar dimensiones exactas de la bobina actual frente al rango AMS / AMS 2 Pro;
- Winkle además presenta indicios de compatibilidad AMS Lite que no deben extrapolarse automáticamente a AMS/AMS 2 Pro.

La publicación no debe usar ✅ hasta cerrar la compatibilidad exacta por referencia.


---

## Borrador HTML montado · mejores filamentos PLA · 04/10/2026

Se crea el borrador HTML estructural en:

`.github/content-drafts/mejores-filamentos-pla.html`

No está publicado en la URL final.

Incluye:
- title y meta description provisionales;
- breadcrumbs;
- hero;
- exactamente 3 perfiles;
- tabla principal;
- metodología;
- seis fichas completas;
- barras de valoración;
- bloques de packs;
- bloque PLA / PLA+ / High Speed;
- bloque AMS;
- FAQ;
- enlazado interno a la guía de filamentos;
- footer y navegación vigentes.

### Decisiones aplicadas en el HTML

- CTA principal: `Ver en Amazon`.
- Packs: `Ver pack de 2 en Amazon` y `Ver pack de 4 en Amazon`.
- tabla con una bobina individual por producto;
- sin ranking global;
- notas con un decimal;
- JAYO B0BHQR69RW tratado como PLA normal de 1,1 kg;
- Winkle mantiene `No declarada` en tolerancia hasta tener fuente primaria inequívoca;
- no se asigna símbolo AMS definitivo a SUNLU, JAYO ni Winkle;
- el CTA de OVERTURE pack de 4 queda sin activar hasta confirmar el ASIN exacto de Amazon.es;
- imágenes de producto quedan como placeholders para no usar representaciones inexactas.

### Pendientes antes de mover el HTML a la URL pública

1. imágenes exactas y optimizadas de los seis productos;
2. cerrar AMS exacto de SUNLU, JAYO y Winkle;
3. confirmar ASIN del pack de 4 OVERTURE visto en Amazon.es;
4. revalidar ASIN, variante y disponibilidad de todos los CTA;
5. añadir tag de afiliación vigente a los enlaces;
6. cerrar hero/OG image;
7. generar schema Article + BreadcrumbList + FAQPage cuando el contenido visible quede congelado;
8. enlazado de entrada desde `/impresion-3d/filamentos-3d/` y `/impresion-3d/`;
9. revisión responsive y build final.

La URL continúa sin publicarse.


---

## Tracking Amazon y revisión técnica del borrador PLA · 04/10/2026

Se aplica al borrador HTML:

`.github/content-drafts/mejores-filamentos-pla.html`

el Tracking ID ya registrado para el cluster de filamentos:

`ccc-filam3d-21`

Todos los CTA Amazon presentes en el borrador:
- incorporan `?tag=ccc-filam3d-21`;
- mantienen `rel="nofollow sponsored"`;
- incorporan `data-asin`;
- incorporan `data-amazon-validation="review-before-merge"`.

No se crea un Tracking ID nuevo para esta comparativa: se reutiliza el identificador vigente de filamentos 3D.

### Revisión responsive estructural

El borrador mantiene:
- tabla dentro de contenedor horizontal desplazable;
- aviso visible `← Desliza la tabla para ver todas las columnas →`;
- sin primera columna fija;
- CTA de fichas apilables al 100 % en móvil;
- barras de valoración con rejilla reducida en móvil;
- shell móvil a 24 px;
- navegación y footer globales vigentes.

Pendientes visuales reales:
- incorporar imágenes exactas de producto;
- incorporar hero/OG definitivo;
- realizar revisión visual final con imágenes reales, porque su relación de aspecto puede afectar altura y ritmo de las fichas;
- cerrar AMS y OVERTURE pack 4 antes de convertir el borrador en URL pública.

La URL sigue sin publicarse.


---

## Datos aportados por Sergio · JAYO y OVERTURE · 04/10/2026

### JAYO PLA · bobina actual

Sergio aporta imagen de Amazon de la referencia JAYO donde aparecen las dimensiones de bobina:

- diámetro exterior: **140 mm**;
- ancho: **61 mm**;
- diámetro/interior indicado en la imagen: **55 mm**;
- bobina plástica.

Comparado con el rango oficial de AMS / AMS 2 Pro registrado en este MASTER:

- ancho 50-68 mm → **entra**;
- diámetro 197-202 mm → **no entra**.

Decisión para la comparativa:

- JAYO PLA se marca **❌ para uso directo en AMS / AMS 2 Pro** con esta bobina;
- no confundir con AMS Lite ni con otras bobinas JAYO de dimensiones diferentes;
- esta decisión aplica a la bobina mostrada para la referencia actual, no a toda la marca.

### OVERTURE pack de 4

Sergio confirma el ASIN del pack de **4 kg negro** visto en Amazon.es:

`B0DQ53M2BN`

Se incorpora como CTA:

`Ver pack de 4 en Amazon`

con Tracking ID:

`ccc-filam3d-21`

El ASIN `B0DQTSZ4ZH` localizado anteriormente para un pack mixto negro/blanco no se utiliza como referencia principal del pack de 4 negro.

### Pendientes reducidos

Siguen pendientes:
- dimensiones/AMS exacto de SUNLU High Speed PLA+ 2.0;
- dimensiones/AMS exacto de Winkle PLA HD;
- imágenes definitivas;
- hero/OG;
- validación final de disponibilidad y variante antes de publicación.


---

## Corrección JAYO · dimensiones de bobina · 04/10/2026

Se revierte la decisión anterior de marcar JAYO como ❌ para AMS / AMS 2 Pro.

Motivo:

La imagen aportada por Sergio muestra:
- 140 mm de diámetro exterior;
- 61 mm de ancho;
- 55 mm de diámetro interior.

Pero esta cifra de 140 mm presenta una inconsistencia importante con una bobina de 1,1 kg y además contradice otras fuentes externas para JAYO 1,1 kg:

- OnlySpoolz registra una bobina JAYO PLA de 1,1 kg con aproximadamente **195 mm de diámetro, 57 mm de ancho y 54 mm de agujero**.
- Otros distribuidores de JAYO 1,1 kg publican aproximadamente **200 mm de diámetro, 61 mm de ancho y 56 mm de agujero**.
- Una guía comunitaria de bobinas sitúa JAYO alrededor de **200 × 63 mm**.

Por tanto:
- no usar 140 mm como dato definitivo;
- no marcar JAYO como ❌ por esa imagen;
- compatibilidad AMS vuelve a estado **pendiente de cierre**;
- antes de publicar hay que confirmar qué bobina corresponde exactamente al ASIN B0BHQR69RW actual.

La cifra de 140 mm debe tratarse como posible error de imagen, imagen de otra bobina o dato mal rotulado hasta resolverlo.


---

## Compatibilidad AMS cerrada · filamentos PLA · 04/10/2026

Se cierra la columna AMS / AMS 2 Pro para la comparativa:

- ELEGOO PLA → **⚠️**
- eSUN PLA+ → **⚠️**
- SUNLU High Speed PLA+ 2.0 → **✅**
- OVERTURE PLA Professional → **⚠️**
- JAYO PLA 1,1 kg → **✅**
- Winkle PLA HD → **❌** para AMS / AMS 2 Pro

### Criterio aplicado

ELEGOO / eSUN / OVERTURE:
- dimensiones de formato estándar compatibles en la práctica;
- bobina de cartón;
- se mantiene ⚠️ por la precaución adicional en AMS.

SUNLU High Speed PLA+ 2.0:
- bobina plástica;
- medidas publicadas alrededor de 195 × 57 mm;
- existe amplia evidencia de uso real en AMS / AMS 2 Pro;
- se cierra como ✅.

JAYO PLA 1,1 kg:
- bobina plástica;
- múltiples fuentes del formato JAYO 1,1 kg publican alrededor de 200 × 61 mm;
- encaja con el rango de AMS / AMS 2 Pro;
- la cifra de 140 mm mostrada en una imagen de Amazon se considera inconsistente y no se usa;
- se cierra como ✅.

Winkle PLA HD:
- bobina plástica;
- dimensiones publicadas alrededor de 175 × 77 mm;
- queda fuera del formato de AMS / AMS 2 Pro;
- algunas fichas actuales de Winkle mencionan AMS Lite;
- se cierra como ❌ para AMS / AMS 2 Pro, sin extrapolar a AMS Lite.

Esta clasificación sustituye los estados provisionales anteriores.


---

## Corrección ASIN ELEGOO PLA 1 kg · 04/10/2026

Sergio confirma la referencia exacta actual para la bobina individual ELEGOO PLA negro 1 kg:

- ASIN anterior descartado: `B0CD7B7ZKK`
- ASIN correcto: `B0CD7BTN37`

La imagen aportada muestra:
- ELEGOO PLA negro;
- 1 kg;
- 1,75 mm;
- tolerancia impresa ±0,02 mm;
- bobina de cartón.

Todos los CTA y referencias del borrador deben usar `B0CD7BTN37` para la unidad de 1 kg.


---

## Imágenes definitivas de producto · comparativa PLA · 04/10/2026

Sergio aporta y valida las imágenes principales de las seis referencias.

Se optimizan a WebP y se preparan para el borrador:

- `/images/filamentos-pla/elegoo-pla.webp` — 640 × 613 px;
- `/images/filamentos-pla/esun-pla-plus.webp` — 640 × 600 px;
- `/images/filamentos-pla/sunlu-high-speed-pla-plus-2.webp` — 640 × 595 px;
- `/images/filamentos-pla/overture-pla-professional.webp` — 550 × 640 px;
- `/images/filamentos-pla/jayo-pla.webp` — 640 × 630 px;
- `/images/filamentos-pla/winkle-pla-hd.webp` — 622 × 640 px.

Pesos optimizados aproximados: entre 23 y 56 KB por imagen, muy por debajo del límite QA de 350 KB.

### Corrección eSUN

La imagen exacta aportada por Sergio para eSUN PLA+ muestra **bobina plástica**, no cartón.

Para la referencia analizada:
- eSUN PLA+ → bobina plástica;
- compatibilidad AMS / AMS 2 Pro → **✅**;
- se elimina la advertencia por cartón de esta referencia concreta.

La clasificación AMS final pasa a:

- ELEGOO → ⚠️
- eSUN → ✅
- SUNLU → ✅
- OVERTURE → ⚠️
- JAYO → ✅
- Winkle → ❌ para AMS / AMS 2 Pro

### Corrección color ELEGOO

La referencia individual definitiva aportada por Sergio para ASIN `B0CD7BTN37` corresponde a **ELEGOO PLA negro 1 kg**. Las menciones antiguas a ELEGOO blanco para esta referencia quedan sustituidas por negro.
