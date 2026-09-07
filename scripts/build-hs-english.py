#!/usr/bin/env python3
"""Compile PEP 2019 senior English unit vocab into per-book JS modules."""
from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path("/workspace")
SRC = Path("/tmp/pep-vocab.json")
IPA_PATH = Path("/tmp/ipa/en_US.txt")
OUT = ROOT / "src/data/hs-english"

BOOK_MAP = {
    "必修第一册": "b1",
    "必修第二册": "b2",
    "必修第三册": "b3",
    "选必修第一册": "x1",
    "选必修第二册": "x2",
    "选必修第三册": "x3",
    "选必修第四册": "x4",
}

UNIT_TITLES = {
    "b1": {
        "welcome": ("Welcome Unit", "欢迎单元"),
        "u1": ("Teenage life", "少年时代"),
        "u2": ("Travelling around", "游历四方"),
        "u3": ("Sports and fitness", "运动与健身"),
        "u4": ("Natural disasters", "自然灾害"),
        "u5": ("Languages around the world", "世界上的语言"),
    },
    "b2": {
        "u1": ("Cultural Heritage", "文化遗产"),
        "u2": ("Wildlife protection", "野生动物保护"),
        "u3": ("The Internet", "互联网"),
        "u4": ("History and traditions", "历史与传统"),
        "u5": ("Music", "音乐"),
    },
    "b3": {
        "u1": ("Festivals and celebrations", "节日与庆典"),
        "u2": ("Morals and virtues", "道德与美德"),
        "u3": ("Diverse cultures", "多样的文化"),
        "u4": ("Space exploration", "太空探索"),
        "u5": ("The value of money", "金钱的价值"),
    },
    "x1": {
        "u1": ("People of achievement", "杰出人物"),
        "u2": ("Looking into the future", "展望未来"),
        "u3": ("Fascinating parks", "迷人的公园"),
        "u4": ("Body language", "肢体语言"),
        "u5": ("Working the land", "耕作大地"),
    },
    "x2": {
        "u1": ("Science and scientists", "科学与科学家"),
        "u2": ("Bridging cultures", "沟通文化"),
        "u3": ("Food and culture", "食物与文化"),
        "u4": ("Journey across a vast land", "广袤大地上的旅程"),
        "u5": ("First aid", "急救"),
    },
    "x3": {
        "u1": ("Art", "艺术"),
        "u2": ("Healthy lifestyle", "健康的生活方式"),
        "u3": ("Environmental protection", "环境保护"),
        "u4": ("Adversity and courage", "逆境与勇气"),
        "u5": ("Poems", "诗歌"),
    },
    "x4": {
        "u1": ("Science fiction", "科幻"),
        "u2": ("Iconic attractions", "标志性景点"),
        "u3": ("Sea exploration", "海洋探索"),
        "u4": ("Sharing", "分享"),
        "u5": ("Launching your career", "开启职业生涯"),
    },
}

BOOK_META = {
    "b1": {
        "series": "compulsory",
        "seriesZh": "必修",
        "seriesEn": "Compulsory",
        "n": 1,
        "zh": "必修第一册",
        "en": "Compulsory 1",
        "accent": "#fb7185",
        "spine": "#be123c",
    },
    "b2": {
        "series": "compulsory",
        "seriesZh": "必修",
        "seriesEn": "Compulsory",
        "n": 2,
        "zh": "必修第二册",
        "en": "Compulsory 2",
        "accent": "#2dd4bf",
        "spine": "#0f766e",
    },
    "b3": {
        "series": "compulsory",
        "seriesZh": "必修",
        "seriesEn": "Compulsory",
        "n": 3,
        "zh": "必修第三册",
        "en": "Compulsory 3",
        "accent": "#c084fc",
        "spine": "#6d28d9",
    },
    "x1": {
        "series": "selective",
        "seriesZh": "选必",
        "seriesEn": "Selective",
        "n": 1,
        "zh": "选择性必修第一册",
        "en": "Selective 1",
        "accent": "#60a5fa",
        "spine": "#1d4ed8",
    },
    "x2": {
        "series": "selective",
        "seriesZh": "选必",
        "seriesEn": "Selective",
        "n": 2,
        "zh": "选择性必修第二册",
        "en": "Selective 2",
        "accent": "#fbbf24",
        "spine": "#b45309",
    },
    "x3": {
        "series": "selective",
        "seriesZh": "选必",
        "seriesEn": "Selective",
        "n": 3,
        "zh": "选择性必修第三册",
        "en": "Selective 3",
        "accent": "#34d399",
        "spine": "#047857",
    },
    "x4": {
        "series": "selective",
        "seriesZh": "选必",
        "seriesEn": "Selective",
        "n": 4,
        "zh": "选择性必修第四册",
        "en": "Selective 4",
        "accent": "#f59e0b",
        "spine": "#1e3a8a",
    },
}


