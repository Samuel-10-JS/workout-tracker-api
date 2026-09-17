const express = require('express');
const crypto = require('crypto');
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

// POST /api/v1/users - Crear nuevo usuario
router.post('/', (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "Los campos fullName, email y password son obligatorios.",
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: `El correo electrónico '${email}' ya se encuentra registrado.`,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  const newUser = {
    id: crypto.randomUUID(),
    fullName,
    email,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/v1/users/:id - Actualización completa de usuario (Paso 8 de la guía)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { fullName, email } = req.body;

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      status: 404,
      error: "Not Found",
      message: `No se encontró ningún usuario con el id: ${id} para actualizar.`,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  // PUT requiere la estructura completa del recurso
  if (!fullName || !email) {
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "Para una actualización completa (PUT), se requieren los campos fullName y email.",
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  // Reemplazo completo manteniendo id y fecha de creación original
  users[userIndex] = {
    ...users[userIndex],
    fullName,
    email,
    updatedAt: new Date().toISOString()
  };

  res.status(200).json(users[userIndex]);
});

// PATCH /api/v1/users/:id - Actualización parcial de usuario (Paso 8 de la guía)
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { fullName, email } = req.body;

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      status: 404,
      error: "Not Found",
      message: `No se encontró ningún usuario con el id: ${id} para actualizar.`,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  // PATCH actualiza únicamente los campos provistos en req.body
  if (fullName !== undefined) users[userIndex].fullName = fullName;
  if (email !== undefined) users[userIndex].email = email;
  users[userIndex].updatedAt = new Date().toISOString();

  res.status(200).json(users[userIndex]);
});

// DELETE: Eliminar usuario
router.delete('/:id', (req, res) => {
  res.send(`Ruta DELETE: Eliminar usuario ${req.params.id}`);
});

module.exports = router;
