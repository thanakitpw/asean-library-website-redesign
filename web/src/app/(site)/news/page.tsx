import type { Metadata } from 'next';

import { NewsCard } from '@/components/cards';
import { Filterable } from '@/components/Filterable';
import { PageHero } from '@/components/PageHero';
import { getNews } from '@/lib/content';

export const metadata: Metadata = {
  title: 'ข่าวสาร',
  description: 'ข่าวพิธีเปิดห้องสมุดอาเซียนทั้ง 77 แห่ง และรายงานกิจกรรมของโรงเรียนในเครือข่ายทั่วประเทศ',
};

export default async function NewsPage() {
  const news = await getNews();
  const years = [...new Set(news.map((n) => n.fiscalYear))].sort((a, b) => b - a);
  return (
    <>
      <PageHero
        tint
        tag="ข่าวและกิจกรรม"
        tagIcon="flag"
        title="ข่าวสารห้องสมุดอาเซียน"
        lead="ข่าวพิธีเปิดห้องสมุดอาเซียนทั้ง 77 แห่ง และรายงานกิจกรรมของโรงเรียนในเครือข่ายทั่วประเทศ"
        crumbs={[{ label: 'ข่าวสาร' }]}
      />
      <section className="page-body tint">
        <div className="container">
          <Filterable
            label="หมวดข่าว"
            chips={[
              { value: 'opening', label: 'พิธีเปิดห้องสมุด' },
              { value: 'activity', label: 'กิจกรรมห้องสมุด' },
            ]}
            searchPlaceholder="ค้นหาข่าว เช่น ชื่อจังหวัด"
            emptyText="ไม่พบข่าวที่ตรงกับคำค้น"
            listClassName="cards"
            pageSize={15}
            select={{
              placeholder: 'เลือกปีข่าวสาร',
              options: years.map((y) => ({ value: String(y), label: `ปีงบประมาณ ${y}` })),
            }}
            items={news.map((n, i) => ({
              key: n.slug,
              cats: [n.category],
              group: String(n.fiscalYear),
              text: `${n.title} ${n.province ?? ''}`,
              node: <NewsCard post={n} wide={i === 0} />,
            }))}
          />
        </div>
      </section>
    </>
  );
}
