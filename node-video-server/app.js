var http = require('http')
,   fs  = require('fs')
,   express = require('express')
;

var app = express();
var router = express.Router();
console.log(process.env.VIDEO_PATH);
var VIDEO_PATH = process.env.VIDEO_PATH || (__dirname + "/videos")

var port = 8081;

app.use(express.static(__dirname + '/public'));
app.use('/videos',express.static(VIDEO_PATH));



app.get("/rest/videos",function (req,res) {

 fs.readdir(VIDEO_PATH,function (err,files) {
    var videos = [];
    files.forEach(function (element) {
      if(element.indexOf(".vtt") === -1){
        file = element.split(".");
        var fileName = "";

        file.forEach(function (chunk,index) {
          if(index < file.length - 1)
            fileName += chunk;
        });

        videos.push({name:fileName,ext:file[file.length-1]});
      }
    });

    res.status(200).json(videos);
  })
});

var server = app.listen(port,function () {
  console.log("Server running on ",port);
});
