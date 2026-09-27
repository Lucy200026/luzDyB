const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Conexión a MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch(err => console.error('❌ Error de conexión a MongoDB:', err));
} else {
  console.log('⚠️ ADVERTENCIA: No se definió la variable MONGO_URI');
}

// Esquemas de MongoDB
const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String
});

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: String,
  descripcion: String,
  imagen: String
});

const Categoria = mongoose.model('Categoria', categoriaSchema);
const Producto = mongoose.model('Producto', productoSchema);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor D&B Belleza funcionando correctamente');
});

// --- RUTAS DE CATEGORÍAS ---
app.get('/api/categorias', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener categorías', error: error.message });
  }
});

app.post('/api/categorias', async (req, res) => {
  try {
    const nuevaCategoria = new Categoria(req.body);
    await nuevaCategoria.save();
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar categoría', error: error.message });
  }
});

// --- RUTAS DE PRODUCTOS ---
app.get('/api/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
});

app.post('/api/productos', async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar producto', error: error.message });
  }
});

// Puerto de ejecución
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

