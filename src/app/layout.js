import { Inter, Playfair_Display, Roboto } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata = {
  title: 'Almures',
  description: 'Sitio web de Almures',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${roboto.variable}`}>
      <head></head>
      <body className="font-sans" style={{ fontFamily: 'var(--font-roboto), var(--font-inter), Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
