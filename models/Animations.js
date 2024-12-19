// Importation de Mongoose pour définir et manipuler des schémas MongoDB
const mongoose = require('mongoose');

// Définition du schéma de données pour une animation
const animationSchema = mongoose.Schema({
  titre: { type: String, required: true }, // Titre de l'animation
  annee_premiere_diffusion: { type: String, required: true }, // Année de la première diffusion
  studio: { type: String, required: false }, // Studio de production
  pays: { type: [String], required: false }, // Pays d'origine
  genre: { type: [String], required: true }, // Genre de l'animation
  format: { type: String, required: true }, // Format (ex : série, film, OVA, etc.)
  synopsis: { type: String, required: true }, // Synopsis
  image: { type: String, required: false }, // URL de l'image
  lien: { type: [String], required: false }, // URL de l'image
});

// Exportation du modèle "Thing" basé sur le schéma défini pour l'utiliser ailleurs dans l'application
module.exports = mongoose.model('Animation', animationSchema);
