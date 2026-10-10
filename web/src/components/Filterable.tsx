import { Suspense, type ComponentProps } from 'react';

import { FilterList, FilterListView } from './FilterList';

/**
 * ตัวกรองที่ prerender รายการทั้งหมดไว้ใน HTML (ดีต่อ SEO)
 * แล้วค่อยอ่าน ?c= จาก URL ฝั่ง browser
 */
export function Filterable(props: ComponentProps<typeof FilterList>) {
  return (
    <Suspense fallback={<FilterListView {...props} />}>
      <FilterList {...props} />
    </Suspense>
  );
}
