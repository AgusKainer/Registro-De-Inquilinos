## 🚀 Actualización Multi-Tenant

Este documento describe los cambios realizados para implementar una arquitectura **multi-tenant** (múltiples clientes con datos aislados).

### ¿Qué es Multi-Tenant?

Multi-tenant significa que una sola instancia de la aplicación sirve a múltiples clientes (inquilinos), donde cada cliente tiene sus propios datos completamente aislados. Los cambios de un cliente NO afectan a otros clientes.

### Cambios Realizados

#### 1. **Modelo de Datos**

Todos los modelos ahora incluyen un campo `adminId` para identificar dueño de los datos:

- `Inquilino` - cada inquilino pertenece a un admin
- `Local` - cada propiedad pertenece a un admin
- `Contrato` - cada contrato pertenece a un admin
- `Foto` - cada foto pertenece a un admin
- `Reparacion` - cada reparación pertenece a un admin
- `Renovacion` - cada renovación pertenece a un admin

También se expandió el modelo `Admin` para soportar información de la empresa:

```javascript
{
  id: UUID,
  username: STRING (único),
  password: STRING (encriptada),
  nombreEmpresa: STRING,
  email: STRING,
  telefono: STRING,
  dominio: STRING (único),
  subdominio: STRING (único)
}
```

#### 2. **Autenticación y Seguridad**

**Middleware de Autenticación** (`authMiddleware.js`):

- Verifica el token JWT en cada solicitud
- Extrae el `adminId` del token
- Agrega `req.adminId` al request para uso en controladores/servicios

**Middleware de Subdominio** (`subdomainMiddleware.js`):

- Detecta el subdominio en la URL (ej: cliente.tuapp.com)
- Soporta arquitectura SaaS con dominios por cliente

**Middleware de Validación de Subdominio** (`validateSubdomainMiddleware.js`):

- Valida que el subdominio coincida con el usuario autenticado
- Simepre protege contra acceso a datos de otros clientes

#### 3. **Servicios Actualizados**

Todos los servicios ahora:

- **GET**: Filtran resultados por `adminId` usando `where: { adminId }`
- **POST**: Incluyen `adminId` en los datos creados
- **PUT**: Validan que el registro pertenezca al `adminId` actual
- **DELETE**: Solo eliminan si el registro pertenece al `adminId` actual

Ejemplo de un servicio actualizado:

```javascript
// Antes (SIN aislamiento multi-tenant)
const getAllInquilino = async () => {
  return await Inquilino.findAll();
};

// Después (CON aislamiento multi-tenant)
const getAllInquilino = async (adminId) => {
  return await Inquilino.findAll({ where: { adminId } });
};
```

#### 4. **Controladores Actualizados**

Todos los controladores ahora:

- Pasan `req.adminId` a los servicios
- Agregan `data.adminId = req.adminId` antes de crear registros

Ejemplo:

```javascript
// En POST
const postInquilinoController = async (req, res) => {
  const data = req.body;
  data.adminId = req.adminId; // ← IMPORTANTE
  const result = await postInquilinoService(data);
};

// En GET
const getAllInquilinoController = async (req, res) => {
  const result = await getAllInquilinoService(req.adminId); // ← IMPORTANTE
};
```

#### 5. **Nuevas Características**

**Actualización de Perfil del Admin** (`PUT /alquileres/auth/profile`):
Permite que cada cliente actualice:

- Nombre de la empresa
- Email
- Teléfono
- Dominio personalizado
- Subdominio personalizado

```javascript
// Request
PUT /alquileres/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombreEmpresa": "Mi Empresa",
  "email": "admin@miempresa.com",
  "telefono": "+1234567890",
  "dominio": "miempresa.com",
  "subdominio": "miempresa"
}
```

### Flujo de Autenticación y Autorizacion

```
1. Cliente inicia sesión (POST /alquileres/auth/login)
   ↓
2. Backend valida credenciales
   ↓
3. Genera JWT con adminId    JWT = { id: admin.id }
   ↓
4. Cliente recibe token y lo almacena
   ↓
5. Cliente hace request con token (Authorization: Bearer <token>)
   ↓
6. authMiddleware extrae adminId del JWT
   ↓
7. validateSubdomainMiddleware valida el subdominio (opcional)
   ↓
8. Controlador procesa request y llama servicio con adminId
   ↓
9. Servicio filtra datos por adminId (WHERE adminId = ...)
   ↓
10. Response solo contiene datos del cliente autenticado
```

### Migración de Base de Datos

**IMPORTANTE**: La primera vez que ejecutes el servidor con estos cambios, debes:

