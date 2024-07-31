var express = require('express');
var resetpwd = require('./resetpwd');
const ftp = require("basic-ftp")
const fs = require("fs");
var {Base64Encode} = require('base64-stream');
var ftpClient = require('ftp-client');
var user_manager = require('./supabase_manager');

var app = express();
var router = express.Router();


router.get('/', function(req, res){
   res.render("index",{
      toolbar: true,
    }); 
});

router.get('/userlogin', function(req, res){
   res.render("login"); 
});

router.post('/userlogin', function(req, res){
   console.log(req.body);
   let [email,pwd,mode] = [req.body.email,req.body.pwd,req.body.mode];

   if(mode == 'login')
   {
      user_manager.login({email,pwd,mode},res);
   }
});

router.all('/reset-password',(req,res)=>{
   res.render("showResetPage");
});

// router.all('/resetpwd',resetpwd.process);
//----------------------
// router.all('/token',resetpwd.update);
//----------------------
// router.all('/welcome', function(req, res){
//    res.render("welcome",{
//       toolbar: true,
//     }); 
//     return;
//     if(req.session.page_views){
//         req.session.page_views++;
//         res.send("You visited this page " + req.session.page_views + " times");
//      } else {
//         req.session.page_views = 1;
//         res.send("Welcome to this page for the first time!");
//      }
// });
//----------------------
// router.all('/resetpasswordResult',resetpwd.result);
//--------------------
//  router.get('/things/:name/:id', function(req, res) {
//     res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
//  });
//---------------------
//  router.post('/image/upload',(req,res)=>{
//    let filename = req.headers['filename'];
//    let filetype = req.headers['type'];
//    const { image } = req.files;
   
//    console.log("file is ",filetype,filename);
//     // If no image submitted, exit
//     if (!image) return res.json({respone:"image is null"});

//       // image.mv(__dirname + '/upload/${filetype}/'+ image.name);
      
//     config = {
//          host: 'https://cdn.flik.com',
//          port: 21,
//          user: 'yincheng@cdn.flik.com',
//          password: 'nm!U#{yiB[MC'
//       },
//       options = {
//             logging: 'basic'
//       },
//       client = new ftpClient(config, options);

//       client.connect(function () {

//          client.upload([image], `/flik/profile/${filetype}/${filename}`, {
//                baseDir: 'upload',
//                overwrite: 'older'
//          }, function (result) {
//                console.log(result);
//          });

//          // client.download('/public_html/test2', 'test2/', {
//          //       overwrite: 'all'
//          // }, function (result) {
//          //       console.log(result);
//          // });

//       });
//------------------------
   //    const client = new ftp.Client(/*timeout = 180000*/) // 2min timeout for debug
   //    client.ftp.verbose = false;
   //    client.access({
   //       host: "ftp.cdn.flik.com",
   //       user: "yincheng@cdn.flik.com",
   //       password: "nm!U#{yiB[MC",
   //       secure: false,
   //       port:21,
   //     }).then(async ftpResponse => {
   //       try {
   //          const respone = await client.uploadFrom(image, `flik/profile/${filetype}/${filename}`)
   //          console.log("Upload result =",respone);

   //          // Download the image from the FTP server and send it as response
   //          // response.setHeader('Content-Type', req.headers['content-type'])
   //          // var base64Encoder = new Base64Encode()
   //          // base64Encoder.pipe(response)
   //          // await client.downloadTo(base64Encoder, `uploads/${filename}`)
   //        }
   //        catch(err) {
   //          console.log(err)
   //          response.statusCode = 400;
   //          response.setHeader('Content-Type', 'application/json')
   //          response.end(JSON.stringify({respone: 'error', description: err}))
   //        }
   //       client.close()
   //    });

   //  // All good
   //  res.json({respone:"success"});
// });

 router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
 });

//  const removeSync = (dir,fileName) => {

//    try {
//      fs.unlinkSync(dir + fileName);
//       console.log("deleted file");
//       return "success";
//    } catch (err) {
//       console.log("deleting error");
//       return "error";
//    }
//  };

// var log = {
//    info: function (info) { 
//        console.log('Info: ' + info);
//    },
//    warning:function (warning) { 
//        console.log('Warning: ' + warning);
//    },
//    error:function (error) { 
//        console.log('Error: ' + error);
//    }
// };

// module.exports = log

module.exports = {router}