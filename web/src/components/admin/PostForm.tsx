'use client';

import { savePost } from '@/lib/admin/actions/posts';
import { COVER_ICONS, NEWS_CATEGORY, TONE_LABEL } from '@/lib/admin/labels';
import type { Tables } from '@/lib/database.types';
import { ARTICLE_CATEGORIES } from '@/lib/taxonomy';

import { AdminForm } from './AdminForm';
import { Field, Section } from './Field';
import { ImageField } from './ImageField';
import { RichTextEditor } from './RichTextEditor';

type Post = Tables<'posts'>;

export function PostForm({
  type,
  post,
  today,
  provinces = [],
  terms = [],
}: {
  type: 'news' | 'article';
  post: Post | null;
  today: string;
  provinces?: string[];
  terms?: { slug: string; name: string }[];
}) {
  const isNews = type === 'news';
  const listHref = isNews ? '/admin/news' : '/admin/articles';

  return (
    <AdminForm action={savePost} cancelHref={listHref} submitLabel={post ? 'บันทึกการแก้ไข' : 'เพิ่ม'}>
      <input type="hidden" name="type" value={type} />
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="col">
        <Section title="เนื้อหา">
          <Field label="หัวข้อ" htmlFor="title" required>
            <input id="title" name="title" type="text" required defaultValue={post?.title} />
          </Field>
          <Field label="คำโปรย" htmlFor="excerpt" hint="แสดงใต้หัวข้อในหน้ารายการและตอนแชร์ลิงก์ 1–2 ประโยค">
            <textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ''} />
          </Field>
          <Field label="เนื้อหา">
            <RichTextEditor name="body_html" initial={post?.body_html ?? ''} />
          </Field>
        </Section>
        <Section title="รูปประกอบเพิ่มเติม">
          <ImageField
            name="gallery"
            folder={type}
            multiple
            initial={(post?.gallery ?? []).map((src) => ({ src, caption: '' }))}
          />
        </Section>
      </div>

      <div className="col">
        <Section title="การเผยแพร่">
          <label className="a-check">
            <input type="checkbox" name="is_published" defaultChecked={post?.is_published ?? true} /> เผยแพร่บนหน้าเว็บ
          </label>
          <label className="a-check">
            <input type="checkbox" name="is_sample" defaultChecked={post?.is_sample ?? false} /> เป็นเนื้อหาตัวอย่าง
          </label>
          <div className="a-grid2">
            <Field label="วันที่เผยแพร่" htmlFor="published_on" required>
              <input id="published_on" name="published_on" type="date" required defaultValue={post?.published_on ?? today} />
            </Field>
            <Field label="แสดงเป็น" htmlFor="published_precision">
              <select id="published_precision" name="published_precision" defaultValue={post?.published_precision ?? 'day'}>
                <option value="day">วันที่เต็ม</option>
                <option value="year">เฉพาะปี</option>
              </select>
            </Field>
          </div>
          <Field label="slug (ส่วนท้าย URL)" htmlFor="slug" hint={`เว้นว่างได้ ระบบตั้งให้เอง · /${isNews ? 'news' : 'learn'}/slug`}>
            <input id="slug" name="slug" type="text" pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={post?.slug} placeholder={isNews ? 'opening-78-pattani' : 'asean-charter'} />
          </Field>
        </Section>

        {isNews ? (
          <Section title="ข้อมูลข่าว">
            <Field label="ประเภทข่าว" htmlFor="news_category" required>
              <select id="news_category" name="news_category" defaultValue={post?.news_category ?? 'opening'}>
                {Object.entries(NEWS_CATEGORY).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </Field>
            <div className="a-grid2">
              <Field label="ห้องสมุดแห่งที่" htmlFor="library_no">
                <input id="library_no" name="library_no" type="number" min={1} max={77} defaultValue={post?.library_no ?? ''} />
              </Field>
              <Field label="จังหวัด" htmlFor="province">
                <input id="province" name="province" type="text" list="province-list" defaultValue={post?.province ?? ''} />
                <datalist id="province-list">{provinces.map((p) => <option key={p} value={p} />)}</datalist>
              </Field>
            </div>
            <Field label="โรงเรียน" htmlFor="school">
              <input id="school" name="school" type="text" defaultValue={post?.school ?? ''} />
            </Field>
            <div className="a-grid2">
              <Field label="วันที่ส่งมอบ" htmlFor="ceremony_on">
                <input id="ceremony_on" name="ceremony_on" type="date" defaultValue={post?.ceremony_on ?? ''} />
              </Field>
              <Field label="แสดงเป็น" htmlFor="ceremony_precision">
                <select id="ceremony_precision" name="ceremony_precision" defaultValue={post?.ceremony_precision ?? 'day'}>
                  <option value="day">วันที่เต็ม</option>
                  <option value="year">เฉพาะปี</option>
                </select>
              </Field>
            </div>
          </Section>
        ) : (
          <Section title="ข้อมูลบทความ">
            <Field label="หมวด" required hint="เลือกได้มากกว่า 1 หมวด">
              <div className="a-checks">
                {ARTICLE_CATEGORIES.map((c) => (
                  <label key={c.slug} className="a-check">
                    <input type="checkbox" name="categories" value={c.slug} defaultChecked={post?.categories.includes(c.slug)} /> {c.short}
                  </label>
                ))}
              </div>
            </Field>
            <div className="a-grid2">
              <Field label="เวลาอ่าน (นาที)" htmlFor="reading_minutes">
                <input id="reading_minutes" name="reading_minutes" type="number" min={1} max={120} defaultValue={post?.reading_minutes ?? ''} />
              </Field>
              <Field label="เหมาะกับ" htmlFor="audience">
                <input id="audience" name="audience" type="text" placeholder="ม.ต้น ขึ้นไป" defaultValue={post?.audience ?? ''} />
              </Field>
            </div>
            {terms.length > 0 && (
              <Field label="คำศัพท์ที่เกี่ยวข้อง" hint="แสดงเป็นกล่องคำศัพท์ท้ายบทความ">
                <div className="a-checks">
                  {terms.map((t) => (
                    <label key={t.slug} className="a-check">
                      <input type="checkbox" name="related_terms" value={t.slug} defaultChecked={post?.related_terms.includes(t.slug)} /> {t.name}
                    </label>
                  ))}
                </div>
              </Field>
            )}
          </Section>
        )}

        <Section title="รูปปก">
          <ImageField name="cover" folder={type} initial={post?.cover ? [{ src: post.cover, caption: '' }] : []} />
          <div className="a-grid2">
            <Field label="ไอคอน (เมื่อไม่มีรูป)" htmlFor="icon">
              <select id="icon" name="icon" defaultValue={post?.icon ?? ''}>
                <option value="">—</option>
                {COVER_ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </Field>
            <Field label="สีพื้น" htmlFor="tone">
              <select id="tone" name="tone" defaultValue={post?.tone ?? ''}>
                <option value="">—</option>
                {Object.entries(TONE_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </Field>
          </div>
        </Section>
      </div>
    </AdminForm>
  );
}
