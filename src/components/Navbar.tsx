
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bike, Search, Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? true
        : false;
    }
    return true;
  });

  // Modo oscuro/claro
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);

    // Ajuste para el scroll del comparador
    let scrollId = id;
    if (id === "comparison") {
      scrollId = "comparison-section"; // ID consistente con la sección de comparación
    }

    if (scrollId === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(scrollId);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        console.error(`Element with id "${scrollId}" not found`);
        // Fallback suave
        location.hash = `#${scrollId}`;
      }
    }, 100);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-2 bg-background/90 backdrop-blur-md border-b border-white/10" : "py-4"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bike className="h-8 w-8 text-ubike" />
            <span className="text-xl font-bold ubike-gradient">TuMI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-foreground/80 hover:text-ubike transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection(''); }}>Inicio</a>
            <a href="#"
              onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
              className="text-sm text-foreground/80 hover:text-ubike transition-colors">Cómo Funciona</a>
            <a href="#"
              onClick={(e) => { e.preventDefault(); scrollToSection('step-by-step-finder'); }}
              className="text-sm text-foreground/80 hover:text-ubike transition-colors">Buscador</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              className="bg-ubike hover:bg-ubike/90 text-white"
              size="sm"
              onClick={() => scrollToSection('step-by-step-finder')}
            >
              <Search className="h-4 w-4 mr-2" /> Buscar Moto
            </Button>
            {/* Botón dark/light */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
              onClick={() => setIsDark(d => !d)}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-white/10 animate-fade-in">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col gap-4">
            <a href="#" className="text-foreground/80 hover:text-ubike py-2 transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection(''); }}>
              Inicio
            </a>
            <a href="#" className="text-foreground/80 hover:text-ubike py-2 transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>
              Cómo Funciona
            </a>
            <a href="#" className="text-foreground/80 hover:text-ubike py-2 transition-colors" onClick={(e) => { e.preventDefault(); scrollToSection('step-by-step-finder'); }}>
              Buscador
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
              <Button className="w-full bg-ubike hover:bg-ubike/90 justify-center" onClick={() => scrollToSection('step-by-step-finder')}>
                <Search className="h-4 w-4 mr-2" /> Buscar Moto
              </Button>
              {/* Botón dark/light en menú mobile */}
              <Button
                variant="ghost"
                size="sm"
                className="justify-center mt-2"
                onClick={() => setIsDark(d => !d)}
                aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />} {isDark ? "Claro" : "Oscuro"}
              </Button>
            </div>
          </nav>
        </div>
      </div>}
    </header>
  );
};

export default Navbar;
