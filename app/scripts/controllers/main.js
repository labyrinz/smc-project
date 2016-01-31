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

    var soundEpilogo = new Howl({
      urls: ['audio/ValsViudaAlegre.mp3'],
      loop: true,
      volume: 0.3,
      onend: function() {
        console.log('Finished!');
      }
    }).play();

    TweenMax.set(".napFace, .boxAnim, .word-measure", {visibility:"visible"})

    var tl = new TimelineMax();

    $(window).bind('mousewheel DOMMouseScroll click', function(event){
      event.preventDefault();
      console.log(event.originalEvent);
      console.log(sound._volume)
      if(event.type != 'click'){
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
          tl.play();
          soundEpilogo.volume(sound._volume - 0.005);
          setTimeout(pauseAnim, 300)
        }
        else {
          tl.reverse();
          soundEpilogo.volume(sound._volume + 0.005);
          setTimeout(pauseAnim, 300)
        }
      }
      else {
        tl.paused(!tl.paused())
      }
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
      TweenMax.to(".napFace", 0.5, {rotation: value, ease: Elastic.easeOut});
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
