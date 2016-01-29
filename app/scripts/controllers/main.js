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

    var mySplitText = $("#quote").splitText({'type':'words','animation':'glowOnHover','useLite':true});
    var wordsElement = $(".word-measure");
    _.each(wordsElement, function(element){
      TweenMax.from(element, Math.floor((Math.random() * 7) + 1), {opacity:0, scale:Math.floor((Math.random() * 5) + 0), y: Math.floor((Math.random() * 100) + 0), transformOrigin:"0% 50% -50",  ease: Elastic.easeOut}, Math.random(), "+=0");
    })

    TweenMax.from(".napFace", 1, {
      opacity: 0,
      scale: 0,
      delay: 0.5,
      ease: Elastic.easeOut
    });

    TweenMax.staggerFrom(".boxAnim", 1, {
      opacity: 0,
      scale: 0,
      delay: 1,
      ease: Elastic.easeOut
    }, 0.1);

    TweenMax.to(".napFace", 0.5, {
      opacity: 0,
      delay: 2,
      ease: Elastic.easeOut,
      onComplete: complete
    });

    function complete(){
      TweenMax.to(".napFace", 0.4, {
        opacity: 1,
        delay: 0.1,
        ease: Elastic.easeOut
      });
    }

    setInterval(function(){
      TweenMax.to(".napFace", 0.5, {
        opacity: 0,
        delay: 2,
        ease: Elastic.easeOut,
        onComplete: complete
      });
    }, 8000);

    var toggle=0;
    var tl = new TimelineMax({paused:true});
    var items = $('.boxAnim');
    var list = $('.boxGroup');

    function over(){ TweenMax.staggerTo(items, 0.2, {y:-10,opacity:1}, 0.1) }
    function out(){  TweenMax.staggerTo(items, 0.2, {y:0,opacity:0.4}, 0.1) }

    list.hover(over, out);

  });
