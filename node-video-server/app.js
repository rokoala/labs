var http = require('http')
,   fs  = require('fs')
,   express = require('express')
,   srt2vtt = require('srt2vtt');
;

var app = express();
var router = express.Router();

var VIDEO_PATH = process.env.VIDEO_PATH || (__dirname + "/videos")

var port = 8081;

app.use(express.static(__dirname + '/public'));
app.use('/videos',express.static(VIDEO_PATH));



app.get("/rest/videos",function (req,res) {

 fs.readdir(VIDEO_PATH,function (err,files) {
    var videos = [];
    files.forEach(function (element) {


      file = element.split(".");
      var fileName = "";

      file.forEach(function (chunk,index) {
        if(index > 0 && index < file.length- 1)
          fileName += ".";

        if(index < file.length - 1)
          fileName += chunk;
      });

      if(element.indexOf(".vtt") === -1 && element.indexOf(".srt") === -1){
        videos.push({name:fileName,ext:file[file.length-1]});
      }else{
        if(element.indexOf(".srt") !== -1){
          var srtData = fs.readFileSync(VIDEO_PATH+"/"+element);
          srt2vtt(srtData, function(err, vttData) {
            if (err) throw new Error(err);
            fs.writeFileSync(VIDEO_PATH+"/"+fileName+'.vtt', vttData);
          });
        }
      }
    });

    res.status(200).json(videos);
  })
});

var server = app.listen(port,function () {
  console.log("Server running on ",port);
});
