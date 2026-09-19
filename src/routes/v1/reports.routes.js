const express = require('express');
const router = express.Router();
const reportsController = require('../../controllers/reports.controller');

// ==========================================
// MÓDULO DE INFORMES Y ANALÍTICA DE PROGRESO
// ==========================================

// GET: Generar reporte analítico de progreso (?from=YYYY-MM-DD&to=YYYY-MM-DD)
router.get('/progress', reportsController.getProgressReport);

// GET: Listar todos los reportes guardados
router.get('/', reportsController.getAllReports);

// GET: Obtener reporte por ID
router.get('/:id', reportsController.getReportById);

// POST: Crear reporte
router.post('/', reportsController.createReport);

// PUT: Actualizar reporte
router.put('/:id', reportsController.updateReport);

// PATCH: Actualización parcial
router.patch('/:id', reportsController.patchReport);

// DELETE: Eliminar reporte
router.delete('/:id', reportsController.deleteReport);

module.exports = router;
