var express = require('express');
var router = express.Router();

var productHelper = require('../helpers/product-helpers');
//var userHelper = require('../helpers/user_helpers');
var userHelper = require('../helpers/user_helpers')


//login validation  function

const verifyLogin = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/login');
    }
}



/* GET home page. List all products*/
router.get('/', function(req, res, next) {
    let user = false;
    if (req.session.user) {
        user = req.session.user;
    }

    //console.log(user.userName);


    //.........................................
    productHelper.getAllProducts().then((products) => {
        //console.log(products);
        res.render('user/view-products', { products, user })

    })
});
router.get('/login', function(req, res, next) {
    if (req.session.loggedIn) {
        res.redirect('/');
    } else {
        res.render('user/login', { "loginErr": req.session.loginErr });
        req.session.loginErr = false;
    }
});


router.post('/login', function(req, res, next) {
    userHelper.doLogin(req.body).then((response) => {
        // console.log(response);
        // console.log(response.response.loginStatus);
        //console.log(response.user);

        if (response.response.loginStatus == true) {
            //login success page
            //console.log("login success");
            req.session.loggedIn = true;
            req.session.user = response.response.user;
            res.redirect('/');
        } else {
            req.session.loginErr = true;
            res.redirect('/login');

        }


    })
});
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

router.get('/signup', function(req, res, next) {
    res.render('user/signup')
});
router.post('/signup', function(req, res, next) {
    userHelper.doSignup(req.body).then((response) => {
        console.log(response);
    })

})
router.get("/cart", verifyLogin, function(req, res, next) {
    res.render("user/cart")
})

module.exports = router; //....