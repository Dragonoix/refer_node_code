const Author = require('../models/app.model');
const fs = require('fs');

class ImageController {

    /*
        @Method: Submit Page  
        @Description: Show the submit page for Image data 
    
    
    */

    async index(req, res) {
        try {
            res.render('index', {
                page_title: 'Submit Page'
            });
        }catch(err) {
            console.log(err);
            throw err;
        }
    }

    /*
    
        @Method: Check 
        @Description: to show the table of data
    
    */

        async check(req, res) {
            try {
                let allData = await Author.find({isDeleted: false});
                // console.log(allData);
                res.render('check', {
                    messege: req.flash('messege'),
                    page_title: 'Checking',
                    allData
                })
            }catch(err) {
                throw err;
            }
        }

     /*
    
        @Method: Insert
        @Description: to Insert the data
    
    */
        async insert(req, res) {
            try {
                if(req.file && req.file.filename) {
                    req.body.image = req.file.filename;
                }
                req.body.name = req.body.name.trim();
                req.body.number = req.body.number.trim();
                req.body.email = req.body.email.trim();
                console.log(req.body.tags);
                req.body.tags = req.body.tags.split(',');
                req.body.tags = req.body.tags.map(data => {
                    return data.trim();
                })

                req.body.tags = [...new Set(req.body.tags)];
                let isEmailExists = await Author.find({email: req.body.email, isDeleted: false});
                if(!isEmailExists.length) {
                    let isContactExists = await Author.find({number: req.body.number, isDeleted: false});
                    if(!isContactExists.length) {
                        let saveData = await Author.create(req.body);
                        if(saveData && saveData._id) {
                            console.log('Data Save!!!');
                            res.redirect('/');
                        }else {
                            console.log('Data Not Save!!!');
                            res.redirect('/');
                        }
                    }else {
                        console.log('Contact Already Exists!!!');
                        res.redirect('/check')
                    }
                }else {
                    console.log('Email Already Exists!!!');
                    res.redirect('/check')
                }
            }catch (err) {
                throw err;
            }
        }

     /*
    
        @Method: edit
        @Description: to show the edit form
    
    */

        async edit(req, res) {
            try {
                // console.log(req.params.id);
                let data = await Author.find({_id: req.params.id, isDeleted: false});
                res.render('edit', {
                    page_title: 'Edit the page',
                    allData: data[0]
                });
            }catch(err) {
                throw err;
            }
        }
    /*
    
        @Method: upadte
        @Description: update the form
    
    */

        async update(req, res) {
            try {
                let oldData = await Author.find({_id: req.body.id});
                if(req.file && req.file.filename) {
                    req.body.image = req.file.filename;
                    fs.unlinkSync(`./public/uploads/${oldData[0].image}`);
                }
                req.body.name = req.body.name.trim();
                req.body.number = req.body.number.trim();
                req.body.email = req.body.email.trim();
                req.body.tags = req.body.tags.split(',');
                req.body.tags = req.body.tags.map(data => {
                    return data.trim();
                })
                req.body.tags = [...new Set(req.body.tags)];
                let isEmailExists = await Author.find({email: req.body.email, isDeleted: false, _id: {$ne: req.body.id}});
                if(!isEmailExists.length) {
                    let isContactExists = await Author.find({number: req.body.number, isDeleted: false, _id: {$ne: req.body.id}});
                    if(!isContactExists.length) {
                        let updateData = await Author.findByIdAndUpdate(req.body.id, req.body);
                        if(updateData) {
                            // console.log('Data Save!!!');
                            req.flash('messege', 'Data edited Successfully!');
                            res.redirect('/check');
                        }else {
                            console.log('Data Not Save!!!');
                            res.redirect('/check');
                        }
                    }else {
                        console.log('Contact Already Exists!!!');
                        res.redirect('/check')
                    }
                }else {
                    console.log('Email Already Exists!!!');
                    res.redirect('/check')
                }
            }catch(err) {
                throw err;
            }
        }

      /*
    
        @Method: Soft delte
        @Description: Delete the form data but not from database
    
    */

        async delete(req, res) {
            try {
                let deleteData = await Author.findByIdAndUpdate(req.params.id, {isDeleted: true});
                if(deleteData) {
                    console.log('My data is deleted');
                    res.redirect('/check');
                }else {
                    console.log('My data is not deleted');
                    res.redirect('/check');
                }
            }catch(err) {
                throw err;
            }
        }
    
}


module.exports = new ImageController();