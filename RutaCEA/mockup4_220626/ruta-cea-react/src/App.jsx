// src/App.jsx
import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashScreen } from './components/layout/SplashScreen';
import { HomeScreen } from './components/layout/HomeScreen';
import { MapScreen } from './components/layout/MapScreen';
import { ArrivalScreen } from './components/layout/ArrivalScreen';
import './styles/App.css';
import './styles/theme.css';
import './styles/components.css';

const AppContent = () => {
  const { currentScreen, isLoading } = useApp();

  if (isLoading) {
    return <SplashScreen />;
  }

  switch (currentScreen) {
    case 'splash':
      return <SplashScreen />;
    case 'home':
      return <HomeScreen />;
    case 'map':
      return <MapScreen />;
    case 'arrival':
      return <ArrivalScreen />;
    default:
      return <HomeScreen />;
  }
};

function App() {
  return (
    <div className="app">
      <div className="app-content">
        <AppProvider>
          <AppContent />
        </AppProvider>
      </div>
    </div>
  );
}

export default App;