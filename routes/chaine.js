const express = require('express');
const router = express.Router();
const chaineCtrl = require('../controllers/chaine');
const auth = require('../middleware/auth');

router.get('/', auth, chaineCtrl.getAllChaines);
router.get('/filtre', chaineCtrl.getAllChaines);
router.post('/', auth, chaineCtrl.createChaine);
router.get('/:id', auth, chaineCtrl.getOneChaine);
router.put('/:id', auth, chaineCtrl.modifyChaine);
router.delete('/:id', auth, chaineCtrl.deleteChaine);

module.exports = router;
