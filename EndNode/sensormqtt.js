var mqtt = require('mqtt')
var aes256 = require('aes256');

function intervalFunc() {
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
var data2=JSON.stringify(payload)
var client = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {
    console.log("mqtt connected")
    client.publish('sensor', data2)
})
}

setInterval(intervalFunc, 5000);