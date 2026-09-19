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

## 📅 Endpoints del Módulo de Entrenamientos (`/api/v1/workouts`)

| Método | Endpoint | Descripción | Restricción / Estado |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/workouts` | Listar entrenamientos (Filtros: `?status=`, `?sort=scheduledDate:asc`, `?page=1&limit=10`) | Privada (Propietario) / 200 OK |
| **GET** | `/api/v1/workouts/:id` | Consultar un entrenamiento con sus ejercicios | Privada (Propietario) / 200 OK o 404 Not Found |
| **POST** | `/api/v1/workouts` | Crear un plan de entrenamiento con fecha, hora y ejercicios | Privada (Propietario) / 201 Created o 400 Bad Request |
| **PUT** | `/api/v1/workouts/:id` | Actualizar completamente un plan de entrenamiento | Privada (Propietario) / 200 OK o 404 Not Found |
| **PATCH** | `/api/v1/workouts/:id` | Actualización parcial (comentarios, estado, horario) | Privada (Propietario) / 200 OK o 404 Not Found |
| **DELETE** | `/api/v1/workouts/:id` | Eliminar un plan de entrenamiento | Privada (Propietario) / 204 No Content o 404 Not Found |
| **POST** | `/api/v1/workouts/:id/exercises` | Agregar un ejercicio puntual a un entrenamiento existente | Privada (Propietario) / 201 Created o 404 Not Found |
| **DELETE** | `/api/v1/workouts/:id/exercises/:exerciseItemId` | Eliminar un ejercicio puntual de la rutina | Privada (Propietario) / 204 No Content o 404 Not Found |

## 📊 Endpoints del Módulo de Informes y Progreso (`/api/v1/reports`)

| Método | Endpoint | Descripción | Restricción / Estado |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/reports/progress` | Generar informe consolidado analítico (Filtros: `?from=YYYY-MM-DD&to=YYYY-MM-DD`) | Privada (Propietario) / 200 OK |
| **GET** | `/api/v1/reports` | Listar reportes generados guardados | Privada (Propietario) / 200 OK |
| **GET** | `/api/v1/reports/:id` | Consultar un reporte consolidado específico por ID | Privada (Propietario) / 200 OK o 404 Not Found |
| **POST** | `/api/v1/reports` | Guardar / Registrar un nuevo reporte consolidado | Privada (Propietario) / 201 Created o 400 Bad Request |
| **PUT** | `/api/v1/reports/:id` | Actualizar completamente un reporte existente | Privada (Propietario) / 200 OK o 404 Not Found |
| **PATCH** | `/api/v1/reports/:id` | Actualización parcial de notas o fechas del reporte | Privada (Propietario) / 200 OK o 404 Not Found |
| **DELETE** | `/api/v1/reports/:id` | Eliminar un reporte | Privada (Propietario) / 204 No Content o 404 Not Found |

## 🛠️ Tecnologías Utilizadas
- **Node.js**
- **Express 5**
- **Dotenv**
- **MySQL2**
