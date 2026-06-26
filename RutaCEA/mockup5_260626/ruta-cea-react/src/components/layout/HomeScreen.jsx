// src/components/layout/HomeScreen.jsx
// ✅ VERSIÓN DESKTOP

import { useApp } from '../../context/AppContext';
import { QRSimulator } from '../common/QRSimulator';
import '../../styles/components.css';

export const HomeScreen = () => {
  const { scanQR } = useApp();

  return (
    <div className="home-screen" style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      background: '#f8fbf8'
    }}>
      <header className="home-header" style={{
        padding: '20px 32px',
        background: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        flexShrink: 0
      }}>
        <div className="header-badge" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge-icon" style={{ fontSize: '22px' }}>📍</span>
          <span className="badge-text" style={{ fontSize: '18px', fontWeight: '600' }}>Parque O'Higgins</span>
        </div>
        <button className="info-btn" style={{
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
        }}>ℹ️</button>
      </header>

      <main className="home-content" style={{
        flex: 1,
        overflowY: 'auto',
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div className="welcome-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="welcome-title" style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#1a2a1a',
            marginBottom: '12px'
          }}>
            ¡Bienvenido a <span className="highlight" style={{ color: '#2d6a3f' }}>RutaCEA</span>!
          </h2>
          <p className="welcome-description" style={{
            fontSize: '18px',
            color: '#5a7a6a',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Escanea el código QR en la entrada del parque para comenzar tu aventura
            hacia el Centro Educativo Ambiental.
          </p>
        </div>

        <QRSimulator onScan={scanQR} />

        <div className="home-features" style={{
          marginTop: '32px',
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ fontSize: '18px', color: '#1a2a1a', marginBottom: '16px', textAlign: 'center' }}>
            ¿Qué encontrarás en tu ruta?
          </h3>
          <div className="features-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }}>
            <div className="feature-item" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span className="feature-icon" style={{ fontSize: '32px' }}>🗺️</span>
              <span className="feature-label" style={{ fontSize: '14px', color: '#5a7a6a' }}>3 Rutas disponibles</span>
            </div>
            <div className="feature-item" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span className="feature-icon" style={{ fontSize: '32px' }}>📚</span>
              <span className="feature-label" style={{ fontSize: '14px', color: '#5a7a6a' }}>4 Puntos de interés</span>
            </div>
            <div className="feature-item" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span className="feature-icon" style={{ fontSize: '32px' }}>♻️</span>
              <span className="feature-label" style={{ fontSize: '14px', color: '#5a7a6a' }}>Aprendizaje sustentable</span>
            </div>
          </div>
        </div>

        <div className="home-routes-preview" style={{
          marginTop: '24px',
          padding: '16px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center'
        }}>
          <span className="preview-label" style={{
            display: 'block',
            fontSize: '14px',
            color: '#5a7a6a',
            marginBottom: '12px'
          }}>Rutas disponibles:</span>
          <div className="route-badges" style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center'
          }}>
            <span className="badge green" style={{
              padding: '6px 18px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              background: '#e8f5e9',
              color: '#2e7d32'
            }}>🌿 Verde</span>
            <span className="badge blue" style={{
              padding: '6px 18px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              background: '#e3f2fd',
              color: '#1565c0'
            }}>💧 Azul</span>
            <span className="badge orange" style={{
              padding: '6px 18px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              background: '#fff3e0',
              color: '#e65100'
            }}>🍊 Naranja</span>
          </div>
        </div>
      </main>

      <footer className="home-footer" style={{
        padding: '16px 32px',
        textAlign: 'center',
        background: 'white',
        borderTop: '1px solid rgba(0,0,0,0.04)',
        flexShrink: 0
      }}>
        <p className="footer-text" style={{
          fontSize: '14px',
          color: '#5a7a6a',
          opacity: 0.7
        }}>
          🌱 Conectando a la comunidad con el CEA
        </p>
      </footer>
    </div>
  );
};