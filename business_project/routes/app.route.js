const router = require('express').Router();
const appController = require('../controllers/app.controller');


router.get('/', appController.index);
router.get('/registration', appController.registration);
router.get('/login', appController.login);
router.post('/register', appController.register);
router.post('/postlogin', appController.postlogin);
router.get('/dashboard', appController.userawth, appController.dashboard);
router.get('/logout', appController.logout);

module.exports = router;