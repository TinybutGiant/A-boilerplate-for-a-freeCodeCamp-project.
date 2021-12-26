// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API0'});
});

app.get("/api/:date?", function (req, res) {
  let date_string = req.params.date; // get the input date
  if (date_string){
  if(/\d{5,}/.test(date_string)){ //unix time, not yet
    console.log(date_string + ' this is a unix time');
    var date_unix = parseInt(date_string);
    console.log(date_unix);
    var date_utc = new Date(date_unix).toUTCString();
    console.log(date_utc);
    res.json({unix: date_unix, utc: date_utc});
  } else{ // normal time, works
    let date_Object = new Date(date_string);
    if(date_Object.toString() === "Invalid Date"){
      res.json({ error : "Invalid Date" });
    } else {
      console.log(date_string+ ' this is a normal time');
      var date_unix = date_Object.getTime();
      console.log(date_unix);
      var date_utc = date_Object.toUTCString();
      console.log(date_utc);
      res.json({unix: date_unix, utc: date_utc});
    }
    
  }}
  else {
    date_now = new Date();
    console.log('time now: '+date_now);
    var date_unix = date_now.getTime();
    console.log(date_unix);
    var date_utc = date_now.toUTCString();
    console.log(date_utc);
    res.json({unix: date_unix, utc: date_utc});
  }
  
  
  //res.json({unix: date_string, utc: date_utc});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
