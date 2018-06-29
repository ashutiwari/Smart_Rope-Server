//Requiring the express middleware
const express=require('express');
//Creating an instance of express
const app=express();
var request = require('request');
//Requiring  modules
const path= require('path');
const bodyparser = require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');

//requiring cors for Cross Oriented Resource Sharing, so that same services on different ports can be used. 
const cors = require('cors');
app.use(cors());


//REquiring credential files:
const cred=require('./config/credentials');

//-------------------MongoDB Operations---------------------

mongoose.connect(cred.database);

mongoose.connection.on('connected',()=>{
    console.log("Connected to Database");
    
})

mongoose.connection.on('error',(err)=>{
    console.log("Error connecting Database");
    
})


//===============================Bridge Mqtt to Rest=============================================
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {
    console.log("mqtt connected")
    client.subscribe('sensor')
})
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())


    var payload = JSON.parse(message)
    var options = {
        uri: "http://localhost:8090/data/adddata",
        headers: {
            'Content-Type': "application/json"

        },
        body: JSON.stringify(payload)
    };

    request.post(options, (err, res, body) => {
        console.log(body);
    })
    //client.end()
})
//============================bridge end=======================================
//============================================================================
//----------------------------------------------------------

//use of environment defined port if available otherwise 8080
const port = process.env.port||8090;

//express static folder path
app.use(express.static (path.join(__dirname,"public")));
//using body parser for parsing json file from request
app.use(bodyparser.json());
app.use(morgan('dev'));

//requiring routes as resources
const user = require('./routes/user');
const data = require('./routes/data');
const device=require('./routes/device');
const control = require('./routes/control');

//using routes for resources
app.use('/user',user);
app.use('/control',control);
app.use('/data',data);
app.use('/device',device);


//Routing all request to the static file
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"))
});

//start listening to the request

app.listen(port,()=>{
    console.log("Server running on port"+port);
});


