import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
      },
};


// export default withBundleAnalyzer({
//     enabled: process.env.ANALYZE === 'true', 
//   })(nextConfig);

module.exports = nextConfig;
