"""Genera un CSS minificado por página conservando el orden de todas las fuentes.

Fuentes: css/**/*.css. Ejecutar tras editarlas; --check valida los assets versionados.
Los antiguos estilos inline están en css/pages/. No editar css/compiled/ a mano.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from rcssmin import cssmin
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT / ".github/css-bundles.json"
OUTPUT = ROOT / "css/compiled"
DOMAIN = "https://compraconsentido.es"
TOKENS = re.compile(r"<link\b[^>]*>|<style\b[^>]*>.*?</style>", re.I | re.S)


def attr(tag: str, name: str) -> str | None:
    found = re.search(rf'\b{re.escape(name)}\s*=\s*(["\'])(.*?)\1', tag, re.I | re.S)
    return found.group(2) if found else None


def digest(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()[:12]


def source_path(href: str) -> str:
    parsed = urlparse(urljoin(DOMAIN + "/", href))
    if parsed.netloc != urlparse(DOMAIN).netloc:
        raise ValueError(f"No se agrupa CSS externo: {href}")
    path = parsed.path.lstrip("/")
    if not (ROOT / path).resolve().is_relative_to((ROOT / "css").resolve()):
        raise ValueError(f"Fuente CSS fuera de css/: {path}")
    return path


def source_content(path: str) -> str:
    text = (ROOT / path).read_text(encoding="utf-8")
    if re.search(r"@(?:import|charset)\b", text, re.I):
        raise ValueError(f"Revisar @import/@charset antes de agrupar {path}")

    def absolute_url(match: re.Match) -> str:
        value = match.group(2).strip()
        if value.startswith(("/", "#", "data:", "http:", "https:")):
            return match.group(0)
        parsed = urlparse(urljoin(DOMAIN + "/" + path, value))
        absolute = parsed.path + (("?" + parsed.query) if parsed.query else "") + (("#" + parsed.fragment) if parsed.fragment else "")
        return f'url("{absolute}")'

    return re.sub(r'url\(\s*(["\']?)([^)"\']+)\1\s*\)', absolute_url, text, flags=re.I)


def build(check: bool = False) -> None:
    previous = json.loads(MANIFEST.read_text(encoding="utf-8")) if MANIFEST.exists() else {"bundles": {}}
    bundles: dict[str, dict] = {}
    outputs: dict[Path, str] = {}
    html_changes: dict[Path, str] = {}
    counts = []
    for path in sorted(ROOT.rglob("*.html")):
        if any(part in {".git", ".github", "node_modules"} for part in path.relative_to(ROOT).parts):
            continue
        text = path.read_text(encoding="utf-8")
        masked = re.sub(r"<!--.*?-->", lambda m: " " * len(m.group(0)), text, flags=re.S)
        tokens = []
        sources = []
        for token in TOKENS.finditer(masked):
            tag = text[token.start():token.end()]
            if tag.lower().startswith("<style"):
                raise ValueError(f"Mover nuevo estilo inline a css/pages/ en su orden de cascada: {path}")
            if (attr(tag, "rel") or "").lower() != "stylesheet":
                continue
            if attr(tag, "media") not in {None, "all"} or attr(tag, "integrity"):
                raise ValueError(f"Revisar atributos de stylesheet en {path}")
            bundle_id = attr(tag, "data-css-bundle")
            if bundle_id:
                if bundle_id not in previous["bundles"]:
                    raise ValueError(f"Bundle sin manifiesto: {bundle_id}")
                sources.extend(previous["bundles"][bundle_id]["sources"])
            else:
                sources.append(source_path(attr(tag, "href") or ""))
            tokens.append(token)
        if not tokens:
            raise ValueError(f"Página sin CSS: {path}")
        if tokens[0].start() > text.lower().find("</head>"):
            raise ValueError(f"El primer CSS debe estar en head: {path}")
        # Syntactic minification only: no rule merging, pruning or reordering.
        content = cssmin("\n".join(source_content(source) for source in sources), keep_bang_comments=True) + "\n"
        bundle_id = "ccs-" + digest("\n".join(sources))
        output_path = OUTPUT / f"{bundle_id}-{digest(content)}.min.css"
        bundles[bundle_id] = {"sources": sources, "output": output_path.relative_to(ROOT).as_posix()}
        outputs[output_path] = content
        replacements = [(t.start(), t.end(), "") for t in tokens]
        replacements[0] = (tokens[0].start(), tokens[0].end(), f'<link rel="stylesheet" href="/{output_path.relative_to(ROOT).as_posix()}" data-css-bundle="{bundle_id}">')
        for start, end, replacement in reversed(replacements):
            text = text[:start] + replacement + text[end:]
        text = re.sub(r"[ \t]+$", "", text, flags=re.M)
        if text != path.read_text(encoding="utf-8"):
            html_changes[path] = text
        counts.append((path.relative_to(ROOT).as_posix(), len(tokens)))
    manifest = json.dumps({"version": 2, "minifier": "rcssmin==1.2.2", "bundles": bundles}, ensure_ascii=False, indent=2) + "\n"
    stale = [(p, c) for p, c in outputs.items() if not p.exists() or p.read_text(encoding="utf-8") != c]
    old_outputs = {ROOT / data["output"] for data in previous["bundles"].values()}
    obsolete = old_outputs - set(outputs)
    manifest_changed = not MANIFEST.exists() or MANIFEST.read_text(encoding="utf-8") != manifest
    if check:
        if html_changes or stale or obsolete or manifest_changed:
            raise SystemExit("CSS_BUNDLES_STALE: ejecutar python3 .github/scripts/build-css.py y guardar HTML, manifiesto y CSS generado")
        print(f"OK: {len(outputs)} bundles CSS minificados reproducibles; una hoja en {len(counts)} páginas")
        return
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for path, content in outputs.items():
        path.write_text(content, encoding="utf-8", newline="\n")
    for path, content in html_changes.items():
        path.write_text(content, encoding="utf-8", newline="\n")
    for path in obsolete:
        if not path.resolve().is_relative_to(OUTPUT.resolve()) or path.suffix != ".css":
            raise ValueError(f"Salida antigua fuera de css/compiled: {path}")
        if path.is_file():
            path.unlink()
    MANIFEST.write_text(manifest, encoding="utf-8", newline="\n")
    print(f"Generados {len(outputs)} bundles minificados para {len(counts)} páginas; orden conservado")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    build(parser.parse_args().check)
