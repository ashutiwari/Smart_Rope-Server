const request = require('request');

payload = {
    name:"baba",
    username:"baba@gmail.com",
    password:"1234"
}

  var options = {
    uri: "http://localhost:8090/user/adduser",
    headers: {
      'Content-Type': "application/json"

    },
    body: JSON.stringify(payload)
  };


  request.post(options, (err, res, body) => {
    console.log(body);
  })

