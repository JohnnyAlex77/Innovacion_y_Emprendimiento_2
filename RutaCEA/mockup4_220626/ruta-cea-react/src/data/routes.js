// src/data/routes.js
export const ROUTES = {
  green: {
    id: 'green',
    name: 'Verde',
    color: '#4caf50',
    duration: '10 min',
    distance: '0.8 km',
    points: [
      [-33.460633988030054, -70.65835487634902], // Puerta 1 - Metro
      [-33.4624, -70.6605], // Punto intermedio (aproximado)
      [-33.46403756318918, -70.66265950496233] // CEA ✅ ACTUALIZADO
    ],
    description: 'Ruta corta por el sector norte del parque'
  },
  blue: {
    id: 'blue',
    name: 'Azul',
    color: '#2196f3',
    duration: '15 min',
    distance: '1.2 km',
    points: [
      [-33.460597099786604, -70.66386247064762], // Puerta 2 - Beauchef ✅ ACTUALIZADO
      [-33.4623, -70.6632], // Punto intermedio (aproximado)
      [-33.46403756318918, -70.66265950496233] // CEA ✅ ACTUALIZADO
    ],
    description: 'Ruta media por el centro del parque'
  },
  orange: {
    id: 'orange',
    name: 'Naranja',
    color: '#ff9800',
    duration: '20 min',
    distance: '1.8 km',
    points: [
      [-33.46978340588195, -70.65958600292596], // Puerta 3 - Rondizzoni ✅ ACTUALIZADO
      [-33.4665, -70.6608], // Punto intermedio (aproximado)
      [-33.4650, -70.6615], // Punto intermedio (aproximado)
      [-33.46403756318918, -70.66265950496233] // CEA ✅ ACTUALIZADO
    ],
    description: 'Ruta larga que recorre todo el parque'
  }
};

export const ROUTE_NAMES = {
  green: 'Verde',
  blue: 'Azul',
  orange: 'Naranja'
};

export const ROUTE_COLORS = {
  green: '#4caf50',
  blue: '#2196f3',
  orange: '#ff9800'
};