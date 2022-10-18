const router = require('express').Router();
const salesController = require('../controllers/sales.controller');


router.get('/sales', salesController.sales);
router.post('/salesinsert', salesController.salesinsert);
router.get('/', salesController.index);

module.exports = router;


