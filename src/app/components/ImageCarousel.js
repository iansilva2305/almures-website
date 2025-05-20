'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Función para obtener la URL de la imagen
const getImageUrl = (imageName) => {
  if (!imageName) return '';
  
  // Eliminar cualquier ruta relativa o absoluta que pueda estar incluida
  let cleanName = imageName.split('/').pop();
  
  // Asegurarse de que el nombre del archivo no tenga espacios al principio o al final
  cleanName = cleanName.trim();
  
  // Codificar solo los caracteres especiales necesarios, pero mantener los signos + como están
  // ya que son parte del nombre del archivo
  const encodedName = cleanName
    .replace(/%/g, '%25')  // Codificar % primero para evitar codificaciones dobles
    .replace(/\?/g, '%3F')
    .replace(/#/g, '%23')
    .replace(/\[/g, '%5B')
    .replace(/\]/g, '%5D')
    .replace(/@/g, '%40')
    .replace(/!/g, '%21')
    .replace(/\$/g, '%24')
    .replace(/&/g, '%26')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/,/g, '%2C')
    .replace(/;/g, '%3B')
    .replace(/=/g, '%3D')
    .replace(/ /g, '+');  // Mantener los espacios como + para coincidir con los nombres de archivo
  
  const imageUrl = `/images/${encodedName}`;
  console.log('URL de la imagen generada:', imageUrl);
  console.log('Nombre de archivo original:', imageName);
  console.log('Nombre codificado:', encodedName);
  return imageUrl;
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
                  <img
                    src={imageUrl}
                    alt={`Trabajo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      console.error('Error al cargar la imagen:', imageUrl);
                      e.target.style.display = 'none';
                      const errorDiv = document.createElement('div');
                      errorDiv.className = 'w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm';
                      errorDiv.textContent = 'Error al cargar';
                      e.target.parentNode.appendChild(errorDiv);
                    }}
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
