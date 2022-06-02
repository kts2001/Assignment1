let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let passport = require('passport');


function requireAuth(req, res, next)
{
    
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


let Business = require('../models/business');

let businessController = require('../controllers/business');


router.get('/',requireAuth, businessController.displayContactList);


router.get('/add',requireAuth, businessController.displayAddPage);


router.post('/add', requireAuth,businessController.processAddPage);


router.get('/edit/:id',requireAuth, businessController.displayEditPage);


router.post('/edit/:id',requireAuth, businessController.processEditPage);


router.get('/delete/:id', businessController.performDelete);

module.exports = router;