const router = require('express').Router();
const singerController = require('../controller/singer.controller');

router.get('/singerform', singerController.singerform);
router.post('/singerinsert', singerController.insert);
router.get('/singerlist', singerController.list);

module.exports = router;