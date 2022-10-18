const router = require('express').Router();
const categoryController = require('../controllers/category.controller');

router.get('/categoryform', categoryController.categoryform);
router.post('/categoryinsert', categoryController.insert);
router.get('/categorylist', categoryController.list);

module.exports = router;