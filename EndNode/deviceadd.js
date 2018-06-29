const request = require('request');

payload = {
    name:"IR sensor",
    secretKey:"21x6muxah8",
    userName:"baba@gmail.com"
}

  var options = {
    uri: "http://localhost:8090/device/adddevice",
    headers: {
      'Content-Type': "application/json"

    },
    body: JSON.stringify(payload)
  };


  request.post(options, (err, res, body) => {
    console.log(body);
  })

