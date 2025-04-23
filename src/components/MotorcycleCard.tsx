
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Motorcycle } from '@/lib/api';
import { formatCurrency, formatNumber } from '@/lib/formMapping';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import MotorcycleDetails from './MotorcycleDetails';

interface MotorcycleCardProps {
  motorcycle: Motorcycle;
  onAddToComparison: (motorcycle: Motorcycle) => void;
  alreadyInComparison: boolean;
}

const MotorcycleCard = ({ 
  motorcycle, 
  onAddToComparison,
  alreadyInComparison
}: MotorcycleCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDetails = () => {
    setExpanded(!expanded);
  };

  const handleAddToComparison = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToComparison(motorcycle);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="motorcycle-card bg-card"
    >
      <div 
        className="cursor-pointer"
        onClick={toggleDetails}
      >
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <img 
            src={motorcycle.imagen || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070"} 
            alt={`${motorcycle.marca} ${motorcycle.modelo}`}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-0 right-0 m-3">
            <div className="tumi-gradient font-bold text-white text-sm px-3 py-1 rounded-full">
              {motorcycle.porcentajeSimilitud}% Match
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl mb-1">{motorcycle.marca} {motorcycle.modelo}</h3>
              <div className="text-xs text-muted-foreground mb-3 flex space-x-2">
                <span>{motorcycle.tipoMoto}</span>
                <span>•</span>
                <span>{formatNumber(motorcycle.cilindrada, "cc")}</span>
              </div>
            </div>
            <div className="text-xl font-bold tumi-gradient-text">
              {formatCurrency(motorcycle.precio)}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleDetails}
              className="flex items-center space-x-1"
            >
              <span>{expanded ? 'Ocultar detalles' : 'Ver detalles'}</span>
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost"
              onClick={handleAddToComparison}
              disabled={alreadyInComparison}
              className={`text-xs ${alreadyInComparison ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-white'}`}
            >
              <Plus className="w-4 h-4 mr-1" /> 
              {alreadyInComparison ? 'Añadido' : 'Comparar'}
            </Button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <MotorcycleDetails motorcycle={motorcycle} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MotorcycleCard;
