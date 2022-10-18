const customer = require('../models/customer.model');


class Customer {

    async customer(req, res) {
        try {
            res.render('customer', {
                page_title: 'Customer Page',
                message_success: req.flash('message_success'),
                message_failed: req.flash('message_failed')
            })
        }catch(err) {
            throw err;
        }
    }  
    
    async insert(req, res) {
        try {
            req.body.name = req.body.name.trim();
            req.body.address = req.body.address.trim();
            let saveData = await customer.create(req.body);
            if(saveData && saveData._id) {
                req.flash('message_success', 'Data is save');
                res.redirect('/customer');
            }else {
                req.flash('message_failed', 'Data is not save');
                res.redirect('/customer');
            }

        }catch(err) {
            throw err;
        }
    }

    async view(req, res) {
        try {
            let allData = await customer.find({});
            res.render('customerview', {
                page_title: 'Customer Information',
                allData
            })
        }catch(err) {
            throw err;
        }
    }

}



module.exports = new Customer();


