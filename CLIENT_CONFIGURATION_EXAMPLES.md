# 📋 Ejemplos Prácticos - Configuración por Cliente

## Ejemplo 1: Cliente Quiere Todo Rosa (Caso Real)

### Situación

Cliente: "Quiero que mi app sea toda rosa, no azul como la demo"

### Solución

**Paso 1: Editar `Front/src/config/clientConfig.js`**

```javascript
const CLIENT_CONFIG = {
  clientName: "Rosa Inmobiliaria", // ← Cambiar nombre

  theme: {
    light: {
      primaryColor: "#ec4899", // 🎨 ROSA (fue #3b82f6)
      secondaryColor: "#f43f5e", // 🎨 ROJO (fue #10b981)
      accentColor: "#f97316",
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
    },
    dark: {
      primaryColor: "#fb7185", // 🎨 ROSA claro
      secondaryColor: "#fb6b8c", // 🎨 ROJO claro
      accentColor: "#fb923c",
      backgroundColor: "#0f172a",
      textColor: "#f1f5f9",
    },
  },
  brandName: "Rosa Inmobiliaria",
  features: {
    allowThemeToggle: true,
    allowCustomization: false,
  },
};

export default CLIENT_CONFIG;
```

**Paso 2: Compilar**

```bash
cd Front
npm run build
```

**Paso 3: Entregar**

```bash
# Dar acceso a:
dist/
  ├── index.html
  ├── assets/
  └── ...
```

**Resultado:** El cliente ve su app completamente ROSA. Otros clientes siguen viendo AZUL.

---

## Ejemplo 2: Cliente No Quiere Cambios (Default)

### Situación

Cliente: "Mantengan los colores por defecto, no quiero cambios"

### Solución

**Dejar `clientConfig.js` tal como está:**

```javascript
const CLIENT_CONFIG = {
  clientName: "Cliente Corporativo", // Solo actualizar nombre

  theme: {
    light: {
      primaryColor: "#3b82f6", // ✅ Default azul
      secondaryColor: "#10b981", // ✅ Default verde
      // ... resto igual
    },
    // ...
  },
};
```

**Entregar el `dist/` normalmente. El cliente recibe app con colores default.**

---

## Ejemplo 3: Múltiples Clientes Simultáneamente

### Situación

Tienes 3 clientes con requisitos diferentes:

```
Cliente A (Rosa)  ← Quiere colores personalizados
Cliente B (Azul)  ← Quiere colores default
Cliente C (Verde) ← Quiere colores verdes
```

### Solución: Tres Compilaciones

**Para Cliente A (Rosa):**

```bash
# Editar clientConfig.js
primaryColor: "#ec4899"   # Rosa
secondaryColor: "#f43f5e"  # Rojo

# Compilar
npm run build
# Entregar dist/
```

**Para Cliente B (Default):**

```bash
# Editar clientConfig.js (o dejar igual)
primaryColor: "#3b82f6"    # Azul
secondaryColor: "#10b981"  # Verde

# Compilar
npm run build
# Entregar dist/
```

**Para Cliente C (Verde):**

```bash
# Editar clientConfig.js
primaryColor: "#059669"    # Verde oscuro
secondaryColor: "#34d399"  # Verde claro

# Compilar
npm run build
# Entregar dist/
```

**Resultado:**

```
Cliente A → su app es ROSA
Cliente B → su app es AZUL (default)
Cliente C → su app es VERDE

❌ Ninguno interfiere con los otros
❌ Los cambios están EN LA COMPILACIÓN, no en runtime
✅ Cada cliente tiene su versión INDEPENDIENTE
```

---

## Ejemplo 4: Cambiar Solo Colores Light (Mantener Dark Default)

### Situación

Cliente: "Solo cambien el light mode, dejen el dark como está"

### Solución

```javascript
const CLIENT_CONFIG = {
  clientName: "Parcial Personalizado",

  theme: {
    light: {
      primaryColor: "#d946ef", // 🎨 Púrpura personalizado
      secondaryColor: "#06b6d4", // 🎨 Cian personalizado
      accentColor: "#f97316",
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
    },
    dark: {
      primaryColor: "#60a5fa", // ❌ Igual a default
      secondaryColor: "#34d399", // ❌ Igual a default
      accentColor: "#fbbf24",
      backgroundColor: "#0f172a",
      textColor: "#f1f5f9",
    },
  },
};
```

---

## Ejemplo 5: Mostrar Nombre de Cliente en la App

### Situación

Quieres que se muestre el nombre del cliente en la app

### En un componente:

```jsx
import { getClientConfig } from "../services/clientThemeService";

function Header() {
  const config = getClientConfig();

  return (
    <header>
      <h1>Bienvenido a {config.brandName}</h1>
      {/* Usa los colores personalizados automáticamente */}
    </header>
  );
}
```

---

## Ejemplo 6: Entregar con Script Automatizado

Si tienes muchos clientes, puedes automatizar:

**Script: `build-for-client.sh`**

