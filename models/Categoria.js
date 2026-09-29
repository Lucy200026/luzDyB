const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  // Si padre es null/undefined, es una CATEGORÍA GENERAL.
  // Si tiene el nombre de una Categoría General, es una SUBCATEGORÍA.
  categoriaPadre: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Categoria', categoriaSchema);
