# 🌱 RutaCEA – Mapa Interactivo del Centro Educativo Ambiental

**RutaCEA** es un mapa interactivo que guía a los visitantes del Parque O'Higgins hacia el **Centro Educativo Ambiental (CEA)** de la Municipalidad de Santiago. Muestra puntos de interés, rutas de acceso desde distintas entradas y contenido educativo sobre los espacios del CEA.

---
## 🚀 Demo rápida
1. Abre `index.html` en tu navegador.
2. Explora el mapa con los marcadores.
3. Haz clic en los puntos de interés para ver información.
4. Usa el panel inferior para navegar por puntos, rutas y más.
---
## 📂 Estructura del proyecto

RutaCEA/
├── index.html # Página principal (estructura)  
├── styles.css # Estilos visuales (responsive)  
├── script.js # Lógica del mapa e interactividad  
└── README.md # Este archivo

---
## 🛠️ Tecnologías utilizadas
| Tecnología | Uso |
|------------|-----|
| **HTML5** | Estructura semántica |
| **CSS3** | Estilos personalizados, responsive |
| **JavaScript (ES6)** | Lógica de mapa e interacciones |
| **Leaflet.js** | Mapa interactivo (código abierto) |
| **OpenStreetMap** | Capa base del mapa |
| **Font Awesome** | Íconos visuales |
| **Google Fonts (Inter)** | Tipografía moderna |

---
## 🧭 Funcionalidades principales
| Funcionalidad | Descripción |
|---------------|-------------|
| **Mapa interactivo** | Visualiza el Parque O'Higgins y el CEA con marcadores personalizados |
| **Puntos de interés (POIs)** | 7 puntos clave: CEA, huerto, compostaje, reciclaje y entradas |
| **Rutas de acceso** | 3 rutas con colores (Verde, Azul, Naranja) desde distintas entradas |
| **Panel inferior** | Pestañas: Puntos (lista interactiva), Rutas (mostrar/ocultar), Acerca de |
| **Mi ubicación** | Georreferencia tu posición actual en el mapa |
| **Diseño responsive** | Adaptado para celulares, tabletas y escritorio |

---
## 🔧 Cómo ejecutar localmente
### Opción 1: Live Server (recomendada)
1. Instala la extensión **Live Server** en VSCode.
2. Abre la carpeta del proyecto.
3. Haz clic derecho en `index.html` y selecciona **Open with Live Server**.
### Opción 2: Directo en navegador
1. Abre la carpeta del proyecto.
2. Haz doble clic en `index.html` para abrirlo en tu navegador.

---
## 📦 Personalización
### Agregar un nuevo punto de interés
Edita el arreglo `POINTS` en `script.js`:
```javascript
{
  id: 'nuevo-punto',
  nombre: 'Nombre del lugar',
  coords: [-33.4600, -70.6650],
  icono: 'fa-tree',
  color: '#4CAF50',
  descripcion: 'Descripción breve del lugar.'
}
```
### Agregar o modificar una ruta

Edita el objeto `RUTAS` en `script.js`:

```javascript

nueva: {
  id: 'nueva',
  nombre: 'Ruta Nueva',
  color: '#FF5722',
  puntos: [
    [-33.4610, -70.6640],
    [-33.4600, -70.6650],
    [-33.4598, -70.6638]
  ]
}
```
### Cambiar colores

Busca en `styles.css` la variable `#2E7D32` (verde principal) y reemplázala por el color deseado.

---

## 🌐 Créditos y referentes

- **Mapa base**: OpenStreetMap
- **Biblioteca de mapas**: [Leaflet.js](https://leafletjs.com/)
- **Íconos**: [Font Awesome](https://fontawesome.com/)
- **Tipografía**: [Google Fonts – Inter](https://fonts.google.com/specimen/Inter)
- **Inspiración visual**: Mapcarta, High Line Park (señalética integrada)

Proyecto desarrollado por estudiantes de **INACAP** – Innovación y Emprendimiento II.

---

## 📝 Licencia

Este proyecto es de uso educativo y colaborativo. Puedes usarlo, modificarlo y compartirlo libremente con fines no comerciales.

---

**🌱 RutaCEA – Tu huella sustentable, en tu bolsillo.**

---
¡Listo! Con estos tres archivos (`index.html`, `styles.css`, `script.js`) y el `README.md`, tendrás tu mockup funcional de RutaCEA. Solo necesitas copiar el contenido en VSCode y ejecutarlo con Live Server. Si quieres, puedo ayudarte a ajustar colores, agregar más puntos o modificar el comportamiento del mapa.
