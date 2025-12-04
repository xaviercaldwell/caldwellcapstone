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
                  
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob:;
              font-src 'self' data:;
              connect-src 'self' https://*.supabase.co https://*.supabase.net;
              frame-ancestors 'none';
              object-src 'none';
              base-uri 'self';
            `.replace(/\s{2,}/g, " ").trim()
          },


        ],
      },
    ];
  },
};

export default nextConfig;
