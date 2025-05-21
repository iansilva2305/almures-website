'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Función para obtener la URL de la imagen
const getImageUrl = (imageName) => {
  if (!imageName) return '';
  
  // Obtener solo el nombre del archivo sin la ruta
  let cleanName = imageName.split('/').pop().trim();
  
  // Si ya es una URL completa, devolverla tal cual
  if (cleanName.startsWith('http')) {
    return cleanName;
  }
  
  // Construir la ruta correcta para las imágenes
  // En producción, usar la ruta base correcta
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const imagePath = `${basePath}/images/${cleanName}`.replace(/\/\//g, '/');
  
  return imagePath;
};

// Componente de carga de imagen con manejo de errores mejorado
const ImageWithFallback = ({ src, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  if (hasError || !imgSrc) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
        <span>Imagen no disponible</span>
      </div>
    );
  }


  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={() => {
        console.error('Error al cargar la imagen:', imgSrc);
        setHasError(true);
      }}
      {...props}
    />
  );
};

const ImageCarousel = ({ images = [] }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Efecto para inicializar el componente
  useEffect(() => {
    setIsMounted(true);
    return () => {
      // Limpieza si es necesario
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-pulse">Cargando imágenes...</div>
      </div>
    );
  }
  
  // Verificar si hay imágenes
  if (!images || images.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300">No hay imágenes disponibles para mostrar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white">
            <span>Nuestro </span>
            <span className="text-yellow-600 dark:text-yellow-500 italic font-medium">trabajo</span>
          </h2>
        </div>
        
        <div className="flex justify-center px-4">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mx-auto">
              {images.map((image, index) => {
                const imageUrl = getImageUrl(image);
                
                return (
                  <div 
                    key={`${image}-${index}`}
                    className="group relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-200 dark:shadow-gray-800"
                  >
                    <div className="w-full h-full">
                      <ImageWithFallback
                        src={imageUrl}
                        alt={`Trabajo ${index + 1}`}
                        width={800}
                        height={800}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized={process.env.NODE_ENV !== 'production'}
                        priority={index < 4} // Precarga las primeras 4 imágenes
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
