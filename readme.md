# Workout Tracker API

API RESTful desarrollada con Node.js y Express para gestionar usuarios, rutinas, ejercicios y registros de progreso en el sistema Workout Tracker.

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

### 📝 Ejemplos de los 5 Métodos HTTP para Usuarios:

#### 1. `GET` /api/v1/users/7b55f190-3b6d-4952-9b21-4f80879f9021
- **Response (200 OK):**
```json
{
  "id": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "fullName": "Carlos Rodríguez",
  "email": "carlos.rodriguez@example.com",
  "createdAt": "2026-09-12T08:30:00.000Z"
}
```

#### 2. `POST` /api/v1/users
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

#### 3. `PUT` /api/v1/users/7b55f190-3b6d-4952-9b21-4f80879f9021
- **Request Body (JSON):**
```json
{
  "fullName": "Carlos Rodríguez Reemplazado",
  "email": "carlos.nuevo@example.com"
}
```
- **Response (200 OK):**
```json
{
  "id": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "fullName": "Carlos Rodríguez Reemplazado",
  "email": "carlos.nuevo@example.com",
  "updatedAt": "2026-09-20T19:50:00.000Z"
}
```

#### 4. `PATCH` /api/v1/users/7b55f190-3b6d-4952-9b21-4f80879f9021
- **Request Body (JSON):**
```json
{
  "fullName": "Carlos Rodríguez Parcial"
}
```
- **Response (200 OK):**
```json
{
  "id": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "fullName": "Carlos Rodríguez Parcial",
  "email": "carlos.rodriguez@example.com",
  "updatedAt": "2026-09-20T19:52:00.000Z"
}
```

#### 5. `DELETE` /api/v1/users/8c66f201-4c7e-5063-ac32-5f90980fa132
- **Response (204 No Content):**
*(Cuerpo vacío)*

---

## 🏋️ Módulo 2: Ejercicios (`/api/v1/exercises`)

| Método | Endpoint | Descripción | Restricción / Estado |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/exercises/seed` | Poblar masivamente la base de datos con el catálogo inicial (Seeder) | Privada (Admin) / 201 Created |
| **GET** | `/api/v1/exercises` | Obtener la lista completa de ejercicios (Filtros: `?category=` y `?muscleGroup=`) | Privada (JWT) / 200 OK |
| **GET** | `/api/v1/exercises/:id` | Obtener un ejercicio específico por su ID | Privada (JWT) / 200 OK o 404 Not Found |
| **POST** | `/api/v1/exercises` | Crear un nuevo ejercicio en el catálogo maestro | Privada (Admin) / 201 Created o 400 Bad Request |
| **PUT** | `/api/v1/exercises/:id` | Actualizar completamente un ejercicio | Privada (Admin) / 200 OK o 404 Not Found |
| **PATCH** | `/api/v1/exercises/:id` | Actualización parcial de un ejercicio | Privada (Admin) / 200 OK o 404 Not Found |
| **DELETE** | `/api/v1/exercises/:id` | Eliminar un ejercicio del catálogo | Privada (Admin) / 204 No Content o 404 Not Found |

### 📝 Ejemplos de los 5 Métodos HTTP para Ejercicios:

#### 1. `GET` /api/v1/exercises/1
- **Response (200 OK):**
```json
{
  "id": 1,
  "name": "Press de Banca Plano con Barra",
  "description": "Acostado sobre un banco plano, descender la barra olímpica de forma controlada...",
  "category": "fuerza",
  "muscleGroup": "pecho"
}
```

#### 2. `POST` /api/v1/exercises
- **Request Body (JSON):**
```json
{
  "name": "Peso Muerto Rumano",
  "description": "Descender la barra manteniendo espalda recta y ligera flexión de rodillas...",
  "category": "fuerza",
  "muscleGroup": "piernas"
}
```
- **Response (201 Created):**
```json
{
  "id": 5,
  "name": "Peso Muerto Rumano",
  "description": "Descender la barra manteniendo espalda recta y ligera flexión de rodillas...",
  "category": "fuerza",
  "muscleGroup": "piernas"
}
```

#### 3. `PUT` /api/v1/exercises/1
- **Request Body (JSON):**
```json
{
  "name": "Press de Banca con Mancuernas",
  "description": "Ejecución con mancuernas en banco plano para mayor rango de movimiento",
  "category": "fuerza",
  "muscleGroup": "pecho"
}
```
- **Response (200 OK):**
```json
{
  "id": 1,
  "name": "Press de Banca con Mancuernas",
  "description": "Ejecución con mancuernas en banco plano para mayor rango de movimiento",
  "category": "fuerza",
  "muscleGroup": "pecho"
}
```

#### 4. `PATCH` /api/v1/exercises/1
- **Request Body (JSON):**
```json
{
  "description": "Nueva descripción modificada parcialmente"
}
```
- **Response (200 OK):**
```json
{
  "id": 1,
  "name": "Press de Banca Plano con Barra",
  "description": "Nueva descripción modificada parcialmente",
  "category": "fuerza",
  "muscleGroup": "pecho"
}
```

#### 5. `DELETE` /api/v1/exercises/4
- **Response (204 No Content):**
*(Cuerpo vacío)*

---

## 📅 Módulo 3: Entrenamientos (`/api/v1/workouts`)

| Método | Endpoint | Descripción | Restricción / Estado |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/workouts` | Listar entrenamientos (Filtros: `?status=`, `?sort=scheduledDate:asc`, `?page=1&limit=10`) | Privada (Propietario) / 200 OK |
| **GET** | `/api/v1/workouts/:id` | Consultar un entrenamiento con sus ejercicios | Privada (Propietario) / 200 OK o 404 Not Found |
| **POST** | `/api/v1/workouts` | Crear un plan de entrenamiento con fecha, hora y ejercicios | Privada (Propietario) / 201 Created o 400 Bad Request |
| **PUT** | `/api/v1/workouts/:id` | Actualizar completamente un plan de entrenamiento | Privada (Propietario) / 200 OK o 404 Not Found |
| **PATCH** | `/api/v1/workouts/:id` | Actualización parcial (comentarios, estado, horario) | Privada (Propietario) / 200 OK o 404 Not Found |
| **DELETE** | `/api/v1/workouts/:id` | Eliminar un plan de entrenamiento | Privada (Propietario) / 204 No Content o 404 Not Found |

