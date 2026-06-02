import type { NextConfig } from "next";

// next-pwa disabled — its webpack plugin corrupts the Edge Runtime middleware bundle.
// Re-enable once Clerk + Vercel Edge Runtime middleware is stable.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
};

export default nextConfig;
