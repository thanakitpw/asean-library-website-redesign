'use client';

import { useState } from 'react';

import { Icon } from './Icon';

/** ปุ่มแชร์ — สร้างลิงก์จาก URL ปัจจุบันตอนกด */
export function ShareBar({ label }: { label: string }) {
  const [copied, setCopied] = useState(false);
  const open = (base: string) => window.open(base + encodeURIComponent(location.href), '_blank', 'noopener,width=600,height=500');

  return (
    <div className="share">
      {label}
      <button type="button" className="sh" aria-label="แชร์ทาง Facebook" onClick={() => open('https://www.facebook.com/sharer/sharer.php?u=')}><Icon name="fb" /></button>
      <button type="button" className="sh" aria-label="แชร์ทาง X" onClick={() => open('https://twitter.com/intent/tweet?url=')}><Icon name="x" /></button>
      <button
        type="button"
        className="sh"
        aria-label="คัดลอกลิงก์"
        onClick={async () => {
          await navigator.clipboard.writeText(location.href);
          setCopied(true);
        }}
      >
        <Icon name={copied ? 'check' : 'link'} />
      </button>
      {copied && <span role="status">คัดลอกลิงก์แล้ว</span>}
    </div>
  );
}
