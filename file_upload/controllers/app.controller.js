const filemodel = require('../models/app.model');


class File {

    async index(req, res) {
        try {
            res.render('index');
        }catch(err) {
            throw err;
        }
    }


    async insert(req, res) {
        try {
            if(req.file && req.file.filename) {
                req.body.myfile = req.file.filename;
            }
            
            let saveData = await filemodel.create(req.body);
            if(saveData && saveData._id) {
                console.log('File is saved');
                res.redirect('/')
            }else {
                console.log('File is not saved');
                res.redirect('/');
            }

        }catch(err) {
            throw err;
        }
    }

}


module.exports = new File();