const express = require('express');
const router = express.Router();
const appController = require('../controllers /app.controller');


router.get('/', appController.index); 
router.get('/courses', appController.courses);
router.get('/contact', appController.contact);
router.get('/about', appController.about);

module.exports = router;
