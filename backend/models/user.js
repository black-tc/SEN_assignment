const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");

//creating a user schema for users table collection
const userSchema = mongoose.Schema({
    fname: { type: String },
    lname: { type: String, required: true },
    email: {
        type: String,
        lowercase: true,
        required: true
  
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true },
    joined_on: { type: String, required: true}
    
});

// create variable user
userSchema.plugin(uniqueValidator);
const User = (module.exports = mongoose.model("User", userSchema));

// creating function to get user by id
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};


//get user by username
module.exports.getUserByUsername = function (username, callback) {
    const query = { email: username };
    User.findOne(query, callback);
};

module.exports.getUser = function (user, callback) {
    User.find(user, callback);
};

module.exports.updateStatus = function (_id, status, callback) {
    User.updateOne({ _id: _id }, status, callback)
}

//get user by email
module.exports.getEmail = function (email, callback) {
    const query = { email: email };
    User.findOne(query, callback);
};

// add user fuction
module.exports.addUser = function (newUser, callback) {
    //ecrypting the user passwrod
    bcrypt.genSalt(10, (err, salt) => {
        //creating the hash password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            //setting the user password to the generated hash 
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.updatePassword = function (_id, password, callback) {
    User.updateOne({ _id: _id }, password, callback)
}


module.exports.comparePassword = function (candidateP, has, callback) {
    //comparing the two password
    bcrypt.compare(candidateP, has, (err, isMatch) => {
        try {
            if (err) {
                callback(err);
            }
            callback(null, isMatch)
        } catch (error) {
            callback(error)
        }
    })
}
