const User = require("../models/user");
const Admin = require("../models/admin_user");
const bioForm = require("../models/forms");
const config = require("../config/database");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("../config/cryptojs");
// const bcrypt = require('bcryptjs');
// const passwordResetToken = require('../models/resettoken');
const nodemailer = require('nodemailer');
var moment = require('moment');
const authController = require('../controllers/auth')
var currenttime = new moment().format('YYYY-MM-DD HH:MM:SS');

router.get("/getUser", (req, res, next) => {
    //Gets User By Id
    exports.getUserByUsername = function (req, res, next) {
        var username = req.query.username;
        User.findByUsername(username, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.send(result);
            }
        });
    };
});

router.post("/saveUser", (req, res, next) => {
    //save user
    exports.saveUser = function (req, res, next) {
        var user = new User(req.body.data);
        user.isDeleted = false;
        user.save(function (err) {
            if (err) {
                next(err);
            } else {
                //res.json(user);
                res.send(true);
            }
        });
    };
});

router.post("/deleteUser", (req, res, next) => {
    //delete user
    exports.deleteUser = function (req, res, next) {
        console.log(req.body.data);
        User.findByIdAndUpdate(
            req.body.data, { $set: { isDeleted: true } },
            function (err, user) {
                if (err) next(err);
                res.send(user);
            }
        );
    };
});

router.post("/updateUser", (req, res, next) => {
    //save user
    exports.updateUser = function (req, res, next) {
        try {
            var user = new User(req.body.data);
            User.findByIdAndUpdate(user.userId, user, function (err, user) {
                if (err)
                    next(err);
                res.json({ success: true, msg: 'user updeted' });
            });
        } catch (error) {
            console.log(err);
        }

    };
});

//register route
router.post("/signup", (req, res, next) => {
    // console.log('here now');
        let newUser = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            active: req.body.active,
            joined_on: currenttime,
            isAdmin: false
        });
    
    
    
        //adding the user to the 
        User.addUser(newUser, async (err, user) => {
            try {
                if (err) {
                    next(err);
                } else {
                    const token = jwt.sign({ user }, config.secret, {
                        //this to force the user to log in after every 5hours, that is when the token gets expired, just for security purpose
                        expiresIn: "5h"
                    });
    
                    //getting the username name from the database
                    //ecrypting the username using crypto
                    //let encryptedUname = user.username);
            let encryptedEmail = crypto.encrypt(user.email);
            let enjwt = crypto.encrypt(token);
            let _id_bidder = user._id;
            let _name = user.fname;

            //sending email with activation link to the user 
            try{
                //mail credentials 
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'test.bites123@gmail.com',
                    pass: 'testbites!@#'
                }
            });

            //mail body template
            const mailOptions = {
                from: 'noreply@nust.na <test.bites123@gmail.com>', 
                to: req.body.email, 
                subject: 'Account Activation Link', 
                html: `<html>

                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <style type="text/css">
                        @media screen {
                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 400;
                                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                            }
                
                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 700;
                                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                            }
                
                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 400;
                                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                            }
                
                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 700;
                                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                            }
                        }
                
                        /* CLIENT-SPECIFIC STYLES */
                        body,
                        table,
                        td,
                        a {
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }

                        h1{
                            font-size:28px !important;
                        }
                
                        table,
                        td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }
                
                        img {
                            -ms-interpolation-mode: bicubic;
                        }
                
                        /* RESET STYLES */
                        img {
                            border: 0;
                            height: auto;
                            line-height: 100%;
                            outline: none;
                            text-decoration: none;
                        }
                
                        table {
                            border-collapse: collapse !important;
                        }
                
                        body {
                            height: 100% !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                        }
                
                        /* iOS BLUE LINKS */
                        a[x-apple-data-detectors] {
                            color: inherit !important;
                            text-decoration: none !important;
                            font-size: inherit !important;
                            font-family: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                        }
                
                        /* MOBILE STYLES */
                        @media screen and (max-width:600px) {
                            h1 {
                                font-size: 32px !important;
                                line-height: 32px !important;
                            }
                        }
                
                        /* ANDROID CENTER FIX */
                        div[style*="margin: 16px 0;"] {
                            margin: 0 !important;
                        }
                    </style>
                </head>
                
                <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                    <!-- HIDDEN PREHEADER TEXT -->
                    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">Hi ${_name} We're thrilled to have you here! Get ready to dive into your new account. </div>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <!-- LOGO -->
                        <tr>
                            <td bgcolor="#E87722" align="center">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#E87722" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                        <img src"http://localhost:4200/assets/img/logo.png" style="width: 20%;">
                                            <h1 style="font-size: 28px !important; font-weight:800 text-transform="uppercase" ; margin: 2;">Welcome ${_name}!</h1> 
                                            
                                            <img src=""  />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just click the button below;</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" align="left">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td align="center" style="border-radius: 3px;" bgcolor="#E87722"><a href="http://localhost:4200/auth/verification/${_id_bidder}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #E87722; display: inline-block;">Confirm Account</a></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr> <!-- COPY -->
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                                        </td>
                                    </tr> <!-- COPY -->
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;"><a href="http://localhost:4200/auth/verification/${_id_bidder}" target="_blank" style="color: #E87722;">http://localhost:4200/auth/verification/${_id_bidder}</a></p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                      
                    </table>
                </body>
                
                </html>` // plain text body
            };

            await transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log("Error is", err)
                else
                    console.log("console log", info);

                res.json({
                    info: info
                })
            });
        }
        catch(err){
            console.log(err)
        }
                    res.json({
                        success: true,
                        token: enjwt,
                        user: {
                            username: user.username,
                            email: encryptedEmail,
                            fname: user.fname,
                            lname: user.lname,
                            
                        },
                        message: `${req.body.email} `,
                    });
                }
            } catch (error) {
                console.log(err)
            }
    
        });
    });


