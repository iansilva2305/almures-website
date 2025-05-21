import ImageCarousel from './components/ImageCarousel';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main>
      <ImageCarousel />
    </main>
  );
}

export const generateStaticParams = async () => {
  return [{}];
};

export const dynamicParams = false;
