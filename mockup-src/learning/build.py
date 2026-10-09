#!/usr/bin/env python3
"""ประกอบ mockup ชุด Learning Space (แบบที่ 3) → design-mockups/learning/

แต่ละไฟล์ใน pages/ เริ่มด้วย front matter เป็น JSON ใน HTML comment บรรทัดแรก:
  <!--{"title": "...", "nav": "news", "h1": "...", "lead": "...", "crumb": [["ข่าวสาร", "news.html"], ["หน้านี้", null]]}-->
ที่เหลือคือเนื้อหาใน <main> ส่วน header/footer/ไอคอน/CSS/JS ใช้ร่วมกันทุกหน้า

รัน:  python3 mockup-src/learning/build.py
"""
import json
import re
from pathlib import Path

SRC = Path(__file__).resolve().parent
OUT = SRC.parent.parent / "design-mockups" / "learning"

NAV = [
    ("index", "index.html", "หน้าแรก"),
    ("about", "about.html", "เกี่ยวกับ"),
    ("news", "news.html", "ข่าวสาร"),
    ("learn", "learn.html", "เรียนรู้อาเซียน"),
    ("tips", "tips.html", "เกร็ดน่ารู้"),
    ("gallery", "gallery.html", "คลังภาพ"),
    ("contact", "contact.html", "ติดต่อ"),
]

EXTRA_ICONS = """
  <symbol id="i-mail" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></symbol>
  <symbol id="i-link" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></symbol>
  <symbol id="i-chev-l" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></symbol>
  <symbol id="i-monitor" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></symbol>
  <symbol id="i-tv" viewBox="0 0 24 24"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></symbol>
  <symbol id="i-board" viewBox="0 0 24 24"><rect width="18" height="12" x="3" y="3" rx="2"/><path d="M7 21l5-6 5 6"/><path d="M7 8h6"/><path d="M7 11h10"/></symbol>
  <symbol id="i-lang" viewBox="0 0 24 24"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></symbol>
  <symbol id="i-send" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
  <symbol id="i-handshake" viewBox="0 0 24 24"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></symbol>
  <symbol id="i-footprints" viewBox="0 0 24 24"><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4"/><path d="M4 13h4"/></symbol>
  <symbol id="i-play" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21 6 3"/></symbol>
"""

HEAD = """<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<a class="skip" href="#main">ข้ามไปยังเนื้อหาหลัก</a>
{sprite}
<header class="header" id="hdr">
  <div class="container">
    <a class="brand" href="index.html"><img src="../assets/logo-asean-library.png" alt="ASEAN Library"><span><b>ห้องสมุดอาเซียน</b><small>กรมอาเซียน กระทรวงการต่างประเทศ</small></span></a>
    <nav class="menu" aria-label="เมนูหลัก">{nav}</nav>
    <a class="btn btn-gold{find_on}" href="network.html"><svg class="icon"><use href="#i-pin"/></svg> ค้นหาห้องสมุด</a>
    <button class="burger" aria-label="เมนู" aria-expanded="false" aria-controls="hdr"><svg class="icon"><use href="#i-menu"/></svg></button>
  </div>
</header>

<main id="main">
"""

PAGE_HERO = """<section class="phero{tint}">
  <div class="blob a"></div><div class="blob b"></div>
  <div class="container">
    <nav class="crumb" aria-label="breadcrumb">{crumb}</nav>
    {tag}<h1>{h1}</h1>
    {lead}
  </div>
  <div class="wave"><svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,30 C240,70 480,0 720,22 C960,44 1200,60 1440,14 L1440,60 L0,60 Z" fill="#ffffff"/></svg></div>
</section>
"""

