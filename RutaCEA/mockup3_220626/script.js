// ============================================
// RutaCEA - Mapa Interactivo
// ============================================

// ===== CONFIGURACIÓN =====
const CONFIG = {
    // Coordenadas del Parque O'Higgins (Santiago, Chile)
    parkCenter: [-33.4569, -70.6624],
    zoom: 16,
    // Puntos de interés
    points: {
        cea: {
            id: 'cea',
            name: 'Centro Educativo Ambiental (CEA)',
            coords: [-33.4580, -70.6600],
            icon: '🏛️',
            description: 'Centro Educativo Ambiental de la Municipalidad de Santiago. Aquí podrás aprender sobre sustentabilidad, economía circular y participar en talleres y actividades.',
            image: 'https://placehold.co/600x400/2d6a3f/white?text=CEA'
        },
        huerto: {
            id: 'huerto',
            name: 'Huerto Comunitario',
            coords: [-33.4572, -70.6615],
            icon: '🌿',
            description: 'Huerto urbano donde la comunidad cultiva verduras y hortalizas de forma orgánica. ¡Puedes participar y aprender sobre agricultura urbana!',
            image: 'https://placehold.co/600x400/4caf50/white?text=Huerto+Comunitario'
        },
        compostaje: {
            id: 'compostaje',
            name: 'Punto de Compostaje',
            coords: [-33.4588, -70.6608],
            icon: '♻️',
            description: 'Punto de acopio de residuos orgánicos para compostaje. Aprende a transformar tus desechos en abono para las áreas verdes del parque.',
            image: 'https://placehold.co/600x400/ff9800/white?text=Compostaje'
        },
        reciclaje: {
            id: 'reciclaje',
            name: 'Punto de Reciclaje',
            coords: [-33.4560, -70.6620],
            icon: '🗑️',
            description: 'Punto limpio para separar y reciclar vidrio, plástico, papel y cartón. ¡Cada residuo correctamente separado suma!',
            image: 'https://placehold.co/600x400/2196f3/white?text=Reciclaje'
        }
    },
    // Puertas de entrada
    doors: {
        mattaviel: { name: 'Metro Parque O\'Higgins', coords: [-33.4598, -70.6635], route: 'green' },
        beauchef: { name: 'Av. Beauchef 938', coords: [-33.4550, -70.6610], route: 'blue' },
        rondizzoni: { name: 'Av. General Rondizzoni 473', coords: [-33.4545, -70.6650], route: 'orange' }
    },
    // Rutas
    routes: {
        green: {
            name: 'Verde',
            color: '#4caf50',
            waypoints: [[-33.4598, -70.6635], [-33.4588, -70.6618], [-33.4580, -70.6600]]
        },
        blue: {
            name: 'Azul',
            color: '#2196f3',
            waypoints: [[-33.4550, -70.6610], [-33.4565, -70.6605], [-33.4580, -70.6600]]
        },
        orange: {
            name: 'Naranja',
            color: '#ff9800',
            waypoints: [[-33.4545, -70.6650], [-33.4560, -70.6630], [-33.4572, -70.6610], [-33.4580, -70.6600]]
        }
    }
};

// ===== ESTADO =====
let state = {
    currentRoute: 'green',
    map: null,
    markers: [],
    polylines: [],
    currentPolyline: null,
    userLocation: null,
    isTracking: false
};

// ===== DOM REFS =====
const $ = id => document.getElementById(id);
const screens = {
    splash: $('splash-screen'),
    home: $('home-screen'),
    map: $('map-screen'),
    arrival: $('arrival-screen')
};
const mapContainer = $('map-container');
const infoPanel = $('info-panel');
const legendModal = $('legend-modal');

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Ocultar splash después de animación
    setTimeout(() => {
        screens.splash.style.display = 'none';
        // La home ya está visible por defecto
    }, 3500);

    // Eventos
    $('btn-scan-qr').addEventListener('click', handleScanQR);
    $('btn-back-home').addEventListener('click', goHome);
    $('btn-legend').addEventListener('click', toggleLegend);
    $('btn-close-legend').addEventListener('click', toggleLegend);
    $('btn-close-info').addEventListener('click', hideInfoPanel);
    $('btn-locate').addEventListener('click', locateUser);
    $('btn-visit-cea').addEventListener('click', () => showPointInfo('cea'));

    // Selector de ruta
    document.querySelectorAll('.route-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const route = this.dataset.route;
            switchRoute(route);
        });
    });
});

// ===== ACCIONES =====

function handleScanQR() {
    // Simular escaneo QR - elegir ruta aleatoria
    const routes = ['green', 'blue', 'orange'];
    const randomRoute = routes[Math.floor(Math.random() * routes.length)];
    switchRoute(randomRoute);
    showMap();
}

function showMap() {
    screens.home.classList.add('hidden');
    screens.map.classList.remove('hidden');
    screens.arrival.classList.add('hidden');

    // Inicializar mapa si no existe
    if (!state.map) {
        initMap();
    } else {
        state.map.invalidateSize();
    }
}

function goHome() {
    screens.map.classList.add('hidden');
    screens.arrival.classList.add('hidden');
    screens.home.classList.remove('hidden');
    hideInfoPanel();
}

function showArrival() {
    screens.map.classList.add('hidden');
    screens.arrival.classList.remove('hidden');
    hideInfoPanel();
}

function resetApp() {
    goHome();
    // Resetear selección de ruta
    document.querySelectorAll('.route-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.route-btn.green').classList.add('active');
    state.currentRoute = 'green';
    updateRouteDisplay('green');
}

