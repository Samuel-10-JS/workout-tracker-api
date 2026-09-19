const express = require('express');
const router = express.Router();

// GET: Generar reporte de progreso
router.get('/progress', (req, res) => {
  res.send('Ruta GET: Generar reporte de progreso');
});

// GET: Listar reportes
router.get('/', (req, res) => {
  res.send('Ruta GET: Listar reportes');
});

// GET: Obtener reporte por ID
router.get('/:id', (req, res) => {
  res.send(`Ruta GET: Obtener reporte ${req.params.id}`);
});

// POST: Crear reporte
router.post('/', (req, res) => {
  res.send('Ruta POST: Crear reporte');
});

// PUT: Actualizar reporte
router.put('/:id', (req, res) => {
  res.send(`Ruta PUT: Actualizar reporte ${req.params.id}`);
});

// PATCH: Actualización parcial
router.patch('/:id', (req, res) => {
  res.send(`Ruta PATCH: Actualizar parcialmente reporte ${req.params.id}`);
});

// DELETE: Eliminar reporte
router.delete('/:id', (req, res) => {
  res.send(`Ruta DELETE: Eliminar reporte ${req.params.id}`);
});

module.exports = router;
