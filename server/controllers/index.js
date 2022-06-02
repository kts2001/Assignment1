let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


let jwt = require('jsonwebtoken');
let DB = require('../config/db');


let userModel = require('../models/user');
let User = userModel.User; 


module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
           title: "Login",
           messages: req.flash('loginMessage'),
           
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
             username: user.username,
             password: user.password
                
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 
            });

           

            return res.redirect('/business-list');
        });
    })(req, res, next);
}




module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}