# 🎯 Sistema de Configuración Independiente por Cliente

## Concepto

Cada cliente recibe su **propia versión compilada** de la aplicación con sus colores personalizados. Los cambios de un cliente **NO afectan** a otros clientes.

Similar a cómo los datos están aislados por `adminId`, ahora la UI también está aislada.

```
CLIENT A                    CLIENT B                    CLIENT C
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ APP (Rosa)      │     │ APP (Azul)      │     │ APP (Default)   │
│ - Primary: Rojo │     │ - Primary: Azul │     │ - Primary: Azul │
│ - Secondary..   │     │ - Secondary..   │     │ - Secondary..   │
│                 │     │                 │     │                 │
│ Datos Client A  │     │ Datos Client B  │     │ Datos Client C  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
  Totalmente              Totalmente              Totalmente
  Independiente          Independiente           Independiente
```

---

## 📁 Estructura de Archivos

```
Front/src/
├── config/
│   └── clientConfig.js         ✨ ARCHIVO DE CONFIGURACIÓN DEL CLIENTE
├── services/
│   └── clientThemeService.js   📦 Servicio que aplica los colores
├── context/
│   └── ThemeContext.jsx        ✅ Actualizado para aplicar colores
├── main.jsx                    ✅ Ahora aplica configuración
└── index.css                   ✅ Usa variables dinámicas
```

---

## 🔧 Cómo Personalizar para Cada Cliente

### Paso 1: Abrir el archivo de configuración

```javascript
// Front/src/config/clientConfig.js
const CLIENT_CONFIG = {
  clientName: "Cliente Demo", // ← CAMBIAR A NOMBRE REAL DEL CLIENTE

  theme: {
    light: {
      primaryColor: "#3b82f6", // ← CAMBIAR A COLOR DEL CLIENTE
      secondaryColor: "#10b981", // ← CAMBIAR A COLOR DEL CLIENTE
      accentColor: "#f59e0b",
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
    },
    dark: {
      primaryColor: "#60a5fa",
      secondaryColor: "#34d399",
      accentColor: "#fbbf24",
      backgroundColor: "#0f172a",
      textColor: "#f1f5f9",
    },
  },
};
```

### Paso 2: Personalizar los colores

**Ejemplo Cliente A - Agencia Inmobiliaria (Rosa/Rojo):**

```javascript
const CLIENT_CONFIG = {
  clientName: "Inmobiliaria Prestige",

  theme: {
    light: {
      primaryColor: "#ec4899", // Rosa
      secondaryColor: "#f43f5e", // Rojo
      accentColor: "#f97316", // Naranja
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
    },
    dark: {
      primaryColor: "#fb7185", // Rosa claro
      secondaryColor: "#fb6b8c", // Rojo claro
      accentColor: "#fb923c",
      backgroundColor: "#0f172a",
      textColor: "#f1f5f9",
    },
  },
  brandName: "Prestige Inmobiliaria",
  features: {
    allowThemeToggle: true,
    allowCustomization: false, // El cliente NO puede cambiar colores
  },
};
```

**Ejemplo Cliente B - No quiere cambios (Default):**

```javascript
const CLIENT_CONFIG = {
  clientName: "Cliente Corporativo",

  theme: {
    light: {
      primaryColor: "#3b82f6", // Azul default
      secondaryColor: "#10b981", // Verde default
      accentColor: "#f59e0b",
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
    },
    dark: {
      primaryColor: "#60a5fa",
      secondaryColor: "#34d399",
      accentColor: "#fbbf24",
      backgroundColor: "#0f172a",
      textColor: "#f1f5f9",
    },
  },
};
```

### Paso 3: Compilar y entregar

```bash
# Compilar la app para el cliente
npm run build

# Entregar el dist/ compilado al cliente
# Su app ya tiene sus colores personalizados
```

---

## 🎨 Paletas de Colores Sugeridas

### Profesional / Corporativo

```javascript
light: {
  primaryColor: "#1e40af",      // Azul oscuro
  secondaryColor: "#7c3aed",    // Púrpura
  accentColor: "#059669",       // Verde
}
```

### Moderno / Tech

```javascript
light: {
  primaryColor: "#00d4ff",      // Cian
  secondaryColor: "#ff006e",    // Rosa
  accentColor: "#ffbe0b",       // Amarillo
}
```

### Cálido / Amigable

```javascript
light: {
  primaryColor: "#ea580c",      // Naranja
  secondaryColor: "#dc2626",    // Rojo
  accentColor: "#f97316",       // Naranja claro
}
```

### Minimalista / Elegante

```javascript
light: {
  primaryColor: "#1f2937",      // Gris oscuro
  secondaryColor: "#6b7280",    // Gris medio
  accentColor: "#3b82f6",       // Azul
}
```

---

## ⚙️ Cómo Funciona Internamente

### 1️⃣ Al Iniciar la App

