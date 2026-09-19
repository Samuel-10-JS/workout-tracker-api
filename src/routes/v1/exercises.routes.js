const express = require('express');
const router = express.Router();
const exercisesController = require('../../controllers/exercises.controller');

// GET: Listar todos los ejercicios
router.get('/', exercisesController.getAllExercises);

// GET: Obtener ejercicio por ID
router.get('/:id', exercisesController.getExerciseById);

// POST: Sembrar catálogo masivo
router.post('/seed', exercisesController.seedExercises);

// POST: Crear nuevo ejercicio
router.post('/', exercisesController.createExercise);

// PUT: Actualizar ejercicio
router.put('/:id', exercisesController.updateExercise);

// PATCH: Actualización parcial
router.patch('/:id', exercisesController.patchExercise);

// DELETE: Eliminar ejercicio (Placeholder)
router.delete('/:id', (req, res) => {
  res.send(`Ruta DELETE: Eliminar ejercicio ${req.params.id}`);
});

module.exports = router;
