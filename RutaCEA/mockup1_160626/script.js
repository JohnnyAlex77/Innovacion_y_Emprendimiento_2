// ============================================================
//  RutaCEA – Mapa Interactivo del CEA
// ============================================================

// Coordenadas del CEA (centro del mapa)
const CEA_CENTER = [-33.4598, -70.6640];
const ZOOM_LEVEL = 16;

// ============================================================
// 1. DEFINICIÓN DE PUNTOS DE INTERÉS (POIs)
// ============================================================
const POIS = [
  {
    id: 'cea',
    nombre: 'CEA (Edificio Principal)',
    coords: [-33.4598, -70.6638],
    icono: 'fa-building',
    color: '#2E7D32',
    descripcion: 'Centro Educativo Ambiental – Edificio principal, huertos y salas de talleres.'
  },
  {
    id: 'huerto',
    nombre: 'Huerto del CEA',
    coords: [-33.4605, -70.6645],
    icono: 'fa-seedling',
    color: '#388E3C',
    descripcion: 'Huerto educativo – Cultivo de verduras, hierbas y plantas nativas.'
  },
  {
    id: 'compostaje',
    nombre: 'Área de Compostaje',
    coords: [-33.4589, -70.6632],
    icono: 'fa-recycle',
    color: '#6D4C41',
    descripcion: 'Punto de Compostaje – Transformación de residuos orgánicos en tierra fértil.'
  },
  {
    id: 'reciclaje',
    nombre: 'Punto de Reciclaje',
    coords: [-33.4595, -70.6650],
    icono: 'fa-trash-can',
    color: '#1565C0',
    descripcion: 'Punto Limpio – Separación de residuos reciclables (plástico, vidrio, papel).'
  },
  {
    id: 'entrada-verde',
    nombre: 'Entrada Parque (Av. Blanco Encalada)',
    coords: [-33.4610, -70.6640],
    icono: 'fa-person-walking',
    color: '#2E7D32',
    descripcion: 'Entrada Principal – Comienza aquí la Ruta Verde.'
  },
  {
    id: 'entrada-azul',
    nombre: 'Entrada Parque (Av. Beaucheff)',
    coords: [-33.4580, -70.6610],
    icono: 'fa-person-walking',
    color: '#1976D2',
    descripcion: 'Entrada Secundaria – Comienza aquí la Ruta Azul.'
  },
  {
    id: 'entrada-naranja',
    nombre: 'Entrada Parque (Av. Matta)',
    coords: [-33.4602, -70.6670],
    icono: 'fa-person-walking',
    color: '#F57C00',
    descripcion: 'Entrada por Av. Matta – Comienza aquí la Ruta Naranja.'
  }
];

// ============================================================
// 2. DEFINICIÓN DE RUTAS
// ============================================================
const RUTAS = {
  green: {
    id: 'green',
    nombre: 'Ruta Verde',
    color: '#2E7D32',
    puntos: [
      [-33.4610, -70.6640],
      [-33.4606, -70.6642],
      [-33.4602, -70.6640],
      [-33.4598, -70.6638]
    ]
  },
  blue: {
    id: 'blue',
    nombre: 'Ruta Azul',
    color: '#1976D2',
    puntos: [
      [-33.4580, -70.6610],
      [-33.4584, -70.6620],
      [-33.4588, -70.6630],
      [-33.4598, -70.6638]
    ]
  },
  orange: {
    id: 'orange',
    nombre: 'Ruta Naranja',
    color: '#F57C00',
    puntos: [
      [-33.4602, -70.6670],
      [-33.4600, -70.6658],
      [-33.4598, -70.6648],
      [-33.4598, -70.6638]
    ]
  }
};

// ============================================================
// 3. ESTADO DE LA APLICACIÓN
// ============================================================
const state = {
  map: null,
  markers: [],
  rutasLayers: [],
  activeRoutes: ['green', 'blue', 'orange'], // todas activas por defecto
  currentLocationMarker: null
};

// ============================================================
// 4. INICIALIZACIÓN DEL MAPA
// ============================================================
function initMap() {
  // Crear mapa
  const map = L.map('map', {
    center: CEA_CENTER,
    zoom: ZOOM_LEVEL,
    zoomControl: true,
    fadeAnimation: true,
    attributionControl: true
  });

  // Capa base (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  state.map = map;

  // Agregar controles de zoom en posición personalizada
  map.zoomControl.setPosition('bottomright');

  // ============================================================
  // 5. AGREGAR MARCADORES (POIs)
  // ============================================================
  POIS.forEach(poi => {
    // Icono personalizado usando divIcon
    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<i class="fas ${poi.icono}" style="color: white; font-size: 14px; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;"></i>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const marker = L.marker(poi.coords, { icon })
      .addTo(map)
      .bindPopup(`
        <strong>${poi.nombre}</strong><br>
        ${poi.descripcion}
      `);

    // Guardar referencia para usar después
    marker.poiData = poi;
    state.markers.push(marker);
  });

  // ============================================================
  // 6. AGREGAR RUTAS
  // ============================================================
  Object.values(RUTAS).forEach(ruta => {
    const polyline = L.polyline(ruta.puntos, {
      color: ruta.color,
      weight: 5,
      opacity: 0.8,
      dashArray: null,
      smoothFactor: 1
    }).addTo(map);

    // Guardar referencia
    polyline.rutaData = ruta;
    state.rutasLayers.push(polyline);
  });

  // ============================================================
  // 7. AJUSTAR VISTA PARA MOSTRAR TODOS LOS PUNTOS
  // ============================================================
  const allCoords = POIS.map(p => p.coords);
  const bounds = L.latLngBounds(allCoords);
  map.fitBounds(bounds, { padding: [50, 50] });

  // ============================================================
  // 8. EVENTOS Y CONTROLES
  // ============================================================
  setupEventListeners();

  return map;
}

