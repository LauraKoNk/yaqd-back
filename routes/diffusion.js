const express = require('express');
const router = express.Router();
const diffusionCtrl = require('../controllers/diffusion');
const auth = require('../middleware/auth');

router.get('/', auth, diffusionCtrl.getAllDiffusions);
router.get('/filtre', diffusionCtrl.getAllDiffusionsFiltre); 
router.post('/', auth, diffusionCtrl.createDiffusion);
router.get('/:id', auth, diffusionCtrl.getOneDiffusion);
// router.put('/diffusion/:id', diffusionCtrl.updateDiffusion); Potentiellement pas besoin
router.delete('/:id', auth, diffusionCtrl.deleteDiffusion);

module.exports = router;