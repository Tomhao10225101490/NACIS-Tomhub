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


# Hard fixes where the public vocab scrape is wrong / OCR-misaligned vs PEP 2019 lists.
ZH_OVERRIDES: dict[tuple[str, str], str] = {
    ("b2", "attack"): "攻击；抨击",
    ("b2", "app"): "应用程序；应用软件",
    ("b2", "paraphrase"): "释义；（用更容易理解的文字）解释",
    ("b2", "ache"): "疼痛",
    ("b2", "outline"): "概述；概要；轮廓",
    ("x1", "swiss"): "瑞士的；瑞士人",
    ("x2", "consist"): "由……组成",
    ("x2", "dramatic"): "戏剧性的；急剧的；激动人心的",
    ("x2", "tremendous"): "巨大的；极大的",
    ("x2", "slap"): "打；拍",
    ("x3", "broadcast"): "播送；广播；传播；广播节目；电视节目",
    ("x3", "sympathetically"): "同情地；赞同地",
    ("x3", "rhyme"): "押韵词；押韵的短诗；（使）押韵",
    ("x3", "contest"): "比赛；竞赛；竞争；争取赢得",
    ("x4", "salary"): "薪水；薪金（月薪）",
    ("x4", "guilty"): "内疚的；有罪的；有过失的",
    ("x4", "suspend"): "悬；挂；暂停；暂缓",
}


def is_derivative_junk(chinese: str, headword: str) -> bool:
    """Skip senses that are clearly another word’s gloss glued onto this entry."""
    z = (chinese or "").strip()
    if not z:
        return True
    m = re.match(r"^([A-Za-z][A-Za-z'-]*)", z)
    if not m:
        return False
    first = m.group(1).lower()
    head = headword.lower().strip()
    head0 = re.split(r"[\s/-]+", head)[0]
    # e.g. mood ← "moody …", contest ← "contestant …", guilty ← "guilt …"
    if first == head or first == head0:
        return False
    if first.startswith(head0) and len(first) > len(head0) + 1:
        return True
    # unrelated English lemma at start with some Chinese after
    if re.search(r"[\u4e00-\u9fff]", z):
        return True
    return True


def clean_zh_text(raw: str, headword: str = "") -> str:
    """Normalize a Chinese gloss: drop POS tags, Latin leftovers, keep Chinese senses."""
    t = (raw or "").replace(";", "；").replace(":", "；").strip()
    t = re.sub(r"/[^/\n]{0,48}/", "", t)

    def keep_paren(m: re.Match[str]) -> str:
        inner = m.group(1)
        has_zh = bool(re.search(r"[\u4e00-\u9fff]", inner))
        has_en = bool(re.search(r"[A-Za-z]{2,}", inner))
        if has_en and not has_zh:
            return ""
        if has_en and has_zh:
            inner = re.sub(r"[A-Za-z][A-Za-z'./\s-]{0,40}", "", inner)
            inner = inner.strip(" ；;，,")
            return f"（{inner}）" if inner else ""
        return f"（{inner}）"

    t = re.sub(r"[（(]([^）)]*)[）)]", keep_paren, t)
    t = re.sub(
        r"(?:^|[；\s])(?:n|v|vi|vt|adj|adv|prep|conj|pron|num|art|int|aux|modal|pl)\.?\s*"
        r"(?:&?\s*(?:n|v|vi|vt|adj|adv)\.?\s*)*",
        "；",
        t,
        flags=re.I,
    )
    t = re.sub(
        r"\b(?:n|v|vi|vt|adj|adv|prep|conj|pron|num|art|int|aux|modal|pl)\.\s*",
        "",
        t,
        flags=re.I,
    )
    if headword:
        t = re.sub(re.escape(headword), "", t, flags=re.I)
    # Drop remaining Latin runs (OCR / bilingual leftovers).
    t = re.sub(r"[A-Za-z][A-Za-z'./-]{0,40}(?:\s+[A-Za-z][A-Za-z'./-]{0,40})*", "", t)
    # Drop leftover OCR punctuation (do NOT strip Chinese parentheses).
    t = re.sub(r"[\]|,/\\]+", "；", t)
    t = re.sub(r"\s+", "", t)
    t = re.sub(r"[；]{2,}", "；", t).strip("；，,、.．")
    t = t.replace("......", "……").replace("…", "……")
    t = re.sub(r"……+", "……", t)
    return t


POS_OVERRIDES: dict[tuple[str, str], str] = {
    ("b2", "attack"): "n. / vi. & vt.",
    ("b2", "ache"): "vi. / n.",
    ("b2", "outline"): "n. / vt.",
    ("b2", "paraphrase"): "n. / vi. & vt.",
    ("x2", "consist"): "vi.",
    ("x2", "slap"): "vt. / n.",
    ("x3", "broadcast"): "vt. & vi. / n.",
    ("x3", "sympathetically"): "adv.",
    ("x4", "salary"): "n.",
}


def join_pos(meanings: list[dict], headword: str = "") -> str:
    seen = []
    for m in meanings:
        if is_derivative_junk(m.get("chinese") or "", headword):
            continue
        p = (m.get("pos") or "").strip()
        # Skip bogus POS when the chinese is clearly for another word class glued wrong.
        if p and p not in seen:
            seen.append(p)
    return " / ".join(seen) if seen else "n."


def join_zh(meanings: list[dict], headword: str = "") -> str:
    seen: list[str] = []
    for m in meanings:
        z_raw = (m.get("chinese") or "").strip()
        if is_derivative_junk(z_raw, headword):
            continue
        z = clean_zh_text(z_raw, headword)
        if not z:
            continue
        for bit in re.split(r"[；;]", z):
            bit = bit.strip(" ；;，,")
            if bit and bit not in seen:
                seen.append(bit)
    return "；".join(seen)


