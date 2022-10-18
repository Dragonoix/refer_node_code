const category = require('../models/category.model');

class categoryController {

    /**
     * @Method category form
     * @description show the category form
     */


    async categoryform(req, res) {
        try {
            res.render('category');
        } catch (err) {
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
            let nameExists = await category.findOne({name: req.body.name});
            if(!nameExists) {
                let saveData = await category.create(req.body);
                if(saveData && saveData._id) {
                    console.log('Data is save');
                    res.redirect('/categoryform');
                }else {
                    console.log('Data is not save');
                    res.redirect('/categoryform');
                }

            }else {
                console.log('Name should not be repeated');
                res.redirect('/categoryform');
            }
        } catch (err) {
            throw err;
        }
    }

    /**
    * @Method List
    * @description To show the list
    */

    async list(req, res) {
        try {
            let allData = await category.find({});
            console.log('My data');
            res.render('categorylist', {
                allData
            });
        } catch (err) {
            throw err;
        }
    }


}

module.exports = new categoryController();