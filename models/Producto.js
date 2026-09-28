const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  descripcion: String,
  imagen: String,
  stock: {
    type: Number,
    default: 10
  },
  categoria: String,
  // Permite números y letras guardados como texto (ej: ["38", "40", "M", "Tono 01"])
  opciones: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);