//register route
router.post("/admin_signup", (req, res, next) => {
    // console.log('here now');
        let newUser = new Admin({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            active: req.body.active,
            joined_on: currenttime,
            isAdmin: true
        });
    
    
    
        //adding the user to the 
        Admin.addUser(newUser, async (err, user) => {
            try {
                if (err) {
                    next(err);
                } else {
                    const token = jwt.sign({ user }, config.secret, {
                        //this to force the user to log in after every 5hours, that is when the token gets expired, just for security purpose
                        expiresIn: "5h"
                    });
    
                    //getting the username name from the database
                    //ecrypting the username using crypto
                    //let encryptedUname = user.username);
            let encryptedEmail = crypto.encrypt(user.email);
            let enjwt = crypto.encrypt(token);
            let _id_bidder = user._id;
            let _name = user.fname;

            //sending email with activation link to the user 
            try{
                //mail credentials 
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'test.bites123@gmail.com',
                    pass: 'testbites!@#'
                }
            });

            //mail body template
            const mailOptions = {
                from: 'noreply@nust.na <test.bites123@gmail.com>', 
                to: req.body.email, 
                subject: 'Account Activation Link', 
                html: `<html>

                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <style type="text/css">
                        @media screen {
                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 400;
                                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                            }
                
                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 700;
                                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                            }
                
                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 400;
                                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                            }
                
                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 700;
                                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                            }
                        }
                
                        /* CLIENT-SPECIFIC STYLES */
                        body,
                        table,
                        td,
                        a {
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }

                        h1{
                            font-size:28px !important;
                        }
                
                        table,
                        td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }
                
                        img {
                            -ms-interpolation-mode: bicubic;
                        }
                
                        /* RESET STYLES */
                        img {
                            border: 0;
                            height: auto;
                            line-height: 100%;
                            outline: none;
                            text-decoration: none;
                        }
                
                        table {
                            border-collapse: collapse !important;
                        }
                
                        body {
                            height: 100% !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                        }
                
                        /* iOS BLUE LINKS */
                        a[x-apple-data-detectors] {
                            color: inherit !important;
                            text-decoration: none !important;
                            font-size: inherit !important;
                            font-family: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                        }
                
                        /* MOBILE STYLES */
                        @media screen and (max-width:600px) {
                            h1 {
                                font-size: 32px !important;
                                line-height: 32px !important;
                            }
                        }
                
                        /* ANDROID CENTER FIX */
                        div[style*="margin: 16px 0;"] {
                            margin: 0 !important;
                        }
                    </style>
                </head>
                
                <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                    <!-- HIDDEN PREHEADER TEXT -->
                    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">Hi ${_name} We're thrilled to have you here! Get ready to dive into your new account. </div>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <!-- LOGO -->
                        <tr>
                            <td bgcolor="#E87722" align="center">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#E87722" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                        <img src"http://localhost:4200/assets/img/logo.png" style="width: 20%;">
                                            <h1 style="font-size: 28px !important; font-weight:800 text-transform="uppercase" ; margin: 2;">Welcome ${_name}!</h1> 
                                            
                                            <img src=""  />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just click the button below;</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" align="left">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td align="center" style="border-radius: 3px;" bgcolor="#E87722"><a href="http://localhost:4200/auth/verification/${_id_bidder}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #E87722; display: inline-block;">Confirm Account</a></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr> <!-- COPY -->
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                                        </td>
                                    </tr> <!-- COPY -->
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;"><a href="http://localhost:4200/auth/verification/${_id_bidder}" target="_blank" style="color: #E87722;">http://localhost:4200/auth/verification/${_id_bidder}</a></p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                      
                    </table>
                </body>
                
                </html>` // plain text body
            };

            await transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log("Error is", err)
                else
                    console.log("console log", info);

                res.json({
                    info: info
                })
            });
        }
        catch(err){
            console.log(err)
        }
                    res.json({
                        success: true,
                        token: enjwt,
                        user: {
                            username: user.username,
                            email: encryptedEmail,
                            fname: user.fname,
                            lname: user.lname,
                            
                        },
                        message: `${req.body.email} `,
                    });
                }
            } catch (error) {
                console.log(err)
            }
    
        });
    });

