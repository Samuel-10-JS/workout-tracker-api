const express = require('express');
const router = express.Router();
const workoutsController = require('../../controllers/workouts.controller');

// GET: Listar todos los entrenamientos
router.get('/', workoutsController.getAllWorkouts);

// GET: Obtener entrenamiento por ID
router.get('/:id', workoutsController.getWorkoutById);

// POST: Crear nuevo entrenamiento
router.post('/', workoutsController.createWorkout);

// POST: Agregar un ejercicio a una rutina existente
router.post('/:id/exercises', workoutsController.addExerciseToWorkout);

// PUT: Actualización completa (Placeholder)
router.put('/:id', (req, res) => {
  res.send(`Ruta PUT: Actualizar entrenamiento ${req.params.id}`);
});

// PATCH: Actualización parcial (Placeholder)
router.patch('/:id', (req, res) => {
  res.send(`Ruta PATCH: Actualizar parcialmente entrenamiento ${req.params.id}`);
});

// DELETE: Eliminar entrenamiento (Placeholder)
router.delete('/:id', (req, res) => {
  res.send(`Ruta DELETE: Eliminar entrenamiento ${req.params.id}`);
});

module.exports = router;
