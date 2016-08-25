(function(){
  'use strict';
  var canvas,
      ctx,
      img,
      lastCalledTime,
      delta,
      fps;

   canvas = document.getElementById("myCanvas");
   canvas.width = 1000;
   canvas.height = 1000;
   ctx = canvas.getContext('2d');
   img = new Image();

   /*
   //Ryu test
   img.src = "assets/ryu.png";

  var animSprite = new KJS.SpriteAnimation({
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

  var animSprite = new KJS.SpriteAnimation({
   context: ctx,
   image:img,
   width: 1000,
   height: 100,
   nxFrames:10,
   nyFrames:0,
   idleTime:4
  });

  function gameLoop(){

    window.requestAnimationFrame(gameLoop);
    animSprite.erase(0,0);
    animSprite.draw();

    if(!lastCalledTime) {
        lastCalledTime = Date.now();
        fps = 0;
        return;
     }
     delta = (Date.now() - lastCalledTime)/1000;
     lastCalledTime = Date.now();
     fps = 1/delta;
     console.log(fps);
  }

  img.addEventListener("load",function() {
    gameLoop();
  });
})();
