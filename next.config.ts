import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // CJ catalogue product truth. Supplier photos load direct; nothing is
      // copied or rehosted, so the image on the page is always the live file.
      { protocol: "https", hostname: "cf.cjdropshipping.com" },
      { protocol: "https", hostname: "oss-cf.cjdropshipping.com" },
    ],
  },
};

export default nextConfig;
