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

      //---------------------------
      //----SOUND TRACKS -----

        /*var soundEpilogo = new Howl({
          urls: ['audio/ValsViudaAlegre.mp3'],
          loop: true,
          volume: 0.5,
          onend: function() {
            console.log('Finished!');
          }
        });*/

      //-----------------------
      //------ DRAW SVG ------------
      /*var facePortada = $('#FirstFace').drawsvg({
        duration: 3000,
        easing: 'linear',
        callback: function() {
          console.log('dibujo terminado');
        }
      });*/
      var viaje1 = $('#viaje1Svg').drawsvg({
        duration: 8000,
        easing: 'linear',
        callback: function() {
          //console.log('dibujo terminado');
        }
      });
      //----------------------------
      //---------VIDEOS--------

        //$("#skip").on("click", function(){
        //    quitVideo();
        //});

        //function quitVideo(){
        //  if(videoDisplay){
        //      soundEpilogo.play();
        //      tl.play();
        //      videoDisplay = false;
        //    }
        //  }

        var player = videojs('fullScreeVideoEnter');
        var playerIntro = videojs('introVideo');
        
        var playVideo = function(){
            //player.currentTime(0);
            player.play();
        }
        var playIntroVideo = function(){
            //playerIntro.currentTime(0);
            playerIntro.play();
        }
        var stopIntroVideo = function(){
            playerIntro.currentTime(0);
            playerIntro.pause();
        }
        playerIntro.ready(function(){
          playerIntro.on("ended",function(){
            console.log("intro video ended")
            tl.play(); // On Intro Video ended, next slide
          })
        });


      //-----------------------
      //------ TITLE ----------

      var updateTitle = function(index){

          var notes = $(".pentagramNotes");
          notes.removeClass("activeNote")
          for (var i = 0; i <= index; i++) {
            $(notes[i]).addClass("activeNote");
          }
          var note = $($(".pentagramNotes")[index]);
          var title = note.find(".tooltip-text").html();
          $(".currentDetails h4").html(title);
        }

      //-----------------------
      //-----TIMELINE ---------
        var animationFromPattern = { scale: '0', right: '-20%', ease: Back.easeInOut.config(1)};
        var animationToPattern = { scale: '0', opacity: '0', ease: Back.easeInOut.config(1)};
        var staggerFromVelocity = 0.05;
        var staggerToVelocity = 0.03;


        TweenMax.set(".scrollIcon, .hiddenCanvas, .dinamycText, .ageTitle, .napFace, .addon1, .prel01", {visibility:"visible"});

        var tl = new TimelineMax({repeat:0});

        tl
          //EPISODE 1
          .call(playIntroVideo,[])
          .to(".videoCover", 3, {css:{opacity: '0.6'}, delay: 4, ease: Power0.easeOut},"inicio")
          .staggerFrom(introWords, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
          .staggerFrom(introWordsSubtitle, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
          .staggerFrom(introWordsName, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
          .to(".mouseIcon", 0.5, {bottom: '150px', ease: Bounce.easeIn})
          .addPause()
          //EPISODE 2
          .call(stopIntroVideo,[])
          .to(".ed1", 0.5, {left: '0%', ease: Bounce.easeOut},"prologo")
          .to(".ed2", 0.5, {top: '0%', ease: Bounce.easeOut})
          .to(".ed3", 0.5, {left: '0%', ease: Bounce.easeOut},"-=1")
          .to(".ed4", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)})
          .to("#page0",0.5,{ scale: '0', ease: Back.easeIn.config(1)})
          .to("#page1",0.1,{ right: '0%', onComplete: hideVideo, ease: Power0.easeNone})
          .to(".pentagramRect",0.2,{ bottom: '1%', ease: Power0.easeNone},"-=0.2")
          .to(".currentDetails",0.2,{ top: '12px', ease: Power0.easeNone},"-=0.2")
          .to(".claveSol",0.2,{ bottom: '0', ease: Power0.easeNone},"-=0.2")
          .to(".pentagramBack",0.2,{ bottom: '0%', ease: Power0.easeNone},"-=0.2")
          .to(".pentagramNotesGroup",0.2,{ bottom: '2%', ease: Power0.easeNone},"-=0.2")
          .to(".age1",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"-=0.2")
          .call(updateTitle,[0])
          .to(".blurEffect1",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .staggerFrom($("#page1").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 3
          .staggerTo($("#page1").children(),0.6, animationToPattern, staggerToVelocity)
          .to(".blurEffect1",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone})
          .to(".ed2", 0.5, {left: '-5%', ease: Power2.easeIn},"scrollGer")
          .to(".ed3", 0.5, {left: '-10%', ease: Power2.easeIn},"scrollGer")
          .to(".ed4", 0.5, {left: '-15%', ease: Power2.easeIn},"scrollGer")
          .to("#page1",0.4,{ right: '100%', ease: Power0.easeNone},"-=0.5")
          .to("#page2",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .from(".mapSvgClassTop", 1, {scale: 0,onComplete:initViaje, ease: Back.easeOut })
          .to(".mapSvgClassTop", 4, {width: '250%', top: '-60%', left: '-25%' , ease: Power2.easeIn},"+=1")
          .to(".cub1", 0.5, {top: '0%', ease: Power0.easeNone},"cuba1")
          .to(".ed1", 0.5, {top: '120%', ease: Power2.easeIn})
          .to(".ed2", 0.5, {top: '120%', ease: Power2.easeIn})
          .to(".ed3", 0.5, {top: '120%', ease: Power2.easeIn},"-=1")
          .to(".ed4", 0.5, {top: '120%', ease: Power2.easeIn})
          .to(".mapSvgClassTop", 2, {width: '800%', top: '-385%', left: '-140%', ease: Power2.easeIn},"-=1.2")
          .call(updateTitle,[1])
          .addPause()
          //EPISODE 4
          .to("#page2",0.4,{ right: '100%', ease: Power0.easeNone},"cuba2")
          .to("#page3",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".age1",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
          .to(".age2",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"-=0.3")
          .call(updateTitle,[2])
          .to(".blurEffect2",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .staggerFrom($("#page3").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 5
          .staggerTo($("#page3").children(),0.6, animationToPattern, staggerToVelocity)
          .to(".cub1", 0.5, {transform: 'rotateY(165deg)', ease: Power2.easeIn},"newyork1")
          .to(".ny4", 0.2, {top: '0%', ease: Bounce.easeOut},"-=0.5")
          .to(".ny3", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny1", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny2", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny5", 0.8, {scale: '1', right: '0', ease: Power4.easeOut},"-=0.2")
          .to(".ny6", 0.8, {scale: '1', right: '0', ease: Power4.easeOut},"-=0.2")
          .to(".ny7", 0.8, {scale: '1', right: '0', ease: Power4.easeOut},"-=0.2")
          .call(updateTitle,[3])
          .to("#page3",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page4",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".blurEffect3",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .staggerFrom($("#page4").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 6
          .staggerTo($("#page4").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page4",0.4,{ right: '100%', ease: Back.easeInOut.config(1)},"ritaMontaner")
          .to("#page5",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .call(updateTitle,[4])
          .staggerFrom($("#page5").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 7
          .staggerTo($("#page5").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page5",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
          .to("#page6",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .call(updateTitle,[5])
          .to(".blurEffect3",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone},"+=1")
          .to(".ny5", 0.5, {scale: '5', right: '200%', ease: Power4.easeIn})
          .to(".ny6", 0.5, {scale: '5', right: '200%', ease: Power4.easeIn},"-=0.2")
          .to(".ny7", 0.5, {scale: '5', right: '200%', ease: Power4.easeIn},"-=0.2")
          .to(".ny3", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ny1", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ny2", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ny4", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ber1", 0.3, {transform: 'rotateY(0deg)', ease: Back.easeOut.config(1)})
          .to(".blurEffect4",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .staggerFrom($("#page6").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 8
          .staggerTo($("#page6").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page6",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
          .to("#page7",0.2,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .call(updateTitle,[6])
          .to(".blurEffect4",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone},"-=1")
          .to(".ber1", 0.3, {transform: 'rotateY(165deg)', ease: Back.easeOut.config(1)})
          .to(".holly2", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)})
          .to(".holly1", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".holly3", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".holly4", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".holly7", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".holly6", 2, {top: '0%', ease: Power4.easeOut})
          .to(".blurEffect6",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .staggerFrom($("#page7").children(),0.6, animationFromPattern, staggerFromVelocity)
          .to(".holly5", 2, {opacity: '1', ease: Power4.easeOut})
          .addPause()
          //EPISODE 9
          .staggerTo($("#page7").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page7",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
          .to(".blurEffect6",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone},"-=1")
          .call(updateTitle,[7])
          .to(".holly5", 1, {opacity: '0', ease: Power4.easeOut})
          .to(".holly2", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.5")
          .to(".holly1", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
          .to(".holly3", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
          .to(".holly4", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
          .to(".holly7", 0.5, {top: '150%', ease: Bounce.easeOut},"-=0.3")
          .to(".holly6", 0.5, {top: '-150%', ease: Power4.easeOut},"-=0.3")
          .to(".carn1", 0.3, {transform: 'rotateY(0deg)', ease: Back.easeOut.config(1)},"carmenCastillo-=0.5")
          .call(updateTitle,[8])
          .to(".blurEffect5",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .to("#page8",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .staggerFrom($("#page8").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 10
          .staggerTo($("#page8").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page8",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
          .to("#page9",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .call(updateTitle,[9])
          .staggerFrom($("#page9").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 11
          .staggerTo($("#page9").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page9",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
          .to("#page10",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .call(updateTitle,[10])
          .to(".age2",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
          .to(".age3",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"-=0.3")
          .staggerFrom($("#page10").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 12
          .staggerTo($("#page10").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page10",0.4,{ right: '100%', ease: Power0.easeNone},"lorraineAllen")
          .call(updateTitle,[11])
          .to(".blurEffect5",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone},"-=0.2")
          .to(".carn1", 0.3, { transform: 'rotateY(165deg)', ease: Back.easeOut.config(1)})
          .to(".chi4", 0.3, { opacity: '1', ease: Bounce.easeOut },"-=0.2")
          .to(".chi2", 1, { opacity: '1', ease: Power4.easeOut })
          .to(".chi1", 4, { opacity: '1', ease: Power0.easeNone },"+=1")
          .to(".chi5", 1, { left: '0', ease: Power4.easeOut })
          .to(".chi6", 1, { left: '0', ease: Power4.easeOut })
          .call(updateTitle,[12])
          .to(".blurEffect7",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .to("#page11",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .staggerFrom($("#page11").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 13
          .staggerTo($("#page11").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page11",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page12",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .call(updateTitle,[13])
          .staggerFrom($("#page12").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 14
          .staggerTo($("#page12").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page12",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page13",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .call(updateTitle,[14])
          .staggerFrom($("#page13").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 15
          .staggerTo($("#page13").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page13",0.4,{ right: '100%', ease: Power0.easeNone})
          .call(updateTitle,[15])
          .to(".blurEffect7",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone},"+=1")
          .to(".chi2", 0.3, {opacity: '0', ease: Back.easeOut.config(1)},"+=0.5")
          .to(".chi4", 0.3, {opacity: '0', ease: Bounce.easeOut},"+=0.5")
          .to(".chi5", 1, {left: '150%', ease:Power4.easeOut})
          .to(".chi6", 1, {left: '-150%', ease: Power4.easeOut})
          .to(".chi1", 0.3, {opacity: '0', ease: Back.easeOut.config(1)},"-=0.2")
          .to("#page14",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".lasv1", 0.3, {opacity: '1', ease: Back.easeOut.config(1)},"abbeLane")
          .to(".lasv2", 0.3, {top:'0%', ease: Bounce.easeOut})
          .to(".lasv3", 0.3, {top:'0%', ease: Bounce.easeOut})
          .to(".lasv10", 0.3, {top:'0%', ease: Bounce.easeOut})
          .to(".lasv4", 0.3, {transform: 'rotate(0deg)', ease: Back.easeOut.config(1)})
          .to(".lasv5", 0.3, {transform: 'rotate(0deg)', ease: Back.easeOut.config(1)})
          .to(".lasv6", 0.3, {opacity: '1', ease: Back.easeOut.config(1)})
          .to(".lasv7", 0.3, {opacity: '1', ease: Back.easeOut.config(1)})
          .to(".lasv8", 0.3, {opacity: '1', ease: Back.easeOut.config(1)})
          .to(".lasv9", 0.3, {opacity: '1', ease: Back.easeOut.config(1)})
          .call(updateTitle,[16])
          .to(".blurEffect8",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .staggerFrom($("#page14").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 16
          .staggerTo($("#page14").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page14",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page15",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .call(updateTitle,[17])
          .staggerFrom($("#page15").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 17
          .staggerTo($("#page15").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page15",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page16",0.4,{ right: '0%', ease: Power0.easeNone})
          .call(updateTitle,[18])
          .staggerFrom($("#page16").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 18
          .staggerTo($("#page16").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page16",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page17",0.4,{ right: '0%', ease: Power0.easeNone})
          .to(".blurEffect8",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone})
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
          .call(updateTitle,[19])
          .staggerFrom($("#page17").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 19
          .staggerTo($("#page17").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page17",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page18",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .call(updateTitle,[20])
          .staggerFrom($("#page18").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          .to("#cb01",0.4,{ right: '80%', scale: '0', ease: Power4.easeOut},"bTrans")
          .to("#texto61",0.4,{ right: '80%', scale: '0', ease: Power4.easeOut},"bTrans")
          .to("#texto63",0.4,{ right: '25%', scale: '1', ease: Power4.easeOut},"bTrans")
          .to("#cb04",0.4,{ right: '45%', scale: '1', ease: Power4.easeOut},"bTrans")
          .addPause()
          //EPISODE 20
          .staggerTo($("#page18").children(),0.6, animationToPattern, staggerToVelocity)
          .to(".age3",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
          .to(".age4",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"-=0.3")
          .to("#page18",0.4,{ right: '100%', ease: Power0.easeNone}, "epilogo")
          .to("#page19",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .call(updateTitle,[21])
          .staggerFrom($("#page19").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 21
          .staggerTo($("#page19").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page19",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page20",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .call(updateTitle,[22])
          .staggerFrom($("#page20").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause();

       tl.play();
       //setTimeout(playTimeLine, 15000);
       /* setTimeout(drawFace, 5000);*/

      //---------------------------------
    //---------MAP D3 CONTROLLER -----------

      //var width = window.innerWidth/1.5,
      //    height = window.innerHeight/2;
      //var circulitos;
      //
      //if(width<1500) var dimensions = {leftCenter:-40,upCenter: 20,scaleX:300, font: "14px"};
      //else var dimensions = {leftCenter:-80,scaleX:400, font: "22px"};
      //
      //var projection = d3.geo.mercator()
      //  .center([dimensions.leftCenter, dimensions.upCenter])
      //  .scale(dimensions.scaleX)
      //  .rotate([0,0]);
      //
      //var svg = d3.select("#mapContainer").append("svg")
      //  .attr("width", width)
      //  .attr("height", height);
      //
      //var path = d3.geo.path()
      //  .projection(projection);
      //
      //var g = svg.append("g");
      //
      //d3.json("images/models/world-110m2.json", function(error, topology) {
      //  d3.csv("images/models/cities.csv", function(error, data) {
      //  var elementy1 = g.selectAll("circle")
      //      .data(data)
      //      .enter()
      //    circulitos = elementy1.append("circle")
      //        .attr("cx", function(d) {
      //          return projection([d.lon, d.lat])[0];
      //        })
      //        .attr("cy", function(d) {
      //          return projection([d.lon, d.lat])[1];
      //        })
      //        .attr("r", 7)
      //        .attr("id", 'circulos')
      //        .style("opacity", "0.7")
      //        .style("fill", "rgba(255,255,255,0.2)")
      //        .style("stroke", "#ffd85f")
      //        .style("stroke-width", "2")
      //        .style("cursor", "pointer");
      //    elementy1.append('text')
      //        .text(function(d) {
      //          return d.name;
      //        })
      //        .attr('x', function(d) {
      //          return (projection([d.lon, d.lat])[0])+ (d.precisionX*1);
      //        })
      //        .attr('y', function(d) {
      //          return (projection([d.lon, d.lat])[1])+ (d.precisionY*1);
      //        })
      //        .attr('fill', '#ffd85f')
      //        .style("font-size", dimensions.font)
      //        .style("font-family", "'Alice',serif")
      //        .style("cursor", "pointer");
      //  });
      //  g.selectAll("path")
      //    .data(
      //    topojson
      //      .object(topology, topology.objects.countries)
      //      .geometries)
      //    .enter()
      //    .append("path")
      //    .attr("d", path)
      //    .attr('stroke', '#ffd85f')
      //    .attr('stroke-width', '0.5px')
      //    .attr('fill', '#56481e')
      //    .on('mouseover', function(d) {
      //      console.log(d);
      //    })
      //});
      //
      //setInterval(function(){
      //    circulitos.attr("r",10);
      //    circulitos
      //      .transition()
      //      .duration(800)
      //      .attr("r",1);
      //  }, 1000);

      //--------------------------------------
      //-------FUNCTIONS --------------------
        $scope.upTo = function(value) {
          if(value=='inicio') $('#introVideo').attr('src', 'https://www.youtube.com/embed/wpWO4L0qPPw?playlist=wpWO4L0qPPw&autoplay=1&controls=0&loop=1&showinfo=0');
          else {
            $('#introVideo').attr('src', '');
            $('#introVideo').attr('src', 'https://www.youtube.com/embed/wpWO4L0qPPw?showinfo=0');
          }
          tl.play(value);
          if ($("div.overlay").hasClass("open")) $("#trigger-overlay").click();
        };
        $scope.openVideo = function(value, origin){
            /*var op = $( "."+origin );
            var position = op.position();
            $(".fullScreenVideo").css({top: position.top+"px", left: position.left+"px"});*/
            //$('.fullScreeVideoEnter').attr('src', 'https://www.youtube.com/embed/'+value+'?playlist='+value+'&autoplay=1&controls=0&loop=1&showinfo=0');
            player.src({ type: 'video/youtube', src: 'https://www.youtube.com/watch?v='+value });
            playVideo();
            TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(0.3) rotate(20deg)'}, delay:0.5, ease: Expo.easeOut})
            TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(1) rotate(0deg)', top: 0, left: 0}, delay:1.5, ease: Expo.easeOut})
            fullScreenVideoStatus = true;

        };
        $scope.closeVideo = function(){
            var player = videojs('fullScreeVideoEnter');
            player.pause();
            TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(0.3) rotate(0deg)'}, ease: Expo.easeOut})
            TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(0) rotate(30deg)'}, delay:1, onComplete: hideFullScreenVideo, ease: Expo.easeOut})
            fullScreenVideoStatus = false;
        };

        $scope.prevFoto = function(){
          var firstPhoto = $('.slideimg').first();
          TweenMax.to(firstPhoto, 0.1, {left: '-130%', repeatDelay:0, repeat:1, yoyo:true, onRepeat:$('#fotoGroup').append(firstPhoto), ease: Power2.easeOut});
        };

        $scope.nextFoto = function(){
          var firstPhoto = $('.slideimg').last();
          TweenMax.to(firstPhoto, 0.1, {left: '130%', repeatDelay:0, repeat:1, yoyo:true, onRepeat:$('#fotoGroup').prepend(firstPhoto), ease: Power2.easeOut});
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
        $(document).on('click','#mapIcon, #arrowClose',function(){
          openCloseMap();
        });

        //$(document).on('click','.plusInfo',function(){
        //  console.log($(this).css('opacity'));
        //  var value = $(this).attr('value');
        //  if($(this).css('opacity') == 1)$(this).css('opacity', '0');
        //  else $(this).css('opacity', '1');
        //  var target = '.ad'+value;
        //  var opacityValue = $(target).css('opacity');
        //  if(opacityValue == 0) TweenMax.to(target, 0.3, {opacity: 1, scale:1, ease:Back.easeOut});
        //  else  TweenMax.to(target, 0.3, {opacity: 0, scale:0, ease:Back.easeOut});
        //});

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

        function insertWords(variable,num){
          $('#cita'+num+'suma').append(variable);
          TweenMax.from(variable, 0.1, {opacity: 0, y:-40, transformOrigin:"0% 50% -50", ease: Power2.easeOut});
        }
        function deleteWords(variable){
          $(variable).remove();
        }

        function hideVideo(){
          $('#introVideo').attr('src', '');
          $('#introVideo').attr('src', 'https://www.youtube.com/embed/wpWO4L0qPPw?showinfo=0');
        }
        function hideFullScreenVideo(){
          $('.fullScreeVideoEnter').attr('src', '');
        }

        function initViaje(){
          viaje1.drawsvg('animate');
        }
        //function drawFace(){
        //  facePortada.drawsvg('animate');
        //  TweenMax.to(".instructions", 0.2, {opacity:1, repeat: 6,repeatDelay: 0.1, yoyo:true, ease: Power0.easeNone});
        //}

      //function openCloseMap(val) {
      //    if(val==undefined){
      //      if(!mapStatus){
      //        $("#mapIcon").addClass('mapIconMini');
      //        $(".mapItem").addClass('mapItemMini');
      //        $("#mapContainer").addClass('mapaD');
      //        mapStatus = true;
      //      }
      //      else {
      //        $("#mapIcon").removeClass('mapIconMini');
      //        $(".mapItem").removeClass('mapItemMini');
      //        $("#mapContainer").removeClass('mapaD');
      //        mapStatus = false;
      //      }
      //    }
      //    else if(val){
      //      $("#mapIcon").addClass('mapIconMini');
      //      $(".mapItem").addClass('mapItemMini');
      //      $("#mapContainer").addClass('mapaD');
      //      mapStatus = true;
      //    }
      //    else if (!val){
      //      $("#mapIcon").removeClass('mapIconMini');
      //      $(".mapItem").removeClass('mapItemMini');
      //      $("#mapContainer").removeClass('mapaD');
      //      mapStatus = false;
      //    }
      //  }


      //----------MOUSE CONTROLS --------

      $(window).bind('mousewheel DOMMouseScroll', function(event){
        event.preventDefault();
        TweenMax.to('.additional', 0.2, {opacity: 0, scale:0, ease:Back.easeOut});
        if(event.type != 'mousedown'){
          if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            tl.reverse();
            if(fullScreenVideoStatus)$scope.closeVideo();
          }
          else {
            tl.play();
            if(fullScreenVideoStatus)$scope.closeVideo();
          }
        }
      });

      //------------------------------------
      //-----------------------------------

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

        var boolsound = 1;
        function toggleSound(){
          boolsound = boolsound ? 0 : 1;
          player.volume(boolsound);
          playerIntro.volume(boolsound);
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
