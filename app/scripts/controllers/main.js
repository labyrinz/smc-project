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
    })

    TweenMax.from(".videoClass", 30, {opacity:0, volume: 0, ease: Power2.easeOut})

    $(".videoClass").bind("ended", function() {
      console.log('video finalizado');
      TweenMax.to(".videoClass", 5, {opacity:0, volume: 0, ease: Power2.easeOut, onComplete:eraseVideo});
      setTimeout(animateText, 7000);
    });

    TweenMax.set(".napFace, .boxAnim, .word-measure .videoClass", {visibility:"visible"})

    var tl = new TimelineMax();
    $(window).bind('mousewheel DOMMouseScroll mousedown', function(event){
      event.preventDefault();
      if(event.type != 'mousedown'){
        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
          tl.play();
          soundEpilogo.volume(soundEpilogo._volume - 0.005);
          setTimeout(pauseAnim, 300)
        }
        else {
          tl.reverse();
          soundEpilogo.volume(soundEpilogo._volume + 0.005);
          setTimeout(pauseAnim, 300)
        }
      }
      else if(event.type == 'mousedown' && event.button == 1) {
       if (tl.paused()) tl.play();
       else tl.pause()
      }
    });

    function pauseAnim(){
      tl.pause();
    }

    function animateText(){
      soundEpilogo.play();
      var mySplitText = $("#quote").splitText({'type':'words','animation':'glowOnHover','useLite':true});
      var wordsElement = $(".word-measure");

      tl.staggerTo(".boxAnim", 1, {opacity: 1, scale: 1, delay: 1, ease: Elastic.easeOut}, 0.3)
      tl.to(".dinamycText", 0.2, {opacity: 1, ease: Power2.easeOut}, 0.3)
      tl.to(".napFace", 2, {opacity: 1, repeat:10, onRepeat:onRepeat, repeatDelay:2, ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 1.5, points: 20, taper: "none", randomize: true, clamp: false})}, "-=0.5");

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
    function rotateFace(value){
      TweenMax.to(".napFace", 0.5, {rotation: value, ease: Elastic.easeOut});
    }
    function onRepeat() {
    }
    function eraseVideo(){
      $(".videoClass").css("display", "none");
    }

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

/*var tl = new TimelineLite(); Secuencia de eventos

tl.from("h1", 0.5, {left: 100, autoAlpha: 0})
  .from("h2", 0.5, {left: -100, autoAlpha: 0}, "-0.25")
  .from(".feature", 0.5,{scale: 0.5, autoAlpha:0})
  .from("#description", 0.5, {left: 100, autoAlpha:0})
  .staggerFRom("# nav img", 0.5, {scale: 0, autoAlpha: 0}, 0.2, "stagger");

  tl.seek("stagger");
  */