// ===== MAPA =====

function initMap() {
    state.map = L.map(mapContainer, {
        center: CONFIG.parkCenter,
        zoom: CONFIG.zoom,
        zoomControl: false,
        attributionControl: true
    });

    // Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(state.map);

    // Ajustar tamaño
    setTimeout(() => state.map.invalidateSize(), 300);

    // Dibujar puntos y rutas
    drawPoints();
    drawRoute(state.currentRoute);

    // Evento click en mapa
    state.map.on('click', function(e) {
        // Verificar si se hizo clic en un marcador (ya manejado por el popup)
    });
}

function drawPoints() {
    // Limpiar marcadores anteriores
    state.markers.forEach(m => state.map.removeLayer(m));
    state.markers = [];

    // Agregar puntos de interés
    Object.values(CONFIG.points).forEach(point => {
        const marker = L.marker(point.coords, {
            icon: L.divIcon({
                html: `<div style="font-size:32px;text-align:center;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.2));">${point.icon}</div>`,
                className: 'custom-marker',
                iconSize: [40, 40],
                iconAnchor: [20, 40]
            })
        }).addTo(state.map);

        // Popup
        marker.bindPopup(`
            <strong>${point.icon} ${point.name}</strong><br>
            <span style="font-size:13px;color:#4a5a4a;">${point.description.substring(0, 80)}...</span><br>
            <button onclick="showPointInfo('${point.id}')" style="margin-top:8px;background:#2d6a3f;color:white;border:none;padding:6px 16px;border-radius:20px;font-size:13px;cursor:pointer;">
                Ver más
            </button>
        `, { maxWidth: 260 });

        state.markers.push(marker);
    });
}

function drawRoute(routeKey) {
    const route = CONFIG.routes[routeKey];
    if (!route) return;

    // Limpiar polyline anterior
    if (state.currentPolyline) {
        state.map.removeLayer(state.currentPolyline);
    }

    // Dibujar nueva ruta
    state.currentPolyline = L.polyline(route.waypoints, {
        color: route.color,
        weight: 5,
        opacity: 0.8,
        dashArray: null,
        smoothFactor: 1
    }).addTo(state.map);

    // Ajustar vista para mostrar toda la ruta
    const bounds = L.latLngBounds(route.waypoints);
    state.map.fitBounds(bounds, { padding: [40, 40] });

    // Actualizar UI
    updateRouteDisplay(routeKey);
}

function switchRoute(routeKey) {
    state.currentRoute = routeKey;
    drawRoute(routeKey);

    // Actualizar botones
    document.querySelectorAll('.route-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.route === routeKey);
    });

    hideInfoPanel();
}

function updateRouteDisplay(routeKey) {
    const route = CONFIG.routes[routeKey];
    const nameDisplay = document.getElementById('route-name-display');
    const indicator = document.querySelector('.route-indicator');

    if (nameDisplay) nameDisplay.textContent = route.name;
    if (indicator) {
        indicator.className = `route-indicator ${routeKey}`;
    }
}

// ===== INFO DE PUNTOS =====

function showPointInfo(pointId) {
    const point = CONFIG.points[pointId];
    if (!point) return;

    const panel = infoPanel;
    document.getElementById('point-icon').textContent = point.icon;
    document.getElementById('point-title').textContent = point.name;
    document.getElementById('point-description').textContent = point.description;

    const media = document.getElementById('point-media');
    const img = document.getElementById('point-image');
    if (point.image) {
        media.classList.remove('hidden');
        img.src = point.image;
        img.alt = point.name;
    } else {
        media.classList.add('hidden');
    }

    // Cambiar texto del botón si es CEA
    const btn = document.getElementById('btn-visit-cea');
    if (pointId === 'cea') {
        btn.textContent = '🎉 ¡Llegaste al CEA!';
        btn.style.background = '#ff9800';
        btn.style.color = 'white';
        btn.onclick = showArrival;
    } else {
        btn.textContent = '📍 Visitar CEA';
        btn.style.background = '#e8f0e8';
        btn.style.color = '#1a4a2a';
        btn.onclick = () => showPointInfo('cea');
    }

    panel.classList.remove('hidden');
}

function hideInfoPanel() {
    infoPanel.classList.add('hidden');
}

// ===== LEGENDA =====

function toggleLegend() {
    legendModal.classList.toggle('hidden');
}

// ===== UBICACIÓN =====

function locateUser() {
    if (!state.map) return;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const userLatLng = [lat, lng];

                // Agregar marcador de ubicación
                if (state.userLocation) {
                    state.map.removeLayer(state.userLocation);
                }

                state.userLocation = L.marker(userLatLng, {
                    icon: L.divIcon({
                        html: `<div style="background:#2196f3;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 4px rgba(33,150,243,0.4);"></div>`,
                        className: 'user-location',
                        iconSize: [16, 16],
                        iconAnchor: [8, 8]
                    })
                }).addTo(state.map);

                state.map.setView(userLatLng, 18);
            },
            function(error) {
                alert('No se pudo obtener tu ubicación. Asegúrate de permitir el acceso a la ubicación.');
            },
            { enableHighAccuracy: true }
        );
    } else {
        alert('Tu navegador no soporta geolocalización.');
    }
}

// ===== EXPONER FUNCIONES GLOBALES =====
window.showPointInfo = showPointInfo;
window.showArrival = showArrival;
window.showMap = showMap;
window.resetApp = resetApp;
window.goHome = goHome;