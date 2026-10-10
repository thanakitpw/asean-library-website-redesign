# เว็บไซต์โครงการห้องสมุดอาเซียน (Next.js)

พัฒนาจากแบบที่ลูกค้าเลือก **แบบที่ 3 Learning Space** (`../design-mockups/learning/`) ด้วย Next.js 16 (App Router, Cache Components) + TypeScript
ตอนนี้ใช้ข้อมูลจากไฟล์ในโปรเจกต์ ยังไม่ได้ผูกฐานข้อมูล

## รัน

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

## หน้า

| URL | ไฟล์ |
|---|---|
| `/` | `src/app/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/network` (`?q=` ค้นหาจังหวัด) | `src/app/network/page.tsx` + `components/LibraryFinder.tsx` |
| `/news` (`?c=opening\|activity`), `/news/[slug]` | `src/app/news/` |
| `/learn` (`?c=` หมวด), `/learn/[slug]` | `src/app/learn/` |
| `/tips` | `src/app/tips/page.tsx` |
| `/gallery` | `src/app/gallery/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` + `components/ContactForm.tsx` |

มี `sitemap.xml`, `robots.txt` และหน้า 404 ภาษาไทย

## โครงสร้าง

- `src/app/globals.css` สไตล์ทั้งหมด ยกมาจาก mockup (token สี MFA, Kanit, มุมโค้ง) ฟอนต์ Kanit โหลดผ่าน `next/font`
- `src/components/` คอมโพเนนต์ร่วม ส่วนที่มี state เป็น client component: header (เมนูมือถือ), ตัวกรอง, ค้นหาห้องสมุด, lightbox, ฟอร์ม, คำศัพท์วันนี้
- ไอคอนเป็น SVG sprite ใน `components/icon-sprite.ts` ใช้ผ่าน `<Icon name="..." />`
- `src/lib/types.ts` โครงสร้างข้อมูล (posts, libraries, glossary, albums)
- `src/lib/data/` ข้อมูลชั่วคราว
- `src/lib/content.ts` **จุดเดียวที่อ่านข้อมูล** ทุกฟังก์ชันใช้ `'use cache'` + `cacheTag`

## ผูกฐานข้อมูล (ขั้นถัดไป)

1. สร้างตารางตาม `src/lib/types.ts`: `posts` (news/article), `libraries`, `glossary`, `albums` + `album_photos`
2. ย้ายข้อมูลจาก `src/lib/data/` เข้าตาราง
3. แก้เฉพาะตัวฟังก์ชันใน `src/lib/content.ts` ให้ query ฐานข้อมูล (signature เดิม หน้าไม่ต้องแก้)
4. หลังแก้ข้อมูลจากหลังบ้าน เรียก `revalidateTag('news')` ฯลฯ เพื่อล้าง cache
5. ฟอร์มติดต่อ: เปลี่ยน `onSubmit` ใน `ContactForm.tsx` เป็น Server Action บันทึกลงฐานข้อมูล/ส่งอีเมล

`bodyHtml` ต้อง sanitize ตอนบันทึกจากหลังบ้าน เพราะหน้าเว็บแสดงผลด้วย `dangerouslySetInnerHTML`

## ข้อมูลที่ต้องให้ลูกค้ายืนยัน

- ห้องสมุดแห่งที่ 77 (ตอนนี้ใส่จังหวัดปัตตานีไว้ก่อน ยังไม่มีชื่อโรงเรียน) และ 15 แห่งที่ไม่มีเลขลำดับ
- เนื้อหาที่ติด `sample: true` ใน `src/lib/data/` เป็นตัวอย่าง ไม่ได้มาจากเว็บเดิม
