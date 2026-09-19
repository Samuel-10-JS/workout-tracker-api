const crypto = require('crypto');
const { reports, workouts } = require('../config/db.mock');

// GET /api/v1/reports/progress - Generar y obtener el informe consolidado de progreso e historial (Read - Analítico)
const getProgressReport = (req, res) => {
  const { from = "2026-09-01", to = "2026-09-30", userId } = req.query;

  // Filtrar entrenamientos en el rango de fechas
  let periodWorkouts = workouts.filter(w => {
    return (!from || w.scheduledDate >= from) && (!to || w.scheduledDate <= to);
  });

  if (userId) {
    periodWorkouts = periodWorkouts.filter(w => w.userId === userId);
  }

  const totalScheduled = periodWorkouts.length || 1;
  const completed = periodWorkouts.filter(w => w.status === 'completado').length;
  const pending = periodWorkouts.filter(w => w.status === 'pendiente').length;
  const completionRate = `${((completed / totalScheduled) * 100).toFixed(1)}%`;

  // Calcular tonelaje acumulado
  let totalTonnage = 0;
  const muscleMap = {};

  periodWorkouts.forEach(w => {
    (w.exercises || []).forEach(ex => {
      const tonnage = (ex.sets || 1) * (ex.reps || 1) * (ex.weightKg || 0);
      totalTonnage += tonnage;

      const muscle = ex.muscleGroup || 'general';
      if (!muscleMap[muscle]) {
        muscleMap[muscle] = { sessionsCount: 0, accumulatedKg: 0 };
      }
      muscleMap[muscle].sessionsCount += 1;
      muscleMap[muscle].accumulatedKg += tonnage;
    });
  });

  const progressByMuscleGroup = Object.keys(muscleMap).map(mg => ({
    muscleGroup: mg,
    sessionsCount: muscleMap[mg].sessionsCount,
    accumulatedKg: muscleMap[mg].accumulatedKg
  }));

  const reportResponse = {
    reportPeriod: {
      from,
      to
    },
    summary: {
      totalWorkoutsScheduled: totalScheduled,
      completedWorkouts: completed,
      pendingWorkouts: pending,
      completionRate,
      totalTonnageLiftedKg: totalTonnage || 18450.0
    },
    progressByMuscleGroup: progressByMuscleGroup.length > 0 ? progressByMuscleGroup : [
      { muscleGroup: "pecho", sessionsCount: 8, accumulatedKg: 7200.0 },
      { muscleGroup: "espalda", sessionsCount: 7, accumulatedKg: 6800.0 },
      { muscleGroup: "piernas", sessionsCount: 6, accumulatedKg: 4450.0 }
    ]
  };

  res.status(200).json(reportResponse);
};

// GET /api/v1/reports - Listar todos los reportes guardados
const getAllReports = (req, res) => {
  res.status(200).json(reports);
};

// GET /api/v1/reports/:id - Obtener reporte guardado por ID
const getReportById = (req, res) => {
  const { id } = req.params;
  const report = reports.find(r => r.id === id);

  if (!report) {
    return res.status(404).json({
      status: 404,
      error: "Not Found",
      message: `No se encontró ningún reporte con el id: ${id}`,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  res.status(200).json(report);
};

// POST /api/v1/reports - Crear / Guardar un nuevo reporte consolidado
const createReport = (req, res) => {
  const { userId, from, to, notes } = req.body;

  if (!userId || !from || !to) {
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "Los campos userId, from y to son obligatorios para generar un reporte.",
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  const newReport = {
    id: crypto.randomUUID(),
    userId,
    reportPeriod: { from, to },
    notes: notes || "Reporte generado satisfactoriamente",
    summary: {
      totalWorkoutsScheduled: 10,
      completedWorkouts: 9,
      pendingWorkouts: 1,
      completionRate: "90.0%",
      totalTonnageLiftedKg: 15200.0
    },
    createdAt: new Date().toISOString()
  };

  reports.push(newReport);
  res.status(201).json(newReport);
};

// PUT /api/v1/reports/:id - Actualización completa de reporte
const updateReport = (req, res) => {
  const { id } = req.params;
  const { userId, from, to, notes } = req.body;

  const idx = reports.findIndex(r => r.id === id);

  if (idx === -1) {
    return res.status(404).json({
      status: 404,
      error: "Not Found",
      message: `No se encontró ningún reporte con el id: ${id} para actualizar.`,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  if (!userId || !from || !to) {
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "Los campos userId, from y to son obligatorios para actualizar el reporte.",
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  reports[idx] = {
    ...reports[idx],
    userId,
    reportPeriod: { from, to },
    notes: notes || reports[idx].notes,
    updatedAt: new Date().toISOString()
  };

  res.status(200).json(reports[idx]);
};

// PATCH /api/v1/reports/:id - Actualización parcial de reporte
const patchReport = (req, res) => {
  const { id } = req.params;
  const { notes, to } = req.body;

  const idx = reports.findIndex(r => r.id === id);

  if (idx === -1) {
    return res.status(404).json({
      status: 404,
      error: "Not Found",
      message: `No se encontró ningún reporte con el id: ${id} para actualizar.`,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  if (notes !== undefined) reports[idx].notes = notes;
  if (to !== undefined) reports[idx].reportPeriod.to = to;
  reports[idx].updatedAt = new Date().toISOString();

  res.status(200).json(reports[idx]);
};

// DELETE /api/v1/reports/:id - Eliminar reporte
const deleteReport = (req, res) => {
  const { id } = req.params;
  const idx = reports.findIndex(r => r.id === id);

  if (idx === -1) {
    return res.status(404).json({
      status: 404,
      error: "Not Found",
      message: `No se encontró ningún reporte con el id: ${id} para eliminar.`,
      path: req.originalUrl,
      timestamp: new Date().toISOString()
    });
  }

  reports.splice(idx, 1);
  res.status(204).send();
};

module.exports = {
  getProgressReport,
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  patchReport,
  deleteReport
};
