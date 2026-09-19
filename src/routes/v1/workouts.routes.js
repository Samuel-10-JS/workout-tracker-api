const express = require('express');
const router = express.Router();
const workoutsController = require('../../controllers/workouts.controller');

// ==========================================
// MÓDULO DE ENTRENAMIENTOS (PLANES DE USUARIO)
// ==========================================

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

// DELETE: Eliminar entrenamiento completo
router.delete('/:id', workoutsController.deleteWorkout);

// DELETE: Eliminar un ítem de ejercicio de una rutina
router.delete('/:id/exercises/:exerciseItemId', workoutsController.removeExerciseFromWorkout);

module.exports = router;
