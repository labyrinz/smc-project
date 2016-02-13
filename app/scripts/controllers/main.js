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
      var body = $('body');
      var backColorArray = ['#635957','#F7B862','#6B4B30','#63431D','#C48332','#F7B862','#6B4B30'];

      var mySplitText = $("#quote").splitText({'type':'words','animation':'glowOnHover','useLite':true});
      var wordsElement = $(".word-measure");

      var step = 0;
      TweenMax.set(".videoClass, .scrollIcon, .hiddenCanvas, .dinamycText", {visibility:"visible"})
      var tl = new TimelineMax({repeat:0});

      tl
        //.to(".BackVideo", 1, {opacity: 0.6, scale: 0.1, transformOrigin:"0.5% 2%", ease: Back.easeIn, onComplete: playMusic}, "miniVideo")
        //.to(".videoClass", 1.5, {volume: 0.005, ease: Power2.easeOut},"-=0.7")
        //.to(soundEpilogo, 3,{volume: 0.05, ease: Power0.easeNone},"miniVideo")
        //.to(".footer", 0.5,{bottom: 0, ease: Back.easeOut}, "0.2+=miniVideo")
        //.to(".BackVideo", 3, {opacity:0, volume: 0, ease: Power2.easeOut})
        //.staggerTo(".boxAnim", 0.2, {opacity: 1, scale: 1, ease: Elastic.easeOut, onComplete: animeButtons}, 0.1, "-=3")
        //.to(".fase3", 3.06, {right:'0%', ease: Power0.easeNone})
        //.to(".fase2", 3.03, {right:'0%', ease: Power0.easeNone}, "-=3")
        //.to(".fase1", 3, {right:'0%', ease: Power0.easeNone}, "-=3")
        //.to(".napFace", 3, {right:'0%', ease: Power0.easeNone, onComplete: animateText}, "-=3")
        .to(body, 2, { backgroundColor:backColorArray[0], ease: Power0.easeNone }, "bgColor")
        .to(body, 2, { backgroundColor:backColorArray[1], ease: Power0.easeNone })
        .to(body, 2, { backgroundColor:backColorArray[2], ease: Power0.easeNone })
        .to(body, 2, { backgroundColor:backColorArray[3], ease: Power0.easeNone })
        .to(body, 2, { backgroundColor:backColorArray[4], ease: Power0.easeNone })
        .to(body, 2,  {backgroundColor:backColorArray[5], ease: Power0.easeNone })
        .to(".pentagramaCompleto", 14, {left:'-2490%', ease: Power0.easeNone}, "bgColor");
        //.to(".pentagram2", 3, {left:'-9090px', ease: Power0.easeNone}, "penta")
      tl.pause();

    $(window).bind('mousewheel DOMMouseScroll mousedown', function(event){
        event.preventDefault();
        if(event.type != 'mousedown'){
          if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            if(step>0){
              if(step>0.001)step -= 0.001;
              else if(step<=0.001 )step = 0;
              TweenLite.to(tl, 0.5, {progress:step, ease:Power2.easeOut, onComplete: pauseAnim});
            }
          }
          else {
            if(step<1){
              TweenLite.to(tl, 0.5, {progress:step, ease:Power2.easeOut, onComplete: pauseAnim});
              step += 0.001;
            }
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
