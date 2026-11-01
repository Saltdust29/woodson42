from __future__ import annotations

import json
import os
from pathlib import Path


ROOT = Path(__file__).parent
VITE_MANIFEST = ROOT / "theme" / "static" / "dist" / ".vite" / "manifest.json"
VITE_DEV_SERVER = os.environ.get("VITE_DEV_SERVER", "").rstrip("/")


def vite_entry(source: str) -> dict[str, object]:
    """Resolve a Vite entry and all of its transitive CSS/preload assets."""
    if VITE_DEV_SERVER:
        return {
            "client": f"{VITE_DEV_SERVER}/@vite/client",
            "file": f"{VITE_DEV_SERVER}/{source}",
            "css": [],
            "preloads": [],
            "dev": True,
        }

    if not VITE_MANIFEST.is_file():
        raise RuntimeError(
            "Vite manifest is missing. Run `pnpm run build:assets` before Pelican."
        )

    manifest = json.loads(VITE_MANIFEST.read_text(encoding="utf-8"))
    if source not in manifest:
        raise KeyError(f"Vite entry {source!r} is not present in {VITE_MANIFEST}")

    css: list[str] = []
    preloads: list[str] = []
    visited: set[str] = set()

    def add_unique(items: list[str], value: str) -> None:
        if value not in items:
            items.append(value)

    def visit_imports(chunk_key: str) -> None:
        for imported_key in manifest[chunk_key].get("imports", []):
            if imported_key in visited:
                continue
            visited.add(imported_key)
            imported = manifest[imported_key]
            for stylesheet in imported.get("css", []):
                add_unique(css, stylesheet)
            add_unique(preloads, imported["file"])
            visit_imports(imported_key)

    entry = manifest[source]
    for stylesheet in entry.get("css", []):
        add_unique(css, stylesheet)
    visit_imports(source)

    return {
        "client": "",
        "file": entry["file"],
        "css": css,
        "preloads": preloads,
        "dev": False,
    }


AUTHOR = "woodson42"
SITENAME = "woodson42"
SITE_SUBTITLE = "A personal index of code, systems, and ordinary wonder."
SITEURL = ""
PATH = "content"
TIMEZONE = "Asia/Shanghai"
DEFAULT_LANG = "en"
CURRENT_YEAR = 2026

THEME = str(ROOT / "theme")
THEME_STATIC_DIR = "theme"
THEME_STATIC_PATHS = ["static"]
OUTPUT_PATH = os.environ.get("PELICAN_OUTPUT", "output/")

DIRECT_TEMPLATES = ["index", "archives", "search"]
INDEX_SAVE_AS = "index.html"
ARCHIVES_SAVE_AS = "archive/index.html"
SEARCH_SAVE_AS = "search.json"
TEMPLATE_PAGES = {"404.html": "404.html"}

ARTICLE_PATHS = ["articles"]
ARTICLE_URL = "journal/{date:%Y}/{slug}/"
ARTICLE_SAVE_AS = "journal/{date:%Y}/{slug}/index.html"
PAGE_PATHS = ["pages"]
PAGE_URL = "{slug}/"
PAGE_SAVE_AS = "{slug}/index.html"

CATEGORY_URL = "section/{slug}/"
CATEGORY_SAVE_AS = "section/{slug}/index.html"
TAG_URL = "topic/{slug}/"
TAG_SAVE_AS = "topic/{slug}/index.html"
AUTHOR_SAVE_AS = ""
AUTHORS_SAVE_AS = ""
CATEGORIES_SAVE_AS = ""
TAGS_SAVE_AS = ""

STATIC_PATHS = ["extra/CNAME"]
EXTRA_PATH_METADATA = {"extra/CNAME": {"path": "CNAME"}}

DEFAULT_PAGINATION = 8
SUMMARY_MAX_LENGTH = 44
DEFAULT_DATE_FORMAT = "%d %B %Y"
DELETE_OUTPUT_DIRECTORY = True
RELATIVE_URLS = True

FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

JINJA_GLOBALS = {"vite_entry": vite_entry}
