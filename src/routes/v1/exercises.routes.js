const express = require('express');
const router = express.Router();
const exercisesController = require('../../controllers/exercises.controller');

// GET: Listar todos los ejercicios (Soporta query string para filtrado)
router.get('/', exercisesController.getAllExercises);

// GET: Obtener ejercicio por ID
router.get('/:id', exercisesController.getExerciseById);

// POST: Sembrar catálogo (Placeholder)
router.post('/seed', (req, res) => {
  res.send('Ruta POST: Sembrar ejercicios');
});

// POST: Crear nuevo ejercicio (Placeholder)
router.post('/', (req, res) => {
  res.send('Ruta POST: Crear ejercicio');
});

// PUT: Actualizar ejercicio (Placeholder)
router.put('/:id', (req, res) => {
  res.send(`Ruta PUT: Actualizar ejercicio ${req.params.id}`);
});

// PATCH: Actualización parcial (Placeholder)
router.patch('/:id', (req, res) => {
  res.send(`Ruta PATCH: Actualizar parcialmente ejercicio ${req.params.id}`);
});

// DELETE: Eliminar ejercicio (Placeholder)
router.delete('/:id', (req, res) => {
  res.send(`Ruta DELETE: Eliminar ejercicio ${req.params.id}`);
});

module.exports = router;
