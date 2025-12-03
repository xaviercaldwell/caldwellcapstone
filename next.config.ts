import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        // Apply headers to all routes
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },

          { key: "X-Content-Type-Options", value: "nosniff" },

          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                         
        ],
      },
    ];
  },
};

export default nextConfig;
