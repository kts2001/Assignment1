var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', indexController.displayLoginPage);


router.post('/login', indexController.processLoginPage);


router.get('/logout', indexController.performLogout);

module.exports = router;

