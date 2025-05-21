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
};

// Importaciones ES modules
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función asíncrona para copiar directorios
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

// Función para copiar archivos estáticos
async function copyStaticFiles() {
  try {
    const outDir = path.join(process.cwd(), 'out');
    const publicDir = path.join(process.cwd(), 'public');
    const imagesDest = path.join(outDir, 'images');
    
    // Crear directorio de salida si no existe
    await fs.mkdir(outDir, { recursive: true });
    
    // Copiar archivos estáticos
    if (await fs.access(publicDir).then(() => true).catch(() => false)) {
      await copyDir(publicDir, imagesDest);
      console.log('Archivos estáticos copiados correctamente');
    }
  } catch (error) {
    console.error('Error al copiar archivos estáticos:', error);
  }
}

// Ejecutar la copia de archivos estáticos
if (process.env.NODE_ENV === 'production') {
  copyStaticFiles().catch(console.error);
}

export default nextConfig;