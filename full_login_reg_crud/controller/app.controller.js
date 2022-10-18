const loginReg = require('../model/app.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

class loginregController {
   
    /*
    
    @Method: User Authentication
    @Description: Filter
    
    */

    async userAuth(req, res, next) {
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


    /*
    
    @Method: Index page 
    @Description: Show the index page 
    
    */


    async index(req, res) {
        try {
            res.render('index');
        }catch(err) {
            throw err;
        }
    }


     /*
    
        @Method: showLogin
        @Description: To show the login page
    
    */
        async showLogin(req, res) {
            try {
                res.render('login', {
                    page_title: 'Login Page',
                    message_failed: req.flash('message_failed'),
                    message_success: req.flash('message_success'),
                    message_warning: req.flash('message_warning')
                });
            }catch(err) {
                throw err;
            }
        }

     /*
    
    @Method: Registration page 
    @Description: Show the Registration page 
    
    */


    async showregistration(req, res) {
        try {
            res.render('register', {
                page_title: 'Registration Page',
                message_success: req.flash('message_success'),
                message_failed: req.flash('message_failed'),
                message_warning: req.flash('message_warning'),
                message_dark: req.flash('message_dark')
            });
        }catch(err) {
            throw err;
        }
    }

    async updatePassword(req, res) {
        try {
            res.render('changePassword', {
                page_title: 'Update the Password',
                message_notExists: req.flash('message_notExists'),
                message_warning: req.flash('message_warning'),
                message_failed: req.flash('message_failed')
            })
        }catch(err) {
            throw err;
        }
    }


    /*
    
    @Method: Submission page 
    @Description: Submit the User data 
    
    */

    async register(req, res) {
        try {
            req.body.name = req.body.name.trim();
            req.body.address = req.body.address.trim();
            req.body.email = req.body.email.trim();

            if(req.body.name && req.body.address && req.body.gender && req.body.email && req.body.contact && req.body.pan && req.body.education && req.body.password && req.body.confirmpassword) {
                let isEmailExists = await loginReg.find({email: req.body.email, isDeleted: false});
                if(!isEmailExists.length) {
                    let isContactExists = await loginReg.find({contact: req.body.contact, isDeleted: false});
                    if(!isContactExists.length) {

                        if(req.body.password === req.body.confirmpassword) {
                            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

                            let saveData = await loginReg.create(req.body);
                            if(saveData && saveData._id) {
                                req.flash('message_success', 'User Registered Successfully!');
                                res.redirect('/registration')
                            }else {
                                req.flash('message_failed', 'Something Went Wrong! Please try again later');
                                res.redirect('/registration')
                            }
                        }else {
                            req.flash('message_warning', 'Password & Confirm Password Is Not Same');
                            res.redirect('/registration')
                        }
                    }else {
                        req.flash('message_dark', 'Contact is already exists');
                        res.redirect('/registration');
                    }
                }else {
                    req.flash('message_dark', 'Email is already exists');
                    res.redirect('/registration');
                }
            }else {
                req.flash('message_warning', 'Field is Empty');
                res.redirect('/registration')
            }
        }catch(err) {
            throw err;
        }
    }

    /*
    
    @Method: Login submission page 
    @Description: Login the user into their account
    
    */


    async postlogin(req, res) {
        try {
            let isUserExists = await loginReg.findOne({
                email: req.body.email
            })
            if(req.body.email && req.body.password){
                if(isUserExists) {
                    let hashPassword = isUserExists.password;
                    if(bcrypt.compareSync(req.body.password, hashPassword)) {
                        // req.flash('message_success', 'User Logged in successfully');
                        // res.redirect('/login')
                        const token = jwt.sign({
                            id: isUserExists._id,
                            name: isUserExists.name,
                            email: isUserExists.email
                        }, 'M3C345FHGY56G', {
                            expiresIn: '3h'
                        });
                        res.cookie('userToken', token);
                        res.redirect('/dashboard');
                    }else {
                        req.flash('message_failed', 'Password does Not Matched');
                        res.redirect('/login')
                    }
                }else {
                    req.flash('message_failed', 'User does not Exists');
                    res.redirect('/login')
                }
                console.log(isUserExists);
            }else{
                    req.flash('message_warning', 'Field is Empty');
                    res.redirect('/login')
                }
        }catch (err) {
            throw err;
        }
    }


    /*
    
    @Method: Dashboard page
    @Description: Show the dashboard page 
    
    */

    async dashboard(req, res) {
        try {
            let allData = await loginReg.find({_id: req.user.id, isDeleted: false});
            res.render('dashboard', {
                user: req.user,
                page_title: 'Information',
                messege_deleted: req.flash('messege_deleted'),
                messege_notDeleted: req.flash('messege_notDeleted'),
                message_success: req.flash('message_success'),
                message_failed: req.flash('message_failed'),
                allData
            });
        }catch(err) {
            throw err;
        }
    }

     /*
    
    @Method: LogOut
    @Description: This will redirect the login page  
    
    */

    async logout(req, res) {
        try {
            res.clearCookie('userToken');
            res.redirect('/login');
        }catch(err) {
            throw err;
        }
    }

    /*
    
    @Method: Soft delete
    @Description: This will delete the data but not from database 
    
    */

    async delete(req, res) {
        try {
            let data = await loginReg.find({_id: req.params.id});
            let deleteData = await loginReg.findByIdAndUpdate(data[0]._id, {isDeleted: true});
            if(deleteData) {
                req.flash('messege_deleted', 'Data is deleted');
                res.redirect('/dashboard');
            }else {
                req.flash('messege_notDeleted', 'Data is not deleted');
                res.redirect('/dashboard');
            }
        }catch(err) {
            throw err;
        }
    }

    /*
    
    @Method: Insert
    @Description: update the password 
    
    */

    async insert(req, res) {
        try {
            req.body.email = req.body.email.trim();
            let isUserExists = await loginReg.findOne({email: req.body.email, isDeleted: false});
            if(!isUserExists) {
                req.flash('message_notExists', 'User is not Exists');
                res.redirect('/updatePassword');
            }else {
                let result = bcrypt.compareSync(req.body.oldPassword, isUserExists.password);
                if(result) {
                    if(req.body.newPassword === req.body.confirmnewPassword) {
                        req.body.newPassword = bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(10));
                        let updateData = {
                            $set: {
                                password: req.body.newPassword,
                            },
                        };
                        let userUpdated = await loginReg.updateOne({email: req.body.email, isDeleted: false}, updateData);
                        if(userUpdated) {
                            req.flash('message_success', 'Password has been updated successfully');
                            res.redirect('/dashboard');
                        }else {
                            req.flash('message_failed', 'Password did not update successfully');
                            res.redirect('/dashboard');
                        }
                    }else {
                        req.flash('message_warning', 'New password did not matched with Confirm Password');
                        res.redirect('/updatePassword');
                    }
                }else {
                    req.flash('message_failed', 'Old password did not match');
                    res.redirect('/updatePassword');
                }
            }
        }catch(err) {
            throw err;
        }
    }
    


}
module.exports = new loginregController();

