// src/components/common/QRSimulator.jsx
import { useState } from 'react';
import '../../styles/components.css';

export const QRSimulator = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onScan();
    }, 2000);
  };

  return (
    <div className="qr-simulator">
      <div className={`qr-container ${isScanning ? 'scanning' : ''}`}>
        <div className="qr-code">
          <div className="qr-pattern">
            <div className="qr-corner top-left"></div>
            <div className="qr-corner top-right"></div>
            <div className="qr-corner bottom-left"></div>
            <div className="qr-corner bottom-right"></div>
            <div className="qr-center">🌱</div>
          </div>
          {isScanning && (
            <div className="qr-scan-line"></div>
          )}
        </div>
        <div className="qr-overlay">
          <span className="qr-icon">📱</span>
        </div>
      </div>
      
      <button 
        className="btn-scan"
        onClick={handleScan}
        disabled={isScanning}
      >
        {isScanning ? 'Escaneando...' : '📷 Simular Escaneo'}
      </button>
      
      <p className="qr-hint">
        En la entrada del parque, escanea el código QR para comenzar tu ruta
      </p>
    </div>
  );
};

// src/components/common/LoadingSpinner.jsx
export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Cargando RutaCEA...</p>
    </div>
  );
};

// src/components/common/StatsDisplay.jsx
export const StatsDisplay = ({ stats }) => {
  return (
    <div className="stats-display">
      <div className="stat-item">
        <span className="stat-icon">📏</span>
        <div className="stat-info">
          <span className="stat-value">{stats.distance}</span>
          <span className="stat-label">Distancia</span>
        </div>
      </div>
      <div className="stat-item">
        <span className="stat-icon">⏱️</span>
        <div className="stat-info">
          <span className="stat-value">{stats.duration}</span>
          <span className="stat-label">Tiempo</span>
        </div>
      </div>
      <div className="stat-item">
        <span className="stat-icon">📍</span>
        <div className="stat-info">
          <span className="stat-value">{stats.pointsVisited}</span>
          <span className="stat-label">Puntos visitados</span>
        </div>
      </div>
      <div className="stat-item">
        <span className="stat-icon">🗺️</span>
        <div className="stat-info">
          <span className="stat-value">{stats.routeName}</span>
          <span className="stat-label">Ruta</span>
        </div>
      </div>
    </div>
  );
};