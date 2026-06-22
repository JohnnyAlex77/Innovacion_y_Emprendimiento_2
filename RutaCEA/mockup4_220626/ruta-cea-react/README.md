# 🌱 RutaCEA - Mapa Interactivo del Centro Educativo Ambiental

## 📋 Tabla de Contenidos

- Descripción General
- Problemática
- Características
- Tecnologías Utilizadas
- Estructura del Proyecto
- Instalación
- Configuración
- Uso
- Funcionalidades
- Coordenadas del Parque
- Comandos Disponibles

---
## 🌿 Descripción General

**RutaCEA** es una aplicación web móvil interactiva diseñada para conectar a la comunidad de Santiago Centro con el **Centro Educativo Ambiental (CEA)** de la Municipalidad de Santiago, ubicado dentro del **Parque O'Higgins**.

La aplicación guía a los visitantes a través de un mapa interactivo con rutas de colores y puntos de interés educativo, promoviendo la adopción de prácticas de economía circular y sustentabilidad.

---

## 🎯 Problemática

### Identificada en la comunidad:

- ❌ **8 de cada 10 estudiantes** NUNCA han visto información del CEA
- ❌ **5 de cada 5 jefes de hogar** NO separan residuos orgánicos
- ❌ Principal barrera: falta de tiempo, espacio, conocimiento y miedo a plagas
- ❌ Desconexión crítica entre el conocimiento ambiental y la acción cotidiana

### Desafío:

> _"¿Cómo podríamos facilitar la participación y comprensión de la comunidad de Santiago Centro respecto a las acciones del CEA, mediante experiencias accesibles, visibles y motivadoras, para aumentar en al menos un 20% la adopción de prácticas de economía circular durante el primer año de implementación?"_

---

## ✨ Características

### 🗺️ Mapa Interactivo

- Visualización del Parque O'Higgins con OpenStreetMap
- 3 rutas de colores (Verde, Azul, Naranja)
- Marcadores personalizados con emojis
- Geolocalización del usuario

### 🚪 Puertas de Entrada

- Puerta 1: Metro Parque O'Higgins (Ruta Verde)
- Puerta 2: Av. Beauchef (Ruta Azul)
- Puerta 3: Av. General Rondizzoni (Ruta Naranja)

### 📍 Puntos de Interés

- 🏛️ **Centro Educativo Ambiental (CEA)** - Destino final
- 🌿 **Huerto Comunitario** - Agricultura urbana orgánica
- ♻️ **Punto de Compostaje** - Acopio de residuos orgánicos
- 🗑️ **Punto de Reciclaje** - Reciclaje de vidrio, plástico y papel

### 📱 Experiencia de Usuario

- Pantalla de bienvenida con animación
- Simulación de código QR para iniciar la ruta
- Panel de información al hacer clic en puntos
- Estadísticas al completar la ruta
- Diseño mobile-first y responsivo

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 18.2.0** - Biblioteca para interfaces de usuario
- **React Router DOM 6.14.0** - Navegación entre pantallas
- **Vite 4.3.9** - Bundler y servidor de desarrollo
- **ESLint 8.42.0** - Linting de código

### Mapas y Geolocalización

- **Leaflet 1.9.4** - Biblioteca de mapas interactivos
- **React Leaflet 4.2.1** - Componentes React para Leaflet
- **OpenStreetMap** - Mapas gratuitos y de código abierto

### Estilos

- **CSS3** - Animaciones y estilos personalizados
- **Google Fonts (Inter)** - Tipografía moderna
- **Mobile-First Design** - Optimizado para dispositivos móviles

---

## 📁 Estructura del Proyecto

```text

ruta-cea-react/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SplashScreen.jsx      # Pantalla de inicio
│   │   │   ├── HomeScreen.jsx        # Pantalla principal
│   │   │   ├── MapScreen.jsx         # Pantalla del mapa
│   │   │   └── ArrivalScreen.jsx     # Pantalla de llegada
│   │   ├── map/
│   │   │   ├── RouteMap.jsx          # Mapa con rutas
│   │   │   ├── RouteSelector.jsx     # Selector de rutas
│   │   │   ├── InfoPanel.jsx         # Panel de información
│   │   │   └── LegendModal.jsx       # Modal de leyenda
│   │   └── common/
│   │       ├── QRSimulator.jsx       # Simulador QR
│   │       ├── LoadingSpinner.jsx    # Indicador de carga
│   │       └── StatsDisplay.jsx      # Estadísticas
│   ├── context/
│   │   └── AppContext.jsx            # Estado global
│   ├── data/
│   │   ├── points.js                 # Puntos de interés
│   │   ├── routes.js                 # Configuración de rutas
│   │   └── doors.js                  # Puertas de entrada
│   ├── styles/
│   │   ├── App.css                   # Estilos principales
│   │   ├── theme.css                 # Tema y variables
│   │   └── components.css            # Estilos de componentes
│   ├── utils/
│   │   └── mapUtils.js               # Utilidades de mapa
│   ├── App.jsx                       # Componente principal
│   ├── main.jsx                      # Punto de entrada
│   └── index.css                     # Estilos globales
├── public/
│   └── vite.svg                      # Icono de Vite
├── index.html                        # HTML principal
├── package.json                      # Dependencias
├── vite.config.js                    # Configuración de Vite
├── eslint.config.js                  # Configuración de ESLint
└── README.md                         # Este archivo
```
---

