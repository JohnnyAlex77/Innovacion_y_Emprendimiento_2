// src/data/doors.js
export const DOORS = {
  door1: {
    id: 'door1',
    name: 'Puerta 1 - Metro Parque O\'Higgins',
    address: 'Av. Viel con Av. Matta (Metro Parque O\'Higgins)',
    coords: [-33.460633988030054, -70.65835487634902], // ✅ ACTUALIZADO
    route: 'green',
    icon: '🚪'
  },
  door2: {
    id: 'door2',
    name: 'Puerta 2 - Beauchef',
    address: 'Av. Beauchef 938',
    coords: [-33.46704, -70.66340], // ✅ ACTUALIZADO
    route: 'blue',
    icon: '🚪'
  },
  door3: {
    id: 'door3',
    name: 'Puerta 3 - Rondizzoni',
    address: 'Av. General Rondizzoni 473',
    coords: [-33.46978340588195, -70.65958600292596], // ✅ ACTUALIZADO
    route: 'orange',
    icon: '🚪'
  }
};

export const DOORS_LIST = Object.values(DOORS);