// src/components/map/LegendModal.jsx
import { ROUTES } from '../../data/routes';
import { POINTS_LIST } from '../../data/points';
import '../../styles/components.css';

export const LegendModal = ({ onClose }) => {
  const routes = Object.values(ROUTES);
  const points = POINTS_LIST;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">📖 Leyenda</h3>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="legend-section">
            <h4>Rutas</h4>
            {routes.map((route) => (
              <div key={route.id} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: route.color }}
                />
                <span className="legend-label">
                  {route.name} - {route.duration} ({route.distance})
                </span>
              </div>
            ))}
          </div>

          <div className="legend-section">
            <h4>Puntos de Interés</h4>
            {points.map((point) => (
              <div key={point.id} className="legend-item">
                <span className="legend-icon">{point.icon}</span>
                <span className="legend-label">{point.name}</span>
                {point.type === 'destination' && (
                  <span className="legend-badge">🎯</span>
                )}
              </div>
            ))}
          </div>

          <div className="legend-section">
            <h4>Puertas de Entrada</h4>
            <div className="legend-item">
              <span className="legend-icon">🚪</span>
              <span className="legend-label">Puertas del parque</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};