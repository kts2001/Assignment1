let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Business = require('../models/business');

module.exports.displayContactList = (req, res, next) => {
    Business.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            

            res.render('business/list', {title: 'Business Contacts', ContactList: contactList});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('business/add', {title: 'Add Contact'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Business({
        "Name": req.body.Name,
        "Phone": req.body.Phone,
        "Email": req.body.Email,
        
    });

    Business.create(newContact, (err, Business) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/business-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Business.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('business/edit', {title: 'Edit Contact', business: contactToEdit})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContact = Business({
        "_id": id,
        "Name": req.body.Name,
        "Phone": req.body.Phone,
        "Email": req.body.Email,
        
    });

    Business.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/business-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Business.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/business-list');
        }
    });
}