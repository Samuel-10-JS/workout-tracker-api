const express = require('express');
const { port } = require('./config/env'); // o './env' según ubicación
const usersRouter = require('./routes/v1/users.routes');

const app = express();

// Configurar lectura de JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
});

// Rutas de la API (Versionadas en la estructura de carpetas)
app.use('/api/v1/users', usersRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
