const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users.controller');

// ==========================================
// VALIDACIÓN DE PARÁMETROS, QUERY STRINGS Y ESTADOS HTTP
// ==========================================

// GET: Listar todos los usuarios
router.get('/', usersController.getAllUsers);

// GET: Obtener un usuario por ID
router.get('/:id', usersController.getUserById);

// POST: Crear nuevo usuario
router.post('/', usersController.createUser);

// PUT: Actualización completa de usuario
router.put('/:id', usersController.updateUser);

// PATCH: Actualización parcial de usuario
router.patch('/:id', usersController.patchUser);

// DELETE: Eliminar usuario
router.delete('/:id', usersController.deleteUser);

module.exports = router;
