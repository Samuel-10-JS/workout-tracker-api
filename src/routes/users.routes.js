const express = require('express');
const router = express.Router();

// GET: Listar todos los usuarios
router.get('/', (req, res) => {
  res.send('Ruta GET: Listar usuarios');
});

// GET: Obtener un usuario por ID
router.get('/:id', (req, res) => {
  res.send(`Ruta GET: Obtener usuario ${req.params.id}`);
});

// POST: Crear nuevo usuario
router.post('/', (req, res) => {
  res.send('Ruta POST: Crear usuario');
});

// PUT: Actualización completa de usuario
router.put('/:id', (req, res) => {
  res.send(`Ruta PUT: Actualizar usuario ${req.params.id}`);
});

// PATCH: Actualización parcial de usuario
router.patch('/:id', (req, res) => {
  res.send(`Ruta PATCH: Actualizar parcialmente usuario ${req.params.id}`);
});

// DELETE: Eliminar usuario
router.delete('/:id', (req, res) => {
  res.send(`Ruta DELETE: Eliminar usuario ${req.params.id}`);
});

module.exports = router;
