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
      <header className="map-header">
        <button className="back-btn" onClick={handleBack}>
          ← Volver
        </button>
        <h2 className="map-title">
          Ruta <span className="route-name">{currentRoute}</span>
        </h2>
        <button className="legend-btn" onClick={toggleLegend}>
          📖
        </button>
      </header>

      <div className="map-container">
        <RouteMap />
      </div>

      <RouteSelector />

      {selectedPoint && (
        <InfoPanel 
          point={selectedPoint} 
          onClose={clearSelectedPoint}
          onVisitCEA={arriveToCEA}
        />
      )}

      {showLegend && <LegendModal onClose={toggleLegend} />}
    </div>
  );
};