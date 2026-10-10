import type { Metadata } from 'next';
import Image from 'next/image';

import { Filterable } from '@/components/Filterable';
import { Icon } from '@/components/Icon';
import { Lightbox } from '@/components/Lightbox';
import { PageHero } from '@/components/PageHero';
import { getAlbums } from '@/lib/content';
import { thaiDate } from '@/lib/format';

export const metadata: Metadata = {
  title: 'คลังภาพ',
  description: 'ภาพจากพิธีเปิดและกิจกรรมของโรงเรียนในเครือข่ายห้องสมุดอาเซียนทั่วประเทศ',
};

export default async function GalleryPage() {
  const albums = await getAlbums();
  return (
    <>
      <PageHero
        tint
        tag="คลังภาพ"
        tagIcon="images"
        title="บรรยากาศห้องสมุดอาเซียน"
        lead="ภาพจากพิธีเปิดและกิจกรรมของโรงเรียนในเครือข่ายทั่วประเทศ คลิกที่อัลบั้มเพื่อดูภาพขนาดใหญ่"
        crumbs={[{ label: 'คลังภาพ' }]}
      />
      <section className="page-body tint">
        <div className="container">
          <Lightbox>
            <Filterable
              label="ประเภทอัลบั้ม"
              chips={[
                { value: 'opening', label: 'พิธีเปิด' },
                { value: 'activity', label: 'กิจกรรม' },
                { value: 'library', label: 'ภายในห้องสมุด' },
              ]}
              searchPlaceholder="ค้นหาตามจังหวัด"
              emptyText="ไม่พบอัลบั้มที่ค้นหา"
              listClassName="albums"
              items={albums.map((a) => ({
                key: a.slug,
                cats: [a.category],
                text: `${a.title} ${a.place ?? ''}`,
                node: (
                  <a className="album" href={a.photos[0].src} data-lightbox data-caption={a.photos[0].caption}>
                    <div className="stack">
                      <Image src={a.photos[0].src} alt="" fill sizes="(max-width: 860px) 100vw, (max-width: 1100px) 50vw, 380px" />
                      <span className="count"><Icon name="images" /> ดูภาพ</span>
                    </div>
                    <h3>{a.title}</h3>
                    <div className="meta">
                      {a.date && <span><Icon name="cal" /> {thaiDate(a.date)}</span>}
                      {a.place && <span><Icon name={a.placeIcon ?? 'pin'} /> {a.place}</span>}
                    </div>
                  </a>
                ),
              }))}
            />
          </Lightbox>
        </div>
      </section>
    </>
  );
}
