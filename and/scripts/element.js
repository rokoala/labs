
var KJS = KJS || {};

(function(win){
  'use strict';

  var Element = function(options){
    this.dim = {
      w:options.width || 0,
      h:options.height || 0
    };

    this.img = options.img;
    this.nxFrames = options.nxFrames;
    this.nyFrames = options.nyFrames;
    this.idleTime = options.idleTime;
  }

  Element.prototype.getDimensions = function(){
    return this.dim;
  }

  KJS.Element = Element;

})(window);
