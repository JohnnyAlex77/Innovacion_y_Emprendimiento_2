// src/components/layout/ArrivalScreen.jsx
import { useApp } from '../../context/AppContext';
import { StatsDisplay } from '../common/StatsDisplay';
import '../../styles/components.css';

export const ArrivalScreen = () => {
  const { arrivalStats, startNewRoute, goHome } = useApp();

  if (!arrivalStats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="arrival-screen">
      <div className="arrival-content">
        <div className="arrival-icon">🎉</div>
        <h1 className="arrival-title">¡Has llegado al CEA!</h1>
        <p className="arrival-subtitle">
          ¡Felicidades! Has completado tu ruta y llegado al 
          Centro Educativo Ambiental.
        </p>

        <StatsDisplay stats={arrivalStats} />

        <div className="arrival-message">
          <p>
            🌱 Recuerda que cada paso cuenta para construir una comunidad
            más sustentable. ¡Sigue aprendiendo y compartiendo!
          </p>
        </div>

        <div className="arrival-actions">
          <button 
            className="btn-primary" 
            onClick={startNewRoute}
          >
            🗺️ Nueva Ruta
          </button>
          <button 
            className="btn-secondary" 
            onClick={goHome}
          >
            🏠 Ir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};