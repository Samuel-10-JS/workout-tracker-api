const crypto = require('crypto');
const { users } = require('../config/db.mock');

// GET: Listar todos los usuarios
const getAllUsers = (req, res) => {
  const { search } = req.query;

  if (search) {
    const filteredUsers = users.filter(u => 
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
    return res.status(200).json(filteredUsers);
  }

  res.status(200).json(users);
};

// GET: Obtener un usuario por ID
const getUserById = (req, res) => {
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
};

// POST: Crear nuevo usuario
const createUser = (req, res) => {
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
};

// PUT: Actualización completa de usuario
const updateUser = (req, res) => {
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

  if (!fullName || !email) {
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "Para una actualización completa (PUT), se requieren los campos fullName y email.",
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  users[userIndex] = {
    ...users[userIndex],
    fullName,
    email,
    updatedAt: new Date().toISOString()
  };

  res.status(200).json(users[userIndex]);
};

// PATCH: Actualización parcial de usuario
const patchUser = (req, res) => {
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

  if (fullName !== undefined) users[userIndex].fullName = fullName;
  if (email !== undefined) users[userIndex].email = email;
  users[userIndex].updatedAt = new Date().toISOString();

  res.status(200).json(users[userIndex]);
};

// DELETE: Eliminar usuario
const deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      status: 404,
      error: "Not Found",
      message: `No se encontró ningún usuario con el id: ${id} para eliminar.`,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser
};
