const router = require('express').Router();
const appController = require('../controllers/app.controller');


router.get('/login', appController.login);
router.post('/postlogin', appController.postlogin)
router.post('/insert', appController.insert);
router.get('/dashboard', appController.userAuth, appController.dashboard);
router.get('/logout', appController.logout);



module.exports = router;




