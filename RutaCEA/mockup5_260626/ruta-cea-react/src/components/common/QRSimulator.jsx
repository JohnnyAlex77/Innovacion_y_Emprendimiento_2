// src/components/common/QRSimulator.jsx
// ✅ VERSIÓN DESKTOP

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
    <div className="qr-simulator" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      padding: '24px 0'
    }}>
      <div className="qr-container" style={{
        width: '240px',
        height: '240px',
        borderRadius: '20px',
        background: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        padding: '20px',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}>
        <div className="qr-code" style={{
          width: '100%',
          height: '100%',
          background: 'white',
          borderRadius: '12px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="qr-pattern" style={{
            width: '170px',
            height: '170px',
            position: 'relative',
            border: '3px solid #2d6a3f',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* QR Corners */}
            <div className="qr-corner top-left" style={{
              position: 'absolute',
              width: '20px',
              height: '20px',
              borderColor: '#2d6a3f',
              borderStyle: 'solid',
              borderWidth: 0,
              top: '-2px',
              left: '-2px',
              borderTopWidth: '4px',
              borderLeftWidth: '4px',
              borderRadius: '4px 0 0 0'
            }}></div>
            <div className="qr-corner top-right" style={{
              position: 'absolute',
              width: '20px',
              height: '20px',
              borderColor: '#2d6a3f',
              borderStyle: 'solid',
              borderWidth: 0,
              top: '-2px',
              right: '-2px',
              borderTopWidth: '4px',
              borderRightWidth: '4px',
              borderRadius: '0 4px 0 0'
            }}></div>
            <div className="qr-corner bottom-left" style={{
              position: 'absolute',
              width: '20px',
              height: '20px',
              borderColor: '#2d6a3f',
              borderStyle: 'solid',
              borderWidth: 0,
              bottom: '-2px',
              left: '-2px',
              borderBottomWidth: '4px',
              borderLeftWidth: '4px',
              borderRadius: '0 0 0 4px'
            }}></div>
            <div className="qr-corner bottom-right" style={{
              position: 'absolute',
              width: '20px',
              height: '20px',
              borderColor: '#2d6a3f',
              borderStyle: 'solid',
              borderWidth: 0,
              bottom: '-2px',
              right: '-2px',
              borderBottomWidth: '4px',
              borderRightWidth: '4px',
              borderRadius: '0 0 4px 0'
            }}></div>
            <div className="qr-center" style={{
              fontSize: '40px',
              opacity: 0.3
            }}>🌱</div>
          </div>
          {isScanning && (
            <div className="qr-scan-line" style={{
              position: 'absolute',
              left: '10%',
              width: '80%',
              height: '2px',
              background: '#2d6a3f',
              animation: 'scanLine 2s infinite',
              opacity: 0.5
            }}></div>
          )}
        </div>
        <div className="qr-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(45, 106, 63, 0.05)',
          borderRadius: '20px',
          pointerEvents: 'none'
        }}>
          <span className="qr-icon" style={{
            fontSize: '32px',
            opacity: 0.3
          }}>📱</span>
        </div>
      </div>
      
      <button 
        className="btn-scan"
        onClick={handleScan}
        disabled={isScanning}
        style={{
          padding: '14px 40px',
          background: '#2d6a3f',
          color: 'white',
          border: 'none',
          borderRadius: '30px',
          fontSize: '18px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(45, 106, 63, 0.3)'
        }}
      >
        {isScanning ? 'Escaneando...' : '📷 Simular Escaneo'}
      </button>
      
      <p className="qr-hint" style={{
        fontSize: '14px',
        color: '#5a7a6a',
        textAlign: 'center',
        maxWidth: '400px',
        lineHeight: '1.5'
      }}>
        En la entrada del parque, escanea el código QR para comenzar tu ruta
      </p>
    </div>
  );
};