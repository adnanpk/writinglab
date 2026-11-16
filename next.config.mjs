/** @type {import('next').NextConfig} */
// Hybrid/Node deployment (Hostinger Business Node.js app). The /api/submit route needs the Node runtime.
const nextConfig = { reactStrictMode: true, poweredByHeader: false };
export default nextConfig;
