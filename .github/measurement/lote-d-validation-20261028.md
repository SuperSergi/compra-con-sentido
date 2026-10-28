# Lote D: cambios y validación local, 28/10/2026

Base: main 96268e7, lote B confirmado en producción. PR en borrador, sin publicación autorizada.

## Cambios

- Base CSS compartida con versión por contenido. Otros estilos agrupados en 21 bundles reutilizables, en el orden original y sin cruzar estilos inline. Se conservan las fuentes CSS; build-css.py genera HTML, manifiesto y salidas. El build comprueba su reproducibilidad.
- Solicitudes CSS: portada 4 a 2; amoladoras 10 a 2; gatos para coche 8 a 3. Todas las páginas tienen como máximo tres, salvo que futuras decisiones requieran revisar este límite de auditoría.
- Etiquetas: #5f6d65 sobre #f7faf8, 5,175:1 frente a 4,443:1 anterior.
- Enlace global «Más información sobre cookies», mismo destino y lógica de consentimiento. Versión JS renovada en los 28 HTML, verificada por el auditor estático.
- Pila común de sistema mediante --font-sans. Eliminadas diez declaraciones Arial locales y las familias Inter de componentes compartidos.

## Evidencia y límites

1. Antes de cambiar contraste y tipografía, comparación entre main y agrupación CSS: 28 páginas por cuatro anchuras (360, 390, 768, 1440), 112/112 con estilos computados, pseudoelementos y geometría iguales. Esto valida la cascada de la agrupación; no implica igualdad tras el cambio intencional de fuente.
2. Estado final: 27 URLs del sitemap por cuatro anchuras, 108/108 sin incidencias de la auditoría responsive ampliada. Incluye contraste computado, pila tipográfica, imágenes rotas, overflow, menú, tablas y perfiles. Edge headless local.
3. 404 revisada también a las cuatro anchuras: sin problemas de estilos, tipografía, contraste u overflow. El ensayo ampliado la marca por ausencia de breadcrumb, comportamiento ya existente en main; la auditoría habitual del sitemap no exige añadir contenido a la 404.
4. Banner abierto y rechazo de analítica comprobados a 390 y 1440 px. El banner se oculta (no se elimina del DOM) y la elección persiste al navegar. Destino aviso-legal/#cookies conservado. Captura móvil revisada.
5. Generador --check y site-audit.py correctos. Pruebas negativas: una fuente CSS modificada sin regenerar falla el build; una versión JS obsoleta falla el auditor. Archivos de prueba restaurados.
6. Texto visible e img idénticos a main en los 28 HTML. Sin cambios de modelos, fotos, srcset, dimensiones, precargas, enlaces comerciales o contenido del lote E.

No se ha medido PageSpeed de producción después del cambio. Menos solicitudes y bytes locales no garantizan un ahorro igual al tiempo de CSS bloqueante señalado por Lighthouse. Repetir tras publicar con las mismas condiciones en portada, amoladoras y gatos para coche.

## Comprobación tras la futura publicación

- En las tres páginas, confirmar las nuevas referencias CSS, pila de sistema y disposición móvil/escritorio; tabla completa desplazable, sin columna fija.
- En las fichas, confirmar legibilidad de etiquetas y color computado #5f6d65.
- Sin consentimiento previo, comprobar «Más información sobre cookies», su destino y aceptación/rechazo.
- Repetir PageSpeed móvil y comparar rendimiento, LCP, CLS, TBT, Speed Index, CSS bloqueante, accesibilidad y SEO con mobile-baseline-20261028.md.
- Archivos de producción: 28 HTML, cuatro CSS fuente compartidos, 21 CSS generados y js/main-v4.js. El manifiesto, scripts, workflow y documentación son controles del repositorio.
