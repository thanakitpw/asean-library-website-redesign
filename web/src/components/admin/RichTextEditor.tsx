'use client';

import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

/** ตัวแก้ไขเนื้อหาข่าว/บทความ — ส่ง HTML ไปกับฟอร์มทาง hidden input (server sanitize ซ้ำ) */
export function RichTextEditor({ name, initial }: { name: string; initial: string }) {
  const [html, setHtml] = useState(initial);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        code: false,
        codeBlock: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
    ],
    content: initial,
    immediatelyRender: false,
    onUpdate: ({ editor: e }) => setHtml(e.isEmpty ? '' : e.getHTML()),
  });

  return (
    <div className="a-rte">
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}

function B({ on, label, title, onClick }: { on?: boolean; label: string; title: string; onClick: () => void }) {
  return (
    <button type="button" aria-pressed={on ?? false} title={title} aria-label={title} onClick={onClick}>{label}</button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      underline: e.isActive('underline'),
      h2: e.isActive('heading', { level: 2 }),
      h3: e.isActive('heading', { level: 3 }),
      bullet: e.isActive('bulletList'),
      ordered: e.isActive('orderedList'),
      quote: e.isActive('blockquote'),
      link: e.isActive('link'),
    }),
  });

  const run = (fn: (c: ReturnType<Editor['chain']>) => ReturnType<Editor['chain']>) => fn(editor.chain().focus()).run();

  const setLink = () => {
    const prev = editor.getAttributes('link').href as string | undefined;
    const href = window.prompt('ใส่ลิงก์ (เว้นว่างเพื่อเอาลิงก์ออก)', prev ?? 'https://');
    if (href === null) return;
    if (!href.trim() || href.trim() === 'https://') run((c) => c.extendMarkRange('link').unsetLink());
    else run((c) => c.extendMarkRange('link').setLink({ href: href.trim() }));
  };

  return (
    <div className="a-rte-bar" role="toolbar" aria-label="จัดรูปแบบข้อความ">
      <B on={s.h2} label="H2" title="หัวข้อใหญ่" onClick={() => run((c) => c.toggleHeading({ level: 2 }))} />
      <B on={s.h3} label="H3" title="หัวข้อย่อย" onClick={() => run((c) => c.toggleHeading({ level: 3 }))} />
      <span className="sep" />
      <B on={s.bold} label="B" title="ตัวหนา" onClick={() => run((c) => c.toggleBold())} />
      <B on={s.italic} label="I" title="ตัวเอียง" onClick={() => run((c) => c.toggleItalic())} />
      <B on={s.underline} label="U" title="ขีดเส้นใต้" onClick={() => run((c) => c.toggleUnderline())} />
      <span className="sep" />
      <B on={s.bullet} label="• รายการ" title="รายการแบบจุด" onClick={() => run((c) => c.toggleBulletList())} />
      <B on={s.ordered} label="1. รายการ" title="รายการแบบตัวเลข" onClick={() => run((c) => c.toggleOrderedList())} />
      <B on={s.quote} label="❝ อ้างอิง" title="ข้อความเน้น" onClick={() => run((c) => c.toggleBlockquote())} />
      <B on={s.link} label="ลิงก์" title="ใส่ลิงก์" onClick={setLink} />
      <B label="—" title="เส้นคั่น" onClick={() => run((c) => c.setHorizontalRule())} />
      <span className="sep" />
      <B label="↶" title="ย้อนกลับ" onClick={() => run((c) => c.undo())} />
      <B label="↷" title="ทำซ้ำ" onClick={() => run((c) => c.redo())} />
    </div>
  );
}
