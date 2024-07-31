var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const fileUpload = require('express-fileupload');
var multer = require('multer');
var upload = multer(); 

const url = require('url');
//--------------Using pure Node.js---------
// var server = http.createServer(function (req, res) {   //create web server
//   if (req.url == '/') { //check the URL of the current request
      
//       // set response header
//       res.writeHead(200, { 'Content-Type': 'text/html' }); 
      
//       // set response content    
//       res.write('<html><body><p>This is home Page.</p></body></html>');
//       res.end();
  
//   }
//   else if (req.url == "/student") {
      
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.write('<html><body><p>This is student Page.</p></body></html>');
//       res.end();
  
//   }
//   else if (req.url == "/admin") {
      
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.write('<html><body><p>This is admin Page.</p></body></html>');
//       res.end();

//   }
//   else
//       res.end('Invalid Request!');

// });

// server.listen(8000); //listen for any incoming requests

// console.log('Node.js web server at port 5000 is running..')

//--------------Using Express1--------------
// const server = http.createServer(express());
// server.listen(8000, () => {
//   console.log('Server started on port 8000');
// });

//--------------Using Express2--------------
var app = express();
app.use(function(req, res, next){
    // console.log("A new request received at " + Date.now());
    console.log("header=",req.protocol + '://' + req.get('host') + req.originalUrl);
    next();
});

app.set('view engine', 'ejs');
app.set('views','./libs/html/pages');
app.use(express.static(path.join(__dirname,"libs")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(fileUpload());

var router = require('./src/router')

app.use(router.router);
app.listen(5000);