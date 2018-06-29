const mongoose = require ('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    secretKey:{
        type:String,
        required:true
    }
});

//To name and export defined schema:
const User = module.exports = mongoose.model('User',userSchema); // mongoose.model have 2 args: 1. collection name 2. schema name to be followed.
//the collection name created will be [User=users]


//Method to get all users:

module.exports.getAllUsers = function(callback){
    User.find(callback);
}

//Method to add user:
module.exports.addUser=function(user,callback){
    User.create(user,callback);
}

module.exports.removeUser = function(Id,callback){
User.findByIdAndRemove(Id,callback)
}

//method to find details in Database using Username
module.exports.getUserByUserName= function(userName,callback){
    let querry = {
        username:userName
    }  
    User.findOne(querry,callback)
}


//method to find details in Database using SecretKey
module.exports.getUserBySecretKey= function(secretKey,callback){
    let querry = {
        secretKey:secretKey
    }  
    User.findOne(querry,callback)
}

//method to find details in Database using ID:
module.exports.getUserById = function(Id,callback){
    User.findById(Id,callback);
}


module.exports.UpdatePassword = function(user,callback){
    let update = {
        password: user.password
    }
    User.findByIdAndUpdate(user._id,update,callback)
}