router.get('/activation/:id', authController.accountActivation)


    //emailValidation route
router.post("/checkEmail", (req, res, next) => {
    //const email = req.body.email;
    //console.log(req.body);

    User.getEmail(req.body.email, (err, user) => {
        if (err) {
            res.status(500).json({ success: false, err: err });
        } else if (!user) {
            res.status(200).json({ success: true, match: false, });
        } else if (user) {
            res.status(200).json({ success: true, match: true });
        }
    });
});


//aunthenticate users on login
router.post('/login_authenticate', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    var token = req.headers["authorization"];

    User.getUserByUsername(username, (err, user) => {
        
        try {
            if (err) {
            //return error
            
            next(err);
            }
            else if (!user.active) {
                res.json ({
                    success: false,
                    msg: "Account not activated, please click the link sent to your email to activate your account."
                })
            }
            else {
                User.comparePassword(password, user.password, (err, isMatch) => {
                    if (err) {
                        next(err)
                    }
                    else if (isMatch) {
                        const token = jwt.sign({ user }, config.secret, {
                            //token expires in 24 hours
                            expiresIn: "24h"
                        });

                        let encryptedEmail = crypto.encrypt(user.email);
                        let enjwt = crypto.encrypt(token);

                        //return json if password is a match
                        res.json({
                            success: true,
                            token: enjwt,
                            user: {
                                // id: user._id,
                                username: user.username,
                                email: encryptedEmail,
                                active: user.active,
                                first_name: user.fname
                                
                            }
                        });


                        //return error message if the password doesn't match
                    } else {
                        res.json({ success: false, msg: "Username or password is incorrect." });
                    }
                    
                });
            }
        }catch (error) {
            // console.log('error here', error);
            res.json({ success: false, msg: "Username or password is incorrect." });
        }
    });
});

//aunthenticate admin users on login
router.post('/login_authenticate_admins', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    var token = req.headers["authorization"];

    Admin.getUserByUsername(username, (err, user) => {
        
        try {
            if (err) {
            //return error
            
            next(err);
            }
            else if (!user.active) { 
                res.json ({
                    success: false,
                    msg: "Account not activated, please click the link sent to your email to activate your account."
                })
            }
            else {
                Admin.comparePassword(password, user.password, (err, isMatch) => {
                    if (err) {
                        next(err)
                    }
                    else if (isMatch) {
                        const token = jwt.sign({ user }, config.secret, {
                            //token expires in 24 hours
                            expiresIn: "24h"
                        });

                        let encryptedEmail = crypto.encrypt(user.email);
                        let enjwt = crypto.encrypt(token);

                        //return json if password is a match
                        res.json({
                            success: true,
                            token: enjwt,
                            user: {
                                // id: user._id,
                                username: user.username,
                                email: encryptedEmail,
                                active: user.active,
                                first_name: user.fname,
                                last_name: user.lname,
                                isAdmin: user.isAdmin
                                
                            }
                        });


                        //return error message if the password doesn't match
                    } else {
                        res.json({ success: false, msg: "Username or password is incorrect." });
                    }
                    
                });
            }
        }catch (error) {
            // console.log('error here', error);
            res.json({ success: false, msg: "Username or password is incorrect." });
        }
    });
});

//router to dicrypt the token
router.post("/decryptdata", (req, res) => {
    let data = crypto.decrypt(req.body.data);
    res.json({ success: true, data: data });
});

router.get("/get-all-users", (req, res, next) => {
    User.getUser({}, (err, user) => {
        if (err) 
            next(err);
        res.status(200).json({ data: user });
    });
});

