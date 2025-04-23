
import { Motorcycle } from '@/lib/api';
import MotorcycleCard from './MotorcycleCard';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDownCircle } from 'lucide-react';
import Comparison from './Comparison';

interface ResultsProps {
  motorcycles: Motorcycle[];
}

const Results = ({ motorcycles }: ResultsProps) => {
  const [comparisonMotorcycles, setComparisonMotorcycles] = useState<Motorcycle[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleAddToComparison = (motorcycle: Motorcycle) => {
    if (comparisonMotorcycles.length < 3) {
      setComparisonMotorcycles([...comparisonMotorcycles, motorcycle]);
    }
  };

  const handleRemoveFromComparison = (id: number) => {
    setComparisonMotorcycles(comparisonMotorcycles.filter(moto => moto.id !== id));
  };

  const toggleComparison = () => {
    setShowComparison(!showComparison);
  };

  if (motorcycles.length === 0) {
    return null;
  }

  return (
    <section id="resultados" className="section-padding">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Tus Recomendaciones
            </h2>
            <p className="text-muted-foreground">
              Hemos encontrado {motorcycles.length} motos que se ajustan a tus preferencias.
            </p>
          </div>
          
          {comparisonMotorcycles.length > 0 && (
            <Button 
              onClick={toggleComparison}
              className="mt-4 md:mt-0 bg-secondary hover:bg-secondary/80"
            >
              {showComparison ? 'Ver Recomendaciones' : 'Ver Comparativa'}
              <ArrowDownCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {showComparison && comparisonMotorcycles.length > 0 ? (
          <Comparison 
            motorcycles={comparisonMotorcycles} 
            onRemove={handleRemoveFromComparison}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {motorcycles.map((motorcycle) => (
              <MotorcycleCard 
                key={motorcycle.id} 
                motorcycle={motorcycle} 
                onAddToComparison={handleAddToComparison}
                alreadyInComparison={comparisonMotorcycles.some(m => m.id === motorcycle.id)}
              />
            ))}
          </div>
        )}

        {comparisonMotorcycles.length > 0 && !showComparison && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {comparisonMotorcycles.length === 1 
                ? 'Has añadido 1 moto para comparar'
                : `Has añadido ${comparisonMotorcycles.length} motos para comparar`}
              {comparisonMotorcycles.length < 3 
                ? `. Puedes añadir ${3 - comparisonMotorcycles.length} más.`
                : '.'}
            </p>
            <Button 
              onClick={toggleComparison}
              className="bg-gradient-to-r from-[rgb(255,61,51)] to-[rgb(255,122,0)] hover:from-[rgb(255,122,0)] hover:to-[rgb(255,61,51)] text-white"
            >
              Ver Comparativa
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Results;
