const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notasController');
// localhost:3000/api/notas
// Obtener todas las notas
router.get('/notas', notasController.getTodasLasNotas);

// Obtener notas de un estudiante por ID
router.get('/notas/:id', notasController.getNotasEstudiante);

// Editar una nota por ID de nota
router.put('/nota/:id_nota', notasController.editarNotaEstudiante);

module.exports = router;