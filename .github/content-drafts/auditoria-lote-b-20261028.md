# Lote B: contenido para revisión

Base: main tras la PR #83, commit e995b626908534fc218bed6f2bd1e8b415018e47. Rama: editorial/auditoria-lote-b. Estado: preparado para revisar, sin autorización de publicación en este turno.

## Cambios

- 66 bloques de decisión de las once comparativas usan «Encaja si…».
- Amoladoras y llaves usan perfiles descriptivos en vez de «Opción 1…6». Las imágenes y sus avisos se conservan. Se retiran de las especificaciones visibles de amoladoras las filas de referencia/ASIN; las variantes y enlaces permanecen.
- Se retiran opiniones y pruebas sin fuente en amoladoras, gatos de carretilla, sierras, taladros, robots, deshumidificadores y PLA. Las sustituciones parten de prestaciones ya presentes, sin afirmar uso físico ni inventar testimonios.
- Se retiran las referencias a puntuaciones inexistentes de PLA y los ganadores históricos por coste por kilo. Packs, FAQ, title, metadescripción, Open Graph, Twitter y JSON-LD expresan el mismo criterio sin prometer precio.
- Taladros pierde el umbral de 200 € en title, enlaces, botón y descripciones. Se aclaran los nombres del motor. Se mantiene el catálogo y el contenido de los kits.
- Se limpian el H1 de deshumidificadores, las notas internas de sierras y guías de humedad y el metatexto del hub Hogar. Se corrigen concordancia, términos y mayúsculas.
- La guía de litros identifica su ejemplo como DDSX220WFA y utiliza 21 L/24 h a 32 °C/80 % HR según la hoja técnica enlazada. No se extrapolan las condiciones de un documento a otro modelo.
- Se enlazan fuentes concretas junto a afirmaciones verificadas. No se presenta este lote como una nueva validación técnica exhaustiva de los 66 productos.
- El MASTER registra el lote A validado por el usuario, sus decisiones, los pesos iniciales y los pendientes de PageSpeed. Se corrigen las notas obsoletas sobre PR #77-79/#82 y valoración PLA.

## Fuentes enlazadas

