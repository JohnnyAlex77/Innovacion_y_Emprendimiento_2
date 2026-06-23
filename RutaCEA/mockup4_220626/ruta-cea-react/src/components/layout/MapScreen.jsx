// src/components/layout/MapScreen.jsx
import { useApp } from '../../context/AppContext';
import { RouteMap } from '../map/RouteMap';
import { RouteSelector } from '../map/RouteSelector';
import { InfoPanel } from '../map/InfoPanel';
import { LegendModal } from '../map/LegendModal';
import '../../styles/components.css';

export const MapScreen = () => {
  const { 
    goHome, 
    showLegend, 
    toggleLegend, 
    currentRoute,
    selectedPoint,
    clearSelectedPoint,
    arriveToCEA
  } = useApp();

  const handleBack = () => {
    if (selectedPoint) {
      clearSelectedPoint();
    } else {
      goHome();
    }
  };

  return (
    <div className="map-screen">
      {/* HEADER - z-index: 10 */}
      <header className="map-header" style={{ zIndex: 10, position: 'relative' }}>
        <button className="back-btn" onClick={handleBack}>
          ← Volver
        </button>
        <h2 className="map-title">
          Ruta <span className="route-name" style={{ color: currentRoute === 'green' ? '#4caf50' : currentRoute === 'blue' ? '#2196f3' : '#ff9800' }}>
            {currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1)}
          </span>
        </h2>
        <button className="legend-btn" onClick={toggleLegend}>
          📖
        </button>
      </header>

      {/* MAPA - ocupa todo el espacio restante */}
      <div className="map-container" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <RouteMap />
      </div>

      {/* SELECTOR DE RUTA - z-index: 20 */}
      <div style={{ position: 'relative', zIndex: 20 }}>
        <RouteSelector />
      </div>

      {/* INFO PANEL - z-index: 30 */}
      {selectedPoint && (
        <div style={{ position: 'relative', zIndex: 30 }}>
          <InfoPanel 
            point={selectedPoint} 
            onClose={clearSelectedPoint}
            onVisitCEA={arriveToCEA}
          />
        </div>
      )}

      {/* LEGEND MODAL - z-index: 100 */}
      {showLegend && (
        <div style={{ position: 'fixed', zIndex: 100 }}>
          <LegendModal onClose={toggleLegend} />
        </div>
      )}
    </div>
  );
};