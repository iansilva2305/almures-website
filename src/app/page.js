import ImageCarousel from './components/ImageCarousel';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main>
      <ImageCarousel />
    </main>
  );
}

// Generar la página estáticamente en tiempo de compilación
export const dynamicParams = false;
