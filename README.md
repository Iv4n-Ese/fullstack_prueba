PROYECTO 

Objetivo: Crear una pequeña aplicacion Fullstack que permita registar, autenticar y gestionar tareas para un usuario

Documento de Instalaciones y Tecnologías Usadas
1. Lenguajes y Frameworks
Backend
Node.js v18+: Entorno de ejecución de JavaScript para backend.

Express.js: Framework web para crear API REST.

JWT (jsonwebtoken): Para autenticación y autorización basada en tokens.

bcrypt: Para hashear contraseñas.

mysql2: Cliente para conectar con base de datos MySQL.

Frontend
Angular 18: Framework frontend SPA basado en TypeScript.

RxJS: Para programación reactiva (incluido en Angular).

Angular Router: Para manejo de rutas y navegación.

HttpClient: Para comunicación con API REST.

ReactiveFormsModule: Para formularios reactivos y validaciones.

2. Base de Datos
MySQL 8.x: Sistema gestor de base de datos relacional.

Se creó una base llamada todo_app con dos tablas principales:

users para almacenar usuarios con contraseña hasheada.

tasks para almacenar las tareas asociadas a cada usuario.

3. Herramientas y Utilidades
npm: Gestor de paquetes para Node.js y Angular.

nodemon: Para desarrollo backend con recarga automática.

Angular CLI: Para crear, construir y servir la aplicación Angular.

VSCode (opcional): Editor recomendado para desarrollo.

4. Configuración y Variables de Entorno
Archivo .env para backend con variables sensibles (credenciales MySQL, secret JWT).

Archivo src/environments/environment.ts para Angular con URL base del API.

5. Estructura General del Proyecto
pgsql
Copiar
Editar
fullstack_prueba/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   ├── core/
│   │   │   ├── tasks/
│   │   │   ├── app-routing.module.ts
│   │   │   └── app.module.ts
│   │   └── environments/
│   ├── package.json
│   └── README.md
└── schema.sql
