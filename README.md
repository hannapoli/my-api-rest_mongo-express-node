# API REST de Servicios con Node, Express y MongoDB

Esta API REST permite gestionar **Servicios** y **Usuarios**, incluyendo autenticación mediante JSON Web Token, autorización por roles, validación de entradas y manejo centralizado de errores.

Está desarrollada con Node.js, Express y MongoDB Atlas mediante Mongoose.
El proyecto está despliegado en [Render](https://my-api-rest-mongo-express-node.onrender.com/).

## Realiza las operaciones CRUD:

- Crear un servicio.
- Obtener todos los servicios.
- Obtener un servicio por su ID.
- Actualizar un servicio por su ID.
- Eliminar un servicio por su ID.

## Características principales:

### Backend
- Node.js
- Express
- Mongoose para conexión con MongoDB Atlas
- Uso de JSON como formato de intercambio de datos
- Uso de rutas y controladores separados
- Operaciones CRUD para Servicios
- Registro y login de Usuarios
- Autenticación JWT y autorización por roles 
- Validación de entradas con express-validator
- Middleware centralizado de manejo de errores

### Base de datos
- MongoDB Atlas (conexión desde Mongoose)
- Modelos: Servicio y User

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
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [ejs](https://www.npmjs.com/package/ejs)

Para el proceso de desarrollo se utiliza el paquete [nodemon](https://www.npmjs.com/package/nodemon).

### 3. Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las variables del archivo .env.template:

``` JavaScript
PORT=<port>
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/servicios
SECRET_KEY=<llaveSecreta>
```

### 4. Iniciar el servidor en local

Modo normal:
```bash
npm start
```

Modo desarrollo (con nodemon):
```bash
npm run dev
```

## URI base:

```bash
https://my-api-rest-mongo-express-node.onrender.com/api/v1
```

## Autenticación y Usuarios `/auth`

### 1. Registro de usuario

**POST** `/new`

Body:
```json
{
  "name": "Nombre",
  "email": "correo@electronico.com",
  "password": "cL@ve123"
}
```

Respuesta (201 CREATED):
```json
{
  "ok":true,
  "message": "Usuario creado correctamente",
  "user": {"name": "...", "email": "...", "password": "...", "role": "...", "_id": "..." },
  "token": "..."
}
```

### 2. Login

**POST** `/`

Body:
```json
{
  "email": "correo@electronico.com",
  "password": "cL@ve123"
}
```

Respuesta(200 OK)
```json
{
    "ok": true,
    "message": "Login de usuario.",
    "user": {
        "uid": "...",
        "name": "Nombre",
        "email": "correo@electronico.com"
    },
    "token": "..."
}
```

### 3. Middleware de autenticación

Para las rutas protegidas hay que enviar JWT en headers:

`Authorization: Bearer <token>`

### 4. Autorización por rol

Hay tres rutas protegidas a las cuales solo puede acceder el usuario con el rol de 'admin'. Esto se verifica mediante el middleware verifyRole("admin").

## Endpoints de Servicios `/servicios`

### 1. Crear un servicio 

**POST** `/nuevo` (solo admin)

Header:
`Authorization: Bearer <token>`

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

**GET** `/` (pública)

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

**GET** `/:id` (pública)

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

**PUT** `/:id` (solo admin)

Header:
`Authorization: Bearer <token>`

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

**DELETE** `/:id` (solo admin)

Header:
`Authorization: Bearer <token>`

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

## Manejo de errores

La API utiliza un middleware centralizado errorHandler.
Todos los errored responden con formato JSON:

```json
{
  "ok": false,
  "message": "Descripción del error",
  "errors": {}
}
```