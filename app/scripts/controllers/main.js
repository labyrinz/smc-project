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

          //var soundEpilogo = new Howl({
          //  urls: ['audio/'+url+'.mp3'],
          //  loop: false,
          //  volume: 0.5,
          //  onend: function() {
          //    console.log('Finished!');
          //  }
          //});

        //soundEpilogo.play().fadeIn(0.5, 2000)
        //
        //console.log('sound epilogo: ', soundEpilogo._src);

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
        var resume = videojs('resumeVideo');

        var playVideo = function(){
            //player.currentTime(0);
            controlSound()
            player.play();
        };

        var playIntroVideo = function(){
            //playerIntro.currentTime(0);
            controlSound()
            playerIntro.play();

        };

        var stopIntroVideo = function(){
            playerIntro.currentTime(0);
            playerIntro.pause();
        };

        var playResumeVideo = function(timer, duration, breakpoint){
          //resume.duration(8);
          controlSound();
          $(".resumeVideoBox").show();
          resume.currentTime(timer);
          resume.play();
          resume.off('timeupdate');
          resume.breakpoint = false;
          resume.on('timeupdate', function() {
            if ( !resume.breakpoint && (resume.currentTime() >= breakpoint) ){
              console.log("Current time (breakpoint): "+resume.currentTime())
              resume.breakpoint = true;
              tl.play()
            }
            if (resume.currentTime() >= duration) {
              console.log("Current time (end): "+resume.currentTime())
              resume.pause()
            }
          })

        };

        var stopResumeVideo = function(){
          resume.pause()
          $(".resumeVideoBox").hide();
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



        var controlSound = function(boolsound, callback){
          player.pause();
          playerIntro.pause();
          resume.pause();

          /*fadeVolume(player, player.volume(), function(){
              console.log('fade complete: player');
              player.pause();
              player.volume(boolsound)

              fadeVolume(playerIntro, playerIntro.volume(), function(){
                  console.log('fade complete: playerIntro');
                  playerIntro.pause();
                  playerIntro.volume(boolsound);

                  fadeVolume(resume, resume.volume(), function(){
                      console.log('fade complete: resume');
                      resume.pause();
                      resume.volume(boolsound);
                      (typeof(callback) !== 'function') || callback();
                  });
              });
          });*/

        }

        var playOnlyAudio =  function(id){
          player.src({ type: 'video/youtube', src: 'https://www.youtube.com/watch?v='+id });
          playVideo();
          //player.on("ended", function(){
          //  soundEpilogo.play();
          //})
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
        var cugatNino = new TimelineMax({repeat:3});

        tl
          //EPISODE 1
          .call(playIntroVideo,[])
          .call(stopResumeVideo)
          .to(".videoCover", 3, {css:{opacity: '0.6'}, delay: 2, ease: Power0.easeOut},"inicio")
          .staggerFrom(introWords, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
          .staggerFrom(introWordsSubtitle, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
          .staggerFrom(introWordsName, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
          .to(".mouseIcon", 0.5, {bottom: '150px', ease: Bounce.easeIn})
          .addPause()
          //EPISODE 2
          .call(stopIntroVideo,[])
          .to("#page0",0.5,{ scale: '0', ease: Back.easeIn.config(1)})
          .to(".ed1", 0.5, {left: '0%', onReverseComplete: stopNinoAnimation, ease: Bounce.easeOut},"prologo")
          .to(".ed2", 0.5, {top: '0%', ease: Bounce.easeOut})
          .to(".ed3", 0.5, {left: '0%', ease: Bounce.easeOut},"-=1")
          .to(".ed4", 0.5, {transform: 'rotateX(0deg)', onComplete: ninoAnimation, ease: Back.easeOut.config(1)})
          .to(".texto11",3,{ transform: 'scale(1)', opacity: '1', ease: Power4.easeOut},"+=1")
          .addPause()
          .to(".texto11",1.5,{ transform: 'scale(0)', opacity: '0', ease: Power4.easeOut},"+=0.2")
          .to("#page1",0.1,{ right: '0%', ease: Power0.easeNone})
          .to(".age1",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"-=0.2")
          .to(".pentagramRect",0.2,{ bottom: '1%', ease: Power0.easeNone})
          .to(".currentDetails",0.2,{ top: '0px', ease: Power0.easeNone},"-=0.2")
          .to(".claveSol",0.2,{ bottom: '0', ease: Power0.easeNone},"-=0.2")
          .to(".pentagramBack",0.2,{ bottom: '0%', ease: Power0.easeNone},"-=0.2")
          .to(".pentagramNotesGroup",0.2,{ bottom: '2%', ease: Power0.easeNone},"-=0.2")
          .call(updateTitle,[0])
          .to(".blurEffect1",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .staggerFrom($("#page1").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 3
          .staggerTo($("#page1").children(),0.6, animationToPattern, staggerToVelocity)
          .to(".blurEffect1",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone})
          //.call(playOnlyAudio,['qlhD0EGomJc'])
          .to(".ed2", 0.5, {left: '-5%', ease: Power2.easeIn},"scrollGer")
          .to(".ed3", 0.5, {left: '-10%', ease: Power2.easeIn},"scrollGer")
          .to(".ed4", 0.5, {left: '-15%', ease: Power2.easeIn},"scrollGer")
          .to("#page1",0.4,{ right: '100%', ease: Power0.easeNone},"-=0.5")
          .to("#page2",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .from(".mapSvgClassTop", 1, {scale: 0,onComplete:initViaje, ease: Back.easeOut })
          .to(".mapSvgClassTop", 4, {width: '250%', top: '-60%', left: '-25%' , ease: Power2.easeIn},"+=1")
          .to(".cub1", 0.5, {top: '0%', onComplete: stopNinoAnimation, ease: Power0.easeNone},"cuba1")
          .to(".ed1", 0.5, {top: '120%', onReverseComplete: ninoAnimation, ease: Power2.easeIn})
          .to(".ed2", 0.5, {top: '120%', ease: Power2.easeIn})
          .to(".ed3", 0.5, {top: '120%', ease: Power2.easeIn},"-=1")
          .to(".ed4", 0.5, {top: '120%', ease: Power2.easeIn})
          .to(".mapSvgClassTop", 2, {width: '800%', top: '-385%', left: '-140%', ease: Power2.easeIn},"-=1.2")
          .call(updateTitle,[1])
          .addPause()
          //EPISODE 4
          .to("#page2",0.4,{ right: '100%',onComplete: playOnlyAudio, onCompleteParams: ['ghTHOjcc3IM'], ease: Power0.easeNone},"cuba2")
          .to(".fullScreenVideo", 0.5, {css: {transform: 'scale(0.3) rotate(20deg)'}, ease: Expo.easeOut})
          .to(".fullScreenVideo", 0.5, {css: {transform: 'scale(1) rotate(0deg)', top: 0, left: 0}, ease: Expo.easeOut})
          .addPause()
          .to(".fullScreenVideo", 0.5, {css: {transform: 'scale(0.3) rotate(0deg)'}, onReverseComplete: playOnlyAudio, onReverseCompleteParams: ['ghTHOjcc3IM'],ease: Expo.easeOut})
          .to(".fullScreenVideo", 0.5, {css: {transform: 'scale(0) rotate(30deg)'}, onComplete: player.pause(), ease: Expo.easeOut})
          .to("#page3",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".age1",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
          .to(".age2",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"-=0.3")
          .call(updateTitle,[2])
          .to(".blurEffect2",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .staggerFrom($("#page3").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 5
          .staggerTo($("#page3").children(),0.6, animationToPattern, staggerToVelocity)
          .to(".cub1", 0.5, {transform: 'rotateY(165deg)', onComplete: playOnlyAudio, onCompleteParams: ['xYX5Ep2ALRo'], ease: Power2.easeIn},"newyork1")
          .to(".ny4", 0.2, {top: '0%', ease: Bounce.easeOut},"-=0.5")
          .to(".ny3", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny1", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny2", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny5", 0.8, {scale: '1', right: '0', ease: Power4.easeOut},"-=0.2")
          .to(".ny6", 0.8, {scale: '1', right: '0', ease: Power4.easeOut},"-=0.2")
          .to(".ny7", 0.8, {scale: '1', right: '0',onComplete: playOnlyAudio, onCompleteParams: ['xYX5Ep2ALRo'], ease: Power4.easeOut},"-=0.2")
          .call(updateTitle,[3])
          .to("#page3",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page4",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".blurEffect3",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .staggerFrom($("#page4").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 6
          .staggerTo($("#page4").children(),0.6, animationToPattern, staggerToVelocity,"ritaMontaner")
          .call(updateTitle,[4])
          .call(playResumeVideo,[38.5,89,55])
          .to(".resumeVideoBox", 1, {opacity: '1', scale: '1', ease: Power4.easeIn})
          .addPause()
          .to(".resumeVideoBox", 0.5, {scale: '0.2', ease: Power4.easeOut})
          //.call(playResumeVideo,[55,88])
          .to("#page4",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
          .to("#page5",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .staggerFrom($("#page5").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 7
          .staggerTo($("#page5").children(),0.6, animationToPattern, staggerToVelocity)
          .call(stopResumeVideo)
          .to(".resumeVideoBox", 0.1, {opacity: '0', scale: '1', ease: Power4.easeOut})
          //.to(".resumeVideoBox", 0.3, {scale: '0', ease: Power4.easeOut})
          .to("#page5",0.4,{ right: '100%', ease: Back.easeInOut.config(1)},"ritaMontaner2")
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
          .to("#page6",0.4,{ right: '100%', ease: Back.easeInOut.config(1)},"losAngeles")
          .to("#page7",0.2,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .call(playOnlyAudio,['mnX-eWJktbg'])
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
          .to(".holly5", 1, {opacity: '0', ease: Power4.easeOut})
          .to(".holly2", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.5")
          .to(".holly1", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
          .to(".holly3", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
          .to(".holly4", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
          .to(".holly7", 0.5, {top: '150%', ease: Bounce.easeOut},"-=0.3")
          .to(".holly6", 0.5, {top: '-150%', ease: Power4.easeOut},"-=0.3")
          .to(".carn2", 4, { opacity: '1', ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 2, points: 20, taper: "none", randomize: true, clamp: false})},"carmenCastillo")
          .to(".carn1", 2, {opacity: '1', ease: Back.easeOut.config(1)},"-=2")
          .to(".carn1", 2, {top: '-70%', ease: Power4.easeOut})
          .to(".carn2", 2, {top: '-70%', ease: Power4.easeOut},"-=2")
          .to(".carn3", 2, {top: '-70%', ease: Power4.easeOut},"-=2")
          .to(".carn4", 2, {top: '-70%', ease: Power4.easeOut},"-=2")
          .to(".carn5", 2, {top: '-70%', ease: Power4.easeOut},"-=2")
          .to(".carn6", 2, {top: '-70%', ease: Power4.easeOut},"-=2")
          .to(".blurEffect5",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .to("#page8",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .to(".age2",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
          .to(".age3",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"-=0.3")
          .call(updateTitle,[7])
          .call(playResumeVideo,[101,131,131])
          .to(".resumeVideoBox", 1, {opacity: '1', scale: '1', ease: Power4.easeIn})
          .addPause()
          .to(".resumeVideoBox", 1, {opacity: '0', ease: Power4.easeOut})
          .call(stopResumeVideo)
          .to(".blurEffect5",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .to("#page8",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .staggerFrom($("#page8").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 10
          .staggerTo($("#page8").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page8",0.4,{ right: '100%', ease: Back.easeInOut.config(1)},"carmenCastillo2")
          .to("#page9",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .call(updateTitle,[8])
          .staggerFrom($("#page9").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 11
          .staggerTo($("#page9").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page9",0.4,{ right: '100%', ease: Back.easeInOut.config(1)},"carmenCastillo3")
          .to("#page10",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
          .call(updateTitle,[9])
          .staggerFrom($("#page10").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 12
          .staggerTo($("#page10").children(),0.6, animationToPattern, staggerToVelocity)
          .to(".blurEffect5",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone})
          .to(".blurEffect5", 2, { opacity: '0', ease: Back.easeOut.config(1)},"+=2")
          .to("#page10",0.4,{ right: '100%', ease: Power0.easeNone},"lorraineAllen")
          .call(playResumeVideo,[132,189,189])
          .call(updateTitle,[10])
          .to(".resumeVideoBox", 1, {opacity: '1', ease: Power4.easeIn})
          .addPause()
          .to(".resumeVideoBox", 1, {opacity: '0', ease: Power4.easeOut})
          .call(stopResumeVideo)
          .to(".chi4", 0.3, { opacity: '1', ease: Bounce.easeOut },"-=0.2")
          .to(".chi2", 1, { opacity: '1', ease: Power4.easeOut })
          .to(".chi1", 4, { opacity: '1', ease: Power0.easeNone },"+=1")
          .to(".chi5", 1, { left: '0', ease: Power4.easeOut })
          .to(".chi6", 1, { left: '0', ease: Power4.easeOut })
          .to(".blurEffect7",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .to("#page11",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .staggerFrom($("#page11").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 13
          .staggerTo($("#page11").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page11",0.4,{ right: '100%', ease: Power0.easeNone},"lorraineAllen2")
          .to("#page12",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .call(updateTitle,[11])
          .staggerFrom($("#page12").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 14
          .staggerTo($("#page12").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page12",0.4,{ right: '100%', ease: Power0.easeNone},"lorraineAllen3")
          .to("#page13",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .call(updateTitle,[12])
          .staggerFrom($("#page13").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 15
          .staggerTo($("#page13").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page13",0.4,{ right: '100%', ease: Power0.easeNone},"abbeLane")
          .call(updateTitle,[13])
          .call(playResumeVideo,[189,266,266])
          .to(".resumeVideoBox", 1, {opacity: '1', ease: Power4.easeIn})
          .addPause()
          .to(".resumeVideoBox", 1, {opacity: '0', ease: Power4.easeOut})
          .call(stopResumeVideo)
          .to(".blurEffect7",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone},"+=1")
          .to(".chi2", 0.3, {opacity: '0', ease: Back.easeOut.config(1)},"+=0.5")
          .to(".chi4", 0.3, {opacity: '0', ease: Bounce.easeOut},"+=0.5")
          .to(".chi5", 1, {left: '150%', ease:Power4.easeOut})
          .to(".chi6", 1, {left: '-150%', ease: Power4.easeOut})
          .to(".chi1", 0.3, {opacity: '0', ease: Back.easeOut.config(1)},"-=0.2")
          .to("#page14",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
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
          .to(".blurEffect8",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
          .staggerFrom($("#page14").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 16
          .staggerTo($("#page14").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page14",0.4,{ right: '100%', ease: Power0.easeNone},"abbeLane2")
          .to("#page15",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .call(updateTitle,[14])
          .staggerFrom($("#page15").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 17
          .staggerTo($("#page15").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page15",0.4,{ right: '100%', ease: Power0.easeNone},"abbeLane3")
          .to("#page16",0.4,{ right: '0%', ease: Power0.easeNone})
          .call(updateTitle,[15])
          .staggerFrom($("#page16").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 18
          .staggerTo($("#page16").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page16",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page17",0.4,{ right: '0%', ease: Power0.easeNone},"charoBaeza")
          .call(updateTitle,[16])
          .call(playResumeVideo,[266.5,321.5,321.5])
          .to(".resumeVideoBox", 1, {opacity: '1', ease: Power4.easeIn})
          .addPause()
          .to(".resumeVideoBox", 1, {opacity: '0', ease: Power4.easeOut})
          .call(stopResumeVideo)
          .staggerFrom($("#page17").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 19
          .staggerTo($("#page17").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page17",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page18",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .call(updateTitle,[17])
          .staggerFrom($("#page18").children(),0.6, animationFromPattern, staggerFromVelocity)
          .call(updateTitle,[18])
          .addPause()
          //EPISODE 20
          .staggerTo($("#page18").children(),0.6, animationToPattern, staggerToVelocity)
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
          .to(".age3",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
          .to(".age4",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"-=0.3")
          .call(updateTitle,[19])
          .to(".barc1", 3, {opacity: '1', ease: Power4.easeIn},"barcelona1")
          .to(".barc2", 0.5, {left: '33%', ease: Power4.easeIn},"-=0.2")
          .to(".barc3", 0.5, {left: '0%', ease: Power4.easeIn},"-=0.5")
          .to(".barc4", 0.3, {transform: 'scale(1)', ease: Power2.easeIn})
          .to(".barc5", 0.3, {transform: 'scale(1)', ease: Power2.easeIn})
          .to(".barc6", 0.3, {transform: 'scale(1)', ease: Power2.easeIn})
          .to(".barc7", 0.3, {transform: 'scale(1)', ease: Power2.easeIn})
          .to(".barc8", 0.3, {transform: 'scale(1)', ease: Power2.easeIn})
          .to(".barc2", 2, {left: '30%', transform: 'scale(0.7)', top: '0%',  ease: Power4.easeIn},"-=0.2")
          .to(".barc2", 4, {left: '0%', transform: 'scale(1)',  ease: Power4.easeIn})
          .to(".blurEffect9",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=2")
          .to("#page18",0.4,{ right: '100%', ease: Power0.easeNone}, "barcelona2")
          .to("#page19",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .call(updateTitle,[20])
          .staggerFrom($("#page19").children(),0.6, animationFromPattern, staggerFromVelocity)
          .addPause()
          //EPISODE 21
          .staggerTo($("#page19").children(),0.6, animationToPattern, staggerToVelocity)
          .to("#page19",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page20",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
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
          stopNinoAnimation();
          if(value=='inicio') { playerIntro.play(); }
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
            TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(0.3) rotate(0deg)'}, ease: Expo.easeOut});
            TweenMax.to(".fullScreenVideo", 1, {css: {transform: 'scale(0) rotate(30deg)'}, delay:1, onComplete: player.pause(), ease: Expo.easeOut});
            fullScreenVideoStatus = false;
            setTimeout(function(){ player.pause(); }, 1000);
        };

        $scope.prevFoto = function(value){
          var firstPhoto = $('.slideimg'+value).first();
          TweenMax.to(firstPhoto, 0.1, {left: '-60%', repeatDelay:0, repeat:1, yoyo:true, onRepeat:$('#fotoGroup'+value).append(firstPhoto), ease: Power2.easeOut});
        };

        $scope.nextFoto = function(value){
          var firstPhoto = $('.slideimg'+value).last();
          TweenMax.to(firstPhoto, 0.1, {left: '80%', repeatDelay:0, repeat:1, yoyo:true, onRepeat:$('#fotoGroup'+value).prepend(firstPhoto), ease: Power2.easeOut});
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
