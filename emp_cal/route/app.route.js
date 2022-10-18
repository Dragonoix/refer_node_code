const router = require('express').Router();

const empController = require('../controller/app.controller');


router.get('/', empController.index);
router.post('/insert', empController.insert);


module.exports = router;

