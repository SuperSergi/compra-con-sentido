# Lote D2: preparación y validación, 28/10/2026

Base: main 7508613, tras D y E cerrados por el usuario. Preparación en borrador; no publicado. Nueva referencia: mobile-post-de-20261028.md.

## Cambios

1. main-v4.js con defer en los 28 HTML. El archivo JS no cambia y conserva su versión por contenido. Ya estaba al final del body, por lo que no se presupone una gran mejora de tiempos.
2. Un CSS minificado por página. style-v4.css y los bundles anteriores se integran con los antiguos bloques style, extraídos a 17 fuentes editables en css/pages/. Se mantiene exactamente el orden de reglas. rcssmin 1.2.2 realiza minificación sintáctica, sin eliminar reglas ni combinar selectores. Fuentes y orden en .github/css-bundles.json; salidas generadas en css/compiled/.
3. Portada: cinco imágenes decorativas con derivados de 400 y 800 px, Pillow/Lanczos, WebP calidad 82, método 6. Encuadre y contenido conservados; originales intactos. srcset/sizes ajustados al ancho de las tarjetas. No se ofrecen candidatos superiores a 800 px para estas cinco tarjetas.
4. Texto de portada: «Guías para comparar sierras, impresoras 3D y otros productos según sus características y el uso previsto». Privacidad: se retira la explicación de GitHub y Cloudflare solicitada; se conserva el resto del párrafo.

## Tamaños locales y límites

| Página | Solicitudes CSS antes a después | CSS antes a después, bytes | Gzip estimado antes a después, bytes |
| --- | --- | --- | --- |
| Portada | 2 a 1 | 61.217 a 41.143 | 12.929 a 8.053 |
| Amoladoras | 2 a 1 | 91.950 a 67.672 | 18.343 a 12.154 |
| Gatos para coche | 3 a 1 | 84.220 a 66.529 | 17.239 a 12.116 |

Son tamaños locales del checkout y compresión gzip calculada, no transferencia medida en Cloudflare. Gatos tenía además 6.510 bytes de CSS inline, ahora incluidos en el único archivo CSS. El CSS base pierde su caché independiente entre páginas: el objetivo solicitado es una sola hoja por documento. Confirmar el efecto real en PageSpeed antes de atribuir mejora de Speed Index o LCP.

Las cinco imágenes originales suman 525.110 bytes; variantes de 800 px, 219.498; variantes de 400 px, 84.708. Ahorro de contenido de imagen: 305.612 bytes a 800 px o 440.402 a 400 px. El navegador elige según sizes y densidad; no se promete un ahorro fijo de 400 KB. Sin cambios de fotos de producto, cabeceras, precargas ni originales.

## Validación

- Auditoría estática correcta; comprueba defer sin async, versión de JS y candidatos srcset locales. Generador CSS --check correcto y reproducible, instalado desde requirements-css.txt.
- Comparación de CSS aislada contra main en 28 páginas y cuatro anchuras (360, 390, 768, 1440): 112/112 con estilos computados, pseudoelementos y geometría iguales. Se mantiene el body de main en esa prueba para excluir los dos textos y los derivados de portada de la comparación de cascada.
- Auditoría responsive final de las 27 URLs: 108/108, sin incidencias; exige exactamente una hoja por página. Captura de tarjeta móvil revisada.
- Prueba funcional antes de unificar CSS y repetida después: 390/1440 px, producción simulada y preview. Menú, submenús, banner, aceptación/rechazo y persistencia correctos. Sin consentimiento no carga GA ni registra clics; con consentimiento, amazon_click conserva ASIN, tag, producto, URL y página; tras revocar deja de registrar. Previews sin GA. Red externa interceptada, sin enviar eventos ni abrir Amazon. Prueba incorporada a CI.
- Selección de imágenes verificada a 390 px con DPR 1/2/3, 768 px DPR 1 y 1440 px DPR 1/2. Las cinco cargan derivados válidos y eligen 400 u 800 px. Móvil DPR 2 y 3 elige 800 px. Originales y atributos de imágenes fuera de portada iguales a main, destinos de enlaces conservados y JS intacto.

## Comprobación tras una futura publicación

Repetir PageSpeed móvil en portada, amoladoras y gatos para coche con las mismas condiciones que mobile-post-de-20261028.md. Comprobar caché fría y navegación entre páginas, un CSS por documento, menú, cookies, tablas y selección de imágenes de portada. Los eventos de afiliación solo deben enviarse tras consentimiento y nunca en previews.

Referencias de implementación: [defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script), [srcset y sizes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img), [minificación sintáctica de RCSSmin](https://pypi.org/project/rcssmin/1.2.2/).
