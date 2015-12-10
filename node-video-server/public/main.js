;(function () {
  'use strict';

  var app = angular.module('videoApp',[]);

  var VIDEO_PATH = "videos/";

  app.service("VideoService",["$http",function ($http) {

    this.get = function () {
      return $http.get("/rest/videos");
    };

  }]);

  app.controller("LibraryController",["VideoService",function (VideoService) {
    var self = this;

    VideoService.get().then(function (result) {
      self.videos = result.data;
    },function (err) {
      console.log(err);
    })

    this.play = function (video) {
      document.getElementById("mp4_src").src = VIDEO_PATH+video.name+"."+video.ext;
      document.getElementById("ogg_src").src = VIDEO_PATH+video.name+"."+video.ext;
      document.getElementById("subtitle_src").src = VIDEO_PATH+video.name+".vtt";
      document.getElementById("myVideo").load();
    };

  }]);

})();
