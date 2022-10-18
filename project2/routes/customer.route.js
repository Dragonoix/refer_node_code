const router = require('express').Router();
const customerController = require('../controllers/customer.controller');


router.get('/customer', customerController.customer);
router.post('/insert', customerController.insert);
router.get('/customerview', customerController.view);

module.exports = router;


