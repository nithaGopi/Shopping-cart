var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')

/* GET product  listing. */
router.get('/', function(req, res, next) {
    //res.send('In admin section');
    productHelper.getAllProducts().then((products) => {
        res.render('admin/view-products', { products, admin: true })

    })


});
router.get('/add-products', function(req, res, next) {
    // res.send('In add section');
    res.render('admin/add-products', { admin: true })
});
router.post('/add-products', function(req, res, next) {
    // console.log(req.body);
    //console.log(req.files.image);
    productHelper.addProduct(req.body, (id) => {
        let image = req.files.image;
        image.mv('./public/product-images/' + id + '.jpg', (err, done) => {
            if (!err) {
                res.render("admin/add-products");
            }
        })

    });
});

module.exports = router;