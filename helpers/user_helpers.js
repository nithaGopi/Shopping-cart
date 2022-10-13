var db = require('../config/connection');
var collection = require('../config/collections');
const bcrypt = require('bcryptjs');
var objectId = require('mongodb').ObjectID

module.exports = {

    //SIGNUP............................................................
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {

            // userData.userPassword = await bcrypt.hash(userData.userPassword, 10);
            delete userData.userPasswordRepeat;
            userData.userPassword = bcrypt.hashSync(userData.userPassword, 10);
            //const verified = bcrypt.compareSync(userData.userPassword, passwordHash);



            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data) => {
                //console.log(data);
                resolve(data.insertedId);
            })



        })

    },
    //SIGNUP.............................................................

    //LOGIN .............................................................
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {

            let response = {};
            response['loginStatus'] = false;


            //find the user record 0f userData[email]
            let userRecord = await db.get().collection(collection.USER_COLLECTION).findOne({ userEmail: userData.userEmail });
            if (userRecord) {
                //password matching
                bcrypt.compare(userData.userPassword, userRecord.userPassword).then((status) => {

                    if (status) { //login success
                        // console.log("inside user helper ...valid login");
                        response['user'] = userRecord;
                        response['loginStatus'] = true;
                        resolve({ response });

                    } else { //login failed ,incorrect password

                        resolve({ response });

                    }

                })



            } else {
                //There is no user with this email id
                resolve({ loginStatus });
            }





        })

    },
    //LOGIN...............................................................   
    addToCart: (productId, userId) => {

        return new Promise(async (resolve, reject) => {
            let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: objectId(userId) })
            if (userCart) {
                db.get().collection(collection.CART_COLLECTION).updateOne({ user: objectId(userId) }, {

                    $push: { products: objectId(productId) }


                }).then((response) => {
                    resolve()
                })

            } else { //update the product in cart  else create new cart
                let catObj = { //create an object , with userId and product id's as an array to store in cart collection
                    user: objectId(userId),
                    products: [objectId(productId)]
                }

                let userCart = await db.get().collection(collection.CART_COLLECTION).insertOne(catObj).then((response) => {
                    resolve()
                })

            }


        })
    },
    getCartProducts: (userId) => {

        return new Promise(async (resolve, reject) => {

            let cartItems = await db.get().collection(collection.CART_COLLECTION).aggregate([{
                    $match: { user: objectId(userId) },


                },
                {
                    $lookup: {
                        from: collection.PRODUCT_COLLECTION,
                        let: { proList: '$products' }, //$products = product id array from product collection
                        pipeline: [ //pipeline is for condition to match products collection and cart collection
                            {

                                $match: {
                                    $expr: {
                                        $in: ['$_id', "$$proList"]
                                    }
                                }

                            }



                        ], //pipeline ends here
                        as: 'cartItems'

                    }
                }
            ]).toArray()
            resolve(cartItems[0].cartItems)

        })
    },
    getCartCount: (userId) => {
        return new Promise(async (resolve, reject) => {
            let cartItems = await db.get().collection(collection.CART_COLLECTION).findOne({ user: objectId(userId) })
            let count = 0;
            if (cart) {
                count = cartItems.product.length
            }
            resolve(count)
        })



    }



}