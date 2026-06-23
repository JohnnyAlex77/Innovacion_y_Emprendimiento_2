// src/components/layout/MapScreen.jsx
// ✅ MODIFICADO: Asegurar que solo se muestre el InfoPanel

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
    <div className="map-screen" style={{ height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* HEADER - z-index: 10 */}
      <header className="map-header" style={{ 
        zIndex: 10, 
        position: 'relative',
        padding: '12px 16px',
        background: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        flexShrink: 0
      }}>
        <button className="back-btn" onClick={handleBack} style={{
          padding: '6px 12px',
          background: '#f0f5f0',
          borderRadius: '20px',
          fontSize: '13px',
          color: '#4a5a4a',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          ← Volver
        </button>
        <h2 className="map-title" style={{ fontSize: '18px', fontWeight: '700', color: '#1a2a1a' }}>
          Ruta <span className="route-name" style={{ 
            color: currentRoute === 'green' ? '#4caf50' : 
                   currentRoute === 'blue' ? '#2196f3' : '#ff9800',
            textTransform: 'capitalize'
          }}>
            {currentRoute}
          </span>
        </h2>
        <button className="legend-btn" onClick={toggleLegend} style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: '#f0f5f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          border: 'none',
          cursor: 'pointer'
        }}>
          📖
        </button>
      </header>

      {/* MAPA - ocupa todo el espacio restante */}
      <div className="map-container" style={{ 
        flex: 1, 
        position: 'relative', 
        overflow: 'hidden',
        background: '#e8f0e8'
      }}>
        <RouteMap />
      </div>

      {/* SELECTOR DE RUTA - z-index: 20 */}
      <div style={{ position: 'relative', zIndex: 20, flexShrink: 0 }}>
        <RouteSelector />
      </div>

      {/* ✅ INFO PANEL - Solo se muestra cuando hay un punto seleccionado */}
      {selectedPoint && (
        <InfoPanel 
          point={selectedPoint} 
          onClose={clearSelectedPoint}
          onVisitCEA={arriveToCEA}
        />
      )}

      {/* LEGEND MODAL - z-index: 100 */}
      {showLegend && (
        <LegendModal onClose={toggleLegend} />
      )}
    </div>
  );
};