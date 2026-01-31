# Sistema de Registro de Inquilinos

Este proyecto es una aplicación web completa para la gestión de alquileres, inquilinos y contratos.

## Tecnologías Utilizadas
- **Backend**: Node.js, Express, Sequelize (PostgreSQL), Multer.
- **Frontend**: React, Vite.

## Estructura del Proyecto

### Backend (`/Back`)
El servidor corre en el puerto `30`.
- **Controladores y Servicios**: Separados por Entidad y Método HTTP (GET, POST, PUT, DELETE).
- **Modelos**:
    - `Admin`: Usuario administrador.
    - `Inquilino`: Datos personales (DNI manual).
    - `Local`: Propiedades (incluye Id, Fotos, Tipo y Observaciones).
    - `Contrato`: Vincula Inquilinos y Locales (incluye Valor, Fechas de Ingreso/Aumento/Vencimiento y PDF de cláusulas).
    - `Foto`: Imágenes asociadas a los locales.
- **Archivos Estáticos**: Las fotos y PDFs se guardan en `public/uploads`.

### Frontend (`/Front`)
La aplicación cliente creada con Vite.
- **Login/Registro**: Autenticación para el administrador.
- **Panel de Administración (Dashboard)**:
    - Gestión de **Inquilinos**.
    - Gestión de **Locales** (Carga de múltiples fotos).
    - Gestión de **Contratos** (Selección de inquilino/local y subida de PDF).
- **Vista Pública**: Consulta de contratos por DNI de inquilino.

## Instalación y Ejecución

### Requisitos Previos
- Node.js instalado.
- PostgreSQL en ejecución.
- Configurar base de datos en `Back/db/conectionDB.js` o variables de entorno.

### Pasos
1.  **Backend**:
    ```bash
    cd Back
    npm install
    npm start
    ```
    *Nota: Si es la primera vez, asegúrate de que la DB se sincronice (`force: true` si cambiaste a UUID).*

2.  **Frontend**:
    ```bash
    cd Front
    npm install
    npm run dev
    ```

3.  **Uso**:
    - Abrir navegador en la URL que indique Vite (ej. `http://localhost:5173`).
    - Registrar un admin en `/register`.
    - Ingresar al Dashboard y comenzar a cargar datos.

## Características Destacadas
- **UUIDs**: Todos los identificadores son universales (UUID).
- **Archivos**: Soporte para subir **PDFs** en contratos y **Fotos** (múltiples) en locales.
- **Relaciones**: Los contratos vinculan automáticamente Inquilinos y Locales existentes.