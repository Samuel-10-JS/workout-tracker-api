const express = require('express');
const { port } = require('./config/env');
const authRouter = require('./routes/v1/auth.routes');
const usersRouter = require('./routes/v1/users.routes');
const exercisesRouter = require('./routes/v1/exercises.routes');
const workoutsRouter = require('./routes/v1/workouts.routes');
const reportsRouter = require('./routes/v1/reports.routes');

const app = express();

// Configurar lectura de JSON y urlencoded (RFC y REST standards)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
});

// Rutas de la API v1 (Consolidadas según especificación PDF)
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/exercises', exercisesRouter);
app.use('/api/v1/workouts', workoutsRouter);
app.use('/api/v1/reports', reportsRouter);
app.use('/api/v1/progress', reportsRouter); // Alias para cumplir con rama feat/progress

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
