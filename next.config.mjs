const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/almures-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/almures-website/' : '',};

export default nextConfig;