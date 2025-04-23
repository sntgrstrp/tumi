
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formMapping';

interface BasicFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

const BasicForm = ({ onSubmit, loading }: BasicFormProps) => {
  const [formData, setFormData] = useState({
    tipoDeUso: 'Ciudad',
    altura: 170,
    presupuesto: 8000,
    peso: 70,
    marca: ''
  });

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, tipoDeUso: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a cleaned form data object without empty fields
    const cleanedData = { ...formData };
    if (!cleanedData.marca) delete cleanedData.marca;
    
    onSubmit(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Tipo de Uso Principal</h3>
          <RadioGroup 
            defaultValue="Ciudad" 
            value={formData.tipoDeUso}
            onValueChange={handleRadioChange}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {['Ciudad', 'Carretera', 'Todo Terreno', 'Cualquiera'].map((tipo) => (
              <Card 
                key={tipo} 
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  formData.tipoDeUso === tipo 
                    ? 'border-primary shadow-[0_0_15px_rgba(255,61,51,0.2)]' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleRadioChange(tipo)}
              >
                <RadioGroupItem 
                  value={tipo} 
                  id={`tipo-${tipo}`} 
                  className="sr-only" 
                />
                <Label 
                  htmlFor={`tipo-${tipo}`}
                  className="flex flex-col items-center space-y-2 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    formData.tipoDeUso === tipo ? 'tumi-gradient' : 'bg-secondary'
                  }`}>
                    {/* Icons would ideally be here, using a placeholder for now */}
                    <span className="text-xl font-bold">{tipo.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium">{tipo}</span>
                </Label>
              </Card>
            ))}
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label htmlFor="altura">Altura (cm): {formData.altura}</Label>
            <Slider 
              id="altura" 
              min={140} 
              max={210} 
              step={1} 
              defaultValue={[170]} 
              value={[formData.altura]} 
              onValueChange={(value) => handleSliderChange('altura', value)}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>140 cm</span>
              <span>210 cm</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="peso">Peso (kg): {formData.peso}</Label>
            <Slider 
              id="peso" 
              min={40} 
              max={150} 
              step={1} 
              defaultValue={[70]} 
              value={[formData.peso]} 
              onValueChange={(value) => handleSliderChange('peso', value)}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>40 kg</span>
              <span>150 kg</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="presupuesto">Presupuesto: {formatCurrency(formData.presupuesto)}</Label>
          <Slider 
            id="presupuesto" 
            min={2000} 
            max={30000} 
            step={500} 
            defaultValue={[8000]} 
            value={[formData.presupuesto]} 
            onValueChange={(value) => handleSliderChange('presupuesto', value)}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>2.000 €</span>
            <span>30.000 €</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="marca">Marca (Opcional)</Label>
          <Input 
            id="marca" 
            name="marca" 
            placeholder="Ej: Honda, Yamaha, BMW..." 
            value={formData.marca} 
            onChange={handleInputChange}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-[rgb(255,61,51)] to-[rgb(255,122,0)] hover:from-[rgb(255,122,0)] hover:to-[rgb(255,61,51)] text-white shadow-lg"
        disabled={loading}
      >
        {loading ? 'Buscando las mejores motos...' : 'Encontrar Motos'}
      </Button>
    </form>
  );
};

export default BasicForm;
