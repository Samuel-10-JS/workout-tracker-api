const express = require('express');
const { port } = require('./config/env'); // o './env' según ubicación
const usersRouter = require('./routes/v1/users.routes');
const exercisesRouter = require('./routes/v1/exercises.routes');
const workoutsRouter = require('./routes/v1/workouts.routes');

const app = express();

// Configurar lectura de JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
});

// Rutas de la API
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/exercises', exercisesRouter);
app.use('/api/v1/workouts', workoutsRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
