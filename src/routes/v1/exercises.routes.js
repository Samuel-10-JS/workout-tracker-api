const express = require('express');
const router = express.Router();
const exercisesController = require('../../controllers/exercises.controller');

// ==========================================
// MÓDULO DE EJERCICIOS (CATÁLOGO MAESTRO)
// VALIDACIÓN DE PARÁMETROS, QUERY STRINGS Y ESTADOS HTTP
// ==========================================

// POST: Sembrar catálogo masivo (Se coloca antes de :id para evitar colisiones de rutas)
router.post('/seed', exercisesController.seedExercises);

// GET: Listar todos los ejercicios
router.get('/', exercisesController.getAllExercises);

// GET: Obtener ejercicio por ID
router.get('/:id', exercisesController.getExerciseById);

// POST: Crear nuevo ejercicio manual
router.post('/', exercisesController.createExercise);

// PUT: Actualizar ejercicio
router.put('/:id', exercisesController.updateExercise);

// PATCH: Actualización parcial
router.patch('/:id', exercisesController.patchExercise);

// DELETE: Eliminar ejercicio
router.delete('/:id', exercisesController.deleteExercise);

module.exports = router;
