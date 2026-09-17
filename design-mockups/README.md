# โครงการห้องสมุดอาเซียน — แบบดีไซน์หน้าแรก 6 แนวทาง

Mockup HTML สำหรับให้ลูกค้าเลือกแนวทาง ก่อนพัฒนาจริงด้วย Next.js + ฐานข้อมูล

## วิธีดู
- เปิด `index.html` — มีแท็บสลับ 3 แบบ และปุ่มสลับ Desktop / Tablet / Mobile
- หรือเปิดแต่ละไฟล์ตรง ๆ:
  - `design-1-official.html` — **ทางการ (MFA Official)** ใกล้เคียง mfa.go.th ที่สุด
  - `design-2-editorial.html` — **Modern Editorial** สะอาด เน้นเนื้อหา Bento grid
  - `design-3-learning.html` — **Learning Space** อบอุ่น เป็นมิตรกับนักเรียน/ครู/ชุมชน
  - `design-4-immersive-light.html` — **Immersive (โทนขาว)** (โมเดิร์น) hero รูปเต็มจอจางสู่พื้นขาว glass cards
  - `design-4-immersive.html` — **Immersive (โทนเข้ม)** โครงสร้างเดียวกัน โทนน้ำเงินเข้มทั้งหน้า
  - `design-5-swiss.html` — **Minimal Swiss** (โมเดิร์น) ขาวสะอาด กริดเส้นบาง ตัวอักษรใหญ่
  - `design-6-bento.html` — **Bento App** (โมเดิร์น) ทุกเนื้อหาเป็นไทล์แบบแอป + ช่องค้นหาใหญ่
- ต้องต่ออินเทอร์เน็ตเพื่อโหลดฟอนต์ Kanit / Sarabun จาก Google Fonts

## CI ที่ใช้ (อ้างอิง www.mfa.go.th)
| Token | ค่า | ที่มา |
|---|---|---|
| Navy (primary) | `#00468A` | แถบเมนู mfa.go.th |
| Navy dark | `#0A3070` / `#001B3A` | hero / footer bar |
| Blue | `#025AA1` | เมนูแถวสอง |
| Green (accent) | `#10A58A` | บล็อกบริการประชาชน |
| Gold (accent) | `#ECA90E` | บล็อกบริการประชาชน |
| Background | `#F5F6F8` + ลายสามเหลี่ยม | พื้นหลัง section |
| Font | Kanit (หัวข้อ/เมนู), Sarabun (เนื้อหาแบบที่ 2) | mfa.go.th ใช้ Kanit |

## เนื้อหาในแบบ
ข่าว บทความ เกร็ดน่ารู้ และรูปภาพทั้งหมดดึงมาจากเว็บเดิม (aseanlibrarythailand.org) เพื่อให้ลูกค้าเห็นภาพจริง
ส่วนตัวเลขบางส่วน (จำนวนต่อภูมิภาค, จำนวนภาพ) เป็นค่าตัวอย่าง ต้องยืนยันกับลูกค้า

## Section ที่แต่ละแบบมี → map ไปยัง Next.js/DB
- Hero / Slider → ตาราง `banners`
- ข่าวพิธีเปิด / ข่าวสาร → `posts` (type=news, category=opening|activity)
- บทความ 6 หมวด → `posts` (type=article, category=…)
- เกร็ดน่ารู้ / ศัพท์อาเซียน → `posts` (type=tip) หรือ `glossary`
- เครือข่ายห้องสมุด 76 แห่ง → `libraries` (school, province, region, lat/lng, opened_at)
- คลังภาพ → `media` + `albums`
