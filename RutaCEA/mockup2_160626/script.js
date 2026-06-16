// ============================================================
//  RutaCEA – Mapa Interactivo del CEA (Diseño Alternativo)
// ============================================================

// Coordenadas del CEA
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
  activeRoutes: ['green', 'blue', 'orange'],
  currentLocationMarker: null
};

// ============================================================
// 4. INICIALIZACIÓN DEL MAPA
// ============================================================
function initMap() {
  const map = L.map('map', {
    center: CEA_CENTER,
    zoom: ZOOM_LEVEL,
    zoomControl: true,
    fadeAnimation: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  state.map = map;
  map.zoomControl.setPosition('bottomright');

  // ============================================================
  // 5. AGREGAR MARCADORES (POIs)
  // ============================================================
  POIS.forEach(poi => {
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
      smoothFactor: 1
    }).addTo(map);

    polyline.rutaData = ruta;
    state.rutasLayers.push(polyline);
  });

  // ============================================================
  // 7. AJUSTAR VISTA
  // ============================================================
  const allCoords = POIS.map(p => p.coords);
  const bounds = L.latLngBounds(allCoords);
  map.fitBounds(bounds, { padding: [50, 50] });

  // ============================================================
  // 8. EVENTOS
  // ============================================================
  setupEventListeners();
  renderPoiCards();
  updateCounter();

  return map;
}

// ============================================================
// 9. CONFIGURAR EVENTOS
// ============================================================
function setupEventListeners() {
  const map = state.map;

  // --- Mi ubicación ---
  document.getElementById('btn-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const userLatLng = [latitude, longitude];

        if (state.currentLocationMarker) {
          map.removeLayer(state.currentLocationMarker);
        }

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
      () => {
        alert('No se pudo obtener tu ubicación. Verifica los permisos.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });

  // --- Botón "Ver todo" (reset view) ---
  document.getElementById('btn-reset-view').addEventListener('click', () => {
    const allCoords = POIS.map(p => p.coords);
    const bounds = L.latLngBounds(allCoords);
    map.fitBounds(bounds, { padding: [50, 50] });
  });

  // --- Tabs ---
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      activateTab(tabId);
    });
  });

  // --- Click en tarjetas de POIs ---
  document.getElementById('poi-cards').addEventListener('click', (e) => {
    const card = e.target.closest('.poi-card');
    if (!card) return;
    const poiId = card.dataset.poiId;
    const poi = POIS.find(p => p.id === poiId);
    if (!poi) return;

    map.setView(poi.coords, 17);
    const marker = state.markers.find(m => m.poiData.id === poiId);
    if (marker) marker.openPopup();
  });

  // --- Toggles de rutas (click en toggle-item) ---
  document.querySelectorAll('.toggle-item').forEach(item => {
    item.addEventListener('click', () => {
      const routeId = item.dataset.route;
      toggleRoute(routeId);
    });
  });

  // --- Botón "Mostrar/Ocultar todas" ---
  document.getElementById('toggle-all-routes').addEventListener('click', () => {
    const allVisible = state.activeRoutes.length === Object.keys(RUTAS).length;
    if (allVisible) {
      // Ocultar todas
      state.rutasLayers.forEach(layer => {
        state.map.removeLayer(layer);
      });
      state.activeRoutes = [];
      document.querySelectorAll('.toggle-item').forEach(item => {
        item.classList.remove('active-route');
        item.classList.add('inactive-route');
        item.querySelector('.toggle-indicator').innerHTML = '<i class="fas fa-circle"></i>';
      });
      document.getElementById('toggle-all-routes').innerHTML = '<i class="fas fa-eye"></i> Mostrar todas';
    } else {
      // Mostrar todas
      state.rutasLayers.forEach(layer => {
        state.map.addLayer(layer);
      });
      state.activeRoutes = Object.keys(RUTAS);
      document.querySelectorAll('.toggle-item').forEach(item => {
        item.classList.add('active-route');
        item.classList.remove('inactive-route');
        item.querySelector('.toggle-indicator').innerHTML = '<i class="fas fa-check-circle"></i>';
      });
      document.getElementById('toggle-all-routes').innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar todas';
    }
  });
}

// ============================================================
// 10. FUNCIONES UI
// ============================================================

// Activar pestaña
function activateTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.toggle('active', tab.id === `tab-${tabId}`);
  });
}

// Renderizar tarjetas de POIs
function renderPoiCards() {
  const container = document.getElementById('poi-cards');
  container.innerHTML = '';
  POIS.forEach(poi => {
    const card = document.createElement('div');
    card.className = 'poi-card';
    card.dataset.poiId = poi.id;
    card.innerHTML = `
      <div class="card-icon" style="background: ${poi.color};">
        <i class="fas ${poi.icono}"></i>
      </div>
      <div class="card-info">
        <div class="card-title">${poi.nombre}</div>
        <div class="card-sub">${poi.descripcion.split('–')[0].trim()}</div>
      </div>
      <div class="card-arrow"><i class="fas fa-chevron-right"></i></div>
    `;
    container.appendChild(card);
  });
}

// Actualizar contador de POIs
function updateCounter() {
  document.getElementById('poi-counter').textContent = POIS.length;
}

// Mostrar/ocultar una ruta específica
function toggleRoute(routeId) {
  const map = state.map;
  const index = state.activeRoutes.indexOf(routeId);
  const layer = state.rutasLayers.find(l => l.rutaData.id === routeId);
  if (!layer) return;

  const toggleItem = document.querySelector(`.toggle-item[data-route="${routeId}"]`);
  const indicator = toggleItem.querySelector('.toggle-indicator');

  if (index === -1) {
    // Activar
    map.addLayer(layer);
    state.activeRoutes.push(routeId);
    toggleItem.classList.add('active-route');
    toggleItem.classList.remove('inactive-route');
    indicator.innerHTML = '<i class="fas fa-check-circle"></i>';
  } else {
    // Desactivar
    map.removeLayer(layer);
    state.activeRoutes.splice(index, 1);
    toggleItem.classList.remove('active-route');
    toggleItem.classList.add('inactive-route');
    indicator.innerHTML = '<i class="fas fa-circle"></i>';
  }

  // Actualizar botón "Mostrar todas"
  const allBtn = document.getElementById('toggle-all-routes');
  const allVisible = state.activeRoutes.length === Object.keys(RUTAS).length;
  if (allVisible) {
    allBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar todas';
  } else {
    allBtn.innerHTML = '<i class="fas fa-eye"></i> Mostrar todas';
  }
}

// ============================================================
// 11. INICIALIZAR APLICACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initMap();
});