```bash
#!/bin/bash

CLIENT_NAME=$1
PRIMARY_COLOR=$2
SECONDARY_COLOR=$3

# Actualizar config
sed -i "s/clientName: .*/clientName: \"$CLIENT_NAME\",/" Front/src/config/clientConfig.js
sed -i "s/primaryColor: \"#.*\",/primaryColor: \"$PRIMARY_COLOR\",/" Front/src/config/clientConfig.js
sed -i "s/secondaryColor: \"#.*\",/secondaryColor: \"$SECONDARY_COLOR\",/" Front/src/config/clientConfig.js

# Compilar
cd Front && npm run build

# Mover a carpeta del cliente
mkdir -p ../output/$CLIENT_NAME/
cp -r dist/* ../output/$CLIENT_NAME/

echo "✅ App compilada para $CLIENT_NAME"
echo "📦 Ubicación: ../output/$CLIENT_NAME/"
```

**Uso:**

```bash
./build-for-client.sh "Rosa Inmobiliaria" "#ec4899" "#f43f5e"
./build-for-client.sh "Cliente Default" "#3b82f6" "#10b981"
./build-for-client.sh "Verde Tech" "#059669" "#34d399"
```

---

## Ejemplo 7: Actualizar Cliente Después de Entregar

### Situación

Cliente A (Rosa) quiere cambiar su primario a morado

### Solución

**Paso 1: Actualizar config**

```javascript
// Front/src/config/clientConfig.js
primaryColor: "#a855f7"; // Cambiar de #ec4899 a morado
```

**Paso 2: Recompilar y redesplegar**

```bash
npm run build
# Desplegar nuevo dist/ en su servidor
```

**Resultado:** Su app ahora es morada. Otros clientes no cambian.

---

## Ejemplo 8: Diferentes Paletas por Industria

### Agencia Inmobiliaria

```javascript
theme: {
  light: {
    primaryColor: "#1e40af",      // Azul profesional
    secondaryColor: "#059669",    // Verde confianza
    accentColor: "#dc2626",       // Rojo acción
  }
}
```

### Startup Tech

```javascript
theme: {
  light: {
    primaryColor: "#00d4ff",      // Cian moderno
    secondaryColor: "#ff006e",    // Rosa vibrante
    accentColor: "#ffbe0b",       // Amarillo energético
  }
}
```

### Consultoría Legal

```javascript
theme: {
  light: {
    primaryColor: "#1f2937",      // Gris elegante
    secondaryColor: "#6b21a8",    // Púrpura sofisticado
    accentColor: "#dc2626",       // Rojo corporativo
  }
}
```

### E-commerce

```javascript
theme: {
  light: {
    primaryColor: "#ea580c",      // Naranja llamativo
    secondaryColor: "#f97316",    // Naranja más claro
    accentColor: "#fbbf24",       // Amarillo promoción
  }
}
```

---

## Ejemplo 9: Verificar Compilación Correcta

**Después de compilar, verificar que los colores se aplicaron:**

```bash
# Extrae el valor del color del bundle
grep -r "primaryColor" Front/dist/assets/*.js | head -1

# Debería mostrar algo como: "#ec4899" (el color configurado)
```

---

## Ejemplo 10: Publicar a Diferentes Dominios

Cada cliente en su propio dominio/servidor:

```
Cliente A: https://cliente-a.com/
  └─ dist/ compilada con PRIMARY: #ec4899 (Rosa)

Cliente B: https://cliente-b.com/
  └─ dist/ compilada con PRIMARY: #3b82f6 (Azul)

Cliente C: https://cliente-c.com/
  └─ dist/ compilada con PRIMARY: #059669 (Verde)
```

Cada uno accede a su propia compilación. **Totalmente independiente.**

---

## 🔍 Checklist de Entrega

Para cada cliente:

- [ ] 1. Editar `Front/src/config/clientConfig.js`
  - [ ] Cambiar `clientName`
  - [ ] Cambiar `brandName` (opcional)
  - [ ] Cambiar `theme.light.primaryColor`
  - [ ] Cambiar `theme.light.secondaryColor` (opcional)
  - [ ] Si necesita dark customizado, cambiar `theme.dark` también

- [ ] 2. Compilar: `npm run build`

- [ ] 3. Probar: `npm run preview` (ver resultado)
  - [ ] Verificar light mode
  - [ ] Cambiar a dark mode (click 🌙)
  - [ ] Verificar que todos los colores son correctos

- [ ] 4. Entregar contenido de `dist/`

- [ ] 5. Verificar en servidor del cliente

---

## 💾 Guardar Historial de Configs

Para no olvidar qué cliente tiene qué colores:

**archivo: `client-configs-history.json`**

```json
{
  "clients": [
    {
      "name": "Rosa Inmobiliaria",
      "date": "2026-02-18",
      "primaryColor": "#ec4899",
      "secondaryColor": "#f43f5e",
      "deployed": true
    },
    {
      "name": "Cliente Corporativo",
      "date": "2026-02-18",
      "primaryColor": "#3b82f6",
      "secondaryColor": "#10b981",
      "deployed": false
    }
  ]
}
```

---

**Última actualización:** 18 de febrero de 2026
