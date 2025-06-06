
import { Bike, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 place-items-start justify-center text-center md:text-left">
          <div className="w-full flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <Bike className="h-6 w-6 text-ubike" />
              <span className="text-xl font-bold ubike-gradient">TuMI</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">
              Encuentra tu moto ideal con la ayuda de nuestra avanzada inteligencia artificial. Recomendaciones personalizadas según tus características y preferencias.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-ubike transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-ubike transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-ubike transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="w-full flex flex-col items-center md:items-start">
            <h3 className="font-bold mb-4">Enlances Rápidos</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <a href="#" className="text-muted-foreground hover:text-ubike transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-ubike transition-colors">
                  Cómo Funciona
                </a>
              </li>
              <li>
                <a href="#finder" className="text-muted-foreground hover:text-ubike transition-colors">
                  Buscador de Motos
                </a>
              </li>
              <li>
                <a href="#comparison" className="text-muted-foreground hover:text-ubike transition-colors">
                  Comparador
                </a>
              </li>
            </ul>
          </div>
          
          <div className="w-full flex flex-col items-center md:items-start">
            <h3 className="font-bold mb-4">Contacto</h3>
            <address className="not-italic text-muted-foreground text-center md:text-left">
              <p>Correo: tumitumotoideal@gmail.com</p>
              <p>Teléfono: +57 316 824 1098</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TuMI. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
