// src/context/AppContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { ROUTES } from '../data/routes';
import { POINTS } from '../data/points';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [currentRoute, setCurrentRoute] = useState('green');
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [arrivalStats, setArrivalStats] = useState(null);
  const [visits, setVisits] = useState([]);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const switchRoute = (routeId) => {
    setCurrentRoute(routeId);
  };

  const selectPoint = (point) => {
    setSelectedPoint(point);
  };

  const clearSelectedPoint = () => {
    setSelectedPoint(null);
  };

  const toggleLegend = () => {
    setShowLegend(!showLegend);
  };

  const arriveToCEA = () => {
    const route = ROUTES[currentRoute];
    const stats = {
      distance: route.distance,
      duration: route.duration,
      pointsVisited: visits.length + 1,
      routeName: route.name,
      routeColor: route.color
    };
    setArrivalStats(stats);
    setCurrentScreen('arrival');
  };

  const startNewRoute = () => {
    setVisits([]);
    setArrivalStats(null);
    setSelectedPoint(null);
    setCurrentScreen('map');
  };

  const goHome = () => {
    setVisits([]);
    setArrivalStats(null);
    setSelectedPoint(null);
    setCurrentScreen('home');
  };

  const scanQR = () => {
    // Simular escaneo de QR
    const routes = ['green', 'blue', 'orange'];
    const randomRoute = routes[Math.floor(Math.random() * routes.length)];
    setCurrentRoute(randomRoute);
    setCurrentScreen('map');
  };

  const value = {
    currentScreen,
    setCurrentScreen,
    currentRoute,
    switchRoute,
    selectedPoint,
    selectPoint,
    clearSelectedPoint,
    isLoading,
    showLegend,
    toggleLegend,
    userLocation,
    setUserLocation,
    arrivalStats,
    arriveToCEA,
    startNewRoute,
    goHome,
    scanQR,
    visits,
    setVisits
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};