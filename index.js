const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Permite peticiones desde GitHub Pages (CORS)
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Conexión a MongoDB usando Variable de Entorno
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch(err => console.error('❌ Error de conexión a MongoDB:', err));
} else {
  console.log('⚠️ ADVERTENCIA: No se definió la variable MONGO_URI');
}

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor D&B Belleza funcionando correctamente');
});

// Definición de Puerto para Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
