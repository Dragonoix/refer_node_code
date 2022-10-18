const router = require('express').Router();
const productController = require('../controllers/product.controller');

router.get('/productform', productController.productform);
router.post('/productinsert', productController.insert);
router.get('/productlist', productController.list);

module.exports = router;