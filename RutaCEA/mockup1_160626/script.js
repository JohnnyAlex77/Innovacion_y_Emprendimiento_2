// ============================================================
//  RutaCEA – Mapa Interactivo del CEA (MOCKUP 1 CORREGIDO)
// ============================================================

const CEA_CENTER = [-33.4597, -70.6635];
const ZOOM_LEVEL = 16;

// ============================================================
// 1. PUNTOS DE INTERÉS (COORDENADAS REALES)
// ============================================================
const POIS = [
  {
    id: 'cea',
    nombre: 'CEA (Edificio Principal)',
    coords: [-33.4597, -70.6635],
    icono: 'fa-building',
    color: '#2E7D32',
    descripcion: 'Centro Educativo Ambiental – Edificio principal, huertos y talleres.'
  },
  {
    id: 'huerto',
    nombre: 'Huerto del CEA',
    coords: [-33.4602, -70.6630],
    icono: 'fa-seedling',
    color: '#388E3C',
    descripcion: 'Huerto educativo – Cultivo de verduras y plantas nativas.'
  },
  {
    id: 'compostaje',
    nombre: 'Área de Compostaje',
    coords: [-33.4590, -70.6640],
    icono: 'fa-recycle',
    color: '#6D4C41',
    descripcion: 'Punto de Compostaje – Transformación de residuos orgánicos.'
  },
  {
    id: 'reciclaje',
    nombre: 'Punto de Reciclaje',
    coords: [-33.4585, -70.6625],
    icono: 'fa-trash-can',
    color: '#1565C0',
    descripcion: 'Punto Limpio – Separación de residuos reciclables.'
  },
  {
    id: 'entrada-verde',
    nombre: 'Entrada Metro O\'Higgins',
    coords: [-33.4608, -70.6655],
    icono: 'fa-person-walking',
    color: '#2E7D32',
    descripcion: 'Entrada Principal – Comienza la Ruta Verde.'
  },
  {
    id: 'entrada-azul',
    nombre: 'Entrada Av. Beauchef',
    coords: [-33.4568, -70.6600],
    icono: 'fa-person-walking',
    color: '#1976D2',
    descripcion: 'Entrada Secundaria – Comienza la Ruta Azul.'
  },
  {
    id: 'entrada-naranja',
    nombre: 'Entrada Av. Rondizzoni',
    coords: [-33.4540, -70.6655],
    icono: 'fa-person-walking',
    color: '#F57C00',
    descripcion: 'Entrada por Av. Rondizzoni – Comienza la Ruta Naranja.'
  }
];

// ============================================================
// 2. RUTAS (COORDENADAS REALES)
// ============================================================
const RUTAS = {
  green: {
    id: 'green',
    nombre: 'Ruta Verde',
    color: '#2E7D32',
    puntos: [[-33.4608, -70.6655], [-33.4603, -70.6645], [-33.4597, -70.6635]]
  },
  blue: {
    id: 'blue',
    nombre: 'Ruta Azul',
    color: '#1976D2',
    puntos: [[-33.4568, -70.6600], [-33.4580, -70.6615], [-33.4597, -70.6635]]
  },
  orange: {
    id: 'orange',
    nombre: 'Ruta Naranja',
    color: '#F57C00',
    puntos: [[-33.4540, -70.6655], [-33.4555, -70.6645], [-33.4575, -70.6635], [-33.4597, -70.6635]]
  }
};

// ============================================================
// 3. ESTADO
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
    attributionControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  state.map = map;
  map.zoomControl.setPosition('bottomright');

  // Agregar marcadores
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
      .bindPopup(`<strong>${poi.nombre}</strong><br>${poi.descripcion}`);

    marker.poiData = poi;
    state.markers.push(marker);
  });

  // Agregar rutas
  Object.values(RUTAS).forEach(ruta => {
    const polyline = L.polyline(ruta.puntos, {
      color: ruta.color,
      weight: 5,
      opacity: 0.8
    }).addTo(map);
    polyline.rutaData = ruta;
    state.rutasLayers.push(polyline);
  });

  // Ajustar vista
  const bounds = L.latLngBounds(POIS.map(p => p.coords));
  map.fitBounds(bounds, { padding: [50, 50] });

  setTimeout(() => map.invalidateSize(), 300);

  setupEventListeners();
}

// ============================================================
// 5. EVENTOS
// ============================================================
function setupEventListeners() {
  const map = state.map;

  // Ubicación
  document.getElementById('btn-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLatLng = [pos.coords.latitude, pos.coords.longitude];

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
      () => alert('No se pudo obtener tu ubicación.'),
      { enableHighAccuracy: true }
    );
  });

  // Acerca de
  document.getElementById('btn-about').addEventListener('click', () => {
    activateTab('info');
  });

  // Pestañas
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activateTab(btn.dataset.tab);
    });
  });

  // Lista de POIs
  document.getElementById('poi-list').addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const poi = POIS.find(p => p.id === li.dataset.poiId);
    if (!poi) return;

    map.setView(poi.coords, 17);
    const marker = state.markers.find(m => m.poiData.id === poi.id);
    if (marker) marker.openPopup();
  });

  // Rutas
  document.querySelectorAll('.route-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleRoute(btn.dataset.route);
    });
  });
}

// ============================================================
// 6. FUNCIONES UI
// ============================================================
function activateTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.toggle('active', tab.id === `tab-${tabId}`);
  });
}

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

function toggleRoute(routeId) {
  const map = state.map;

  if (routeId === 'all') {
    const allVisible = state.activeRoutes.length === Object.keys(RUTAS).length;

    if (allVisible) {
      state.rutasLayers.forEach(layer => map.removeLayer(layer));
      state.activeRoutes = [];
    } else {
      state.rutasLayers.forEach(layer => map.addLayer(layer));
      state.activeRoutes = Object.keys(RUTAS);
    }

    const allBtn = document.querySelector('.route-btn[data-route="all"]');
    if (allBtn) {
      const visible = state.activeRoutes.length === Object.keys(RUTAS).length;
      allBtn.innerHTML = visible ? '<i class="fas fa-eye-slash"></i> Ocultar todas' : '<i class="fas fa-eye"></i> Mostrar todas';
      allBtn.classList.toggle('active-route', visible);
    }
    return;
  }

  const index = state.activeRoutes.indexOf(routeId);
  const layer = state.rutasLayers.find(l => l.rutaData.id === routeId);
  if (!layer) return;

  if (index === -1) {
    map.addLayer(layer);
    state.activeRoutes.push(routeId);
  } else {
    map.removeLayer(layer);
    state.activeRoutes.splice(index, 1);
  }

  const btn = document.querySelector(`.route-btn[data-route="${routeId}"]`);
  if (btn) btn.classList.toggle('active-route', state.activeRoutes.includes(routeId));
}

// ============================================================
// 7. INICIALIZAR
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  initMap();
  renderPoiList();
});