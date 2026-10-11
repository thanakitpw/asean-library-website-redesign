import type { ReactNode } from 'react';

/** ป้ายชื่อ + คำอธิบายใต้ช่องกรอก */
export function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: ReactNode;
  children: ReactNode;
}) {
  const head = <>{label}{required && <i> *</i>}</>;
  return (
    <div className="a-field">
      {htmlFor ? <label htmlFor={htmlFor}>{head}</label> : <span className="lbl">{head}</span>}
      {children}
      {hint && <span className="hint">{hint}</span>}
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="a-sec">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
