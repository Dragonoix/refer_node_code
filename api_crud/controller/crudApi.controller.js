const CRUD = require('../ model/crudApi.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class CrudApiController {
    constructor() {}

    /*

    @Method: Welcome
    @Description: To print a welcome message 

    */
    async index(req, res) {
        try {
            return res.status(200).send({
                message: 'Welcome to CRUD API'
            })
        }catch(err) {
            throw err;
        }
    }


     /*
    
    @Method: Registration
    @Description: To register user into the website 

    */

    async registration(req, res) {
        try {
            req.body.fullname = req.body.fullname.trim();
            req.body.email = req.body.email.trim();
            if(!(req.body.fullname && req.body.email && req.body.skills && req.body.password && req.body.confirmpassword)) {
                return res.status(400).send({
                    message: 'Field should not be empty'
                });
            }else {
                req.body.skills = req.body.skills.split(',');
                    req.body.skills = req.body.skills.map(data => {
                        return data.trim();
                    });
                req.body.skills = [...new Set(req.body.skills)];
                let isEmailExists = await CRUD.findOne({email: req.body.email, isDeleted: false});
                if(!isEmailExists) {
                    if(req.body.password === req.body.confirmpassword) {
                        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                        let saveData = await CRUD.create(req.body);
                        if(saveData && saveData._id) {
                            const token = jwt.sign({
                                id: saveData._id,
                            }, 'iam200', {
                                expiresIn: '3d'
                            })
                            saveData = saveData.toObject();
                            saveData.token = token;
                            return res.status(200).send({
                                message: 'Registration is successful',
                                data: saveData
                            })
                        }else {
                            return res.status(400).send({
                                message: 'Registration is not successful',
                                data: {}
                            });
                        }
                    }else {
                        return res.status(400).send({
                            message: 'Password and confirmpassword is not same'
                        })
                    }
                }else {
                    return res.status(400).send({
                        message: 'Email already exists'
                    });
                }
            }
        }catch(err) {
            throw err;
        }
    }

    /*

    @Method: Login
    @Description: Login the user 

    */

    async login(req, res) {
        try {
            req.body.email = req.body.email.trim();
            if(!(req.body.email && req.body.password)) {
                return res.status(400).send({
                    message: 'Field should not be empty'
                });
            }else {
                let isUserexists = await CRUD.findOne({email: req.body.email});
                if(isUserexists) {
                    let hashPassword = isUserexists.password;
                    if(bcrypt.compareSync(req.body.password, hashPassword)) {
                        const token = jwt.sign({
                            id: isUserexists._id,
                            email: isUserexists.email
                        }, 'iam200', {
                            expiresIn: '3d'
                        })
                        isUserexists = isUserexists.toObject();
                        isUserexists.token = token;
                        return res.status(200).send({
                            message: 'logged in successfully',
                            data: isUserexists
                        })
                    }else {
                        return res.status(400).send({
                            message: 'password didnot matched'
                        })
                    }
                }else {
                    return res.status(400).send({
                        message: 'user doesnot exists'
                    })
                }
            }
        }catch(err) {
            throw err;
        }
    }

    /*

    @Method: Update
    @Description: To update the data 

    */

    async update(req, res) {
        try {
            req.body.fullname = req.body.fullname.trim();
            req.body.email = req.body.email.trim();
            if(!(req.body.fullname && req.body.email && req.body.skills)) {
                return res.status(400).send({
                    message: 'Field should not be empty'
                });
            } else {
                req.body.skills = req.body.skills.split(',');
                req.body.skills = req.body.skills.map(data => {
                    return data.trim();
                });
                req.body.skills = [...new Set(req.body.skills)];
                let isUserExists = await CRUD.findOne({_id: req.params.id, isDeleted: false});
                if(isUserExists) {
                    let isEmailExists = await CRUD.findOne({email: req.body.email, isDeleted: false, _id: {$ne: req.params.id}});
                    if(!isEmailExists) {
                        let updateData = await CRUD.findByIdAndUpdate(req.params.id, req.body) 
                        if(updateData) {
                            return res.status(200).send({
                                message: 'Data Updated',
                                data: updateData
                            });
                        }else {
                            return res.status(400).send({
                                message: 'Data is not updated',
                                data: {}
                            });
                        }
                    }else {
                        return res.status(400).send({
                            message: 'User details does not match with our current existing user'
                        });
                    }
                }else {
                    return res.status(400).send({
                        message: 'User does not exists'
                    });
                }
            }   
        }catch(err) {
            throw err;
        }
    }

    /*

    @Method: Fetch
    @Description: Fetch the user data

    */

    async dashboard(req, res) {
        try {
            let allData = await CRUD.findOne({_id: req.user.id, isDeleted: false});
            return res.status(200).send({
                message: 'Data is fetched',
                allData
            })
        }catch(err) {
            throw err;
        }
    }

    /*

    @Method: Hard Delete
    @Description: Delete permanenetly user data from database

    *

    // async delete(req, res) {
    //     try {
    //         let deleteData = await CRUD.findByIdAndRemove(req.params.id);
    //         if(deleteData) {
    //             return res.status(200).send({
    //                 message: 'Data is deleted'
    //             });
    //         }else {
    //             return res.status(400).send({
    //                 message: 'Data is not deleted'
    //             })
    //         }
    //     }catch(err) {
    //         throw err;
    //     }
    // }



    /*

    @Method: Soft Delete
    @Description: Delete only from postman user data from database

    */

        async delete(req, res) {
        try {
            let data = await CRUD.find({_id: req.params.id})
            let deleteData = await CRUD.findByIdAndUpdate(data[0]._id, {isDeleted: true});
            if(deleteData) {
                return res.status(200).send({
                    message: 'Data is deleted'
                });
            }else {
                return res.status(400).send({
                    message: 'Data is not deleted'
                })
            }
        }catch(err) {
            throw err;
        }
    }

    /*

    @Method: Change Password
    @Description: change the password for new login user 

    */

    async changePassword(req, res) {
        try {
            if(!(req.body.email && req.body.oldPassword && req.body.newPassword && req.body.confirmPassword)) {
                return res.status(400).send({
                    message: 'Field should not be empty',
                });
            }else {
                let isUserexists = await CRUD.findOne({email: req.body.email, isDeleted: false});
                if(!isUserexists) {
                    return res.status(400).send({
                        message: 'User doesnot exists in the database',
                    });
                }else {
                    let result = bcrypt.compareSync(req.body.oldPassword, isUserexists.password);
                    if(result) {
                        if(req.body.newPassword === req.body.confirmPassword) {
                            req.body.newPassword =  bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(10));
                        let updateData = {
                                $set: {
                                    password: req.body.newPassword,
                                },
                            };
                            let userUpdated = await CRUD.updateOne({email: req.body.email, isDeleted:false}, updateData);
                            if(userUpdated) {
                                return res.status(200).send({
                                    message: 'Password Updated succesfully',
                                });
                            }else {
                                return res.status(400).send({
                                    message: 'Password did not matched or updated, there are some error',
                                });
                            }
                        }else {
                            return res.status(400).send({
                                message: 'New password did not matched with ConfirmPassword',
                            })
                        }
                    }else {
                        return res.status(400).send({
                            message: 'Old password did not matched',
                        })
                    }
                }
            }
        }catch(err) {
            throw err;
        }
    }

}


module.exports = new CrudApiController();