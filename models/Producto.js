const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  categoriaGeneral: { type: String, required: true },
  subcategoria: { type: String, default: '' }, // <-- Campo agregado
  tituloOpcion: { type: String, default: 'Opciones' },
  opciones: [{ type: String }], // <-- Lista de opciones (ej: Talles 36, 37 / Tonos 01, 02)
  stock: { type: Number, default: 10 },
  imagen: { type: String, default: '' },
  descripcion: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Producto', ProductoSchema);
