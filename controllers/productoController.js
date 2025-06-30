const Producto = require('../models/Producto');

// Crear un producto
// POST /admin/productos/nuevo
exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.redirect('/admin/productos'); // ✅ Redirige al listado
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar producto');
  }
};


// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find().sort({ creadoEn: -1 });
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};
