const movie = require('../models/movie.model');
const director = require('../models/director.model');

class movieController{

    /**
     * @Method movie form
     * @description show the movie form
     */


    async movieform(req, res) {
        try {
            let allDirector = await director.find({});
            res.render('movie', {
                allDirector
            });
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
            req.body.budget = req.body.budget.trim();
            let saveData = await movie.create(req.body);
            if(saveData && saveData._id) {
                console.log('Data is save');
                res.redirect('/movieform');
            }else {
                console.log('Data is not save');
                res.redirect('/movieform')
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
            let allData = await movie.aggregate([
                {
                    $lookup: {
                        from: 'directors',// always take small letter while making database name at the end of model
                        localField: 'director', // name taken from movie model director itself
                        foreignField: '_id',
                        as: 'director'// take same as we take on localfield 
                    }
                },
                {
                    $project: {
                        createdAt: 0,
                        updatedAt: 0,
                        'director.createdAt': 0,
                        'director.updatedAt': 0
                    }
                },
                {
                    $unwind: {
                        path: '$director'// we are breaking the array format for director
                    }
                }
            ]);
            console.log(allData);
            res.render('listmovie', {
                allData
            })
        }catch(err) {
            throw err;
        }
    }


}

module.exports = new movieController();