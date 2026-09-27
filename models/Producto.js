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
    default: 0
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);
