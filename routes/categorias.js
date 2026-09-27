const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

// Crear nueva categoría
router.post('/', async (req, res) => {
  const categoria = new Categoria({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion
  });
  try {
    const nuevaCategoria = await categoria.save();
    res.status(201).json(nuevaCategoria);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
});

// Editar categoría
router.put('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(categoria);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
});

// Eliminar categoría
router.delete('/:id', async (req, res) => {
  try {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Categoría eliminada' });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

module.exports = router;
