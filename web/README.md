# เว็บไซต์โครงการห้องสมุดอาเซียน (Next.js)

พัฒนาจากแบบที่ลูกค้าเลือก **แบบที่ 3 Learning Space** (`../design-mockups/learning/`) ด้วย Next.js 16 (App Router, Cache Components) + TypeScript
ข้อมูลอยู่ใน Supabase (โปรเจกต์ `lwvncujcbkocoiaxtldz`)

## รัน

คัดลอก `.env.example` เป็น `.env.local` แล้วใส่ `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (Supabase → Project Settings → API Keys)
ตอน deploy ต้องตั้ง env ชุดเดียวกันใน Vercel ด้วย เพราะหน้าเว็บ build จากฐานข้อมูล

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

## หน้า

| URL | ไฟล์ |
|---|---|
| `/` | `src/app/(site)/page.tsx` |
| `/about` | `src/app/(site)/about/page.tsx` |
| `/network` (`?q=` ค้นหาจังหวัด) | `src/app/(site)/network/page.tsx` + `components/LibraryFinder.tsx` |
| `/news` (`?c=opening\|activity`), `/news/[slug]` | `src/app/(site)/news/` |
| `/learn` (`?c=` หมวด), `/learn/[slug]` | `src/app/(site)/learn/` |
| `/tips` | `src/app/(site)/tips/page.tsx` |
| `/gallery` | `src/app/(site)/gallery/page.tsx` |
| `/contact` | `src/app/(site)/contact/page.tsx` + `components/ContactForm.tsx` |
| `/admin` | หลังบ้าน (ดูหัวข้อ "หลังบ้าน") |

มี `sitemap.xml`, `robots.txt` และหน้า 404 ภาษาไทย

## โครงสร้าง

- `src/app/globals.css` สไตล์ทั้งหมด ยกมาจาก mockup (token สี MFA, Kanit, มุมโค้ง) ฟอนต์ Kanit โหลดผ่าน `next/font`
- `src/components/` คอมโพเนนต์ร่วม ส่วนที่มี state เป็น client component: header (เมนูมือถือ), ตัวกรอง, ค้นหาห้องสมุด, lightbox, ฟอร์ม, คำศัพท์วันนี้
- ไอคอนเป็น SVG sprite ใน `components/icon-sprite.ts` ใช้ผ่าน `<Icon name="..." />`
- `src/lib/types.ts` โครงสร้างข้อมูลที่หน้าเว็บใช้
- `src/lib/content.ts` **จุดเดียวที่อ่านข้อมูล** query Supabase แล้วแปลงเป็น type ข้างบน ทุกฟังก์ชันใช้ `'use cache'` + `cacheTag`
- `src/lib/supabase/` client 3 แบบ: `public.ts` หน้าเว็บ (ไม่มี session ใช้ใน cache ได้), `server.ts` หลังบ้าน (session จาก cookie), `browser.ts` อัปโหลดรูป
- `src/lib/database.types.ts` type ที่ generate จาก schema (สร้างใหม่ทุกครั้งที่แก้ตาราง)
- `src/lib/taxonomy.ts` หมวดบทความ กลุ่มคำศัพท์ รหัสโทรศัพท์ ประเทศสมาชิก (ผูกกับไอคอน/สีในโค้ด จึงไม่อยู่ในฐานข้อมูล)

## ฐานข้อมูล (Supabase)

| ตาราง | ใช้ที่ |
|---|---|
| `posts` | ข่าว (`type='news'`) และบทความ (`type='article'`) แยกด้วย `type` |
| `libraries` | ห้องสมุด 77 แห่ง (`province` ห้ามซ้ำ) |
| `glossary_terms` | เกร็ดน่ารู้ |
| `albums` + `album_photos` | คลังภาพ เรียงด้วย `sort_order` |
| `contact_messages` | ข้อความจากฟอร์มติดต่อ (ดูใน Table Editor) |

- schema: `supabase/migrations/` ข้อมูลเริ่มต้น: `supabase/seed.sql` (รันซ้ำได้ แต่จะล้างเนื้อหาที่แก้ไว้)
- สิทธิ์: คนทั่วไปอ่านได้อย่างเดียว เห็นเฉพาะ `is_published = true` ฟอร์มติดต่อเขียนได้อย่างเดียว ผู้ดูแล (`app_metadata.role = 'admin'`) เพิ่ม/แก้/ลบได้ทุกตาราง
- cache: แก้ผ่านหลังบ้านแล้วหน้าเว็บอัปเดตทันที (`updateTag`) ถ้าแก้ตรงใน Supabase dashboard จะเห็นภายใน 1 ชม. (ข่าว/บทความ/คลังภาพ) หรือ 1 วัน (ห้องสมุด/คำศัพท์)
- รูปเดิมอยู่ใน `public/images` รูปที่อัปโหลดจากหลังบ้านอยู่ใน Storage bucket `media` (public, ไม่เกิน 10 MB)
- `body_html` ถูก sanitize ใน Server Action ก่อนบันทึก (`src/lib/admin/form.ts`) ถ้าแก้ตรงในฐานข้อมูลต้องระวังเอง เพราะหน้าเว็บแสดงด้วย `dangerouslySetInnerHTML`
- ข่าว/บทความที่เพิ่มหลัง build เปิดผ่าน URL ได้ทันที แต่จะขึ้นในหน้ารายการ/หน้าแรกหลัง cache ของรายการหมดอายุ

## หลังบ้าน (`/admin`)

จัดการข่าว บทความ ห้องสมุด เกร็ดน่ารู้ คลังภาพ และอ่าน/ลบข้อความติดต่อ มีตัวแก้ไขเนื้อหา (Tiptap) และอัปโหลดรูป

- ล็อกอินด้วย Supabase Auth (อีเมล + รหัสผ่าน) session อยู่ใน cookie (`@supabase/ssr`)
- `src/proxy.ts` ต่ออายุ session และส่งคนที่ยังไม่ล็อกอินไป `/admin/login`
- `src/lib/admin/auth.ts` `requireAdmin()` ทุกหน้าและทุก Server Action เรียกก่อนแตะข้อมูล แล้ว RLS ตรวจซ้ำที่ฐานข้อมูล
- Server Actions อยู่ใน `src/lib/admin/actions/` หน้าอยู่ใน `src/app/admin/(panel)/`

**เพิ่มผู้ดูแล**
1. Supabase → Authentication → Users → Add user → Create new user (ติ๊ก Auto Confirm)
2. ให้สิทธิ์ผู้ดูแลด้วย SQL Editor:
   ```sql
   update auth.users set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}' where email = 'name@example.com';
   ```
3. ถ้าผู้ใช้ล็อกอินอยู่แล้ว ให้ออกจากระบบแล้วเข้าใหม่ สิทธิ์จึงจะมีผล

ถอนสิทธิ์: `raw_app_meta_data - 'role'` แล้วลบ session ของผู้ใช้นั้นใน Authentication → Users
ควรปิดการสมัครเอง (Authentication → Sign In / Providers → Allow new users to sign up) แม้คนที่สมัครเองจะไม่มีสิทธิ์แก้ข้อมูลอยู่แล้ว

## ข้อมูลที่ต้องให้ลูกค้ายืนยัน

- ห้องสมุดแห่งที่ 77 (ตอนนี้ใส่จังหวัดปัตตานีไว้ก่อน ยังไม่มีชื่อโรงเรียน) และ 15 แห่งที่ไม่มีเลขลำดับ
- แถวที่ `is_sample = true` ในตาราง `posts` เป็นเนื้อหาตัวอย่าง ไม่ได้มาจากเว็บเดิม
