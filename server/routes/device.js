const express = require('express');
var uid = require('uid')
//Requiring express router
const router = express.Router();

const Device = require('../models/model_device'); //require device model
const Users = require('../models/model_user'); //require user model to validate userID.

router.get("/getalldevice", (req, res) => {
    Device.getAllDevices((err, devices) => { //function to get the list of all users, 
        //only admins will have the permission to run this.
        if (err)
            res.json({
                success: false,
                msg: err
            });
        else {
            res.json({
                success: true,
                msg: devices
            });
        }
    });
});

router.post('/adddevice', (req, res) => {
    //checking request body:
    if (!req.body.name || !req.body.secretKey || !req.body.userName) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    Users.getUserBySecretKey(req.body.secretKey, (err, reqUser) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            if (!reqUser) {
                res.json({
                    success: false,
                    msg: "Invalid User.!"
                });
            } else {
                var key = uid(10)
                let device = {
                    name: req.body.name,
                    userName: req.body.userName,
                    encDec_key: key
                }

                //To add devices:
                Device.addDevice(device, (err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err
                        });
                    } else {
                        Device.getDeviceByUserName(req.body.userName, (err, reqDevice) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: err
                                });
                            } else if (reqDevice) {
                                res.json({
                                    success: true,
                                    msg: "Device Added and your encryption key is " + key + "  and deviceId is "+reqDevice._id
                                });
                            }

                        })
                    }
                });
            }
        }
    });

});

//Method to delete Device
router.post('/deleteDevice', (req, res) => {
    //checking request body:
    if (!req.body.id) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    Device.getDevicesById(req.body.id, (err, reqDevice) => {
        console.log(reqDevice);

        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            if (!reqDevice) {
                res.json({
                    success: false,
                    msg: "Invalid Device.!"
                });
            } else {

                //To delete devices:
                Device.removeDevice(req.body.id, (err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err
                        });
                    } else {
                        res.json({
                            success: true,
                            msg: "Successfully Deleted.!"
                        });
                    }
                });
            }
        }
    });

});

//Method to Update Devices:

router.post('/updateDevice', (req, res) => {
    //checking request body:
    if (!req.body.fields || !req.body.id || !req.body.controls) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    Device.getDevicesById(req.body.id, (err, reqDev) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        } else {
            if (!reqDev) {
                res.json({
                    success: false,
                    msg: "Invalid Device.!"
                });
            } else {
                let device = {
                    id: reqDev._id,
                    fields: req.body.fields,
                    controls: req.body.controls
                }

                //To update devices:
                Device.UpdateDevice(device, (err) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err
                        });
                    } else {
                        res.json({
                            success: true,
                            msg: "Successfully Updated.!"
                        });
                    }
                });
            }
        }
    });

});



//Exporting the router as a Module
module.exports = router;