def zh_short(zh: str) -> str:
    raw = (zh or "").split("；")[0].split("，")[0].strip()
    if len(raw) > 18:
        raw = raw[:18].rstrip("，,；、 ") + "…"
    return raw or (zh or "").split("；")[0].strip() or "（释义）"


def primary_pos_kind(pos: str) -> str:
    first = (pos or "").split("/")[0].strip().lower()
    if "短语" in (pos or ""):
        return "phrase"
    if "专有" in (pos or ""):
        return "proper"
    if first.startswith("adj"):
        return "adj"
    if first.startswith("adv"):
        return "adv"
    if first.startswith("prep"):
        return "prep"
    if first.startswith("conj"):
        return "conj"
    if first.startswith("v") or "vt" in first or "vi" in first:
        return "verb"
    if first.startswith("n"):
        return "noun"
    return "other"


def scrub_answer(text: str, word: str) -> str:
    if not text or not word:
        return text
    if " " in word:
        return re.sub(re.escape(word), "…", text, flags=re.I)
    return re.sub(rf"\b{re.escape(word)}\b", "…", text, flags=re.I)


def en_def(word: str, pos: str, zh: str) -> str:
    """English gloss for flash tips — must NEVER include the headword (spot-check safe)."""
    z = zh_short(zh)
    kind = primary_pos_kind(pos)
    if kind == "phrase":
        out = f'a set phrase meaning “{z}”'
    elif kind == "proper":
        out = f'a proper name / term for “{z}”'
    elif kind == "adj":
        out = f'adjective meaning “{z}”'
    elif kind == "adv":
        out = f'adverb meaning “{z}”'
    elif kind == "prep":
        out = f'preposition meaning “{z}”'
    elif kind == "conj":
        out = f'conjunction meaning “{z}”'
    elif kind == "verb":
        out = f'verb meaning “{z}”'
    elif kind == "noun":
        out = f'noun meaning “{z}”'
    else:
        out = f'meaning “{z}”'
    out = scrub_answer(out, word)
    if not out or prompt_leaks(out, word):
        return "see the Chinese gloss for meaning"
    return out


def prompt_leaks(text: str, word: str) -> bool:
    if not text or not word:
        return False
    if " " in word or re.search(r"[^a-zA-Z0-9']", word):
        return word.lower() in text.lower()
    return bool(re.search(rf"\b{re.escape(word)}\b", text, flags=re.I))


EXAMPLE_OVERRIDES: dict[tuple[str, str], tuple[str, str]] = {
    ("b1", "exchange"): ("They exchange ideas after class.", "课后他们互相交流想法。"),
    ("b1", "lecture"): ("We listened to a lecture on history.", "我们听了一场历史讲座。"),
    ("b1", "registration"): ("Complete the registration on the first day.", "第一天请完成登记。"),
    ("b1", "register"): ("Please register at the front desk.", "请到前台登记。"),
    ("b1", "campus"): ("The new library stands in the centre of campus.", "新图书馆位于校园中心。"),
    ("b1", "anxious"): ("She felt anxious before the exam.", "考试前她感到焦虑。"),
    ("b1", "annoyed"): ("He was annoyed by the noise.", "噪音让他很恼火。"),
    ("b1", "design"): ("They design a poster for the club.", "他们为社团设计海报。"),
    ("b1", "female"): ("The female students sat in the front row.", "女生坐在前排。"),
    ("b1", "male"): ("The male lead in the play is my classmate.", "这部戏的男主角是我同学。"),
    ("b1", "nationality"): ("Please write your nationality on the form.", "请在表格上填写国籍。"),
    ("b1", "formal"): ("Wear formal clothes to the ceremony.", "典礼上要穿正装。"),
    ("b1", "revise"): ("I will revise my essay tonight.", "今晚我会修改作文。"),
}


def example_pair(word: str, pos: str, zh: str, book_id: str = "") -> tuple[str, str]:
    """Short practice examples. Flashcards already show the word on the front."""
    ov = EXAMPLE_OVERRIDES.get((book_id, word.lower()))
    if ov:
        return ov
    kind = primary_pos_kind(pos)
    z = zh_short(zh)
    if kind == "phrase" or " " in word:
        return (
            f"This phrase means “{z}” in the unit.",
            f"这个短语在本单元表示「{z}」。",
        )
    if kind == "proper":
        return (
            f"This name refers to “{z}”.",
            f"这个名称指「{z}」。",
        )
    if kind == "adj":
        return (
            f"The result looks {word} to everyone.",
            f"这个结果在大家看来很{z}。",
        )
    if kind == "adv":
        return (
            f"She spoke {word} in the meeting.",
            f"她在会上{z}地发言。",
        )
    if kind == "prep" or kind == "conj":
        return (
            f"This small word ({z}) links two ideas.",
            f"这个词用来连接两个意思（{z}）。",
        )
    if kind == "verb":
        return (
            f"Many students {word} after school.",
            f"许多学生放学后会{z}。",
        )
    return (
        f"We learned a new {word} in this lesson.",
        f"这节课我们学了一个表示「{z}」的词。",
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
        pos = POS_OVERRIDES.get((bid, word.lower())) or join_pos(meanings, word)
        override = ZH_OVERRIDES.get((bid, word.lower()))
        zh = override or join_zh(meanings, word) or word
        zh = clean_zh_text(zh, word) or zh
        if prompt_leaks(zh, word):
            zh = scrub_answer(zh, word).replace("…", "").strip("；，, ") or zh_short(zh)
        seq[bid] += 1
        en_ex, zh_ex = example_pair(word, pos, zh, bid)
        zh_ex = scrub_answer(zh_ex, word) or zh_ex
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
