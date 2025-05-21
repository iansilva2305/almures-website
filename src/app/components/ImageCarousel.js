'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Componente de imagen simple con manejo de errores
const SimpleImage = ({ src, alt, ...props }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400">
        <span>Imagen no disponible</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => {
        console.error('Error al cargar la imagen:', src);
        setHasError(true);
      }}
      width={800}
      height={800}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      unoptimized={true}
      {...props}
    />
  );
};

const ImageCarousel = ({ images = [] }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-pulse">Cargando imágenes...</div>
      </div>
    );
  }
  
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white">
            <span>Nuestro </span>
            <span className="text-yellow-600 dark:text-yellow-500 italic font-medium">trabajo</span>
          </h2>
        </div>
        
        <div className="flex justify-center px-4">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mx-auto">
              {images.map((image, index) => (
                <div 
                  key={`${image}-${index}`}
                  className="group relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-200 dark:shadow-gray-800"
                >
                  <SimpleImage 
                    src={image}
                    alt={`Trabajo ${index + 1}`}
                    priority={index < 4}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
