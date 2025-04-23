
import axios from 'axios';

const API_URL = 'http://localhost:5000';

interface FormData {
  tipoDeUso?: string;
  altura?: number;
  presupuesto?: number;
  peso?: number;
  marca?: string;
  cilindrada?: number;
  potencia?: number;
  tipoMoto?: string[];
  tipoMotor?: string;
  tipoTransmision?: string;
  frenoDelantero?: string;
  frenoTrasero?: string;
  suspensionDelantera?: string;
  suspensionTrasera?: string;
  capacidadTanque?: number;
  altoTotal?: number;
}

export interface Motorcycle {
  id: number;
  marca: string;
  modelo: string;
  precio: number;
  tipoMoto: string;
  cilindrada: number;
  potencia: number;
  peso: number;
  capacidadTanque: number;
  altoTotal: number;
  tipoMotor: string;
  tipoTransmision: string;
  frenoDelantero: string;
  frenoTrasero: string;
  suspensionDelantera: string;
  suspensionTrasera: string;
  imagen: string;
  descripcion: string;
  porcentajeSimilitud: number;
  link?: string;
}

export const getRecommendations = async (formData: FormData): Promise<Motorcycle[]> => {
  try {
    // Remove empty values from the form data
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== undefined && value !== null && value !== '';
      })
    );

    const response = await axios.post(`${API_URL}/recomendar`, cleanedData);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};

// Mock data for development purposes
export const getMockRecommendations = (): Motorcycle[] => {
  return [
    {
      id: 1,
      marca: "Honda",
      modelo: "CB500F",
      precio: 7499,
      tipoMoto: "Naked",
      cilindrada: 471,
      potencia: 47,
      peso: 189,
      capacidadTanque: 17.1,
      altoTotal: 785,
      tipoMotor: "Bicilíndrico en paralelo",
      tipoTransmision: "Manual",
      frenoDelantero: "Disco",
      frenoTrasero: "Disco",
      suspensionDelantera: "Horquilla telescópica",
      suspensionTrasera: "Monoamortiguador",
      imagen: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070",
      descripcion: "La Honda CB500F es una naked de media cilindrada, perfecta para conductores que buscan una moto versátil para uso diario y viajes de fin de semana.",
      porcentajeSimilitud: 95
    },
    {
      id: 2,
      marca: "Yamaha",
      modelo: "MT-07",
      precio: 7699,
      tipoMoto: "Naked",
      cilindrada: 689,
      potencia: 73,
      peso: 184,
      capacidadTanque: 14,
      altoTotal: 805,
      tipoMotor: "Bicilíndrico en paralelo",
      tipoTransmision: "Manual",
      frenoDelantero: "Disco",
      frenoTrasero: "Disco",
      suspensionDelantera: "Horquilla telescópica",
      suspensionTrasera: "Monoamortiguador",
      imagen: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?q=80&w=1974",
      descripcion: "La Yamaha MT-07 es una naked de media cilindrada con un motor bicilíndrico en paralelo que ofrece un gran par motor y diversión en cada trayecto.",
      porcentajeSimilitud: 88
    },
    {
      id: 3,
      marca: "Kawasaki",
      modelo: "Z650",
      precio: 7549,
      tipoMoto: "Naked",
      cilindrada: 649,
      potencia: 68,
      peso: 187,
      capacidadTanque: 15,
      altoTotal: 790,
      tipoMotor: "Bicilíndrico en paralelo",
      tipoTransmision: "Manual",
      frenoDelantero: "Disco",
      frenoTrasero: "Disco",
      suspensionDelantera: "Horquilla telescópica",
      suspensionTrasera: "Monoamortiguador",
      imagen: "https://images.unsplash.com/photo-1635073908681-644df6ba5c39?q=80&w=2048",
      descripcion: "La Kawasaki Z650 es una naked de media cilindrada con un diseño agresivo y un motor bicilíndrico que ofrece potencia y agilidad para el día a día.",
      porcentajeSimilitud: 82
    },
    {
      id: 4,
      marca: "Suzuki",
      modelo: "SV650",
      precio: 7199,
      tipoMoto: "Naked",
      cilindrada: 645,
      potencia: 75,
      peso: 198,
      capacidadTanque: 14.5,
      altoTotal: 785,
      tipoMotor: "V-Twin",
      tipoTransmision: "Manual",
      frenoDelantero: "Disco",
      frenoTrasero: "Disco",
      suspensionDelantera: "Horquilla telescópica",
      suspensionTrasera: "Monoamortiguador",
      imagen: "https://images.unsplash.com/photo-1650231334722-5de5ae9bce2c?q=80&w=1975",
      descripcion: "La Suzuki SV650 es una naked con motor V-twin que ofrece un gran carácter y sonido, ideal para conductores que buscan una moto con personalidad.",
      porcentajeSimilitud: 78
    },
    {
      id: 5,
      marca: "Triumph",
      modelo: "Trident 660",
      precio: 8295,
      tipoMoto: "Naked",
      cilindrada: 660,
      potencia: 81,
      peso: 189,
      capacidadTanque: 14,
      altoTotal: 805,
      tipoMotor: "Tricilíndrico en línea",
      tipoTransmision: "Manual",
      frenoDelantero: "Disco doble",
      frenoTrasero: "Disco",
      suspensionDelantera: "Horquilla telescópica",
      suspensionTrasera: "Monoamortiguador",
      imagen: "https://images.unsplash.com/photo-1638362984163-2933ddd1c208?q=80&w=2070",
      descripcion: "La Triumph Trident 660 es una naked de media cilindrada con un motor tricilíndrico que ofrece un carácter único y una gran calidad de acabados.",
      porcentajeSimilitud: 73
    }
  ];
};
