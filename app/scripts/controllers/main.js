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
    var body = $('body');
    var totalWords = [];
    var fullScreenVideoStatus = false;
    var boolsound = 0.4;
    var soundVolume = boolsound;
    var languajeOpen = false;

    // Mobile features
    var isMobile = false;
    var mainContainer = $( '#mainContainer' ),
        disclaimerMobile = $( '.disclaimerMobile' );

    var playListOrder = ['BeginTheBeguine','ElManisero','TICOTICO','Siboney','MyShawl','JungleRhumba','perfidia','QuizasQuizasQuizas','ParaVigomevoy','YoTeAmoMucho','Tabu']
    var introLetters = $("#quote h2").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"introLetters"});
    var introLettersSubtitle = $("#quote h3 span.subtitle").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"introLettersSubtitle"});
    var introLettersName = $("#quote h3 span.cugat-name").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"introLettersName"});

    var introWords = $(".introLetters");
    var introWordsSubtitle = $(".introLettersSubtitle");
    var introWordsName = $(".introLettersName");

    $scope.CatText = languajeCT.CatText;
    $scope.photoText = languajeCT.photoText;
    $scope.tooltipText = languajeCT.tooltipText;
    $scope.generalText = languajeCT.text;
    $scope.menuText = languajeCT.menu;

    totalWords[12] = $scope.CatText.cita12Plus.split(" ");
    totalWords[21] = $scope.CatText.cita21Plus.split(" ");
    totalWords[41] = $scope.CatText.cita41Plus.split(" ");
    totalWords[42] = $scope.CatText.cita42Plus.split(" ");
    totalWords[51] = $scope.CatText.cita51Plus.split(" ");
    totalWords[52] = $scope.CatText.cita52Plus.split(" ");
    totalWords[53] = $scope.CatText.cita53Plus.split(" ");
    totalWords[61] = $scope.CatText.cita61Plus.split(" ");
    totalWords[62] = $scope.CatText.cita62Plus.split(" ");
    totalWords[63] = $scope.CatText.cita63Plus.split(" ");
    totalWords[100] = $scope.CatText.cita100Plus.split(" ");

    //---------------------------
    //----SOUND TRACKS -----

    var soundEpilogo = new Howl({
      urls: ['audio/TICOTICO.mp3'],
      loop: true,
      volume: 0
    });
    //-----------------------
    //---------VIDEOS--------

    var player = videojs('GeneralVideo');
    var playlistPlayer = videojs('video')

    var viaje1 = $('#viaje1Svg').drawsvg();

    //playerIntro.ready(function(){
    //  playerIntro.on("ended",function(){
    //    console.log("intro video ended")
    //    tl.play(); // On Intro Video ended, next slide
    //  })
    //});

    //-----------------------
    //-----TIMELINE ---------
    var animationFromPattern = { scale: '0', right: '-20%', ease: Back.easeInOut.config(1)};
    var animationToPattern = { scale: '0', opacity: '0', ease: Back.easeInOut.config(1)};
    var staggerFromVelocity = 0.05;
    var staggerToVelocity = 0.03;

    TweenMax.set(".scrollIcon, .hiddenCanvas, .dinamycText, .ageTitle, .napFace, .addon1, .prel01", {visibility:"visible"});


    var tl = new TimelineMax({repeat:0});
    var cugatNino = new TimelineMax({repeat:0});//-1});

    tl
    //EPISODE 1
      .add("inicio")
      //.to("",0.1, { onStart: controlSound, onStartParams: [] })
      .to("", 0.1, { onStart: videoPlay, onStartParams: ["intro", false, false, false, true, "0/0/1471877157700.mp4", "videoClass", "introVideoFull"]})
      .to(".videoCover", 3, {css:{opacity: '0.2'}, delay: 2, ease: Power0.easeOut})
      .staggerFrom(introWords, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
      .staggerFrom(introWordsSubtitle, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
      .staggerFrom(introWordsName, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
      .to(".mouseIcon", 0.5, {bottom: '150px', ease: Bounce.easeOut, onComplete: updateScrollBttn})
      .addPause()
      .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
      .staggerTo(introWords, 0.2, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
      .staggerTo(introWordsSubtitle, 0.2, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
      .staggerTo(introWordsName, 0.2, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
      .to("#page0",0.5,{ scale: '0', ease: Back.easeIn.config(1)})
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ["intro", false, false, false, false, "0/0/1471877157700.mp4", "videoClass", "introVideoFull"]})
      .to("", 0.1, { onStart: stopVideo })
      //EPISODE 2
      .add("prologo1")
      .to("", 0.1, { onComplete: playSound, onCompleteParams: [playListOrder[0]] })
      .to("", 0.1, { onComplete: updateTitle, onCompleteParams: [0] })
      .to(".ed1", 0.5, { left: '0%', onReverseComplete: stopNinoAnimation, ease: Bounce.easeOut})
      .to(".ed2", 0.5, { top: '0%', ease: Bounce.easeOut})
      .to(".ed3", 0.5, { left: '0%', ease: Bounce.easeOut},"-=1")
      .to(".ed4", 0.5, { transform: 'rotateX(0deg)', onComplete: ninoAnimation, force3D:true, ease: Back.easeOut.config(1)})
      .to(".texto11",2,{ transform: 'scale(1)', opacity: '1', ease: Power4.easeOut},"+=1")
      .to(".mouseIcon", 0.5, {bottom: '150px', ease: Bounce.easeOut, onComplete: updateScrollBttn},"+=0.5")
      .to(".chihuahua",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
      .to(".instruction-anecdota",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
      .to("", 0.1, { onStart: updateAnec, onStartParams: [1] })
      .addPause()
      .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
      .to(".instruction-anecdota",0.3,{ transform: 'rotateX(-90deg)',  ease: Bounce.easeOut})
      .to(".texto11",1.5,{ transform: 'scale(0)', opacity: '0', ease: Power4.easeOut},"+=0.2")
      .to("#page1",0.1,{ right: '0%', ease: Power0.easeNone})
      .to(".pentagramRect",0.2,{ bottom: '1%', ease: Power0.easeNone})
      .to(".currentDetails",0.2,{ top: '0px', ease: Power0.easeNone},"-=0.2")
      .to(".claveSol",0.2,{ bottom: '0', ease: Power0.easeNone},"-=0.2")
      .to(".pentagramBack",0.2,{ bottom: '0%', ease: Power0.easeNone},"-=0.2")
      .to(".pentagramNotesGroup",0.2,{ bottom: '2%', ease: Power0.easeNone},"-=0.2")
      .to(".instruction-pentagram",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
      .to(".age1",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
      .to("", 0.1, { onReverseComplete: ninoAnimation })
      .staggerFrom($("#page1").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita11",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=0.2")
      .addPause()
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [0] })
      .to("", 0.1, { onComplete: stopNinoAnimation })
      .to(".instruction-pentagram",0.3,{ transform: 'rotateX(-90deg)',  ease: Bounce.easeOut})
      .staggerTo($("#page1").children(),0.6, animationToPattern, staggerToVelocity)
      //EPISODE 3
      .add("prologo2")
      .to("#page1",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onStart: updateTitle, onStartParams: [1] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [2] })
      .to(".ed2", 0.5, {left: '-5%', ease: Power2.easeIn},"scrollGer")
      .to(".ed3", 0.5, {left: '-10%', ease: Power2.easeIn},"scrollGer")
      .to(".ed4", 0.5, {left: '-15%', ease: Power2.easeIn},"scrollGer")
      .to("#page2",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
      .from(".mapSvgClassTop", .3, {scale: 0.5, onComplete: initViaje, onCompleteParams: ['play'], ease: Back.easeOut })
      .to(".mapSvgClassTop", 1, {width: '6200px', top: '-1240px', left: '-2320px' , ease: Power2.easeIn},"+=1")
      .to(".cub1", 0.5, {top: '0%', ease: Power0.easeNone},"cuba1")
      .to(".ed1", 0.5, {top: '120%', onReverseComplete: ninoAnimation, ease: Power2.easeIn})
      .to(".ed2", 0.5, {top: '120%', ease: Power2.easeIn})
      .to(".ed3", 0.5, {top: '120%', ease: Power2.easeIn},"-=1")
      .to(".ed4", 0.5, {top: '120%', ease: Power2.easeIn})
      .to(".mapSvgClassTop", 2, {width: '6200px', top: '-1390px', left: '-1100px', ease: Power2.easeIn},"-=1.2")
      .to("", 0.1, { onReverseComplete: initViaje, onReverseCompleteParams: ['reverse'] })
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,false,false,true,'4/0/1471877017204.mp4', 'videoCloud', 'videoCloudInside'] })
      .to(".mouseIcon", 0.5, {bottom: '150px', ease: Bounce.easeOut, onComplete: updateScrollBttn},"+=0.5")
      .to("", 0.1, { onReverseComplete: stopVideo })
      .addPause()
      .to("", 0.1, { onStart: stopVideo })
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,false,false,false,'4/0/1471877017204.mp4', 'videoCloud', 'videoCloudInside'] })
      .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut, onComplete: updateScrollBttn})
      .to("#page2",0.4,{ right: '100%', ease: Power0.easeNone},"+=1")
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videomarco',false,false,false,true,'3/9/1471877013293.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter'] })
      .to("", 0.1, { onReverseComplete: stopVideo })
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [1] })
      //.to("", 0.1, { onStart: updateAnec, onStartParams: [2] })
      .addPause()
      .to("", 0.1, { onStart: stopVideo })
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videomarco',false,false,false,false,'3/9/1471877013293.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter'] })
      //EPISODE 4
      .add("prologo2Add")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [2] })
      .to("#page3",0.4,{ right: '0%', ease: Power0.easeNone})
      .to(".chihuahua",0.3,{ transform: 'rotateX(90deg)',  ease: Bounce.easeOut})
      .to(".age1",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
      .to(".age2",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"-=0.3")
      .staggerFrom($("#page3").children(),0.6, animationFromPattern, staggerFromVelocity)
      .addPause()
      .to("", 0.1, { onStart: stopVideoToolTip, onStartParams: ['slideVideoHavana', 'slideVideoContainerHavana', 'playButtonHavana', '' ] })
      .staggerTo($("#page3").children(),0.6, animationToPattern, staggerToVelocity)
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [2] })
      //EPISODE 5
      .add("prologo3")
      .to(".cub1", 0.5, { transform: 'rotateY(165deg)', ease: Power2.easeIn})
      .to("#page3",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onStart: updateTitle, onStartParams: [3] })
      //.to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['onlySound',false,false,false,false,'3/4/1461774869043.mp4','',''] })
      .to(".ny4", 0.2, { top: '0%', ease: Bounce.easeOut},"-=0.5")
      .to(".ny3", 0.5, { top: '0%', ease: Bounce.easeOut},"-=0.2")
      .to(".ny1", 0.5, { top: '0%', ease: Bounce.easeOut},"-=0.2")
      .to(".ny2", 0.5, { top: '0%', ease: Bounce.easeOut},"-=0.2")
      .to(".ny5", 0.8, { scale: '1', right: '0', ease: Power4.easeOut},"-=0.2")
      .to(".ny6", 0.8, { scale: '1', right: '0', ease: Power4.easeOut},"-=0.2")
      .to(".ny7", 0.8, { scale: '1', right: '0', ease: Power4.easeOut},"-=0.2")
      .to("#page4",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
      .staggerFrom($("#page4").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita12",1,{  transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
      //.to("", 0.1, { onReverseComplete: stopVideo })
      .addPause()
      .to("", 0.1, { onStart: stopVideoToolTip, onStartParams: ['slideVideoNY', 'slideVideoContainerNY', 'playButtonNY', 'fullScreenButtonNY' ] })
      //.to("", 0.1, { onStart: stopVideo })
      .staggerTo($("#page4").children(),0.6, animationToPattern, staggerToVelocity)
      //.to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['onlySound',false,false,false,false,'3/4/1461774869043.mp4','',''] })
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [3] })
      //EPISODE 6
      .add("RR1")
      .to("", 0.1, { onStart: playSound, onStartParams: [playListOrder[1]] })
      .to("", 0.1, { onStart: updateTitle, onStartParams: [4] })
      .to("#page4",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
      .to("#page5",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"+=0.5")
      .to("", 0.1, { onStart: videoPlay, onStartParams: ['resume',38.5,89,55, true, '7/5/1471877240757.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter']})
      .to("", 0.1, { onReverseComplete: stopVideo })
      .addPause()
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['resume',38.5,89,55, true, '7/5/1471877240757.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter']})
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[0]] })
      .to("", 0.1, { onStart: stopVideo })
      .staggerFrom($("#page5").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita21",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=0.5")
      .addPause()
      //EPISODE 7
      .staggerTo($("#page5").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page5",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
      .to("#page6",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
      //.to(".blurEffect3",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone},"+=1")
      .to(".ny5", 0.5, {scale: '5', right: '200%', ease: Power4.easeIn})
      .to(".ny6", 0.5, {scale: '5', right: '200%', ease: Power4.easeIn},"-=0.2")
      .to(".ny7", 0.5, {scale: '5', right: '200%', ease: Power4.easeIn},"-=0.2")
      .to(".ny3", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
      .to(".ny1", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
      .to(".ny2", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
      .to(".ny4", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [4] })
      .to(".chihuahua",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
      .add("RR2")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [5] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [3] })
      .to(".ber1", 0.3, {transform: 'rotateY(0deg)', ease: Back.easeOut.config(1)})
      //.to(".blurEffect4",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
      .staggerFrom($("#page6").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita14",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
      .addPause()
      .staggerTo($("#page6").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page6",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
      .to(".ber1", 0.3, {transform: 'rotateY(165deg)', ease: Back.easeOut.config(1)})
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[1]] })
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [5] })
      //EPISODE 8
      .add("RR3")
      .to("", 0.1, { onStart: playSound, onStartParams: [playListOrder[2]] })
      .to("", 0.1, { onStart: updateTitle, onStartParams: [6] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [4] })
      .to("#page7",0.2,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
      .to(".holly2", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)})
      .to(".holly1", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
      .to(".holly3", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
      .to(".holly4", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
      .to(".holly7", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
      .to(".holly6", 1, {top: '0%', ease: Power4.easeOut})
      .to(".holly5", 0.2, {opacity: '1', ease: Power4.easeOut})
      //.to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['onlyAudio',false,false,false,false,'3/4/1461774869043.mp4','',''] })
      .staggerFrom($("#page7").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita15",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
      //.to("", 0.1, { onReverseComplete: stopVideo })
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,false,false,true,'2/5/1471877148752.mp4', 'videoCloud', 'videoCloudInside', true] })
      .to("", 0.1, { onReverseComplete: stopVideo })
      .addPause()
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,false,false,false,'6/9/1471876985396.mp4', 'videoCloud', 'videoCloudInside', true] })
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,false,false,true,'2/4/1471877146842.mp4', 'videoCloud', 'videoCloudInside'] })
      .addPause()
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,false,false,true,'2/4/1471877146842.mp4', 'videoCloud', 'videoCloudInside'] })
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,false,false,true,'6/9/1471876985396.mp4', 'videoCloud', 'videoCloudInside', true] })
      .addPause()
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,false,false,false,'2/5/1471877148752.mp4', 'videoCloud', 'videoCloudInside', true] })
      //.to("", 0.1, { onStart: stopVideo })
      .to("", 0.1, { onStart: stopVideo })
      .staggerTo($("#page7").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page7",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
      //.to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['onlyAudio',false,false,false,false,'3/4/1461774869043.mp4','',''] })
      .to(".holly2", 0.5, { transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.5")
      .to(".holly1", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
      .to(".holly3", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
      .to(".holly4", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
      .to(".holly7", 0.5, {top: '150%', ease: Bounce.easeOut},"-=0.3")
      .to(".holly6", 0.5, {top: '-150%', ease: Power4.easeOut},"carmenCastillo")
      .to(".holly5", 1, {opacity: '0', ease: Power4.easeOut})
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [6] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [7] })
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[2]] })
      //EPISODE 9
      .add("CC1")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [7] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [5] })
      .to("", 0.1, { onComplete: playSound, onCompleteParams: [playListOrder[3]] })
      .to(".age2",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
      .to(".carn2", 4, { opacity: '1', ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 2, points: 20, taper: "none", randomize: true, clamp: false})})
      .to(".carn1", 2, {opacity: '1', ease: Back.easeOut.config(1)},"-=2")
      .to(".carn1", 2, {top: '-50%', ease: Power4.easeOut})
      .to(".carn2", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
      .to(".carn3", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
      .to(".carn4", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
      .to(".carn5", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
      .to(".carn6", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
      .to(".cita100",1,{ scale:'1',transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=0.5")
      .to(".mouseIcon", 0.5, {bottom: '100px', ease: Bounce.easeOut, onComplete: updateScrollBttn})
      .addPause()
      .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
      .to(".cita100",1,{ scale:'0',transform: 'rotateX(90deg)', ease: Bounce.easeOut},"+=0.5")
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [7] })
      .add("CC2")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [8] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [6] })
      .to("", 0.1, { onStart: videoPlay, onStartParams: ['resume',101,112,112, true, '7/5/1471877240757.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter']})
      .to("", 0.1, { onReverseComplete: stopVideo })
      .addPause()
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['resume',101,112,112, true, '7/5/1471877240757.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter']})
      .to("", 0.1, { onStart: stopVideo })
      .to("#page8",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
      .staggerFrom($("#page8").children(),0.6, animationFromPattern, staggerFromVelocity)
      .addPause()
      .staggerTo($("#page8").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page8",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [8] })
      //EPISODE 10
      .add("CC3")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [9] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [7] })
      .to("#page9",0.4,{ right: '0%', ease: Back.easeInOut.config(1)})
      .staggerFrom($("#page9").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita91",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
      .addPause()
      .staggerTo($("#page9").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page9",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [9] })
      //EPISODE 11
      .add("CC4")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [10] })
      .to(".chihuahua",0.3,{ transform: 'rotateX(90deg)',  ease: Bounce.easeOut})
      .to("#page10",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,false,false,true,'4/0/1471877055304.mp4', 'videoCloud2', 'videoCloudInside', true] })
      .to("", 0.1, { onReverseComplete: stopVideo })
      .addPause()
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,false,false,true,'3/4/1471877070743.mp4', 'videoCloud2', 'videoCloudInside'] })
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,false,false,true,'3/4/1471877070743.mp4', 'videoCloud2', 'videoCloudInside'] })
      .addPause()
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,false,false,true,'4/0/1471877055304.mp4', 'videoCloud2', 'videoCloudInside', true] })
      .to("", 0.1, { onStart: stopVideo })
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [10] })
      .to(".blurEffect5", 2, { opacity: '0', ease: Back.easeOut.config(1)},"+=2")
      .to("#page10",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[3]] })
      //EPISODE 12
      .add("LA1")
      .to("", 0.1, { onStart: playSound, onStartParams: [playListOrder[4]] })
      .to(".chihuahua",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
      .to("", 0.1, { onStart: updateTitle, onStartParams: [11] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [9] })
      .to(".age3",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut})
      .to(".chi4", 0.3, { opacity: '1', ease: Bounce.easeOut })
      .to(".chi2", 1, { opacity: '1', ease: Power4.easeOut })
      .to(".chi1", 4, { opacity: '1', ease: Power0.easeNone },"+=1")
      .to(".chi5", 1, { left: '0', ease: Power4.easeOut })
      .to(".chi6", 1, { left: '0', ease: Power4.easeOut })
      .to("", 0.1, { onStart: videoPlay, onStartParams:['resume',132,138,138, true, '7/5/1471877240757.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter']})
      .to("", 0.1, { onReverseComplete: stopVideo})
      .addPause()
      .to("", 0.1, { onStart: stopVideo })
      .to("#page11",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams:['resume',132,138,138, true, '7/5/1471877240757.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter'] })
      .staggerFrom($("#page11").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita41",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
      .addPause()
      .staggerTo($("#page11").children(),0.6, animationToPattern, staggerFromVelocity)
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [11] })
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[4]] })
      .to("#page11",0.4,{ right: '100%', ease: Back.easeIn})
      //EPISODE 13
      .add("LA2")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [12] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [8] })
      .to("", 0.1, { onComplete: playSound, onCompleteParams: [playListOrder[5]] })
      //.staggerTo($("#page11").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page12",0.4,{ right: '0%', ease: Power0.easeNone})
      .to(".blurEffect7",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
      .staggerFrom($("#page12").children(),0.6, animationFromPattern, staggerToVelocity)
      .to(".cita42",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
      .addPause()
      .to("", 0.1, { onStart: stopVideoToolTip, onStartParams: ['slideVideoLorraine', 'slideVideoContainerLorraine', 'playButtonLorraine', 'fullScreenButtonLorraine' ] })
      .staggerTo($("#page12").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page12",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [12] })
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[5]] })
      //EPISODE 14
      .add("LA3")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [13] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: ["9b"] })
      .to("", 0.1, { onComplete: playSound, onCompleteParams: [playListOrder[6]] })
      .to("#page13",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
      .staggerFrom($("#page13").children(),0.6, animationFromPattern, staggerFromVelocity)
      .addPause()
      .staggerTo($("#page13").children(),0.6, animationToPattern, staggerToVelocity)
      .to(".blurEffect7",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone},"+=1")
      .to(".chi2", 0.3, {opacity: '0', ease: Back.easeOut.config(1)},"+=0.5")
      .to(".chi4", 0.3, {opacity: '0', ease: Bounce.easeOut},"+=0.5")
      .to(".chi5", 1, {left: '150%', ease:Power4.easeOut})
      .to(".chi6", 1, {left: '-150%', ease: Power4.easeOut})
      .to(".chi1", 0.3, {opacity: '0', ease: Back.easeOut.config(1)},"-=0.2")
      .to("#page13",0.4,{ right: '100%', ease: Power0.easeNone})
      .to(".chihuahua",0.3,{ transform: 'rotateX(90deg)',  ease: Bounce.easeOut})
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [13] })
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[6]] })
      //EPISODE 15
      .add("AL1")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [14] })
      .to("", 0.1, { onStart: playSound, onStartParams:[playListOrder[7]]})
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
      .to("", 0.1, { onStart: videoPlay, onStartParams:['resume',189,200,200, true, '7/5/1471877240757.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter']})
      .to("", 0.1, { onReverseComplete: stopVideo})
      .addPause()
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams:['resume',189,200,200, true, '7/5/1471877240757.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter']})
      .to("", 0.1, { onStart: stopVideo })
      .staggerFrom($("#page14").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita51",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=0.5")
      .addPause()
      .to("", 0.1, { onStart: stopVideoToolTip, onStartParams: ['slideVideoAbbe', 'slideVideoContainerAbbe', 'playButtonAbbe', 'fullScreenButtonAbbe' ] })
      .staggerTo($("#page14").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page14",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[7]] })
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [14] })
      //EPISODE 16
      .add("Al2")
      .to("", 0.1, { onStart: playSound, onStartParams:[playListOrder[8]]})
      .to(".chihuahua",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
      .to("", 0.1, { onStart: updateTitle, onStartParams: [15] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [10] })
      .to("#page15",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
      .to(".blurEffect8",0.2,{ filter: 'blur(8px)', webkitFilter: 'blur(8px)', ease: Power0.easeNone})
      .staggerFrom($("#page15").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita53",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',266.5,297,297,false,'2/7/1471877144972.mp4', 'videoCloud', 'videoCloudInside'] })
      .to("", 0.1, { onReverseComplete: stopVideo })
      .addPause()
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',266.5,297,297,false,'2/7/1471877144972.mp4', 'videoCloud', 'videoCloudInside'] })
      .to("", 0.1, { onStart: stopVideo })
      .staggerTo($("#page15").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page15",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[8]] })
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [15] })
      //EPISODE 17
      .add("AL3")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [16] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [11] })
      .to("", 0.1, { onStart: playSound, onStartParams:[playListOrder[9]]})
      .to("#page16",0.4,{ right: '0%', ease: Power0.easeNone})
      .staggerFrom($("#page16").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita56",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
      .addPause()
      .staggerTo($("#page16").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page16",0.4,{ right: '100%', ease: Power0.easeNone})
      //.to(".chihuahua",0.3,{ transform: 'rotateX(90deg)',  ease: Bounce.easeOut})
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [16] })
      //EPISODE 18
      .add("CB1")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [17] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [12] })
      .to("#page17",0.4,{ right: '0%', ease: Power0.easeNone})
      .to("", 0.1, { onStart: videoPlay, onStartParams:['resume',266.5,297,297, true, '7/5/1471877240757.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter']})
      .to("", 0.1, { onReverseComplete: stopVideo })
      .addPause()
      .to("", 0.1, { onStart: stopVideo })
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams:['resume',266.5,301.5,301.5, false, '7/5/1471877240757.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter']})
      .staggerFrom($("#page17").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita60",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=0.5")
      .addPause()
      .staggerTo($("#page17").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page17",0.4,{ right: '100%', ease: Power0.easeNone})
      .to(".chihuahua",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [17] })
      //EPISODE 19
      .add("CB2")
      .to("#page18",0.4,{ right: '0%', ease: Power0.easeNone})
      .to("", 0.1, { onStart: updateTitle, onStartParams: [18] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [15] })
      .staggerFrom($("#page18").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita61",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut})
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['resume',300,322,322,false,'7/5/1471877240757.mp4', 'videoCloud', 'videoCloudInside'] })
      .to("", 0.1, { onReverseComplete: stopVideo })
      .addPause()
      .to("", 0.1, { onStart: stopVideo })
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['resume',300,322,322,false,'7/5/1471877240757.mp4', 'videoCloud', 'videoCloudInside'] })
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
      .to("#page18",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[9]] })
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [18] })
      //EPISODE 20
      .add("EP1")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [19] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [13] })
      .to("", 0.1, { onStart: playSound, onStartParams:[playListOrder[10]]})
      .to(".age3",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
      .to(".barc1", 3, { opacity: '1', ease: Power4.easeIn})
      .to("#texto7-barc",2,{ transform: 'scale(1)', opacity: '1', ease: Power4.easeOut},"+=1")
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
      .to("#page19",0.4,{ right: '0%', ease: Power0.easeNone})
      .to("#texto7-barc",1,{ transform: 'scale(0)', opacity: '0', ease: Power4.easeOut},"+=0.2")
      .staggerFrom($("#page19").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita62",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
      .addPause()
      .staggerTo($("#page19").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page19",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [19] })
      //EPISODE 21
      .add("EP2")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [20] })
      .to("", 0.1, { onStart: updateAnec, onStartParams: [16] })
      .to("#page20",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
      .staggerFrom($("#page20").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".textoFin",2,{  transform: 'scale(1)', opacity: '1', ease: Power4.easeOut},"+=2")
      .to(".textoFin",2,{ top: '0', ease: Power4.easeOut},"+=2")
      .to(".ep15",2,{ opacity: '1', ease: Power4.easeOut},"-=3")
      .to(".lastVideos",3,{ opacity: '1', ease: Power4.easeOut},"-=3")
      .to(".blurEffect9",6,{ onStart:function(){soundEpilogo.fade(soundVolume,0,6000)},opacity: '0', ease: Power4.easeOut},"-=6")
      //.to(".chihuahua",0.3,{ transform: 'rotateX(90deg)',  ease: Bounce.easeOut})
      .to(".age4",3,{ onReverseComplete: function(){soundEpilogo.fade(0,soundVolume,3000)}, opacity: '0', ease: Power4.easeOut},"-=6")
      .addPause()
      .staggerTo($("#page20").children(),0.6, animationToPattern, staggerToVelocity)
      .to(".textoFin",0.4,{  transform: 'scale(0)', opacity: '0', ease: Power4.easeOut},"+=2")
      .to("#page20",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [20] })
      //EXTRA
      .add("PLAYLIST")
      .to("",0.1, { onStart: setVideoPlaylist, onStartParams: [] })
      .to(".chihuahua",0.3,{ transform: 'rotateX(90deg)',  ease: Bounce.easeOut})
      .to("#page21",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
      .staggerFrom($("#page21").children(),0.6, animationFromPattern, staggerFromVelocity)
      .addPause();

    tl.play();

    //------------------------------------
    //-------FUNCTIONS --------------------
    $scope.upTo = function(value, music, notes) {
      console.log('notes: ', notes,music);
      setStopScroll(false);
      TweenMax.to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut});
      TweenMax.to(".coverTransitions", 0.1, { scale: 1, ease: Power4.easeOut });
      TweenMax.to(".coverTransitions", 0.6, { opacity: 1, ease: Power4.easeOut, delay: 0.2 });
      if ($("div.overlay").hasClass("open")) $(".trigger-overlay").click();
      setTimeout(function(){
        stopVideo();
        controlSound();
        updateTitle(notes);
        playSound(playListOrder[music]);
        stopNinoAnimation();
        player.pause();
        //if(value=='inicio') { videoPlay("intro", false, false, false, true, "3/4/1461774869043.mp4", "videoClass", "introVideoFull"); }
        //else {  }
        tl.play(value);
      },500);
      TweenMax.to(".coverTransitions", 3, {opacity: 0, ease: Power4.easeOut, delay: 3});
      TweenMax.to(".coverTransitions", 0.1, {scale: 0, ease: Power4.easeOut, delay: 7});
    };

    $scope.prevFoto = function(id,value){
      $('.slideimg'+id).removeClass("videoSlideResizeOut videoSlideResize");
      if(value==undefined) var desp = '-110%';
      else var desp = '-'+value;
      var firstPhoto = $('.slideimg'+id).first();
      TweenMax.to(firstPhoto, 0.05, {left: desp, repeatDelay:0.05, repeat:1, yoyo:true, onRepeat:function(){$('#fotoGroup'+id).append(firstPhoto); if(firstPhoto[0].childNodes[1].id) {  if(videoCardToogleSound == 0) $("#"+firstPhoto[0].childNodes[1].id).get(0).play(); };}, ease: Power4.easeOut});
    };

    $scope.nextFoto = function(id, value){
      $('.slideimg'+id).removeClass("videoSlideResizeOut videoSlideResize");
      if(value==undefined) var desp = '110%';
      else var desp = value;
      var firstPhoto = $('.slideimg'+id).last();
      firstPhoto.attr('autoplay','autoplay');
      TweenMax.to(firstPhoto, 0.05, {left: desp, repeatDelay:0.05, repeat:1, yoyo:true, onRepeat:function(){$('#fotoGroup'+id).prepend(firstPhoto);if(firstPhoto[0].childNodes[1].id) {  if(videoCardToogleSound == 0) $("#"+firstPhoto[0].childNodes[1].id).get(0).play(); };}, ease: Power4.easeOut});

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
    $scope.openLanguaje = function(){
      console.log(languajeOpen);
      if(!languajeOpen) { languajeOpen = true; TweenMax.staggerTo(".lang", 0.3, { opacity: 1, scale:1, ease: Back.easeOut.config(0.8)}, 0.1); console.log('entra en false', languajeOpen ); }
      else { TweenMax.staggerTo(".lang", 0.3, { opacity: 0, scale:0, ease: Back.easeOut.config(0.8)}, 0.1); languajeOpen = false; console.log('entra en true', languajeOpen ); }

    }
    $scope.changeLenguaje = function(val){
      switch (val) {
        case (val == 'CT'): var languajeSelected = languajeCT; break;
        case (val == 'SP'): var languajeSelected = languajeSP; break;
        case (val == 'ENG'): var languajeSelected = languajeENG; break;
        default: var languajeSelected = languajeCT;
      }
      $scope.CatText = languajeSelected.CatText;
      $scope.photoText = languajeSelected.photoText;
      $scope.tooltipText = languajeSelected.tooltipText;
      $scope.generalText = languajeSelected.text;
      $scope.menuText = languajeSelected.menu;
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
      if(index!='intro'){
        var notes = $(".pentagramNotes");
        notes.removeClass("activeNote");
        notes.removeClass("currentNote");
        for (var i = 0; i <= index; i++) {
          $(notes[i]).addClass("activeNote");
          if (i==index) $(notes[i]).addClass("currentNote");
        }
        var note = $($(".pentagramNotes")[index]);
        var title = note.find(".tooltip-text").html();
        $(".currentDetails h4").html(title);
      }
      else $(".currentDetails h4").html('');
    }

    function updateAnec(id){
      triggerAnec.attr("data-anecdota", id);
      triggerAnec.addClass("hover");
      window.setTimeout(function(){triggerAnec.removeClass("hover");}, 3000);
    }

    function updateScrollBttn(){
      scrollBttn.addClass("hover");
      window.setTimeout(function(){scrollBttn.removeClass("hover");}, 3000);
    }

    $scope.loadCredits = function(){
      toggleAnec("credits")
    }

    $scope.viewDoc = function(){
      window.open("http://www.ccma.cat/tv3/documentals/xavier-cugat/", "_blank", "");
    }

    function setVideoPlaylist(){
      //demoModule.init();
      setStopScroll(true);
      playlistPlayer.playlistUi();
    }

    //----------------------------------------------
    //------ vIDEO & AUDIO -------------------------

    //function videoPlay(videoType, timer, duration, breakpoint, continueBeforeStop, id, class1, class2){
    //   $scope.playVideo(videoType, timer, duration, breakpoint, continueBeforeStop, id, class1, class2);
    //}
    $scope.playVideoSlide = function(id, container, playButton, fullScreenButton){
      $('#'+container).css("left",'');
      //videoSlideResize $('#'+container).addClass('videoFullScreen');
      if($("#"+id).get(0).paused) {
        if(boolsound == soundVolume && soundEpilogo.volume() > 0 ) soundEpilogo.fade(soundVolume,0.01,2000);
        if(id=='slideVideoCC2') { $("#videoToolTipContent").css( "opacity", "1" ); $("#toolTipText").css( "transform", "scale(1)" ); $("#toolTipInner").css( "transform", "translate3d(0,0,0)" );}
        $("#"+id).get(0).play();
        $('#'+playButton).css('opacity', '0');
        $('#'+fullScreenButton).css('opacity', '1');
      }
      else {
        if(boolsound == soundVolume && soundEpilogo.volume() > 0 ) soundEpilogo.fade(0.01,soundVolume,2000);
        $("#"+id).get(0).pause();
        $('#'+playButton).css('opacity', '1');
        $('#'+fullScreenButton).css('opacity', '0');
        if(id=='slideVideoCC2') { $("#videoToolTipContent").css( "opacity", "" ); $("#toolTipText").css( "transform", "" ); $("#toolTipInner").css( "transform", "" );}
      }
      $("#"+id).on("ended", function() {
        stopVideoToolTip(id,container, playButton, fullScreenButton);
      });
    };
    function stopVideoToolTip(id, container, playButton, fullScreenButton){
      $("#"+id).get(0).pause();
      $("#videoToolTipContent").css( "opacity", "" ); $("#toolTipText").css( "transform", "" ); $("#toolTipInner").css( "transform", "" );
      $('#'+container).removeClass("videoSlideResizeOut videoSlideResize");
      if(boolsound == soundVolume && soundEpilogo.volume() > 0 ) soundEpilogo.fade(0.01, soundVolume,2000);
      $('#'+playButton).css('opacity', '1');
      $('#'+fullScreenButton).css('opacity', '0');
    }
    $scope.fullScreenVideoSlide = function(id, style){
      $('#'+id).css("right",'');
      if($("#"+id).hasClass( style )) $("#"+id).removeClass(style);
      else $("#"+id).addClass(style);
    }

    function videoPlay(videoType, timer, duration, breakpoint, continueBeforeStop, id, class1, class2, changeAudio){
       player.src({ type: 'video/mp4', src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/'+id });
       fullScreenVideoStatus = true;
       player.pause();
       if(class1 == 'resumeVideoBox') $('#videoContainer').css("z-index", 999);
       else $('#videoContainer').css("z-index", "");
       $('#videoGeneral').removeClass('videoClass fullScreenVideo resumeVideoBox videoCloud videoCloud2');
       if(class1 == 'videoCloud') { var scaleValue = 0.6; $('#burbleBig').addClass('burbleBig'); $('#burbleMed').addClass('burbleMed'); $('#burbleSmall').addClass('burbleSmall'); }
       else if(class1 == 'videoCloud2') { var scaleValue = 0.6; $('#burbleBig').addClass('burbleBig2'); $('#burbleMed').addClass('burbleMed2'); $('#burbleSmall').addClass('burbleSmall2'); }
       else var scaleValue = 1;
       console.log('volumen: ', soundEpilogo.volume());
       if(boolsound == soundVolume && soundEpilogo.volume() > 0) soundEpilogo.fade(soundVolume,0,1000);
       else soundEpilogo.volume(0);
       $('#videoGeneral').addClass(class1);
       $('#GeneralVideo').addClass("video-js vjs-default-skin " + class2);
       TweenMax.to($('#videoContainer'), 0.5, { opacity: 1, scale: scaleValue, ease: Power4.easeOut });
       player.play();
       if(videoType == 'resume'){
         player.currentTime(timer);
         player.play();
         player.off('timeupdate');
         player.breakpoint = false;
         player.on('timeupdate', function() {
           if (!player.breakpoint && (player.currentTime() == breakpoint-3)){
             console.log('cumple timeupdate antes:', player.breakpoint, player.currentTime());
             TweenMax.to($('#videoContainer'), 3, { opacity: 0, scale: 0, ease: Power4.easeOut });
           }
           if (!player.breakpoint && (player.currentTime() >= breakpoint) ){
             console.log('cumple timeupdate:', player.breakpoint, player.currentTime());
             player.breakpoint = true;
             if(class2 != 'videoCloudInside') stopVideo();
             if(continueBeforeStop == true) tl.play();
             fullScreenVideoStatus = false;
           }
         });
       }
       else {
         player.on("ended", function(){
           console.log('continue before Stop Inside ended?: ', continueBeforeStop, videoType);
           if(continueBeforeStop == true){ tl.play(); }
           if(boolsound == soundVolume && !changeAudio){ soundEpilogo.fade(0,soundVolume,2000); }
           fullScreenVideoStatus = false;
         })
       }
    };

    function stopVideo(){
      $('#burbleBig').removeClass('burbleBig burbleBig2');
      $('#burbleMed').removeClass('burbleMed burbleMed2');
      $('#burbleSmall').removeClass('burbleSmall burbleSmall2');
      TweenMax.to($('#videoContainer'), 0.5, { opacity: 0, scale: 0, ease: Power4.easeOut });
      if(soundEpilogo.volume() < soundVolume && boolsound == soundVolume) soundEpilogo.fade(0,soundVolume,2000);
      fullScreenVideoStatus = false;
      player.off("ended");
      player.pause();
    }
    //-------SOUND --------------
    function controlSound(){
      player.pause();
      playlistPlayer.pause();
      soundEpilogo.fade(soundVolume,0,2000);
    }

    function playSound(url){
      console.log('sound enter');
      if(soundEpilogo.volume() > 0) soundEpilogo.fade(soundVolume,0,1000);
      setTimeout(function(){
        soundEpilogo.stop();
        soundEpilogo = new Howl({
          urls: ['audio/'+url+'.mp3'],
          loop: true,
          volume: 0,
          onend: function() {
          }
        });
        soundEpilogo.play();
        if(boolsound == soundVolume){ soundEpilogo.fade(0,soundVolume,1000); }
      }, 500)
    }
    function toggleSound(){
      boolsound = boolsound ? 0 : soundVolume;
      player.volume(3*boolsound);
      playlistPlayer.volume(3*boolsound);
      soundBttn.toggleClass('sound-mute');
      if(!fullScreenVideoStatus)soundEpilogo.volume(boolsound);
    }

    //--------------------------------------------------------------------

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
      var elementToInsert = '<div class="wordStyle">'+variable+'</div>';
      $('#cita'+num+'suma').append(elementToInsert);
      TweenMax.from(elementToInsert, 0.1, {opacity: 0, y:-40, transformOrigin:"0% 50% -50", ease: Power2.easeOut});
    }
    function deleteWords(variable){
      $(variable).remove();
    }
    function initViaje(direction){
      console.log(direction);
      if(direction == 'reverse'){
        var viaje1 = $('#viaje1Svg').drawsvg({
          duration: 8000,
          easing: 'linear',
          reverse: true,
          callback: function() {
          }
        });
        viaje1.drawsvg('animate');
      }
      else {
        var viaje1 = $('#viaje1Svg').drawsvg({
          duration: 8000,
          easing: 'linear',
          reverse: false,
          callback: function() {
            //console.log('dibujo terminado');
          }
        });
        viaje1.drawsvg('animate');
      }
      console.log('viaje1: ', viaje1);
    }

    function setStopScroll(value){
      if (false == value) playlistPlayer.pause();
      stopScroll = value;
    }

    function canScroll(){
        var canscroll = !overlayAnec.hasClass( 'open' )
                        && !overlay.hasClass( 'open' )
                        && !stopScroll;
        return canscroll;
    }

    //----------MOUSE CONTROLS --------

    $(window).bind('mousewheel DOMMouseScroll', function(event){
      if (canScroll()){ // If overlay layers are opened
        event.preventDefault();
        TweenMax.to('.additional', 0.2, {opacity: 0, scale:0, ease:Back.easeOut});
        if(event.type != 'mousedown'){
          if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            tl.reverse();
            //if(fullScreenVideoStatus) stopVideo();
            //fullScreenVideoStatus = false;
          }
          else {
            tl.play();
            //if(fullScreenVideoStatus) stopVideo();
            //fullScreenVideoStatus= false;
          }
        }
      }
    });

    //---------- KEYBOARD CONTROLS --------

    $(window).bind('keydown', function(event){
      if (canScroll()){ // If overlay layers are opened
        event.preventDefault();
        TweenMax.to('.additional', 0.2, {opacity: 0, scale:0, ease:Back.easeOut});
        var keyCode = event.keyCode || event.which;
  			switch (keyCode) {
  				case 37:
  					tl.reverse();
  					break;
          case 38:
  					tl.reverse();
  					break;
  				case 39:
  					tl.play();
  					break;
          case 40:
  					tl.play();
  					break;
  			}
      }
    });

    //--------TOUCH CONTROLS------

    if (window.DeviceOrientationEvent && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      $('.mouseIcon').addClass('iconSpace2');
      isMobile = true;
      checkDisclaimer();
      $scope.controlText = 'continua';//'deslizar para continuar';
    }
    else {
      isMobile = false;
      //$('#controlIcon').addClass('iconSpace');
      $scope.controlText = 'continua';//'scroll para continuar';
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    var xDown = null;
    var yDown = null;
    function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    };
    function handleTouchMove(evt) {
      if (canScroll()){ // If overlay layers are opened
        if ( ! xDown || ! yDown ) { return; }
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
          if ( xDiff > 0 ) {
            tl.play();
          } else {
            tl.reverse();
          }
        } else {
          if ( yDiff > 0 ) {
            /* up swipe */
            //tl.play();
          } else {
            /* down swipe */
            //tl.reverse();
          }
        }
        xDown = null;
        yDown = null;
      }
    };
    //------------------------------------
    // MENU

    var container = $( 'div.container' ),
      container2 = $( 'div.container2' ),
      triggerBttn = $( '.trigger-overlay' ),
      triggerAnec = $( '.trigger-anecdota' ),
      lastVideosBttn = $( '.lastVideos' ),
      scrollBttn = $( '.mouseIcon'),
      soundBttn = $( '.sound'),
      shareBttn = $( '.fa-share'),
      socialshare = $( '.socialshare-buttons'),
      overlay = $( 'div.overlay' ),
      overlayAnec = $( 'div.overlay-anecdota' ),
      closeBttn = $( 'button.overlay-close'),
      closeAnecBttn = $( 'button.overlay-anecdota-close'),
      transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
      },
      transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
      support = { transitions : Modernizr.csstransitions },
      stopScroll = false;

    function toggleOverlay() {
        if( overlay.hasClass( 'open' ) ) {
          overlay.removeClass( 'open' );
          triggerBttn.removeClass( 'open' );
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
        else if( !overlay.hasClass( 'close' )) {
          overlay.addClass( 'open' );
          triggerBttn.addClass( 'open' );
          container.addClass( 'overlay-open' );
        }
    }

    function toggleAnec(id) {
        if (id) {
          var uri = "views/anecdotas.html #anec"+id;
          if (id == "credits"){
            uri = "views/creditos.html";
          }
          overlayAnec.load( uri );
        }
        if( overlayAnec.hasClass( 'open' ) ) {
          //soundEpilogo.volume(soundVolume);
          overlayAnec.removeClass( 'open' );
          triggerAnec.removeClass( 'open' );
          container2.removeClass( 'overlay-open' );
          overlayAnec.addClass( 'close' );
          var onEndTransitionFn = function( ev ) {
            overlayAnec.removeClass( 'close' );
          };
          if( support.transitions ) {
            try{
              overlayAnec.on(transEndEventName, function(){onEndTransitionFn()})
              //overlay.addEventListener( transEndEventName, onEndTransitionFn );
            } catch(ex){
              onEndTransitionFn();
            }
          }
          else {
            onEndTransitionFn();
          }
        }
        else if( !overlayAnec.hasClass( 'close' )) {
          //soundEpilogo.volume(0.1);
          overlayAnec.addClass( 'open' );
          triggerAnec.addClass( 'open' );
          container2.addClass( 'overlay-open' );
        }
    }

    function toggleShare() {
      socialshare.toggle();
    }

    function checkDisclaimer(){
      if ( isMobile && ($(window).width() < 1024) && ($(window).height() < 1024) ) {
        mainContainer.hide();
        tl.stop();
        controlSound();
        disclaimerMobile.show();
      }
    }

    triggerBttn.on( 'click', function(){toggleOverlay()} );
    triggerAnec.on( 'click', function(){
                                var anecId = $(this).attr("data-anecdota");
                                toggleAnec(anecId)
                             });
    soundBttn.on( 'click', function(){ toggleSound()} );
    scrollBttn.on( 'click', function(){ tl.play()} );
    lastVideosBttn.on( 'click', function(){ tl.play()} );
    shareBttn.on( 'click', function(){ toggleShare()} );
    //closeBttn.on( 'click', function(){toggleOverlay()} );

    playlistPlayer.playlist([{
      name: 'Xavier Cugat, l´exemple de català que fa les Amèriques',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/3/4/1461774869043.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Funeral de Xavier Cugat a Girona',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/6/3/1461774874836.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Duo Dinámico i Xavier Cugat a "Així és la Vida"',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/7/0/1461774930607.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Barcelona: Saló Cugat a l´Hotel Ritz',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/1/1/1461775019711.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Entrevista a Xavier Cugat en el programa "La Parada"',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/0/2/1461775122220.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Xavier Cugat rep la Medalla d´Or de Girona',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/7/5/1461775125157.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Xavier Cugat celebra el seu 89 aniversari a Lloret de Mar',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/6/4/1461775142046.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Xavier Cugat acomiada el programa de Cap d´Any dins del seu Rolls Royce',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/2/8/1461775199482.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Xavier Cugat presenta Cugat Visió, al Cap d´Any del 1986',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/1/1/1461775231711.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: '"La casa dels famosos": Xavier Cugat',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/3/9/1461775408593.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Xavier Cugat parla del contracte de Frank Sinatra per cantar a l´estadi Bernabéu',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/2/8/1461775415182.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Especial Cap d´Any 1986 Xavier Cugat',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/3/1/1461775420413.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Entrevista a Xavier Cugat a l´"Angel Casas Show"',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/4/6/1461775537164.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Xavier Cugat rep la Medalla d´Or de Barcelona',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/3/0/1461775539903.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Entrevista a Xavier Cugat, amb motiu de l´elaboració d´un programa homenatge',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/1/9/1461775596991.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Pasqual Maragall visita a l´hospital el músic Xavier Cugat',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/0/4/1461775621340.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Xavier Cugat dirigeix l´orquestra de l´"Àngel Casas Show"',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/8/0/1461775849008.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Futbol: Girona-Martinenc. Xavier Cugat recull la Medalla d´Or de Girona',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/4/6/1461776013164.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Xavier Cugat anuncia el seu casament',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/6/8/1461776045386.mp4',
        type: 'video/mp4'
      }]
      }, {
      name: 'Xavier Cugat parla del cas Dalí',
      sources: [{
        src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/1/1/1461776102311.mp4',
        type: 'video/mp4'
      }]
      }]);
      playlistPlayer.playlist.autoadvance(0);


  });
