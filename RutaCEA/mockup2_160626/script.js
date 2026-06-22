// ============================================================
//  RutaCEA – Mapa Interactivo (MOCKUP 2 CORREGIDO)
// ============================================================

const CEA_CENTER = [-33.4597, -70.6635];
const ZOOM_LEVEL = 16;

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

const state = {
  map: null,
  markers: [],
  rutasLayers: [],
  activeRoutes: ['green', 'blue', 'orange'],
  currentLocationMarker: null
};

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

  Object.values(RUTAS).forEach(ruta => {
    const polyline = L.polyline(ruta.puntos, {
      color: ruta.color,
      weight: 5,
      opacity: 0.8
    }).addTo(map);
    polyline.rutaData = ruta;
    state.rutasLayers.push(polyline);
  });

  const bounds = L.latLngBounds(POIS.map(p => p.coords));
  map.fitBounds(bounds, { padding: [50, 50] });

  setTimeout(() => map.invalidateSize(), 300);

  setupEventListeners();
  renderPoiCards();
  document.getElementById('poi-counter').textContent = POIS.length;
}

function setupEventListeners() {
  const map = state.map;

  document.getElementById('btn-location').addEventListener('click', () => {
    if (!navigator.geolocation) return alert('Geolocalización no soportada.');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLatLng = [pos.coords.latitude, pos.coords.longitude];
        if (state.currentLocationMarker) map.removeLayer(state.currentLocationMarker);

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
      () => alert('No se pudo obtener tu ubicación.')
    );
  });

  document.getElementById('btn-reset-view').addEventListener('click', () => {
    const bounds = L.latLngBounds(POIS.map(p => p.coords));
    map.fitBounds(bounds, { padding: [50, 50] });
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.toggle('active', tab.id === `tab-${btn.dataset.tab}`);
      });
    });
  });

  document.getElementById('poi-cards').addEventListener('click', (e) => {
    const card = e.target.closest('.poi-card');
    if (!card) return;
    const poi = POIS.find(p => p.id === card.dataset.poiId);
    if (!poi) return;
    map.setView(poi.coords, 17);
    const marker = state.markers.find(m => m.poiData.id === poi.id);
    if (marker) marker.openPopup();
  });

  document.querySelectorAll('.toggle-item').forEach(item => {
    item.addEventListener('click', () => {
      const routeId = item.dataset.route;
      toggleRoute(routeId);
    });
  });

  document.getElementById('toggle-all-routes').addEventListener('click', () => {
    const allVisible = state.activeRoutes.length === Object.keys(RUTAS).length;
    if (allVisible) {
      state.rutasLayers.forEach(layer => map.removeLayer(layer));
      state.activeRoutes = [];
      document.querySelectorAll('.toggle-item').forEach(item => {
        item.classList.remove('active-route');
        item.classList.add('inactive-route');
        item.querySelector('.toggle-indicator').innerHTML = '<i class="fas fa-circle"></i>';
      });
      document.getElementById('toggle-all-routes').innerHTML = '<i class="fas fa-eye"></i> Mostrar todas';
    } else {
      state.rutasLayers.forEach(layer => map.addLayer(layer));
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

function toggleRoute(routeId) {
  const map = state.map;
  const index = state.activeRoutes.indexOf(routeId);
  const layer = state.rutasLayers.find(l => l.rutaData.id === routeId);
  if (!layer) return;

  const toggleItem = document.querySelector(`.toggle-item[data-route="${routeId}"]`);
  const indicator = toggleItem.querySelector('.toggle-indicator');

  if (index === -1) {
    map.addLayer(layer);
    state.activeRoutes.push(routeId);
    toggleItem.classList.add('active-route');
    toggleItem.classList.remove('inactive-route');
    indicator.innerHTML = '<i class="fas fa-check-circle"></i>';
  } else {
    map.removeLayer(layer);
    state.activeRoutes.splice(index, 1);
    toggleItem.classList.remove('active-route');
    toggleItem.classList.add('inactive-route');
    indicator.innerHTML = '<i class="fas fa-circle"></i>';
  }

  const allBtn = document.getElementById('toggle-all-routes');
  const allVisible = state.activeRoutes.length === Object.keys(RUTAS).length;
  allBtn.innerHTML = allVisible ? '<i class="fas fa-eye-slash"></i> Ocultar todas' : '<i class="fas fa-eye"></i> Mostrar todas';
}

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
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', initMap);