// src/data/points.js
// ✅ PUNTOS DE INTERÉS CON COORDENADAS REALES

export const POINTS = {
  cea: {
    id: 'cea',
    name: 'Centro Educativo Ambiental (CEA)',
    coords: [-33.46413, -70.66259], 
    icon: '🏛️',
    description: `El Centro Educativo Ambiental (CEA) de la Municipalidad de Santiago es un espacio dedicado a la educación y promoción de la sustentabilidad, economía circular y cuidado del medio ambiente.

📍 Servicios y actividades:
• Talleres de compostaje y huertos urbanos
• Charlas sobre reciclaje y economía circular
• Visitas guiadas para colegios y comunidades
• Puntos de información ambiental
• Actividades gratuitas para toda la comunidad

🌱 El CEA está abierto de lunes a viernes de 9:00 a 18:00 horas. ¡Te esperamos!`,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    type: 'destination',
    color: '#2d6a3f'
  },
  huerto: {
    id: 'huerto',
    name: 'Huerto Comunitario',
    coords: [-33.46361, -70.65867], 
    icon: '🌿',
    description: `El Huerto Comunitario del Parque O'Higgins es un espacio de cultivo urbano donde la comunidad puede aprender y participar en agricultura sostenible.

🌱 ¿Qué encontrarás?
• Cultivo de verduras, hortalizas y plantas nativas
• Técnicas de agricultura orgánica
• Compostaje y uso de abonos naturales
• Actividades para niños y adultos

💚 Participa en los talleres de huertos urbanos que se realizan todos los sábados de 10:00 a 13:00 horas.`,
    image: 'https://images.unsplash.com/photo-1466692476869-a1081e776560?w=400&h=300&fit=crop',
    type: 'interest',
    color: '#4caf50'
  },
  compostaje: {
    id: 'compostaje',
    name: 'Punto de Compostaje',
    coords: [-33.46488, -70.65896], 
    icon: '♻️',
    description: `El Punto de Compostaje es un espacio donde los residuos orgánicos se transforman en abono natural para las áreas verdes del parque.

♻️ ¿Cómo funciona?
• Acopio de residuos orgánicos (cáscaras, restos de verduras, hojas)
• Proceso de descomposición controlada
• Producción de compost para el parque y la comunidad
• Talleres de compostaje para vecinos

🍂 ¡Trae tus residuos orgánicos y aprende a hacer compostaje en casa!`,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
    type: 'interest',
    color: '#ff9800'
  },
  reciclaje: {
    id: 'reciclaje',
    name: 'Punto de Reciclaje',
    coords: [-33.46282, -70.65867], 
    icon: '🗑️',
    description: `El Punto de Reciclaje es un espacio limpio donde la comunidad puede separar y depositar residuos reciclables para su correcto tratamiento.

♻️ ¿Qué puedes reciclar?
• Vidrio (botellas, frascos)
• Plástico (botellas, envases)
• Papel y cartón (periódicos, cajas)
• Latas y metales

💚 ¡Cada residuo correctamente separado contribuye al cuidado del medio ambiente y al desarrollo de la economía circular!`,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop',
    type: 'interest',
    color: '#2196f3'
  }
};

export const POINTS_LIST = Object.values(POINTS);