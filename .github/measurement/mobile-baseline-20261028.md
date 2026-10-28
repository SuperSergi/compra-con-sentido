# Referencia móvil previa al lote de imágenes y rendimiento

Fecha: 28/10/2026. Datos aportados por el usuario tras comprobar el lote A (#83) en producción.

| Página | Primera pantalla | Página completa |
| --- | ---: | ---: |
| Portada | 224 KB | 1.666 KB |
| Amoladoras | 156 KB | 753 KB |
| Gatos para coche | 124 KB | 1.537 KB |

HTML, CSS y JavaScript suman entre 24 y 36 KB según la página. El usuario registra 0 saltos de diseño al cargar en las tres.

## PageSpeed móvil

Mediciones aportadas por el usuario el 28/10/2026, realizadas entre las 17:54 y las 17:58 (Europe/Madrid). Son la referencia previa al lote de rendimiento; no son mediciones de la preview del lote B ni datos de campo de todos los usuarios.

| Página | Rendimiento | LCP | CLS | TBT | Speed Index | CSS bloqueante | Ahorro potencial de imágenes | Accesibilidad | SEO |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Portada | 98 | 1,1 s | 0 | 0 ms | 3,8 s | 420 ms | 402 KiB | 100 | 92 |
| Amoladoras | 99 | 1,1 s | 0 | 0 ms | 3,7 s | 710 ms | 46 KiB | 96 | 92 |
| Gatos para coche | 99 | 1,1 s | 0 | 0 ms | 3,6 s | 650 ms | No indicado | 96 | 92 |

Los tiempos atribuidos a CSS bloqueante y los ahorros de imágenes son estimaciones del diagnóstico, no una promesa de mejora equivalente en LCP o Speed Index. «No indicado» conserva la ausencia de dato; no significa ahorro cero. Se mantienen KB para los pesos originales y KiB para las estimaciones de PageSpeed.

No constan aún navegador, dispositivo, viewport, red, limitación de CPU, estado de caché ni si el peso corresponde a bytes transferidos o tamaño de recursos. Mantener las condiciones al comparar antes y después; conservar el dato original del usuario sin convertir unidades ni inventar tiempos.

El lote B modifica contenido, sin cambiar recursos de imagen, CSS, JavaScript, dimensiones, srcset ni precargas. Los datos de PageSpeed ya están disponibles para preparar el lote de rendimiento separado. El usuario repetirá estas mismas mediciones cuando se publique.

Prioridades fijadas por el usuario: reducir CSS bloqueante, mejorar el contraste de etiquetas compartidas de fichas y hacer descriptivo el enlace del banner de cookies. Srcset y precarga quedan en segundo plano; no se atribuyen problemas de LCP ni CLS a dimensiones omitidas.
