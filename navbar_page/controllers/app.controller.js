const login = require('../models/app.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

class Navbar {


    /**
     * @Method User Authentication
     * @Description This is used to check the authority of a user to enter a page after login
     */

    async userAuth(req, res, next) {
        try {
            if(req.user) {
                next();
            }else {
                res.redirect('/login')
            }
        }catch(err) {
            throw err;
        }
    }



    /**
     * @Method Register 
     * @Description This is used to register a user
     */

    async insert(req, res) {
        try {
            req.body.name = req.body.name.trim();
            req.body.email = req.body.email.trim();
            let isEmailExixts = await login.findOne({email: req.body.email});
            if(!isEmailExixts) {
                if(req.body.password === req.body.confirmpassword) {
                    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                    let saveData = await login.create(req.body);
                    if(saveData && saveData._id) {
                        req.flash('message_success', 'Data is submitted');
                        res.redirect('/login');
                    }else {
                        req.flash('message_failed', 'Something went wrong');
                        res.redirect('/login');
                    }
                }else {
                    req.flash('message_warning', 'Password and Confirm Password is not same');
                    res.redirect('/login');
                }
            }else {
                req.flash('message_warning', 'Email already exists');
                res.redirect('/login');
            }
        }catch(err) {
            throw err;
        }
    }

    /**
     * @Method Login Page
     * @Description This is a Login Page 
     */

    async login(req, res) {
        try {
            res.render('registration', {
                user: req.user,
                page_title: 'Website',
                message_success: req.flash('message_success'),
                message_failed: req.flash('message_failed'),
                message_warning: req.flash('message_warning'),
            })
        }catch(err) {
            throw err;
        }
    }

    async postlogin(req, res) {
        try {
            let isUserExists = await login.findOne({email: req.body.email});
            if(isUserExists) {
                let hassPassword = isUserExists.password;
                if(bcrypt.compareSync(req.body.password, hassPassword)) {
                    const token = jwt.sign({
                        id: isUserExists._id,
                        name: isUserExists.name,
                        email: isUserExists.email
                    }, 'MOUT7675', {
                        expiresIn: '3h'
                    });
                    res.cookie('userToken', token);
                    res.redirect('/dashboard');
                }else {
                    req.flash('message_failed', 'Password does not match');
                    res.redirect('/login');
                }
            }else {
                req.flash('message_warning', 'User doesnot exists');
                res.redirect('/login');
            }
        }catch(err) {
            throw err;
        }
    }


    /**
     * @Method Dashboard
     * @Description This is a part to show the data
     */

    async dashboard(req, res) {
        try {
            let allData = await login.find({_id: req.user.id});
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
     * @Method Logout
     * @Description Back to login and main page
     */

    async logout(req, res) {
        try {
            res.clearCookie('userToken');
            res.redirect('/login');
        }catch(err) {
            throw err;
        }
    }

}



module.exports = new Navbar();