1. Cambiar `force: false` a `force: true` en `server.js`:

```javascript
await db.sync({ force: true }); // ← Cambia esto
```

2. Ejecutar el servidor para recrear las tablas
3. Cambiar nuevamente a `force: false` para desarrollo normal

```javascript
await db.sync({ force: false }); // ← Vuelve a esto
```

### Verificación de Seguridad

Para asegurar que el aislamiento de datos funciona correctamente:

1. **Prueba con múltiples usuarios**:
   - Registra 2 usuarios diferentes: usuario1@test.com, usuario2@test.com
   - Cada uno crea inquilinos y locales
   - Verifica que usuario1 SOLO ve sus propios inquilinos
   - Verifica que usuario2 SOLO ve sus propios inquilinos

2. **Prueba de token**:
   - Intenta cambiar el adminId en la base de datos manualmente
   - El sistema debe rechazar el acceso (gracias al JWT)

3. **Prueba de subdominio** (opcional):
   - Configura tu host local: 127.0.0.1 cliente1.local, cliente2.local
   - Intenta acceder desde diferentes subdominios
   - Verifica que cada uno accede solo a sus datos

### Variables de Entorno Necesarias

Asegúrate de tener en `.env`:

```
JWT_SECRET=tu_clave_secreta_aqui
DATABASE_URL=tu_url_de_base_de_datos
PORT=3000
```

### Archivos Nuevos Agregados

```
Back/src/middleware/
  ├── authMiddleware.js              (Validación de JWT)
  ├── subdomainMiddleware.js         (Detección de subdominio)
  └── validateSubdomainMiddleware.js (Validación de subdominio)

Back/src/services/auth/PUT/
  └── updateAdminProfile.service.js  (Actualización de perfil)

Back/src/controller/auth/
  └── auth.profile.controller.js     (Controlador de perfil)
```

### Cambios en Archivos Existentes

- ✅ Todos los modelos: Agregado `adminId`
- ✅ `app.js`: Agregados middlewares globales
- ✅ `auth.routes.js`: Agregada ruta PUT para perfil
- ✅ `server.js`: Notas sobre migración
- ✅ Index.model.js: Agregadas relaciones con Admin
- ✅ Todos los servicios: Filtrado por adminId
- ✅ Todos los controladores: Pasando adminId a servicios

### Consideraciones de Producción

1. **Rate Limiting**: Agrega límites de rate para prevenir ataques de fuerza bruta
2. **HTTPS**: Usa HTTPS en producción (especialmente importante con JWT)
3. **CORS**: Configura CORS de manera restrictiva para dominios específicos
4. **Logs de Auditoría**: Considera agregar logs de auditoría para cambios de datos
5. **Backups**: Implementa backups automáticos

### 6. **Configuración de UI Independiente por Cliente**

Además del aislamiento de datos, la **UI también está aislada por cliente**:

- Cada cliente recibe su **propia compilación** de la app con sus colores personalizados
- Cliente A puede tener app ROSA, Cliente B puede tener app AZUL
- Los cambios de UI de un cliente **NO afectan** a otros clientes

**Archivo de Configuración:** `Front/src/config/clientConfig.js`

```javascript
const CLIENT_CONFIG = {
  clientName: "Nombre del Cliente",

  theme: {
    light: {
      primaryColor: "#3b82f6", // Color único por cliente
      secondaryColor: "#10b981",
      accentColor: "#f59e0b",
      // ... más colores
    },
    dark: {
      // ... colores para dark mode
    },
  },

  features: {
    allowThemeToggle: true, // Puede cambiar light/dark
    allowCustomization: false, // NO puede cambiar colores
  },
};
```

**Flujo de Entrega:**

1. Cliente pide: "Quiero mi app ROSA"
2. Editar `clientConfig.js` → `primaryColor: "#ec4899"`
3. Ejecutar: `npm run build`
4. Entregar contenido de `dist/` al cliente
5. **Resultado:** Su app es ROSA, otros clientes siguen con sus colores

Ver: [CLIENT_CONFIGURATION_GUIDE.md](CLIENT_CONFIGURATION_GUIDE.md)

---

### Próximas Mejoras Recomendadas

1. **Plan de Suscripción**: Implementar diferentes tiers de acceso
2. **Límites por Cliente**: Máximo de inquilinos, locales, etc. según el plan
3. **Logs de Actividad**: Rastrear qué usuario hizo qué
4. **2FA**: Autenticación de dos factores
5. **Invitaciones de Usuario**: Permitir múltiples usuarios por cliente

---

¡Tu aplicación ahora es un SaaS multi-tenant! 🎉
