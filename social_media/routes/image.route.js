const router = require('express').Router();
const imageController = require('../controllers/image.controller');
const path = require('path');
const multer = require('multer');
const { Error } = require('mongoose');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const maxSize = 1*1024*1024;
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, true)
        }else {
            cb(null, false)
            return cb(new Error('Only images are allowed ( jpg, png, jpeg)'))
        }
    },
    limits: maxSize
})

router.get('/photo', imageController.photo);
router.post('/insert', upload.single('myImage'), imageController.insert);
router.get('/', imageController.index);
router.post('/socialinsert', imageController.social);

module.exports = router;

