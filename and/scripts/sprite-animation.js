var KJS = KJS || {};

(function(win) {
  'use strict';

  var SpriteAnimation = function(options) {
    if (!options)
      throw new Error('SpriteAnimation(x,y,options) : Please set SpriteAnimation options');

    this.context = options.context;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.image = options.image;
    this.xFrame = options.xFrame || 0;
    this.yFrame = options.yFrame || 0;
    this.nFrames = options.nFrames || 0;
    this.idleTime = options.idleTime || 4;
    this.height = options.height || 0;
    this.width = options.width || 1;
    this._count = 0;
    this._currentFrameIndex = 0;
  };

  SpriteAnimation.prototype._update = function() {
    this._count += 1;
    // check if count is bellow idleTime
    if (this._count > this.idleTime) {
      this._count = 0;
      // increases current frame index
      this._currentFrameIndex = (this._currentFrameIndex < this.nFrames - 1) ? this._currentFrameIndex + 1 : 0;
    }
  };

  SpriteAnimation.prototype._render = function(x, y) {

    this.context.drawImage(
      this.image,
      this._currentFrameIndex * this.width / this.nFrames,
      0,
      this.width / this.nFrames,
      this.height,
      x,
      y,
      this.width / this.nFrames,
      this.height
    );
  };

  SpriteAnimation.prototype.erase = function(x, y) {
    this.context.clearRect(x, y, this.width, this.height);
  };

  SpriteAnimation.prototype.draw = function(x, y) {
    this._update();
    this._render(x || this.x, y || this.y);
  };

  win.KJS.SpriteAnimation = SpriteAnimation;

})(window);
