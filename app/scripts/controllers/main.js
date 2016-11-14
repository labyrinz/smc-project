'use strict';

/**
 * @ngdoc function
 * @name smcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smcApp
 */

angular.module('smcApp')
  .controller('MainCtrl', function ($scope,deviceDetector) {

    try{
      var introLetters = $("#quote h2").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"introLetters"});
      var introLettersSubtitle = $("#quote h3 span.subtitle").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"introLettersSubtitle"});
      var introLettersName = $("#quote h3 span.cugat-name").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"introLettersName"});
      var viaje1 = $('#viaje1Svg').drawsvg();
    } catch(err){
      console.log(err)
    }
    console.log('device???: ', deviceDetector);
    //---------VIDEOS--------
    var introWords = $(".introLetters");
    var introWordsSubtitle = $(".introLettersSubtitle");
    var introWordsName = $(".introLettersName");
    var player = videojs('GeneralVideo');
    var playlistPlayer = videojs('video');
    var eardAdvice;
    var currentSlideActive = 0;

    $("#slideVideoAbbe2").prop("volume", 0.1);
    $("#slideVideoAB2").prop("volume", 1);
    $("#videoGeneral").hover(function(){
      $('.resizeMeButton').css("opacity", "1");
    }, function(){
      $('.resizeMeButton').css("opacity", "0.3");
    });
    $("#videoToolTipAB2").hover(function(){
      $('#videoToolTipContentAB2').css("opacity", "1");
      $('#videoToolTipContentAB2').css("transform", "scale(1)");
    }, function(){
      if(!$("#videoToolTipContentAB2").hasClass( 'tooltipVideoFixed' )){
        $('#videoToolTipContentAB2').css("opacity", "0");
        $('#videoToolTipContentAB2').css("transform", "scale(0)");
      }
    });
    $("#videoToolTipCC2").hover(function(){
      $('#videoToolTipContentCC2').css("opacity", "1");
      $('#videoToolTipContentCC2').css("transform", "scale(1)");
    }, function(){
      if(!$("#videoToolTipContentCC2").hasClass( 'tooltipVideoFixed' )){
        $('#videoToolTipContentCC2').css("opacity", "0");
        $('#videoToolTipContentCC2').css("transform", "scale(0)");
        $('#videoToolTipContentCC2').removeClass('tooltipVideoFixed');
      }
    });
    //-----------------------

    //--- GLOBAL VARIABLES ----
    var body = $('body');
    var totalWords = [];
    var fullScreenVideoStatus = false;
    var boolsound = 0.3;
    var soundVolume = boolsound;
    var languajeOpen = false;
    var page = 0;
    var videoCardToogleSound = 1;
    var progress;
    var currentBack = 'inf';
    $scope.mobileBack = 0;
    $scope.mobilePage = 0;

    // Mobile features
    var isMobile = false;
    var isSafari = navigator.userAgent.indexOf("Safari") > -1;
    var mainContainer = $( '#mainContainer' ),
        disclaimerMobile = $( '.disclaimerMobile' );
    var currentVideoSlidePlaying;

    if (deviceDetector.device != 'unknown') {
      $('.mouseIcon').addClass('iconSpace2');
      $('.keyboardIcon').hide();
      isMobile = true;
      console.log('is device');
      $scope.mobile = 'device';
      checkDisclaimer();
      $scope.controlText = 'continuar';//'deslizar para continuar';
    }
    else {
      isMobile = false;
      console.log('is not device');
      $scope.mobile = 'pc';
      //$scope.mobile = false;
      $scope.controlText = 'continuar';//'scroll para continuar';
    }
    var playListOrder = ['BeginTheBeguine','ElManisero','TICOTICO','Siboney','MyShawl','JungleRhumba','perfidia','QuizasQuizasQuizas','ParaVigomevoy','YoTeAmoMucho','Tabu'];

    $scope.imagesSlideOut = [
      {image1: '', image2: '', image3: ''},
      {image1: '', image2: '', image3: '', video1: ''},
      {image1: '', image2: '', video1: ''},
      {image1: '', image2: '', image3: ''},
      {image1: '', image2: '', image3: '', image4: ''},
      {image1: '', image2: '', image3: ''},
      {image1: '', image2: '', image3: '', video1: ''},
      {image1: '', image2: ''},
      {image1: '', image2: '', image3: '', image4: '', video1: ''},
      {image1: '', image2: '', image3: '', image4: ''},
      {image1: '', image2: '', image3: '', video1: '', video2: ''},
      {image1: '', image2: '', image3: '', image4: '', image5: '', video1: ''},
      {image1: '', image2: '', image3: '', image4: '', image5: '', image6: ''},
      {image1: '', image2: ''},
      {image1: '', image2: ''},
      {image1: '', image2: '', image3: '', image4: '', image5: '', image6: ''},
      {image1: ''}
    ];

    $scope.imagesSlideIn = [
      {image1: 'images/prel_05.jpg', image2: 'images/prel_03_old.jpg', image3: 'images/prel_0.jpg'},
      {image1: 'images/prel_06.jpg', image2: 'images/BNC_002_Album2_Cugat-violin.jpg', image3: 'images/BNC_001_Album1_Cugat-violin.jpg', video1: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/7/1/1471877098717.mp4'},
      {image1: 'images/prel_12.jpg', image2: 'images/WA_Caricature.jpg', video1: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/5/0/1471877015205.mp4'},
      {image1: 'images/RM1.jpg', image2: 'images/RM2.jpg', image3: 'images/RM3.jpg'},
      {image1: 'images/RM8.jpg', image2: 'images/RM7.jpg', image3: 'images/RM10.jpg', image4: 'images/RM11.jpg'},
      {image1: 'images/anecdotas/CC1-Carmen01.jpg', image2: 'images/anecdotas/CC1-Carmen02.jpg', image3: 'images/CC2.png'},
      {image1: 'images/CC_BCN_19.jpg', image2: 'images/CC5.jpg', image3: 'images/CC4_1.jpg', video1: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/1/4/1471876987041.mp4'},
      {image1: 'images/LA1-Lorraine.jpg', image2: 'images/lorraine12.jpg'},
      {image1: 'images/LA7.jpg', image2: 'images/LA6.jpg', image3: 'images/LA21N.jpg', image4: 'images/LA22N.jpg', video1: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/0/6/1471876980460.mp4'},
      {image1: 'images/LA3-Sinatra.jpg', image2: 'images/LA3-Columbia.jpg', image3: 'images/LA3-Cugat.jpg', image4: 'images/cugatPipa.jpg'},
      {image1: 'images/AL3.jpg', image2: 'images/AL32.jpg', image3: 'images/Abbe1.jpg', video1: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/8/1/1471877050018.mp4', video2: 'videos/videoplayback.mp4'},
      {image1: 'images/AL1.jpg', image2: 'images/AL33.jpg', image3: 'images/AL6.jpg', image4: 'images/AL34.jpg', image5: 'images/AL35.jpg', video1: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/0/6/1471876980460.mp4'},
      {image1: 'images/AL21.jpg', image2: 'images/AL9.jpg', image3: 'images/AL22.png', image4: 'images/AL8.jpg', image5: 'images/AL11.jpg'},
      {image1: 'images/cb15.jpg', image2: 'images/CB11.png'},
      {image1: 'images/CB1.jpg', image2: 'images/CuguiCharo.jpg', image3: 'images/CB_BCN_14.jpg'},
      {image1: 'images/sanjulian.jpg', image2: 'images/BCN_01_ep.png', image3: 'images/BNC_002_ep.png', image4: 'images/BNC_003_ep.png', image5: 'images/caricatura1.jpg', image6: 'images/caricatura2.jpg'},
      {image1: 'images/cugatPipa.jpg'}
    ];

    $scope.imageSlide = $scope.imagesSlideIn.slice();

    $scope.back1 = { image1:'images/back/inf/ed1c.png', image2: 'images/back/inf/ed2c.png', image3: 'images/back/inf/ed3c.png', image4: 'images/back/inf/rioc.png', image5: 'images/back/inf/niño.png' };
    $scope.back2 = { image1:'images/back/cuba/cuba.png', image2: 'images/back/cuba/coches.png' };
    $scope.back3 = { image1:'images/back/nuevaYork/nyCarret.png', image2: 'images/back/nuevaYork/nyLetreros.png', image3: 'images/back/nuevaYork/nyPuente.png', image4: 'images/back/nuevaYork/nyCielo.png', image5: 'images/back/nuevaYork/nyCoche1.png', image6: 'images/back/nuevaYork/nyCoche2.png', image7: 'images/back/nuevaYork/nyCoche3.png' };
    $scope.back4 = { image1:'images/back/berlin/berlinColor.png' };
    $scope.back5 = { image1:'images/back/carnie/palco.png', image2: 'images/back/carnie/luces.png', image3: 'images/back/carnie/escenario.png', image4: 'images/back/carnie/publico1.png', image5: 'images/back/carnie/publico2.png', image6: 'images/back/carnie/cugat.png' };
    $scope.back6 = { image1:'images/back/hollywood/hollywoodMontanas.png', image2: 'images/back/hollywood/hollywoodCielo.png', image3: 'images/back/hollywood/hollywoodRocas.png', image4: 'images/back/hollywood/hollywoodArboles.png', image5: 'images/back/hollywood/hollywoodNubes.png', image6: 'images/back/hollywood/hollywoodSol.png', image7: 'images/back/hollywood/hollywoodLetrero.png' };
    $scope.back7 = { image1:'images/back/chicago/edificios.png', image2: 'images/back/chicago/letreros.gif', image3: 'images/back/chicago/lucesEdificios.png', image4: 'images/back/chicago/coche1.png', image5: 'images/back/chicago/coche2.png' };
    $scope.back8 = { image1:'images/back/lasvegas/fondo.png', image2: 'images/back/lasvegas/edificiosFondo.png', image3: 'images/back/lasvegas/edificioCaesar.png', image4: 'images/back/lasvegas/cartelFlamingo.png', image5: 'images/back/lasvegas/cartelmotel.png', image6: 'images/back/lasvegas/lucesCaesar.png', image7: 'images/back/lasvegas/lucesFlamingo.png', image8: 'images/back/lasvegas/lucesMotel.png', image9: 'images/back/lasvegas/bombillasFlamingo.png', image10: 'images/back/lasvegas/coches.png' };
    $scope.back9 = { image1:'images/back/barcelona/batllo.png', image2: 'images/back/barcelona/cugat.png', image3: 'images/back/barcelona/coche.png', image4: 'images/back/barcelona/troncos.png', image5: 'images/back/barcelona/copa1.png', image6: 'images/back/barcelona/copa2.png', image7: 'images/back/barcelona/hojas1.png', image8: 'images/back/barcelona/hojas2.png' };

    $scope.CatText = languajeSP.CatText;
    $scope.photoText = languajeSP.photoText;
    $scope.tooltipText = languajeSP.tooltipText;
    $scope.generalText = languajeSP.text;
    $scope.menuText = languajeSP.menu;

    //---------------------------
    //$scope.imageSlide[0] =  imagesSlideIn[0];
    //-----TIMELINE ---------

      console.log('version pc');

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

      //----SOUND TRACKS -----

      var soundEpilogo = new Howl({
        urls: ['audio/TICOTICO.mp3'],
        autoplay: false,
        loop: true,
        volume: 0
      });

      var soundNarracion = new Howl({
        urls: ['audio/loc/01-narracion-p1.mp3'],
        autoplay: false,
        loop: true,
        volume: 0
      });

      Howler.mobileAutoEnable = false;

      //-----------------------

      var animationFromPattern = { scale: '0', right: '-20%', ease: Back.easeInOut.config(1)};
      var animationToPattern = { scale: '0', opacity: '0', ease: Back.easeInOut.config(1)};
      var staggerFromVelocity = 0.05;
      var staggerToVelocity = 0.03;

      TweenMax.set(".scrollIcon, .hiddenCanvas, .dinamycText, .ageTitle, .napFace, .addon1, .prel01", {visibility:"visible", autoRound:false});


      var tl = new TimelineMax({repeat:0, autoRound:false});

    //if( !isMobile ) {
      tl
        //EPISODE 1
        .add("inicio")
        .to("#page0",0.5,{ scale: '1', ease: Back.easeIn.config(1)})
        .to(".topMenu",0.5,{ top: '0%', ease: Back.easeIn.config(1)})
        .to("", 0.1, { onStart: videoPlay, onStartParams: ["intro", true, "1471877157700.mp4", "videoClass", "introVideoFull",false,"local"]})
        .to(".videoCover", 1, {css:{opacity: '0.2'}, delay: 2, ease: Power0.easeOut})
        .staggerFrom(introWords, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
        .staggerFrom(introWordsSubtitle, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
        .staggerFrom(introWordsName, 0.6, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
        .to(".mouseIcon", 0.5, {bottom: '100px', ease: Bounce.easeIn, onComplete: updateScrollBttn})
        .to(".keyboardIcon", 0.5, {bottom: '90px', ease: Bounce.easeIn})

        .to("",0.1,{ onComplete: unblockMouse })
        .addPause()
        .to("",0.1,{ onReverseComplete: unblockMouse })

        .to(".keyboardIcon", 0.2, {bottom: '-150px', ease: Bounce.easeOut})
        .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
        .staggerTo(introWords, 0.2, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
        .staggerTo(introWordsSubtitle, 0.2, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
        .staggerTo(introWordsName, 0.2, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
        .to("#page0",0.5,{ scale: '0', ease: Back.easeIn.config(1)})
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ["intro", false, "1471877157700.mp4", "videoClass", "introVideoFull",false,"local"]})
        .to("", 0.1, { onStart: stopVideo })
        //EPISODE 2
        .add("prologo1")
        .to("", 2, { onComplete: edAnim })
        .to("", 0.1, { onComplete: playSound, onCompleteParams: [playListOrder[0]] })
        .to("", 0.1, { onComplete: updateTitle, onCompleteParams: [0] })
        .to(".texto11",2,{ transform: 'scale(1)', opacity: '1', ease: Power4.easeOut},"+=1")
        .to(".mouseIcon", 0.5, {bottom: '100px', ease: Bounce.easeOut, onComplete: updateScrollBttn},"+=0.5")
        .to(".chihuahua",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
        .to(".instruction-anecdota",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
        .to("", 0.1, { onStart: updateAnec, onStartParams: [1] })
        .to("",0.1,{ onComplete: unblockMouse })

        .to("",0.1,{ onComplete: unblockMouse })
        .addPause()
        .to("",0.1,{ onReverseComplete: unblockMouse })

        .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
        .to(".instruction-anecdota",0.3,{ transform: 'rotateX(-90deg)',  ease: Bounce.easeOut})
        .to(".texto11",1.5,{ transform: 'scale(0)', opacity: '0', ease: Power4.easeOut},"+=0.2")
        .to("#page1",0.1,{ right: '0%', ease: Power0.easeNone})
        .to(".pentagramRect",0.2,{ bottom: '1%', ease: Power0.easeNone})
        .to(".currentDetails",0.2,{ top: '0px', ease: Power0.easeNone},"-=0.2")
        .to(".claveSol",0.2,{ bottom: '0', ease: Power0.easeNone},"-=0.2")
        .to("", 0.1, { onComplete: playNarracion, onCompleteParams: ['01-narracion-p1', false] })
        .to(".pentagramBack",0.2,{ bottom: '0%', ease: Power0.easeNone},"-=0.2")
        .to(".pentagramNotesGroup",0.2,{ bottom: '2%', ease: Power0.easeNone},"-=0.2")
        .to(".instruction-pentagram",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
        .to(".age1",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
        .staggerFrom($("#page1").children(),0.6, animationFromPattern, staggerFromVelocity)
        .to(".cita11",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=0.2")

        .to("",0.1,{ onComplete: unblockMouse })
        .addPause()
        .to("",0.1,{ onReverseComplete: unblockMouse })

        .to("", 0.1, { onComplete: stopNarracion })
        .to("", 0.1, { onStart: stopVideoToolTip, onStartParams: ['slideVideoProl', 'slideVideoContainerProl', 'playButtonProl', '' ] })
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [0] })
        .to(".instruction-pentagram",0.3,{ transform: 'rotateX(-90deg)',  ease: Bounce.easeOut})
        .staggerTo($("#page1").children(),0.6, animationToPattern, staggerToVelocity)
        //EPISODE 3
        .add("prologo2")
        .to("#page1",0.4,{ right: '100%', ease: Power0.easeNone})
        .to("", 0.1, { onStart: updateTitle, onStartParams: [1] })
        .to("", 0.1, { onStart: updateAnec, onStartParams: [2] })
        .to("#page2",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
        .from(".mapSvgClassTop", .3, {scale: 0.5, onComplete: initViaje, onCompleteParams: ['play'], ease: Back.easeOut })
        .to(".mapSvgClassTop", 1, {width: '6200px', top: '-1240px', left: '-2320px' , ease: Power2.easeIn},"+=1")
        .to("", 1, { onStart: edAnimOff })
        .to("", 1, { onStart: cubaAnim }, "-=0.5")
        .to(".mapSvgClassTop", 2, {width: '6200px', top: '-1390px', left: '-1100px', ease: Power2.easeIn},"-=1.2")
        .to("", 0.1, { onReverseComplete: initViaje, onReverseCompleteParams: ['reverse'] })
        .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,'p1clip1ESP.mp4', 'videoCloud', 'videoCloudInside',false,"local"] })
        .to(".mouseIcon", 0.5, {bottom: '100px', ease: Bounce.easeOut, onComplete: updateScrollBttn},"+=0.5")
        .to("", 0.1, { onReverseComplete: stopVideo })

        .to("",0.1,{ onComplete: unblockMouse })
        .addPause()
        .to("",0.1,{ onReverseComplete: unblockMouse })

        .to("", 0.1, { onStart: stopVideo })
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,'p1Clip1ESP.mp4', 'videoCloud', 'videoCloudInside',false,"local"] })
        .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut, onComplete: updateScrollBttn})
        .to("#page2",0.4,{ right: '100%', ease: Power0.easeNone},"+=1")
        .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videomarco',true,'P2Clip1.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter',false,"local"] })
        .to("", 0.1, { onReverseComplete: stopVideo })
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [1] })
        .addPause()
        .to("", 0.1, { onStart: stopVideo })
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videomarco',false,'P2Clip1.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter',false,"local"] })
        //EPISODE 4
        .add("prologo2Add")
        .to("", 2, { onStart: updateTitle, onStartParams: [2] })
        .to("#page3",0.4,{ right: '0%', ease: Power0.easeNone})
        .to(".chihuahua",0.3,{ transform: 'rotateX(90deg)',  ease: Bounce.easeOut})
        .to("", 0.1, { onComplete: playNarracion, onCompleteParams: ['02-narracion-p2', false] })
        .to(".age1",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
        .to(".age2",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"-=0.3")
        .staggerFrom($("#page3").children(),0.6, animationFromPattern, staggerFromVelocity)
        .addPause()
        .to("", 0.1, { onComplete: stopNarracion })
        .to("", 0.1, { onStart: stopVideoToolTip, onStartParams: ['slideVideoHavana', 'slideVideoContainerHavana', 'playButtonHavana', '' ] })
        .staggerTo($("#page3").children(),0.6, animationToPattern, staggerToVelocity)
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [2] })
        .to("", 1, { onStart: cubaAnimOff })
        //EPISODE 5
        .add("prologo3")
        .to("", 0.1, { onStart: newYorkAnim })
        .to("#page3",0.4,{ right: '100%', ease: Power0.easeNone})
        .to("", 0.1, { onStart: updateTitle, onStartParams: [3] })
        .to("", 0.1, { onComplete: playNarracion, onCompleteParams: ['03-narracion-p3', false] })
        .to("#page4",0.4,{ right: '0%', ease: Power0.easeNone},"+=2")
        .staggerFrom($("#page4").children(),0.6, animationFromPattern, staggerFromVelocity)
        .to(".cita12",1,{  transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
        .addPause()
        .to("", 0.1, { onComplete: stopNarracion })
        .to("", 0.1, { onStart: stopVideoToolTip, onStartParams: ['slideVideoNY', 'slideVideoContainerNY', 'playButtonNY', 'fullScreenButtonNY' ] })
        .staggerTo($("#page4").children(),0.6, animationToPattern, staggerToVelocity)
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [3] })
        //EPISODE 6
        .add("RR1")
        .to("", 0.1, { onStart: videoPlay, onStartParams: ['resume', true, 'introRM.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter',false,"local"]})
        .to("", 0.1, { onStart: updateTitle, onStartParams: [4] })
        .to("#page4",0.1,{ right: '100%', ease: Back.easeInOut.config(1)})
        .to("#page5",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"+=0.1")
        .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[0]] })
        .to("", 0.1, { onReverseComplete: stopVideo })
        .to("", 0.1, { onStart: playSound, onStartParams: [playListOrder[1]] },"+=0.5")
        .addPause()
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['resume', true, 'introRM.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter',false,"local"]})
        .to("", 0.1, { onStart: stopVideo })
        .to("", 2, { onComplete: playNarracion, onCompleteParams: ['04-narracion-rm1', false] },"+=1")
        .staggerFrom($("#page5").children(),0.6, animationFromPattern, staggerFromVelocity)
        .to(".cita21",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=0.5")
        .addPause()
        //EPISODE 7
        .to("", 0.1, { onComplete: stopNarracion })
        .staggerTo($("#page5").children(),0.6, animationToPattern, staggerToVelocity)
        .to("#page5",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
        .to("#page6",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
        //.to(".blurEffect3",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone},"+=1")
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [4] })
        .to("", 1, { onComplete: newYorkAnimOff })
        .to(".chihuahua",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut},"+=1")
        .add("RR2")
        .to("", 1, { onComplete: berAnim })
        .to("", 0.1, { onStart: updateTitle, onStartParams: [5] })
        .to("", 0.1, { onStart: updateAnec, onStartParams: [3] })
        //.to(".blurEffect4",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
        .staggerFrom($("#page6").children(),0.6, animationFromPattern, staggerFromVelocity)
        .to(".cita14",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
        .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,'Cugat2rasgos-Musica.mp4', 'videoCloud', 'videoCloudInside',false,"tve"] })
        .addPause()
        .to("", 0.1, { onStart: stopVideo })
        .staggerTo($("#page6").children(),0.6, animationToPattern, staggerToVelocity)
        .to("#page6",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
        .to("", 0.1, { onComplete: berAnimOff })
        .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[1]] })
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [5] })
        //EPISODE 8
        .add("RR3")
        .to("", 0.1, { onStart: hollyAnim })
        .to("", 0.1, { onStart: playSound, onStartParams: [playListOrder[2]] })
        .to("", 0.1, { onStart: updateTitle, onStartParams: [6] })
        .to("", 0.1, { onStart: updateAnec, onStartParams: [4] })
        .to("#page7",0.2,{ right: '0%', ease: Back.easeInOut.config(1)},"+=2")
        .staggerFrom($("#page7").children(),0.6, animationFromPattern, staggerFromVelocity)
        .to(".cita15",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
        //.to("", 0.1, { onReverseComplete: stopVideo })
        .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',true,'RM3Clip2ESP.mp4', 'videoCloud', 'videoCloudInside', true, "local"] })
        .to("", 0.1, { onReverseComplete: stopVideo })
        .to(".mouseIcon", 0.5, {bottom: '100px', ease: Bounce.easeOut, onComplete: updateScrollBttn}, '+=1')
        .addPause()
        .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,'RM3CLIP1.mp4', 'videoCloud', 'videoCloudInside', true,"local"] })
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,'RM3Clip3ESP.mp4', 'videoCloud', 'videoCloudInside',false,"local"] })
        .addPause()
        .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,'RM3Clip3ESP.mp4', 'videoCloud', 'videoCloudInside',false,"local"] })
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',true,'RM3CLIP1.mp4', 'videoCloud', 'videoCloudInside', true,"local"] })
        .addPause()
        .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,'RM3Clip2ESP.mp4', 'videoCloud', 'videoCloudInside', true,"local"] })
        //.to("", 0.1, { onStart: stopVideo })
        .to("", 0.1, { onStart: stopVideo })
        .staggerTo($("#page7").children(),0.6, animationToPattern, staggerToVelocity)
        .to("#page7",0.4,{ right: '100%', ease: Back.easeInOut.config(1)})
        //.to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['onlyAudio',false,false,false,false,'3/4/1461774869043.mp4','',''] })
        .to("", 0.1, { onComplete: hollyAnimOff })
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [6]},"+=2")
        .to("", 0.1, { onStart: updateAnec, onStartParams: [7] })
        .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[2]] })
        //EPISODE 9
        .add("CC1")
        .to("", 0.1, { onStart: updateTitle, onStartParams: [7] })
        .to("", 0.1, { onStart: updateAnec, onStartParams: [6] })
        .to(".age2",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
        .to("", 0.1, { onStart: videoPlay, onStartParams: ['resume', true, 'introCC.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter',false,"local"]})
        .to("", 0.1, { onReverseComplete: stopVideo })
        .to("", 2, { onComplete: playSound, onCompleteParams: [playListOrder[3]] }, "+=2")
        .addPause()
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [7] })
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['resume',101,112,112, true, 'RESUMENCUGATv3ESP.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter',false,"local"]})
        .to("", 0.1, { onStart: stopVideo })
        .add("CC2")
        .to("", 0.1, { onStart: updateTitle, onStartParams: [8] })
        .to("", 0.1, { onStart: updateAnec, onStartParams: [5] })
        .to("", 0.1, { onStart: carnAnim })
        .to(".cita100",1,{ scale:'1',transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=3")
        .to("", 0.1, { onComplete: playNarracion, onCompleteParams: ['05-narracion-cc1', false] })
        .to(".mouseIcon", 0.5, {bottom: '100px', ease: Bounce.easeOut, onComplete: updateScrollBttn}, '+=1')
        .addPause()
        .to("", 0.1, { onComplete: stopNarracion })
        .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
        .to(".cita100",1,{ scale:'0',transform: 'rotateX(90deg)', ease: Bounce.easeOut},"+=0.5")
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
        .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[3]] })
        .to("", 0.1, { onStart: updateTitle, onStartParams: [10] })
        .to(".chihuahua",0.3,{ transform: 'rotateX(90deg)',  ease: Bounce.easeOut})
        .to("#page10",0.4,{ right: '0%', ease: Back.easeInOut.config(1)},"-=0.4")
        .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',true,'cc3clip1ESP.mp4', 'videoCloud2', 'videoCloudInside', true, "local"] })
        .to("", 0.1, { onReverseComplete: stopVideo })
        .to(".mouseIcon", 0.5, {bottom: '100px', ease: Bounce.easeOut, onComplete: updateScrollBttn}, '+=1')
        .addPause()
        .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
        .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['videoCloud',true,'CC3CLIP2def.mp4', 'videoCloud2', 'videoCloudInside', false, "local"] })
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',true,'CC3CLIP2def.mp4', 'videoCloud2', 'videoCloudInside', false, "local"] })
        .to(".mouseIcon", 0.5, {bottom: '100px', ease: Bounce.easeOut, onComplete: updateScrollBttn}, '+=1')
        .addPause()
        .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',true,'cc3clip1ESP.mp4', 'videoCloud2', 'videoCloudInside', true, "local"] })
        .to("", 0.1, { onStart: stopVideo })
        .to("", 0.1, { onComplete: playNarracion, onCompleteParams: ['06-narracion-cc3', false] },'+=1')
        .to(".mouseIcon", 0.5, {bottom: '100px', ease: Bounce.easeOut, onComplete: updateScrollBttn}, '+=1')
        .addPause()
        .to("", 0.1, { onComplete: stopNarracion })
        .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [10] })
        .to(".blurEffect5", 2, { opacity: '0', ease: Back.easeOut.config(1)},"+=2")
        .to("#page10",0.4,{ right: '100%', ease: Power0.easeNone})
        .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[3]] })
        //EPISODE 12
        .add("LA1")
        .to(".chihuahua",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
        .to("", 0.1, { onStart: updateTitle, onStartParams: [11] })
        .to("", 0.1, { onStart: updateAnec, onStartParams: [9] })
        .to("", 0.1, { onStart: videoPlay, onStartParams:['resume', true, 'introLA.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter', false, "local"]})
        .to("", 2, { onStart: playSound, onStartParams: [playListOrder[4]] }, "+=2")
        .to("", 0.1, { onReverseComplete: stopVideo})
        .addPause()
        .to("", 0.1, { onStart: stopVideo })
        .to(".age3",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut})
        .to("", 0.1, { onStart: carnAnimOff })
        .to("", 0.1, { onStart: chiAnim }, "+=5")
        .to("#page11",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams:['resume', true, 'introLA.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter', false, "local"] })
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
        .to("#page12",0.4,{ right: '0%', ease: Power0.easeNone})
        .to(".blurEffect7",0.2,{ filter: 'blur(8px)',webkitFilter: 'blur(8px)', ease: Power0.easeNone},"+=1")
        .staggerFrom($("#page12").children(),0.6, animationFromPattern, staggerToVelocity)
        .to(".cita42",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
        .to("", 0.1, { onComplete: playNarracion, onCompleteParams: ['07-narracion-la2', false] })
        .addPause()
        .to("", 0.1, { onComplete: stopNarracion })
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
        .to("", 0.1, { onStart: chiAnimOff })
        .to("#page13",0.4,{ right: '100%', ease: Power0.easeNone})
        .to(".chihuahua",0.3,{ transform: 'rotateX(90deg)',  ease: Bounce.easeOut})
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [13] })
        .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[6]] })
        //EPISODE 15
        .add("AL1")
        .to("", 0.1, { onStart: videoPlay, onStartParams:['resume', true, 'introAL.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter',false,"local"]})
        .to("", 0.1, { onStart: updateTitle, onStartParams: [14] })
        .to("", 0.1, { onStart: playSound, onStartParams:[playListOrder[7]]})
        .to("#page14",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
        .to("", 0.1, { onStart: lasVAnim })
        .to("", 0.1, { onReverseComplete: stopVideo})
        .addPause()
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams:['resume', true, 'introAL.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter',false,"local"]})
        .to("", 0.1, { onStart: stopVideo })
        .staggerFrom($("#page14").children(),0.6, animationFromPattern, staggerFromVelocity)
        .to(".cita51",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=0.5")
        .to("", 0.1, { onComplete: playNarracion, onCompleteParams: ['08-narracion-al1', false] })
        .addPause()
        .to("", 0.1, { onComplete: stopNarracion })
        .to("", 0.1, { onStart: stopVideoToolTip, onStartParams: ['slideVideoAbbe', 'slideVideoContainerAbbe', 'playButtonAbbe', 'fullScreenButtonAbbe' ,"tve"] })
        .to("", 0.1, { onStart: stopVideoToolTip, onStartParams: ['slideVideoAbbe2', 'slideVideoContainerAbbe2', 'playButtonAbbe2', 'fullScreenButtonAbbe2', "tve" ] })
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
        .to("", 2.5, { onComplete: videoPlay, onCompleteParams: ['videoCloud',false,'AL2clip1ESP.mp4', 'videoCloud', 'videoCloudInside',false,"local"] })
        .to("", 0.1, { onReverseComplete: stopVideo })
        .addPause()
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['videoCloud',false,'AL2clip1ESP.mp4', 'videoCloud', 'videoCloudInside',false,"local"] })
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
        .to("", 0.1, { onComplete: playNarracion, onCompleteParams: ['09-narracion-al3', false] })
        .addPause()
        .to("", 0.1, { onComplete: stopNarracion })
        .staggerTo($("#page16").children(),0.6, animationToPattern, staggerToVelocity)
        .to("#page16",0.4,{ right: '100%', ease: Power0.easeNone})
        //.to(".chihuahua",0.3,{ transform: 'rotateX(90deg)',  ease: Bounce.easeOut})
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [16] })
        //EPISODE 18
        .add("CB1")
        .to("", 0.1, { onStart: updateTitle, onStartParams: [17] })
        .to("", 0.1, { onStart: updateAnec, onStartParams: [12] })
        .to("#page17",0.4,{ right: '0%', ease: Power0.easeNone})
        .to("", 0.1, { onStart: videoPlay, onStartParams:['resume', true, 'introCB.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter',false,"local"]})
        .to("", 0.1, { onReverseComplete: stopVideo })
        .addPause()
        .to("", 0.1, { onStart: stopVideo })
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams:['resume', false, 'introCB.mp4', 'resumeVideoBox', 'resumeVideoBoxEnter',false,"local"]})
        .staggerFrom($("#page17").children(),0.6, animationFromPattern, staggerFromVelocity)
        .to(".cita60",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=0.5")
        .addPause()
        .staggerTo($("#page17").children(),0.6, animationToPattern, staggerToVelocity)
        .to("#page17",0.4,{ right: '100%', ease: Power0.easeNone})
        .to(".chihuahua",0.3,{ transform: 'rotateX(0deg)',  ease: Bounce.easeOut})
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [17] })
        //EPISODE 19
        .add("CB2")
        .to("", 0.1, { onStart: updateTitle, onStartParams: [18] })
        .to("", 0.1, { onStart: updateAnec, onStartParams: [15] })
        .to("#page18",0.4,{ right: '0%', ease: Power0.easeNone})
        .staggerFrom($("#page18").children(),0.6, animationFromPattern, staggerFromVelocity)
        .to(".cita61",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut})
        .to("", 0.1, { onComplete: videoPlay, onCompleteParams: ['resume',false,'charo2.mp4', 'videoCloud', 'videoCloudInside',false,"local"] })
        .to("", 0.1, { onReverseComplete: stopVideo })
        .addPause()
        .to("", 0.1, { onStart: stopVideo })
        .to("", 0.1, { onComplete: playNarracion, onCompleteParams: ['10-narracion-cb2', false] }, '+=1')
        .to(".mouseIcon", 0.5, {bottom: '100px', ease: Bounce.easeOut, onComplete: updateScrollBttn}, '+=1')
        .addPause()
        .to("", 0.1, { onComplete: stopNarracion })
        .to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
        .to("", 0.1, { onReverseComplete: videoPlay, onReverseCompleteParams: ['resume',false,'charo2.mp4', 'videoCloud', 'videoCloudInside',false,"local"] })
        .staggerTo($("#page18").children(),0.6, animationToPattern, staggerToVelocity)
        .to(".blurEffect8",0.2,{ filter: 'blur(0px)',webkitFilter: 'blur(0px)', ease: Power0.easeNone})
        .to("", 0.1, { onStart: lasVAnimOff })
        .to("#page18",0.4,{ right: '100%', ease: Power0.easeNone}, "+=1")
        .to("", 0.1, { onReverseComplete: playSound, onReverseCompleteParams: [playListOrder[9]] })
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [18] })
        //EPISODE 20
        .add("EP1")
        .to("", 0.1, { onStart: updateTitle, onStartParams: [19] })
        .to("", 0.1, { onStart: updateAnec, onStartParams: [13] })
        .to("", 0.1, { onStart: playSound, onStartParams:[playListOrder[10]]})
        .to(".age3",0.3,{ transform: 'rotateX(90deg)', ease: Bounce.easeOut})
        .to("#texto7-barc",2,{ transform: 'scale(1)', opacity: '1', ease: Power4.easeOut})
        .to("", 0.1, { onStart: bcnAnim })
        .to("#texto7-barc",1,{ transform: 'scale(0)', opacity: '0', ease: Power4.easeOut},"+=0.2")
        .to(".age4",0.3,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=6")
        .to("#page19",0.4,{ right: '0%', ease: Power0.easeNone})
        .staggerFrom($("#page19").children(),0.6, animationFromPattern, staggerFromVelocity)
        .to(".cita62",1,{ transform: 'rotateX(0deg)', ease: Bounce.easeOut},"+=1")
        .to("", 0.1, { onComplete: playNarracion, onCompleteParams: ['11-narracion-e1', false] }, '+=1')
        .addPause()
        .to("", 0.1, { onComplete: stopNarracion })
        .staggerTo($("#page19").children(),0.6, animationToPattern, staggerToVelocity)
        .to("#page19",0.4,{ right: '100%', ease: Power0.easeNone})
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [19] })
        //EPISODE 21
        .add("EP2")
        .to("", 0.1, { onStart: updateTitle, onStartParams: [20] })
        .to("", 0.1, { onStart: updateAnec, onStartParams: [16] })
        .to("#page20",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
        .staggerFrom($("#page20").children(),0.6, animationFromPattern, staggerFromVelocity)
        .to("", 0.1, { onComplete: playNarracion, onCompleteParams: ['12-narracion-e2', true] }, '+=1')
        .to(".textoFin",2,{  transform: 'scale(1)', opacity: '1', ease: Power4.easeOut},"+=2")
        .to(".textoFin",2,{ top: '0', ease: Power4.easeOut},"+=2")
        .to(".ep15",2,{ opacity: '1', ease: Power4.easeOut},"-=3")
        .to(".lastButtons",3,{ opacity: '1', ease: Power4.easeOut},"-=3")
        .to("", 0.1, { onStart: bcnAnimOff })
        .to(".age4",3,{ opacity: '0', ease: Power4.easeOut},"-=6")
        .to("", 5, { onStart:function(){soundEpilogo.fade(soundVolume,0,60000)} })
        .to("", 5, { onReverseComplete: function(){soundEpilogo.fade(0,soundVolume,3000)} })
        .addPause()
        .to("", 0.1, { onComplete: stopNarracion })
        //.to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut})
        .staggerTo($("#page20").children(),0.6, animationToPattern, staggerToVelocity)
        .to(".textoFin",0.4,{  transform: 'scale(0)', opacity: '0', ease: Power4.easeOut},"+=2")
        .to("#page20",0.4,{ right: '100%', ease: Power0.easeNone})
        .to("", 0.1, { onReverseComplete: updateTitle, onReverseCompleteParams: [20] })
        //EXTRA
        .add("PLAYLIST")
        .to("", 0.1, { onComplete: stopNarracion })
        .to("", 0.1, { onStart: updateTitle, onStartParams: [21] })
        .to("",0.1, { onStart: setVideoPlaylist, onStartParams: [] })
        .to(".chihuahua",0.3,{ transform: 'rotateX(90deg)',  ease: Bounce.easeOut})
        .to("#page21",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
        .staggerFrom($("#page21").children(),0.6, animationFromPattern, staggerFromVelocity)
        .addPause();

      tl.pause();
    //}

    //------------------------------------ //------ Backs anim ----------

    function edAnim() {
      console.log('entra en inf');
      if ($scope.mobile == 'pc') {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".ed1", 1, {opacity: '1', ease: Bounce.easeOut})
          .play();
      }
      if ($scope.mobile == 'device') {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".ed1Dev", 1, {opacity: '1', ease: Bounce.easeOut})
          .play();
      }
      currentBack = 'inf';
    }
    function edAnimOff() {
      console.log('entra en inf off');
      if ($scope.mobile == 'pc') {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".ed1", 1, {opacity: '0', ease: Bounce.easeOut})
          .play();
      }
      if ($scope.mobile == 'device') {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".ed1Dev", 1, {opacity: '0', ease: Bounce.easeOut})
          .play();
      }
      currentBack = undefined;
    }
    function cubaAnim(){
      console.log('entra en cuba');
      if( $scope.mobile == 'pc' ) {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".cub1", 1, {top: '0%', ease: Bounce.easeOut})
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".cub1Dev", 1, {opacity: '1', ease: Bounce.easeOut})
          .play();
      }
      currentBack = 'cuba';
    }
    function cubaAnimOff(){
      console.log('entra en cuba off');
      if( $scope.mobile == 'pc' ) {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".cub1", 1, {top: '-120%', ease: Bounce.easeOut})
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".cub1Dev", 1, {opacity: '0', ease: Bounce.easeOut})
          .play();
      }
      currentBack = undefined;
    }
    function newYorkAnim(){
      console.log('entra en ny');
      if( $scope.mobile == 'pc' ){
        new TimelineMax({repeat:0, autoRound:false})
          .to(".ny4", 0.2, { top: '0%', ease: Bounce.easeOut},"-=0.5")
          .to(".ny3", 0.5, { top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny1", 0.5, { top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny2", 0.5, { top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny5", 0.8, { scale: '1', right: '0', ease: Power4.easeOut},"-=0.2")
          .to(".ny6", 0.8, { scale: '1', right: '0', ease: Power4.easeOut},"-=0.2")
          .to(".ny7", 0.8, { scale: '1', right: '0', ease: Power4.easeOut},"-=0.2")
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat:0, autoRound:false})
          .to(".nyDev", 0.5, {opacity: '1', ease: Power0.easeNone})
          .play();
      }
      currentBack = 'ny';
    }
    function newYorkAnimOff(){
      console.log('entra en ny off');
      if( $scope.mobile == 'pc' ){
        new TimelineMax({repeat:0, autoRound:false})
          .to(".ny5", 0.5, {scale: '5', right: '200%', ease: Power4.easeIn})
          .to(".ny6", 0.5, {scale: '5', right: '200%', ease: Power4.easeIn},"-=0.2")
          .to(".ny7", 0.5, {scale: '5', right: '200%', ease: Power4.easeIn},"-=0.2")
          .to(".ny3", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ny1", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ny2", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ny4", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat:0, autoRound:false})
          .to(".nyDev", 0.5, {opacity: '0', ease: Power0.easeNone})
          .play();
      }
      currentBack = undefined;
    }
    function berAnim(){
      console.log('entra en berlin anim');
      if( $scope.mobile == 'pc' ) {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".ber1", 1, {transform: 'rotateY(0deg)', ease: Bounce.easeOut})
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".ber1Dev", 1, {opacity: '0', ease: Bounce.easeOut})
          .play();
      }
      currentBack = 'berlin';
    }
    function berAnimOff(){
      if( $scope.mobile == 'pc' ) {
        console.log('entra en berlin anim off');
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".ber1", 1, {transform: 'rotateY(165deg)', ease: Bounce.easeOut})
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".ber1Dev", 1, {opacity: '0', ease: Bounce.easeOut})
          .play();
      }
      currentBack = undefined;
    }
    function hollyAnim(){
      console.log('entra en holly');
      if( $scope.mobile == 'pc' ) {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".holly2", 0.2, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)})
          .to(".holly1", 0.2, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".holly3", 0.2, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".holly4", 0.2, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".holly7", 0.2, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".holly6", 0.3, {top: '0%', ease: Power4.easeOut})
          .to(".holly5", 0.2, {opacity: '1', ease: Power4.easeOut})
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".holly1Dev", 1, {opacity: '1', ease: Bounce.easeOut})
          .play();
      }
      currentBack = 'holly';
    }
    function hollyAnimOff(){
      console.log('entra en holly off');
      if( $scope.mobile == 'pc' ) {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".holly2", 0.5, { transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.5")
          .to(".holly1", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
          .to(".holly3", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
          .to(".holly4", 0.5, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)},"-=0.3")
          .to(".holly7", 0.5, {top: '150%', ease: Bounce.easeOut},"-=0.3")
          .to(".holly6", 0.5, {top: '-150%', ease: Power4.easeOut},"carmenCastillo")
          .to(".holly5", 1, {opacity: '0', ease: Power4.easeOut})
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".holly1Dev", 1, {opacity: '0', ease: Bounce.easeOut})
          .play();
      }
      currentBack = undefined;
    }

    function carnAnim(){
      console.log('entra en carnegie');
      if( $scope.mobile == 'pc' ) {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".carn2", 4, { opacity: '1', ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 2, points: 20, taper: "none", randomize: true, clamp: false})})
          .to(".carn1", 2, {opacity: '1', ease: Back.easeOut.config(1)},"-=2")
          .to(".carn1", 2, {top: '-50%', ease: Power4.easeOut})
          .to(".carn2", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
          .to(".carn3", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
          .to(".carn4", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
          .to(".carn5", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
          .to(".carn6", 2, {top: '-50%', ease: Power4.easeOut},"-=2")
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".carn1Dev", 1, {opacity: '1', ease: Bounce.easeOut})
          .play();
      }
      currentBack = 'carn';
    }
    function carnAnimOff(){
      console.log('entra en carnegie off');
      if( $scope.mobile == 'pc' ) {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".carn2", 4, { opacity: '0', ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 2, points: 20, taper: "none", randomize: true, clamp: false})})
          .to(".carn1", 2, { opacity: '0', ease: Back.easeOut.config(1)},"-=2")
          .to(".carn1", 2, { opacity: '0', ease: Power4.easeOut})
          .to(".carn2", 2, { opacity: '0', ease: Power4.easeOut},"-=2")
          .to(".carn3", 2, { opacity: '0', ease: Power4.easeOut},"-=2")
          .to(".carn4", 2, { opacity: '0', ease: Power4.easeOut},"-=2")
          .to(".carn5", 2, { opacity: '0', ease: Power4.easeOut},"-=2")
          .to(".carn6", 2, { opacity: '0', ease: Power4.easeOut},"-=2")
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".carn1Dev", 1, {opacity: '0', ease: Bounce.easeOut})
          .play();
      }
      currentBack = undefined;
    }
    function chiAnim(){
      console.log('entra en chicago');
      if( $scope.mobile == 'pc' ) {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".chi4", 0.3, { opacity: '1', ease: Bounce.easeOut })
          .to(".chi2", 1, { opacity: '1', ease: Power4.easeOut })
          .to(".chi1", 4, { opacity: '1', ease: Power0.easeNone },"+=1")
          .to(".chi5", 1, { left: '0', ease: Power4.easeOut })
          .to(".chi6", 1, { left: '0', ease: Power4.easeOut })
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".chi1Dev", 1, {opacity: '1', ease: Bounce.easeOut})
          .play();
      }
      currentBack = 'chicago';
    }
    function chiAnimOff(){
      console.log('entra en chicago off');
      if( $scope.mobile == 'pc' ) {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".chi2", 0.3, {opacity: '0', ease: Back.easeOut.config(1)},"+=0.5")
          .to(".chi4", 0.3, {opacity: '0', ease: Bounce.easeOut},"+=0.5")
          .to(".chi5", 1, {left: '150%', ease:Power4.easeOut})
          .to(".chi6", 1, {left: '-150%', ease: Power4.easeOut})
          .to(".chi1", 0.3, {opacity: '0', ease: Back.easeOut.config(1)},"-=0.2")
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".chi1Dev", 1, {opacity: '0', ease: Bounce.easeOut})
          .play();
      }
      currentBack = undefined;
    }
    function lasVAnim(){
      console.log('entra en las vegas');
      if( $scope.mobile == 'pc' ) {
        new TimelineMax({repeat: 0, autoRound: false})
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
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".lasv1Dev", 1, {opacity: '1', ease: Bounce.easeOut})
          .play();
      }
      currentBack = 'lasVegas';
    }
    function lasVAnimOff(){
      console.log('entra en las vegas off');
      if( $scope.mobile == 'pc' ) {
        new TimelineMax({repeat: 0, autoRound: false})
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
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".lasv1Dev", 1, {opacity: '0', ease: Bounce.easeOut})
          .play();
      }
      currentBack = undefined;
    }
    function bcnAnim(){
      console.log('entra en barcelona');
      if( $scope.mobile == 'pc' ) {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".blurEffect9",0.1,{ opacity: '1', ease: Power4.easeOut})
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
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".barc1Dev", 1, {opacity: '1', ease: Bounce.easeOut})
          .play();
      }
      currentBack = 'bcn';
    }
    function bcnAnimOff(){
      console.log('entra en barcelona off');
      if( $scope.mobile == 'pc' ) {
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".blurEffect9",6,{ opacity: '0', ease: Power4.easeOut})
          .play();
      }
      if( $scope.mobile == 'device' ){
        new TimelineMax({repeat: 0, autoRound: false})
          .to(".lasv1Dev", 1, {opacity: '0', ease: Bounce.easeOut})
          .play();
      }
      currentBack = undefined;
    }
    //-------FUNCTIONS --------------------

    $scope.upTo = function(value, music, notes) {
      console.log( 'value y back guardado: ', value, currentBack );
      if( currentBack == 'inf' ) edAnimOff();
      if( currentBack == 'cuba' ) cubaAnimOff();
      if( currentBack == 'ny' ) newYorkAnimOff();
      if( currentBack == 'holly' ) hollyAnimOff();
      if( currentBack == 'carn' ) carnAnimOff();
      if( currentBack == 'bcn' ) bcnAnimOff();
      if( currentBack == 'berlin' ) berAnimOff();
      if( currentBack == 'chicago' ) chiAnimOff();
      if( currentBack == 'lasVegas' ) lasVAnimOff();
      if( value == 'prologo2Add' ) cubaAnim();
      if( value == 'RR1' ) newYorkAnim();
      if( value == 'CC3' ) carnAnim();
      if( value == 'CC3' || value == 'CC4' ) carnAnim();
      if( value == 'LA2' || value == 'LA3' ) chiAnim();
      if( value == 'AL2' || value == 'AL3' || value == 'CB1' || value == 'CB2' ) lasVAnim();

      if( currentVideoSlidePlaying != undefined ) stopVideoToolTip( currentVideoSlidePlaying.ID, currentVideoSlidePlaying.conto, currentVideoSlidePlaying.playB, currentVideoSlidePlaying.fullS );
      setStopScroll(false);
      stopNarracion();
      TweenMax.to(".mouseIcon", 0.2, {bottom: '-150px', ease: Power0.easeOut, autoRound:false});
      TweenMax.to(".coverTransitions", 0.1, { scale: 1, ease: Power4.easeOut, autoRound:false });
      TweenMax.to(".coverTransitions", 0.6, { opacity: 1, ease: Power4.easeOut, delay: 0.2, autoRound:false });
      if ($("div.overlay").hasClass("open")) $(".trigger-overlay").click();
      setTimeout(function(){
        stopVideo();
        updateTitle(notes);
        setTimeout(function(){
          if( value == 'inicio' || value == 'prologo2' || value == 'prologo2Add' || value == 'prologo3' || value == 'RR2' || value == 'CC3' || value == 'CB1' || value == 'CB2' || value == 'EP2' ) playSound(playListOrder[music]);
          else if( value == 'PLAYLIST' ) { soundEpilogo.fade(soundVolume,0,2000); };
        },1000)
        if(!player.paused()) player.pause();
        soundNarracion.pause();
        tl.play(value);
      },500);
      TweenMax.to(".coverTransitions", 3, {opacity: 0, ease: Power4.easeOut, delay: 3, autoRound:false});
      TweenMax.to(".coverTransitions", 0.1, {scale: 0, ease: Power4.easeOut, delay: 7, autoRound:false});
    };

    $scope.prevFoto = function(id,value){
      console.log('videoCardToogleSound', videoCardToogleSound);
      $('.slideimg'+id).removeClass("videoSlideResizeOut videoSlideResize");
      if(value==undefined) var desp = '-110%';
      else var desp = '-'+value;
      var firstPhoto = $('.slideimg'+id).first();
      TweenMax.to(firstPhoto, 0.05, {left: desp, repeatDelay:0.05, autoRound:false, repeat:1, yoyo:true, onRepeat:function(){$('#fotoGroup'+id).append(firstPhoto);}, ease: Power4.easeOut});
    };

    $scope.nextFoto = function(id, value){
      console.log('videoCardToogleSound', videoCardToogleSound);
      $('.slideimg'+id).removeClass("videoSlideResizeOut videoSlideResize");
      if(value==undefined) var desp = '110%';
      else var desp = value;
      var firstPhoto = $('.slideimg'+id).last();
      firstPhoto.attr('autoplay','autoplay');
      TweenMax.to(firstPhoto, 0.05, {left: desp, repeatDelay:0.05, autoRound:false, repeat:1, yoyo:true, onRepeat:function(){$('#fotoGroup'+id).prepend(firstPhoto);}, ease: Power4.easeOut});

    };

    $scope.openCloseAddInfo = function(val){
      var target = '.ad'+val;
      if($('.plusInfoO'+val).css('opacity')==1){
        TweenMax.set($('.plusInfoC'+val), {opacity: 1});
        TweenMax.set($('.plusInfoO'+val), {opacity: 0});
        TweenMax.to(target, 0.3, {opacity: 1, scale:1, autoRound:false, ease:Back.easeOut});
      }
      else{
        TweenMax.set($('.plusInfoC'+val), {opacity: 0});
        TweenMax.set($('.plusInfoO'+val), {opacity: 1});
        TweenMax.to(target, 0.3, {opacity: 0, scale:0, autoRound:false, ease:Back.easeOut});
      }
    };
    $scope.openLanguaje = function(){
      console.log(languajeOpen);
      if(!languajeOpen) { languajeOpen = true; TweenMax.staggerTo(".lang", 0.3, { opacity: 1, scale:1, autoRound:false, ease: Back.easeOut.config(0.8)}, 0.1); console.log('entra en false', languajeOpen ); }
      else { TweenMax.staggerTo(".lang", 0.3, { opacity: 0, scale:0, autoRound:false, ease: Back.easeOut.config(0.8)}, 0.1); languajeOpen = false; console.log('entra en true', languajeOpen ); }

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
      if (config.doc.link)
        window.open(config.doc.url, "_blank", "");
    }
    $scope.viewExtras = function(){
      try{
        soundEpilogo.stop();
      } catch (err){
        console.log(err)
      }
      $scope.upTo('PLAYLIST',10,20);
    }
    $scope.viewPostcards = function(){
      var path = window.location.pathname;
      window.open(path+"postcards/", "_self", "");
    }
    var isPlaylist = false;
    function setVideoPlaylist(){
      //demoModule.init();
      setStopScroll(true);
      if (!isPlaylist) {
        playlistPlayer.playlistUi();
        isPlaylist = true;
      }
    }

    //----------------------------------------------
    //------ vIDEO & AUDIO -------------------------

    $scope.playVideoSlide = function(id, container, playButton, fullScreenButton){
      currentVideoSlidePlaying = { ID: id, conto: container, playB: playButton, fullS: fullScreenButton };
      TweenMax.set($('#'+container), {left: ''});
      TweenMax.set($('#'+container), {right: ''});
      if( !player.paused() ) player.pause();
      if( $("#"+id).get(0).paused ) {
        videoCardToogleSound = 0;
        if(boolsound == soundVolume && soundEpilogo.volume() > 0 ) soundEpilogo.fade(soundVolume,0.01,2000);
        if(boolsound == soundVolume && soundNarracion.volume() > 0 ) soundNarracion.fade(soundVolume,0.01,2000);
        if( id=='slideVideoAB2' || id=='slideVideoCC2' ) {
          $('#'+container).addClass('tooltipVideoFixed');
        }
        $("#"+id).get(0).play();
        TweenMax.set($('#'+playButton), {opacity: 0});
        TweenMax.set($('#'+fullScreenButton), {opacity: 1});
      }
      else {
        if(boolsound == soundVolume && soundEpilogo.volume() > 0 ) soundEpilogo.fade(0.01,soundVolume,2000);
        videoCardToogleSound = 1;
        $("#"+id).get(0).pause();
        TweenMax.set($('#'+playButton), {opacity: 1});
        TweenMax.set($('#'+fullScreenButton), {opacity: 0});
        if( id=='slideVideoAB2' || id=='slideVideoCC2' ) {
          $('#'+container).removeClass('tooltipVideoFixed');
        }
      }
      $("#"+id).on("ended", function() {
        stopVideoToolTip(id,container, playButton, fullScreenButton);
        currentVideoSlidePlaying = undefined;
        videoCardToogleSound = 1;
      });
    };
    function stopVideoToolTip(id, container, playButton, fullScreenButton){
      if( currentVideoSlidePlaying != undefined ) $("#"+currentVideoSlidePlaying.ID).get(0).pause();
      $('#'+container).removeClass("videoSlideResizeOut videoSlideResize tooltipVideoFixed");
      if( !player.paused() ) player.pause();
      videoCardToogleSound = 1;
      if(boolsound == soundVolume && soundEpilogo.volume() > 0 ) soundEpilogo.fade(0.01, soundVolume,2000);
      if(boolsound == soundVolume && soundNarracion.volume() > 0 ) soundNarracion.fade(0.01, soundVolume,2000);
      TweenMax.set($('#'+playButton), {opacity: 1});
      TweenMax.set($('#'+fullScreenButton), {opacity: 0});
      currentVideoSlidePlaying = undefined;
    };
    $scope.fullScreenVideoSlide = function(id, style){
      console.log(id, style);
      TweenMax.set($('#'+id), {left: ''});
      $('#'+id).css("right",'');
      if($("#"+id).hasClass( style )) { $("#"+id).removeClass(style);  setTimeout(function(){ $(".contextualVideoSlide").css('z-index', '') },500); }
      else { $("#"+id).addClass(style); $(".contextualVideoSlide").css('z-index', '999'); }
    };

    $scope.resizeVideoCloud = function(){
      if($("#videoGeneral").hasClass( 'videoCloud' ) ) {
        if($("#videoGeneral").hasClass( 'videoCloudFull' )) { $("#videoGeneral").removeClass('videoCloudFull'); $('#videoContainer').css('z-index', ''); }
        else { $("#videoGeneral").addClass('videoCloudFull'); $('#videoContainer').css('z-index', '999')}
      }
      if($("#videoGeneral").hasClass( 'videoCloud2' ) ) {
        if($("#videoGeneral").hasClass( 'videoCloud2Full' )) { $("#videoGeneral").removeClass('videoCloud2Full'); $('#videoContainer').css('z-index', '') }
        else { $("#videoGeneral").addClass('videoCloud2Full'); $('#videoContainer').css('z-index', '999'); }
      }
    };

    function videoPlay(videoType, continueBeforeStop, id, class1, class2, changeAudio, videoResource){
      try{
       fullScreenVideoStatus = true;
       if(!player.paused()) player.pause();
       if(class1 == 'resumeVideoBox') TweenMax.set($('#videoContainer'), {zIndex: 999});
       else TweenMax.set($('#videoContainer'), {zIndex: ''});
       $('#videoGeneral').removeClass('videoClass fullScreenVideo resumeVideoBox videoCloud videoCloud2 videoCloudFull videoCloud2Full');
       if(class1 == 'videoCloud') { var scaleValue = 0.6; $('#burbleBig').addClass('burbleBig'); $('#burbleMed').addClass('burbleMed'); $('#burbleSmall').addClass('burbleSmall'); $(".resizeMeButton").css('display', 'block'); }
       else if(class1 == 'videoCloud2') { var scaleValue = 0.6; $('#burbleBig').addClass('burbleBig2'); $('#burbleMed').addClass('burbleMed2'); $('#burbleSmall').addClass('burbleSmall2'); $(".resizeMeButton").css('display', 'block'); }
       else { var scaleValue = 1; $(".resizeMeButton").css('display', 'none'); }
       if(boolsound == soundVolume && soundEpilogo.volume() > 0) soundEpilogo.fade(soundVolume,0,1000);
       else soundEpilogo.volume(0);
       if(boolsound == soundVolume && soundNarracion.volume() > 0) soundNarracion.fade(soundVolume,0,1000);
       else soundNarracion.volume(0);
       $('#videoGeneral').addClass(class1);
       $('#GeneralVideo').addClass("video-js vjs-default-skin " + class2);
       TweenMax.to($('#videoContainer'), 0.5, { opacity: 1, scale: scaleValue, ease: Power4.easeOut, autoRound:false });
       if( videoResource == 'tv3' ) player.src({ type: 'video/mp4', src: config.tv3.videos+id });
       else if( videoResource == 'tve' ) player.src({ type: 'video/mp4', src: config.tve.videos+id });
       else if( videoResource == 'local' ) player.src({ type: 'video/mp4', src: config.local.videos+id });
       if( currentVideoSlidePlaying == undefined ) player.play();
       player.on("ended", function(){
         console.log('video ended');
         if(continueBeforeStop == true && eardAdvice ){ tl.play(); }
         if(boolsound == soundVolume && !changeAudio){ soundEpilogo.fade(0,soundVolume,2000); }
         fullScreenVideoStatus = false;
       })
     } catch (err){
       console.log(err)
     }
    };

    function stopVideo(){
      $('#burbleBig').removeClass('burbleBig burbleBig2');
      $('#burbleMed').removeClass('burbleMed burbleMed2');
      $('#burbleSmall').removeClass('burbleSmall burbleSmall2');
      TweenMax.to($('#videoContainer'), 0.5, { opacity: 0, scale: 0, ease: Power4.easeOut, autoRound:false });
      if(soundEpilogo.volume() < soundVolume && boolsound == soundVolume) soundEpilogo.fade(0,soundVolume,2000);
      fullScreenVideoStatus = false;
      player.off("ended");
      player.pause();
      player.src({ type: '', src: '' });
    }
    //-------SOUND --------------
    function controlSound(){
      player.pause();
      playlistPlayer.pause();
      soundEpilogo.fade(soundVolume,0,2000);
      soundNarracion.fade(soundVolume,0,2000);
    }

    function playSound(url){
      console.log('sound enter');
      if(soundEpilogo.volume() > 0) soundEpilogo.fade(soundVolume,0,1000);
      setTimeout(function(){
        soundEpilogo.stop();
        soundEpilogo = new Howl({
          urls: ['audio/'+url+'.mp3'],
          autoplay: false,
          loop: true,
          volume: 0
        });
        soundEpilogo.play();
        if( boolsound == soundVolume && soundNarracion.volume() == 0 && player.paused() ){ soundEpilogo.fade(0,soundVolume,1000); }
      }, 500)
    }
    function playNarracion(url, continueBefore){
      console.log('narracion enter');
      var locContainer = $("#loc");
      soundEpilogo.volume(0.05);
      setTimeout(function(){
        soundNarracion.stop();
        progress = {};
        soundNarracion = new Howl({
          urls: ['audio/loc/'+url+'.mp3'],
          autoplay: false,
          loop: false,
          volume: 0,
          onload: function() {
            console.log(this._duration);
            locContainer.removeClass("inactive");
            locContainer.addClass("comment-anim");
            progress = new ProgressBar.Circle("#loc", {
             strokeWidth: 10,
             easing: 'linear',
             duration: this._duration*1000,
             color: '#f2f2f2',
             trailColor: '#eee',
             trailWidth: 1,
             svgStyle: null
            });
            progress.animate(1.0);
          },
          onend: function() {
            locContainer.addClass("inactive");
            locContainer.removeClass("comment-anim");
            try{
              progress.destroy();
              soundNarracion.unload();
            } catch (err){}
            soundNarracion.volume(0);
            if( player.paused() && videoCardToogleSound == 1 && boolsound == soundVolume && !continueBefore ) soundEpilogo.fade(0.05,soundVolume,1000);
          }
        });
        soundNarracion.play();
        if(boolsound == soundVolume && videoCardToogleSound == 1){ soundNarracion.fade( 0, soundVolume + 0.2, 1000 ); }
      }, 500)
    }
    function stopNarracion(){
      try{
        var locContainer = $("#loc");
        locContainer.addClass("inactive");
        locContainer.removeClass("comment-anim");
        try{
          progress.destroy();
          soundNarracion.unload();
        } catch (err){}
        if( player.paused() && videoCardToogleSound == 1 && boolsound == soundVolume ) soundEpilogo.fade(0.05,soundVolume,1000);
      } catch (Err){
          console.log(Err)
      }
    }
    function toggleSound(){
      boolsound = boolsound ? 0 : soundVolume;
      player.volume(3*boolsound);
      playlistPlayer.volume(3*boolsound);
      soundBttn.toggleClass('sound-mute');
      if(!fullScreenVideoStatus)soundEpilogo.volume(boolsound);
      soundNarracion.volume(boolsound);
    }

    //--------------------------------------------------------------------

    function insertWords(variable,num){
      var elementToInsert = '<div class="wordStyle">'+variable+'</div>';
      $('#cita'+num+'suma').append(elementToInsert);
      TweenMax.from(elementToInsert, 0.1, {opacity: 0, y:-40, transformOrigin:"0% 50% -50", ease: Power2.easeOut, autoRound:false});
    }
    function deleteWords(variable){
      $(variable).remove();
    }
    function initViaje(direction){
      console.log(direction);
      try{
        if(direction == 'reverse'){
          viaje1 = $('#viaje1Svg').drawsvg({
            duration: 8000,
            easing: 'linear',
            reverse: true,
            callback: function() {
            }
          });
          viaje1.drawsvg('animate');
        }
        else {
          viaje1 = $('#viaje1Svg').drawsvg({
            duration: 8000,
            easing: 'linear',
            reverse: false,
            callback: function() {
              //console.log('dibujo terminado');
            }
          });
          viaje1.drawsvg('animate');
        }
      } catch(err){
        console.log("initViaje: drawSvg not loaded")
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
    var controlMouse = false;
    function blockMouse(){ controlMouse = true; console.log("block"); }
    function unblockMouse(){ controlMouse = false; console.log("unblock"); }
    var counterTest = 0;

    $(window).bind('mousewheel DOMMouseScroll', function(event){
      if (canScroll() && !controlMouse){ // If overlay layers are opened
        blockMouse()
        event.preventDefault();
        if(soundNarracion.volume() > 0) stopNarracion();
        if( currentVideoSlidePlaying != undefined ) stopVideoToolTip( currentVideoSlidePlaying.ID, currentVideoSlidePlaying.conto, currentVideoSlidePlaying.playB, currentVideoSlidePlaying.fullS );
        TweenMax.to('.additional', 0.2, {opacity: 0, scale:0, ease:Back.easeOut, autoRound:false});
        if(event.type != 'mousedown'){
          if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            if( !isMobile && eardAdvice ) tl.reverse();
            console.log("Llevaríamos mobileBack: "+ (--counterTest) )
          }
          else {
            if( !isMobile && eardAdvice ) tl.play();
            console.log("Llevaríamos mobileBack: "+ (++counterTest) )
          }
        }
      }
    });
    //--------TOUCH CONTROLS------

    $scope.onSwipeLeft = function(ev) {
      //if( eardAdvice ) { alert('swipe left inside'); tl.play(); }
      //alert('swipe left inside');
      tl.play();
      $scope.mobileBack +=1;
      //if(page < 21) {
      //  var nextPage = page + 1;
      //  $("#page"+page).addClass('prevPage');
      //  $("#page"+nextPage).addClass('nextPage');
      //  //$("#page"+nextPage).css('display', 'block');
      //  //setTimeout(function(){ $("#page"+page).css('display', 'none'); $("#page"+nextPage).addClass('nextPage'); },500);
      //  prepareSlide(nextPage);
      //  page += 1;
      //}
    };

    $scope.onSwipeRight = function(ev) {
      //if( eardAdvice ) { alert('swipe right'); tl.reverse(); }
      //alert('swipe right');
      tl.reverse();
      $scope.mobileBack -=1;
      //if(page > 0) {
      //  var prevPage = page - 1;
      //  $("#page"+page).removeClass('nextPage');
      //  $("#page"+prevPage).removeClass('prevPage').addClass('nextPage');
      //  prepareSlide(prevPage);
      //  page -= 1;
      //}
    };

    //---------- KEYBOARD CONTROLS --------

    $(window).bind('keydown', function(event){
      if (canScroll()){ // If overlay layers are opened
        event.preventDefault();
        TweenMax.to('.additional', 0.2, {opacity: 0, scale:0, ease:Back.easeOut, autoRound:false});
        var keyCode = event.keyCode || event.which;
  			switch (keyCode) {
  				case 37:
            if( eardAdvice )tl.reverse();
  					break;
          case 38:
            if( eardAdvice )tl.reverse();
  					break;
  				case 39:
  					if( eardAdvice ) tl.play();
  					break;
          case 40:
  					if( eardAdvice ) tl.play();
  					break;
  			}
      }
    });

    $scope.startWebDoc = function(){
        $("#eardAdviceId").addClass('hideEardAdvise');
        setTimeout(function(){
          $("#eardAdviceId").css('display', 'none');
          tl.play()
        }, 1000);
        eardAdvice = true;
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
      shareBttn = $( '.fa-share-alt'),
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
          //$('.trigger-anecdota.anecButton').css("opacity", 0);
          container2.removeClass( 'overlay-open' );
          container2.hide()
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
        else {//if( overlayAnec.hasClass( 'close' )) {
          //soundEpilogo.volume(0.1);
          overlayAnec.addClass( 'open' );
          triggerAnec.addClass( 'open' );
          //$('.trigger-anecdota.anecButton').css("opacity", 0);
          container2.show()
          container2.addClass( 'overlay-open' );
        }
    }

    function toggleShare() {
      socialshare.toggle();
    }

    function checkDisclaimer(){
      if ( isMobile && ($(window).width() < 1024) && ($(window).height() < 1024) ) {
        location.href = "../mobile.html";
        // mainContainer.hide();
        // tl.stop();
        // controlSound();
        // disclaimerMobile.show();
      }
    }

    triggerBttn.on( 'click', function(){toggleOverlay()} );
    triggerAnec.on( 'click', function(){
                                var anecId = $(this).attr("data-anecdota");
                                toggleAnec(anecId)
                             });
    soundBttn.on( 'click', function(){ toggleSound()} );
    scrollBttn.on( 'click', function(){ if( eardAdvice ) tl.play()} );
    lastVideosBttn.on( 'click', function(){ if( eardAdvice ) tl.play()} );
    shareBttn.on( 'click', function(){ toggleShare()} );
    //closeBttn.on( 'click', function(){toggleOverlay()} );

    $(window).resize(function(){
      var videoCont = $(".video-holder div#video");
      var width = $( window ).width() - 300;
      var height = $( window ).height() - 75;
      //console.log("width: "+width+" - height: "+height)
      videoCont.height(height);
      videoCont.width(width);

    })
    $(window).resize()

    playlistPlayer.playlist([
      {
      name: 'El debut de Nina en el Un, dos, tres, presentada y apadrinada por Cugat.',
      sources: [{
        src: 'http://mvod.lvlt.rtve.es/resources/TE_NGVA/mp4/7/5/1411576524757.mp4',
        type: 'video/mp4'
      }],
      poster: 'images/king-of-rumba.jpg',
      thumbnail: [
        {
          srcset: 'images/thumb/1411576524757.jpg',
          type: 'image/jpeg',
          media: '(min-width: 350px;)'
        },
        {
          src: 'images/thumb/1411576524757.jpg'
        }
      ],
      duration: 141
      }, {
      name: 'Programa de entretenimiento en el que el público realiza preguntas variadas a Xavier Cugat (1972).',
      sources: [{
        src: 'http://mvod.lvlt.rtve.es/resources/TE_NGVA/mp4/1/7/1466589118771.mp4',
        type: 'video/mp4'
      }],
      poster: 'images/king-of-rumba.jpg',
      thumbnail: [
        {
          srcset: 'images/thumb/1466589118771.jpg',
          type: 'image/jpeg',
          media: '(min-width: 350px;)'
        },
        {
          src: 'images/thumb/1466589118771.jpg'
        }
      ],
      duration: 1814
      }, {
      name: 'Entrevista de Xavier Cugat con Mónica Randall para el programa “Rasgos”.',
      sources: [{
        src: 'http://mvod.lvlt.rtve.es/resources/TE_NGVA/mp4/9/4/1467728998149.mp4',
        type: 'video/mp4'
      }],
      poster: 'images/king-of-rumba.jpg',
      thumbnail: [
        {
          srcset: 'images/thumb/1467728998149.jpg',
          type: 'image/jpeg',
          media: '(min-width: 350px;)'
        },
        {
          src: 'images/thumb/1467728998149.jpg'
        }
      ],
      duration: 2443
      }, {
      name: 'Entrevista completa a Xavier Cugat en el programa “La luna” (1989)',
      sources: [{
        src: 'http://mvod.lvlt.rtve.es/resources/TE_NGVA/mp4/2/9/1466417568692.mp4',
        type: 'video/mp4'
      }],
      poster: 'images/king-of-rumba.jpg',
      thumbnail: [
        {
          srcset: 'images/thumb/1466417568692.jpg',
          type: 'image/jpeg',
          media: '(min-width: 350px;)'
        },
        {
          src: 'images/thumb/1466417568692.jpg'
        }
      ],
      duration: 3245
      }, {
      name: 'Xavier Cugat desvela detalles sobre su vida en "Verdad o mentira” de 1983',
      sources: [{
        src: 'http://mvod.lvlt.rtve.es/resources/TE_NGVA/mp4/8/2/1466417752028.mp4',
        type: 'video/mp4'
      }],
      poster: 'images/king-of-rumba.jpg',
      thumbnail: [
        {
          srcset: 'images/thumb/1466417752028.jpg',
          type: 'image/jpeg',
          media: '(min-width: 350px;)'
        },
        {
          src: 'images/thumb/1466417752028.jpg'
        }
      ],
      duration: 2489
      }, {
      name: 'Xavier Cugat pasea por la plaza D´Oli (Barcelona), el lugar donde nació',
      sources: [{
        src: config.tve.videos+'cugat.mp4',
        type: 'video/mp4'
      }],
      poster: 'images/king-of-rumba.jpg',
      thumbnail: [
        {
          srcset: 'images/thumb/cugat.jpg',
          type: 'image/jpeg',
          media: '(min-width: 350px;)'
        },
        {
          src: 'images/thumb/cugat.jpg'
        }
      ],
      duration: 320
      }, {
      name: 'Entrevista desde el hospital a Xavier Cugat',
      sources: [{
        src: config.tve.videos+'cugat2bata.mp4',
        type: 'video/mp4'
      }],
      poster: 'images/king-of-rumba.jpg',
      thumbnail: [
        {
          srcset: 'images/thumb/cugat2bata.jpg',
          type: 'image/jpeg',
          media: '(min-width: 350px;)'
        },
        {
          src: 'images/thumb/cugat2bata.jpg'
        }
      ],
      duration: 398
      }, {
      name: 'Entrevista a Xavier Cugat en el Hotel Ritz',
      sources: [{
        src: config.tve.videos+'cugatCuadros.mp4',
        type: 'video/mp4'
      }],
      poster: 'images/king-of-rumba.jpg',
      thumbnail: [
        {
          srcset: 'images/thumb/cugatCuadros.jpg',
          type: 'image/jpeg',
          media: '(min-width: 350px;)'
        },
        {
          src: 'images/thumb/cugatCuadros.jpg'
        }
      ],
      duration: 232
      }, {
      name: 'Xavier Cugat cumple 80 años',
      sources: [{
        src: config.tve.videos+'cugatNodo.mp4',
        type: 'video/mp4'
      }],
      poster: 'images/king-of-rumba.jpg',
      thumbnail: [
        {
          srcset: 'images/thumb/cugatNodo.jpg',
          type: 'image/jpeg',
          media: '(min-width: 350px;)'
        },
        {
          src: 'images/thumb/cugatNodo.jpg'
        }
      ],
      duration: 154
    }]);
      playlistPlayer.playlist.autoadvance(0);

  });
