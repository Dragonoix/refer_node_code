const router = require('express').Router();
const directorController = require('../controller/director.controller');

router.get('/directorform', directorController.directorform);
router.post('/directorinsert', directorController.insert);
router.get('/directorlist', directorController.list);

module.exports = router;