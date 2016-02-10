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
        volume: 0.0001,
        onend: function() {
          console.log('Finished!');
        }
      })

      var mySplitText = $("#quote").splitText({'type':'words','animation':'glowOnHover','useLite':true});
      var wordsElement = $(".word-measure");

      var step = 0;
      TweenMax.set(".videoClass, .scrollIcon, .hiddenCanvas, .dinamycText", {visibility:"visible"})
      var tl = new TimelineMax({repeat:0});

      tl.to(".BackVideo", 1, {opacity: 0.6, scale: 0.1, transformOrigin:"0.5% 2%", ease: Back.easeIn, onComplete: playMusic}, "miniVideo")
        .to(".videoClass", 1.5, {volume: 0.005, ease: Power2.easeOut},"-=0.7")
        //.to(soundEpilogo, 3,{volume: 0.05, ease: Power0.easeNone},"miniVideo")
        //.to(".footer", 0.5,{bottom: 0, ease: Back.easeOut}, "0.2+=miniVideo")
        //.to(".BackVideo", 3, {opacity:0, volume: 0, ease: Power2.easeOut})
        //.staggerTo(".boxAnim", 0.2, {opacity: 1, scale: 1, ease: Elastic.easeOut, onComplete: animeButtons}, 0.1, "-=3")
        //.to(".fase3", 3.06, {right:'0%', ease: Back.easeOut})
        //.to(".fase2", 3.03, {right:'0%', ease: Back.easeOut}, "-=3")
        //.to(".fase1", 3, {right:'0%', ease: Back.easeOut}, "-=3")
        //.to(".napFace", 3, {right:'0%', ease: Power2.easeOut, onComplete: animateText}, "-=3");
      tl.pause();

    $(window).bind('mousewheel DOMMouseScroll mousedown', function(event){
        event.preventDefault();
        if(event.type != 'mousedown'){
          if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            tl.reverse();
            setTimeout(pauseAnim, 300);
          }
          else {
            tl.play();
            setTimeout(pauseAnim, 300);
          }
        }
        else if(event.type == 'mousedown' && event.button == 1) {
          tl.play();
        }
      });

    $(".videoClass").bind("ended", function() {
      tl.play();
    });

    function animateText(){
      console.log('entra')
      $(".dinamycText").css("opacity", "1");
      _.each(wordsElement, function(element){
        TweenMax.from(element, 3, {
            opacity:0,
            scale:Math.floor((Math.random() * 5) + 0),
            y: Math.floor((Math.random() * 200) + 0),
            x: Math.floor((Math.random() * 200) + 0),
            transformOrigin:"0% 50% -50",
            delay: Math.floor((Math.random() * 3) + 0),
            ease: Power2.easeOut},
          Math.random());
      })
    }

    function playMusic(){
      console.log(soundEpilogo);
      //soundEpilogo.play();
    }

    function pauseAnim(){
      tl.pause();
    }

    function animeButtons() {
      var items = $('.boxAnim');
      function over(){
        TweenMax.to(this, 0.2, {y:-5,opacity:1}, 0.1)
      }
      function out(){
        TweenMax.to(this, 0.2, {y:0,  opacity:1}, 0.1)
      }
      items.hover(over, out);
    }
  });
