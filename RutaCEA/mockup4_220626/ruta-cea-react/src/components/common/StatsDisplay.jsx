// src/components/common/StatsDisplay.jsx
import '../../styles/components.css';

export const StatsDisplay = ({ stats }) => {
  if (!stats) {
    return null;
  }

  return (
    <div className="stats-display">
      <div className="stat-item">
        <span className="stat-icon">📏</span>
        <div className="stat-info">
          <span className="stat-value">{stats.distance || '0 km'}</span>
          <span className="stat-label">Distancia</span>
        </div>
      </div>
      <div className="stat-item">
        <span className="stat-icon">⏱️</span>
        <div className="stat-info">
          <span className="stat-value">{stats.duration || '0 min'}</span>
          <span className="stat-label">Tiempo</span>
        </div>
      </div>
      <div className="stat-item">
        <span className="stat-icon">📍</span>
        <div className="stat-info">
          <span className="stat-value">{stats.pointsVisited || 0}</span>
          <span className="stat-label">Puntos visitados</span>
        </div>
      </div>
      <div className="stat-item">
        <span className="stat-icon">🗺️</span>
        <div className="stat-info">
          <span className="stat-value">{stats.routeName || 'N/A'}</span>
          <span className="stat-label">Ruta</span>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;