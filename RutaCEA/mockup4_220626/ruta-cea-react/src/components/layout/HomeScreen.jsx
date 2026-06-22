// src/components/layout/HomeScreen.jsx
import { useApp } from '../../context/AppContext';
import { QRSimulator } from '../common/QRSimulator';
import '../../styles/components.css';

export const HomeScreen = () => {
  const { scanQR } = useApp();

  return (
    <div className="home-screen">
      <header className="home-header">
        <div className="header-badge">
          <span className="badge-icon">📍</span>
          <span className="badge-text">Parque O'Higgins</span>
        </div>
        <div className="header-actions">
          <button className="info-btn">ℹ️</button>
        </div>
      </header>

      <main className="home-content">
        <div className="welcome-section">
          <h2 className="welcome-title">
            ¡Bienvenido a <span className="highlight">RutaCEA</span>!
          </h2>
          <p className="welcome-description">
            Escanea el código QR en la entrada del parque para comenzar tu aventura
            hacia el Centro Educativo Ambiental.
          </p>
        </div>

        <QRSimulator onScan={scanQR} />

        <div className="home-features">
          <h3>¿Qué encontrarás en tu ruta?</h3>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">🗺️</span>
              <span className="feature-label">3 Rutas disponibles</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <span className="feature-label">4 Puntos de interés</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">♻️</span>
              <span className="feature-label">Aprendizaje sustentable</span>
            </div>
          </div>
        </div>

        <div className="home-routes-preview">
          <span className="preview-label">Rutas disponibles:</span>
          <div className="route-badges">
            <span className="badge green">🌿 Verde</span>
            <span className="badge blue">💧 Azul</span>
            <span className="badge orange">🍊 Naranja</span>
          </div>
        </div>
      </main>

      <footer className="home-footer">
        <p className="footer-text">
          🌱 Conectando a la comunidad con el CEA
        </p>
      </footer>
    </div>
  );
};