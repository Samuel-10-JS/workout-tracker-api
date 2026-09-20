const crypto = require('crypto');
const { users } = require('../config/db.mock');
const { sendError } = require('../utils/errorResponse');

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
  const user = users.find(u => u.id === req.params.id);
  if (!user) return sendError(res, req, 404, `No se encontró ningún usuario con el id: ${req.params.id}`);
  res.status(200).json(user);
};

// POST: Crear nuevo usuario / Registrar cuenta
const createUser = (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return sendError(res, req, 400, "Los campos fullName, email y password son obligatorios.");
  }

  const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return sendError(res, req, 400, `El correo electrónico '${email}' ya se encuentra registrado.`);
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

// POST: Autenticar credenciales y generar token de acceso
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, req, 400, "Correo electrónico y contraseña son obligatorios.");
  }

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return sendError(res, req, 401, "Credenciales de acceso inválidas.");

  const simulatedToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${Buffer.from(JSON.stringify({ userId: user.id, email: user.email })).toString('base64url')}.workoutTrackerSignature`;

  res.status(200).json({
    status: 200,
    message: "Inicio de sesión exitoso",
    token: simulatedToken,
    user
  });
};

// GET: Consultar perfil del usuario en sesión
const getMe = (req, res) => {
  const authHeader = req.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return res.status(200).json(users[0]);
  }
  return res.status(200).json(users[0]);
};

// PUT: Actualización completa de usuario
const updateUser = (req, res) => {
  const { id } = req.params;
  const { fullName, email } = req.body;

  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) return sendError(res, req, 404, `No se encontró ningún usuario con el id: ${id} para actualizar.`);

  if (!fullName || !email) {
    return sendError(res, req, 400, "Para una actualización completa (PUT), se requieren los campos fullName y email.");
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
  if (userIndex === -1) return sendError(res, req, 404, `No se encontró ningún usuario con el id: ${id} para actualizar.`);

  if (fullName !== undefined) users[userIndex].fullName = fullName;
  if (email !== undefined) users[userIndex].email = email;
  users[userIndex].updatedAt = new Date().toISOString();

  res.status(200).json(users[userIndex]);
};

// DELETE: Eliminar usuario
const deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) return sendError(res, req, 404, `No se encontró ningún usuario con el id: ${id} para eliminar.`);

  users.splice(userIndex, 1);
  res.status(204).send();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  login,
  getMe,
  updateUser,
  patchUser,
  deleteUser
};
