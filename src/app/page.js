import dynamic from "next/dynamic";

// Importar dinámicamente el componente App para evitar problemas de hidratación
const App = dynamic(() => import("./components/App"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <App />
    </main>
  );
}
