// src/components/layout/SplashScreen.jsx
import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import '../../styles/components.css';

export const SplashScreen = () => {
  const { setCurrentScreen, isLoading } = useApp();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentScreen('home');
      }, 300);
    }
  }, [isLoading, setCurrentScreen]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="splash-logo">🌱</div>
        <h1 className="splash-title">RutaCEA</h1>
        <p className="splash-subtitle">Descubre el Centro Educativo Ambiental</p>
        <div className="splash-loader">
          <div className="loader-bar"></div>
        </div>
      </div>
    </div>
  );
};