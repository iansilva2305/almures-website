import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, ChevronDown, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';

// Componentes auxiliares
const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="inline-block py-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, onClick, children }) => (
  <a
    href={href}
    onClick={onClick}
    className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-md"
  >
    {children}
  </a>
);

const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
  >
    {icon}
  </a>
);

const LogoItem = () => (
  <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center p-4">
    <div className="w-full h-8 bg-gray-300 dark:bg-gray-600 animate-pulse rounded"></div>
  </div>
);

// Datos de pestañas de servicios
const serviceTabs = [
  {
    label: "CONSULTORÍA ESTRATÉGICA",
    title: "Trabajamos la identidad y reputación de tu marca, adaptándola a tus necesidades específicas",
    description: "Desarrollamos planes, y manuales sólidos, para contruir tu identidad, trabajamos en tu diferenciación y reputación, implementamos estrategias de marketing, y activaciones que fortalecen tu presencia en el mercado",
    buttonText: "Construye tu identidad"
  },
  {
    label: "CONSULTORÍA CORPORATIVA",
    title: "Te asistimos en la gestión comunicativa de tu empresa o marca personal a través de servicios personalizados",
    description: "Diseñamos estrategias para fortalecer tu marca, gestión de crisis, optimizar la comunicación corporativa, comunicación interna, creación de alianzar y parnerts estratégicos, o formación de equipos.",
    buttonText: "Estamos aquí para ti"
  },
  {
    label: "CREACIÓN DE CONTENIDOS",
    title: "Producción de fotografía, video, postproducción y edición digital",
    description: "Tejemos con contenido audiovisual y diseño, alineandolo con la estrategia de marca. Desarollamos tu storytelling, videos corporativos, contenido para redes sociales, y blogs, entre otros",
    buttonText: "Comienza a crear"
  },
  {
    label: "BRANDING DIGITAL",
    title: "Potenciamos la presencia digital de tu negocio + Publicidad (Google Ads, y Meta Ads)",
    description: "Desarrollamos planes de estrategia digital basados en análisis de mercado, competencia y tendencias. Entre ello trabajamos, SEO, SEM, campañas de social media, email marketing, y publicidad digital",
    buttonText: "Te hacemos crecer"
  },
  {
    label: "MARCA PERSONAL",
    title: "Contruimos tu identidad y posicionamiento para tu audiencia con estrategias de comunicación",
    description: "Estructuramos la marca personal de directivos, y emprendedores forjando una presencia visual y comunicativa. Nuestro enfoque integral te ayudará a destacar tu empresa, y crear sinergias.",
    buttonText: "Desarrollamos tu potencial"
  }
];

