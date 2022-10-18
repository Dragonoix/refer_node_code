const router = require('express').Router();
const movieController = require('../controller/movie.controller');

router.get('/movieform', movieController.movieform);
router.post('/movieinsert', movieController.insert);
router.get('/movielist', movieController.list);

module.exports = router;