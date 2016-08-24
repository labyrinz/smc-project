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
    var soundEpilogo = false;
    var boolsound = 1;
    var videoCardToogleSound = 1;
    var languajeOpen = false;

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

    //-----------------------
    //---------VIDEOS--------

    var player = videojs('GeneralVideo');

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
    var cugatNino = new TimelineMax({repeat:-1});

    tl
    //EPISODE 1
      .add("inicio")
      .to("", 0.1, { onStart: videoPlay, onStartParams: ["intro", false, false, false, false, "0/0/1471877157700.mp4", "videoClass", "introVideoFull"]})
      .to(".videoCover", 3, {css:{opacity: '0.2'}, delay: 2, ease: Power0.easeOut})
      .staggerFrom(introWords, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
      .staggerFrom(introWordsSubtitle, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
      .staggerFrom(introWordsName, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
      .to(".mouseIcon", 0.5, {bottom: '150px', ease: Bounce.easeOut})
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
      .to(".mouseIcon", 0.5, {bottom: '150px', ease: Bounce.easeOut},"+=0.5")
      .addPause()
      .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
      .to(".texto11",1.5,{ transform: 'scale(0)', opacity: '0', ease: Power4.easeOut},"+=0.2")
      .to("#page1",0.1,{ right: '0%', ease: Power0.easeNone})
      .to(".pentagramRect",0.2,{ bottom: '1%', ease: Power0.easeNone})
      .to(".currentDetails",0.2,{ top: '0px', ease: Power0.easeNone},"-=0.2")
      .to(".claveSol",0.2,{ bottom: '0', ease: Power0.easeNone},"-=0.2")
      .to(".pentagramBack",0.2,{ bottom: '0%', ease: Power0.easeNone},"-=0.2")
      .to(".pentagramNotesGroup",0.2,{ bottom: '2%', ease: Power0.easeNone},"-=0.2")
      .to(".age1",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
      .to("", 0.1, { onReverseComplete: ninoAnimation })
      .staggerFrom($("#page1").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita11",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=0.2")
      .addPause()
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [0] })
      .to("", 0.1, { onComplete: stopNinoAnimation })
      .staggerTo($("#page1").children(),0.6, animationToPattern, staggerToVelocity)
      //EPISODE 3
      .add("prologo2")
      .to("#page1",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onStart: updateTitle, onStartParams: [1] })
      .to(".ed2", 0.5, {left: '-5%', ease: Power2.easeIn},"scrollGer")
      .to(".ed3", 0.5, {left: '-10%', ease: Power2.easeIn},"scrollGer")
      .to(".ed4", 0.5, {left: '-15%', ease: Power2.easeIn},"scrollGer")
      .to("#page2",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
      .from(".mapSvgClassTop", 1, {scale: 0, onComplete: initViaje, onCompleteParams: ['play'], ease: Back.easeOut })
      .to(".mapSvgClassTop", 4, {width: '250%', top: '-60%', left: '-25%' , ease: Power2.easeIn},"+=1")
      .to(".cub1", 0.5, {top: '0%', ease: Power0.easeNone},"cuba1")
      .to(".ed1", 0.5, {top: '120%', onReverseComplete: ninoAnimation, ease: Power2.easeIn})
      .to(".ed2", 0.5, {top: '120%', ease: Power2.easeIn})
      .to(".ed3", 0.5, {top: '120%', ease: Power2.easeIn},"-=1")
      .to(".ed4", 0.5, {top: '120%', ease: Power2.easeIn})
      .to(".mapSvgClassTop", 2, {width: '800%', top: '-385%', left: '-140%', ease: Power2.easeIn},"-=1.2")
      .to("", 0.1, { onReverseComplete: initViaje, onReverseCompleteParams: ['reverse'] })
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,false,false,true,'4/0/1471877017204.mp4', 'videoCloud', 'videoCloudInside'] })
      .to(".mouseIcon", 0.5, {bottom: '150px', ease: Bounce.easeOut},"+=0.5")
      .to("", 0.1, { onReverseComplete: stopVideo })
      .addPause()
      .to("", 0.1, { onStart: stopVideo })
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,false,false,false,'4/0/1471877017204.mp4', 'videoCloud', 'videoCloudInside'] })
      .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
      .to("#page2",0.4,{ right: '100%', ease: Power0.easeNone},"+=1")
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoMarco',false,false,false,true,'3/9/1471877013293.mp4', 'fullScreenVideo', 'fullScreenVideoEnter'] })
      .to("", 0.1, { onReverseComplete: stopVideo })
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [1] })
      .addPause()
      .to("", 0.1, { onStart: stopVideo })
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoMarco',false,false,false,false,'3/9/1471877013293.mp4', 'fullScreenVideo', 'fullScreenVideoEnter'] })
      //EPISODE 4
      .add("prologo2Add")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [2] })
      .to("#page3",0.4,{ right: '0%', ease: Power0.easeNone})
      .to(".age1",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
      .to(".age2",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"-=0.3")
      .staggerFrom($("#page3").children(),0.6, animationFromPattern, staggerFromVelocity)
      .addPause()
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
      //.to("", 0.1, { onStart: stopVideo })
      .staggerTo($("#page4").children(),0.6, animationToPattern, staggerToVelocity)
      //.to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['onlySound',false,false,false,false,'3/4/1461774869043.mp4','',''] })
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [3] })
      //EPISODE 6
      .add("RR1")
      .to("#page4",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
      .to("", 0.1, { onStart: updateTitle, onStartParams: [4] })
      .to("", 0.1, { onStart: playSound, onStartParams: [playListOrder[1]] })
      .to("#page5",0.4,{ right: '0%', ease: Back.easeInOut.config(1)})
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
      .add("RR2")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [5] })
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
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,false,false,true,'2/5/1471877148752.mp4', 'videoCloud', 'videoCloudInside'] })
      .to("", 0.1, { onReverseComplete: stopVideo })
      .addPause()
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,false,false,false,'6/9/1471876985396.mp4', 'videoCloud', 'videoCloudInside'] })
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,false,false,true,'2/4/1471877146842.mp4', 'videoCloud', 'videoCloudInside'] })
      .addPause()
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,false,false,true,'2/4/1471877146842.mp4', 'videoCloud', 'videoCloudInside'] })
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,false,false,true,'6/9/1471876985396.mp4', 'videoCloud', 'videoCloudInside'] })
      .addPause()
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,false,false,false,'2/5/1471877148752.mp4', 'videoCloud', 'videoCloudInside'] })
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
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[2]] })
      //EPISODE 9
      .add("CC1")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [7] })
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
      .to(".mouseIcon", 0.5, {bottom: '100px', ease: Bounce.easeOut})
      .addPause()
      .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
      .to(".cita100",1,{ scale:'0',transform: 'rotateX(90deg)', ease: Bounce.easeOut},"+=0.5")
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [7] })
      .add("CC2")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [8] })
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
      .to("#page10",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,false,false,true,'4/0/1471877055304.mp4', 'videoCloud2', 'videoCloudInside'] })
      .to("", 0.1, { onReverseComplete: stopVideo })
      .addPause()
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,false,false,true,'3/4/1471877070743.mp4', 'videoCloud2', 'videoCloudInside'] })
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,false,false,true,'3/4/1461774869043.mp4', 'videoCloud2', 'videoCloudInside'] })
      .addPause()
      .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,false,false,true,'4/0/1471877055304.mp4', 'videoCloud2', 'videoCloudInside'] })
      .to("", 0.1, { onStart: stopVideo })
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [10] })
      .to(".blurEffect5", 2, { opacity: '0', ease: Back.easeOut.config(1)},"+=2")
      .to("#page10",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[3]] })
      //EPISODE 12
      .add("LA1")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [11] })
      .to("", 0.1, { onStart: playSound, onStartParams: [playListOrder[4]] })
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
      .to("", 0.1, { onComplete: playSound, onCompleteParams: [playListOrder[5]] })
      //.staggerTo($("#page11").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page12",0.4,{ right: '0%', ease: Power0.easeNone})
      .to(".blurEffect7",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
      .staggerFrom($("#page12").children(),0.6, animationFromPattern, staggerToVelocity)
      .to(".cita42",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
      .addPause()
      .staggerTo($("#page12").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page12",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [12] })
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[5]] })
      //EPISODE 14
      .add("LA3")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [13] })
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
      .staggerTo($("#page14").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page14",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[7]] })
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [14] })
      //EPISODE 16
      .add("Al2")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [15] })
      .to("", 0.1, { onStart: playSound, onStartParams:[playListOrder[8]]})
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',266.5,297,297,false,'2/7/1471877144972.mp4', 'videoCloud', 'videoCloudInside'] })
      .to("#page15",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
      .to(".blurEffect8",0.2,{ filter: 'blur(8px)', webkitFilter: 'blur(8px)', ease: Power0.easeNone})
      .staggerFrom($("#page15").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita53",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
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
      .to("", 0.1, { onStart: playSound, onStartParams:[playListOrder[9]]})
      .to("#page16",0.4,{ right: '0%', ease: Power0.easeNone})
      .staggerFrom($("#page16").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita56",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
      .addPause()
      .staggerTo($("#page16").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page16",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [16] })
      //EPISODE 18
      .add("CB1")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [17] })
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
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [17] })
      //EPISODE 19
      .add("CB2")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [18] })
      .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['resume',300,322,322,false,'7/5/1471877240757.mp4', 'videoCloud', 'videoCloudInside'] })
      .to("#page18",0.4,{ right: '0%', ease: Power0.easeNone})
      .staggerFrom($("#page18").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita61",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=0.2")
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
      .to("", 0.1, { onStart: playSound, onStartParams:[playListOrder[10]]})
      .to(".age3",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
      .to(".barc1", 3, { opacity: '1', ease: Power4.easeIn})
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
      .staggerFrom($("#page19").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".cita62",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
      .addPause()
      .staggerTo($("#page19").children(),0.6, animationToPattern, staggerToVelocity)
      .to("#page19",0.4,{ right: '100%', ease: Power0.easeNone})
      .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [19] })
      //EPISODE 21
      .add("EP2")
      .to("", 0.1, { onStart: updateTitle, onStartParams: [20] })
      .to("#page20",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
      .staggerFrom($("#page20").children(),0.6, animationFromPattern, staggerFromVelocity)
      .to(".textoFin",3,{  transform: 'scale(1)', opacity: '1', ease: Power4.easeOut},"+=2")
      .to(".textoFin",3,{ top: '0', ease: Power4.easeOut},"+=2")
      .to(".ep15",3,{ opacity: '1', ease: Power4.easeOut},"-=3")
      .to(".blurEffect9",6,{ onStart:function(){soundEpilogo.fade(1,0,6000)},opacity: '0', ease: Power4.easeOut},"-=6")
      .to(".age4",3,{ onReverseComplete: function(){soundEpilogo.fade(0,1,3000)}, opacity: '0', ease: Power4.easeOut},"-=6")
      .addPause();

    tl.play();
    //setTimeout(playTimeLine, 15000);
    /* setTimeout(drawFace, 5000);*/

    //------------------------------------
    $scope.playVideoSlide = function(id, container){
      if(boolsound == 1){ videoCardtoggleSound(); }
      $('#'+container).css("left",'');
      //videoSlideResize $('#'+container).addClass('videoFullScreen');
      if($("#"+id).get(0).paused) { $("#"+id).get(0).play(); $('#'+container).removeClass('videoPlay'); }
      else { $("#"+id).get(0).pause();  $('#'+container).addClass('videoPlay'); }
      $("#"+id).on("ended", function() {
        if(boolsound == 1)videoCardtoggleSound();
        $('#'+container).addClass('videoPlay');
        $('#'+container).removeClass('videoFullScreen');
      });
    }
    //-------FUNCTIONS --------------------
    $scope.upTo = function(value, music, notes) {
      console.log('notes: ', notes,music);
      TweenMax.to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut});
      TweenMax.to(".coverTransitions", 0.1, { scale: 1, ease: Power4.easeOut });
      TweenMax.to(".coverTransitions", 0.6, { opacity: 1, ease: Power4.easeOut, delay: 0.2 });
      if ($("div.overlay").hasClass("open")) $("#trigger-overlay").click();
      setTimeout(function(){
        stopVideo();
        controlSound();
        updateTitle(notes);
        //if(music) { console.log('entra musica: ', playListOrder[music]); playSound(playListOrder[music]); }
        //else { if(soundEpilogo)soundEpilogo.stop(); }
        playSound(playListOrder[music]);
        stopNinoAnimation();
        if(value=='inicio') { videoPlay("intro", false, false, false, true, "3/4/1461774869043.mp4", "videoClass", "introVideoFull"); }
        else { player.pause(); }
        tl.play(value);
      },500);
      TweenMax.to(".coverTransitions", 7, {opacity: 0, ease: Power4.easeOut, delay: 3});
      TweenMax.to(".coverTransitions", 0.1, {scale: 0, ease: Power4.easeOut, delay: 7});
    };

    $scope.prevFoto = function(id,value){
      if(value==undefined) var desp = '-110%';
      else var desp = '-'+value;
      var firstPhoto = $('.slideimg'+id).first();
      TweenMax.to(firstPhoto, 0.1, {left: desp, repeatDelay:0.1, repeat:1, yoyo:true, onRepeat:function(){$('#fotoGroup'+id).append(firstPhoto); if(firstPhoto[0].childNodes[1].id) {  if(videoCardToogleSound == 0) $("#"+firstPhoto[0].childNodes[1].id).get(0).play(); };}, ease: Power4.easeOut});
    };

    $scope.nextFoto = function(id, value){
      if(value==undefined) var desp = '110%';
      else var desp = value;
      var firstPhoto = $('.slideimg'+id).last();
      console.log(firstPhoto);
      //$("#"+firstPhoto[0].childNodes[1].id).get(0).play();
      firstPhoto.attr('autoplay','autoplay');
      TweenMax.to(firstPhoto, 0.1, {left: desp, repeatDelay:0.1, repeat:1, yoyo:true, onRepeat:function(){$('#fotoGroup'+id).prepend(firstPhoto);if(firstPhoto[0].childNodes[1].id) {  if(videoCardToogleSound == 0) $("#"+firstPhoto[0].childNodes[1].id).get(0).play(); };}, ease: Power4.easeOut});

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

    //----------------------------------------------
    //------ vIDEO & AUDIO -------------------------

    //function videoPlay(videoType, timer, duration, breakpoint, continueBeforeStop, id, class1, class2){
    //   $scope.playVideo(videoType, timer, duration, breakpoint, continueBeforeStop, id, class1, class2);
    //}

    function videoPlay(videoType, timer, duration, breakpoint, continueBeforeStop, id, class1, class2){
       console.log('continue before Stop?: ', continueBeforeStop, videoType);
       fullScreenVideoStatus = true;
       player.pause();
       $('#videoGeneral').removeClass('videoClass fullScreenVideo resumeVideoBox videoCloud videoCloud2');
       player.src({ type: 'video/mp4', src: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/'+id });
       if(class1 == 'videoCloud') { var scaleValue = 0.6; $('#burbleBig').addClass('burbleBig'); $('#burbleMed').addClass('burbleMed'); $('#burbleSmall').addClass('burbleSmall'); }
       else if(class1 == 'videoCloud2') { var scaleValue = 0.6; $('#burbleBig').addClass('burbleBig2'); $('#burbleMed').addClass('burbleMed2'); $('#burbleSmall').addClass('burbleSmall2'); }
       else var scaleValue = 1;
       if(soundEpilogo && boolsound == 1) soundEpilogo.fade(1,0,2000);
       $('#videoGeneral').addClass(class1);
       $('#GeneralVideo').addClass("video-js vjs-default-skin " + class2);
       if(videoType!='onlySound') TweenMax.to($('#videoContainer'), 0.5, { opacity: 1, scale: scaleValue, ease: Power4.easeOut });
       player.play();
       if(videoType == 'resume'){
         player.currentTime(timer);
         player.play();
         player.off('timeupdate');
         player.breakpoint = false;
         player.on('timeupdate', function() {
           if (!player.breakpoint && (player.currentTime() == breakpoint-3) ){
             console.log('cumple timeupdate antes:', player.breakpoint, player.currentTime());
             TweenMax.to($('#videoContainer'), 3, { opacity: 0, scale: 0, ease: Power4.easeOut });
           }
           if (!player.breakpoint && (player.currentTime() >= breakpoint) ){
             console.log('cumple timeupdate:', player.breakpoint, player.currentTime());
             player.breakpoint = true;
             stopVideo();
             if(continueBeforeStop == true) tl.play();
             fullScreenVideoStatus = false;
           }
         });
       }
       else {
         player.on("ended", function(){
           console.log('continue before Stop Inside ended?: ', continueBeforeStop, videoType);
           if(continueBeforeStop == true){ tl.play(); }
           if(soundEpilogo && boolsound == 1){ soundEpilogo.fade(0,1,2000); }
           fullScreenVideoStatus = false;
           player.src({ type: 'video/youtube', src: '' });
         })
       }
    };

    function stopVideo(){
      $('#burbleBig').removeClass('burbleBig burbleBig2');
      $('#burbleMed').removeClass('burbleMed burbleMed2');
      $('#burbleSmall').removeClass('burbleSmall burbleSmall2');
      TweenMax.to($('#videoContainer'), 0.5, { opacity: 0, scale: 0, ease: Power4.easeOut });
      if(soundEpilogo){ if(soundEpilogo.volume() < 1 && boolsound == 1) soundEpilogo.fade(0,1,2000); }
      fullScreenVideoStatus = false;
      player.off("ended");
      player.pause();
    }
    //-------SOUND --------------
    function controlSound(){
      player.pause();
      if(soundEpilogo) soundEpilogo.fade(1,0,2000);
    }

    function playSound(url){
      if(soundEpilogo ){ if(soundEpilogo.volume() > 0) soundEpilogo.fade(1,0,2000); }
      setTimeout(function(){
        if(soundEpilogo) soundEpilogo.stop();
        soundEpilogo = new Howl({
          urls: ['audio/'+url+'.mp3'],
          loop: true,
          volume: 0,
          onend: function() {
          }
        });
        soundEpilogo.play();
        if(soundEpilogo && !fullScreenVideoStatus  && boolsound == 1){ soundEpilogo.fade(0,1,2000); }
      }, 500)
    }
    function toggleSound(){
      boolsound = boolsound ? 0 : 1;
      player.volume(boolsound);
      if(!fullScreenVideoStatus)soundEpilogo.volume(boolsound);
    }
    function videoCardtoggleSound(){
      videoCardToogleSound = videoCardToogleSound ? 0 : 1;
      player.volume(videoCardToogleSound);
      if(!fullScreenVideoStatus)soundEpilogo.volume(videoCardToogleSound);
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

    //----------MOUSE CONTROLS --------

    $(window).bind('mousewheel DOMMouseScroll', function(event){
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
    });
    //--------TOUCH CONTROLS------

    if (window.DeviceOrientationEvent && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      $('#controlIcon').addClass('iconSpace2');
      $scope.controlText = 'deslizar para continuar';
    }
    else {
      $('#controlIcon').addClass('iconSpace');
      $scope.controlText = 'scroll para continuar';
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
        } else {
          /* down swipe */
        }
      }
      xDown = null;
      yDown = null;
    };
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
        else if( !overlay.hasClass( 'close' )) {
          overlay.addClass( 'open' );
          container.addClass( 'overlay-open' );
        }
    }

    triggerBttn.on( 'click', function(){toggleOverlay()} );
    soundBttn.on( 'click', function(){ toggleSound()} );
    //closeBttn.on( 'click', function(){toggleOverlay()} );

    (function() {
      // initialize icons
      [].slice.call( document.querySelectorAll( '.si-icons-default > .si-icon' ) ).forEach( function( el ) {
        var svgicon = new svgIcon( el, svgIconConfig );
      } );
    })();


  });
