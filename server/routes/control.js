const express = require('express');
//Requiring express router
const router = express.Router();

const Control = require('../models/model_control');
const Data = require('../models/model_data');
const Device = require('../models/model_device');

router.get("/", (req, res) => {
    Control.getAllControl((err, control) => { //function to get the list of all data, 
        //only admins will have the permission to run this.
        if (err)
            res.json({
                success: false,
                msg: err
            });
        else {
            res.json({
                success: true,
                msg: control
            });
        }
    });

});


router.post('/', (req, res) => {
    //checking request body:
    if (!req.body.deviceID || !req.body.data) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    Device.getDevicesById(req.body.deviceID, (err, reqDevice) => {
        if (err) {
            res.json({
                success: false,
                msg: err,
            });
        }
        else {
            if (!reqDevice) {
                res.json({
                    success: false,
                    msg: "Invalid Device.!"
                });
            }
            else {
                Control.getControlByDeviceID(reqDevice._id, (err, ContArr) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err,
                        });
                    }
                    else {
                        if (ContArr.length == 0) {
                            cntrl = {
                                deviceID: reqDevice._id,
                                data: req.body.data
                            }
                            Control.addControl(cntrl, (err) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: err,
                                    });
                                }
                                else {
                                    res.json({
                                        success: true,
                                        msg: "New Controller Added.!"
                                    });
                                }
                            });
                        }
                        else {
                            cntrL = {
                                id: reqDevice._id,
                                data: req.body.data
                            }
                            Control.updateControl(cntrL, (err) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: err,
                                    });
                                }
                                else {
                                    res.json({
                                        success: true,
                                        msg: "Controller Updated.!"
                                    });
                                }
                            });
                        }
                    }
                })

            }
        }

    });

});

//Exporting the router as a Module
module.exports = router;