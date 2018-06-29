const mongoose = require('mongoose');

// Defining the schema for Control
const ControlSchema = mongoose.Schema({

    deviceID: {
        type: String,
        required: true
    },
    data: {
        type: Array,
        default: []
    },
    time: {
        type: Number,
        default: new Date()
    }
});

// Naming and exporting  the Control mongoose model
const Control = module.exports = mongoose.model('Control', ControlSchema);

// Method to get all the Data

module.exports.getAllControl = function (callback) {
    Control.find(callback);
};

module.exports.addControl = function (controller, callback) {
    Control.create(controller, callback);
};

module.exports.getControlByDeviceID = function (deviceID, callback) {
    let query = {
        deviceID: deviceID
    }
    Control.find(query, callback)
}
module.exports.updateControl = function (control, callback) {
    let query = {
        deviceID: control.id
    }
    let update = {
        data: control.data,
        time: new Date()
    }
    Control.findOneAndUpdate(query, update, callback)
}

module.exports.removeControlersByDeviceID = function (deviceId, callback) {
    //console.log("aa gya");
    
    let query = {
        deviceID: deviceId
    }
    Control.findOneAndRemove(query,callback)
}