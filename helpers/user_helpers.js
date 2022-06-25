var db = require('../config/connection');
var collection = require('../config/collections');
const bcrypt = require('bcryptjs');

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
                        console.log("inside user helper ...valid login");
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

    }
    //LOGIN...............................................................    



}