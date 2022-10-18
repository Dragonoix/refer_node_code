const router = require('express').Router();
const fileController = require('../controllers/app.controller');
const multer = require('multer');
const { Error } = require('mongoose');
const path = require('path');


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
        if(file.mimetype === 'application/pdf') {
            cb(null, true)
        }else {
            cb(null, false)
            return cb(new Error('Only pdf files are allowed'))
        }
    },
    limits: maxSize
})

router.get('/', fileController.index);
router.post('/insert', upload.single('myfile'), fileController.insert);


module.exports = router;