// Componente principal
const App = () => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: ''
  });
  const [formError, setFormError] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Efecto para evitar problemas de hidratación con el tema
  useEffect(() => {
    setMounted(true);
    // Comprobar preferencias guardadas
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    
    // Observar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle del menú móvil
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Cerrar menú móvil al hacer clic en un enlace
  const handleMobileNavClick = (event) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    toggleMobileMenu();
    
    // Scroll suave a la sección
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  // Toggle del tema claro/oscuro
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Aplicar clase al elemento HTML para el tema oscuro
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Validar email
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validar teléfono español
  const isValidPhone = (phone) => {
    const regex = /^(?:\+34|0034)?[6789]\d{8}$/;
    return regex.test(phone.replace(/\s/g, ''));
  };

  // Actualizar datos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo al editarlo
    if (formError[name]) {
      setFormError(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const errors = {};
    
    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es obligatorio';
    }
    
    if (!formData.correo.trim()) {
      errors.correo = 'El correo es obligatorio';
    } else if (!isValidEmail(formData.correo)) {
      errors.correo = 'Por favor, introduce un correo válido';
    }
    
    if (formData.telefono.trim() && !isValidPhone(formData.telefono)) {
      errors.telefono = 'Por favor, introduce un teléfono válido';
    }
    
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Datos del formulario:', formData);
      // Aquí iría la lógica de envío del formulario a través de una API
      // Por ejemplo con fetch o axios
      
      setFormSubmitted(true);
      
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          nombre: '',
          correo: '',
          telefono: '',
          mensaje: ''
        });
      }, 3000);
    }
  };

  // SEO Tags
  useEffect(() => {
    // Estos tags normalmente irían en el componente Head de Next.js
    // pero los dejamos aquí para mantener la estructura del código original
    document.title = 'ALMURES | Consultora de Branding Bespoke';
    
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'ALMURES es una consultora de branding bespoke que convierte visión en impacto. Especialistas en identidad de marca, comunicación y estrategias de crecimiento.';
    document.head.appendChild(metaDescription);
    
    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <header className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="font-serif text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                ALMURES
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <NavLink href="#bespoke">Bespoke</NavLink>
              <NavLink href="#servicios">Servicios</NavLink>
              <NavLink href="#distincion">Distinción</NavLink>
              <NavLink href="#contacto">Contacto</NavLink>
            </nav>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 mr-2"
                aria-label={mounted && theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
              >
                {mounted && theme === 'dark' ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-gray-700" />
                )}
              </button>

              <button
                className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X size={24} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu size={24} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 animate-fadeDown">
            <div className="container mx-auto px-4 py-3 space-y-1">
              <MobileNavLink href="#bespoke" onClick={handleMobileNavClick}>
                Bespoke
              </MobileNavLink>
              <MobileNavLink href="#servicios" onClick={handleMobileNavClick}>
                Servicios
              </MobileNavLink>
              <MobileNavLink href="#distincion" onClick={handleMobileNavClick}>
                Distinción
              </MobileNavLink>
              <MobileNavLink href="#contacto" onClick={handleMobileNavClick}>
                Contacto
              </MobileNavLink>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: "url('/images/site_background.jpg')" }}></div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="font-extralight">Tu empresa es </span>
              <span className="font-semibold italic">única</span>
              <span>,</span>
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="font-extralight">tu </span>
              <span className="font-semibold italic">branding</span>
              <span className="font-extralight"> también.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Bespoke Section */}
      <section id="bespoke" className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">ALMURES</p>
            <h2 className="text-3xl md:text-4xl uppercase font-normal mb-6">
              Consultora de branding <span className="text-yellow-600 dark:text-yellow-500 font-semibold italic">bespoke</span>
            </h2>
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-700 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Convertimos visión en impacto. Somos la consultora de referencia en el mercado hispano que define el branding, la comunicación y el crecimiento de negocio con estrategias a través de la fuerza visual. Diseñamos cada detalle para que tu marca hable el lenguaje de la exclusividad, conecte con su audiencia y deje una huella imborrable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="transform transition-all duration-500 animate-fadeIn">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">BESPOKE</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Es la creación de una identidad de marca completamente personalizada, adaptada a las necesidades y visión única de cada empresa. Cada elemento de la marca se diseña para reflejar su exclusividad y diferencia.
              </p>
            </div>
            <div className="hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
              <div className="w-full h-0 pb-[56.25%] relative">
                <video 
                  controls 
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  poster="/images/video-poster.jpg"
                >
                  <source src="/videos/almures-intro.mp4" type="video/mp4" />
                  Tu navegador no soporta videos HTML5.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="hidden md:block"></div>
            <div className="transform transition-all duration-500 animate-fadeIn">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Servicios</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Diseñamos para construir una identidad de marca sólida y única. Creamos las estrategias asegurándonos de que cada elemento refleje la esencia y los valores de tu empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap mb-8 border-b border-gray-300 dark:border-gray-700 overflow-x-auto">
              {serviceTabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                    activeTab === index
                      ? 'text-gray-900 dark:text-white border-b-2 border-yellow-600 dark:border-yellow-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                {serviceTabs[activeTab].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {serviceTabs[activeTab].description}
              </p>
              <a
                href="tel:+34665085979"
                className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
              >
                {serviceTabs[activeTab].buttonText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Distinción Section */}
      <section id="distincion" className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="hidden md:block"></div>
            <div className="opacity-100 transform transition-all duration-500 animate-fadeIn">
              <h3 className="text-2xl md:text-3xl font-medium mb-10 text-center md:text-left">
                ¿Por qué elegir<br />ALMURES?
              </h3>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-900 p-6 rounded-lg text-center">
                  <h4 className="text-2xl font-normal mb-2">+7<i> AÑOS</i></h4>
                  <div className="w-full h-px bg-gray-700 my-3"></div>
                  <p className="text-sm text-gray-400">Gestionando proyectos de comunicación</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg text-center">
                  <h4 className="text-2xl font-normal mb-2">+240M€</h4>
                  <div className="w-full h-px bg-gray-700 my-3"></div>
                  <p className="text-sm text-gray-400">Generados a empresas con proyectos</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-900 p-6 rounded-lg text-center">
                  <h4 className="text-xl font-normal mb-2">3<i> Paises</i></h4>
                  <div className="w-full h-px bg-gray-700 my-3"></div>
                  <p className="text-sm text-gray-400">Con sede en España, México, y Costa Rica</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg text-center">
                  <h4 className="text-xl font-normal mb-2">+86</h4>
                  <div className="w-full h-px bg-gray-700 my-3"></div>
                  <p className="text-sm text-gray-400">Clientes B2B y B2C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marcas Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
            <span>Hemos entregado </span>
            <span className="text-yellow-600 dark:text-yellow-500 italic font-medium">resultados</span>
            <span> para marcas de todos los sectores</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 opacity-70">
            {Array(12).fill().map((_, i) => (
              <LogoItem key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Equipo Section */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="transform transition-all duration-500 animate-fadeIn">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">UN EQUIPO QUE PIENSA EN TI</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Contamos con expertos especializados en cada disciplina, donde la calidad y el resultado final de nuestro trabajo son el reflejo de un proceso artesanal, meticulosamente diseñado y ejecutado, como un traje a medida que da cuenta de nuestra dedicación y pasión en cada proyecto que creamos.
              </p>
            </div>
            <div className="hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div></div>
            <div>
              <h2 className="text-3xl md:text-4xl font-medium mb-4">
                <a href="https://calendly.com/equipo-almures/reunion" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors uppercase">
                  Agenda tu llamada
                </a>
              </h2>
              <p className="text-gray-300 mb-8">
                Tu marca necesita solidez y distinción, agenda una llamada con nuestro equipo y descubre cómo podemos impulsar tus objetivos con soluciones exclusivas y personalizadas.
              </p>
              
              <a 
                href="https://calendly.com/equipo-almures/reunion" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300"
              >
                Agenda aquí
              </a>
              
              <div className="mt-8 text-gray-400">
                <p className="font-bold mb-2">O si lo prefieres:</p>
                <p>
                  Envíanos un correo a <span className="font-bold text-white">equipo@almures.com</span>
                </p>
                <p>
                  o llama al teléfono <span className="font-bold text-white">+34 665 08 59 79</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h3 className="text-2xl font-medium mb-8 text-center">Cuéntanos tu proyecto:</h3>
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${formError.nombre ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                  />
                  {formError.nombre && (
                    <p className="mt-1 text-sm text-red-500">{formError.nombre}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Correo *
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${formError.correo ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                  />
                  {formError.correo && (
                    <p className="mt-1 text-sm text-red-500">{formError.correo}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${formError.telefono ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                  />
                  {formError.telefono && (
                    <p className="mt-1 text-sm text-red-500">{formError.telefono}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Queremos saber un poco más
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="4"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                ></textarea>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300 flex items-center justify-center"
                  disabled={formSubmitted}
                >
                  {formSubmitted ? 'Mensaje enviado' : 'Enviar mensaje'}
                </button>
                
                {formSubmitted && (
                  <div className="ml-4 text-green-600 dark:text-green-400 animate-fadeIn">
                    ¡Mensaje enviado! Nos pondremos en contacto contigo pronto.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="font-bold italic mb-2">Contacto</p>
            <p className="text-gray-400">28050 Madrid, España</p>
            <p className="text-gray-400">665085979 / equipo@almures.com</p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-8">
            <SocialIcon icon={<Instagram size={20} />} href="https://www.instagram.com/almures_global/" />
            <SocialIcon icon={<Linkedin size={20} />} href="https://www.linkedin.com/company/69726084/admin/dashboard/" />
            <SocialIcon icon={<Youtube size={20} />} href="https://www.youtube.com/channel/UCh-12jMfcgzdFPe3lGoqhag" />
            <SocialIcon icon={<Twitter size={20} />} href="#" />
          </div>
          
          <div className="text-center">
            <a href="#" className="inline-block">
              <span className="font-serif text-xl md:text-2xl font-bold">ALMURES</span>
            </a>
            <p className="mt-4 text-sm text-gray-400">© {new Date().getFullYear()} ALMURES. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
