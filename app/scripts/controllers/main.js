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

    TweenMax.set(".napFace, .boxAnim, .word-measure", {visibility:"visible"})

    var tl = new TimelineMax();

    $(window).bind('mousewheel DOMMouseScroll', function(event){
      event.preventDefault();
      if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        tl.play();
        setTimeout(pauseAnim, 500)
      }
      else if(event.originalEvent.wheelDelta < 0 || event.originalEvent.detail < 0){
        tl.reverse();
        setTimeout(pauseAnim, 500)
      }
      else tl.pause();
    });

    function pauseAnim(){
      tl.pause();
    }

    function animateText(){
      var mySplitText = $("#quote").splitText({'type':'words','animation':'glowOnHover','useLite':true});
      var wordsElement = $(".word-measure");
      _.each(wordsElement, function(element){
        tl.from(element, Math.floor((Math.random() * 7) + 1), {opacity:0, scale:Math.floor((Math.random() * 5) + 0), y: Math.floor((Math.random() * 100) + 0), transformOrigin:"0% 50% -50",  delay: Math.floor((Math.random() * 3) + 0),ease: Elastic.easeOut}, Math.random());
      })
    }

    tl.staggerFrom(".boxAnim", 1, {opacity: 0, scale: 0, delay: 1, ease: Elastic.easeOut}, 0.1);

    tl.from(".napFace", 2, {opacity: 0, delay: 2, repeat:10, onRepeat:onRepeat, repeatDelay:2, ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 1.5, points: 20, taper: "none", randomize: true, clamp: false})});

    function complete(){
      tl.to(".napFace", 0.4, {opacity: 1, delay: 0.1, ease: Elastic.easeOut});}

    function rotateFace(value){
      tl.to(".napFace", 0.5, {rotation: value, ease: Elastic.easeOut});
    }

    function onRepeat() {
    }

    animateText();

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

  });
