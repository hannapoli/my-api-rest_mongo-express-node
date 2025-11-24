# API REST de Servicios con Node, Express y MongoDB (Mongoose)

En este proyecto se crea una API REST que gestione una colección de **Servicios**.

Está desarrollada con Node.js, Express y MongoDB Atlas mediante Mongoose.
El proyecto está despliegado en [Render]().

## Realiza las operaciones CRUD:

- Crear un servicio.
- Obtener todos los servicios.
- Obtener un servicio por su ID.
- Actualizar un servicio.
- Eliminar un servicio.

## Cada servicio tentiene un esquema básico:
``` JavaScript
{
  nombre: {
          type: String,
          require: true,
          unique: true
          },
  descripcion: String,
  precio: Number
}
```
## Características principales:

### Backend
- Node.js
- Express
- Mongoose
- Uso de rutas y controladores
- Operaciones CRUD completas
- Uso de JSON como formato de intercambio de datos
- Manejo básico de errores `try/catch`

### Base de datos
MongoDB Atlas (conexión desde Mongoose).

### Despliegue
La API está funcionando desde Render.

## Instalación y uso:

### 1. Clonar el repositiorio

``` bash
git clone git@github.com:hannapoli/my-api-rest_mongo-express-node.git
cd my-api-rest_mongo-express-node
```

### 2. Instalar las dependencias

Para instalar todas las dependencias de este proyecto:

```bash
npm install
```

Se han instalado los siguientes paquetes de npm:

- [express](https://www.npmjs.com/package/express) 
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [ejs](https://www.npmjs.com/package/ejs)

Para el proceso de desarrollo se utiliza el paquete [nodemon](https://www.npmjs.com/package/nodemon).

### 3. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las variables del archivo .env.template:

``` JavaScript
PORT=<port>
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/servicios
```

### 4. Iniciar el servidor en local

Modo normal:
```bash
npm run start
```

Modo desarrollo (con nodemon):
```bash
npm run dev
```

## Endpoints

Base URL local:

```bash
https://my-api-rest-mongo-express-node.onrender.com/api/v1/servicios
```
### 1. Crear un servicio

**POST** `/api/v1/servicios/crear`

Body:
```json
{
  "nombre": "Mantenimiento de equipos",
  "descripcion": "Revisión completa del sistema",
  "precio": 120
}
```

Respuesta (201 CREATED):
```json
{
  "ok":true,
  "message": "Servicio creado correctamente",
  "data": {
    "_id": "678ac15b2a48a4f6c3cc1234",
    "nombre": "Mantenimiento de equipos",
    "descripcion": "Revisión completa del sistema",
    "precio": 120,
    "__v": 0
  }
}
```

### 2. Obtener todos los servicios

**GET** `/api/v1/servicios`

Respuesta (200 OK):
```json
{
  "ok":true,
  "message": "Lista de servicios",
  "data": [
    {
      "_id": "678ac15b2a48a4f6c3cc1234",
      "etc.": "..."
    },
    {
      "_id": "678ac1f62a48a4f6c3cc5678",
      "etc.": "..."
    }
  ]
}
```

### 3. Obtener un servicio por ID

**GET** `/api/v1/servicios/:id`

Respuesta (200 OK):
```json
{
  "ok":true,
  "message": "Servicio encontrado",
  "etc.": "..."
}
```
Si el ID no existe (404 NOT FOUND):
```json
{
  "ok":false,
  "message": "Servicio no encontrado"
}
```

### 4. Actualizar un servicio

**PUT** `/api/v1/servicios/:id`

Body:
```json
{
  "precio": 150
}
```
Respuesta (200 OK):
```json
{
  "ok":true,
  "message": "Servicio actualizado correctamente",
  "data": {
    "_id": "678ac15b2a48a4f6c3cc1234",
    "etc.": "...",
    "precio": 150,
    "__v": 0
  }
}
```
Si el ID no existe (404 NOT FOUND):
```json
{
  "ok":false,
  "message": "Servicio no encontrado"
}
```

### 5. Eliminar un servicio

**DELETE** `/api/v1/servicios/:id`

Respuesta (200 OK):
```json
{
  "ok":true,
  "message": "Servicio eliminado correctamente"
}
```
Si el ID no existe (404 NOT FOUND):
``` json
{
  "ok":false,
  "message": "Servicio no encontrado"
}
```