| Fuente primaria | Uso |
| --- | --- |
| [Bosch GWS 18V-11 S, referencia 06019N4000](https://www.bosch-professional.com/es/es/products/gws-18v-11-s-06019N4000) | Selección de velocidad de la referencia |
| [Makita España DGA511Z](https://www.makita.es/data/sr/productinfo/generated/dga511z_3.pdf) | Datos españoles declarados; no resuelve la discrepancia AFT/AWS |
| [Einhell TP-AG 18/125-13 Q P BL](https://www.einhell.es/p/4431197-tp-ag-18-125-13-q-p-bl-solo/) | Interruptor de paleta y variante 4431197 |
| [Milwaukee M18 BLSAG125X](https://es.milwaukeetool.eu/es-es/amoladora-angular-sin-escobillas-m18-de-125mm-con-interruptor-de-boton/m18-blsag125x/) | Uso orientado a corte; la ficha permite seleccionar versión |
| [Einhell TP-CS 18/165 Li BL](https://www.einhell.es/p/4331225-tp-cs-18-165-li-bl-solo/) | 44 mm a 45° y 2,95 kg como peso del producto; no renombrado a peso sin batería por inferencia |
| [Rowenta DH5260F0](https://www.rowenta.es/p/extreme-dry-compact-de-rowenta-deshumidificador-elimina-hasta-16-l-de-humedad-al-dia/1830009397) | Prueba interna declarada de secado; se conserva atribución y condiciones |
| [OCU: elegir deshumidificadores](https://www.ocu.org/vivienda-y-energia/equipamiento-hogar/informe/deshumidificadores-elegir) | Orientaciones de capacidad por superficie |
| [Meaco Arete Two 20L](https://www.meaco.com/products/meacodry-arete-two-20l-dual-dehumidifier-hepa-air-purifier) | Extracción según condiciones |
| [De'Longhi DDSX220WFA, hoja técnica](https://dls.delonghigroup.com/files/docs/4/DSDL-21002-B.pdf) | Modelo exacto, 21 L/24 h a 32 °C/80 % HR. Otras fichas comerciales han empleado 30 °C; no mezclar condiciones |
| [Bambu: guía AMS](https://cdn1.bambulab.com/documentation/quick-start-0fa3c8ddd3d3f/AMS/English%20version-Quick%20Start%20Guide%20for%20AMS.pdf) | Adaptación de bobinas de cartón |
| [Bambu: especificaciones AMS 2 Pro](https://csm.bblcdn.com/hub/9daec0080a7b44baba912c1f06cd6d05.pdf) | TPU for AMS frente a TPU genérico |
| [Prusa: PLA](https://help.prusa3d.com/article/pla_2062), [flexibles](https://help.prusa3d.com/article/flexible-materials_2057) | Impresión de PLA y TPU |
| [Polymaker: PolyLite PLA](https://shop.polymaker.com/products/polylite-pla), [PolyFlex TPU95](https://shop.polymaker.com/products/polyflex-tpu95) | Ejemplos de formulaciones, sin cifras universales para familias |

La antigua ruta polymaker.com/product/polylite-pla/ redirige actualmente a PLA-CF; por eso se usa el destino directo del PLA estándar. La página comercial de un fabricante puede cambiar: se ha comprobado el modelo de destino al preparar el lote.

## Límites y pendientes

- Makita conserva sus guiones y la leyenda aprobada. Falta reconciliar documentación por EAN/modelo con el fabricante.
- Midea conserva la conectividad sin confirmar hasta vincular el ASIN a la referencia exacta. No se publica «sin Wi-Fi» por ausencia en una ficha.
- No se homogeneizan rangos de ruido ni pesos por inferencia. La tabla de sierras recibe la explicación del asterisco y conserva la base declarada de Einhell.
- La incorporación de fuentes se ha hecho donde se ha cerrado una referencia concreta. Falta completar la trazabilidad técnica de cada modelo/variante, especialmente gatos, taladros, PLA y Lefant. Retirar testimonios sin fuente no equivale a verificar todas sus especificaciones.
- Sin cambios en archivos o etiquetas de imagen, estilos inline, CSS externo, JS, precargas, srcset o dimensiones. Sin rediseño de Inicio, cambios de autoría ni contenido legal.
- Tipografía y nombres de navegación aprobados se aplicarán en sus lotes; los CTA compactos y la tabla sin columna fija se conservan.
- Los datos de peso móvil están en measurement/mobile-baseline-20261028.md. LCP/CLS de PageSpeed pendientes de Sergi.

## Comprobaciones para revisar

1. En cualquier ficha, buscar «Encaja si…». Deben existir seis por comparativa.
2. En amoladoras/llaves, comprobar perfiles sin número, imagen conservada y leyenda de guiones intacta.
3. En PLA, comprobar title nuevo, «Temperatura de boquilla», JAYO sin nota de fiabilidad y FAQ/packs sin ganador de precio.
4. En taladros, comprobar ausencia de «por menos de 200 €» en texto y metadatos.
5. En deshumidificadores, comprobar H1 limpio, Pro Breeze diferenciados y Midea con conectividad sin confirmar.
6. En sierras, comprobar 44 mm, nota de peso y separación entre Stop Control y freno.
7. En la guía de litros, comprobar enlace del lote A y ejemplo De'Longhi con fuente y condiciones exactas.

## Validación

Auditor estático de 27 páginas correcto, con control de referencias internas, JSON-LD válido y correspondencia FAQPage/FAQ visible. Pruebas negativas: desincronizar una respuesta de FAQ, recuperar el literal de decisión antiguo e introducir una nota retirada en JSON-LD deben fallar.

Se ha comprobado que los destinos Amazon, canonical, etiquetas img y estilos inline coinciden con main. El lote conserva 66 fichas y sus CTA. Checks de PR y revisión visual se registran al terminar la preparación; no confundir preview desplegada con publicación en producción.
