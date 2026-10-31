"""Control del sistema de diseño común (aprobado el 31/10/2026).

Comprueba dos cosas en cada PR:

1. Orden de carga: en todas las páginas `css/tokens-v1.css` va el primero y
   `css/type-v1.css` el último; las páginas con enlaces a Amazon cargan
   `css/cta-v1.css`.
2. Trinquete de deuda visual: por cada CSS fuente se cuentan los valores que
   deberían salir de `tokens-v1.css` (colores sueltos, `!important`, tamaños
   de letra en px, pesos fuera de 400/700/800 y anchos fijos de contenedor).
   La cifra de cada archivo no puede subir respecto a
   `.github/design-baseline.json`. Un CSS nuevo debe empezar en cero.

Uso:
  python3 .github/scripts/design-audit.py            # comprobar
  python3 .github/scripts/design-audit.py --update   # guardar la línea base
                                                     # (solo tras reducir deuda)
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BASELINE = ROOT / ".github/design-baseline.json"
BUNDLES = ROOT / ".github/css-bundles.json"
TOKENS = "css/tokens-v1.css"
TYPE = "css/type-v1.css"
CTA = "css/cta-v1.css"
# Archivos del sistema: definen los valores o los imponen, no cuentan como deuda.
SYSTEM = {TOKENS}

METRICS = {
    "colores_sueltos": re.compile(r"#[0-9a-fA-F]{3,8}\b|\brgba?\(\s*\d"),
    "important": re.compile(r"!\s*important", re.I),
    "font_size_px": re.compile(r"font-size\s*:\s*\d+(?:\.\d+)?px", re.I),
    "pesos_fuera_de_escala": re.compile(r"font-weight\s*:\s*(?!(?:(?:400|700|800|normal|bold|inherit)\b|var\())[^;}!]+", re.I),
    "anchos_fijos": re.compile(r"\b1[0-3]\d\dpx\b|calc\(\s*100%\s*-\s*\d+px\s*\)"),
}
LABELS = {
    "colores_sueltos": "colores escritos a mano (usar var(--ccs-…))",
    "important": "!important",
    "font_size_px": "font-size en px (usar var(--ccs-fs-…))",
    "pesos_fuera_de_escala": "pesos distintos de 400/700/800",
    "anchos_fijos": "anchos de contenedor fijos (usar var(--ccs-ancho))",
}


def strip_comments(text: str) -> str:
    return re.sub(r"/\*.*?\*/", "", text, flags=re.S)


def measure() -> dict[str, dict[str, int]]:
    result: dict[str, dict[str, int]] = {}
    for path in sorted(list((ROOT / "css").glob("*.css")) + list((ROOT / "css/pages").glob("*.css"))):
        rel = path.relative_to(ROOT).as_posix()
        if rel in SYSTEM:
            continue
        text = strip_comments(path.read_text(encoding="utf-8"))
        result[rel] = {name: len(rx.findall(text)) for name, rx in METRICS.items()}
    return result


def check_bundles(errors: list[str]) -> None:
    manifest = json.loads(BUNDLES.read_text(encoding="utf-8"))["bundles"]
    for path in sorted(ROOT.rglob("*.html")):
        rel = path.relative_to(ROOT)
        if any(part in {".git", ".github", "node_modules"} for part in rel.parts):
            continue
        html = path.read_text(encoding="utf-8")
        found = re.search(r'data-css-bundle="([^"]+)"', html)
        if not found or found.group(1) not in manifest:
            errors.append(f"{rel}: sin bundle CSS registrado")
            continue
        sources = manifest[found.group(1)]["sources"]
        if sources[0] != TOKENS:
            errors.append(f"{rel}: {TOKENS} debe cargarse el primero (está: {sources[0]})")
        if sources[-1] != TYPE:
            errors.append(f"{rel}: {TYPE} debe cargarse el último (está: {sources[-1]})")
        if 'href="https://www.amazon.' in html and CTA not in sources:
            errors.append(f"{rel}: tiene enlaces a Amazon y no carga {CTA}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--update", action="store_true")
    args = parser.parse_args()

    current = measure()
    if args.update:
        BASELINE.write_text(json.dumps(current, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        print(f"Línea base guardada: {len(current)} archivos CSS")
        return

    errors: list[str] = []
    check_bundles(errors)
    baseline = json.loads(BASELINE.read_text(encoding="utf-8")) if BASELINE.exists() else {}
    lower: list[str] = []
    for rel, counts in current.items():
        base = baseline.get(rel, {name: 0 for name in METRICS})
        for name, value in counts.items():
            allowed = base.get(name, 0)
            if value > allowed:
                origin = "CSS nuevo, debe empezar en 0" if rel not in baseline else f"máximo {allowed}"
                errors.append(f"{rel}: {value} {LABELS[name]} ({origin})")
            elif value < allowed:
                lower.append(f"{rel}: {name} {allowed} → {value}")

    total = {name: sum(c[name] for c in current.values()) for name in METRICS}
    if errors:
        print("DESIGN_AUDIT_FAIL: el cambio se sale del sistema de diseño común (css/tokens-v1.css)")
        for error in errors:
            print(f"  - {error}")
        sys.exit(1)
    print("OK: sistema de diseño · orden de carga correcto y sin deuda visual nueva · "
          + ", ".join(f"{k} {v}" for k, v in total.items()))
    if lower:
        print(f"  Deuda reducida en {len(lower)} valores: ejecutar con --update para fijar la nueva línea base")


if __name__ == "__main__":
    main()
