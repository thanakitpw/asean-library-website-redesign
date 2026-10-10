import type { Album } from '@/lib/types';

const d = (iso: string) => ({ iso, precision: 'day' as const });
const y = (be: number) => ({ iso: `${be - 543}-06-01`, precision: 'year' as const });

export const ALBUMS: Album[] = [
  { slug: 'opening-77', title: 'พิธีเปิดห้องสมุดอาเซียนแห่งที่ 77', category: 'opening', date: d('2026-09-01'), place: 'ครบ 77 จังหวัด',
    photos: [{ src: '/images/news-77.jpg', caption: 'พิธีเปิดห้องสมุดอาเซียนแห่งที่ 77' }] },
  { slug: 'opening-76', title: 'แห่งที่ 76 · โรงเรียนนราธิวาส', category: 'opening', date: d('2025-08-19'), place: 'นราธิวาส',
    photos: [{ src: '/images/news-76.jpg', caption: 'แห่งที่ 76 · โรงเรียนนราธิวาส จังหวัดนราธิวาส' }] },
  { slug: 'opening-75', title: 'แห่งที่ 75 · โรงเรียนนิบงชนูปถัมภ์', category: 'opening', date: d('2025-08-16'), place: 'ยะลา',
    photos: [{ src: '/images/news-75.jpg', caption: 'แห่งที่ 75 · โรงเรียนนิบงชนูปถัมภ์ จังหวัดยะลา' }] },
  { slug: 'asean-room', title: 'ภายในห้องสมุดอาเซียน · ASEAN Room', category: 'library', place: 'บอร์ดนิทรรศการ ชั้นหนังสือ มุมคอมพิวเตอร์', placeIcon: 'library',
    photos: [{ src: '/images/lib-interior.jpg', caption: 'ภายในห้องสมุดอาเซียน · ASEAN Room' }] },
  { slug: 'opening-74', title: 'แห่งที่ 74 · โรงเรียนมาบอำมฤตวิทยา', category: 'opening', date: d('2024-12-26'), place: 'ชุมพร',
    photos: [{ src: '/images/news-74.jpg', caption: 'แห่งที่ 74 · โรงเรียนมาบอำมฤตวิทยา จังหวัดชุมพร' }] },
  { slug: 'reading-activity', title: 'กิจกรรมส่งเสริมการอ่าน', category: 'activity', place: 'นักเรียนในเครือข่าย', placeIcon: 'users',
    photos: [{ src: '/images/kids-reading.jpg', caption: 'กิจกรรมส่งเสริมการอ่านในห้องสมุดอาเซียน' }] },
  { slug: 'opening-70', title: 'แห่งที่ 70 · โรงเรียนอนุบาลองครักษ์', category: 'opening', date: y(2566), place: 'นครนายก',
    photos: [{ src: '/images/news-70.jpg', caption: 'แห่งที่ 70 · โรงเรียนอนุบาลองครักษ์ จังหวัดนครนายก' }] },
  { slug: 'opening-69', title: 'แห่งที่ 69 · โรงเรียนอนุบาลชัยนาท', category: 'opening', date: y(2565), place: 'ชัยนาท',
    photos: [{ src: '/images/news-69.jpg', caption: 'แห่งที่ 69 · โรงเรียนอนุบาลชัยนาท จังหวัดชัยนาท' }] },
  { slug: 'opening-68', title: 'แห่งที่ 68 · โรงเรียนอนุบาลสิงห์บุรี', category: 'opening', date: y(2565), place: 'สิงห์บุรี',
    photos: [{ src: '/images/news-68.jpg', caption: 'แห่งที่ 68 · โรงเรียนอนุบาลสิงห์บุรี จังหวัดสิงห์บุรี' }] },
];
