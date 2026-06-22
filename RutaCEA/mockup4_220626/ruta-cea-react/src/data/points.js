// src/data/points.js
export const POINTS = {
  cea: {
    id: 'cea',
    name: 'Centro Educativo Ambiental (CEA)',
    coords: [-33.46403756318918, -70.66265950496233], // ✅ ACTUALIZADO
    icon: '🏛️',
    description: 'Centro Educativo Ambiental de la Municipalidad de Santiago. Aquí podrás aprender sobre sustentabilidad, economía circular y participar en talleres y actividades.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    type: 'destination',
    color: '#2d6a3f'
  },
  huerto: {
    id: 'huerto',
    name: 'Huerto Comunitario',
    coords: [-33.4641296733008, -70.66252323979717], // ✅ ACTUALIZADO
    icon: '🌿',
    description: 'Huerto urbano donde la comunidad cultiva verduras y hortalizas de forma orgánica. ¡Puedes participar y aprender sobre agricultura urbana!',
    image: 'https://images.unsplash.com/photo-1466692476869-a1081e776560?w=400&h=300&fit=crop',
    type: 'interest',
    color: '#4caf50'
  },
  compostaje: {
    id: 'compostaje',
    name: 'Punto de Compostaje',
    coords: [-33.46420117310819, -70.66254692201362], // ✅ ACTUALIZADO
    icon: '♻️',
    description: 'Punto de acopio de residuos orgánicos para compostaje. Aprende a transformar tus desechos en abono para las áreas verdes del parque.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
    type: 'interest',
    color: '#ff9800'
  },
  reciclaje: {
    id: 'reciclaje',
    name: 'Punto de Reciclaje',
    coords: [-33.46408263401791, -70.66274314688243], // ✅ ACTUALIZADO
    icon: '🗑️',
    description: 'Punto limpio para separar y reciclar vidrio, plástico, papel y cartón. ¡Cada residuo correctamente separado suma!',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
    type: 'interest',
    color: '#2196f3'
  }
};

export const POINTS_LIST = Object.values(POINTS);