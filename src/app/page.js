import ImageCarousel from './components/ImageCarousel';

export const dynamic = 'force-static';

// Imágenes predeterminadas
const defaultImages = [
  '/almures-website/images/almuerzo1.jpg',
  '/almures-website/images/almuerzo2.jpg',
  '/almures-website/images/almuerzo3.jpg',
  '/almures-website/images/almuerzo4.jpg',
];

export default function Home() {
  return (
    <main>
      <ImageCarousel images={defaultImages} />
    </main>
  );
}

// Generar la página estáticamente en tiempo de compilación
export const dynamicParams = false;
