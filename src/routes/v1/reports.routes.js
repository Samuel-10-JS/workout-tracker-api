const express = require('express');
const router = express.Router();
const reportsController = require('../../controllers/reports.controller');

// GET: Generar reporte analítico de progreso (?from=YYYY-MM-DD&to=YYYY-MM-DD)
router.get('/progress', reportsController.getProgressReport);

// GET: Listar todos los reportes guardados
router.get('/', reportsController.getAllReports);

// GET: Obtener reporte por ID
router.get('/:id', reportsController.getReportById);

// POST: Crear reporte (Placeholder)
router.post('/', (req, res) => {
  res.send('Ruta POST: Crear reporte');
});

// PUT: Actualizar reporte (Placeholder)
router.put('/:id', (req, res) => {
  res.send(`Ruta PUT: Actualizar reporte ${req.params.id}`);
});

// PATCH: Actualización parcial (Placeholder)
router.patch('/:id', (req, res) => {
  res.send(`Ruta PATCH: Actualizar parcialmente reporte ${req.params.id}`);
});

// DELETE: Eliminar reporte (Placeholder)
router.delete('/:id', (req, res) => {
  res.send(`Ruta DELETE: Eliminar reporte ${req.params.id}`);
});

module.exports = router;
