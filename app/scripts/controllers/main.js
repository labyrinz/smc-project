'use strict';

/**
 * @ngdoc function
 * @name smcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smcApp
 */
angular.module('smcApp')
  .controller('MainCtrl', function ($scope) {
      TweenMax.set(".videoClass, .scrollIcon, .hiddenCanvas", {visibility:"visible"})
      var tl = new TimelineMax();

      tl.to(".videoClass", 1, {volume: 0.01, ease: Power2.easeOut})
      tl.to(".BackVideo", 1, {opacity: 0.6, scale: 0.1, transformOrigin:"0.5% 2%", ease: Back.easeIn}, "-=0.5","video")
      tl.to(".footer", 0.5,{bottom: 0, ease: Back.easeOut},"-=0.20","footer")
      tl.staggerTo(".boxAnim", 0.2, {opacity: 1, scale: 1, ease: Elastic.easeOut, onComplete:animeButtons}, 0.1)
      tl.pause();

    $(window).bind('mousewheel DOMMouseScroll mousedown', function(event){
        event.preventDefault();
        if(event.type != 'mousedown'){
          if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            tl.reverse();
          }
          else {
            tl.play();
          }
        }
        else if(event.type == 'mousedown' && event.button == 1) {

        }
      });

    $(".videoClass").bind("ended", function() {
      console.log("entra aqui??")
      TweenMax.to(".BackVideo", 3, {opacity:0, volume: 0, ease: Power2.easeOut, onComplete:hideElement});
    });

    function hideElement(){ $(".BackVideo").css("display", "none") };

    function animeButtons() {
      var items = $('.boxAnim');
      function over(){
        TweenMax.to(this, 0.2, {y:-10,opacity:1}, 0.1)
        rotateFace(40);
      }
      function out(){
        TweenMax.to(this, 0.2, {y:0,  opacity:1}, 0.1)
        rotateFace(0);
      }
      items.hover(over, out);
    }
  });
