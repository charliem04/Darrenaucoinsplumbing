/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` emits ./out, which wrangler.jsonc
  // serves as Workers static assets. No server runtime, no adapter.
  output: "export",
  images: {
    // Required for static export. Photos in /public/images are already
    // WebP at their display size, so there is nothing to optimise.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
