const goods = require('../models/goods.model');
const sales = require('../models/sales.model');
const customer = require('../models/customer.model');

class Sales {

    async sales(req, res) {
        try {
            let allcustomer = await customer.find({})
            let allgoods = await goods.find({})
            res.render('sales', {
                page_title: 'Sales Page',
                message_success: req.flash('message_success'),
                message_failed: req.flash('message_failed'),
                allcustomer,
                allgoods
            })
        }catch(err) {
            throw err;
        }
    }  
    
    async salesinsert(req, res) {
        try {
            req.body.name = req.body.name.trim();
            let prodData = await goods.findOne({_id: req.body.goods});
            req.body.quantity = parseInt(req.body.quantity);
            let totalPrice = (req.body.quantity) * (prodData.price);
            req.body.totalPrice = totalPrice;
            let totalQuantity = 0;
            let salesDetail = await sales.find({customer: req.body.customer, goods: req.body.goods})
            if(salesDetail.length) {
                salesDetail.map((data) => {
                    totalQuantity += data.quantity;
                })
                let totalUserProdQuantity = (req.body.quantity) + (totalQuantity); 
                console.log('quantity', req.body.quantity, totalUserProdQuantity , totalQuantity);
                if(totalUserProdQuantity>5) {
                    req.flash('message_failed', 'You have already exceeded the max quantity of this product. Kindly choose another product from the list!!');
                    res.redirect('/sales');
                }else {
                    let saveSalesData = await sales.create(req.body);
                    if(saveSalesData && saveSalesData._id) {
                        req.flash('message_success', 'Data is save');
                        res.redirect('/sales');
                    }else {
                        req.flash('message_failed', 'Data is not save');
                        res.redirect('/sales');
                    }
                }
            }else {
                let saveData = await sales.create(req.body);
                if(saveData && saveData._id) {
                    req.flash('message_success', 'Data is save');
                    res.redirect('/sales');
                }else {
                    req.flash('message_failed', 'Data is not save');
                    res.redirect('/sales');
                }
            }

        }catch(err) {
            throw err;
        }
    }

    async index(req, res) {
        try {
            let allData = await sales.aggregate([
                {
                    $lookup: {
                        from: 'goods',
                        let: {
                            goodsId: '$goods'  // $ for local variable as own variable
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ['$_id', '$$goodsId']
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
                        ],
                        as: 'goods'
                    }
                },
                {
                    $unwind: {
                        path: '$goods'
                    }
                },
                {
                    $lookup: {
                        from: 'customers',
                        let: {
                            customerId: '$customer'  // $ for local variable as own variable
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ['$_id', '$$customerId']
                                            },
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
                        ],
                        as: 'customer'
                    }
                },
                {
                    $unwind: {
                        path: '$customer'
                    }
                },
            {
                $project: {
                    createdAt: 0,
                    updatedAt: 0
                }
            },
            ]);
            console.log('My data');
            console.log(allData);
            allData.map((data) => {
                let salesIdStr = data._id.toString();
                data._id = salesIdStr.slice(salesIdStr.length-4, salesIdStr.length)
                console.log('My ID Data');
                console.log(data);
            })
            res.render('index', {
                page_title: 'Sales Information',
                allData
            })
        }catch(err) {
            throw err;
        }
    }

}



module.exports = new Sales();


