// src/components/map/InfoPanel.jsx
// ✅ MODIFICADO: Mejor manejo de cierre

import { useApp } from '../../context/AppContext';
import '../../styles/components.css';

export const InfoPanel = ({ point, onClose, onVisitCEA }) => {
  const { currentRoute } = useApp();
  const isCEA = point.id === 'cea';

  // ✅ Manejar clic fuera del panel (opcional)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="info-panel-overlay" 
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 25,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        pointerEvents: 'none' // ✅ Permitir clics en el mapa detrás
      }}
    >
      <div 
        className="info-panel visible" 
        style={{ 
          zIndex: 30,
          position: 'relative',
          pointerEvents: 'auto', // ✅ Activar clics en el panel
          maxWidth: '420px',
          width: '100%',
          margin: '0 12px 12px 12px'
        }}
      >
        <div className="info-panel-content" style={{ 
          maxHeight: '60vh', 
          overflowY: 'auto',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
          padding: '20px'
        }}>
          <div className="info-panel-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
            <div className="info-icon-wrapper" style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#f0f5f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span className="info-icon" style={{ fontSize: '28px' }}>{point.icon}</span>
            </div>
            <div className="info-title-wrapper" style={{ flex: 1 }}>
              <h3 className="info-title" style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>
                {point.name}
              </h3>
              {point.type === 'destination' && (
                <span className="info-badge" style={{
                  display: 'inline-block',
                  fontSize: '10px',
                  fontWeight: '600',
                  color: 'white',
                  background: '#2d6a3f',
                  padding: '2px 10px',
                  borderRadius: '12px',
                  marginTop: '4px'
                }}>🎯 Destino</span>
              )}
            </div>
            <button 
              className="info-close-btn" 
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              ✕
            </button>
          </div>

          <div className="info-panel-body">
            {/* ✅ DESCRIPCIÓN COMPLETA CON SCROLL */}
            <p className="info-description" style={{ 
              whiteSpace: 'pre-wrap', 
              lineHeight: '1.6',
              fontSize: '14px',
              maxHeight: '200px',
              overflowY: 'auto',
              paddingRight: '4px',
              color: '#4a5a4a',
              margin: '0 0 16px 0'
            }}>
              {point.description}
            </p>
            
            {point.image && (
              <div className="info-image-wrapper" style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                <img 
                  src={point.image} 
                  alt={point.name} 
                  className="info-image"
                  style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                />
              </div>
            )}

            <div className="info-actions" style={{ display: 'flex', gap: '10px' }}>
              {isCEA ? (
                <button 
                  className="btn-cea"
                  onClick={onVisitCEA}
                  style={{ 
                    flex: 1,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #2d6a3f, #1a4a2a)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  🎉 ¡Llegaste al CEA!
                </button>
              ) : (
                <>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      // Buscar el CEA
                      const { POINTS_LIST } = require('../../data/points');
                      const cea = POINTS_LIST.find(p => p.id === 'cea');
                      if (cea) {
                        // Cerrar panel y mostrar CEA
                        onClose();
                        // Seleccionar CEA después de un pequeño delay
                        setTimeout(() => {
                          const ceaPoint = POINTS_LIST.find(p => p.id === 'cea');
                          if (ceaPoint) {
                            // Aquí podrías llamar a selectPoint si lo tienes disponible
                          }
                        }, 300);
                      }
                    }}
                    style={{ 
                      flex: 1,
                      padding: '12px 20px',
                      background: '#2d6a3f',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    📍 Visitar CEA
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={onClose}
                    style={{
                      padding: '12px 20px',
                      background: '#f0f0f0',
                      color: '#4a5a4a',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Cerrar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};