// ============================================================
// 9. CONFIGURAR EVENTOS Y CONTROLES UI
// ============================================================
function setupEventListeners() {
  const map = state.map;

  // --- Botón "Mi ubicación" ---
  document.getElementById('btn-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const userLatLng = [latitude, longitude];

        // Remover marcador anterior si existe
        if (state.currentLocationMarker) {
          map.removeLayer(state.currentLocationMarker);
        }

        // Crear marcador de ubicación
        const icon = L.divIcon({
          className: 'custom-marker-location',
          html: `<i class="fas fa-circle" style="color: #D32F2F; font-size: 18px; text-shadow: 0 0 8px white;"></i>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        });

        state.currentLocationMarker = L.marker(userLatLng, { icon })
          .addTo(map)
          .bindPopup('📍 Estás aquí')
          .openPopup();

        map.setView(userLatLng, 17);
      },
      (err) => {
        alert('No se pudo obtener tu ubicación. Verifica los permisos de ubicación.');
        console.warn('Geolocation error:', err);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });

  // --- Botón "Acerca de" ---
  document.getElementById('btn-about').addEventListener('click', () => {
    // Cambiar a la pestaña "Acerca de"
    activateTab('info');
  });

  // --- Pestañas ---
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      activateTab(tabId);
    });
  });

  // --- Lista de POIs (click para centrar) ---
  document.getElementById('poi-list').addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const poiId = li.dataset.poiId;
    const poi = POIS.find(p => p.id === poiId);
    if (!poi) return;

    // Centrar mapa en el POI
    map.setView(poi.coords, 17);

    // Abrir popup del marcador correspondiente
    const marker = state.markers.find(m => m.poiData.id === poiId);
    if (marker) {
      marker.openPopup();
    }
  });

  // --- Botones de rutas ---
  document.querySelectorAll('.route-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const routeId = btn.dataset.route;
      toggleRoute(routeId);
    });
  });
}

// ============================================================
// 10. FUNCIONES DE UI
// ============================================================

// Activar una pestaña
function activateTab(tabId) {
  // Actualizar botones
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Actualizar contenido
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.toggle('active', tab.id === `tab-${tabId}`);
  });
}

// Renderizar lista de POIs
function renderPoiList() {
  const list = document.getElementById('poi-list');
  list.innerHTML = '';
  POIS.forEach(poi => {
    const li = document.createElement('li');
    li.dataset.poiId = poi.id;
    li.innerHTML = `
      <span class="poi-icon"><i class="fas ${poi.icono}" style="color: ${poi.color};"></i></span>
      <span class="poi-name">${poi.nombre}</span>
      <span class="poi-badge">${poi.descripcion.split('–')[0].trim()}</span>
    `;
    list.appendChild(li);
  });
}

// Mostrar/ocultar una ruta
function toggleRoute(routeId) {
  const map = state.map;

  if (routeId === 'all') {
    // Alternar entre mostrar todas y ocultar todas
    const allVisible = state.activeRoutes.length === Object.keys(RUTAS).length;
    if (allVisible) {
      // Ocultar todas
      state.rutasLayers.forEach(layer => {
        map.removeLayer(layer);
      });
      state.activeRoutes = [];
    } else {
      // Mostrar todas
      state.rutasLayers.forEach(layer => {
        map.addLayer(layer);
      });
      state.activeRoutes = Object.keys(RUTAS);
    }

    // Actualizar estilo de botones
    document.querySelectorAll('.route-btn').forEach(btn => {
      btn.classList.toggle('active-route', state.activeRoutes.includes(btn.dataset.route) || (btn.dataset.route === 'all' && state.activeRoutes.length === Object.keys(RUTAS).length));
    });
    return;
  }

  // Ruta específica
  const index = state.activeRoutes.indexOf(routeId);
  const layer = state.rutasLayers.find(l => l.rutaData.id === routeId);

  if (!layer) return;

  if (index === -1) {
    // Agregar ruta
    map.addLayer(layer);
    state.activeRoutes.push(routeId);
  } else {
    // Quitar ruta
    map.removeLayer(layer);
    state.activeRoutes.splice(index, 1);
  }

  // Actualizar estilo del botón
  const btn = document.querySelector(`.route-btn[data-route="${routeId}"]`);
  if (btn) {
    btn.classList.toggle('active-route', state.activeRoutes.includes(routeId));
  }

  // Actualizar botón "Mostrar todas"
  const allBtn = document.querySelector('.route-btn[data-route="all"]');
  if (allBtn) {
    const allVisible = state.activeRoutes.length === Object.keys(RUTAS).length;
    allBtn.classList.toggle('active-route', allVisible);
    allBtn.innerHTML = allVisible
      ? '<i class="fas fa-eye-slash"></i> Ocultar todas'
      : '<i class="fas fa-eye"></i> Mostrar todas';
  }
}

// ============================================================
// 11. INICIALIZAR APLICACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  renderPoiList();

  // Activar todas las rutas por defecto (visual)
  document.querySelectorAll('.route-btn').forEach(btn => {
    if (btn.dataset.route !== 'all') {
      btn.classList.add('active-route');
    }
  });

  // Mostrar todas las rutas activas
  const allBtn = document.querySelector('.route-btn[data-route="all"]');
  if (allBtn) {
    allBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar todas';
  }
});