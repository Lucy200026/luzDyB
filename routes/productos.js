const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Obtener todos los productos (con datos de su categoría)
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find().populate('categoria');
    res.json(productos);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

// Crear nuevo producto
router.post('/', async (req, res) => {
  const producto = new Producto({
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    stock: req.body.stock,
    categoria: req.body.categoria,
    opciones: req.body.opciones // <--- ¡AQUÍ ESTABA HACIENDO FALTA!
  });
  try {
    const nuevoProducto = await producto.save();
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
});

// Editar producto
router.put('/:id', async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(productoActualizado);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
});

module.exports = router;
