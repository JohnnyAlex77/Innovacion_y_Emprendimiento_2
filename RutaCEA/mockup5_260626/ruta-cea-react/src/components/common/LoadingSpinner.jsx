// src/components/common/LoadingSpinner.jsx
import '../../styles/components.css';

export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Cargando RutaCEA...</p>
    </div>
  );
};

export default LoadingSpinner;