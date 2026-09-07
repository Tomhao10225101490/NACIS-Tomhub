#!/usr/bin/env python3
"""Build a same-origin Bilibili clip index so mainland playback does not need live search."""

from __future__ import annotations

import http.cookiejar
import json
import ssl
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/data/clip-map.json"
WORDS = Path("/tmp/clip-words.txt")
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)


def opener():
    ctx = ssl.create_default_context()
    cj = http.cookiejar.CookieJar()
    op = urllib.request.build_opener(
        urllib.request.HTTPCookieProcessor(cj),
        urllib.request.HTTPSHandler(context=ctx),
    )
    op.addheaders = [("User-Agent", UA)]
    op.open("https://www.bilibili.com/", timeout=15)
    return op


def query_for(word: str) -> str:
    return f"{word} 英语单词" if len(word) <= 3 else f"{word} 英语"


def fetch_bvids(op, word: str) -> list[str]:
    q = urllib.parse.quote(query_for(word))
    url = (
        "https://api.bilibili.com/x/web-interface/search/type"
        f"?search_type=video&keyword={q}&page=1&order=totalrank"
    )
    req = urllib.request.Request(
        url,
        headers={
            "Referer": "https://search.bilibili.com/",
            "Accept": "application/json",
        },
    )
    last: Exception | None = None
    for attempt in range(5):
        try:
            with op.open(req, timeout=14) as resp:
                data = json.loads(resp.read())
            if data.get("code") != 0:
                raise RuntimeError(f"code {data.get('code')}")
            result = (data.get("data") or {}).get("result") or []
            ids: list[str] = []
            seen: set[str] = set()
            for it in result:
                bvid = isinstance(it, dict) and it.get("bvid")
                if not bvid or bvid in seen:
                    continue
                seen.add(bvid)
                ids.append(bvid)
                if len(ids) >= 3:
                    break
            return ids
        except Exception as exc:  # noqa: BLE001
            last = exc
            time.sleep(0.45 * (attempt + 1))
    raise last or RuntimeError("search failed")


def main() -> None:
    words = [w.strip() for w in WORDS.read_text().splitlines() if w.strip()]
    existing: dict[str, list[str]] = {}
    if OUT.exists():
        try:
            existing = json.loads(OUT.read_text())
        except json.JSONDecodeError:
            existing = {}
    pending = [w for w in words if w not in existing or not existing.get(w)]
    print(f"words={len(words)} cached={len(existing)} pending={len(pending)}", flush=True)
    op = opener()
    ok = fail = 0
    t0 = time.time()

    def save() -> None:
        OUT.write_text(json.dumps(existing, ensure_ascii=False, separators=(",", ":")))

    with ThreadPoolExecutor(max_workers=4) as pool:
        futs = {pool.submit(fetch_bvids, op, w): w for w in pending}
        for i, fut in enumerate(as_completed(futs), 1):
            word = futs[fut]
            try:
                ids = fut.result()
                if ids:
                    existing[word] = ids
                ok += 1
            except Exception as exc:  # noqa: BLE001
                fail += 1
                print(f"FAIL {word} {exc}", flush=True)
            if i % 40 == 0 or i == len(futs):
                save()
                print(
                    f"progress {i}/{len(futs)} ok={ok} fail={fail} "
                    f"mapped={len(existing)} sec={time.time() - t0:.1f}",
                    flush=True,
                )
    save()
    print(f"done mapped={len(existing)} fail={fail} sec={time.time() - t0:.1f}", flush=True)


if __name__ == "__main__":
    main()
