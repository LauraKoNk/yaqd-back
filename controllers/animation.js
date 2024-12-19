const Animation = require('../models/Animations');

exports.getAllAnimations = (req, res, next) => {
    Animation.find().then(
      (animations) => {
        res.status(200).json(animations);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

exports.createAnimation = (req, res, next) => {
  const animation = new Animation({
    titre: req.body.titre,
    annee_premiere_diffusion: req.body.annee_premiere_diffusion,
    studio: req.body.studio,
    pays: req.body.pays,
    genre: req.body.genre,
    format: req.body.format,
    synopsis: req.body.synopsis,
    image: req.body.image,
    lien: req.body.lien
  });
  animation.save().then(
    () => {
      res.status(201).json({
        message: 'Animation enregistrée !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneAnimation = (req, res, next) => {
    Animation.findOne({
      _id: req.params.id
    }).then(
      (animation) => {
        res.status(200).json(animation);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  
  exports.modifyAnimation = (req, res, next) => {
    const updatedAnimation = {
      titre: req.body.titre,
      annee_premiere_diffusion: req.body.annee_premiere_diffusion,
      studio: req.body.studio,
      pays: req.body.pays,
      genre: req.body.genre,
      format: req.body.format,
      synopsis: req.body.synopsis,
      image: req.body.image,
      lien: req.body.lien,
    };
  
    Animation.updateOne({ _id: req.params.id }, updatedAnimation)
      .then(() => {
        res.status(200).json({ message: 'Animation modifiée avec succès !' });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };
  
  
  exports.deleteAnimation = (req, res, next) => {
    Animation.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Animation suprimée !'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };