var KJS = KJS || {};

(function(win) {
  'use strict';

  var Sprite = function(options) {
    if (!options)
      throw new Error('Sprite(x,y,options) : Please set Sprite options');

    this.context = options.context;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.image = options.image;
    this.nxFrames = options.nxFrames || 1;
    this.nyFrames = options.nyFrames || 1;
    this.idleTime = options.idleTime || 4;
    this.height = options.height || 0;
    this.width = options.width || 1;

    // counter to control the frame rate that depends on options.idleTime
    this._count = 0;

    // amount of frames to display
    this.amount = options.amount || null;

    // controls the number of frames to display
    this._currentAmount = 1;

    // register the initial index position of sprite
    this._initFrameIndex = {
      x: options.xFrame || 0,
      y: options.yFrame || 0
    };

    // controls current index position of sprite
    this._currentFrameIndex = {
      x: options.xFrame || 0,
      y: options.yFrame || 0
    };

    this._lastX = this.x;
    this._lastY = this.y;
  };

  Sprite.prototype._updateframeIndex = function(){
    // increases current frame index in x axis
    if (this._currentFrameIndex.x < this.nxFrames - 1) {
      this._currentFrameIndex.x += 1;
    } else {
      this._currentFrameIndex.x = this._initFrameIndex.x;

      // increases current frame index in y axis
      if (this.nyFrames > 1) {
        if (this._currentFrameIndex.y < this.nyFrames - 1) {
          this._currentFrameIndex.y += 1;
        } else {
          this._currentFrameIndex.y = this._initFrameIndex.y;
        }
      }
    }
  }

  Sprite.prototype._update = function() {
    this._count += 1;
    // check if count is bellow idleTime
    if (this._count > this.idleTime) {
      this._count = 0;

      if(!!this.amount){
        if (this._currentAmount < this.amount) {
          this._currentAmount += 1;
          this._updateframeIndex();
        }else{
          this._currentAmount = 1;
          this._currentFrameIndex.x = this._initFrameIndex.x;
          this._currentFrameIndex.y = this._initFrameIndex.y;
        }
      }else{
        this._updateframeIndex();
      }
    }
  };

  Sprite.prototype._render = function(x, y) {
    this._lastX = x;
    this._lastY = y;

    this.context.drawImage(
      this.image,
      this._currentFrameIndex.x * this.width / this.nxFrames,
      this._currentFrameIndex.y * this.height / this.nyFrames,
      this.width / this.nxFrames,
      this.height / this.nyFrames,
      x,
      y,
      this.width / this.nxFrames,
      this.height / this.nyFrames
    );
  };

  Sprite.prototype.erase = function() {
    this.context.clearRect(this._lastX, this._lastY, this.width, this.height);
  };

  Sprite.prototype.draw = function(x, y) {
    this._update();
    this._render(x || this.x, y || this.y);
  };

  win.KJS.Sprite = Sprite;

})(window);
