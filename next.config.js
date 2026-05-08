/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // IMPORTANT for static hosting

  images: {
    unoptimized: true, // REQUIRED for static export
    domains: [
      "127.0.0.1",
      "verifiedequalaccess.com", // your live domain
    ],
  },
};

module.exports = nextConfig;