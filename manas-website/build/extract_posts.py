"""Migrates every existing blog article (URL, title, meta, dates, body) from the live site
into build/data/posts.json so the new site serves the same URLs with the same content depth.
Body HTML is rebuilt from a strict whitelist of tags (no Elementor markup, no inline styles)."""
import html, json, os, re, sys, urllib.request
from html.parser import HTMLParser

BASE = "https://manaslifestyleresort.in"
KEEP = {"h2", "h3", "h4", "p", "ul", "ol", "li", "a", "strong", "b", "em", "i", "table", "thead", "tbody", "tr", "td", "th", "br", "blockquote"}
DROP_TEXT = ("A unit of Ashoka Group",)


def fetch(u):
    req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", "ignore")


class Body(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out, self.skip, self.started, self.stopped = [], 0, False, False
        self.h1 = ""
        self._in_h1 = False

    def handle_starttag(self, t, a):
        if self.stopped:
            return
        if t in ("script", "style", "noscript", "svg", "form", "button", "nav", "iframe"):
            self.skip += 1
            return
        if t == "h1":
            self.started = True
            self._in_h1 = True
            return
        if not self.started or self.skip or t not in KEEP:
            return
        if t == "a":
            href = dict(a).get("href") or ""
            if href.startswith(BASE):
                href = href[len(BASE):] or "/"
            if not href or href.startswith("#"):
                self.out.append("<a>")
                return
            ext = "" if href.startswith("/") or href.startswith("tel:") or href.startswith("mailto:") else ' rel="noopener" target="_blank"'
            self.out.append(f'<a href="{html.escape(href, quote=True)}"{ext}>')
        else:
            self.out.append(f"<{t}>")

    def handle_endtag(self, t):
        if self.stopped:
            return
        if t in ("script", "style", "noscript", "svg", "form", "button", "nav", "iframe"):
            self.skip = max(0, self.skip - 1)
            return
        if t == "h1":
            self._in_h1 = False
            return
        if self.started and not self.skip and t in KEEP and t != "br":
            self.out.append(f"</{t}>")

    def handle_data(self, d):
        if self._in_h1:
            self.h1 += d
            return
        if self.stopped or not self.started or self.skip:
            return
        if any(s in d for s in DROP_TEXT):
            self.stopped = True
            return
        self.out.append(html.escape(d, quote=False))


def clean(s):
    s = re.sub(r"<a>(.*?)</a>", r"\1", s, flags=re.S)
    s = re.sub(r"\s+", " ", s)
    for _ in range(4):
        s = re.sub(r"<(p|li|h2|h3|h4|strong|em|b|i|ul|ol)>\s*</\1>", "", s)
    s = re.sub(r"<b>", "<strong>", s).replace("</b>", "</strong>")
    s = re.sub(r"<i>", "<em>", s).replace("</i>", "</em>")
    s = re.sub(r"\s*(</?(?:h2|h3|h4|p|ul|ol|li|table|tr|blockquote)>)\s*", r"\1", s)
    s = re.sub(r"(</(?:h2|h3|h4|p|ul|ol|table|blockquote)>)", r"\1\n", s)
    return s.strip()


def meta(h, name):
    m = re.search(rf'<meta[^>]+(?:name|property)="{re.escape(name)}"[^>]+content="([^"]*)"', h)
    return html.unescape(m.group(1)) if m else ""


def main():
    urls = [l.strip() for l in open(sys.argv[1]) if l.strip()]
    posts = []
    for u in urls:
        h = fetch(u)
        p = Body()
        p.feed(h)
        title = html.unescape(re.search(r"<title>(.*?)</title>", h, re.S).group(1)).strip()
        dp = re.search(r'"datePublished":"([^"]+)"', h)
        dm = re.search(r'"dateModified":"([^"]+)"', h)
        body = clean("".join(p.out))
        posts.append({
            "slug": u.rstrip("/").split("/")[-1],
            "url": u.replace(BASE, ""),
            "title": title,
            "description": meta(h, "description"),
            "h1": re.sub(r"\s+", " ", p.h1).strip(),
            "image": meta(h, "og:image"),
            "datePublished": dp.group(1) if dp else "",
            "dateModified": dm.group(1) if dm else "",
            "html": body,
            "words": len(re.sub(r"<[^>]+>", " ", body).split()),
        })
        print(f"{posts[-1]['words']:5d} words  {u}", flush=True)
    os.makedirs("build/data", exist_ok=True)
    json.dump(posts, open("build/data/posts.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
