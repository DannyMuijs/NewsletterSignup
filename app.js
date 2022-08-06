const express = require('express')
const bodyParser = require("body-parser");
const request = require("request")
const https = require("https")
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { ifError } = require('assert');

const app = express()
const port = process.env.PORT || 3000

app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended: true
}))

mailchimp.setConfig({
  apiKey: "bafce9533803c85c70ba7c8dc68cd1b4-us18",
  server: "us18",
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html")
});



app.post("/", (req, res) => {

  const listId = "4a29962a38";
const subscribingUser = {
  firstName: req.body.fName,
  lastName: req.body.lName,
  email: req.body.email
};

async function run() {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName
    }
  });

  
  res.sendFile(__dirname + "/success.html")
  console.log(
    `Successfully added contact as an audience member. The contact's id is ${
      response.id
    }.`
  );
}
  

  
run();

app.get ('/failure', function(req, res){
  res.status(!200).send(__dirname + "/failure.html");
})

app.post('/failure', (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});


});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


// api key bafce9533803c85c70ba7c8dc68cd1b4-us18
// list id 4a29962a38
