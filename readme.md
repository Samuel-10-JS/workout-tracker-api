# Workout Tracker API

API RESTful desarrollada con Node.js y Express para gestionar usuarios, rutinas, ejercicios y registros de progreso en el sistema Workout Tracker.

## 🚀 Endpoints del Módulo de Usuarios (`/api/v1/users`)

| Método | Endpoint | Descripción | Restricción / Estado |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/users` | Listar todos los usuarios (Soporta query string `?search=nombre`) | Público / 200 OK |
| **GET** | `/api/v1/users/:id` | Obtener un usuario específico por su ID | Público / 200 OK o 404 Not Found |
| **POST** | `/api/v1/users` | Registrar un nuevo usuario en el sistema | Público / 201 Created o 400 Bad Request |
| **PUT** | `/api/v1/users/:id` | Actualización integral de un usuario | Público / 200 OK, 400 Bad Request o 404 Not Found |
| **PATCH** | `/api/v1/users/:id` | Actualización parcial de un usuario | Público / 200 OK o 404 Not Found |
| **DELETE** | `/api/v1/users/:id` | Eliminar un usuario del sistema | Público / 204 No Content o 404 Not Found |

## 🏋️ Endpoints del Módulo de Ejercicios (`/api/v1/exercises`)

| Método | Endpoint | Descripción | Restricción / Estado |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/exercises` | Obtener la lista completa de ejercicios (Filtros: `?category=` y `?muscleGroup=`) | Privada (JWT) / 200 OK |
| **GET** | `/api/v1/exercises/:id` | Obtener un ejercicio específico por su ID | Privada (JWT) / 200 OK o 404 Not Found |
| **POST** | `/api/v1/exercises/seed` | Poblar masivamente la base de datos con el catálogo inicial | Privada (Admin) / 201 Created |
| **POST** | `/api/v1/exercises` | Crear un nuevo ejercicio en el catálogo maestro | Privada (Admin) / 201 Created o 400 Bad Request |
| **PUT** | `/api/v1/exercises/:id` | Actualizar completamente un ejercicio | Privada (Admin) / 200 OK o 404 Not Found |
| **PATCH** | `/api/v1/exercises/:id` | Actualización parcial de un ejercicio | Privada (Admin) / 200 OK o 404 Not Found |
| **DELETE** | `/api/v1/exercises/:id` | Eliminar un ejercicio del catálogo | Privada (Admin) / 204 No Content o 404 Not Found |

## 🛠️ Tecnologías Utilizadas
- **Node.js**
- **Express 5**
- **Dotenv**
- **MySQL2**
