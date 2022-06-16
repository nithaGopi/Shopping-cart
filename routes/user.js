var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers');

/* GET home page. List all products*/
router.get('/', function(req, res, next) {

    productHelper.getAllProducts().then((products) => {
        console.log(products);
        res.render('user/view-products', { products, admin: false })

    })
});

module.exports = router; //....