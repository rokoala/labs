var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'app')));

app.listen('3000', function() {
  console.log("server running");
});
