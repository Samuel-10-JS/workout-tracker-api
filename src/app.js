const express = require('express');
const { port } = require('./config/env'); // o './env' según ubicación

const app = express();

app.get('/', (req, res) => {
  // req no se usa, por eso aparece atenuado. Puedes poner _req si tu linter lo exige.
  res.send('Hola mi server en Express');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});