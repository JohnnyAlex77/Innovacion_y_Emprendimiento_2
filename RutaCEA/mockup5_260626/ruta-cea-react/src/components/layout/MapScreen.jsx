// src/components/layout/MapScreen.jsx
// ✅ OVERLAY MODIFICADO - CIERRE SOLO EN EL FONDO

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

  console.log('🔄 [MapScreen] renderizando - selectedPoint:', selectedPoint?.id || 'null');

  const handleBack = () => {
    if (selectedPoint) {
      clearSelectedPoint();
    } else {
      goHome();
    }
  };

  // ✅ Función para cerrar solo si el clic es en el overlay (no en el panel)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      console.log('🔄 [MapScreen] Clic en overlay - cerrando panel');
      clearSelectedPoint();
    }
  };

  return (
    <div className="map-screen" style={{ 
      height: '100vh', 
      width: '100vw',
      display: 'flex', 
      flexDirection: 'column', 
      position: 'relative',
      overflow: 'hidden',
      background: '#e8f0e8'
    }}>
      {/* HEADER */}
      <header className="map-header" style={{ 
        zIndex: 10, 
        position: 'relative',
        padding: '16px 24px',
        background: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        flexShrink: 0,
        minHeight: '64px'
      }}>
        <button className="back-btn" onClick={handleBack} style={{
          padding: '8px 16px',
          background: '#f0f5f0',
          borderRadius: '20px',
          fontSize: '14px',
          color: '#4a5a4a',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          ← Volver
        </button>
        <h2 className="map-title" style={{ 
          fontSize: '22px', 
          fontWeight: '700', 
          color: '#1a2a1a',
          margin: 0
        }}>
          Ruta <span className="route-name" style={{ 
            color: currentRoute === 'green' ? '#4caf50' : 
                   currentRoute === 'blue' ? '#2196f3' : '#ff9800',
            textTransform: 'capitalize'
          }}>
            {currentRoute}
          </span>
        </h2>
        <button className="legend-btn" onClick={toggleLegend} style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#f0f5f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          border: 'none',
          cursor: 'pointer'
        }}>
          📖
        </button>
      </header>

      {/* MAPA */}
      <div className="map-container" style={{ 
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        background: '#e8f0e8',
        minHeight: 0,
        width: '100%'
      }}>
        <RouteMap />
      </div>

      {/* SELECTOR DE RUTA */}
      <div style={{ 
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        width: 'auto',
        maxWidth: 'calc(100% - 48px)'
      }}>
        <RouteSelector />
      </div>

      {/* ✅ INFO PANEL - CON OVERLAY MEJORADO */}
      {selectedPoint ? (
        <>
          {console.log('🔄 [MapScreen] Renderizando InfoPanel para:', selectedPoint.id)}
          
          {/* OVERLAY - CIERRA SOLO AL HACER CLIC EN EL FONDO */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9998,
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(2px)',
              animation: 'fadeIn 0.2s ease'
            }}
            onClick={handleOverlayClick}
          />
          
          {/* PANEL - CON SCROLL HABILITADO */}
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              padding: '20px',
              pointerEvents: 'none',
              maxHeight: '80vh'
            }}
          >
            <div style={{
              pointerEvents: 'auto',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '70vh',
              overflow: 'hidden',
              animation: 'slideUp 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <InfoPanel 
                point={selectedPoint} 
                onClose={clearSelectedPoint}
                onVisitCEA={arriveToCEA}
              />
            </div>
          </div>
        </>
      ) : (
        console.log('🔄 [MapScreen] No hay punto seleccionado')
      )}

      {/* LEGEND MODAL */}
      {showLegend && (
        <LegendModal onClose={toggleLegend} />
      )}
    </div>
  );
};