### 📝 Ejemplos de los 5 Métodos HTTP para Entrenamientos:

#### 1. `GET` /api/v1/workouts/e2c34d88-7512-4c91-9e8a-7e618e47b310
- **Response (200 OK):**
```json
{
  "id": "e2c34d88-7512-4c91-9e8a-7e618e47b310",
  "userId": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "title": "Rutina de Fuerza - Empuje y Pecho",
  "scheduledDate": "2026-09-15",
  "scheduledTime": "06:30",
  "status": "pendiente",
  "comments": "Mantener retracción escapular estricta en cada serie.",
  "exercises": [
    {
      "id": "3c011e40-128a-4db5-94f1-111111111111",
      "exerciseId": 1,
      "exerciseName": "Press de Banca Plano con Barra",
      "muscleGroup": "pecho",
      "order": 1,
      "sets": 4,
      "reps": 8,
      "weightKg": 80
    }
  ],
  "createdAt": "2026-09-12T09:10:00.000Z",
  "updatedAt": "2026-09-12T09:10:00.000Z"
}
```

#### 2. `POST` /api/v1/workouts
- **Request Body (JSON):**
```json
{
  "userId": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "title": "Rutina de Pierna",
  "scheduledDate": "2026-09-22",
  "scheduledTime": "07:00",
  "exercises": [
    {
      "exerciseId": 2,
      "sets": 4,
      "reps": 10,
      "weightKg": 100
    }
  ]
}
```
- **Response (201 Created):**
```json
{
  "id": "fa80c102-12ba-4b2a-9fb1-271049c0fb12",
  "userId": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "title": "Rutina de Pierna",
  "scheduledDate": "2026-09-22",
  "scheduledTime": "07:00",
  "status": "pendiente",
  "exercises": [
    {
      "id": "9b1c72f1-68be-4cb8-8f2a-379efba1922c",
      "exerciseId": 2,
      "exerciseName": "Sentadilla Trasera con Barra",
      "muscleGroup": "piernas",
      "order": 1,
      "sets": 4,
      "reps": 10,
      "weightKg": 100
    }
  ],
  "createdAt": "2026-09-20T19:40:00.000Z",
  "updatedAt": "2026-09-20T19:40:00.000Z"
}
```

#### 3. `PUT` /api/v1/workouts/e2c34d88-7512-4c91-9e8a-7e618e47b310
- **Request Body (JSON):**
```json
{
  "userId": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "title": "Rutina de Empuje Reemplazada",
  "scheduledDate": "2026-09-25",
  "scheduledTime": "08:00",
  "status": "pendiente"
}
```
- **Response (200 OK):**
```json
{
  "id": "e2c34d88-7512-4c91-9e8a-7e618e47b310",
  "userId": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "title": "Rutina de Empuje Reemplazada",
  "scheduledDate": "2026-09-25",
  "scheduledTime": "08:00",
  "status": "pendiente",
  "updatedAt": "2026-09-20T19:55:00.000Z"
}
```

