# Preparación del lote de rendimiento

Referencia: mobile-baseline-20261028.md. Alcance separado del lote B de contenido. No se implementan cambios de rendimiento en la PR del lote B.

## Prioridades

1. **CSS bloqueante.** El HTML de amoladoras carga diez hojas, confirmado en código. Comparar una agrupación que conserve el orden de cascada con un CSS crítico reducido para la primera pantalla. Medir solicitudes, bytes, caché y pintado antes de elegir. No usar @import para agrupar ni cargar todos los estilos de todas las categorías en una hoja global. No retirar reglas por suponer que están sin uso ni cargar de forma diferida estilos necesarios para evitar parpadeos. El diagnóstico de 710 ms no garantiza recuperar ese tiempo entero.
2. **Contraste de fichas.** css/product-cards-v1.css declara #6b7770 para etiquetas sobre #f7faf8. El cálculo de luminancia de esos colores opacos confirma 4,443:1; #5f6d65 daría 5,175:1 sobre el mismo fondo. Verificar además los colores computados y el contraste en todos los estados y tamaños antes de cerrar. Mantener jerarquía visual y comprobar las once comparativas.
3. **Enlace del banner.** js/main-v4.js genera «Más información» con destino aviso-legal/#cookies. Cambiar el texto a «Más información sobre cookies» sin alterar destino, consentimiento ni carga de analítica. Versionar la referencia del JS en todas las páginas y revisar banner abierto en móvil y escritorio.
4. **Tipografía, lote D.** Pila de sistema común y retirada de Arial local, validando fuentes computadas y ajuste responsive.

5. **Imágenes y cabeceras, lote C pendiente de decisión.** Priorizar el ahorro estimado de portada, 402 KiB, y después el de amoladoras, 46 KiB. No inferir ahorro nulo en gatos, cuyo dato no se ha aportado. Generar variantes adecuadas solo donde reduzcan transferencia y con originales suficientes. No precargar cabeceras de forma general con LCP de 1,1 s. Las dimensiones pueden añadirse como coherencia HTML, sin afirmar que corrigen saltos inexistentes en estas tres mediciones.

## Archivos previstos

- CSS compartidos y de página: css/style-v4.css, css/hero-v5.css, css/intro-v1.css, css/comparativas-v3.css, css/product-cards-v1.css y las hojas efectivamente cargadas por cada URL.
- Cabeceras HTML: referencias de CSS y, si se demuestra útil, estilos críticos. Conservar el orden semántico de reglas y las variantes por página.
- js/main-v4.js y todas sus referencias HTML para el texto del banner.
- Imágenes, variantes y precargas fuera del lote D. No sustituir assets hasta la decisión del usuario sobre el lote C.

La pila de sistema común está aprobada, pero su aplicación debe coordinarse con la revisión de CSS para evitar duplicar trabajo. Cambiar fotos de modelos exactos sigue requiriendo correspondencia de modelo y procedencia; esta medición no valida esas imágenes.

## Validación

- Capturas de portada, amoladoras y gatos para coche antes/después en los mismos viewports; revisar también el resto de páginas por compartir CSS y JS.
- Comprobar cascada, foco, contraste, menú, tabla completa desplazable, FAQ y cookies, incluidas páginas con consentimiento aún sin decidir.
- Comparar con caché fría y mantener las condiciones de la prueba. Las diez hojas por sí solas no cuantifican el beneficio de agruparlas bajo HTTP/2 o HTTP/3.
- Confirmar que no aparecen descargas duplicadas de imagen ni contenido sin estilo.
- Build y auditoría responsive de 27 URLs; no usar un check verde como sustituto de la medición de carga.
- Una PR del lote contra main. Al publicar, entregar lista de archivos/textos y pedir al usuario repetir los mismos PageSpeed móviles. Conservar rendimiento 98/99/99 y LCP/CLS actuales como referencia, sin prometer puntuación 100.
