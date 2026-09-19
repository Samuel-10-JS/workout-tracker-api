const express = require('express');
const router = express.Router();

// GET: Listar todos los entrenamientos
router.get('/', (req, res) => {
  res.send('Ruta GET: Listar entrenamientos');
});

// GET: Obtener entrenamiento por ID
router.get('/:id', (req, res) => {
  res.send(`Ruta GET: Obtener entrenamiento ${req.params.id}`);
});

// POST: Crear nuevo entrenamiento
router.post('/', (req, res) => {
  res.send('Ruta POST: Crear entrenamiento');
});

// PUT: Actualización completa
router.put('/:id', (req, res) => {
  res.send(`Ruta PUT: Actualizar entrenamiento ${req.params.id}`);
});

// PATCH: Actualización parcial
router.patch('/:id', (req, res) => {
  res.send(`Ruta PATCH: Actualizar parcialmente entrenamiento ${req.params.id}`);
});

// DELETE: Eliminar entrenamiento
router.delete('/:id', (req, res) => {
  res.send(`Ruta DELETE: Eliminar entrenamiento ${req.params.id}`);
});

module.exports = router;