//register route
router.post("/submit-bio-form", (req, res, next) => {
    // console.log('here now');
    try {
        let newForm = new bioForm({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            personnel_number: req.body.personnel_number,
            address: req.body.address,
            title: req.body.title,
            phone: req.body.phone,
            faculty: req.body.faculty,
            position: req.body.position,
            work_phone: req.body.work_phone,
            department: req.body.department,
            postal_address: req.body.postal_address,
            phone_home: req.body.phone_home,
            next_of_kin: req.body.next_of_kin,
            next_of_kin_phone: req.body.next_of_kin_phone,
            qualification: req.body.qualification,
            institution: req.body.institution,
            field_study: req.body.field_study,
            specialization: req.body.specialization,
            // language_description: req.body.language_description,
            
                language_1: req.body.language_1,
                speak_1: req.body.speak_1,
                read_1: req.body.read_1,
                write_1: req.body.write_1,
           
            language_description_2: {
                language_2: req.body.language_2,
                speak_2: req.body.speak_2,
                read_2: req.body.read_2,
                write_2: req.body.write_2,
            },
            language_description_3: {
                language_3: req.body.language_3,
                speak_3: req.body.speak_3,
                read_3: req.body.read_3,
                write_3: req.body.write_3,
            },
            language_description_4: {
                language_4: req.body.language_4,
                speak_4: req.body.speak_4,
                read_4: req.body.read_4,
                write_4: req.body.write_4,
            },
            language_description_5: {
                language_5: req.body.language_5,
                speak_5: req.body.speak_5,
                read_5: req.body.read_5,
                write_5: req.body.write_5,
            },
            society_1: {
                society_name_1: req.body.society_name_1,
                society_position_1: req.body.society_position_1,
                date_joined_1: req.body.date_joined_1,
            },
            society_2: {
                society_name_2: req.body.society_name_2,
                society_position_2: req.body.society_position_2,
                date_joined_2: req.body.date_joined_2,
            },
            society_3: {
                society_name_3: req.body.society_name_3,
                society_position_3: req.body.society_position_3,
                date_joined_3: req.body.date_joined_3,
            },
            society_4: {
                society_name_4: req.body.society_name_4,
                society_position_4: req.body.society_position_4,
                date_joined_4: req.body.date_joined_4,
            },
            body_1: {
                body_name_1: req.body.body_name_1,
                body_position_1: req.body.body_position_1,
                date_joined__body_1: req.body.date_joined_body_1,
            },
            body_2: {
                body_name_2: req.body.body_name_2,
                body_position_2: req.body.body_position_2,
                date_joined_body_2: req.body.date_joined_body_2,
            },
            body_3: {
                body_name_3: req.body.body_name_3,
                body_position_3: req.body.body_position_3,
                date_joined_body_3: req.body.date_joined_body_3,
            },
            body_4: {
                body_name_4: req.body.body_name_4,
                body_position_4: req.body.body_position_4,
                date_joined_body_4: req.body.date_joined_body_4,
            },
            publication_1: {
                publication_name_1: req.body.publication_name_1,
                date_publication_1: req.body.date_publication_1,
                publisher_name_1: req.body.publisher_name_1,
                subject_publication_1: req.body.date_publication_1,
                co_author_1: req.body.publisher_name_1
            },
            publication_2: {
                publication_name_2: req.body.publication_name_2,
                date_publication_2: req.body.date_publication_2,
                publisher_name_2: req.body.publisher_name_2,
                subject_publication_2: req.body.date_publication_2,
                co_author_2: req.body.publisher_name_2
            },
            publication_3: {
                publication_name_3: req.body.publication_name_3,
                date_publication_3: req.body.date_publication_3,
                publisher_name_3: req.body.publisher_name_3,
                subject_publication_3: req.body.date_publication_3,
                co_author_3: req.body.publisher_name_3
            },
            publication_4: {
                publication_name_4: req.body.publication_name_4,
                date_publication_4: req.body.date_publication_4,
                publisher_name_4: req.body.publisher_name_4,
                subject_publication_4: req.body.date_publication_4,
                co_author_4: req.body.publisher_name_4
            },

        });

        console.log(newForm);

        bioForm.addForm(newForm, (err, forms) => {
            try {
                if (err)
                    next(err);
               
                return res.status(200).json({ success: true, msg: "Form successfully submitted" });
            } catch (error) {
                console.log(error)
            }
        })

    }catch (error) {
        console.log(error);
    }
    });

//route to get all the active users
router.get("/get-all-bio-forms", (req, res, next) => {
    try {
        bioForm.getAllForms({}, (err, profile) => {
            if (err)
                next(err)
            res.status(200).json({ data: profile });
        });
    } catch (error) {
        next(error)
    }

});
module.exports = router;