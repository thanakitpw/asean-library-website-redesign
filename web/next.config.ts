import type { NextConfig } from "next";

// รูปที่อัปโหลดจากหลังบ้านอยู่ใน Supabase Storage (bucket media)
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: supabaseHost
      ? [{ protocol: 'https', hostname: supabaseHost, pathname: '/storage/v1/object/public/media/**' }]
      : [],
  },
};

export default nextConfig;
