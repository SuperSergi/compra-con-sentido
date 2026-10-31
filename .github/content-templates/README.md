# Plantillas de página

## Sistema de diseño (obligatorio desde el 31/10/2026)

- `pagina-comparativa.html` y `pagina-informacional.html` son el punto de partida de toda página nueva. Están construidas solo con CSS común: **una página nueva no lleva CSS propio**. Si falta una pieza, se añade a `css/content-v1.css` usando variables de `css/tokens-v1.css`.
- Orden de los `<link>`: `tokens-v1.css` el primero, `cta-v1.css` (si hay enlaces a Amazon) y `type-v1.css` los últimos. `build-css.py` los sustituye por el bundle.
- Bloques de contenido: `.ccs-content` › `.ccs-section` › `.ccs-section-head` (`.ccs-kicker`, `h2`, entradilla), `.ccs-cards` › `.ccs-card`, `.ccs-list`, `.ccs-note`, `.ccs-callout` (`.is-aviso` para avisos en ámbar).
- Navegación y footer: copiarlos de una página publicada (el `site-audit` comprueba que el menú sea el global).
- Antes de la PR: `build-css.py`, `site-audit.py` y `design-audit.py` en verde.

---

# Plantilla de análisis individual

Esta plantilla es la base para futuras páginas de producto de Compra con Sentido.

## Convención de URL

Mantener el análisis dentro de su categoría:

- `/herramientas/gatos-hidraulicos/<modelo>/`
- `/herramientas/taladros-a-bateria/<modelo>/`
- `/impresion-3d/impresoras-3d/<modelo>/`
- `/hogar/aspiradoras/<modelo>/`

No crear URLs tipo `/reviews/` separadas de la categoría.

## Estructura obligatoria

1. H1 claro con modelo exacto.
2. Introducción humana: qué problema resuelve y para quién.
3. Transparencia sobre prueba física o análisis documental.
4. Para quién encaja / para quién no.
5. Especificaciones que cambian el uso.
6. Desarrollo por uso real, no copia de ficha técnica.
7. Ventajas y limitaciones.
8. Alternativas internas relevantes.
9. Enlace de afiliado a la variante exacta.
10. Enlaces internos a guía + comparativa + otros análisis.
11. Fuentes.
12. Article JSON-LD y, si procede, Product JSON-LD con datos verificables.

## Reglas editoriales

- No afirmar que hemos probado un producto si no se ha probado físicamente.
- No convertir número de reseñas en número de ventas.
- No inventar estrellas, reviewCount, precio ni disponibilidad.
- No usar un ranking artificial para todos los productos.
- Indicar fecha cuando se cite precio o volumen de valoraciones.
- Usar fotos grandes y reducir bloques largos de texto.
- Mantener un único H1.
- Primera imagen visible: no usar loading="lazy"; usar fetchpriority="high" si es la imagen LCP.
- Las imágenes inferiores sí pueden usar loading="lazy".
- Mantener `rel="nofollow sponsored noopener"` en Amazon.

## Enlazado interno

Cada análisis debe enlazar al menos a:

- guía de compra de la categoría;
- comparativa principal donde aparezca el producto, si existe;
- uno o dos análisis alternativos cuando existan.

Y la guía/comparativa debe devolver el enlace hacia el análisis individual.
