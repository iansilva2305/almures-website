// Este cargador personalizado permite que las imágenes se carguen correctamente en la exportación estática
module.exports = function customLoader({ src, width, quality }) {
  // Si la imagen ya es una URL completa, devolverla tal cual
  if (src.startsWith('http')) {
    return src;
  }
  
  // Obtener el nombre del archivo de la ruta
  const filename = src.split('/').pop();
  
  // En producción, usar la ruta base correcta
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // Construir la ruta de la imagen
  const imagePath = `${basePath}${src}`.replace(/([^:]\/)\/+/g, '$1');
  
  console.log('Cargando imagen:', imagePath);
  return imagePath;
};