def load_ipa() -> dict[str, str]:
    table: dict[str, str] = {}
    if not IPA_PATH.exists():
        return table
    for line in IPA_PATH.read_text(encoding="utf-8", errors="replace").splitlines():
        if "\t" not in line:
            continue
        word, ipa = line.split("\t", 1)
        key = word.strip().lower().strip("'")
        ipa = ipa.strip().split(",")[0].strip()
        if key and ipa and key not in table:
            table[key] = ipa if ipa.startswith("/") else f"/{ipa.strip('/')}/"
    return table


def unit_id_from_source(unit: str) -> str:
    u = unit.strip()
    if u.lower().startswith("welcome"):
        return "welcome"
    m = re.search(r"(\d+)", u)
    if m:
        return f"u{int(m.group(1))}"
    return re.sub(r"[^a-z0-9]+", "-", u.lower()).strip("-") or "u1"


def clean_headword(raw: str) -> tuple[str, str]:
    text = str(raw or "").strip()
    embedded = ""
    m = re.search(r"/([^/]{2,})/", text)
    if m and not m.group(1).startswith("-"):
        embedded = f"/{m.group(1)}/"
    text = re.split(r"\s+abbr\.?\s*", text, maxsplit=1, flags=re.I)[0]
    text = re.sub(r"\s*\[[^\]]*\]", "", text)
    text = re.sub(r"\s*\([^)]*\)", "", text)
    text = re.sub(r"\s+", " ", text).strip(" .,;:")
    return text, embedded


def lookup_ipa(word: str, table: dict[str, str], embedded: str) -> str:
    if embedded:
        return embedded
    key = word.lower().strip()
    if key in table:
        return table[key]
    # try first token of phrases
    tokens = re.findall(r"[a-zA-Z']+", key)
    if len(tokens) == 1:
        return table.get(tokens[0], "")
    parts = [table.get(t, "") for t in tokens if t not in {"a", "an", "the", "of", "to", "and", "or"}]
    if parts and all(parts):
        inner = " ".join(p.strip("/") for p in parts)
        return f"/{inner}/"
    return ""


def join_pos(meanings: list[dict]) -> str:
    seen = []
    for m in meanings:
        p = (m.get("pos") or "").strip()
        if p and p not in seen:
            seen.append(p)
    return " / ".join(seen) if seen else "n."


def join_zh(meanings: list[dict]) -> str:
    seen = []
    for m in meanings:
        z = (m.get("chinese") or "").strip()
        for bit in re.split(r"[；;]", z):
            bit = bit.strip()
            if bit and bit not in seen:
                seen.append(bit)
    return "；".join(seen)


def en_def(word: str, pos: str, zh: str) -> str:
    p = (pos or "").lower()
    if "短语" in pos:
        return f'an expression meaning “{zh}”'
    if "专有" in pos:
        return f"a proper name or term: {zh}"
    if p.startswith("adj"):
        return f'describing something as “{zh}”'
    if p.startswith("adv"):
        return f'in a way that is “{zh}”'
    if p.startswith("prep"):
        return f'a preposition meaning “{zh}”'
    if p.startswith("conj"):
        return f'a conjunction meaning “{zh}”'
    if "vt" in p or "vi" in p or p.startswith("v"):
        return f"to {word} — {zh}"
    return f"{word} — {zh}"


