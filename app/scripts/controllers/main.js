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

      //--- GLOBAL VARIABLES ----

      var mapStatus = false;
      var videoDisplay = true;
      var body = $('body');
      var totalWords = [];
      var fullScreenVideoStatus = false;
      var soundEpilogo = false;
      var boolsound = 1;
      var playTimelineBefore = true;

      var playListOrder = ['BeginTheBeguine','ElManisero','TICOTICO','Siboney','MyShawl','JungleRhumba','perfidia','QuizasQuizasQuizas','ParaVigomevoy','YoTeAmoMucho','Tabu']
      var introLetters = $("#quote h2").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"introLetters"});
      var introLettersSubtitle = $("#quote h3 span.subtitle").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"introLettersSubtitle"});
      var introLettersName = $("#quote h3 span.cugat-name").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"introLettersName"});

      var introWords = $(".introLetters");
      var introWordsSubtitle = $(".introLettersSubtitle");
      var introWordsName = $(".introLettersName");

      var cita12Letters = $("#cita12").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita12Letters"});
      totalWords[12] = $(".cita12Letters");
      var cita41Letters = $("#cita41").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita41Letters"});
      totalWords[41] = $(".cita41Letters");
      var cita42Letters = $("#cita42").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita42Letters"});
      totalWords[42] = $(".cita42Letters");
      var cita51Letters = $("#cita51").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita51Letters"});
      totalWords[51] = $(".cita51Letters");
      var cita52Letters = $("#cita52").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita52Letters"});
      totalWords[52] = $(".cita52Letters");
      var cita53Letters = $("#cita53").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita53Letters"});
      totalWords[53] = $(".cita53Letters");
      var cita61Letters = $("#cita61").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita61Letters"});
      totalWords[61] = $(".cita61Letters");
      var cita62Letters = $("#cita62").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita62Letters"});
      totalWords[62] = $(".cita62Letters");
      var cita63Letters = $("#cita63").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita63Letters"});
      totalWords[63] = $(".cita63Letters");
      //var cita91Letters = $("#cita91").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita91Letters"});
      //totalWords[91] = $(".cita91Letters");
      var cita91Letters = $("#cita100").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita100Letters"});
      totalWords[100] = $(".cita100Letters");

      //---------------------------
      //----SOUND TRACKS -----

      //-----------------------
      //------ DRAW SVG ------------
      var viaje1 = $('#viaje1Svg').drawsvg({
        duration: 8000,
        easing: 'linear',
        callback: function() {
          //console.log('dibujo terminado');
        }
      });
      //----------------------------
      //---------VIDEOS--------

        var player = videojs('fullScreeVideoEnter');
        var playerIntro = videojs('introVideo');
        var resume = videojs('resumeVideo');

        playerIntro.ready(function(){
          playerIntro.on("ended",function(){
            console.log("intro video ended")
            tl.play(); // On Intro Video ended, next slide
          })
        });

      //-----------------------
      //-----TIMELINE ---------
        var animationFromPattern = { scale: '0', right: '-20%', ease: Back.easeInOut.config(1)};
        var animationToPattern = { scale: '0', opacity: '0', ease: Back.easeInOut.config(1)};
        var staggerFromVelocity = 0.05;
        var staggerToVelocity = 0.03;

        TweenMax.set(".scrollIcon, .hiddenCanvas, .dinamycText, .ageTitle, .napFace, .addon1, .prel01", {visibility:"visible"});

        var tl = new TimelineMax({repeat:0});
        var cugatNino = new TimelineMax({repeat:3});

        tl
          //EPISODE 1
          .call(playIntroVideo,[])
          .call(stopResumeVideo)
          .add("inicio")
          .to(".videoCover", 3, {css:{opacity: '0.2'}, delay: 2, ease: Power0.easeOut})
          .staggerFrom(introWords, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
          .staggerFrom(introWordsSubtitle, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
          .staggerFrom(introWordsName, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
          .to(".mouseIcon", 0.5, {bottom: '150px', ease: Bounce.easeOut})
          .addPause()
          //EPISODE 2
          .call(stopIntroVideo,[])
          .to(".mouseIcon", 0.5, {bottom: '-150px', ease: Bounce.easeOut})
          .add("prologo1")
          .to("#page0",0.5,{ scale: '0', ease: Back.easeIn.config(1)})
          .to(".ed1", 0.5, {left: '0%', onComplete: playSound, onCompleteParams: [playListOrder[0]], onReverseComplete: stopNinoAnimation, ease: Bounce.easeOut})
          .to(".ed2", 0.5, {top: '0%', ease: Bounce.easeOut})
          .to(".ed3", 0.5, {left: '0%', ease: Bounce.easeOut},"-=1")
          .to(".ed4", 0.5, {transform: 'rotateX(0deg)', onComplete: ninoAnimation, ease: Back.easeOut.config(1)})
          .to(".texto11",3,{ transform: 'scale(1)', opacity: '1', ease: Power4.easeOut},"+=1")
          .to(".mouseIcon", 0.5, {bottom: '150px', ease: Bounce.easeOut},"+=0.5")
          .addPause()
          .to(".mouseIcon", 0.5, {bottom: '-150px', ease: Bounce.easeOut})
          .to(".texto11",1.5,{ transform: 'scale(0)', opacity: '0', ease: Power4.easeOut},"+=0.2")
          .to("#page1",0.1,{ right: '0%', ease: Power0.easeNone})
          .to(".pentagramRect",0.2,{ bottom: '1%', ease: Power0.easeNone})
          .to(".currentDetails",0.2,{ top: '0px', ease: Power0.easeNone},"-=0.2")
          .to(".claveSol",0.2,{ bottom: '0', ease: Power0.easeNone},"-=0.2")
          .to(".pentagramBack",0.2,{ bottom: '0%', ease: Power0.easeNone},"-=0.2")
          .to(".pentagramNotesGroup",0.2,{ bottom: '2%', ease: Power0.easeNone},"-=0.2")
          .to(".age1",0.3,{ onStart: stopNinoAnimation, transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
          .call(updateTitle,[0])
          .staggerFrom($("#page1").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".cita11",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
          .addPause()
          //EPISODE 3
          .staggerTo($("#page1").children(),0.6, animationToPattern, staggerToVelocity)
          .add("prologo2")
          .to(".ed2", 0.5, {left: '-5%', ease: Power2.easeIn},"scrollGer")
          .to(".ed3", 0.5, {left: '-10%', ease: Power2.easeIn},"scrollGer")
          .to(".ed4", 0.5, {left: '-15%', ease: Power2.easeIn},"scrollGer")
          .to("#page1",0.4,{ right: '100%', ease: Power0.easeNone},"-=0.5")
          .to("#page2",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .from(".mapSvgClassTop", 1, {scale: 0, onComplete:initViaje, ease: Back.easeOut })
          .to(".mapSvgClassTop", 4, {width: '250%', top: '-60%', left: '-25%' , ease: Power2.easeIn},"+=1")
          .to(".cub1", 0.5, {top: '0%', ease: Power0.easeNone},"cuba1")
          .to(".ed1", 0.5, {top: '120%', onReverseComplete: ninoAnimation, ease: Power2.easeIn})
          .to(".ed2", 0.5, {top: '120%', ease: Power2.easeIn})
          .to(".ed3", 0.5, {top: '120%', ease: Power2.easeIn},"-=1")
          .to(".ed4", 0.5, {top: '120%', ease: Power2.easeIn})
          .to(".mapSvgClassTop", 2, {onStart: updateTitle, onStartParams: [1],width: '800%', top: '-385%', left: '-140%', ease: Power2.easeIn},"-=1.2")
          //EPISODE 4
          .to("#page2",0.4,{ right: '100%', onComplete: openVideo, onCompleteParams: ['ghTHOjcc3IM', 'ct'], onReverseComplete: closeVideo, ease: Power0.easeNone},"+=1")
          .addPause()
          .add("prologo2Add")
          .to("#page3",0.4,{ right: '0%', onComplete: closeVideo, onReverseComplete: openVideo, onReverseCompleteParams: ['ghTHOjcc3IM'], ease: Power0.easeNone})
          .to(".age1",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
          .to(".age2",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"-=0.3")
          .call(updateTitle,[2])
          .staggerFrom($("#page3").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 5
          .staggerTo($("#page3").children(),0.6, animationToPattern, staggerToVelocity)
          .add("prologo3")
          .to(".cub1", 0.5, {transform: 'rotateY(165deg)', onComplete: playOnlyAudio, onCompleteParams: ['xYX5Ep2ALRo'], ease: Power2.easeIn})
          .to(".ny4", 0.2, {top: '0%', ease: Bounce.easeOut},"-=0.5")
          .to(".ny3", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny1", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny2", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny5", 0.8, {scale: '1', right: '0', ease: Power4.easeOut},"-=0.2")
          .to(".ny6", 0.8, {scale: '1', right: '0', ease: Power4.easeOut},"-=0.2")
          .to(".ny7", 0.8, {scale: '1', right: '0', onReverseComplete: playOnlyAudio, onReverseCompleteParams: ['xYX5Ep2ALRo'], ease: Power4.easeOut},"-=0.2")
          .call(updateTitle,[3])
          .to("#page3",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page4",0.4,{ right: '0%', onReverseComplete: stopResumeVideo, ease: Power0.easeNone},"-=0.4")
          .staggerFrom($("#page4").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".cita12",1,{  transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
          .addPause()
          //EPISODE 6
          .staggerTo($("#page4").children(),0.6, animationToPattern, staggerToVelocity)
          .add("RR1")
          .call(updateTitle,[4])
          .to(".resumeVideoBox", 1, {onStart: playResumeVideo, onStartParams: [38.5,89,55, true], opacity: '1', scale: '1', onReverseComplete: stopResumeVideo, ease: Power4.easeIn})
          .addPause()
          .to(".resumeVideoBox", 0.5, { opacity: '1',scale: '0.2', ease: Power4.easeOut})
          .to("#page4",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
          .to("#page5",0.4,{ right: '0%', onComplete: playSound, onCompleteParams: [playListOrder[1]], onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[0]], ease: Back.easeInOut.config(1)},"-=0.4")
          .staggerFrom($("#page5").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".cita21",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
          .addPause()
          //EPISODE 7
          .staggerTo($("#page5").children(),0.6, animationToPattern, staggerToVelocity)
          .add("RR2")
          .to(".resumeVideoBox", 0.2, {opacity: '0', scale: '0', onComplete: stopResumeVideo, onReverseComplete: playResumeVideo, onReverseCompleteParams: [38.5,89,55], ease: Power4.easeOut},"-=0.2")
          .to("#page5",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
          .to("#page6",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .call(updateTitle,[5])
          //.to(".blurEffect3",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone},"+=1")
          .to(".ny5", 0.5, {scale: '5', right: '200%', ease: Power4.easeIn})
          .to(".ny6", 0.5, {scale: '5', right: '200%', ease: Power4.easeIn},"-=0.2")
          .to(".ny7", 0.5, {scale: '5', right: '200%', ease: Power4.easeIn},"-=0.2")
          .to(".ny3", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ny1", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ny2", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ny4", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ber1", 0.3, {transform: 'rotateY(0deg)', ease: Back.easeOut.config(1)})
          //.to(".blurEffect4",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .staggerFrom($("#page6").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".cita14",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
          .addPause()
          //EPISODE 8
          .staggerTo($("#page6").children(),0.6, animationToPattern, staggerToVelocity)
          .add("RR3")
          .to("#page6",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
          .to("#page7",0.2,{ right: '0%', onComplete: playSound, onCompleteParams: [playListOrder[2]], onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[1]], ease: Back.easeInOut.config(1)},"-=0.4")
          .call(updateTitle,[6])
          .to(".ber1", 0.3, {transform: 'rotateY(165deg)', ease: Back.easeOut.config(1)})
          .to(".holly2", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)})
          .to(".holly1", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".holly3", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".holly4", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".holly7", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".holly6", 2, {top: '0%', onComplete: playOnlyAudio, onCompleteParams: ['mnX-eWJktbg'], ease: Power4.easeOut})
          .staggerFrom($("#page7").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".holly5", 2, {opacity: '1', ease: Power4.easeOut})
          .addPause()
          //EPISODE 9
          .staggerTo($("#page7").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page7",0.4,{ onStart: controlSound, right: '100%', onReverseComplete: playOnlyAudio, onReverseCompleteParams: ['mnX-eWJktbg'], ease: Back.easeInOut.config(1)})
          .to(".holly2", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.5")
          .to(".holly1", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
          .to(".holly3", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
          .to(".holly4", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
          .to(".holly7", 0.5, {top: '150%', ease: Bounce.easeOut},"-=0.3")
          .to(".holly6", 0.5, {top: '-150%', ease: Power4.easeOut},"carmenCastillo")
          .to(".holly5", 1, {opacity: '0', onComplete: playSound, onCompleteParams: [playListOrder[3]], onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[2]], ease: Power4.easeOut})
          .add("CC1")
          .to(".age2",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
          .call(updateTitle,[7])
          .to(".carn2", 4, { opacity: '1', ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 2, points: 20, taper: "none", randomize: true, clamp: false})})
          .to(".carn1", 2, {opacity: '1', ease: Back.easeOut.config(1)},"-=2")
          .to(".carn1", 2, {top: '-50%', ease: Power4.easeOut})
          .to(".carn2", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
          .to(".carn3", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
          .to(".carn4", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
          .to(".carn5", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
          .to(".carn6", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
          .to(".cita100",1,{ scale:'1',transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=0.5")
          .to(".mouseIcon", 0.5, {bottom: '150px', ease: Bounce.easeOut})
          .addPause()
          .to(".mouseIcon", 0.5, {bottom: '-150px', ease: Bounce.easeOut})
          .to(".cita100",1,{ scale:'0',transform: 'rotateX(90deg)', ease: Bounce.easeOut},"+=0.5")
          .add("CC2")
          .call(updateTitle,[8])
          .to(".resumeVideoBox", 1, {onStart: playResumeVideo, onStartParams:[101,108,108], scale: '1',opacity: '1', onReverseComplete: stopResumeVideo, ease: Power4.easeIn})
          .addPause()
          .to(".resumeVideoBox", 1, {scale: '0',opacity: '0', onComplete: stopResumeVideo, onReverseComplete: playResumeVideo, onReverseCompleteParams:[101,131,131], ease: Power4.easeOut})
          .to("#page8",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .staggerFrom($("#page8").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 10
          .staggerTo($("#page8").children(),0.6, animationToPattern, staggerToVelocity)
          .add("CC3")
          .call(updateTitle,[9])
          .to("#page8",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
          .to("#page9",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .staggerFrom($("#page9").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".cita91",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
          .addPause()
          //EPISODE 11
          .staggerTo($("#page9").children(),0.6, animationToPattern, staggerToVelocity)
          .add("CC4")
          .call(updateTitle,[10])
          .to("#page9",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
          .to("#page10",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .to(".age3",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut})
          .staggerFrom($("#page10").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 12
          .staggerTo($("#page10").children(),0.6, animationToPattern, staggerToVelocity)
          .to(".blurEffect5", 2, { opacity: '0', ease: Back.easeOut.config(1)},"+=2")
          .to("#page10",0.4,{ right: '100%', ease: Power0.easeNone})
          .add("LA1")
          .call(updateTitle,[11])
          .to(".resumeVideoBox", 0.1, {onStart: playResumeVideo, onStartParams:[132,189,189], scale: '1', opacity: '1', onReverseComplete: stopResumeVideo, ease: Power4.easeIn})
          .addPause()
          .to(".resumeVideoBox", 1, {scale: '0', opacity: '0', onComplete: stopResumeVideo, onReverseComplete: playResumeVideo, onReverseCompleteParams:[132,189,189], ease: Power4.easeOut})
          .to(".chi4", 0.3, {  onStart: playSound, onStartParams: [playListOrder[4]],opacity: '1', onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[3]], ease: Bounce.easeOut },"-=0.2")
          .to(".chi2", 1, { opacity: '1', ease: Power4.easeOut })
          .to(".chi1", 4, { opacity: '1', ease: Power0.easeNone },"+=1")
          .to(".chi5", 1, { left: '0', ease: Power4.easeOut })
          .to(".chi6", 1, { left: '0', ease: Power4.easeOut })
          .to("#page11",0.4,{ right: '0%', onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[4]], ease: Power0.easeNone},"-=0.4")
          .staggerFrom($("#page11").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 13
          .add("LA2")
          .to("#page11",0.4,{ right: '100%', onComplete: playSound, onCompleteParams: [playListOrder[5]], ease: Back.easeIn})
          //.staggerTo($("#page11").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page12",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".blurEffect7",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .call(updateTitle,[12])
          .staggerFrom($("#page12").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".cita42",1,{ transform: 'rotateX(0deg)', onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[5]], ease: Bounce.easeOut},"+=1")
          .addPause()
          //EPISODE 14
          .add("LA3")
          .to("#page12",0.4,{ right: '100%', onComplete: playSound, onCompleteParams: [playListOrder[6]], ease: Power0.easeNone})
          .staggerTo($("#page12").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page13",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .call(updateTitle,[13])
          .staggerFrom($("#page13").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 15
          .staggerTo($("#page13").children(),0.6, animationToPattern, staggerToVelocity)
          .to(".blurEffect7",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone},"+=1")
          .to(".chi2", 0.3, {opacity: '0', ease: Back.easeOut.config(1)},"+=0.5")
          .to(".chi4", 0.3, {opacity: '0', ease: Bounce.easeOut},"+=0.5")
          .to(".chi5", 1, {left: '150%', ease:Power4.easeOut})
          .to(".chi6", 1, {left: '-150%', ease: Power4.easeOut})
          .to(".chi1", 0.3, {opacity: '0', ease: Back.easeOut.config(1)},"-=0.2")
          .to("#page13",0.4,{ right: '100%', ease: Power0.easeNone})
          .add("AL1")
          .call(updateTitle,[14])
          .to(".resumeVideoBox", 1, {onStart: playResumeVideo, onStartParams:[189,266,266], scale: '1',opacity: '1', onReverseComplete: stopResumeVideo, ease: Power4.easeIn})
          .addPause()
          .to(".resumeVideoBox", 1, { scale: '0', opacity: '0', onComplete: stopResumeVideo, onReverseComplete: playResumeVideo, onReverseCompleteParams:[189,266,266], ease:  Power4.easeOut})
          .to("#page14",0.4,{ right: '0%', onComplete: playSound, onCompleteParams: [playListOrder[7]], onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[6]], ease: Power0.easeNone},"-=0.4")
          .to(".lasv1", 0.3, {opacity: '1', ease: Back.easeOut.config(1)})
          .to(".lasv2", 0.3, {top:'0%', ease: Bounce.easeOut})
          .to(".lasv3", 0.3, {top:'0%', ease: Bounce.easeOut})
          .to(".lasv10", 0.3, {top:'0%', ease: Bounce.easeOut})
          .to(".lasv4", 0.3, {transform: 'rotate(0deg)', ease: Back.easeOut.config(1)})
          .to(".lasv5", 0.3, {transform: 'rotate(0deg)', ease: Back.easeOut.config(1)})
          .to(".lasv6", 0.3, {opacity: '1', ease: Back.easeOut.config(1)})
          .to(".lasv7", 0.3, {opacity: '1', ease: Back.easeOut.config(1)})
          .to(".lasv8", 0.3, {opacity: '1', ease: Back.easeOut.config(1)})
          .to(".lasv9", 0.3, {opacity: '1', ease: Back.easeOut.config(1)})
          .staggerFrom($("#page14").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".cita51",1,{ transform: 'rotateX(0deg)', onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[6]], ease: Bounce.easeOut},"+=0.5")
          .addPause()
          //EPISODE 16
          .staggerTo($("#page14").children(),0.6, animationToPattern, staggerToVelocity)
          .add("Al2")
          .to("#page14",0.4,{ right: '100%', onComplete: playSound, onCompleteParams: [playListOrder[8]], ease: Power0.easeNone})
          .to("#page15",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".blurEffect8",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .call(updateTitle,[15])
          .staggerFrom($("#page15").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".cita53",1,{ transform: 'rotateX(0deg)', onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[8]], ease: Bounce.easeOut},"+=1")
          .addPause()
          //EPISODE 17
          .staggerTo($("#page15").children(),0.6, animationToPattern, staggerToVelocity)
          .add("AL3")
          .to("#page15",0.4,{ right: '100%', onComplete: playSound, onCompleteParams: [playListOrder[9]], ease: Power0.easeNone})
          .call(updateTitle,[16])
          .to("#page16",0.4,{ right: '0%', ease: Power0.easeNone})
          .staggerFrom($("#page16").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".cita56",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
          .addPause()
          //EPISODE 18
          .staggerTo($("#page16").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page16",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page17",0.4,{ right: '0%', ease: Power0.easeNone})
          .add("CB1")
          .call(updateTitle,[17])
          .to(".resumeVideoBox", 1, {onStart: playResumeVideo, onStartParams:[266.5,321.5,321.5], scale: '1',opacity: '1', onReverseComplete: stopResumeVideo, ease: Power4.easeIn})
          .addPause()
          .to(".resumeVideoBox", 1, {scale: '0',opacity: '0', onComplete: stopResumeVideo, onReverseComplete: playResumeVideo, onReverseCompleteParams:[266.5,321.5,321.5], ease: Power4.easeOut})
          .staggerFrom($("#page17").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".cita60",1,{ transform: 'rotateX(0deg)', onReverseComplete: stopResumeVideo, ease: Bounce.easeOut},"+=1")
          .addPause()
          //EPISODE 19
          .staggerTo($("#page17").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page17",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page18",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .add("CB2")
          .call(updateTitle,[18])
          .staggerFrom($("#page18").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".cita61",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
          //.to(".resumeVideoBox", 0.5, {onStart: playResumeVideo, onStartParams: [298,320,320], opacity: '0',scale: '0', ease: Power4.easeOut})
          .call(updateTitle,[19])
          .addPause()
          //EPISODE 20
          .staggerTo($("#page18").children(),0.6, animationToPattern, staggerToVelocity)
          .to(".blurEffect8",0.2,{ onStart: stopResumeVideo, filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone})
          .to(".lasv8", 0.3, {opacity: '0', ease: Back.easeOut.config(1)},"+=1")
          .to(".lasv9", 0.3, {opacity: '0', ease: Back.easeOut.config(1)})
          .to(".lasv6", 0.3, {opacity: '0', ease: Back.easeOut.config(1)})
          .to(".lasv7", 0.3, {opacity: '0', ease: Back.easeOut.config(1)})
          .to(".lasv5", 0.3, {transform: 'rotate(180deg)', ease: Back.easeOut.config(1)})
          .to(".lasv4", 0.3, {transform: 'rotate(180deg)', ease: Back.easeOut.config(1)})
          .to(".lasv10", 0.3, {top:'-150%', ease: Bounce.easeOut})
          .to(".lasv3", 0.3, {top:'-1500%', ease: Bounce.easeOut})
          .to(".lasv2", 0.3, {top:'-150%', ease: Bounce.easeOut})
          .to(".lasv1", 0.3, {opacity: '0', ease: Back.easeOut.config(1)})
          .add("EP1")
          .to(".age3",0.3,{ transform: 'rotateX(90deg)', onComplete: playSound, onCompleteParams: [playListOrder[10]], onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[9]], ease: Bounce.easeOut})
          .call(updateTitle,[20])
          .to(".barc1", 3, {opacity: '1', ease: Power4.easeIn})
          .to(".barc4", 0.3, {transform: 'scale(1)', ease: Power2.easeIn})
          .to(".barc5", 0.3, {transform: 'scale(1)', ease: Power2.easeIn})
          .to(".barc6", 0.3, {transform: 'scale(1)', ease: Power2.easeIn})
          .to(".barc7", 0.3, {transform: 'scale(1)', ease: Power2.easeIn})
          .to(".barc8", 0.3, {transform: 'scale(1)', ease: Power2.easeIn})
          .to(".barc2", 4, {left: '33%', ease: Power4.easeIn})
          .to(".barc3", 4, {left: '0%', ease: Power4.easeIn},"-=4")
          .to(".barc2", 2, {left: '30%', transform: 'scale(0.7)', top: '0%',  ease: Power4.easeIn})
          .to(".barc2", 4, {left: '0%', transform: 'scale(1)',  ease: Power4.easeIn})
          .to(".barc2", 4, {opacity: '0',  ease: Power4.easeIn})
          .to(".age4",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"-=0.3")
          .to("#page18",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page19",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .call(updateTitle,[21])
          .staggerFrom($("#page19").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".cita62",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
          .addPause()
          //EPISODE 21
          .staggerTo($("#page19").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page19",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page20",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .add("EP2")
          .staggerFrom($("#page20").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".textoFin",3,{ transform: 'scale(1)', opacity: '1', ease: Power4.easeOut},"+=2")
          .to(".textoFin",3,{ top: '0', ease: Power4.easeOut},"+=2")
          .to(".ep15",3,{ opacity: '1', ease: Power4.easeOut},"-=3")
          .to(".blurEffect9",6,{ onStart:function(){soundEpilogo.fade(1,0,6000)},opacity: '0', ease: Power4.easeOut},"-=6")
          .to(".age4",3,{onReverseComplete: function(){soundEpilogo.fade(0,1,3000)},opacity: '0', ease: Power4.easeOut},"-=6")
          .addPause();

       tl.play();
       //setTimeout(playTimeLine, 15000);
       /* setTimeout(drawFace, 5000);*/

      //-------------------------------------
      //-------FUNCTIONS --------------------
        $scope.upTo = function(value, music) {
          //updateTitle(index);
          controlSound();
          if(music) { playSound(playListOrder[music]); }
          else { if(soundEpilogo)soundEpilogo.stop(); updateTitle(music); }
          stopNinoAnimation();
          if(value=='inicio') { playerIntro.play(); }
          if(value=='prologo1') { updateTitle(0); }
          else { playerIntro.pause(); }
          tl.play(value);
          if ($("div.overlay").hasClass("open")) $("#trigger-overlay").click();
        };
        $scope.openVideo = function(value, origin){
            player.src({ type: 'video/youtube', src: 'https://www.youtube.com/watch?v='+value });
            playVideo();
            TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(0.3) rotate(20deg)'}, delay:0.5, ease: Expo.easeOut});
            TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(1) rotate(0deg)', top: 0, left: 0}, delay:1.5, ease: Expo.easeOut});
            fullScreenVideoStatus = true;
        };
        $scope.closeVideo = function(){
          var player = videojs('fullScreeVideoEnter');
          if(fullScreenVideoStatus){
              TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(0.3) rotate(0deg)'}, ease: Expo.easeOut});
              TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(0) rotate(30deg)'}, delay:1, onComplete: player.pause(), ease: Expo.easeOut});
              fullScreenVideoStatus = false;
            }
            setTimeout(function(){ player.pause(); if(soundEpilogo && soundEpilogo.volume() != 1 && boolsound == 1){ console.log(soundEpilogo.volume()); soundEpilogo.fade(0,1,2000); }}, 1000);
        };

        $scope.prevFoto = function(id,value){
          if(value==undefined) var desp = '-110%';
          else var desp = '-'+value;
          var firstPhoto = $('.slideimg'+id).first();
          console.log('entra', id, value, firstPhoto)
          TweenMax.to(firstPhoto, 0.1, {left: desp, repeatDelay:0.1, repeat:1, yoyo:true, onRepeat:function(){$('#fotoGroup'+id).append(firstPhoto)}, ease: Power4.easeOut});
        };

        $scope.nextFoto = function(id, value){
          if(value==undefined) var desp = '110%';
          else var desp = value;
          var firstPhoto = $('.slideimg'+id).last();
          console.log('entra', id, value, firstPhoto)
          TweenMax.to(firstPhoto, 0.1, {left: desp, repeatDelay:0.1, repeat:1, yoyo:true, onRepeat:function(){$('#fotoGroup'+id).prepend(firstPhoto)}, ease: Power4.easeOut});
        };

        $scope.openCloseAddInfo = function(val){
          var target = '.ad'+val;
          if($('.plusInfoO'+val).css('opacity')==1){
              $('.plusInfoC'+val).css('opacity','1');
              $('.plusInfoO'+val).css('opacity','0');
              TweenMax.to(target, 0.3, {opacity: 1, scale:1, ease:Back.easeOut});
            }
          else{
            $('.plusInfoC'+val).css('opacity','0');
            $('.plusInfoO'+val).css('opacity','1');
            TweenMax.to(target, 0.3, {opacity: 0, scale:0, ease:Back.easeOut});
          }
        };

        $(document).on('click','.plusInfoCita', function(){
          var numTexto = $(this).attr('value');
          if($(this).text()=='[+]'){
            $(this).text('[-]');
            _.each(totalWords[parseInt(numTexto)], function(val,i){
              setTimeout(function(){insertWords(val,numTexto)}, 5*i);
            });
          }
          else {
            $(this).text('[+]');
            _.each($('#cita'+numTexto+'suma').children(), function(val,i){
              setTimeout(function(){deleteWords(val)}, 5*i);
            });
          }
        });
        //------ TITLE ----------

        function updateTitle(index){
         if(index){
           var notes = $(".pentagramNotes");
           notes.removeClass("activeNote")
           for (var i = 0; i <= index; i++) {
             $(notes[i]).addClass("activeNote");
           }
           var note = $($(".pentagramNotes")[index]);
           var title = note.find(".tooltip-text").html();
           $(".currentDetails h4").html(title);
         }
          else $(".currentDetails h4").html('');
        }

    //-----------------------

        function playOnlyAudio(id){
            if(soundEpilogo && soundEpilogo.volume() != 0){ soundEpilogo.fade(1,0,2000); }
            player.src({ type: 'video/youtube', src: 'https://www.youtube.com/watch?v='+id });
            playTimelineBefore = false;
            playVideo();
          }
        function playVideo(){
            if(soundEpilogo && soundEpilogo.volume() > 0){ console.log(soundEpilogo.volume()); soundEpilogo.fade(1,0,2000); }
            controlSound()
            player.play();
            player.on("ended", function(){
              if(playTimelineBefore){
                  console.log('porque entra?? ', playTimelineBefore);
                  closeVideo();
                  tl.play();
                }
              if(soundEpilogo && soundEpilogo.volume() < 1) soundEpilogo.fade(0,1,2000);
            })
          };
        function stopVideo(){
          player.pause();
        }
        function openVideo(value, ct){
          if(ct!=undefined) playTimelineBefore= true;
          player.src({ type: 'video/youtube', src: 'https://www.youtube.com/watch?v='+value });
          playVideo();
          TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(0.3) rotate(20deg)'}, delay:0.5, ease: Expo.easeOut});
          TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(1) rotate(0deg)', top: 0, left: 0}, delay:1.5, ease: Expo.easeOut});
          fullScreenVideoStatus = true;
        };
        function closeVideo(){
          var player = videojs('fullScreeVideoEnter');
          if(fullScreenVideoStatus){
            TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(0.3) rotate(0deg)'}, ease: Expo.easeOut});
            TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(0) rotate(30deg)'}, delay:1, onComplete: player.pause(), ease: Expo.easeOut});
            fullScreenVideoStatus = false;
          }
          setTimeout(function(){ player.pause(); if(soundEpilogo && soundEpilogo.volume() != 1 ){ console.log(soundEpilogo.volume()); soundEpilogo.fade(0,1,2000); }}, 1000);
        };
        function playIntroVideo(){
            if(soundEpilogo && soundEpilogo.volume() > 0){ console.log(soundEpilogo.volume()); soundEpilogo.fade(1,0,2000); }
            controlSound()
            playerIntro.play();
          };

        function stopIntroVideo(){
            if(soundEpilogo && soundEpilogo.volume() < 1){ console.log(soundEpilogo.volume()); soundEpilogo.fade(0,1,2000); }
            playerIntro.currentTime(0);
            playerIntro.pause();
          };

        function playResumeVideo(timer, duration, breakpoint, continueBeforeStop){
            if(soundEpilogo && soundEpilogo.volume() > 0){ soundEpilogo.fade(1,0,2000); }
            controlSound();
            $(".resumeVideoBox").show();
            resume.currentTime(timer);
            resume.play();
            resume.off('timeupdate');
            resume.breakpoint = false;
            resume.on('timeupdate', function() {
              if (!resume.breakpoint && (resume.currentTime() >= breakpoint) ){
                console.log("Current time (breakpoint): "+resume.currentTime());
                resume.breakpoint = true;
                if(!continueBeforeStop) tl.play();
              }
              if (resume.currentTime() >= duration) {
                console.log("Current time (end): "+resume.currentTime())
                resume.pause()
                tl.play();
                if(soundEpilogo && soundEpilogo.volume() < 1)soundEpilogo.fade(0,1,2000);
              }
            })
          };

        function stopResumeVideo(){
            if(soundEpilogo){ if(soundEpilogo.volume() < 1 && boolsound == 1) soundEpilogo.fade(0,1,2000); }
            resume.pause();
          }

        function fadeVolume(videoPlayer, volume, callback)
          {
            var factor  = 0.01,
              speed   = 50;
            var volume = videoPlayer.volume();
            if (volume > factor)
            {
              setTimeout(function(){
                fadeVolume(videoPlayer, (volume -= factor), callback);
              }, speed);
            } else {
              (typeof(callback) !== 'function') || callback();
            }
          }
        function controlSound(){
            player.pause();
            playerIntro.pause();
            resume.pause();
          }

        function playSound(url){
          if(soundEpilogo && soundEpilogo.volume() > 0){ console.log(soundEpilogo.volume()); soundEpilogo.fade(1,0,3000); }
          setTimeout(function(){
            if(soundEpilogo) soundEpilogo.stop();
            soundEpilogo = new Howl({
              urls: ['audio/'+url+'.mp3'],
              loop: true,
              volume: 0,
              onend: function() {
              }
            });
            if(resume.paused() && boolsound == 1 && player.paused() ) soundEpilogo.fade(0,1,3000);
            soundEpilogo.play();
          }, 500)
        }

        function ninoAnimation(){
          cugatNino
            .set(".ed5", {top: '5%', left: "120%", transform: "rotate(0deg)"})
            .to(".ed5", 1, {left: '20%', ease: Power0.easeNone})
            .to(".ed5", 3, {left: '-14%', transform: "rotate(5deg)", top: '-7%', ease: Power0.easeNone})
            .to(".ed5", 1, {left: '-25%',  top: '-10%', ease: Power0.easeNone})
            .to(".ed5", 3, {left: '-150%',transform: "rotate(0deg)", top: '-7%', ease: Power0.easeNone})
            .to(".ed5", 0.1, {transform: "rotateY(180deg)", ease: Power0.easeNone})
            .to(".ed5", 5, {left: '25%', top: '-7%', ease: Power0.easeNone})
            .to(".ed5", 3, {left: '65%', top: '3%', ease: Power0.easeNone})
            .to(".ed5", 3, {left: '150%', top: '3%', ease: Power0.easeNone})
            .play();
        };
        function stopNinoAnimation(){
          TweenMax.to(".ed5",0.1, {top: '5%', left: "120%", transform: "rotate(0deg)", ease: Power0.easeNone});
          cugatNino.pause();
        };
        function insertWords(variable,num){
          $('#cita'+num+'suma').append(variable);
          TweenMax.from(variable, 0.1, {opacity: 0, y:-40, transformOrigin:"0% 50% -50", ease: Power2.easeOut});
        }
        function deleteWords(variable){
          $(variable).remove();
        }
        function initViaje(){
          viaje1.drawsvg('animate');
        }

      //----------MOUSE CONTROLS --------

      $(window).bind('mousewheel DOMMouseScroll', function(event){
        event.preventDefault();
        TweenMax.to('.additional', 0.2, {opacity: 0, scale:0, ease:Back.easeOut});
        if(event.type != 'mousedown'){
          if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            tl.reverse();
            if(fullScreenVideoStatus) closeVideo();
          }
          else {
            tl.play();
            if(fullScreenVideoStatus) closeVideo();
          }
        }
      });

      //------------------------------------
      // MENU

      var container = $( 'div.container' ),
          triggerBttn = $( '#trigger-overlay' ),
          soundBttn = $( '.si-icon-volume'),
          overlay = $( 'div.overlay' ),
          closeBttn = $( 'button.overlay-close'),
          transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
          },
          transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
          support = { transitions : Modernizr.csstransitions };

        function toggleOverlay() {
          if( overlay.hasClass( 'open' ) ) {
            overlay.removeClass( 'open' );
            container.removeClass( 'overlay-open' );
            overlay.addClass( 'close' );
            var onEndTransitionFn = function( ev ) {
              overlay.removeClass( 'close' );
            };
            if( support.transitions ) {
              try{
                overlay.on(transEndEventName, function(){onEndTransitionFn()})
                //overlay.addEventListener( transEndEventName, onEndTransitionFn );
              } catch(ex){
                onEndTransitionFn();
              }
            }
            else {
              onEndTransitionFn();
            }
          }
          else if( !overlay.hasClass( 'close' ) ) {
            overlay.addClass( 'open' );
            container.addClass( 'overlay-open' );
          }
        }

        function toggleSound(){
          boolsound = boolsound ? 0 : 1;
          player.volume(boolsound);
          playerIntro.volume(boolsound);
          resume.volume(boolsound);
          soundEpilogo.volume(boolsound);
        }

        triggerBttn.on( 'click', function(){toggleOverlay()} );
        soundBttn.on( 'click', function(){toggleSound()} );
        //closeBttn.on( 'click', function(){toggleOverlay()} );

        (function() {
          // initialize icons
          [].slice.call( document.querySelectorAll( '.si-icons-default > .si-icon' ) ).forEach( function( el ) {
            var svgicon = new svgIcon( el, svgIconConfig );
          } );
        })();


  });
