import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.53"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chwcljqykozkdtislehq.supabase.co",
      },
    ],
  },
};

export default nextConfig;
