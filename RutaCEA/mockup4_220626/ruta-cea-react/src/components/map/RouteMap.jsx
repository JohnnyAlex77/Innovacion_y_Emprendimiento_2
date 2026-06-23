// src/components/map/RouteMap.jsx
// ✅ SOLUCIÓN: Desactivar popups de Leaflet, usar solo InfoPanel de React

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../../context/AppContext';
import { ROUTES } from '../../data/routes';
import { POINTS_LIST } from '../../data/points';
import { DOORS_LIST } from '../../data/doors';
import '../../styles/components.css';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Crear iconos personalizados para los puntos de interés
const createCustomIcon = (emoji, isDestination = false) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: ${isDestination ? '#2d6a3f' : 'white'};
        border-radius: 50%;
        width: ${isDestination ? '48px' : '40px'};
        height: ${isDestination ? '48px' : '40px'};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${isDestination ? '28px' : '24px'};
        border: 3px solid ${isDestination ? '#4caf50' : '#ddd'};
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        cursor: pointer;
      ">
        ${emoji}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
    // ✅ IMPORTANTE: Desactivar el popup automático
    interactive: true
  });
};

// ✅ Crear icono para puertas (sin popup)
const createDoorIcon = (isSelected) => {
  return L.divIcon({
    className: 'door-marker',
    html: `
      <div style="
        background: ${isSelected ? '#2d6a3f' : '#666'};
        color: white;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        border: 2px solid ${isSelected ? '#4caf50' : '#999'};
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        cursor: pointer;
      ">
        🚪
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    interactive: true
  });
};

// ✅ Crear icono de ubicación de usuario
const createUserIcon = () => {
  return L.divIcon({
    className: 'user-marker',
    html: `
      <div style="
        background: #2196f3;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        border: 3px solid white;
        box-shadow: 0 0 0 8px rgba(33, 150, 243, 0.3);
        animation: pulse-ring 2s infinite;
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

export const RouteMap = () => {
  const { 
    currentRoute, 
    selectPoint, 
    userLocation, 
    setUserLocation,
    visits,
    setVisits,
    selectedPoint
  } = useApp();
  
  const mapRef = useRef(null);
  const markerRefs = useRef({});

  // Obtener la ruta actual
  const route = ROUTES[currentRoute];
  const routePoints = route.points;

  // Efecto para la geolocalización
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude
          ]);
        },
        (error) => {
          console.log('Error obteniendo ubicación:', error);
        }
      );
    }
  }, [setUserLocation]);

  // Efecto para ajustar la vista
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      const bounds = routePoints.map(point => [point[0], point[1]]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [currentRoute, routePoints]);

  // ✅ Efecto para cerrar popups cuando se selecciona un punto
  useEffect(() => {
    if (selectedPoint && mapRef.current) {
      // Cerrar todos los popups de Leaflet
      mapRef.current.closePopup();
    }
  }, [selectedPoint]);

  const handlePointClick = (point) => {
    // ✅ Cerrar cualquier popup de Leaflet abierto
    if (mapRef.current) {
      mapRef.current.closePopup();
    }
    
    // ✅ Abrir el InfoPanel de React
    selectPoint(point);
    
    if (!visits.includes(point.id)) {
      setVisits([...visits, point.id]);
    }
  };

  const handleUserLocation = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.flyTo(userLocation, 18);
    }
  };

  // ✅ Obtener el punto CEA para referencia
  const ceaPoint = POINTS_LIST.find(p => p.id === 'cea');

  return (
    <div className="route-map-container">
      <MapContainer
        ref={mapRef}
        center={[-33.46413, -70.66259]}
        zoom={17}
        zoomControl={false}
        style={{ 
          height: '100%', 
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0
        }}
        className="leaflet-map"
        // ✅ Desactivar popups al hacer clic en el mapa
        onClick={() => {}}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Dibujar las 3 rutas */}
        {Object.values(ROUTES).map((r) => (
          <Polyline
            key={r.id}
            positions={r.points}
            pathOptions={{
              color: r.color,
              weight: r.id === currentRoute ? 6 : 3,
              opacity: r.id === currentRoute ? 1 : 0.4,
              dashArray: r.id === currentRoute ? null : '5, 5',
              lineJoin: 'round',
              lineCap: 'round'
            }}
          />
        ))}

        {/* ✅ Marcadores de puertas (SIN POPUP) */}
        {DOORS_LIST.map((door) => {
          const isSelectedRoute = door.route === currentRoute;
          return (
            <Marker
              key={door.id}
              position={door.coords}
              icon={createDoorIcon(isSelectedRoute)}
              interactive={false} // ✅ Desactivar interacción
              eventHandlers={{
                click: (e) => {
                  L.DomEvent.stopPropagation(e);
                  // ✅ NO hacer nada, solo mostrar la puerta
                }
              }}
            />
          );
        })}

        {/* ✅ Marcadores de puntos de interés (SIN POPUP) */}
        {POINTS_LIST.map((point) => {
          const isDestination = point.id === 'cea';
          const isVisited = visits.includes(point.id);
          const isSelected = selectedPoint?.id === point.id;
          
          return (
            <Marker
              key={point.id}
              position={point.coords}
              icon={createCustomIcon(
                point.icon, 
                isDestination,
                isSelected
              )}
              interactive={true}
              eventHandlers={{
                click: (e) => {
                  L.DomEvent.stopPropagation(e);
                  handlePointClick(point);
                }
              }}
              // ✅ IMPORTANTE: NO usar popup de Leaflet
            />
          );
        })}

        {/* Marcador de ubicación del usuario (SIN POPUP) */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={createUserIcon()}
            interactive={false}
          />
        )}
      </MapContainer>

      {/* Botón de geolocalización flotante */}
      <button 
        className="geo-btn"
        onClick={handleUserLocation}
        title="Centrar en mi ubicación"
        style={{ 
          zIndex: 50,
          position: 'absolute',
          bottom: '90px',
          right: '16px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        📍
      </button>
    </div>
  );
};