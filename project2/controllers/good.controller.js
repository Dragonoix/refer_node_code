const goods = require('../models/goods.model');

class Goods {

    async goods(req, res) {
        try {
            res.render('goods', {
                page_title: 'Goods Page',
                message_success: req.flash('message_success'),
                message_failed: req.flash('message_failed')
            })
        }catch(err) {
            throw err;
        }
    }  
    
    async goodsinsert(req, res) {
        try {
            req.body.name = req.body.name.trim();
            let saveData = await goods.create(req.body);
            if(saveData && saveData._id) {
                req.flash('message_success', 'Data is save');
                res.redirect('/goods');
            }else {
                req.flash('message_failed', 'Data is not save');
                res.redirect('/goods');
            }

        }catch(err) {
            throw err;
        }
    }

    async goodsview(req, res) {
        try {
            let allData = await goods.find({});
            res.render('goodsview', {
                page_title: 'Goods Information',
                allData
            })
        }catch(err) {
            throw err;
        }
    }

}



module.exports = new Goods();


