const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://lucy200026_db:Luz200026@cluster0.p75st.mongodb.net/tienda?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Conectado'))
  .catch(err => console.error('Error MongoDB:', err));

const CategoriaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String
});

const ProductoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  categoria: String,
  descripcion: String,
  imagen: String,
  stock: Number,
  opciones: [String]
});

const Categoria = mongoose.model('Categoria', CategoriaSchema);
const Producto = mongoose.model('Producto', ProductoSchema);

app.get('/api/categorias', async (req, res) => {
  try {
    const cats = await Categoria.find();
    res.json(cats);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/categorias', async (req, res) => {
  try {
    const nueva = new Categoria(req.body);
    await nueva.save();
    res.json(nueva);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/categorias/:id', async (req, res) => {
  try {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Categoría eliminada' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/productos', async (req, res) => {
  try {
    const prods = await Producto.find();
    res.json(prods);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/productos', async (req, res) => {
  try {
    const nuevo = new Producto(req.body);
    await nuevo.save();
    res.json(nuevo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/productos/:id', async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/productos/:id', async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
