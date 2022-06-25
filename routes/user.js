var express = require('express');
var router = express.Router();

var productHelper = require('../helpers/product-helpers');
//var userHelper = require('../helpers/user_helpers');
var userHelper = require('../helpers/user_helpers')


/* GET home page. List all products*/
router.get('/', function(req, res, next) {

    productHelper.getAllProducts().then((products) => {
        //console.log(products);
        res.render('user/view-products', { products })

    })
});
router.get('/login', function(req, res, next) {
    res.render('user/login');
});


router.post('/login', function(req, res, next) {
    userHelper.doLogin(req.body).then((response) => {
        // console.log(response);
        console.log(response.response.loginStatus);
        //console.log(response.user);

        if (response.response.loginStatus == true) {
            //login success page
            console.log("login success");
            res.redirect('/');
        } else {
            //login unsuccessful
            //console.log("invalid login inside user.js");
            res.redirect('/login');

        }


    })
});

router.get('/signup', function(req, res, next) {
    res.render('user/signup')
});
router.post('/signup', function(req, res, next) {
    userHelper.doSignup(req.body).then((response) => {
        console.log(response);
    })

})
module.exports = router; //....