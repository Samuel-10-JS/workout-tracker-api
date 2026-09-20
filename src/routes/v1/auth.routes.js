const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users.controller');

// ==========================================
// MÓDULO DE AUTENTICACIÓN (PDF PÁGS. 5 Y 6)
// ==========================================

// POST /api/v1/auth/register - Registrar nueva cuenta de usuario
router.post('/register', usersController.createUser);

// POST /api/v1/auth/login - Autenticar credenciales y generar token JWT
router.post('/login', usersController.login);

// GET /api/v1/auth/me - Consultar perfil del usuario en sesión
router.get('/me', usersController.getMe);

module.exports = router;
