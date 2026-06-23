// src/components/map/RouteSelector.jsx

import { useApp } from '../../context/AppContext';
import { ROUTES } from '../../data/routes';
import '../../styles/components.css';

export const RouteSelector = () => {
  const { currentRoute, switchRoute } = useApp();

  const routes = Object.values(ROUTES);

  return (
    <div className="route-selector" style={{ zIndex: 20, position: 'relative' }}>
      <div className="route-selector-content">
        {routes.map((route) => (
          <button
            key={route.id}
            className={`route-btn ${currentRoute === route.id ? 'active' : ''}`}
            style={{
              '--route-color': route.color,
              borderColor: currentRoute === route.id ? route.color : '#ddd',
              backgroundColor: currentRoute === route.id ? `${route.color}15` : 'white'
            }}
            onClick={() => switchRoute(route.id)}
          >
            <div 
              className="route-dot" 
              style={{ backgroundColor: route.color }}
            />
            <span className="route-label">{route.name}</span>
            <span className="route-duration">{route.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
};