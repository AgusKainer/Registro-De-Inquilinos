# Sistema de Registro de Inquilinos

Este proyecto es una aplicación web completa para la gestión de alquileres, inquilinos y contratos.

**✨ Actualización**: Sistema ahora es **multi-tenant** - cada cliente tiene sus propios datos aislados.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express, Sequelize (PostgreSQL), Multer, JWT.
- **Frontend**: React, Vite.

## Estructura del Proyecto

### Backend (`/Back`)

El servidor corre en el puerto `3000` (configurable).

- **Controladores y Servicios**: Separados por Entidad y Método HTTP (GET, POST, PUT, DELETE).
- **Modelos**:
  - `Admin`: Usuario administrador (cliente). Ahora incluye empresa, email, teléfono, dominio y subdominio.
  - `Inquilino`: Datos personales (DNI manual) - aislado por cliente.
  - `Local`: Propiedades (incluye Id, Fotos, Tipo y Observaciones) - aislado por cliente.
  - `Contrato`: Vincula Inquilinos y Locales (incluye Valor, Fechas) - aislado por cliente.
  - `Foto`: Imágenes asociadas a locales - aislado por cliente.
  - `Reparacion`: Registro de reparaciones - aislado por cliente.
  - `Renovacion`: Renovación de contratos - aislado por cliente.
- **Archivos Estáticos**: Las fotos y PDFs se guardan en `public/uploads`.
- **Seguridad Multi-Tenant**:
  - Autenticación JWT: cada solicitud valida el token
  - Aislamiento de datos: cada cliente solo ve sus propios datos
  - Validación de subdominio: soporte para dominios por cliente

### Frontend (`/Front`)

La aplicación cliente creada con Vite.

- **Login/Registro**: Autenticación para administradores.
- **Panel de Administración (Dashboard)**:
  - Gestión de **Inquilinos** (aislados por cliente).
  - Gestión de **Locales** (Carga de múltiples fotos, aislado por cliente).
  - Gestión de **Contratos** (aislado por cliente).
  - Gestión de **Reparaciones** (aislado por cliente).
- **Vista Pública**: Consulta de contratos por DNI de inquilino.

## Instalación y Ejecución

### Requisitos Previos

- Node.js v14+ instalado.
- PostgreSQL en ejecución.
- Configurar variables de entorno (ver `.env.example`).

### Configuración de Base de Datos

Si es la **PRIMERA VEZ**, cambiar en `Back/src/server.js`:

```javascript
await db.sync({ force: true }); // Cambiar a true solo la primera vez
```

Después, cambiar nuevamente a:

```javascript
await db.sync({ force: false }); // Uso normal
```

### Pasos

1.  **Backend**:

    ```bash
    cd Back
    npm install
    npm start
    ```

2.  **Frontend** (en otra terminal):

    ```bash
    cd Front
    npm install
    npm run dev
    ```

3.  **Uso**:
    - Abrir navegador en la URL que indique Vite (ej. `http://localhost:5173`).
    - Registrar un admin en `/register` (crea un nuevo cliente).
    - Ingresar al Dashboard y comenzar a cargar datos.
    - Los datos de cada cliente están completamente aislados.

## Características Destacadas

- **🔐 Multi-Tenant**: Cada cliente tiene sus propios datos aislados. Los cambios de un cliente NO afectan a otros.
- **🆔 UUIDs**: Todos los identificadores son universales (UUID).
- **📁 Archivos**: Soporte para subir **PDFs** en contratos y **Fotos** (múltiples) en locales.
- **🔗 Relaciones**: Los contratos vinculan automáticamente Inquilinos y Locales existentes.
- **🔑 Autenticación JWT**: Token-based security con expiración automática.
- **🌐 Subdominios**: Soporte para dominios personalizados por cliente (ej: cliente.tuapp.com).
- **👤 Perfil del Cliente**: Cada admin puede actualizar su información empresarial.

## Arquitectura Multi-Tenant

El sistema implementa una arquitectura **multi-tenant SaaS** donde:

- **Cada cliente (Admin) tiene sus propios datos** completamente aislados
- **Las consultas filtran automáticamente por adminId** para cada usuario
- **El DNS/subdominio puede apuntar a diferentes clientes** (opcional)
- **Los datos de un cliente NUNCA se mezclan con otro cliente**

### Ejemplo de Flujo Multi-Tenant:

```
Cliente A registra:
- 10 inquilinos
- 5 locales
- 3 contratos

Cliente B registra:
- 8 inquilinos
- 4 locales
- 2 contratos

Cuando Cliente A hace login:
- VE: Sus 10 inquilinos, 5 locales, 3 contratos
- NO VE: Los datos de Cliente B

Cuando Cliente B hace login:
- VE: Sus 8 inquilinos, 4 locales, 2 contratos
- NO VE: Los datos de Cliente A
```

## Nuevas Rutas de Autenticación

### Registro

```
POST /alquileres/auth/register
Content-Type: application/json

{
  "username": "admin@empresa.com",
  "password": "contraseña123"
}
```

### Login

```
POST /alquileres/auth/login
Content-Type: application/json

{
  "username": "admin@empresa.com",
  "password": "contraseña123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "admin@empresa.com",
    "nombreEmpresa": null,
    "email": null,
    "dominio": null,
    "subdominio": null
  }
}
```

### Actualizar Perfil (requiere token)

```
PUT /alquileres/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombreEmpresa": "Mi empresa",
  "email": "contacto@miempresa.com",
  "telefono": "+1234567890",
  "dominio": "miempresa.com",
  "subdominio": "miempresa"
}
```

## Estructura de Base de Datos

Todas las tablas ahora incluyen `adminId` para aislamiento multi-tenant:

```
Admin (id, username, password, nombreEmpresa, email, telefono, dominio, subdominio)
├── Inquilino (id, adminId, dni, nombre, telefono)
├── Local (id, adminId, tipo, direccion, observaciones)
│   └── Foto (id, adminId, localId, url, descripcion)
├── Contrato (id, adminId, inquilinoId, localId, fechas, valor)
│   ├── Reparacion (id, adminId, contratoId, descripcion, estado)
│   └── Renovacion (id, adminId, contratoId, nuevoValor, fechas)
└── Reparacion (id, adminId, contratoId, descripcion, estado)
```

## Variables de Entorno

Crear archivo `.env` en `Back/`:

```
PORT=3000
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
DB_HOST=localhost
DB_PORT=5432
DB_NAME=inquilinos_db
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
```

## Documentación Completa

Para más detalles sobre la arquitectura multi-tenant, ver [MULTI_TENANT_GUIDE.md](./MULTI_TENANT_GUIDE.md)

## Licencia

MIT
