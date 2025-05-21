/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo = 'almures-website';
const basePath = isProd ? `/${repo}` : '';
const assetPrefix = isProd ? `/${repo}/` : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: basePath,
  assetPrefix: assetPrefix,
  images: {
    unoptimized: true,
    path: `${assetPrefix}/_next/image`,
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  trailingSlash: true,
  distDir: 'out',
  productionBrowserSourceMaps: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // Configuración para exportación estática
  generateStaticParams: async () => ({
    // Aquí puedes definir rutas dinámicas si es necesario
    // Por ejemplo, para páginas dinámicas [id].js
    // return [
    //   { id: '1' },
    //   { id: '2' },
    // ];
  }),
  // Configuración de webpack
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  // Copiar archivos estáticos
  async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/404': { page: '/404' },
    };
  },
};

// Copiar archivos estáticos
const fs = require('fs');
const path = require('path');

// Asegurarse de que el directorio de salida existe
const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Copiar la carpeta public al directorio de salida
const publicDir = path.join(process.cwd(), 'public');
if (fs.existsSync(publicDir)) {
  const copyRecursiveSync = (src, dest) => {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    
    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      fs.readdirSync(src).forEach(childItemName => {
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        );
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };
  
  copyRecursiveSync(publicDir, path.join(outDir, 'images'));
}

export default nextConfig;