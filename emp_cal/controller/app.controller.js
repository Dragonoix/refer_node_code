const emp = require('../model/app.model');

class EmpController {

    /**
     * @Method Index page
     * @description Show the registration page with respective data 
     */


    async index(req, res) {
        try {
            let allData = await emp.find({});
            res.render('index', {
                page_title: 'Submit Page',
                message_success: req.flash('message_success'),
                message_failed: req.flash('message_failed'),
                allData
            })
        }catch(err) {
            throw err;
        }
    }


    /**
     * @Method Insert
     * @description Insert the respective data 
     */

    
    async insert(req, res) {
        try{
            req.body.employeeName = req.body.employeeName.trim();
            req.body.basicSalary = parseFloat(req.body.basicSalary);
            req.body.DA = parseFloat((req.body.DA * req.body.basicSalary)/100);   // calculating by percentage as DA as 20% 30% * basicsalary / 100
            req.body.HRA =  parseFloat((req.body.HRA * req.body.basicSalary)/100);
            const grossSalary = (req.body.basicSalary) + (req.body.DA) + (req.body.HRA);
            req.body.grossSalary = grossSalary;
                let saveData = await emp.create(req.body);
                if(saveData && saveData._id) {
                    req.flash('message_success', 'Total amount is being calculated!');
                    res.redirect('/')
                }else {
                    req.flash('message_failed', 'Something Went Wrong! Please try again later');
                    res.redirect('/')
                }
        }catch(err) {
            throw err;
        }
    }
}


module.exports = new EmpController();