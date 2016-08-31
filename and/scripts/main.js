(function() {
  'use strict';
  var canvas,
    ctx,
    img,
    lastCalledTime,
    delta,
    fps;

  var canBackground = document.getElementById("background");
  canBackground.width = 1000;
  canBackground.height = 1000;
  var canBackgroundCtx = canBackground.getContext('2d');
  var backgroundImg = new Image();
  // backgroundImg.src = "assets/background.png";
  // backgroundImg.addEventListener('load', function() {
  //   canBackgroundCtx.drawImage(
  //     backgroundImg,
  //     0,
  //     0,
  //     1024,
  //     864,
  //     0,
  //     0,
  //     1024,
  //     864
  //   );
  // });

  canvas = document.getElementById("myCanvas");
  canvas.width = 1000;
  canvas.height = 1000;
  ctx = canvas.getContext('2d');
  img = new Image();

  /*
   //Ryu test
   img.src = "assets/ryu.png";

  var animSprite = new KJS.Sprite({
    context: ctx,
    image:img,
    width: 600,
    height: 654,
    nxFrames:7,
    nyFrames:6,
    idleTime:10
  });

  */

  img.src = "assets/coin-sprite-animation.png";

  var animSprite = new KJS.Sprite({
    context: ctx,
    image: img,
    width: 1000,
    height: 100,
    nxFrames: 10,
    nyFrames: 0,
    idleTime: 4
  });

  // var test = new KJS.MovableElement();
  // console.log(test);
  // console.log(test.getDimensions);

  var keyBoard = new KJS.Keyboard();

  document.addEventListener("keydown", keyBoard.keyDownHandler.bind(keyBoard), false);
  document.addEventListener("keyup", keyBoard.keyUpHandler.bind(keyBoard), false);

  img.addEventListener("load", function() {
    gameLoop();
  });

  var x = 0;
  var y = 0;
  var speed = 5;
  function gameLoop() {

    window.requestAnimationFrame(gameLoop);

    if (!lastCalledTime) {
      lastCalledTime = Date.now();
      fps = 0;
      return;
    }
    delta = (Date.now() - lastCalledTime) / 1000;
    lastCalledTime = Date.now();
    fps = 1 / delta;

    if (keyBoard.isMoving) {
      if(keyBoard.keys['87']){
        y-=speed;
      }
      if(keyBoard.keys['83']){
        y+=speed;
      }
      if(keyBoard.keys['65']){
        x-=speed;
      }
      if(keyBoard.keys['68']){
        x+=speed;
      }
      animSprite.erase();
      animSprite.draw(x,y);
    }

    // console.log(fps);
  }





  var tileimg = new Image();
  tileimg.src = "assets/tile1.png";
  tileimg.addEventListener("load", function() {

    var tileSprite = new KJS.Sprite({
      context: canBackgroundCtx,
      image: tileimg,
      width: 300,
      height: 149,
      nxFrames: 1,
      nyFrames: 1,
      idleTime: 4
    });
    var map = [[1,1,1,1,1],
               [1,0,1,1,1],
               [1,1,1,1,1],
               [1,1,1,0,1],
               [1,1,1,1,1]];

    var tileWidth = 300;
    var tileHeight = 149;

    function twoDToIso(x,y){
      var tempPt = {
        x:0,
        y:0
      };

      tempPt.x = x - y;
      tempPt.y = (x + y) / 2;
      return tempPt;
    }

    for (var i = 0; i < map.length; i++) {
      for (var j = 0; j < map[i].length; j++) {
        var drawLayer = map[j][i];
        if(drawLayer === 1){
          var x = i*150 + 300;
          var y = j*149;
          var isoCord = twoDToIso(x,y);
          tileSprite.draw(isoCord.x,isoCord.y);
        }
      }
    }
  });


})();
