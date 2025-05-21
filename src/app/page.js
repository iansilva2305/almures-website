import ImageCarousel from './components/ImageCarousel';

export const dynamic = 'force-static';

// Imágenes predeterminadas
const defaultImages = [
  '/images/almuerzo1.jpg',
  '/images/almuerzo2.jpg',
  '/images/almuerzo3.jpg',
  '/images/almuerzo4.jpg',
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
