
import { motion } from 'framer-motion';
import { formatCurrency, formatNumber } from '@/lib/formMapping';
import { Motorcycle } from '@/lib/api';
import { CircleIcon, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MotorcycleDetailsProps {
  motorcycle: Motorcycle;
}

const MotorcycleDetails = ({ motorcycle }: MotorcycleDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-secondary/50 rounded-b-xl px-6 py-4 mt-2 overflow-hidden border-t border-white/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <CircleIcon className="w-5 h-5 mr-2 text-primary" />
            Especificaciones Técnicas
          </h4>
          
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Potencia</span>
              <span className="font-medium">{formatNumber(motorcycle.potencia, "HP")}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Peso</span>
              <span className="font-medium">{formatNumber(motorcycle.peso, "kg")}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Capacidad Tanque</span>
              <span className="font-medium">{formatNumber(motorcycle.capacidadTanque, "L")}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Alto Total</span>
              <span className="font-medium">{formatNumber(motorcycle.altoTotal, "mm")}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Tipo de Motor</span>
              <span className="font-medium">{motorcycle.tipoMotor}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Transmisión</span>
              <span className="font-medium">{motorcycle.tipoTransmision}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Freno Delantero</span>
              <span className="font-medium">{motorcycle.frenoDelantero}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Freno Trasero</span>
              <span className="font-medium">{motorcycle.frenoTrasero}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Suspensión Delantera</span>
              <span className="font-medium">{motorcycle.suspensionDelantera}</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Suspensión Trasera</span>
              <span className="font-medium">{motorcycle.suspensionTrasera}</span>
            </div>
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <h4 className="font-semibold text-lg mb-2">Descripción</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {motorcycle.descripcion}
            </p>
          </div>
          
          <Button 
            className="w-full mt-4 bg-gradient-to-r from-[rgb(255,61,51)] to-[rgb(255,122,0)] hover:from-[rgb(255,122,0)] hover:to-[rgb(255,61,51)] text-white"
            onClick={() => motorcycle.link && window.open(motorcycle.link, '_blank')}
          >
            Más Información
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MotorcycleDetails;
