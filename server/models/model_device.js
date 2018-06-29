const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    encDec_key: {
        type: String,
        required: true
    },

    
});

//To name and export defined schema:
const Device = module.exports = mongoose.model('Device', deviceSchema); // mongoose.model have 2 args: 1. collection name 2. schema name to be followed.
const Control = require('../models/model_control');
//the collection name created will be [Device=users]


//Method to get all users:

module.exports.getAllDevices = function (callback) {
    Device.find(callback);
}

//Method to add user:
module.exports.addDevice = function (device, callback) {
    Device.create(device, callback);
}

module.exports.removeDevice = function (Id, callback) {
    Control.removeControlersByDeviceID(Id)
    Device.findByIdAndRemove(Id, callback)
}

//method to find details in Database using UserID
module.exports.getDeviceByUserID = function (userId, callback) {
    let querry = {
        userID: userId
    }
    Device.findOne(querry, callback)
}


//method to find details in Database using Username
module.exports.getDeviceByUserName = function (userName ,callback) {
    let querry = {
        userName: userName
    }
    Device.findOne(querry, callback)
}

module.exports.getDeviceByUserID = function (userId, callback) {
    let querry = {
        userID: userId
    }
    Device.findOne(querry, callback)
}

//method to find details in Database using ID:
module.exports.getDevicesById = function (Id, callback) {
    Device.findById(Id, callback);
}


module.exports.UpdateDevice = function (device, callback) {
    let update = {
        fields: device.fields,
        controls: device.controls
    }
    Device.findByIdAndUpdate(device.id, update, callback)
}
module.exports.RemoveDevicesByUserID = function (userId, callback) {
    querry = {
        userID: userId
    }
    Device.find(querry, (err, devices) => {
        devices.forEach(device => {
            Control.removeControlersByDeviceID(device._id)
        });
        
    });
    Device.remove(querry, callback)
}
