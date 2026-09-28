const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Conexión a MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI || "tu_link_de_mongodb_aqui";

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB conectado exitosamente'))
  .catch(err => console.error('Error al conectar MongoDB:', err));

// Esquemas
const CategoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String
});

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: String,
  descripcion: String,
  imagen: String,
  stock: { type: Number, default: 10 },
  opciones: { type: [String], default: [] }
});

const Categoria = mongoose.model('Categoria', CategoriaSchema);
const Producto = mongoose.model('Producto', ProductoSchema);

// RUTAS CATEGORÍAS
app.get('/api/categorias', async (req, res) => {
  try {
    const cats = await Categoria.find();
    res.json(cats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/categorias', async (req, res) => {
  try {
    const cat = new Categoria(req.body);
    await cat.save();
    res.json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/categorias/:id', async (req, res) => {
  try {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ message: 'Categoría eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RUTAS PRODUCTOS
app.get('/api/productos', async (req, res) => {
  try {
    const prods = await Producto.find();
    res.json(prods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/productos', async (req, res) => {
  try {
    const prod = new Producto(req.body);
    await prod.save();
    res.json(prod);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/productos/:id', async (req, res) => {
  try {
    const prod = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(prod);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/productos/:id', async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
