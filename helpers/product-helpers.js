var db = require('../config/connection');
var collection = require('../config/collections');
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

    }

}