# Workout Tracker API

API RESTful desarrollada con Node.js y Express para gestionar usuarios, rutinas, ejercicios y registros de progreso en el sistema Workout Tracker.

## 🔐 Endpoints del Módulo de Autenticación (`/api/v1/auth`)

| Método | Endpoint | Descripción | Restricción / Estado |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/auth/register` | Registrar una nueva cuenta de usuario en el sistema | Pública / 201 Created o 400 Bad Request |
| **POST** | `/api/v1/auth/login` | Autenticar credenciales y generar el token JWT de acceso | Pública / 200 OK o 401 Unauthorized |
| **GET** | `/api/v1/auth/me` | Consultar los datos de perfil del usuario en sesión | Privada (JWT) / 200 OK |

### 📝 Ejemplos de Autenticación

#### Registrar Usuario (`POST /api/v1/auth/register`)
- **Request Body (JSON):**
```json
{
  "fullName": "Alejandro Gómez",
  "email": "alejandro.gomez@example.com",
  "password": "PasswordSeguro123"
}
```
- **Response (201 Created):**
```json
{
  "id": "e9a0c72f-682b-4fa8-bf29-3796590efb22",
  "fullName": "Alejandro Gómez",
  "email": "alejandro.gomez@example.com",
  "createdAt": "2026-09-20T19:40:00.000Z"
}
```

#### Iniciar Sesión (`POST /api/v1/auth/login`)
- **Request Body (JSON):**
```json
{
  "email": "alejandro.gomez@example.com",
  "password": "PasswordSeguro123"
}
```
- **Response (200 OK):**
```json
{
  "status": 200,
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlOWEwYzcyZi02ODJiLTRmYTgtYmYyOS0zNzk2NTkwZWZiMjIiLCJlbWFpbCI6ImFsZWphbmRyby5nb21lekBleGFtcGxlLmNvbSJ9.workoutTrackerSignature",
  "user": {
    "id": "e9a0c72f-682b-4fa8-bf29-3796590efb22",
    "fullName": "Alejandro Gómez",
    "email": "alejandro.gomez@example.com",
    "createdAt": "2026-09-20T19:40:00.000Z"
  }
}
```

---

## 🚀 Endpoints del Módulo de Usuarios (`/api/v1/users`)

| Método | Endpoint | Descripción | Restricción / Estado |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/users` | Listar todos los usuarios (Soporta query string `?search=nombre`) | Público / 200 OK |
| **GET** | `/api/v1/users/:id` | Obtener un usuario específico por su ID | Público / 200 OK o 404 Not Found |
| **POST** | `/api/v1/users` | Registrar un nuevo usuario en el sistema | Público / 201 Created o 400 Bad Request |
| **PUT** | `/api/v1/users/:id` | Actualización integral de un usuario | Público / 200 OK, 400 Bad Request o 404 Not Found |
| **PATCH** | `/api/v1/users/:id` | Actualización parcial de un usuario | Público / 200 OK o 404 Not Found |
| **DELETE** | `/api/v1/users/:id` | Eliminar un usuario del sistema | Público / 204 No Content o 404 Not Found |

### 📝 Ejemplos de Usuarios

#### Listar Usuarios (`GET /api/v1/users`)
- **Response (200 OK):**
```json
[
  {
    "id": "7b55f190-3b6d-4952-9b21-4f80879f9021",
    "fullName": "Carlos Rodríguez",
    "email": "carlos.rodriguez@example.com",
    "createdAt": "2026-09-12T08:30:00.000Z"
  }
]
```

---

## 🏋️ Endpoints del Módulo de Ejercicios (`/api/v1/exercises`)

