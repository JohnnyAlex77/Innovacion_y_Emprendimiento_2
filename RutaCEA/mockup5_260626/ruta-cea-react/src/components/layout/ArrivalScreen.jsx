// src/components/layout/ArrivalScreen.jsx
// ✅ VERSIÓN DESKTOP

import { useApp } from '../../context/AppContext';
import { StatsDisplay } from '../common/StatsDisplay';
import '../../styles/components.css';

export const ArrivalScreen = () => {
  const { arrivalStats, startNewRoute, goHome } = useApp();

  if (!arrivalStats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="arrival-screen" style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a4a2a, #2d6a3f)',
      padding: '40px'
    }}>
      <div className="arrival-content" style={{
        background: 'white',
        borderRadius: '24px',
        padding: '48px 40px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        animation: 'fadeIn 0.6s ease'
      }}>
        <div className="arrival-icon" style={{
          fontSize: '80px',
          display: 'block',
          marginBottom: '16px',
          animation: 'bounce 2s infinite'
        }}>🎉</div>
        
        <h1 className="arrival-title" style={{
          fontSize: '32px',
          fontWeight: '800',
          color: '#1a2a1a',
          marginBottom: '8px'
        }}>¡Has llegado al CEA!</h1>
        
        <p className="arrival-subtitle" style={{
          fontSize: '16px',
          color: '#5a7a6a',
          lineHeight: '1.6',
          marginBottom: '24px'
        }}>
          ¡Felicidades! Has completado tu ruta y llegado al 
          Centro Educativo Ambiental.
        </p>

        <StatsDisplay stats={arrivalStats} />

        <div className="arrival-message" style={{
          background: '#f0f5f0',
          borderRadius: '12px',
          padding: '16px',
          margin: '20px 0',
          textAlign: 'left'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#4a5a4a',
            lineHeight: '1.6',
            margin: 0
          }}>
            🌱 Recuerda que cada paso cuenta para construir una comunidad
            más sustentable. ¡Sigue aprendiendo y compartiendo!
          </p>
        </div>

        <div className="arrival-actions" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginTop: '20px'
        }}>
          <button 
            className="btn-primary" 
            onClick={startNewRoute}
            style={{
              padding: '14px 24px',
              background: '#2d6a3f',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🗺️ Nueva Ruta
          </button>
          <button 
            className="btn-secondary" 
            onClick={goHome}
            style={{
              padding: '14px 24px',
              background: '#f0f0f0',
              color: '#4a5a4a',
              border: 'none',
              borderRadius: '14px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🏠 Ir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};