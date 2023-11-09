/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-travelmate.site",
        port: "",
        pathname: "/attachments/**"
      }
    ]
  }
};

module.exports = nextConfig;