| Método | Endpoint | Descripción | Restricción / Estado |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/exercises/seed` | Poblar masivamente la base de datos con el catálogo inicial (Seeder) | Privada (Admin) / 201 Created |
| **GET** | `/api/v1/exercises` | Obtener la lista completa de ejercicios (Filtros: `?category=` y `?muscleGroup=`) | Privada (JWT) / 200 OK |
| **GET** | `/api/v1/exercises/:id` | Obtener un ejercicio específico por su ID | Privada (JWT) / 200 OK o 404 Not Found |
| **POST** | `/api/v1/exercises` | Crear un nuevo ejercicio en el catálogo maestro | Privada (Admin) / 201 Created o 400 Bad Request |
| **PUT** | `/api/v1/exercises/:id` | Actualizar completamente un ejercicio | Privada (Admin) / 200 OK o 404 Not Found |
| **PATCH** | `/api/v1/exercises/:id` | Actualización parcial de un ejercicio | Privada (Admin) / 200 OK o 404 Not Found |
| **DELETE** | `/api/v1/exercises/:id` | Eliminar un ejercicio del catálogo | Privada (Admin) / 204 No Content o 404 Not Found |

### 📝 Ejemplos de Ejercicios

#### Sembrar Ejercicios (`POST /api/v1/exercises/seed`)
- **Response (201 Created):**
```json
{
  "status": 201,
  "message": "Catálogo maestro de ejercicios sembrado exitosamente",
  "count": 4,
  "data": [
    {
      "id": 1,
      "name": "Press de Banca Plano con Barra",
      "description": "Acostado sobre un banco plano, descender la barra olímpica de forma controlada...",
      "category": "fuerza",
      "muscleGroup": "pecho"
    }
  ]
}
```

---

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

### 📝 Ejemplos de Entrenamientos

#### Crear Entrenamiento (`POST /api/v1/workouts`)
- **Request Body (JSON):**
```json
{
  "userId": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "title": "Rutina Pierna",
  "scheduledDate": "2026-09-22",
  "scheduledTime": "07:00",
  "exercises": [
    {
      "exerciseId": 2,
      "sets": 4,
      "reps": 10,
      "weightKg": 100.0
    }
  ]
}
```
- **Response (201 Created):**
```json
{
  "id": "e2c34d88-7512-4c91-9e8a-7e618e47b310",
  "userId": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "title": "Rutina Pierna",
  "scheduledDate": "2026-09-22",
  "scheduledTime": "07:00",
  "status": "pendiente",
  "exercises": [
    {
      "id": "3c011e40-128a-4db5-94f1-111111111111",
      "exerciseId": 2,
      "exerciseName": "Sentadilla Trasera con Barra",
      "muscleGroup": "piernas",
      "order": 1,
      "sets": 4,
      "reps": 10,
      "weightKg": 100
    }
  ],
  "createdAt": "2026-09-20T19:42:00.000Z",
  "updatedAt": "2026-09-20T19:42:00.000Z"
}
```

---

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

### 📝 Ejemplos de Reportes e Informes

#### Generar Reporte de Progreso (`GET /api/v1/reports/progress?from=2026-09-01&to=2026-09-30`)
- **Response (200 OK):**
```json
{
  "reportPeriod": {
    "from": "2026-09-01",
    "to": "2026-09-30"
  },
  "summary": {
    "totalWorkoutsScheduled": 1,
    "completedWorkouts": 0,
    "pendingWorkouts": 1,
    "completionRate": "0.0%",
    "totalTonnageLiftedKg": 4000
  },
  "progressByMuscleGroup": [
    {
      "muscleGroup": "piernas",
      "sessionsCount": 1,
      "accumulatedKg": 4000
    }
  ]
}
```

---

## 🚨 Respuestas de Error Estándar (RFC 7807)

Cuando ocurre un error (por ejemplo, buscar un usuario que no existe):
- **GET /api/v1/users/id-falso**
- **Response (404 Not Found):**
```json
{
  "status": 404,
  "error": "Not Found",
  "message": "No se encontró ningún usuario con el id: id-falso",
  "path": "/api/v1/users/id-falso",
  "timestamp": "2026-09-20T19:45:00.000Z"
}
```

---

## 🛠️ Tecnologías Utilizadas
- **Node.js**
- **Express 5**
- **Dotenv**
- **MySQL2**
