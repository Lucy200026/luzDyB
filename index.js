const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Crear la carpeta uploads si no existe para guardar las fotos subidas
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Servir las carpetas públicas (Frontend y las fotos de Uploads)
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración de almacenamiento con Multer para imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// Ruta para procesar las fotos subidas desde el celular
app.post('/api/upload', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensaje: 'No se subió ninguna imagen' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ ¡Conectado exitosamente a MongoDB!'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err.message));

// Rutas de la API
app.use('/api/categorias', require('./routes/categorias'));
app.use('/api/productos', require('./routes/productos'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor e interfaz listos en http://localhost:${PORT}`);
});
