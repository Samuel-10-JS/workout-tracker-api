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

// PUT: Actualización completa
router.put('/:id', workoutsController.updateWorkout);

// PATCH: Actualización parcial
router.patch('/:id', workoutsController.patchWorkout);

// DELETE: Eliminar entrenamiento (Placeholder)
router.delete('/:id', (req, res) => {
  res.send(`Ruta DELETE: Eliminar entrenamiento ${req.params.id}`);
});

module.exports = router;
