# 🌱 RutaCEA

**Conectando a la comunidad de Santiago Centro con el Centro Educativo Ambiental (CEA)**

---
## 📋 Tabla de Contenidos

- Descripción General
- Problemática
- Contexto
- Desafío
- Solución Propuesta
- Datos del Parque O'Higgins
- Rutas Disponibles
- Tecnologías Utilizadas
- Mapas y Geolocalización
- Estilos y UI
---
## 🌿 Descripción General

**RutaCEA** es una solución innovadora que busca conectar a la comunidad de Santiago Centro con el **Centro Educativo Ambiental (CEA)** de la Municipalidad de Santiago, ubicado dentro del **Parque O'Higgins**.

La aplicación guía a los visitantes a través de un mapa interactivo con rutas de colores y puntos de interés educativo, promoviendo la adopción de prácticas de economía circular y sustentabilidad en la vida cotidiana.

---
## 🎯 Problemática

### Datos de la Investigación

- ❌ **8 de cada 10 estudiantes** NUNCA han visto información del CEA
- ❌ **5 de cada 5 jefes de hogar** NO separan residuos orgánicos
- ❌ **Principales barreras**:
    - Falta de tiempo
    - Espacio insuficiente
    - Desconocimiento del tema
    - Miedo a plagas
- ❌ **Desconexión crítica** entre el conocimiento ambiental y la acción cotidiana
---
## 📍 Contexto

El **Centro Educativo Ambiental (CEA)** de la Municipalidad de Santiago ofrece valiosos recursos educativos sobre sustentabilidad, economía circular y prácticas ambientales. Sin embargo, existe una brecha significativa entre la comunidad y estos recursos, especialmente entre estudiantes y jefes de hogar.

El CEA se encuentra ubicado dentro del **Parque O'Higgins**, un espacio público clave en la comuna de Santiago que recibe a miles de visitantes diariamente. A pesar de su ubicación estratégica y la importancia de sus programas educativos, el centro es desconocido para la mayoría de los habitantes de la comuna.

---
## 💡 Desafío

> **"¿Cómo podríamos facilitar la participación y comprensión de la comunidad de Santiago Centro respecto a las acciones del CEA, mediante experiencias accesibles, visibles y motivadoras, para aumentar en al menos un 20% la adopción de prácticas de economía circular durante el primer año de implementación?"**

---
## 🗺️ Solución Propuesta

**RutaCEA** propone:

|Componente|Descripción|
|---|---|
|**🗺️ Mapa Interactivo**|Visualización del Parque O'Higgins con rutas y puntos de interés usando Leaflet y OpenStreetMap|
|**🚪 3 Rutas Accesibles**|Rutas de colores (Verde, Azul, Naranja) desde diferentes puertas de entrada del parque|
|**📚 Contenido Educativo**|Información detallada sobre prácticas sustentables en cada punto de interés|
|**📱 Experiencia Mobile**|Diseño adaptado para dispositivos móviles con interacciones táctiles|
|**🏆 Gamificación**|Sistema de puntos y logros para motivar la participación y el aprendizaje|
|**📍 Geolocalización**|Ubicación del usuario en tiempo real para navegación precisa|

---
## 🗺️ Datos del Parque O'Higgins

### Coordenadas de los Puntos de Interés

|Ubicación|Latitud|Longitud|Icono|Tipo|
|---|---|---|---|---|
|**🏛️ Centro Educativo Ambiental (CEA)**|-33.46403756318918|-70.66265950496233|🏛️|Destino|
|**🚪 Puerta Metro O'Higgins**|-33.460633988030054|-70.65835487634902|🚪|Entrada|
|**🚪 Puerta Beauchef**|-33.460597099786604|-70.66386247064762|🚪|Entrada|
|**🚪 Puerta Rondizzoni**|-33.46978340588195|-70.65958600292596|🚪|Entrada|
|**🌿 Huerto Comunitario**|-33.4641296733008|-70.66252323979717|🌿|Interés|
|**♻️ Punto de Compostaje**|-33.46420117310819|-70.66254692201362|♻️|Interés|
|**🗑️ Punto de Reciclaje**|-33.46408263401791|-70.66274314688243|🗑️|Interés|