## 🚀 Instalación

### Requisitos Previos

- **Node.js** (versión 16 o superior)
- **npm** (versión 8 o superior) o **yarn**
- **Git** (para clonar el repositorio)

### Pasos de Instalación

#### 1. Clonar el repositorio

```bash

git clone https://github.com/tu-usuario/ruta-cea-react.git
cd ruta-cea-react
```
#### 2. Instalar dependencias

```bash

npm install
```
O si usas yarn:

```bash

yarn install
```
#### 3. Instalar dependencias adicionales (si es necesario)

```bash

# Leaflet y React Leaflet
npm install leaflet react-leaflet
# React Router
npm install react-router-dom
# Dependencias de desarrollo
npm install -D @vitejs/plugin-react eslint eslint-plugin-react
```
#### 4. Configurar variable de entorno (opcional)

Crea un archivo `.env` en la raíz:

```env

VITE_APP_TITLE=RutaCEA
VITE_APP_DESCRIPTION=Descubre el Centro Educativo Ambiental
```
#### 5. Iniciar el servidor de desarrollo

```bash

npm run dev
```
La aplicación estará disponible en: **[http://localhost:3000/](http://localhost:3000/)**

---

## ⚙️ Configuración

### Configuración de Vite

```javascript

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['leaflet']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
```
### Configuración de Leaflet

Los iconos de Leaflet deben configurarse correctamente:

```javascript

// En RouteMap.jsx
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Configuración de iconos
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});
```
---

## 📱 Uso

### 1. Pantalla de Inicio (Splash)

- Animación de carga automática
- Transición a la pantalla principal después de 2-3 segundos

### 2. Pantalla Principal (Home)

- Simulación de código QR con animación
- Botón "Simular Escaneo" para iniciar la ruta
- Información de rutas disponibles
### 3. Mapa Interactivo

- Visualización de 3 rutas de colores
- 4 puntos de interés con información educativa
- 3 puertas de entrada con marcadores
- Geolocalización del usuario
### 4. Interacción con Puntos

- **Clic en marcador**: Muestra información básica en popup
- **Panel inferior**: Muestra información detallada con imagen
- **Botón "Visitar CEA"**: Navega al destino final
### 5. Llegada al CEA

- Pantalla de celebración con estadísticas
- Distancia recorrida, tiempo y puntos visitados
- Opciones: "Nueva Ruta" o "Ver Mapa"
---
## 🗺️ Coordenadas del Parque

### Parque O'Higgins - Santiago, Chile

|Ubicación|Latitud|Longitud|
|---|---|---|
|**CEA (Destino)**|-33.46403756318918|-70.66265950496233|
|**Puerta Metro O'Higgins**|-33.460633988030054|-70.65835487634902|
|**Puerta Beauchef**|-33.460597099786604|-70.66386247064762|
|**Puerta Rondizzoni**|-33.46978340588195|-70.65958600292596|
|**Huerto Comunitario**|-33.4641296733008|-70.66252323979717|
|**Punto de Compostaje**|-33.46420117310819|-70.66254692201362|
|**Punto de Reciclaje**|-33.46408263401791|-70.66274314688243|

### Rutas

|Ruta|Color|Duración|Distancia|Puerta|
|---|---|---|---|---|
|**Verde**|🟢 #4caf50|10 min|0.8 km|Metro O'Higgins|
|**Azul**|🔵 #2196f3|15 min|1.2 km|Beauchef|
|**Naranja**|🟠 #ff9800|20 min|1.8 km|Rondizzoni|

---

## 📦 Comandos Disponibles

|Comando|Descripción|
|---|---|
|`npm run dev`|Inicia el servidor de desarrollo en [http://localhost:3000/](http://localhost:3000/)|
|`npm run build`|Construye la aplicación para producción en la carpeta `dist/`|
|`npm run preview`|Previsualiza la versión de producción|
|`npm run lint`|Ejecuta ESLint para verificar el código|
|`npm run format`|Formatea el código con Prettier (si está configurado)|
