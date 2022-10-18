const singer = require('../models/singer.model');
const movie = require('../models/movie.model');

class singerController{

    /**
     * @Method singer form
     * @description show the singer form
     */


    async singerform(req, res) {
        try {
            let allmovie = await movie.find({});
            res.render('singer', {
                allmovie
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
            let saveData = await singer.create(req.body);
            console.log(saveData);
            if(saveData && saveData._id) {
                console.log('Data is save');
                res.redirect('/singerform');
            }else {
                console.log('Data is not save');
                res.redirect('/singerform')
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
            let allData = await singer.aggregate([
                // {
                //     $match: {
                //         $expr: {
                //             $and: [
                //                 {
                //                     $eq: ['isDeleted', false] when I run the logic for delete at singer controller
                //                 }
                //             ]
                //         }
                //     }
                // },
               {
                    $lookup: {
                        from: 'movies',
                        let: {
                            movieId: '$movie'  // $ for local variable as own variable
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ['$_id', '$$movieId']
                                            }
                                            // ,{ comma before this braces it will in up under $eq movieId
                                            //     $eq: ['isDeleted', false]  run delete for movie controller
                                            // }
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    createdAt: 0,
                                    updatedAt: 0
                                }
                            },
                            {
                                $lookup: {
                                    from: 'directors',
                                    let: {
                                        directorId: '$director'
                                    },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        {
                                                            $eq: ['$_id', '$$directorId']
                                                        }
                                                    ]
                                                }
                                            }
                                        },
                                        {
                                            $project: {
                                                createdAt: 0,
                                                updatedAt: 0
                                            }
                                        }
                                    ],
                                    as: 'director'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$director'
                                }
                            }
                        ],
                        as: 'movie'
                    }
               },
               {
                $unwind: {
                    path: '$movie'
                }
               },
               {
                $project: {
                    createdAt: 0,
                    updatedAt: 0
                }
               },
            ]);
            console.log(allData);
            // allData.map(data => {
            //     console.log(data.movie.director);
            // })
            res.render('listsinger', {
                allData
            })
        }catch(err) {
            throw err;
        }
    }


}

module.exports = new singerController();