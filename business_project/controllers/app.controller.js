const submission = require('../models/app.model');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');



class Submission {

    /**
     * @Method User Authentication 
     * @Description It is only use to enter the validate user top dashboard page
     */

    async userawth(req, res, next) {
        try {
            if(req.user) {
                next();
            }else {
                res.redirect('/');
            }
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method Index page 
     * @Description Show the home page
     */

    async index(req, res) {
        try {
            res.render('index', {
                message_success: req.flash('message_success')
            });
        }catch(err) {
            throw err;
        }
    }


    /**
    * @Method Submit User
    * @Description Submit the data into the database 
    */

    async register(req, res) {
        try {
            req.body.MyName = req.body.MyName.trim();
            req.body.MyEmail = req.body.MyEmail.trim();
            let isEmailExists = await submission.findOne({MyEmail: req.body.MyEmail});
            if(!isEmailExists) {
                if(req.body.MyPassword === req.body.MyCPassword) {
                    req.body.MyPassword = bycrypt.hashSync(req.body.MyPassword, bycrypt.genSaltSync(10));
                    
                    let saveData = await submission.create(req.body);
                    console.log('Savadat=======', saveData);
                    if(saveData && saveData._id) {
                        req.flash('message_success', 'My Data is Saved');
                        res.redirect('/');
                    }else {
                        req.flash('message_failed', 'My Data is not Saved yet');
                        res.redirect('/registration');
                    }
                }else {
                    req.flash('message_warning', 'Password and confirm password did not match');
                    res.redirect('/registration');
                }
            }else {
                req.flash('message_warning', 'Email is already exists');
                res.redirect('/registration');
            }
        }catch(err) {
            throw err;
        }
    }
    

     /**
     * @Method Registration page 
     * @Description Show the Registration page for the user
     */
    

    async registration(req, res) {
        try {
            res.render('registration', {
                message_failed: req.flash('message_failed'),
                message_warning: req.flash('message_warning')
            });
        }catch(err) {
            throw err
        }
    }

    /**
     * @Method Login page 
     * @Description Show the Login page for the user
    */

    async login(req, res) {
        try {
            res.render('login', {
                message_failed: req.flash('message_failed'),
                message_warning: req.flash('message_warning')
            });
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method User Login
     * @Description User will able to login 
    */

    async postlogin(req, res) {
        try {
            req.body.MyEmail = req.body.MyEmail.trim();
            let userExists = await submission.findOne({MyEmail: req.body.MyEmail})
            if(userExists) {
                let hashPassword = userExists.MyPassword;
                if(bycrypt.compareSync(req.body.MyPassword, hashPassword)) {
                    const token = jwt.sign({
                        id: userExists._id,
                        MyName: userExists.MyName,
                        MyEmail: userExists.MyEmail
                    }, 'MHU565GH', {
                        expiresIn: '3h'
                    });
                    res.cookie('userToken', token);
                    res.redirect('/dashboard')
                }else {
                    req.flash('message_warning', 'Password didnot matched with our database');
                    res.redirect('/login');
                }
            }else {
                req.flash('message_failed', 'User doesnot exists');
                res.redirect('/login');
            }

        }catch(err) {
            throw err
        }
    }

    /**
     * @Method Dashboard Page
     * @Description Show the dashboard page of user 
    */

    async dashboard(req, res) {
        try {   
            let allData = await submission.find({_id: req.user.id});
            res.render('dashboard', {
                user: req.user,
                page_title: 'Dashboard',
                allData
            })
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method User Logout
     * @Description User will be logout 
    */

    async logout(req, res) {
        try {
            res.clearCookie('userToken')
            res.redirect('/')
        }catch(err) {
            throw err;
        }
    }

}




module.exports = new Submission();


