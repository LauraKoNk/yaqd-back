const Diffusion = require('../models/Diffusions');

exports.getAllDiffusions = (req, res, next) => {
  Diffusion.find()
    .populate('animationId', 'titre')  // Récupère uniquement le champ 'titre' de l'animation
    .populate('chaineId', 'nom')       // Récupère uniquement le champ 'nom' de la chaîne
    .then((diffusions) => {
      diffusions.sort((a, b) => a.animationId.titre.localeCompare(b.animationId.titre));
      res.status(200).json(diffusions);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllDiffusionsFiltre = (req, res, next) => {
  Diffusion.find()
  .populate('animationId', 'titre image annee_premiere_diffusion studio pays genre format synopsis lien') // Champs de l'animation
  .populate('chaineId', 'nom') // Champs de la chaîne
  .then(diffusions => {
      const result = diffusions.reduce((acc, diffusion) => {
          const animationId = diffusion.animationId._id;
          if (!acc[animationId]) {
              acc[animationId] = {
                  ...diffusion.animationId._doc,
                  chaines: [],
                  pays: diffusion.animationId.pays || [],
                  genre: diffusion.animationId.genre || [],
                  lien: diffusion.animationId.lien || [],
              };
          }
          acc[animationId].chaines.push(diffusion.chaineId.nom);
          return acc;
      }, {});

      const finalResult = Object.values(result).map(animation => ({
          ...animation,
          chaines: [...new Set(animation.chaines)], // Suppression des doublons
      }));

      // Tri alphabétique par le champ 'titre' de l'animation
      finalResult.sort((a, b) => a.titre.localeCompare(b.titre));

      res.status(200).json({ diffusions: finalResult });
  })
  .catch(error => {
      console.error('Erreur lors de la récupération des diffusions filtrées:', error);
      res.status(400).json({ error });
  });
};


exports.createDiffusion = (req, res, next) => {
  const diffusion = new Diffusion({
    chaineId: req.body.chaineId,
    animationId: req.body.animationId,
  });

  diffusion.save()
    .then(() => res.status(201).json({ message: 'Diffusion enregistrée !' }))
    .catch((error) => res.status(400).json({ error }));
};


exports.getOneDiffusion = (req, res, next) => {
  Diffusion.findOne({ _id: req.params.id })
    .populate('chaine')
    .populate('animation')
    .then((diffusion) => res.status(200).json(diffusion))
    .catch((error) => res.status(404).json({ error }));
};

//Potentiellement pas utile
// exports.updateDiffusion = (req, res, next) => {
//   Diffusion.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Diffusion modifiée !' }))
//     .catch((error) => res.status(400).json({ error }));
// };

exports.deleteDiffusion = (req, res, next) => {
  Diffusion.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Diffusion supprimée !' }))
    .catch((error) => res.status(400).json({ error }));
};
