
export const tipoDeUsoMapeo = {
  "Ciudad": ["Naked", "Scooter", "Urbana", "Automática", "Semiautomática"],
  "Carretera": ["Deportiva", "Naked"],
  "Todo Terreno": ["Todo Terreno", "Semiautomática"],
  "Cualquiera": null // No aplicar filtro
};

export const tiposMotos = [
  "Naked",
  "Deportiva", 
  "Scooter",
  "Urbana",
  "Todo Terreno",
  "Cruiser",
  "Custom",
  "Touring",
  "Adventure",
  "Trail",
  "Supermotard"
];

export const tiposMotor = [
  "Monocilíndrico",
  "Bicilíndrico en paralelo",
  "Bicilíndrico en V (V-Twin)",
  "Tricilíndrico en línea", 
  "Tetracilíndrico en línea",
  "Boxer",
  "Rotativo"
];

export const tiposTransmision = [
  "Manual",
  "Automática",
  "Semiautomática"
];

export const tiposFreno = [
  "Disco",
  "Disco doble",
  "Tambor"
];

export const tiposSuspension = [
  "Horquilla telescópica",
  "Horquilla invertida",
  "Monoamortiguador",
  "Doble amortiguador",
  "Basculante"
];

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(value);
};

export const formatNumber = (value: number, unit: string = ""): string => {
  return `${value.toLocaleString('es-ES')}${unit ? ` ${unit}` : ''}`;
};
