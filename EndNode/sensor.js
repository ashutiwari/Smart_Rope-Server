const request = require('request');
var aes256 = require('aes256');
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883')
//-------------------------------------

client.on('connect', function () {
  console.log("mqtt connected")
  client.subscribe('int')
})


function intervalFunc() { //---------------------------------------
  var a = Math.floor((Math.random() * 25)); //--------------------------------------------------------------
  var plaintext = {
    Sensor: "Ultra sonic",
    distance: a,
    units: "cm",
  }
  var plain=JSON.stringify(plaintext)
  console.log(plain)

  var key = "hojxjownp2"
  var encrypteddata = aes256.encrypt(key, plain);
  console.log(encrypteddata)

  payload = {
    deviceID: "5b32b6c0d42ef0691c8bf1ef",
    data: encrypteddata

  }
  // Options for GET ---------------------------
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

}

var time = -1;

time = setInterval(intervalFunc, 1000);


client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  var payload = JSON.parse(message)
  var int = parseInt(payload)
  clearInterval(time)
  time = setInterval(intervalFunc, int);
})