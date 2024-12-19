const mongoose = require('mongoose');

const diffusionSchema = mongoose.Schema({
  animationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animation', required: true }, // Référence à l'animation
  chaineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chaine', required: true }, // Référence à la chaîne
});

module.exports = mongoose.model('Diffusion', diffusionSchema);
