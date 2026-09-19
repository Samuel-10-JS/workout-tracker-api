const { exercises } = require('../config/db.mock');

// Lista inicial para el sembrador (seeder) según la página 9 de la especificación
const initialExercises = [
  {
    id: 1,
    name: "Press de Banca Plano con Barra",
    description: "Acostado sobre un banco plano, descender la barra olímpica de forma controlada hasta la línea del esternón y empujar verticalmente extendiendo los brazos.",
    category: "fuerza",
    muscleGroup: "pecho"
  },
  {
    id: 2,
    name: "Sentadilla Trasera con Barra",
    description: "Colocar la barra sobre los trapecios, descender flexionando cadera y rodillas hasta romper el paralelo (90 grados) y volver a la posición inicial.",
    category: "fuerza",
    muscleGroup: "piernas"
  },
  {
    id: 3,
    name: "Dominadas Pronas",
    description: "Colgarse de una barra con agarre prono (palmas hacia el frente) más ancho que los hombros y elevar el cuerpo hasta que la barbilla pase la barra.",
    category: "fuerza",
    muscleGroup: "espalda"
  },
  {
    id: 4,
    name: "Press Militar de Hombro",
    description: "Empujar la barra o mancuernas verticalmente por encima de la cabeza partiendo desde los hombros hasta la extensión completa de los brazos.",
    category: "fuerza",
    muscleGroup: "hombros"
  }
];

// GET: Listar todos los ejercicios con soporte a filtros (category, muscleGroup)
const getAllExercises = (req, res) => {
  const { category, muscleGroup } = req.query;
  let filtered = [...exercises];

  if (category) {
    filtered = filtered.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }

  if (muscleGroup) {
    filtered = filtered.filter(e => e.muscleGroup.toLowerCase() === muscleGroup.toLowerCase());
  }

  res.status(200).json(filtered);
};

// GET: Obtener un ejercicio específico por ID
const getExerciseById = (req, res) => {
  const id = Number(req.params.id);
  const exercise = exercises.find(e => e.id === id);

  if (!exercise) {
    return res.status(404).json({
      status: 404,
      error: "Not Found",
      message: `No se encontró ningún ejercicio con el id: ${id}`,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  res.status(200).json(exercise);
};

// POST: Poblar masivamente la base de datos (Seeder)
const seedExercises = (req, res) => {
  exercises.length = 0;
  exercises.push(...initialExercises);

  res.status(201).json({
    status: 201,
    message: "Catálogo maestro de ejercicios sembrado exitosamente",
    count: exercises.length,
    data: exercises
  });
};

// POST: Crear un nuevo ejercicio manual
const createExercise = (req, res) => {
  const { name, description, category, muscleGroup } = req.body;

  if (!name || !description || !category || !muscleGroup) {
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "Los campos name, description, category y muscleGroup son obligatorios.",
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  const nextId = exercises.length > 0 ? Math.max(...exercises.map(e => e.id)) + 1 : 1;

  const newExercise = {
    id: nextId,
    name,
    description,
    category,
    muscleGroup
  };

  exercises.push(newExercise);
  res.status(201).json(newExercise);
};

// PUT: Actualización completa
const updateExercise = (req, res) => {
  const id = Number(req.params.id);
  const { name, description, category, muscleGroup } = req.body;

  const idx = exercises.findIndex(e => e.id === id);

  if (idx === -1) {
    return res.status(404).json({
      status: 404,
      error: "Not Found",
      message: `No se encontró ningún ejercicio con el id: ${id} para actualizar.`,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  if (!name || !description || !category || !muscleGroup) {
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "Los campos name, description, category y muscleGroup son obligatorios para PUT.",
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  exercises[idx] = { id, name, description, category, muscleGroup };
  res.status(200).json(exercises[idx]);
};

// PATCH: Actualización parcial
const patchExercise = (req, res) => {
  const id = Number(req.params.id);
  const { name, description, category, muscleGroup } = req.body;

  const idx = exercises.findIndex(e => e.id === id);

  if (idx === -1) {
    return res.status(404).json({
      status: 404,
      error: "Not Found",
      message: `No se encontró ningún ejercicio con el id: ${id} para actualizar.`,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  if (name !== undefined) exercises[idx].name = name;
  if (description !== undefined) exercises[idx].description = description;
  if (category !== undefined) exercises[idx].category = category;
  if (muscleGroup !== undefined) exercises[idx].muscleGroup = muscleGroup;

  res.status(200).json(exercises[idx]);
};

// DELETE: Eliminar ejercicio
const deleteExercise = (req, res) => {
  const id = Number(req.params.id);
  const idx = exercises.findIndex(e => e.id === id);

  if (idx === -1) {
    return res.status(404).json({
      status: 404,
      error: "Not Found",
      message: `No se encontró ningún ejercicio con el id: ${id} para eliminar.`,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  exercises.splice(idx, 1);
  res.status(204).send();
};

module.exports = {
  getAllExercises,
  getExerciseById,
  seedExercises,
  createExercise,
  updateExercise,
  patchExercise,
  deleteExercise
};