def example_pair(word: str, pos: str, zh: str) -> tuple[str, str]:
    p = (pos or "").lower()
    zh_short = zh.split("；")[0].split(";")[0].split("，")[0].strip()
    if " " in word or "短语" in pos:
        return (
            f'Students should remember the phrase “{word}”.',
            f"同学们应记住短语「{word}」（{zh_short}）。",
        )
    if "专有" in pos:
        return (
            f"{word} is introduced in this unit.",
            f"本单元介绍了{word}（{zh_short}）。",
        )
    if p.startswith("adj"):
        return (
            f"They described the idea as {word}.",
            f"他们认为这个想法是{zh_short}的。",
        )
    if p.startswith("adv"):
        return (
            f"She answered {word}.",
            f"她{zh_short}地回答。",
        )
    if p.startswith("prep") or p.startswith("conj"):
        return (
            f"Pay attention to how we use “{word}”.",
            f"注意「{word}」（{zh_short}）的用法。",
        )
    if "vt" in p or "vi" in p or p.startswith("v"):
        return (
            f"We {word} when we need to.",
            f"需要时我们会{zh_short}。",
        )
    return (
        f"This {word} is useful in daily life.",
        f"这个{zh_short}在日常生活中很有用。",
    )


def js_module(book_id: str, words: list[dict]) -> str:
    payload = json.dumps(words, ensure_ascii=False, indent=2)
    return (
        f"/** PEP 2019 senior English · {BOOK_META[book_id]['zh']} */\n"
        f"export const bookId = {json.dumps(book_id)};\n"
        f"export const words = {payload};\n"
    )


def write_meta(counts: dict[str, dict[str, int]], total: int) -> None:
    books = []
    for bid, info in BOOK_META.items():
        units = []
        titles = UNIT_TITLES[bid]
        for uid, (en, zh) in titles.items():
            n = 0 if uid == "welcome" else int(uid[1:])
            units.append(
                {
                    "id": uid,
                    "n": n,
                    "en": en,
                    "zh": zh,
                    "wordCount": counts.get(bid, {}).get(uid, 0),
                }
            )
        books.append(
            {
                "id": bid,
                "series": info["series"],
                "seriesZh": info["seriesZh"],
                "seriesEn": info["seriesEn"],
                "n": info["n"],
                "zh": info["zh"],
                "en": info["en"],
                "accent": info["accent"],
                "spine": info["spine"],
                "wordCount": sum(counts.get(bid, {}).values()),
                "units": units,
            }
        )
    meta_js = f"""/** Lightweight PEP 2019 high-school English book index (no word bank). */
export const HS_WORD_TOTAL = {total};
export const HS_BOOKS = {json.dumps(books, ensure_ascii=False, indent=2)};

export function getHsBook(id) {{
  return HS_BOOKS.find((b) => b.id === id) || null;
}}

export function getHsUnit(book, unitId) {{
  if (!book) return null;
  return (book.units || []).find((u) => u.id === unitId) || null;
}}
"""
    (OUT / "meta.js").write_text(meta_js, encoding="utf-8")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    ipa = load_ipa()
    raw = json.loads(SRC.read_text(encoding="utf-8"))
    by_book: dict[str, list[dict]] = defaultdict(list)
    counts: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    seq: dict[str, int] = defaultdict(int)

    for item in raw:
        bid = BOOK_MAP.get(item.get("book"))
        if not bid:
            continue
        uid = unit_id_from_source(item.get("unit") or "")
        titles = UNIT_TITLES[bid]
        if uid not in titles:
            continue
        word, embedded = clean_headword(item.get("english") or "")
        if not word:
            continue
        meanings = item.get("meanings") or []
        pos = join_pos(meanings)
        zh = join_zh(meanings) or word
        seq[bid] += 1
        en_ex, zh_ex = example_pair(word, pos, zh)
        entry = {
            "id": f"{bid}-{seq[bid]:04d}",
            "bookId": bid,
            "unit": uid,
            "unitTitle": titles[uid][0],
            "word": word,
            "phonetic": lookup_ipa(word, ipa, embedded),
            "pos": pos,
            "zh": zh,
            "enDef": en_def(word, pos, zh),
            "example": en_ex,
            "exampleZh": zh_ex,
        }
        by_book[bid].append(entry)
        counts[bid][uid] += 1

    total = 0
    for bid in BOOK_META:
        words = by_book[bid]
        total += len(words)
        (OUT / f"{bid}.js").write_text(js_module(bid, words), encoding="utf-8")
        print(bid, len(words), dict(counts[bid]))
    write_meta(counts, total)
    print("TOTAL", total)


if __name__ == "__main__":
    main()
