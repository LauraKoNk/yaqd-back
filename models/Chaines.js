const mongoose = require('mongoose');

const chaineSchema = mongoose.Schema({
  nom: { type: String, required: true }, // Nom de la chaîne
});

module.exports = mongoose.model('Chaine', chaineSchema);