#### 4. `PATCH` /api/v1/workouts/e2c34d88-7512-4c91-9e8a-7e618e47b310
- **Request Body (JSON):**
```json
{
  "status": "completado",
  "comments": "Rutina ejecutada al 100%"
}
```
- **Response (200 OK):**
```json
{
  "id": "e2c34d88-7512-4c91-9e8a-7e618e47b310",
  "status": "completado",
  "comments": "Rutina ejecutada al 100%",
  "updatedAt": "2026-09-20T19:56:00.000Z"
}
```

#### 5. `DELETE` /api/v1/workouts/e2c34d88-7512-4c91-9e8a-7e618e47b310
- **Response (204 No Content):**
*(Cuerpo vacío)*

---

## 📊 Módulo 4: Informes y Progreso (`/api/v1/reports`)

| Método | Endpoint | Descripción | Restricción / Estado |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/reports/progress` | Generar informe consolidado analítico (Filtros: `?from=YYYY-MM-DD&to=YYYY-MM-DD`) | Privada (Propietario) / 200 OK |
| **GET** | `/api/v1/reports` | Listar reportes generados guardados | Privada (Propietario) / 200 OK |
| **GET** | `/api/v1/reports/:id` | Consultar un reporte consolidado específico por ID | Privada (Propietario) / 200 OK o 404 Not Found |
| **POST** | `/api/v1/reports` | Guardar / Registrar un nuevo reporte consolidado | Privada (Propietario) / 201 Created o 400 Bad Request |
| **PUT** | `/api/v1/reports/:id` | Actualizar completamente un reporte existente | Privada (Propietario) / 200 OK o 404 Not Found |
| **PATCH** | `/api/v1/reports/:id` | Actualización parcial de notas o fechas del reporte | Privada (Propietario) / 200 OK o 404 Not Found |
| **DELETE** | `/api/v1/reports/:id` | Eliminar un reporte | Privada (Propietario) / 204 No Content o 404 Not Found |

### 📝 Ejemplos de los 5 Métodos HTTP para Informes y Progreso:

#### 1. `GET` /api/v1/reports/progress?from=2026-09-01&to=2026-09-30
- **Response (200 OK):**
```json
{
  "reportPeriod": {
    "from": "2026-09-01",
    "to": "2026-09-30"
  },
  "summary": {
    "totalWorkoutsScheduled": 12,
    "completedWorkouts": 11,
    "pendingWorkouts": 1,
    "completionRate": "91.6%",
    "totalTonnageLiftedKg": 18450.0
  },
  "progressByMuscleGroup": [
    { "muscleGroup": "pecho", "sessionsCount": 8, "accumulatedKg": 7200.0 },
    { "muscleGroup": "espalda", "sessionsCount": 7, "accumulatedKg": 6800.0 }
  ]
}
```

#### 2. `POST` /api/v1/reports
- **Request Body (JSON):**
```json
{
  "userId": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "from": "2026-09-01",
  "to": "2026-09-30",
  "notes": "Consolidado mensual de Septiembre"
}
```
- **Response (201 Created):**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "userId": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "reportPeriod": { "from": "2026-09-01", "to": "2026-09-30" },
  "notes": "Consolidado mensual de Septiembre",
  "summary": {
    "totalWorkoutsScheduled": 10,
    "completedWorkouts": 9,
    "pendingWorkouts": 1,
    "completionRate": "90.0%",
    "totalTonnageLiftedKg": 15200.0
  },
  "createdAt": "2026-09-20T19:58:00.000Z"
}
```

#### 3. `PUT` /api/v1/reports/a1b2c3d4-e5f6-7890-abcd-ef1234567890
- **Request Body (JSON):**
```json
{
  "userId": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "from": "2026-09-01",
  "to": "2026-10-15",
  "notes": "Reporte extendido bimestral"
}
```
- **Response (200 OK):**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "userId": "7b55f190-3b6d-4952-9b21-4f80879f9021",
  "reportPeriod": { "from": "2026-09-01", "to": "2026-10-15" },
  "notes": "Reporte extendido bimestral",
  "updatedAt": "2026-09-20T20:00:00.000Z"
}
```

#### 4. `PATCH` /api/v1/reports/a1b2c3d4-e5f6-7890-abcd-ef1234567890
- **Request Body (JSON):**
```json
{
  "notes": "Nota corregida parcialmente"
}
```
- **Response (200 OK):**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "notes": "Nota corregida parcialmente",
  "updatedAt": "2026-09-20T20:02:00.000Z"
}
```

#### 5. `DELETE` /api/v1/reports/a1b2c3d4-e5f6-7890-abcd-ef1234567890
- **Response (204 No Content):**
*(Cuerpo vacío)*

---

## 🚨 Respuestas de Error Estándar (RFC 7807)

Cuando ocurre un error (por ejemplo, buscar un recurso inexistente):
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
