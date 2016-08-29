var KJS = KJS || {};

(function(win) {
  'use strict';

  var Keyboard = function() {
    this.isMoving = false;
    this.keys = {
      '87':false,
      '83':false,
      '65':false,
      '68':false
    };
  }

  Keyboard.prototype.keyDownHandler = function(event) {
    var keyPressed = String.fromCharCode(event.keyCode);

    this.keys[event.keyCode] = true;

    if (keyPressed.indexOf(["W","A","S","D"]))
      this.isMoving = true;
  };

  Keyboard.prototype.keyUpHandler = function(event) {
    var keyPressed = String.fromCharCode(event.keyCode);

    this.keys[event.keyCode] = false;

    if(!this.keys['87'] && !this.keys['83'] && !this.keys['65'] && !this.keys['68'])
      this.isMoving = false;
  }

  KJS.Keyboard = Keyboard;

})(window);
