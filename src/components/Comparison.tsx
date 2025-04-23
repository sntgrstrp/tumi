
import { Motorcycle } from '@/lib/api';
import { formatCurrency, formatNumber } from '@/lib/formMapping';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ComparisonProps {
  motorcycles: Motorcycle[];
  onRemove: (id: number) => void;
}

const Comparison = ({ motorcycles, onRemove }: ComparisonProps) => {
  const specs = [
    { label: 'Precio', key: 'precio', format: (value: number) => formatCurrency(value) },
    { label: 'Cilindrada', key: 'cilindrada', format: (value: number) => formatNumber(value, 'cc') },
    { label: 'Potencia', key: 'potencia', format: (value: number) => formatNumber(value, 'HP') },
    { label: 'Peso', key: 'peso', format: (value: number) => formatNumber(value, 'kg') },
    { label: 'Cap. Tanque', key: 'capacidadTanque', format: (value: number) => formatNumber(value, 'L') },
    { label: 'Alto Total', key: 'altoTotal', format: (value: number) => formatNumber(value, 'mm') },
    { label: 'Tipo Motor', key: 'tipoMotor', format: (value: string) => value },
    { label: 'Transmisión', key: 'tipoTransmision', format: (value: string) => value },
    { label: 'Freno Del.', key: 'frenoDelantero', format: (value: string) => value },
    { label: 'Freno Tras.', key: 'frenoTrasero', format: (value: string) => value },
    { label: 'Susp. Del.', key: 'suspensionDelantera', format: (value: string) => value },
    { label: 'Susp. Tras.', key: 'suspensionTrasera', format: (value: string) => value },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass-card p-6 rounded-xl"
    >
      <h3 className="text-2xl font-bold mb-6">Comparativa de Motos</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-3 border-b border-white/10 w-1/4">Especificación</th>
              {motorcycles.map((moto) => (
                <th key={moto.id} className="p-3 border-b border-white/10">
                  <div className="relative">
                    <div className="flex flex-col items-center">
                      <div className="h-24 w-24 mb-2 mx-auto overflow-hidden rounded-lg">
                        <img 
                          src={moto.imagen || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070"} 
                          alt={`${moto.marca} ${moto.modelo}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h4 className="font-bold">{moto.marca} {moto.modelo}</h4>
                      <p className="text-xs text-muted-foreground">{moto.tipoMoto}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute -right-2 -top-2 rounded-full h-6 w-6"
                      onClick={() => onRemove(moto.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec) => (
              <tr key={spec.key} className="hover:bg-secondary/50 transition-colors">
                <td className="text-left p-3 border-b border-white/5 font-medium">
                  {spec.label}
                </td>
                {motorcycles.map((moto) => {
                  const value = moto[spec.key as keyof Motorcycle];
                  const isHighest = spec.key !== 'peso' && motorcycles.every(
                    otherMoto => 
                      otherMoto === moto || 
                      (typeof value === 'number' && typeof otherMoto[spec.key as keyof Motorcycle] === 'number' && 
                       value > (otherMoto[spec.key as keyof Motorcycle] as number))
                  );
                  const isLowest = spec.key === 'peso' && motorcycles.every(
                    otherMoto => 
                      otherMoto === moto || 
                      (typeof value === 'number' && typeof otherMoto[spec.key as keyof Motorcycle] === 'number' && 
                       value < (otherMoto[spec.key as keyof Motorcycle] as number))
                  );
                  const highlight = (isHighest || isLowest) && motorcycles.length > 1;
                  
                  return (
                    <td 
                      key={`${moto.id}-${spec.key}`} 
                      className={`p-3 text-center border-b border-white/5 ${highlight ? 'text-primary font-bold' : ''}`}
                    >
                      {typeof value !== 'undefined' ? (
                        spec.format(value as never)
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td className="text-left p-3 font-medium">Match</td>
              {motorcycles.map((moto) => (
                <td key={`${moto.id}-match`} className="p-3 text-center">
                  <div className="tumi-gradient text-white px-2 py-1 rounded-full inline-block font-bold">
                    {moto.porcentajeSimilitud}%
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Comparison;
