import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { tiposMotos, tiposMotor, tiposTransmision, tiposFreno, tiposSuspension } from '@/lib/formMapping';

interface AdvancedFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

const AdvancedForm = ({ onSubmit, loading }: AdvancedFormProps) => {
  const [formData, setFormData] = useState({
    marca: '',
    cilindrada: '',
    potencia: '',
    tipoMoto: [] as string[],
    tipoMotor: '',
    tipoTransmision: '',
    frenoDelantero: '',
    frenoTrasero: '',
    suspensionDelantera: '',
    suspensionTrasera: '',
    peso: '',
    capacidadTanque: '',
    altoTotal: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'tipoMoto') {
      setFormData(prev => ({ ...prev, [name]: [value] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const processedData = { ...formData };
    
    const numericFields = ['cilindrada', 'potencia', 'peso', 'capacidadTanque', 'altoTotal'];
    
    for (const field of numericFields) {
      if (processedData[field as keyof typeof processedData]) {
        const fieldName = field as keyof typeof processedData;
        const numValue = Number(processedData[fieldName]);
        processedData[fieldName] = numValue as any;
      }
    }
    
    const cleanedData = Object.fromEntries(
      Object.entries(processedData).filter(([_, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== undefined && value !== null && value !== '';
      })
    );
    
    onSubmit(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        
        <div className="space-y-2">
          <Label htmlFor="tipoMoto">Tipo de Moto</Label>
          <Select onValueChange={(value) => handleSelectChange('tipoMoto', value)}>
            <SelectTrigger id="tipoMoto">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              {tiposMotos.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cilindrada">Cilindrada (cc)</Label>
          <Input 
            id="cilindrada" 
            name="cilindrada" 
            type="number" 
            placeholder="Ej: 500" 
            value={formData.cilindrada} 
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="potencia">Potencia (HP)</Label>
          <Input 
            id="potencia" 
            name="potencia" 
            type="number" 
            placeholder="Ej: 50" 
            value={formData.potencia} 
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tipoMotor">Tipo de Motor</Label>
          <Select onValueChange={(value) => handleSelectChange('tipoMotor', value)}>
            <SelectTrigger id="tipoMotor">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              {tiposMotor.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tipoTransmision">Tipo de Transmisión</Label>
          <Select onValueChange={(value) => handleSelectChange('tipoTransmision', value)}>
            <SelectTrigger id="tipoTransmision">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              {tiposTransmision.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="frenoDelantero">Freno Delantero</Label>
          <Select onValueChange={(value) => handleSelectChange('frenoDelantero', value)}>
            <SelectTrigger id="frenoDelantero">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              {tiposFreno.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="frenoTrasero">Freno Trasero</Label>
          <Select onValueChange={(value) => handleSelectChange('frenoTrasero', value)}>
            <SelectTrigger id="frenoTrasero">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              {tiposFreno.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="suspensionDelantera">Suspensión Delantera</Label>
          <Select onValueChange={(value) => handleSelectChange('suspensionDelantera', value)}>
            <SelectTrigger id="suspensionDelantera">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              {tiposSuspension.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="suspensionTrasera">Suspensión Trasera</Label>
          <Select onValueChange={(value) => handleSelectChange('suspensionTrasera', value)}>
            <SelectTrigger id="suspensionTrasera">
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              {tiposSuspension.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="peso">Peso (kg)</Label>
          <Input 
            id="peso" 
            name="peso" 
            type="number" 
            placeholder="Ej: 180" 
            value={formData.peso} 
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="capacidadTanque">Capacidad del Tanque (L)</Label>
          <Input 
            id="capacidadTanque" 
            name="capacidadTanque" 
            type="number" 
            placeholder="Ej: 15" 
            value={formData.capacidadTanque} 
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="altoTotal">Alto Total (mm)</Label>
          <Input 
            id="altoTotal" 
            name="altoTotal" 
            type="number" 
            placeholder="Ej: 800" 
            value={formData.altoTotal} 
            onChange={handleInputChange}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-[rgb(255,61,51)] to-[rgb(255,122,0)] hover:from-[rgb(255,122,0)] hover:to-[rgb(255,61,51)] text-white shadow-lg mt-8"
        disabled={loading}
      >
        {loading ? 'Buscando las mejores motos...' : 'Encontrar Motos'}
      </Button>
    </form>
  );
};

export default AdvancedForm;
