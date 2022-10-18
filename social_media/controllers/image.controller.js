const imageModel = require('../models/image.model');


class ImgController {

    /**
     * @Method Photo page
     * @description Show the Image Page 
     */


    async photo(req, res) {
        try {
            res.render('photo', {
                page_title: 'Image Submit Page'
            })
        }catch(err) {
            throw err;
        }
    }


    /**
     * @Method Index page
     * @description Show the Social page with respective data 
     */


     async index(req, res) {
        try {
            let allData = await imageModel.find({})
            res.render('index', {
                page_title: 'Social Media Page',
                allData,
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
                req.body.myImage = req.file.filename;
            }
            req.body.myName = req.body.myName.trim();
            let saveData = await imageModel.create(req.body);
            if(saveData && saveData._id) {
                console.log('Data is save');
                res.redirect('/photo')
            }else {
                console.log('Data is not save');
                res.redirect('/photo')
            }
        }catch(err) {
            throw err;
        }
    }


    /**
     * @Method Insert page
     * @description Show the Social page with respective data 
     */

     async social(req, res) {
        try {

            console.log('req.bodyyyy', req.body, req.body.myImage);
            let data = await imageModel.findOne({_id: req.body.myImage})
            console.log('daataaaaaa', data);
            if(data) {
                let updateData = await imageModel.updateOne({
                    _id: req.body.myImage
                }, {
                    $inc: { 
                        like: req.body.like,
                        dislike: req.body.dislike
                     }
                })
                if(updateData) {
                    console.log('Data has been updated');
                    res.redirect('/')
                }else {
                    console.log('Data is not updated');
                    res.redirect('/');
                }

            }else {
                console.log('No data found');
                res.redirect('/');
            }
        }catch(err) {
            throw err;
        }
    }
}


module.exports = new ImgController()