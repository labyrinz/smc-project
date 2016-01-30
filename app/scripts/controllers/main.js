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
      TweenMax.from(element, Math.floor((Math.random() * 7) + 1), {opacity:0, scale:Math.floor((Math.random() * 5) + 0), y: Math.floor((Math.random() * 100) + 0), transformOrigin:"0% 50% -50",  delay: Math.floor((Math.random() * 3) + 0),ease: Elastic.easeOut}, Math.random());
    })

    TweenMax.from(".napFace", 1, {opacity: 0, scale: 0, delay: 0.5, ease: Elastic.easeOut});

    TweenMax.staggerFrom(".boxAnim", 1, {opacity: 0, scale: 0, delay: 1, ease: Elastic.easeOut}, 0.1);

    TweenMax.to(".napFace", 0.5, {opacity: 0, delay: 2, ease: Elastic.easeOut, onComplete: complete});

    function complete(){
      TweenMax.to(".napFace", 0.4, {opacity: 1, delay: 0.1, ease: Elastic.easeOut});}

    function rotateFace(value){
      console.log('por lo menos lo hace')
      TweenMax.to(".napFace", 0.5, {rotation: value, ease: Elastic.easeOut});
    }

    setInterval(function(){
      TweenMax.to(".napFace", 0.5, {opacity: 0, delay: 2, ease: Elastic.easeOut, onComplete: complete});}, 8000);

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