```javascript
// main.jsx
applyClientTheme("light"); // Inyecta colores en variables CSS
```

### 2️⃣ Se Inyectan Variables CSS

```css
/* Variables inyectadas en :root */
--client-primary-color: #3b82f6 --client-secondary-color: #10b981
  --client-accent-color: #f59e0b --client-background-color: #ffffff
  --client-text-color: #1f2937;
```

### 3️⃣ El CSS Las Utiliza

```css
:root[data-theme="light"] {
  --accent-color: var(--client-primary-color, #3b82f6);
  --success-color: var(--client-secondary-color, #10b981);
}
```

### 4️⃣ Todos los Componentes Usan los Colores

Los componentes y CSS ya estaban usando `var(--accent-color)`, así que automáticamente usan los colores del cliente.

---

## 🚀 Flujo de Entrega a Clientes

```
1. Cliente dice: "Quiero rojo primario y naranja secundario"
   ↓
2. Editar Front/src/config/clientConfig.js
   ├─ primaryColor: "#dc2626"  (Rojo)
   └─ secondaryColor: "#f97316" (Naranja)
   ↓
3. npm run build
   ↓
4. Entregar dist/ compilado al cliente
   ↓
5. Cliente ve su app con sus colores personalizados
   ↓
6. Otros clientes NO son afectados (tienen compilaciones diferentes)
```

---

## ✅ Ventajas

| Ventaja          | Descripción                                           |
| ---------------- | ----------------------------------------------------- |
| **Aislamiento**  | Cada cliente tiene su propia versión compilada        |
| **Seguridad**    | El cliente NO puede cambiar los colores en producción |
| **Consistencia** | Los colores son fijos en toda su app                  |
| **Rendimiento**  | Los colores se aplican una sola vez al iniciar        |
| **Simplicidad**  | Solo editar un archivo JSON                           |
| **Sin Backend**  | No requiere endpoint de API para esto                 |

---

## 🔄 Cambiar Configuración Después de Entregar

Si el cliente quiere cambiar sus colores **después** de recibir la app:

1. Editar `clientConfig.js` nuevamente
2. Compilar: `npm run build`
3. Desplegar nueva versión

No hay cambio en la BD, es solo recompilación.

---

## 📝 Ejemplos de Uso

### Acceder a la configuración desde un componente

```jsx
import { getClientConfig } from "../services/clientThemeService";

function MiComponente() {
  const config = getClientConfig();

  return (
    <div>
      <h1>{config.clientName}</h1>
      <p>{config.brandName}</p>
    </div>
  );
}
```

### Verificar si se permite personalización

```jsx
import { canCustomizeTheme } from "../services/clientThemeService";

function AdminSettings() {
  if (!canCustomizeTheme()) {
    return <p>Personalización deshabilitada para este cliente</p>;
  }

  // Mostrar controles de personalización...
}
```

### Obtener un color específico

```jsx
import { getClientColor } from "../services/clientThemeService";

function CustomButton() {
  const primaryColor = getClientColor("primaryColor", "light");

  return <button style={{ backgroundColor: primaryColor }}>Mi Botón</button>;
}
```

---

## 🛠️ Cambiar Colores Dinámicamente (Avanzado)

Si ALGÚN cliente genuinamente necesita cambiar colores dinámicamente, se puede hacer:

```javascript
// Aplicar nuevo tema en tiempo real
import { applyClientTheme } from "../services/clientThemeService";

applyClientTheme("dark"); // Al cambiar a dark mode
```

Pero **por defecto, esto está deshabilitado** (`allowCustomization: false`).

---

## 📋 Checklist de Entrega

- [ ] Editar `clientConfig.js` con nombre del cliente
- [ ] Personalizar colores light
- [ ] Personalizar colores dark
- [ ] Probar:
  - [ ] Modo light
  - [ ] Modo dark (click en 🌙)
  - [ ] Todos los componentes usan los colores correctos
- [ ] Ejecutar: `npm run build`
- [ ] Entregar contenido de `dist/` al cliente
- [ ] Verificar en producción

---

## ❓ Preguntas Frecuentes

**P: ¿Afecta a otros clientes si cambio los colores?**
R: No. Cada cliente tiene su propia compilación con su propio `clientConfig.js`.

**P: ¿Puedo permitir que el cliente cambie colores desde la app?**
R: Sí, cambiar `allowCustomization: true` en clientConfig.js. Pero se recomienda mantenerlo en `false`.

**P: ¿Dónde se guardan los códigos de color?**
R: En `Front/src/config/clientConfig.js`. Es un archivo estático, no usa BD.

**P: ¿Y si el cliente quiere cambiar después de entregar?**
R: Editar el archivo, recompilar y redesplegar. Es rápido.

---

## 📞 Soporte

Para agregar nuevas paletas o características visuales, contactar al equipo de desarrollo.

---

**Última actualización:** 18 de febrero de 2026
