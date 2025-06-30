// models/Socio.js
const mongoose = require('mongoose');

const socioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  membresia: String
});

module.exports = mongoose.model('Socio', socioSchema);
