const cart = require('../models/cart.model');
const product = require('../models/product.model');

class productController {

    /**
     * @Method product form
     * @description show the product form
     */


    async cartform(req, res) {
        try {
            let allproduct = await product.find({});
            res.render('cart', {
                allproduct
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
            let prodData = await product.findOne({_id: req.body.product});
            req.body.quantity = parseInt(req.body.quantity);
            let grossamount = (req.body.quantity) * (prodData.price);
            req.body.grossamount = grossamount;
            let saveData = await cart.create(req.body);
            if (saveData && saveData._id) {
                console.log('Data is save');
                res.redirect('/cartform');
            } else {
                console.log('Data is not save');
                res.redirect('/cartform');
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
            let allData = await cart.aggregate([
                // {
                //     $match: {
                //         $expr: {
                //             $and: [
                //                 // ,{ comma before this braces it will in up under $eq movieId
                //                 //     $eq: ['isDeleted', false]  run delete for movie controller
                //                 // }
                //             ]
                //         }
                //     }
                // },

                {
                    $lookup: {
                        from: 'products',
                        let: {
                            productId: '$product'  // $ for local variable as own variable
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ['$_id', '$$productId']
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
                            },
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
                            }
                        ],
                        as: 'product'
                    }
               },
               {
                $unwind: {
                    path: '$product'
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
            console.log('My data');
            res.render('cartlist', {
                allData
            });
        } catch (err) {
            throw err;
        }
    }


}

module.exports = new productController();