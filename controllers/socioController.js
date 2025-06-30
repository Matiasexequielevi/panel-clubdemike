const Socio = require('../models/Socio');

// Obtener todos los socios
exports.obtenerSocios = async (req, res) => {
  try {
    const socios = await Socio.find().sort({ fechaRegistro: -1 });
    res.json(socios);
  } catch (err) {
    console.error('Error al obtener socios:', err);
    res.status(500).json({ error: 'Error al obtener socios.' });
  }
};

// Obtener un socio por ID
exports.obtenerSocioPorId = async (req, res) => {
  try {
    const socio = await Socio.findById(req.params.id);
    if (!socio) return res.status(404).json({ error: 'Socio no encontrado.' });
    res.json(socio);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el socio.' });
  }
};

// Crear un nuevo socio
exports.crearSocio = async (req, res) => {
  try {
    const nuevoSocio = new Socio(req.body);
    await nuevoSocio.save();
    res.status(201).json(nuevoSocio);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear socio.' });
  }
};

// Actualizar un socio
exports.actualizarSocio = async (req, res) => {
  try {
    const socioActualizado = await Socio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(socioActualizado);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar socio.' });
  }
};

// Eliminar un socio
exports.eliminarSocio = async (req, res) => {
  try {
    await Socio.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Socio eliminado correctamente.' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar socio.' });
  }
};

// Sumar puntos al socio
exports.sumarPuntos = async (req, res) => {
  try {
    const { puntos } = req.body;
    const socio = await Socio.findById(req.params.id);
    if (!socio) return res.status(404).json({ error: 'Socio no encontrado.' });

    socio.puntos += parseInt(puntos);
    await socio.save();

    res.json({ mensaje: 'Puntos sumados correctamente.', socio });
  } catch (err) {
    res.status(500).json({ error: 'Error al sumar puntos.' });
  }
};

// Cambiar estado de membresía (Activo/Vencido)
exports.cambiarEstadoMembresia = async (req, res) => {
  try {
    const { estado } = req.body; // Debe ser 'Activo' o 'Vencido'
    const socio = await Socio.findById(req.params.id);
    if (!socio) return res.status(404).json({ error: 'Socio no encontrado.' });

    socio.estadoMembresia = estado;
    await socio.save();

    res.json({ mensaje: 'Estado de membresía actualizado.', socio });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar estado de membresía.' });
  }
};
