const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://lucy200026_db:Luz200026@cluster0.p75st.mongodb.net/tienda?retryWrites=true&w=w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Conectado'))
  .catch(err => console.error('Error MongoDB:', err));

// Esquemas
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

// Rutas Categorías
app.get('/api/categorias', async (req, res) => {
  const cats = await Categoria.find();
  res.json(cats);
});

app.post('/api/categorias', async (req, res) => {
  const nueva = new Categoria(req.body);
  await nueva.save();
  res.json(nueva);
});

app.delete('/api/categorias/:id', async (req, res) => {
  await Categoria.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Categoría eliminada' });
});

// Rutas Productos
app.get('/api/productos', async (req, res) => {
  const prods = await Producto.find();
  res.json(prods);
});

app.post('/api/productos', async (req, res) => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.json(nuevo);
});

app.put('/api/productos/:id', async (req, res) => {
  const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

app.delete('/api/productos/:id', async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Producto eliminado' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
