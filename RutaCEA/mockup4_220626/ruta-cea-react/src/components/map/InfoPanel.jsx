// src/components/map/InfoPanel.jsx
import { useApp } from '../../context/AppContext';
import '../../styles/components.css';

export const InfoPanel = ({ point, onClose, onVisitCEA }) => {
  const { currentRoute } = useApp();
  const isCEA = point.id === 'cea';

  return (
    <div className="info-panel visible">
      <div className="info-panel-content">
        <div className="info-panel-header">
          <div className="info-icon-wrapper">
            <span className="info-icon">{point.icon}</span>
          </div>
          <div className="info-title-wrapper">
            <h3 className="info-title">{point.name}</h3>
            {point.type === 'destination' && (
              <span className="info-badge">Destino</span>
            )}
          </div>
          <button className="info-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="info-panel-body">
          <p className="info-description">{point.description}</p>
          
          {point.image && (
            <div className="info-image-wrapper">
              <img 
                src={point.image} 
                alt={point.name} 
                className="info-image"
              />
            </div>
          )}

          <div className="info-actions">
            {isCEA ? (
              <button 
                className="btn-cea"
                onClick={onVisitCEA}
              >
                🎉 ¡Llegaste al CEA!
              </button>
            ) : (
              <>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    onClose();
                    // Aquí podríamos navegar al CEA en el mapa
                  }}
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