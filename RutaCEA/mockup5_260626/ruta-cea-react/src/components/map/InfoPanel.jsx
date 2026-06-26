// src/components/map/InfoPanel.jsx
// ✅ CON SCROLL HABILITADO Y ESTILOS MEJORADOS

import '../../styles/components.css';

export const InfoPanel = ({ point, onClose, onVisitCEA }) => {
  console.log('🔄 [InfoPanel] Renderizando con point:', point?.id || 'null');

  if (!point) {
    console.warn('⚠️ [InfoPanel] point es null o undefined');
    return null;
  }

  const isCEA = point.id === 'cea';

  const handleVisitCEA = () => {
    console.log('🔄 [InfoPanel] handleVisitCEA llamado');
    onClose();
    setTimeout(() => {
      onVisitCEA();
    }, 300);
  };

  const handleClose = () => {
    console.log('🔄 [InfoPanel] handleClose llamado');
    onClose();
  };

  // ✅ Evitar que el clic dentro del panel cierre el overlay
  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      style={{
        background: 'white',
        borderRadius: '20px 20px 0 0',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.2)',
        maxHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
        border: '2px solid #2d6a3f',
        borderBottom: 'none'
      }}
      onClick={handlePanelClick}
    >
      {/* HEADER - FIJO */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        gap: '12px', 
        padding: '20px 20px 12px 20px',
        flexShrink: 0,
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: '#f0f5f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <span style={{ fontSize: '28px' }}>{point.icon}</span>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '700', 
            margin: 0,
            color: '#1a2a1a'
          }}>
            {point.name}
          </h3>
          {point.type === 'destination' && (
            <span style={{
              display: 'inline-block',
              fontSize: '10px',
              fontWeight: '600',
              color: 'white',
              background: '#2d6a3f',
              padding: '2px 10px',
              borderRadius: '12px',
              marginTop: '4px'
            }}>🎯 Destino</span>
          )}
        </div>
        <button 
          onClick={handleClose}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          ✕
        </button>
      </div>

      {/* ✅ BODY - CON SCROLL HABILITADO */}
      <div style={{ 
        padding: '16px 20px 20px 20px',
        overflowY: 'auto',
        flex: 1,
        maxHeight: '50vh'
      }}>
        {/* DESCRIPCIÓN */}
        <p style={{ 
          whiteSpace: 'pre-wrap', 
          lineHeight: '1.6',
          fontSize: '14px',
          color: '#4a5a4a',
          margin: '0 0 16px 0'
        }}>
          {point.description}
        </p>

        {/* IMAGEN */}
        {point.image && (
          <div style={{ 
            borderRadius: '12px', 
            overflow: 'hidden', 
            marginBottom: '16px' 
          }}>
            <img 
              src={point.image} 
              alt={point.name} 
              style={{ width: '100%', height: '140px', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* ACTIONS */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {isCEA ? (
            <button 
              onClick={handleVisitCEA}
              style={{ 
                flex: 1,
                padding: '12px',
                background: 'linear-gradient(135deg, #2d6a3f, #1a4a2a)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              🎉 ¡Llegaste al CEA!
            </button>
          ) : (
            <>
              <button 
                onClick={handleVisitCEA}
                style={{ 
                  flex: 1,
                  padding: '10px 16px',
                  background: '#2d6a3f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📍 Visitar CEA
              </button>
              <button 
                onClick={handleClose}
                style={{
                  padding: '10px 16px',
                  background: '#f0f0f0',
                  color: '#4a5a4a',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};