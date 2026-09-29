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
  // Categoría General (ej: "Skincare", "Maquillaje", "Perfumes")
  categoriaGeneral: {
    type: String,
    required: true,
    index: true
  },
  // Subcategoría opcional (ej: "Limpiadores", "Labiales")
  subcategoria: String,
  
  // Título y lista de opciones (Ej: tituloOpcion: "Selecciona Tipo de Piel", opciones: ["Grasa", "Seca", "Mixta"])
  tituloOpcion: {
    type: String,
    default: "Opciones disponibles"
  },
  opciones: {
    type: [String], // Soporta letras y números (ej: ["38", "M", "Grasa", "Seca"])
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);
