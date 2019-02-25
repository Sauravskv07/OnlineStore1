
const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
var pug=require('pug');
var multer = require('multer');
const fs=require('fs');
var upload = multer({ dest: './public/assets/images' })
const logger=require('morgan');
//const signup=require('./routes/signUp.js').signup_create_post;
const viewProducts=require('./displayProducts').viewProducts;
var Products=require('./models').Products;
var Users=require('./models').Users;
const {body, validationResult}=require('express-validator/check');
const {sanitizeBody}=require('express-validator/filter');
var session=require('express-session')

var signup_create_post=
[
        upload.none(),
        body('user_name').isLength({min:1}).trim().withMessage('Name field is empty').isAscii('Name of the user must only consist of alphabets'),
        body('user_phone').trim().isMobilePhone().withMessage('Enter a correct mobile phone number'),
        body('user_email','Email is not valid').isEmail().trim().normalizeEmail(),
        body('user_street_no').optional({ checkFalsy: true }).trim().isNumeric().withMessage('Street number must consist of numeric data'),
        body('user_address').isLength({min:1}).trim().withMessage('Address must be filled for delivering the products').isAscii().withMessage('Address Must contain only alphabets and numbers'),
        body('user_password').isLength({min:1}).trim().withMessage('Password field is empty'),
        
        sanitizeBody('user_email').escape().trim(),
        sanitizeBody('user_name').escape().trim(),
        sanitizeBody('user_address').escape().trim(),
        sanitizeBody('user_password').escape().trim(),
    (req,res,next)=>
    {
        if(req.session.user && req.cookies.user_id)
            {
                res.redirect('/Products');
            }
        else
            {
                next();
            }
    },
    (req,res)=>{
        upload.none();
        //console.log('hi reached here');
        //console.log(req.body.user_name);
        const errors=validationResult(req);
		let user=new Users(
			{
				userName:req.body.user_name,
				userPassword:req.body.user_password,
				userEmail:req.body.user_email,
                userDeliveryAddress:
                {
                    StreetNumber:req.body.user_street_no,
                    AddressLine1:req.body.user_address,
                    CityName:req.body.user_city
                },
				userPhoneNumber:req.body.user_phone
			}
        );
        //console.log(user);
        if(!errors.isEmpty())
        {   
            console.log(errors);
            var errorArray=errors.array();
            res.render('signUp.pug',{userInput:user,errors:errorArray                                                                                                                                                                                   });
            return;
        }
        else
        {
            //console.log('Hi i reached here too');
            Users.findOne({'userEmail':req.body.user_email}).exec((error,record)=>
            {
                //console.log('finding some record');
                if(error)
                {
                    console.log('There has been error while checking previous users record');
                }
                if(record)
                {
                    console.log('i was here i don\'t know why');
                    res.render('signUp.pug',{userInput:user,errors:['This email address already exist in the database']});
                }
                else
                {
                    console.log('finally reached to saving block');
                    user.save((error,results)=>
                    {
                    if(error)
                        {
                        //console.error(error);
                        process.exit(1);
                        }
                    else
                        {
                        //console.log('reached here too in the renderign block');
                        Products.find({},(err, docs)=> {
                                //console.log(docs);
                            res.render('Products.pug',{arrayProducts: docs});
                            });
                        }	
                    });

                }
            });
    
        }


    }
];
module.exports.signup_create_post=signup_create_post;