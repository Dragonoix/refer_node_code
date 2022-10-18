const router = require('express').Router();
const cartController = require('../controllers/cart.controller');

router.get('/cartform', cartController.cartform);
router.post('/cartinsert', cartController.insert);
router.get('/cartlist', cartController.list);

module.exports = router;