from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path
from urllib.parse import urljoin, urlparse
import xml.etree.ElementTree as ET

DOMAIN = "https://compraconsentido.es"
ROOT = Path(".")
SITEMAP = ROOT / "sitemap.xml"
TRACKING = ROOT / ".github" / "amazon-tracking-ids.json"
NAV_JS = ROOT / "js" / "main-v4.js"
# Una URL hija profunda que no deba aparecer en el menú requiere una exclusión deliberada aquí.
NAVIGATION_EXEMPT_CHILDREN: set[str] = set()
MAX_IMAGE_BYTES = 350_000
RASTER_EXTS = {".webp", ".png", ".jpg", ".jpeg", ".avif"}

errors: list[str] = []
warnings: list[str] = []

def fail(message: str) -> None:
    errors.append(message)

def attr(tag: str, name: str) -> str | None:
    match = re.search(rf"""\b{re.escape(name)}\s*=\s*(["'])(.*?)\1""", tag, re.I | re.S)
    return match.group(2).strip() if match else None

def tags(html: str, name: str) -> list[str]:
    return re.findall(rf"<{name}\b[^>]*>", html, re.I | re.S)

def meta_value(html: str, key: str, value: str) -> str | None:
    for tag in tags(html, "meta"):
        if (attr(tag, key) or "").lower() == value.lower():
            return attr(tag, "content")
    return None

def link_value(html: str, rel_value: str) -> str | None:
    for tag in tags(html, "link"):
        rel = (attr(tag, "rel") or "").lower().split()
        if rel_value.lower() in rel:
            return attr(tag, "href")
    return None

def url_to_file(url_path: str) -> Path:
    if url_path == "/":
        return ROOT / "index.html"
    return ROOT / url_path.strip("/") / "index.html"

def file_to_url(path: Path) -> str:
    rel = path.as_posix()
    if rel == "index.html":
        return "/"
    return "/" + rel.removesuffix("index.html")

tree = ET.parse(SITEMAP)
ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
sitemap_entries: dict[str, str] = {}

for node in tree.findall("sm:url", ns):
    loc = (node.findtext("sm:loc", default="", namespaces=ns) or "").strip()
    lastmod = (node.findtext("sm:lastmod", default="", namespaces=ns) or "").strip()
    if not loc.startswith(DOMAIN):
        fail(f"sitemap: dominio inesperado en {loc}")
        continue
    parsed = urlparse(loc)
    path = parsed.path or "/"
    if path in sitemap_entries:
        fail(f"sitemap: URL duplicada {path}")
    sitemap_entries[path] = lastmod
    try:
        parsed_date = date.fromisoformat(lastmod)
        if parsed_date > date.today():
            fail(f"sitemap: lastmod futuro en {path}: {lastmod}")
    except ValueError:
        fail(f"sitemap: lastmod inválido en {path}: {lastmod!r}")

public_files = [
    p for p in ROOT.rglob("index.html")
    if ".git" not in p.parts and ".github" not in p.parts
]
public_urls = {file_to_url(p): p for p in public_files}

missing_in_sitemap = sorted(set(public_urls) - set(sitemap_entries))
missing_files = sorted(set(sitemap_entries) - set(public_urls))
for path in missing_in_sitemap:
    fail(f"sitemap: falta URL publicada {path}")
for path in missing_files:
    fail(f"sitemap: URL sin index.html correspondiente {path}")

# La navegación de segundo nivel se construye en main-v4.js. Una URL hija de
# tercer nivel o más no puede publicarse y quedar olvidada fuera del menú por accidente.
if NAV_JS.exists():
    nav_js_text = NAV_JS.read_text(encoding="utf-8")
    for url_path in sorted(sitemap_entries):
        parts = [part for part in url_path.strip("/").split("/") if part]
        if len(parts) < 3 or url_path in NAVIGATION_EXEMPT_CHILDREN:
            continue
        nav_fragment = url_path.strip("/")
        if nav_fragment not in nav_js_text:
            fail(
                f"navegación dinámica: falta {url_path} en js/main-v4.js "
                "(añádela a submenuData o declara una exclusión deliberada)"
            )
