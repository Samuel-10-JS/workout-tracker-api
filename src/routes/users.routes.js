const express = require('express');
const router = express.Router();

// Base de datos simulada en memoria (según el formato JSON de la pág. 9 del documento)
const users = [
  {
    id: "7b55f190-3b6d-4952-9b21-4f80879f9021",
    fullName: "Carlos Rodríguez",
    email: "carlos.rodriguez@example.com",
    createdAt: "2026-09-12T08:30:00.000Z"
  },
  {
    id: "8c66f201-4c7e-5063-ac32-5f90980fa132",
    fullName: "Samuel Estrada",
    email: "samuel.estrada@example.com",
    createdAt: "2026-09-13T10:15:00.000Z"
  }
];

// GET /api/v1/users - Listar todos los usuarios (con soporte a query string de búsqueda)
router.get('/', (req, res) => {
  const { search } = req.query;

  if (search) {
    const filteredUsers = users.filter(u => 
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
    return res.status(200).json(filteredUsers);
  }

  res.status(200).json(users);
});

// GET /api/v1/users/:id - Obtener un usuario por su ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      status: 404,
      error: "Not Found",
      message: `No se encontró ningún usuario con el id: ${id}`,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  res.status(200).json(user);
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
