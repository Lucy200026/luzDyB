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
  opciones: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);
