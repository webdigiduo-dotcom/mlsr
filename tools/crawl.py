import json, re, sys, urllib.request, html
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
BASE="https://manaslifestyleresort.in"
class P(HTMLParser):
    def __init__(s):
        super().__init__(); s.title=""; s.meta={}; s.canon=""; s.h=[]; s.imgs=[]; s.links=set(); s.ld=[]; s._t=None; s._buf=""; s.text=[] ; s._skip=0
    def handle_starttag(s,t,a):
        a=dict(a)
        if t in("script","style","noscript"):
            s._skip+=1
            if t=="script" and a.get("type")=="application/ld+json": s._t="ld"; s._buf=""
        if t=="title": s._t="title"; s._buf=""
        if t=="meta":
            k=a.get("name") or a.get("property")
            if k: s.meta[k]=a.get("content","")
        if t=="link" and a.get("rel")=="canonical": s.canon=a.get("href","")
        if t in("h1","h2","h3","h4"): s._t=t; s._buf=""
        if t=="img":
            src=a.get("data-src") or a.get("data-lazy-src") or a.get("src","")
            if src and not src.startswith("data:"): s.imgs.append((src,a.get("alt","")))
        if t=="a" and a.get("href"):
            u=urljoin(BASE+"/",a["href"]).split("#")[0]
            s.links.add(u)
    def handle_endtag(s,t):
        if t in("script","style","noscript"):
            s._skip=max(0,s._skip-1)
            if s._t=="ld": s.ld.append(s._buf); s._t=None
        if t=="title" and s._t=="title": s.title=s._buf.strip(); s._t=None
        if t in("h1","h2","h3","h4") and s._t==t: s.h.append((t,re.sub(r"\s+"," ",s._buf).strip())); s._t=None
    def handle_data(s,d):
        if s._t: s._buf+=d
        if not s._skip: 
            d=d.strip()
            if d: s.text.append(d)
def fetch(u):
    r=urllib.request.Request(u,headers={"User-Agent":"Mozilla/5.0"})
    with urllib.request.urlopen(r,timeout=40) as f: return f.status, f.geturl(), f.read().decode("utf-8","ignore")
urls=[l.strip() for f in sys.argv[1:] for l in open(f) if l.strip()]
out=[]
for u in urls:
    try:
        st,fu,body=fetch(u); p=P(); p.feed(body)
        types=re.findall(r'"@type"\s*:\s*"([^"]+)"'," ".join(p.ld))
        out.append(dict(url=u,status=st,final=fu,title=html.unescape(p.title),desc=p.meta.get("description",""),robots=p.meta.get("robots",""),canonical=p.canon,og_image=p.meta.get("og:image",""),headings=p.h,images=p.imgs,internal=sorted(l for l in p.links if urlparse(l).netloc.endswith("manaslifestyleresort.in")),external=sorted(l for l in p.links if not urlparse(l).netloc.endswith("manaslifestyleresort.in")),schema=sorted(set(types)),text="\n".join(p.text)))
        print("OK",st,u,file=sys.stderr)
    except Exception as e:
        out.append(dict(url=u,error=str(e))); print("ERR",u,e,file=sys.stderr)
json.dump(out,open("crawl/crawl.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
