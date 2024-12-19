const Chaine = require('../models/Chaines');

exports.getAllChaines = (req, res, next) => {
    Chaine.find().then(
      (chaines) => {
        res.status(200).json(chaines);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

exports.createChaine = (req, res, next) => {
  const chaine = new Chaine({
    nom: req.body.nom
  });
  chaine.save().then(
    () => {
      res.status(201).json({
        message: 'Chaine enregistrée !'
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

exports.getOneChaine = (req, res, next) => {
    Chaine.findOne({
      _id: req.params.id
    }).then(
      (chaine) => {
        res.status(200).json(chaine);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  
  exports.modifyChaine = (req, res, next) => {
    const updatedChaine = {
        nom: req.body.nom
    };
    Chaine.updateOne({_id: req.params.id}, updatedChaine)
    .then( () => {
        res.status(201).json({
          message: 'Chaine modifiée avec succès !'
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
  
  exports.deleteChaine = (req, res, next) => {
    Chaine.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Chaine suprimée !'
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