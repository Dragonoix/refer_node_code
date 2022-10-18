const router = require('express').Router();
const appRouter = require('../controller/crudApi.controller');
const auth = require('../middleware/authJwt');

router.get('/', appRouter.index);
router.post('/registration', appRouter.registration);
router.post('/login', appRouter.login);
router.get('/dashboard', auth.authJwt, appRouter.dashboard);
router.post('/update/:id', appRouter.update);
router.get('/delete/:id', appRouter.delete);
router.post('/changePassword', appRouter.changePassword);

module.exports = router;