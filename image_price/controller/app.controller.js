const img = require('../model/app.model');

class ImgController {

    /**
     * @Method Index page
     * @description Show the registration page with respective data 
     */


    async index(req, res) {
        try {
            let allData = await img.find({});
            res.render('index', {
                page_title: 'Submit Page',
                message_success: req.flash('message_success'),
                message_failed: req.flash('message_failed'),
                allData
            })
        }catch(err) {
            throw err;
        }
    }


    /**
     * @Method Insert
     * @description Insert the respective data 
     */

    
    async insert(req, res) {
        try{
            if(req.file && req.file.filename) {
                req.body.image = req.file.filename;
            }
            req.body.artistName = req.body.artistName.trim();
            let saveData = await img.create(req.body);
            if(saveData && saveData._id) {
                req.flash('message_success', 'Image and its information has been uploaded!');
                res.redirect('/')
            }else {
                req.flash('message_failed', 'Something Went Wrong! Please try again later');
                res.redirect('/')
            }
        }catch(err) {
            throw err;
        }
    }
}


module.exports = new ImgController();