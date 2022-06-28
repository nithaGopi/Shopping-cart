var db = require('../config/connection');
var collection = require('../config/collections');
var objectId = require('mongodb').ObjectID
module.exports = {

    addProduct: (product, callback) => {
        // console.log(product);
        db.get().collection('product').insertOne(product).then((data) => {
            callback(data.insertedId);

            //console.log("insertID" + data.insertedId);
        })
    },

    //GET ALL PRODUCTS FROM DB
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray();
            // console.log(products);
            resolve(products);
        })

    },
    //DELETE PRODUCT FROM PRODUCT
    deleteProduct: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({ _id: objectId(prodId) }).then((response) => {
                console.log("in delete" + prodId);
                console.log(response);
                resolve();
            })
        })
    }

}