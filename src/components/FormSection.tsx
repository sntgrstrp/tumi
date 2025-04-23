
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import BasicForm from './BasicForm';
import AdvancedForm from './AdvancedForm';
import { useToast } from '@/hooks/use-toast';
import { getRecommendations, getMockRecommendations, Motorcycle } from '@/lib/api';
import { tipoDeUsoMapeo } from '@/lib/formMapping';

interface FormSectionProps {
  onResults: (results: Motorcycle[]) => void;
}

const FormSection = ({ onResults }: FormSectionProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const processBasicForm = (formData: any) => {
    // Map tipo de uso to actual motorcycle types
    if (formData.tipoDeUso && formData.tipoDeUso !== 'Cualquiera') {
      formData.tipoMoto = tipoDeUsoMapeo[formData.tipoDeUso as keyof typeof tipoDeUsoMapeo];
    }
    // Remove the tipoDeUso field as it's not needed for the API
    const { tipoDeUso, ...apiData } = formData;
    return apiData;
  };

  const handleSubmit = async (data: any, isBasic = false) => {
    setLoading(true);
    
    try {
      // Process the form data if it's from the basic form
      const apiData = isBasic ? processBasicForm(data) : data;
      
      // Get recommendations (for development, we're using mock data)
      // In production, you'd use: const results = await getRecommendations(apiData);
      const results = getMockRecommendations();
      
      // Update the results
      onResults(results);
      
      toast({
        title: "¡Recomendaciones listas!",
        description: `Hemos encontrado ${results.length} motos que se ajustan a tus preferencias.`,
      });
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al obtener las recomendaciones. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="formulario" className="section-padding bg-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Encuentra tu moto ideal
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dinos qué necesitas y te recomendaremos las motocicletas perfectas para ti.
          </p>
        </div>

        <Card className="glass-card">
          <CardContent className="p-6">
            <Tabs defaultValue="basico" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="basico">Modo Básico</TabsTrigger>
                <TabsTrigger value="avanzado">Modo Avanzado</TabsTrigger>
              </TabsList>
              <TabsContent value="basico">
                <BasicForm onSubmit={(data) => handleSubmit(data, true)} loading={loading} />
              </TabsContent>
              <TabsContent value="avanzado">
                <AdvancedForm onSubmit={(data) => handleSubmit(data, false)} loading={loading} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FormSection;
