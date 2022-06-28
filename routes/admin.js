var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')

/* GET product  listing. */
router.get('/', function(req, res, next) {
    //res.send('In admin section');

    productHelper.getAllProducts().then((products) => {
        // console.log(products);
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
router.get("/delete-product/", function(req, res, next) {

    let id = req.query.id; //req.params.id ...if url like delete-product/7676f8jdhfjhf

    productHelper.deleteProduct(id).then((response) => {

        res.redirect("/admin");
    });

})

module.exports = router;