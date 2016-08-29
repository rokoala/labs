
var KJS = KJS || {};

(function(win){
  'use strict';

  var MovableElement = function(options){
    KJS.Element.call(this);
  }

  MovableElement.prototype = Object.create(KJS.Element.prototype);

  KJS.MovableElement = MovableElement;

})(window)
