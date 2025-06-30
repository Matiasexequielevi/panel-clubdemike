// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Configurar variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
const productoRoutes = require('./routes/productoRoutes');
const socioRoutes = require('./routes/socios');
app.use('/api/productos', productoRoutes);
app.use('/api/socios', socioRoutes);

// Rutas del panel (para vistas EJS)
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend funcionando en http://localhost:${PORT}`);
});
