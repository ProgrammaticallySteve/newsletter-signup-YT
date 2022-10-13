const express = require("express");
const bodyParser = require("body-parser");
const request =require("request");
const https =require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

// Mailchimp URL replace X with the number found on the end of your API Key eg. us4, then replace YYYY with your audience ID.
  const url = "https://usX.api.mailchimp.com/3.0/lists/YYYY";

// In auth: Change to your name and replace XXXX with your generate API Key.
  const options = {
    method: "POST",
    auth: "stephen1:XXXX"
  };

const request = https.request(url,options, function(response) {
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

request.write(jsonData);
request.end();

});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
