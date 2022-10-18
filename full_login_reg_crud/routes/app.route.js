const router = require('express').Router();
const appRouter = require('../controller/app.controller');

router.get('/', appRouter.index);
router.get('/login', appRouter.showLogin);
router.get('/registration', appRouter.showregistration);
router.post('/register', appRouter.register);
router.post('/postlogin', appRouter.postlogin);
router.get('/dashboard', appRouter.userAuth, appRouter.dashboard);
router.get('/updatePassword', appRouter.updatePassword);
router.post('/insert', appRouter.insert);
router.get('/logout', appRouter.logout);
router.get('/delete/:id', appRouter.delete);


module.exports = router;
