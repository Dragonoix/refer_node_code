const router = require('express').Router();
const goodsController = require('../controllers/good.controller');


router.get('/goods', goodsController.goods);
router.post('/goodsinsert', goodsController.goodsinsert);
router.get('/goodsview', goodsController.goodsview);

module.exports = router;


