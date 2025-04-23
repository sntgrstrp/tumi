
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section 
      id="inicio" 
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.5)), url('https://images.unsplash.com/photo-1558979159-2b18a4070a87?q=80&w=2071')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Encuentra la moto <span className="tumi-gradient-text">perfecta</span> para ti
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in">
          TuMI analiza tus necesidades y preferencias para recomendarte las motocicletas que mejor se adaptan a ti.
        </p>
        
        <Button 
          size="lg"
          className="bg-gradient-to-r from-[rgb(255,61,51)] to-[rgb(255,122,0)] hover:from-[rgb(255,122,0)] hover:to-[rgb(255,61,51)] text-white border-none transition-all duration-300 animate-fade-in px-8 py-6 text-lg"
          onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Comienza Ahora
        </Button>
      </div>
      
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown className="h-10 w-10 text-primary" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
