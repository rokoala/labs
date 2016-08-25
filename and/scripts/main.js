(function(){
  'use strict';
  var canvas,
      ctx,
      coinImage;

   canvas = document.getElementById("myCanvas");
   canvas.width = 1000;
   canvas.height = 1000;
   ctx = canvas.getContext('2d');
   coinImage = new Image();
   coinImage.src = "assets/coin-sprite-animation.png";

  var animSprite = new KJS.SpriteAnimation({
    context: ctx,
    image:coinImage,
    width: 1000,
    height: 100,
    nFrames:10,
    idleTime:4
  });

  function gameLoop(){

    window.requestAnimationFrame(gameLoop);
    animSprite.erase(0,0);
    animSprite.draw();
  }

  coinImage.addEventListener("load",function() {
    gameLoop();
  });
})();