FOOT = """</main>

<footer class="footer">
  <div class="container">
    <div class="grid">
      <div>
        <a class="brand" href="index.html"><img src="../assets/logo-asean-library.png" alt=""><span><b>ห้องสมุดอาเซียน</b><small>กรมอาเซียน กระทรวงการต่างประเทศ</small></span></a>
        <p>โครงการ “1 จังหวัด 1 โรงเรียน 1 ห้องสมุดอาเซียน เพื่อประชาชนและเยาวชนไทย” เตรียมความพร้อมเยาวชนและชุมชนไทยสู่ประชาคมอาเซียน ตั้งแต่ปี 2557</p>
        <div class="social">
          <a href="https://www.facebook.com/ASEANThailand.MFA/" aria-label="Facebook"><svg class="icon"><use href="#i-fb"/></svg></a>
          <a href="https://twitter.com/ASEAN_THAILAND" aria-label="X"><svg class="icon"><use href="#i-x"/></svg></a>
          <a href="https://www.instagram.com/aseanthailand/" aria-label="Instagram"><svg class="icon"><use href="#i-ig"/></svg></a>
          <a href="#" aria-label="YouTube"><svg class="icon"><use href="#i-yt"/></svg></a>
        </div>
      </div>
      <div><h4>เมนู</h4><ul><li><a href="index.html">หน้าแรก</a></li><li><a href="about.html">เกี่ยวกับโครงการ</a></li><li><a href="network.html">เครือข่ายห้องสมุด 77 แห่ง</a></li><li><a href="news.html">ข่าวสาร</a></li><li><a href="tips.html">เกร็ดน่ารู้</a></li><li><a href="gallery.html">คลังภาพ</a></li><li><a href="contact.html">ติดต่อ</a></li></ul></div>
      <div><h4>บทความ</h4><ul><li><a href="learn.html?c=about">เกี่ยวกับอาเซียน</a></li><li><a href="learn.html?c=apsc">เสาการเมืองและความมั่นคง</a></li><li><a href="learn.html?c=aec">เสาเศรษฐกิจ</a></li><li><a href="learn.html?c=ascc">เสาสังคมและวัฒนธรรม</a></li><li><a href="learn.html?c=ext">อาเซียนกับภาคีภายนอก</a></li><li><a href="learn.html?c=move">ก้าวไปกับอาเซียน</a></li></ul></div>
      <div><h4>ติดต่อ</h4><ul class="contact">
        <li><svg class="icon"><use href="#i-pin"/></svg><span>443 ถนนศรีอยุธยา แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพฯ 10400</span></li>
        <li><svg class="icon"><use href="#i-phone"/></svg><span>02 203 5000</span></li>
        <li><svg class="icon"><use href="#i-globe"/></svg><span>asean.mfa.go.th</span></li>
        <li><svg class="icon"><use href="#i-clock"/></svg><span>จันทร์–ศุกร์ 08.30–16.30 น.</span></li>
      </ul></div>
    </div>
    <div class="bottom">© 2556–2569 กรมอาเซียน กระทรวงการต่างประเทศ · Department of ASEAN Affairs, Ministry of Foreign Affairs of the Kingdom of Thailand</div>
  </div>
</footer>
{scripts}<script src="app.js"></script>
</body>
</html>
"""

SITE = "โครงการห้องสมุดอาเซียน"


def libraries():
    return json.loads((SRC / "data" / "libraries.json").read_text(encoding="utf-8"))


def thai_key(s):
    # เรียงตามพยัญชนะต้น ข้ามสระหน้า (เ แ โ ใ ไ) ให้ใกล้เคียงพจนานุกรม
    return (s[1:] + s[0]) if s and s[0] in "เแโใไ" else s


def chev():
    return '<svg class="icon"><use href="#i-chev-r"/></svg>'


def render(page: Path, sprite: str) -> str:
    raw = page.read_text(encoding="utf-8")
    m = re.match(r"\s*<!--(\{.*?\})-->\s*", raw, re.S)
    if not m:
        raise SystemExit(f"{page.name}: missing front matter")
    fm = json.loads(m.group(1))
    body = raw[m.end():]
    key = page.stem

    on = ' class="on" aria-current="page"'
    nav = "".join(
        f'<a href="{href}"{on if fm.get("nav") == k else ""}>{label}</a>'
        for k, href, label in NAV
    )
    title = f'{fm["title"]} — {SITE}' if key != "index" else f"{SITE} — กรมอาเซียน กระทรวงการต่างประเทศ"
    html = HEAD.format(
        title=title,
        desc=fm.get("desc", fm.get("lead", "")),
        sprite=sprite,
        nav=nav,
        find_on=" on" if fm.get("nav") == "network" else "",
    )
    if "h1" in fm:
        parts = ['<a href="index.html">หน้าแรก</a>']
        for label, href in fm.get("crumb", []):
            parts.append(chev())
            parts.append(f'<a href="{href}">{label}</a>' if href else f'<span aria-current="page">{label}</span>')
        tag = f'<span class="pill"><svg class="icon"><use href="#{fm.get("tag_icon", "i-sparkles")}"/></svg> {fm["tag"]}</span>' if fm.get("tag") else ""
        html += PAGE_HERO.format(
            tint=" tint-bottom" if fm.get("tint") else "",
            crumb="".join(parts),
            tag=tag,
            h1=fm["h1"],
            lead=f'<p>{fm["lead"]}</p>' if fm.get("lead") else "",
        )
    if "<!--PROVINCES-->" in body:
        provs = sorted({l["province"] for l in libraries()}, key=thai_key)
        body = body.replace("<!--PROVINCES-->", "".join(f"<option>{p}</option>" for p in provs))
    html += body.rstrip() + "\n"
    scripts = ""
    if fm.get("libraries"):
        scripts = f"<script>window.LIBRARIES={json.dumps(libraries(), ensure_ascii=False, separators=(',', ':'))};</script>\n"
    html += FOOT.format(scripts=scripts)
    return html


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    sprite = (SRC / "sprite.svg").read_text(encoding="utf-8").rstrip()
    sprite = sprite.replace("</svg>", EXTRA_ICONS.strip("\n") + "\n</svg>")
    css = (SRC / "base.css").read_text(encoding="utf-8") + (SRC / "pages.css").read_text(encoding="utf-8")
    (OUT / "style.css").write_text(css, encoding="utf-8")
    (OUT / "app.js").write_text((SRC / "app.js").read_text(encoding="utf-8"), encoding="utf-8")
    pages = sorted((SRC / "pages").glob("*.html"))
    for p in pages:
        (OUT / p.name).write_text(render(p, sprite), encoding="utf-8")
    print(f"built {len(pages)} pages → {OUT.relative_to(SRC.parent.parent)}")


if __name__ == "__main__":
    main()