---

## 🚦 Rutas Disponibles

|Ruta|Color|Código HEX|Duración|Distancia|Puerta de Entrada|
|---|---|---|---|---|---|
|**Verde**|🟢|`#4CAF50`|10 min|0.8 km|Metro O'Higgins|
|**Azul**|🔵|`#2196F3`|15 min|1.2 km|Beauchef|
|**Naranja**|🟠|`#FF9800`|20 min|1.8 km|Rondizzoni|
### Descripción de Rutas

**Ruta Verde (Corta)**

- Punto de partida: Metro Parque O'Higgins
- Recorrido: Sector norte del parque
- Ideal para: Visitas rápidas o con poco tiempo

**Ruta Azul (Media)**

- Punto de partida: Av. Beauchef
- Recorrido: Centro del parque
- Ideal para: Visitas con tiempo moderado

**Ruta Naranja (Larga)**

- Punto de partida: Av. General Rondizzoni
- Recorrido: Todo el parque
- Ideal para: Visitas completas y exploración

---

## 🛠️ Tecnologías Utilizadas

### Frontend

|Tecnología|Versión|Uso|
|---|---|---|
|**HTML5**|-|Estructura semántica de las páginas|
|**CSS3**|-|Estilos personalizados y animaciones|
|**JavaScript ES6**|-|Lógica e interactividad del mapa|
|**React**|18.2.0|Framework para interfaces de usuario (Mockup 4)|
|**Vite**|4.3.9|Bundler y servidor de desarrollo (Mockup 4)|
### Tecnologías por Mockup

|Mockup|Tecnologías Principales|Framework|
|---|---|---|
|**Mockup 1-3**|HTML5, CSS3, JavaScript ES6|Sin framework|
|**Mockup 4**|React, Vite, JSX|React 18.2.0|

---
## 🗺️ Mapas y Geolocalización

|Tecnología|Versión|Uso|
|---|---|---|
|**Leaflet**|1.9.4|Biblioteca de mapas interactivos de código abierto|
|**React Leaflet**|4.2.1|Componentes React para Leaflet (Mockup 4)|
|**OpenStreetMap**|-|Capa base del mapa (gratuita y de código abierto)|
|**Geolocation API**|-|API nativa del navegador para ubicación del usuario|
### Características de Mapas

- ✅ **Marcadores personalizados** con emojis y colores
- ✅ **Polilíneas de rutas** con diferentes colores
- ✅ **Zoom y pan** interactivo
- ✅ **Popup informativos** al hacer clic en puntos
- ✅ **Geolocalización** del usuario en tiempo real
- ✅ **Diseño responsive** para dispositivos móviles

---

## 🎨 Estilos y UI

### Paleta de Colores

|Color|Código HEX|Uso|
|---|---|---|
|Verde Bosque|`#2d6a3f`|Color primario|
|Verde Oscuro|`#1a4a2a`|Color secundario|
|Verde Claro|`#8bc34a`|Color de acento|
|Blanco Verdoso|`#f8fbf8`|Fondo principal|
|Texto Principal|`#1a2a1a`|Texto principal|
|Texto Secundario|`#5a7a6a`|Texto secundario|
### Colores de Rutas

|Ruta|Código HEX|
|---|---|
|**Verde**|`#4CAF50`|
|**Azul**|`#2196F3`|
|**Naranja**|`#FF9800`|
### Tipografía

|Propiedad|Valor|
|---|---|
|**Fuente principal**|'Inter', sans-serif|
|**Fuente alternativa**|-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto|
|**Pesos**|400-600 (cuerpo), 700-800 (títulos)|
### Diseño

- ✅ **Mobile-First Design** - Optimizado para smartphones
- ✅ **Responsive** - Adaptable a tablets y desktop
- ✅ **Animaciones suaves** - Transiciones fluidas entre pantallas
- ✅ **Interfaz intuitiva** - Fácil de usar para todos los públicos
- ✅ **Accesibilidad** - Contraste adecuado y tamaños legibles

---

