// Cargador de imágenes personalizado para Next.js
export default function customLoader({ src, width, quality }) {
  // Si la imagen ya es una URL completa, devolverla tal cual
  if (src.startsWith('http') || src.startsWith('data:')) {
    return src;
  }
  
  // Si la ruta ya comienza con /almures-website, devolverla directamente
  if (src.startsWith('/almures-website/')) {
    return src;
  }
  
  // Si la ruta comienza con /, quitar la barra inicial
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  
  // Construir la ruta de la imagen para GitHub Pages
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const imagePath = `${basePath}/${cleanSrc}`.replace(/([^:]\/)\/+/g, '$1');
  
  return imagePath;
}
