/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: true, // ✅ Required for static export
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  trailingSlash: true, // ✅ Better for static export
  output: 'export', // ✅ Force static export
}

module.exports = nextConfig
