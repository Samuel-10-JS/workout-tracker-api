const express = require('express');
const router = express.Router();

// GET: Listar todos los ejercicios
router.get('/', (req, res) => {
  res.send('Ruta GET: Listar ejercicios');
});

// GET: Obtener ejercicio por ID
router.get('/:id', (req, res) => {
  res.send(`Ruta GET: Obtener ejercicio ${req.params.id}`);
});

// POST: Sembrar catálogo
router.post('/seed', (req, res) => {
  res.send('Ruta POST: Sembrar ejercicios');
});

// POST: Crear nuevo ejercicio
router.post('/', (req, res) => {
  res.send('Ruta POST: Crear ejercicio');
});

// PUT: Actualizar ejercicio
router.put('/:id', (req, res) => {
  res.send(`Ruta PUT: Actualizar ejercicio ${req.params.id}`);
});

// PATCH: Actualización parcial
router.patch('/:id', (req, res) => {
  res.send(`Ruta PATCH: Actualizar parcialmente ejercicio ${req.params.id}`);
});

// DELETE: Eliminar ejercicio
router.delete('/:id', (req, res) => {
  res.send(`Ruta DELETE: Eliminar ejercicio ${req.params.id}`);
});

module.exports = router;
