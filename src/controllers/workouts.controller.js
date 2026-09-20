const crypto = require('crypto');
const { workouts, exercises } = require('../config/db.mock');
const { sendError } = require('../utils/errorResponse');

// GET /api/v1/workouts - Listar entrenamientos
const getAllWorkouts = (req, res) => {
  const { status, page = 1, limit = 10, sort } = req.query;
  let result = [...workouts];

  if (status) result = result.filter(w => w.status.toLowerCase() === status.toLowerCase());

  if (sort) {
    if (sort.includes('scheduledDate:asc')) result.sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));
    else if (sort.includes('scheduledDate:desc')) result.sort((a, b) => b.scheduledDate.localeCompare(a.scheduledDate));
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedResult = result.slice(startIndex, startIndex + limitNum);

  res.status(200).json({
    total: result.length,
    page: pageNum,
    limit: limitNum,
    data: paginatedResult
  });
};

// GET /api/v1/workouts/:id - Obtener uno por ID
const getWorkoutById = (req, res) => {
  const workout = workouts.find(w => w.id === req.params.id);
  if (!workout) return sendError(res, req, 404, `No se encontró ningún entrenamiento con el id: ${req.params.id}`);
  res.status(200).json(workout);
};

// POST /api/v1/workouts - Crear entrenamiento
const createWorkout = (req, res) => {
  const { userId, title, scheduledDate, scheduledTime, status = "pendiente", comments = "", exercises: inputExercises = [] } = req.body;

  if (!userId || !title || !scheduledDate || !scheduledTime) {
    return sendError(res, req, 400, "Los campos userId, title, scheduledDate y scheduledTime son obligatorios.");
  }

  const newWorkout = {
    id: crypto.randomUUID(),
    userId,
    title,
    scheduledDate,
    scheduledTime,
    status,
    comments,
    exercises: inputExercises.map((ex, index) => {
      const catalogEx = exercises.find(e => e.id === ex.exerciseId) || {};
      return {
        id: crypto.randomUUID(),
        exerciseId: ex.exerciseId,
        exerciseName: catalogEx.name || ex.exerciseName || "Ejercicio",
        muscleGroup: catalogEx.muscleGroup || ex.muscleGroup || "general",
        order: ex.order || index + 1,
        sets: ex.sets || 3,
        reps: ex.reps || 10,
        weightKg: ex.weightKg || 0
      };
    }),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  workouts.push(newWorkout);
  res.status(201).json(newWorkout);
};

// PUT /api/v1/workouts/:id
const updateWorkout = (req, res) => {
  const { id } = req.params;
  const { userId, title, scheduledDate, scheduledTime, status, comments, exercises: inputExercises } = req.body;

  const idx = workouts.findIndex(w => w.id === id);
  if (idx === -1) return sendError(res, req, 404, `No se encontró ningún entrenamiento con el id: ${id} para actualizar.`);

  if (!userId || !title || !scheduledDate || !scheduledTime || !status) {
    return sendError(res, req, 400, "Para actualización integral (PUT), se requieren userId, title, scheduledDate, scheduledTime y status.");
  }

  workouts[idx] = {
    ...workouts[idx],
    userId,
    title,
    scheduledDate,
    scheduledTime,
    status,
    comments: comments !== undefined ? comments : workouts[idx].comments,
    exercises: inputExercises ? inputExercises : workouts[idx].exercises,
    updatedAt: new Date().toISOString()
  };

  res.status(200).json(workouts[idx]);
};

// PATCH /api/v1/workouts/:id
const patchWorkout = (req, res) => {
  const { id } = req.params;
  const { title, scheduledDate, scheduledTime, status, comments } = req.body;

  const idx = workouts.findIndex(w => w.id === id);
  if (idx === -1) return sendError(res, req, 404, `No se encontró ningún entrenamiento con el id: ${id} para actualizar.`);

  if (title !== undefined) workouts[idx].title = title;
  if (scheduledDate !== undefined) workouts[idx].scheduledDate = scheduledDate;
  if (scheduledTime !== undefined) workouts[idx].scheduledTime = scheduledTime;
  if (status !== undefined) workouts[idx].status = status;
  if (comments !== undefined) workouts[idx].comments = comments;
  workouts[idx].updatedAt = new Date().toISOString();

  res.status(200).json(workouts[idx]);
};

// DELETE /api/v1/workouts/:id
const deleteWorkout = (req, res) => {
  const idx = workouts.findIndex(w => w.id === req.params.id);
  if (idx === -1) return sendError(res, req, 404, `No se encontró ningún entrenamiento con el id: ${req.params.id} para eliminar.`);

  workouts.splice(idx, 1);
  res.status(204).send();
};

// POST /api/v1/workouts/:id/exercises
const addExerciseToWorkout = (req, res) => {
  const { id } = req.params;
  const { exerciseId, sets = 3, reps = 10, weightKg = 0 } = req.body;

  const workout = workouts.find(w => w.id === id);
  if (!workout) return sendError(res, req, 404, `No se encontró ningún entrenamiento con el id: ${id}`);

  const catalogEx = exercises.find(e => e.id === Number(exerciseId));
  const newExerciseItem = {
    id: crypto.randomUUID(),
    exerciseId: Number(exerciseId),
    exerciseName: catalogEx ? catalogEx.name : "Ejercicio",
    muscleGroup: catalogEx ? catalogEx.muscleGroup : "general",
    order: workout.exercises.length + 1,
    sets,
    reps,
    weightKg
  };

  workout.exercises.push(newExerciseItem);
  workout.updatedAt = new Date().toISOString();
  res.status(201).json(newExerciseItem);
};

// DELETE /api/v1/workouts/:id/exercises/:exerciseItemId
const removeExerciseFromWorkout = (req, res) => {
  const { id, exerciseItemId } = req.params;

  const workout = workouts.find(w => w.id === id);
  if (!workout) return sendError(res, req, 404, `No se encontró el entrenamiento con id: ${id}`);

  const itemIdx = workout.exercises.findIndex(item => item.id === exerciseItemId);
  if (itemIdx === -1) return sendError(res, req, 404, `No se encontró el ítem de ejercicio con id: ${exerciseItemId} en la rutina`);

  workout.exercises.splice(itemIdx, 1);
  workout.updatedAt = new Date().toISOString();
  res.status(204).send();
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  patchWorkout,
  deleteWorkout,
  addExerciseToWorkout,
  removeExerciseFromWorkout
};
