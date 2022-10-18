const product = require('../models/product.model');
const category = require('../models/category.model');

class productController {

    /**
     * @Method product form
     * @description show the product form
     */


    async productform(req, res) {
        try {
            let allcategory = await category.find({});
            res.render('product', {
                allcategory
            });
        }catch (err) {
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
            let nameExists = await product.findOne({name: req.body.name});
            if (!nameExists) {
                let saveData = await product.create(req.body);
                if (saveData && saveData._id) {
                    console.log('Data is save');
                    res.redirect('/productform');
                }else {
                    console.log('Data is not save');
                    res.redirect('/productform');
                }
            }else {
                console.log('Name should not be repeated');
                res.redirect('/productform');
            }
        }catch (err) {
            throw err;
        }
    }

    /**
    * @Method List
    * @description To show the list
    */

    async list(req, res) {
        try {
            let allData = await product.aggregate([
                // {
                //     $lookup: {
                //         from: 'categories',// always take small letter while making database name at the end of model
                //         localField: 'category', // name taken from product model category itself
                //         foreignField: '_id',
                //         as: 'category'// take same as we take on localfield 
                //     }
                // },
                // {
                //     $unwind: {
                //         path: '$category'// we are breaking the array format for category
                //     }
                // }

                {
                    $lookup: {
                        from: 'categories',
                        let: {
                            categoryId: '$category'
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ['$_id', '$$categoryId']
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
                        as: 'category'
                    }
                },
                {
                    $unwind: {
                        path: '$category'
                    }
                },
                {
                    $project: {
                        createdAt: 0,
                        updatedAt: 0
                    }
                }
            ]);
            console.log(allData);
            console.log('My data');
            res.render('productlist', {
                allData
            });
        } catch (err) {
            throw err;
        }
    }


}

module.exports = new productController();