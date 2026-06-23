// src/components/map/InfoPanel.jsx

import { useApp } from '../../context/AppContext';
import '../../styles/components.css';

export const InfoPanel = ({ point, onClose, onVisitCEA }) => {
  const { currentRoute } = useApp();
  const isCEA = point.id === 'cea';

  return (
    <div className="info-panel visible" style={{ zIndex: 30 }}>
      <div className="info-panel-content" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <div className="info-panel-header">
          <div className="info-icon-wrapper">
            <span className="info-icon">{point.icon}</span>
          </div>
          <div className="info-title-wrapper">
            <h3 className="info-title">{point.name}</h3>
            {point.type === 'destination' && (
              <span className="info-badge">🎯 Destino</span>
            )}
          </div>
          <button className="info-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="info-panel-body">
          {/* DESCRIPCIÓN COMPLETA CON SCROLL */}
          <p className="info-description" style={{ 
            whiteSpace: 'pre-wrap', 
            lineHeight: '1.6',
            fontSize: '14px',
            maxHeight: '200px',
            overflowY: 'auto',
            paddingRight: '4px'
          }}>
            {point.description}
          </p>
          
          {point.image && (
            <div className="info-image-wrapper">
              <img 
                src={point.image} 
                alt={point.name} 
                className="info-image"
                style={{ width: '100%', height: '160px', objectFit: 'cover' }}
              />
            </div>
          )}

          <div className="info-actions" style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            {isCEA ? (
              <button 
                className="btn-cea"
                onClick={onVisitCEA}
                style={{ flex: 1 }}
              >
                🎉 ¡Llegaste al CEA!
              </button>
            ) : (
              <>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    // Buscar el CEA y seleccionarlo
                    const ceaPoint = require('../../data/points').POINTS_LIST.find(p => p.id === 'cea');
                    if (ceaPoint) {
                      // Podríamos navegar al CEA en el mapa
                    }
                    onClose();
                  }}
                  style={{ flex: 1 }}
                >
                  📍 Visitar CEA
                </button>
                <button 
                  className="btn-secondary"
                  onClick={onClose}
                >
                  Cerrar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};