const mongoose = require('mongoose');

//Defiing Schema for data:

const DataSchema = mongoose.Schema({
    deviceID:{
        type:String,
        required:true
    },
    data:{
        type:Array,
        default:[]
    },
    time:{
        type:Number,
        default: new Date()
    }
});

//Naming and exporting the data mongoose model:

const Data = module.exports = mongoose.model('Data',DataSchema);


///Method to get all Data:
module.exports.getAllData = function(callback){
    Data.find(callback);
}

//Method to add Data:
module.exports.addData=function(data,callback){
    console.log(data);
    
    Data.create(data,callback);
}

module.exports.getDataByDeviceID = function (Id, callback) {
    let query = {
        deviceID: Id
    }
    Data.find(query, callback)
}