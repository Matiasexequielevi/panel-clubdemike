// routes/socios.js
const express = require('express');
const router = express.Router();
const socioController = require('../controllers/socioController');

// Obtener todos los socios
router.get('/', socioController.obtenerSocios);

// Obtener un socio por ID
router.get('/:id', socioController.obtenerSocioPorId);

// Crear un nuevo socio
router.post('/', socioController.crearSocio);

// Editar un socio
router.put('/:id', socioController.actualizarSocio);

// Eliminar un socio
router.delete('/:id', socioController.eliminarSocio);

// Sumar puntos a un socio
router.post('/:id/sumar-puntos', socioController.sumarPuntos);

// Cambiar estado de membresía
router.put('/:id/estado', socioController.cambiarEstadoMembresia);

module.exports = router;
