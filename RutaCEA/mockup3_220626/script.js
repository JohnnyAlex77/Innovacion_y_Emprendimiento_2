// ============================================
// RutaCEA - Mapa Interactivo
// COORDENADAS REALES - Parque O'Higgins
// VERSIÓN CORREGIDA CON Z-INDEX Y FUNCIONALIDAD COMPLETA
// ============================================

// ===== CONFIGURACIÓN =====
const CONFIG = {
    parkCenter: [-33.4590, -70.6630],
    zoom: 16,
    
    points: {
        cea: {
            id: 'cea',
            name: 'Centro Educativo Ambiental (CEA)',
            coords: [-33.4597, -70.6635],
            icon: '🏛️',
            description: 'Centro Educativo Ambiental de la Municipalidad de Santiago. Aquí podrás aprender sobre sustentabilidad, economía circular y participar en talleres y actividades gratuitas para toda la comunidad.',
            image: 'https://placehold.co/600x400/2d6a3f/white?text=CEA'
        },
        huerto: {
            id: 'huerto',
            name: 'Huerto Comunitario',
            coords: [-33.4602, -70.6630],
            icon: '🌿',
            description: 'Huerto urbano comunitario donde se cultivan verduras, hortalizas y plantas nativas de forma orgánica. ¡Puedes participar en talleres de agricultura urbana!',
            image: 'https://placehold.co/600x400/4caf50/white?text=Huerto+Comunitario'
        },
        compostaje: {
            id: 'compostaje',
            name: 'Punto de Compostaje',
            coords: [-33.4590, -70.6640],
            icon: '♻️',
            description: 'Punto de acopio de residuos orgánicos para compostaje. Aprende a transformar tus desechos en abono natural para las áreas verdes del parque.',
            image: 'https://placehold.co/600x400/ff9800/white?text=Compostaje'
        },
        reciclaje: {
            id: 'reciclaje',
            name: 'Punto de Reciclaje',
            coords: [-33.4585, -70.6625],
            icon: '🗑️',
            description: 'Punto limpio para separar y reciclar vidrio, plástico, papel, cartón y latas. ¡Cada residuo correctamente separado contribuye al cuidado del medio ambiente!',
            image: 'https://placehold.co/600x400/2196f3/white?text=Reciclaje'
        }
    },
    
    doors: {
        entrada_matta: { 
            name: 'Metro Parque O\'Higgins (Av. Matta con Viel)', 
            coords: [-33.4608, -70.6655], 
            route: 'green' 
        },
        entrada_beauchef: { 
            name: 'Av. Beauchef 938', 
            coords: [-33.4568, -70.6600], 
            route: 'blue' 
        },
        entrada_rondizzoni: { 
            name: 'Av. General Rondizzoni 473', 
            coords: [-33.4540, -70.6655], 
            route: 'orange' 
        }
    },
    
    routes: {
        green: {
            name: 'Verde',
            color: '#4caf50',
            waypoints: [
                [-33.4608, -70.6655],
                [-33.4603, -70.6645],
                [-33.4597, -70.6635]
            ]
        },
        blue: {
            name: 'Azul',
            color: '#2196f3',
            waypoints: [
                [-33.4568, -70.6600],
                [-33.4580, -70.6615],
                [-33.4597, -70.6635]
            ]
        },
        orange: {
            name: 'Naranja',
            color: '#ff9800',
            waypoints: [
                [-33.4540, -70.6655],
                [-33.4555, -70.6645],
                [-33.4575, -70.6635],
                [-33.4597, -70.6635]
            ]
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
    selectedPointId: null
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
    setTimeout(() => {
        screens.splash.style.display = 'none';
    }, 3500);

    initMap();

    $('btn-scan-qr').addEventListener('click', handleScanQR);
    $('btn-back-home').addEventListener('click', goHome);
    $('btn-legend').addEventListener('click', toggleLegend);
    $('btn-close-legend').addEventListener('click', toggleLegend);
    $('btn-close-info').addEventListener('click', hideInfoPanel);
    $('btn-locate').addEventListener('click', locateUser);
    $('btn-visit-cea').addEventListener('click', () => showPointInfo('cea'));

    document.querySelectorAll('.route-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const route = this.dataset.route;
            switchRoute(route);
        });
    });

    // ✅ Cerrar info panel al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (infoPanel && !infoPanel.classList.contains('hidden')) {
            const isClickInside = infoPanel.contains(e.target);
            const isClickOnMarker = e.target.closest('.leaflet-marker-icon') || e.target.closest('.leaflet-popup');
            if (!isClickInside && !isClickOnMarker) {
                hideInfoPanel();
            }
        }
    });
});

// ===== ACCIONES =====

function handleScanQR() {
    const routes = ['green', 'blue', 'orange'];
    const randomRoute = routes[Math.floor(Math.random() * routes.length)];
    switchRoute(randomRoute);
    showMap();
}

function showMap() {
    screens.home.classList.add('hidden');
    screens.map.classList.remove('hidden');
    screens.arrival.classList.add('hidden');

    if (state.map) {
        setTimeout(() => state.map.invalidateSize(), 300);
        state.map.setView(CONFIG.parkCenter, 16);
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
    document.querySelectorAll('.route-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.route-btn.green').classList.add('active');
    state.currentRoute = 'green';
    updateRouteDisplay('green');
    drawRoute('green');
    hideInfoPanel();
}

// ===== MAPA =====

function initMap() {
    if (state.map) return;

    state.map = L.map(mapContainer, {
        center: CONFIG.parkCenter,
        zoom: CONFIG.zoom,
        zoomControl: false,
        attributionControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
    }).addTo(state.map);

    // ✅ Forzar que el contenedor del mapa ocupe todo el espacio
    setTimeout(() => {
        state.map.invalidateSize();
    }, 300);

    drawPoints();
    drawRoute(state.currentRoute);
}

function drawPoints() {
    if (!state.map) return;

    state.markers.forEach(m => state.map.removeLayer(m));
    state.markers = [];

    Object.values(CONFIG.points).forEach(point => {
        const marker = L.marker(point.coords, {
            icon: L.divIcon({
                html: `<div style="font-size:32px;text-align:center;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.2));">${point.icon}</div>`,
                className: 'custom-marker',
                iconSize: [40, 40],
                iconAnchor: [20, 40]
            })
        }).addTo(state.map);

        // ✅ Evento click en el marcador para mostrar info
        marker.on('click', function() {
            showPointInfo(point.id);
        });

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
    if (!state.map) {
        console.warn('Mapa no inicializado');
        return;
    }

    const route = CONFIG.routes[routeKey];
    if (!route) return;

    if (state.currentPolyline) {
        state.map.removeLayer(state.currentPolyline);
        state.currentPolyline = null;
    }

    state.currentPolyline = L.polyline(route.waypoints, {
        color: route.color,
        weight: 5,
        opacity: 0.8,
        dashArray: null,
        smoothFactor: 1
    }).addTo(state.map);

    const bounds = L.latLngBounds(route.waypoints);
    state.map.fitBounds(bounds, { padding: [50, 50] });

    updateRouteDisplay(routeKey);
}

function switchRoute(routeKey) {
    state.currentRoute = routeKey;
    drawRoute(routeKey);

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

    // ✅ Cerrar cualquier popup abierto
    state.markers.forEach(m => m.closePopup());

    state.selectedPointId = pointId;

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

    infoPanel.classList.remove('hidden');
}

function hideInfoPanel() {
    infoPanel.classList.add('hidden');
    state.selectedPointId = null;
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