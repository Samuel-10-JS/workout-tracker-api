const { exercises } = require('../config/db.mock');
const { sendError } = require('../utils/errorResponse');

// Lista de ejercicios por defecto para el sembrador
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

// Listar todos los ejercicios con soporte a filtros de categoría y grupo muscular
const getAllExercises = (req, res) => {
  const { category, muscleGroup } = req.query;
  let filtered = [...exercises];

  if (category) filtered = filtered.filter(e => e.category.toLowerCase() === category.toLowerCase());
  if (muscleGroup) filtered = filtered.filter(e => e.muscleGroup.toLowerCase() === muscleGroup.toLowerCase());

  res.status(200).json(filtered);
};

// Obtener un ejercicio específico por su ID
const getExerciseById = (req, res) => {
  const id = Number(req.params.id);
  const exercise = exercises.find(e => e.id === id);
  if (!exercise) return sendError(res, req, 404, `No se encontró ningún ejercicio con el id: ${id}`);
  res.status(200).json(exercise);
};

// Cargar catálogo inicial de ejercicios (Seeder)
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

// Crear un nuevo ejercicio de forma manual
const createExercise = (req, res) => {
  const { name, description, category, muscleGroup } = req.body;

  if (!name || !description || !category || !muscleGroup) {
    return sendError(res, req, 400, "Los campos name, description, category y muscleGroup son obligatorios.");
  }

  const nextId = exercises.length > 0 ? Math.max(...exercises.map(e => e.id)) + 1 : 1;
  const newExercise = { id: nextId, name, description, category, muscleGroup };

  exercises.push(newExercise);
  res.status(201).json(newExercise);
};

// Actualizar completamente un ejercicio por ID (PUT)
const updateExercise = (req, res) => {
  const id = Number(req.params.id);
  const { name, description, category, muscleGroup } = req.body;

  const idx = exercises.findIndex(e => e.id === id);
  if (idx === -1) return sendError(res, req, 404, `No se encontró ningún ejercicio con el id: ${id} para actualizar.`);

  if (!name || !description || !category || !muscleGroup) {
    return sendError(res, req, 400, "Los campos name, description, category y muscleGroup son obligatorios para PUT.");
  }

  exercises[idx] = { id, name, description, category, muscleGroup };
  res.status(200).json(exercises[idx]);
};

// Actualizar parcialmente un ejercicio por ID (PATCH)
const patchExercise = (req, res) => {
  const id = Number(req.params.id);
  const { name, description, category, muscleGroup } = req.body;

  const idx = exercises.findIndex(e => e.id === id);
  if (idx === -1) return sendError(res, req, 404, `No se encontró ningún ejercicio con el id: ${id} para actualizar.`);

  if (name !== undefined) exercises[idx].name = name;
  if (description !== undefined) exercises[idx].description = description;
  if (category !== undefined) exercises[idx].category = category;
  if (muscleGroup !== undefined) exercises[idx].muscleGroup = muscleGroup;

  res.status(200).json(exercises[idx]);
};

// Eliminar un ejercicio del catálogo por ID (DELETE)
const deleteExercise = (req, res) => {
  const id = Number(req.params.id);
  const idx = exercises.findIndex(e => e.id === id);
  if (idx === -1) return sendError(res, req, 404, `No se encontró ningún ejercicio con el id: ${id} para eliminar.`);

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
