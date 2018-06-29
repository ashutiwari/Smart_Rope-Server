const express = require('express');
var uid=require('uid')
//Requiring express router
const router = express.Router();
//requiring model for User
const Users = require('../models/model_user');
const Device = require('../models/model_device');
//Get request function
router.get("/getalluser", (req, res) => {
    Users.getAllUsers((err, users) => { //function to get the list of all users, only admins will have the permission to run this.
        if (err)
            res.json({
                success: false,
                msg: err
            });
        else {
            res.json({
                success: true,
                msg: users
            });
        }
    });
});

//Post request function: 
router.post('/adduser', (req, res) => {
    //checking request body:
    if (!req.body.name || !req.body.username || !req.body.password) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    else {
        //function for searching the username for given username in the database, so that no two users can have same username
        Users.getUserByUserName(req.body.username, (err, requser) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                })
            else {
                if (requser) {
                    res.json({
                        success: false,
                        msg: "username already exists."
                    })
                }
                else {
                    var key=uid(10)
                    let user = {
                        name: req.body.name,
                        username: req.body.username,
                        password: req.body.password,
                        secretKey:key
                    }
                    //function to add user to the database:
                    Users.addUser(user, (err) => {
                        if (err)
                            res.json({
                                success: false,
                                msg: err
                            });
                        else
                            res.json({
                                success: true,
                                msg: "Added Succesfully and your Secret Key is "+key
                            });
                    });
                }
            }
        });
    }
});



//Method to make the user login:
router.post('/login', (req, res) => {
    //checking request body:
    if (!req.body.username || !req.body.password) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    else {
        let user = {
            username: req.body.username,
            password: req.body.password
        }
        Users.getUserByUserName(req.body.username, (err, requser) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                })
            else {
                if (!requser) {
                    res.json({
                        success: false,
                        msg: "username doesn't exists."
                    });
                }
                else {
                    if (user.password != requser.password) {
                        res.json({
                            success: false,
                            msg: "Wrong Password"
                        });
                    }
                    else {
                        res.json({
                            success: true,
                            msg: {
                                username: requser.username,
                                name: requser.name,
                                id: requser._id
                            }
                        });
                    }
                }

            }

        });
    }

});


//Method to Update Password:
router.post('/updatePasswd', (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.newPasswd) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    else {
        let user = {
            username: req.body.username,
            password: req.body.password
        }
        Users.getUserByUserName(req.body.username, (err, requser) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                })
            else {
                if (!requser) {
                    res.json({
                        success: false,
                        msg: "username doesn't exists."
                    });
                }
                else {
                    if (user.password != requser.password) {
                        res.json({
                            success: false,
                            msg: "Wrong Password"
                        });
                    }
                    else {
                        requser.password = req.body.newPasswd;
                        Users.UpdatePassword(requser, (err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: err
                                });
                            }
                            else {
                                res.json({
                                    success: true,
                                    msg: "Password Successfully Updated.!"
                                });
                            }

                        })

                    }
                }
            }

        });
    }
});


//Method to delete user:
router.post('/deleteUser', (req, res) => {
    //checking request body:
    if (!req.body.username || !req.body.password) {
        res.json({
            success: false,
            msg: 'Insufficient Data'
        });
    }
    else {
        let user = {
            username: req.body.username,
            password: req.body.password
        }
        Users.getUserByUserName(req.body.username, (err, requser) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                })
            else {
                if (!requser) {
                    res.json({
                        success: false,
                        msg: "username doesn't exists."
                    });
                }
                else {
                    if (user.password != requser.password) {
                        res.json({
                            success: false,
                            msg: "Wrong Password"
                        });
                    }
                    else {

                        Users.removeUser(requser._id, (err) => {
                            Device.RemoveDevicesByUserID(requser._id, (err) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        msg: err
                                    });
                                }
                                else {
    
                                    res.json({
                                        success: true,
                                        msg: "All Devices Deleted Successfully..!"
                                    });
                                }

                            });
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: err
                                });
                            }
                            else {

                                res.json({
                                    success: true,
                                    msg: "User Deleted Successfully..!"
                                });
                            }
                        })


                    }
                }

            }

        });
    }

});

//Exporting the router as a Module
module.exports = router;
