import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Función auxiliar para servir una imagen
async function serveImage(filePath) {
  try {
    console.log('Intentando leer el archivo:', filePath);
    
    // Verificar los permisos del archivo
    try {
      const stats = await fs.stat(filePath);
      console.log('Estadísticas del archivo:', {
        size: stats.size,
        mode: stats.mode.toString(8),
        uid: stats.uid,
        gid: stats.gid,
        atime: stats.atime,
        mtime: stats.mtime,
        ctime: stats.ctime
      });
    } catch (statError) {
      console.error('Error al obtener estadísticas del archivo:', statError);
      throw statError;
    }
    
    // Leer el archivo
    const imageBuffer = await fs.readFile(filePath);
    console.log('Archivo leído correctamente, tamaño:', imageBuffer.length, 'bytes');
    
    // Obtener la extensión del archivo para determinar el tipo de contenido
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';
    
    if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg';
    } else if (ext === '.png') {
      contentType = 'image/png';
    } else if (ext === '.gif') {
      contentType = 'image/gif';
    } else if (ext === '.svg') {
      contentType = 'image/svg+xml';
    }
    
    console.log('Tipo de contenido detectado:', contentType);
    
    // Devolver la imagen con los encabezados apropiados
    const response = new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Debug-File-Path': filePath
      }
    });
    
    console.log('Respuesta preparada con éxito');
    return response;
  } catch (error) {
    console.error('Error en serveImage:', error);
    throw error;
  }
}

export async function GET(request) {
  try {
    console.log('Solicitud recibida en el endpoint de imagen');
    
    // Obtener la ruta de la imagen desde los parámetros de consulta
    const { searchParams } = new URL(request.url);
    const imagePath = searchParams.get('path');
    
    console.log('Parámetro path recibido:', imagePath);
    
    if (!imagePath) {
      console.error('No se proporcionó el parámetro path');
      return new NextResponse('Ruta de imagen no proporcionada', { status: 400 });
    }
    
    // Decodificar la ruta de la imagen
    const decodedPath = decodeURIComponent(imagePath);
    console.log('Ruta decodificada:', decodedPath);
    
    // Primero, intentar con el nombre exacto del sistema de archivos (con +)
    const filePathWithPlus = path.join(process.cwd(), 'public', 'images', decodedPath.replace(/ /g, '+'));
    console.log('Buscando archivo con +:', filePathWithPlus);
    
    try {
      await fs.access(filePathWithPlus);
      console.log('Archivo encontrado con +');
      return await serveImage(filePathWithPlus);
    } catch (plusError) {
      console.log('No se encontró el archivo con +, intentando con espacio...');
      
      // Si no se encuentra con +, intentar con espacio
      const filePathWithSpace = path.join(process.cwd(), 'public', 'images', decodedPath);
      console.log('Buscando archivo con espacio:', filePathWithSpace);
      
      try {
        await fs.access(filePathWithSpace);
        console.log('Archivo encontrado con espacio');
        return await serveImage(filePathWithSpace);
      } catch (spaceError) {
        console.error('Archivo no encontrado con espacio:', filePathWithSpace);
        
        // Si aún no se encuentra, listar los archivos disponibles para depuración
        console.log('Listando archivos en el directorio de imágenes:');
        const files = await fs.readdir(path.join(process.cwd(), 'public', 'images'));
        console.log(files);
        
        throw new Error(`No se pudo encontrar el archivo: ${decodedPath}`);
      }
    }
    
    // Verificar si el directorio de imágenes existe
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    try {
      await fs.access(imagesDir);
      console.log('Directorio de imágenes encontrado:', imagesDir);
    } catch (error) {
      console.error('Directorio de imágenes no encontrado:', imagesDir);
      return new NextResponse('Directorio de imágenes no encontrado', { status: 500 });
    }
    
    // Verificar si el archivo existe
    try {
      await fs.access(filePath);
      console.log('Archivo encontrado:', filePath);
    } catch (error) {
      console.error('Archivo no encontrado:', filePath);
      console.log('Contenido del directorio de imágenes:');
      const files = await fs.readdir(imagesDir);
      console.log(files);
      return new NextResponse('Imagen no encontrada', { status: 404 });
    }
    
    // Servir la imagen usando la función auxiliar
    return await serveImage(filePath);
  } catch (error) {
    console.error('Error al servir la imagen:', error);
    return new NextResponse('Error interno del servidor', { status: 500 });
  }
}
