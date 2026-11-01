from __future__ import annotations

import json
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse

import pytest


ROOT = Path(__file__).resolve().parents[1]


class LinkCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.targets: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attribute = "href" if tag in {"a", "link"} else "src" if tag == "script" else None
        if not attribute:
            return
        values = dict(attrs)
        if values.get(attribute):
            self.targets.append(values[attribute] or "")


def run(command: list[str], *, cwd: Path = ROOT) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, cwd=cwd, capture_output=True, text=True)


@pytest.fixture(scope="session")
def built_site(tmp_path_factory: pytest.TempPathFactory) -> Path:
    assets = run(["pnpm", "run", "build:assets"])
    assert assets.returncode == 0, assets.stderr

    output_dir = tmp_path_factory.mktemp("pelican-output")
    site = run(
        [
            sys.executable,
            "-m",
            "pelican",
            "content",
            "--settings",
            "pelicanconf.py",
            "--output",
            str(output_dir),
        ]
    )
    assert site.returncode == 0, site.stderr
    return output_dir


def test_homepage_combines_pelican_content_and_vue_assets(built_site: Path) -> None:
    index = (built_site / "index.html").read_text(encoding="utf-8")

    assert "Reality is but" in index
    assert "Latest dispatches" in index
    assert "id=\"vue-tools\"" in index
    assert "type=\"module\"" in index
    assert "fonts.googleapis.com" in index
    assert "Skip to the journal" in index

    assets = built_site / "theme" / "dist" / "assets"
    assert list(assets.glob("*.js")), "Vite JavaScript bundle was not copied by Pelican"
    assert list(assets.glob("*.css")), "Vite stylesheet was not copied by Pelican"


def test_vue_island_uses_pure_vapor_mode() -> None:
    package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
    entry = (ROOT / "frontend" / "main.js").read_text(encoding="utf-8")
    component = (ROOT / "frontend" / "App.vue").read_text(encoding="utf-8")

    assert package["dependencies"]["vue"] == "3.6.0-rc.2"
    assert "createVaporApp" in entry
    assert "createApp(" not in entry
    assert "<script setup vapor>" in component


def test_article_archive_and_colophon_are_generated(built_site: Path) -> None:
    article = built_site / "journal" / "2026" / "reality-is-but-an-illusion" / "index.html"
    archive = built_site / "archive" / "index.html"
    colophon = built_site / "about" / "index.html"
    not_found = built_site / "404.html"

    assert article.exists()
    assert archive.exists()
    assert colophon.exists()
    assert not_found.exists()
    assert "End of dispatch" in article.read_text(encoding="utf-8")
    assert "Making Things That Last" in archive.read_text(encoding="utf-8")
    assert "Pelican turns plain-text entries" in colophon.read_text(encoding="utf-8")


def test_search_index_is_valid_and_complete(built_site: Path) -> None:
    search_index = json.loads((built_site / "search.json").read_text(encoding="utf-8"))

    assert len(search_index) == 3
    assert {entry["title"] for entry in search_index} == {
        "Reality Is But an Illusion",
        "The Quiet Work of Attention",
        "Making Things That Last",
    }
    assert all(entry["url"].startswith("/journal/2026/") for entry in search_index)


def test_custom_domain_is_preserved(built_site: Path) -> None:
    cname = built_site / "CNAME"
    assert cname.exists()
    assert cname.read_text(encoding="utf-8").strip() == "woodson42.com"


def test_every_generated_internal_link_resolves(built_site: Path) -> None:
    failures: list[str] = []

    for html_file in built_site.rglob("*.html"):
        collector = LinkCollector()
        collector.feed(html_file.read_text(encoding="utf-8"))
        page_url = "/" + html_file.relative_to(built_site).as_posix()

        for target in collector.targets:
            if target.startswith(("#", "http://", "https://", "mailto:", "data:")):
                continue
            resolved = unquote(urlparse(urljoin(page_url, target)).path).lstrip("/")
            candidate = built_site / resolved
            if resolved.endswith("/"):
                candidate /= "index.html"
            if not candidate.exists():
                failures.append(f"{html_file.relative_to(built_site)} -> {target}")

    assert not failures, "Broken generated links:\n" + "\n".join(failures)
