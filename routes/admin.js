const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const Socio = require('../models/Socio');

// Ruta principal del panel
router.get('/', (req, res) => {
  res.render('dashboard');
});

// Gestión de productos
router.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render('productos', { productos });
  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
});

// Ver socios
router.get('/socios', async (req, res) => {
  try {
    const socios = await Socio.find();
    res.render('socios', { socios });
  } catch (error) {
    res.status(500).send('Error al cargar socios');
  }
});

// Pagos (temporal: array vacío para evitar error)
router.get('/pagos', async (req, res) => {
  try {
    const pagos = []; // Luego lo conectamos con modelo real si tenés
    res.render('pagos', { pagos });
  } catch (error) {
    res.status(500).send('Error al cargar pagos');
  }
});

// Subida de portadas
router.get('/portada', (req, res) => {
  res.render('portada');
});
// Mostrar formulario para crear un nuevo producto
// Mostrar formulario para crear un nuevo producto
router.get('/productos/nuevo', (req, res) => {
  res.render('nuevo');
});

// Editar producto
router.get('/productos/editar/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    res.render('editar', { producto });
  } catch (err) {
    res.status(500).send('Error al cargar producto');
  }
});

// Eliminar producto
router.post('/productos/eliminar/:id', async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.redirect('/admin/productos');
  } catch (err) {
    res.status(500).send('Error al eliminar producto');
  }
});

module.exports = router;
