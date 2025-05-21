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
  
  console.log('Ruta de la imagen:', imagePath);
  return imagePath;
};

const ImageCarousel = ({ images }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Efecto para inicializar el componente
  useEffect(() => {
    setIsMounted(true);
    return () => {
      // Limpieza si es necesario
    };
  }, []);

  if (!isMounted) {
    return <div className="h-64 flex items-center justify-center">Cargando...</div>;
  }
  
  // Verificar si hay imágenes
  if (!images || images.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No hay imágenes disponibles para mostrar.</p>
        </div>
      </div>
    );
  }

  console.log('Renderizando ImageCarousel con imágenes:', images);
  
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
                key={index}
                className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-200 dark:shadow-gray-800"
              >
                <div className="w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={`Trabajo ${index + 1}`}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      console.error('Error al cargar la imagen:', imageUrl);
                      e.target.style.display = 'none';
                      const errorDiv = document.createElement('div');
                      errorDiv.className = 'w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm';
                      errorDiv.textContent = 'Error al cargar';
                      e.target.parentNode.appendChild(errorDiv);
                    }}
                    unoptimized={true}
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
