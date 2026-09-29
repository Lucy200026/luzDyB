const Categoria = require('./models/Categoria');

// Obtener todas las categorías y subcategorías
app.get('/api/categorias', async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ nombre: 1 });
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear categoría o subcategoría
app.post('/api/categorias', async (req, res) => {
  try {
    const { nombre, categoriaPadre } = req.body;
    const nuevaCat = new Categoria({ 
      nombre, 
      categoriaPadre: categoriaPadre || null 
    });
    await nuevaCat.save();
    res.json(nuevaCat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar categoría
app.delete('/api/categorias/:id', async (req, res) => {
  try {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Categoría eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
