var mqtt = require('mqtt')
var data = 5000;
var data2=data.toString()
var client = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {
    console.log("mqtt connected")
    client.publish('int', data2)
})
