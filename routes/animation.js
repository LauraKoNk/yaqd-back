const express = require('express');
const router = express.Router();
const animationCtrl = require('../controllers/animation');
const auth = require('../middleware/auth');

router.get('/', auth, animationCtrl.getAllAnimations);
router.post('/', auth, animationCtrl.createAnimation);
router.get('/:id', auth, animationCtrl.getOneAnimation);
router.put('/:id', auth, animationCtrl.modifyAnimation);
router.delete('/:id', auth, animationCtrl.deleteAnimation);

module.exports = router;