else:
    fail("falta js/main-v4.js para validar navegación dinámica")

tracking_values: set[str] = set()
if TRACKING.exists():
    data = json.loads(TRACKING.read_text(encoding="utf-8"))
    tracking_values = set(data.values())
else:
    fail("falta .github/amazon-tracking-ids.json")

reference_menu: list[tuple[str, str]] | None = None
reference_menu_path = ""

for url_path, path in sorted(public_urls.items()):
    html = path.read_text(encoding="utf-8")
    lower = html.lower()

    if lower.count("</html>") != 1:
        fail(f"{path}: debe existir exactamente un </html>")
    else:
        end = lower.rfind("</html>") + len("</html>")
        if html[end:].strip():
            fail(f"{path}: hay contenido después de </html>")

    h1_count = len(re.findall(r"<h1\b", html, re.I))
    if h1_count != 1:
        fail(f"{path}: H1={h1_count}, debe ser 1")

    title_match = re.search(r"<title\b[^>]*>(.*?)</title>", html, re.I | re.S)
    if not title_match or not re.sub(r"<[^>]+>", "", title_match.group(1)).strip():
        fail(f"{path}: falta <title> útil")

    if not meta_value(html, "name", "description"):
        fail(f"{path}: falta meta description")

    canonical = link_value(html, "canonical")
    expected_canonical = DOMAIN + url_path
    if canonical != expected_canonical:
        fail(f"{path}: canonical {canonical!r}, esperado {expected_canonical!r}")

    favicon = link_value(html, "icon")
    if not favicon:
        fail(f"{path}: falta favicon")
    elif favicon.startswith("/"):
        favicon_file = ROOT / favicon.lstrip("/").split("?", 1)[0]
        if not favicon_file.exists():
            fail(f"{path}: favicon no existe: {favicon}")

    for prop in ("og:title", "og:description", "og:image"):
        if not meta_value(html, "property", prop):
            fail(f"{path}: falta {prop}")

    for prop in ("twitter:card", "twitter:title", "twitter:description", "twitter:image"):
        if not meta_value(html, "name", prop):
            fail(f"{path}: falta {prop}")

    breadcrumb_count = len(re.findall(r"""aria-label\s*=\s*["']Migas de pan["']""", html, re.I))
    expected_breadcrumbs = 0 if url_path == "/" else 1
    if breadcrumb_count != expected_breadcrumbs:
        fail(f"{path}: breadcrumbs={breadcrumb_count}, esperado {expected_breadcrumbs}")

    bad_p = re.search(r"<p\b[^>]*>\s*[:·-]", html, re.I | re.S)
    if bad_p:
        fail(f"{path}: párrafo visible empieza por separador huérfano")

    # Residuos editoriales y HTML mal formado que pueden llegar a ser visibles.
    # Se inspecciona el texto renderizable y, por separado, patrones de atributos
    # internos que no deben llegar al HTML público.
    residue_source = re.sub(r"<!--.*?-->", " ", html, flags=re.I | re.S)
    residue_source = re.sub(r"<script\b.*?</script>", " ", residue_source, flags=re.I | re.S)
    residue_source = re.sub(r"<style\b.*?</style>", " ", residue_source, flags=re.I | re.S)
    visible_text = re.sub(r"<[^>]+>", " ", residue_source)
    visible_text = re.sub(r"\s+", " ", visible_text).strip().lower()

    editorial_residues = (
        "antes de publicar",
        "debe cerrarse antes de publicar",
        "borrador",
        "publicaremos",
        "referencia aportada",
        "comercialmente útil",
        "utilizaremos",
        "inconsistencia ya resuelta",
    )
    for residue in editorial_residues:
        if residue in visible_text:
            fail(f"{path}: residuo editorial visible: {residue!r}")

    if re.search(r'data-amazon-validation\s*=\s*["\']review-before-merge["\']', html, re.I):
        fail(f"{path}: atributo interno de prepublicación review-before-merge")

    # Caso real detectado en Taladros: <img ... / decoding="async">.
    # Ese slash antes del atributo deja texto residual en algunos navegadores.
    if re.search(r"<img\b[^>]*?/\s+decoding\s*=", html, re.I | re.S):
        fail(f"{path}: atributo decoding= mal colocado tras cierre de <img>")

    # decoding= y &gt; no deben aparecer como texto visible fuera de etiquetas.
    if re.search(r"\bdecoding\s*=", visible_text, re.I):
        fail(f"{path}: decoding= aparece como texto visible")
    if "&gt;" in visible_text:
        fail(f"{path}: entidad &gt; aparece como texto visible")

    for structural_tag in ("table", "thead", "tbody"):
        opening = len(re.findall(rf"<{structural_tag}\b", html, re.I))
        closing = len(re.findall(rf"</{structural_tag}>", html, re.I))
        if opening != closing:
            fail(f"{path}: estructura HTML incoherente en <{structural_tag}> ({opening} aperturas / {closing} cierres)")

    for a_tag in tags(html, "a"):
        href = attr(a_tag, "href") or ""
        if "amazon.es/" not in href.lower():
            continue
        rel = set((attr(a_tag, "rel") or "").lower().split())
        if not {"nofollow", "sponsored"}.issubset(rel):
            fail(f"{path}: enlace Amazon sin rel='nofollow sponsored': {href}")
        tag_match = re.search(r"[?&]tag=([^&]+)", href)
        if tag_match and tracking_values and tag_match.group(1) not in tracking_values:
            fail(f"{path}: tracking ID no registrado: {tag_match.group(1)}")

    for table_index, table in enumerate(re.findall(r"<table\b.*?</table>", html, re.I | re.S), 1):
        if not re.search(r"<caption\b", table, re.I):
            fail(f"{path}: tabla {table_index} sin <caption>")
        for th in tags(table, "th"):
            scope = (attr(th, "scope") or "").lower()
            if scope not in {"col", "row", "colgroup", "rowgroup"}:
                fail(f"{path}: tabla {table_index} contiene <th> sin scope válido")
                break

    nav_match = re.search(r"<nav\b[^>]*id=[\"']main-nav[\"'][^>]*>(.*?)</nav>", html, re.I | re.S)
    if not nav_match:
        fail(f"{path}: falta #main-nav")
    else:
        menu: list[tuple[str, str]] = []
        for a_tag, label in re.findall(r"(<a\b[^>]*>)(.*?)</a>", nav_match.group(1), re.I | re.S):
            href = attr(a_tag, "href") or ""
            clean_label = re.sub(r"<[^>]+>", " ", label)
            clean_label = re.sub(r"\s+", " ", clean_label).strip()
            absolute = urljoin(DOMAIN + url_path, href)
            parsed_href = urlparse(absolute)
            normalized_href = parsed_href.path + (("#" + parsed_href.fragment) if parsed_href.fragment else "")
            menu.append((normalized_href, clean_label))
        if reference_menu is None:
            reference_menu = menu
            reference_menu_path = str(path)
        elif menu != reference_menu:
            fail(f"{path}: menú distinto del patrón de {reference_menu_path}")

for image in ROOT.joinpath("images").rglob("*"):
    if not image.is_file() or image.suffix.lower() not in RASTER_EXTS:
        continue
    size = image.stat().st_size
    if size > MAX_IMAGE_BYTES:
        fail(f"{image}: {size / 1024:.0f} KB supera el máximo QA de {MAX_IMAGE_BYTES / 1024:.0f} KB")

if errors:
    print("SITE_AUDIT_FAILED")
    for item in errors:
        print(f"- {item}")
    raise SystemExit(1)

print(
    f"OK: {len(public_files)} páginas, {len(sitemap_entries)} URLs de sitemap, "
    f"metadatos/menú/afiliación/tablas e imágenes validados"
)
