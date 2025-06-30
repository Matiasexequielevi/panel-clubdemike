const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// GET - Obtener productos
router.get('/', productoController.obtenerProductos);

// POST - Crear producto
router.post('/', productoController.crearProducto);

module.exports = router;
// Ruta temporal para crear un producto de prueba
router.get('/crear-prueba', async (req, res) => {
  try {
    const nuevo = new (require('../models/Producto'))({
      nombre: "Flor de CBD",
      descripcion: "Relajante natural premium",
      precio: 3000,
      imagen: "https://via.placeholder.com/150"
    });
    await nuevo.save();
    res.send('Producto de prueba creado');
  } catch (err) {
    res.status(500).send('Error al crear producto');
  }
});
