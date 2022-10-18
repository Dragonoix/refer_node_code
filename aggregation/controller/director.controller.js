const director = require('../models/director.model');

class directorController{

    /**
     * @Method director form
     * @description show the director form
     */


    async directorform(req, res) {
        try {
            res.render('director');
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method Insert
     * @description save the data into database
     */

    async insert(req, res) {
        try {
            req.body.name = req.body.name.trim();
            req.body.origin = req.body.origin.trim();
            let saveData = await director.create(req.body);
            if(saveData && saveData._id) {
                console.log('Data is save');
                res.redirect('/directorform');
            }else {
                console.log('Data is not save');
                res.redirect('/directorform')
            }
        }catch(err) {
            throw err;
        }
    }

     /**
     * @Method List
     * @description To show the list
     */

    async list(req, res) {
        try {
            let allData = await director.find({});
            res.render('listdirector', {
                allData
            })
        }catch(err) {
            throw err;
        }
    }


}

module.exports = new directorController();