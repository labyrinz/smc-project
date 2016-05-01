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

      var introLetters = $("#quote h2").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"introLetters"});
      var introLettersSubtitle = $("#quote h3 span.subtitle").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"introLettersSubtitle"});
      var introLettersName = $("#quote h3 span.cugat-name").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"introLettersName"});

      var introWords = $(".introLetters");
      var introWordsSubtitle = $(".introLettersSubtitle");
      var introWordsName = $(".introLettersName");

      var cita12Letters = $("#cita12").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita12Letters"});
      totalWords[12] = $(".cita12Letters");
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
          console.log('dibujo terminado');
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
      //-----------------------
      //-----TIMELINE ---------

        TweenMax.set(".scrollIcon, .hiddenCanvas, .dinamycText, .ageTitle, .napFace, .addon1, .prel01", {visibility:"visible"});

        var tl = new TimelineMax({repeat:0});

        tl
          //EPISODE 1
          .addPause()
          .staggerFrom(introWords, 0.1, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
          .staggerFrom(introWordsSubtitle, 0.1, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
          .staggerFrom(introWordsName, 0.1, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
          .addPause()
          //EPISODE 2
          .to(".ed1", 0.5, {left: '0%', ease: Bounce.easeOut},"prologo")
          .to(".ed2", 0.5, {top: '0%', ease: Bounce.easeOut})
          .to(".ed3", 0.5, {left: '0%', ease: Bounce.easeOut},"-=1")
          .to(".ed4", 0.5, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)})
          .to(".pentagramRect",0.2,{ bottom: '1%', ease: Power0.easeNone},"-=0.2")
          .to(".pentagramBack",0.2,{ bottom: '0%', ease: Power0.easeNone},"-=0.2")
          .to(".pentagramNotesGroup",0.2,{ bottom: '2%', ease: Power0.easeNone},"-=0.2")
          .to(".ed1", 1, {css:{'-webkit-filter': 'blur(8px)'}, ease: Power0.easeOut},"blurEffect1+=1")
          .to(".ed2", 1, {css:{'-webkit-filter': 'blur(8px)'}, ease: Power0.easeOut},"blurEffect1+=1")
          .to(".ed3", 1, {css:{'-webkit-filter': 'blur(8px)'}, ease: Power0.easeOut},"blurEffect1+=1")
          .to(".ed4", 1, {css:{'-webkit-filter': 'blur(8px)'}, ease: Power0.easeOut},"blurEffect1+=1")
          .to("#page1",0.1,{ right: '0%', onComplete: hideVideo, ease: Power0.easeNone},"-=1")
          .to(".texto11", 0.5, {top: '9%', ease: Back.easeOut.config(1)})
          .to(".texto12", 0.5, {top: '30%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto13", 0.5, {top: '55%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cita11", 0.5, {bottom: '10%', ease: Back.easeOut.config(1)},"-=1")
          .to(".prelGroup", 0.5, {top: '10%', ease: Back.easeOut.config(1)},"-=1")
          .to("#page0",0.5,{ scale: '0', ease: Back.easeIn.config(1)})
          .addPause()
          //EPISODE 3
          .to(".ed2", 0.5, {left: '-5%', ease: Power2.easeIn},"scrollGer")
          .to(".ed3", 0.5, {left: '-10%', ease: Power2.easeIn},"scrollGer")
          .to(".ed4", 0.5, {left: '-15%', ease: Power2.easeIn},"scrollGer")
          .to("#page1",0.4,{ right: '100%', ease: Power0.easeNone},"-=0.5")
          .to("#page2",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .from(".mapSvgClassTop", 1, {scale: 0,onComplete:initViaje, ease: Back.easeOut })
          .to(".mapSvgClassTop", 4, {width: '250%', top: '-60%', left: '-25%' , ease: Power2.easeIn},"+=1")
          .to(".cub1", 0.5, {top: '0%', ease: Power0.easeNone})
          .to(".ed1", 0.5, {top: '120%', ease: Power2.easeIn})
          .to(".ed2", 0.5, {top: '120%', ease: Power2.easeIn})
          .to(".ed3", 0.5, {top: '120%', ease: Power2.easeIn},"-=1")
          .to(".ed4", 0.5, {top: '120%', ease: Power2.easeIn})
          .to(".mapSvgClassTop", 2, {width: '800%', top: '-385%', left: '-140%', ease: Power2.easeIn},"-=1.2")
          .addPause()
          //EPISODE 4
          .to("#page2",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page3",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".prel05",0.4,{ right: '75%', ease: Back.easeOut.config(1)})
          .to(".prelpant1",0.4,{ right: '33%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".prel06",0.4,{ right: '13%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto14",0.4,{ right: '50%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto15",0.4,{ right: '30%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto16",0.4,{ right: '10%', ease: Back.easeOut.config(1)},"-=0.2")
          .addPause()
          //EPISODE 5
          .to(".cub1", 0.5, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to("#page3",0.4,{ right: '100%', ease: Power0.easeNone},"-=0.4")
          .to("#page4",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".ny4", 0.2, {top: '0%', ease: Bounce.easeOut},"-=0.5")
          .to(".ny3", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny1", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny2", 0.5, {top: '0%', ease: Bounce.easeOut},"-=0.2")
          .to(".ny5", 0.5, {scale: '1', right: '0', ease: Bounce.easeOut},"-=0.2")
          .to(".ny6", 0.5, {scale: '1', right: '0', ease: Bounce.easeOut},"-=0.2")
          .to(".ny7", 0.5, {scale: '1', right: '0', ease: Bounce.easeOut},"-=0.2")
          .to(".texto17",0.4,{ right: '55%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto18",0.4,{ right: '10%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cita12",0.4,{ right: '20%', ease: Back.easeOut.config(1)},"-=0.2")
          .addPause()
          //EPISODE 6
          .to("#page4",0.4,{ right: '100%', ease: Power0.easeNone},"ritaMontaner")
          .to("#page5",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".rm12",0.4,{ right: '70%', ease: Back.easeOut.config(1)})
          .to(".texto21",0.4,{ right: '10%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cita13",0.4,{ right: '10%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".rm11",0.4,{ right: '58%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".rm13",0.4,{ right: '60%', ease: Back.easeOut.config(1)},"-=0.2")
          .addPause()
          //EPISODE 7
          .to("#page5",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page6",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".ny3", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ny1", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ny2", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ny4", 0.3, {transform: 'rotateY(165deg)', ease: Power2.easeIn})
          .to(".ny5", 0.5, {scale: '5', right: '150', ease: Bounce.easeOut},"-=0.2")
          .to(".ny6", 0.5, {scale: '5', right: '150', ease: Bounce.easeOut},"-=0.2")
          .to(".ny7", 0.5, {scale: '5', right: '150', ease: Bounce.easeOut},"-=0.2")
          .to(".ber1", 0.3, {transform: 'rotateY(0deg)', ease: Back.easeOut.config(1)})
          .to(".texto23",0.4,{ right: '60%', ease: Back.easeOut.config(1)})
          .to(".rm14",0.4,{ right: '60%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto24",0.4,{ right: '10%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cita14",0.4,{ right: '5%',ease: Back.easeOut.config(1)},"-=0.2")
          .addPause()
          //EPISODE 8
          .to("#page6",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page7",0.2,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".ber1", 0.3, {transform: 'rotateY(165deg)', ease: Back.easeOut.config(1)})
          .to(".holly1", 0.3, {transform: 'rotateX(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto25",0.4,{ right: '10%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".rm15",0.4,{ right: '80%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto26",0.4,{ right: '10%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".rm16",0.4,{ right: '70%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".rm17",0.4,{ right: '55%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".rm18",0.4,{ right: '70%', ease: Back.easeOut.config(1)},"-=0.2")
          .addPause()
          //EPISODE 9
          .to("#page7",0.4,{ right: '100%', ease: Power0.easeNone},"carmenCastillo")
          .to("#page8",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".holly1", 0.3, {transform: 'rotateX(165deg)', ease: Back.easeOut.config(1)})
          .to(".carn1", 0.3, {transform: 'rotateY(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto31",0.4,{ right: '30%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cc31",0.4,{ right: '60%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cc32",0.4,{ right: '70%', ease: Back.easeOut.config(1)},"-=0.2")
          .addPause()
          //EPISODE 10
          .to("#page8",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page9",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".texto33",0.4,{ right: '10%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cc33",0.4,{ top: '22%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto34",0.4,{ right: '10%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cc34",0.4,{ top: '18%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cc35",0.4,{ top: '19%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cc36",0.4,{ top: '23%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cc37",0.4,{ top: '27%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cc38",0.4,{ top: '20%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cc39",0.4,{ top: '40%', ease: Back.easeOut.config(1)},"-=0.2")
          .addPause()
          //EPISODE 11
          .to("#page9",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page10",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .addPause()
          //EPISODE 12
          .to("#page10",0.4,{ right: '100%', ease: Power0.easeNone},"lorraineAllen")
          .to(".carn1", 0.3, {transform: 'rotateY(165deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".chi1", 0.3, {transform: 'rotateY(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to("#page11",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".lorraine",0.4,{ right: '35%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto41",0.4,{ right: '75%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".la3",0.4,{ right: '55%', ease: Back.easeOut.config(1)},"-=0.2")
          .addPause()
          //EPISODE 13
          .to("#page11",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page12",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".cita42",0.4,{ right: '10%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto42",0.4,{ right: '50%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".la4",0.4,{ right: '15%', ease: Back.easeOut.config(1)},"-=0.2")
          .addPause()
          //EPISODE 14
          .to("#page12",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page13",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".texto43",0.4,{ right: '20%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".la6",0.4,{ bottom: '45%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".la7",0.4,{ top: '25%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".la8",0.4,{ bottom: '55%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto44",0.4,{ right: '20%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".la9",0.4,{ bottom: '60%', ease: Back.easeOut.config(1)},"-=0.2")
          .addPause()
          //EPISODE 15
          .to("#page13",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page14",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".chi1", 0.3, {transform: 'rotateY(165deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".lasv1", 0.3, {transform: 'rotateY(0deg)', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto52",0.4,{ right: '10%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cita53",0.4,{ right: '40%', ease: Back.easeOut.config(1)},"-=0.2")
          .addPause()
          .to(".texto52",0.4,{ top: '-100%', ease: Back.easeOut.config(1)},"abbeLane")
          .to(".cita53",0.4,{ bottom: '150%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cita52",0.4,{ top: '5%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cita51",0.4,{ top: '25%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".al1",0.4,{ top: '25%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".texto51",0.4,{ bottom: '15%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".teLoDijoAdela",0.4,{ top: '45%', ease: Back.easeOut.config(1)},"-=0.2")
          .addPause()
          //EPISODE 16
          .to("#page14",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page15",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .to(".texto53",0.4,{ left: '25%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".al4",0.4,{ right: '20%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".al5",0.4,{ top: '12%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".cita56",0.4,{ right: '40%', ease: Back.easeOut.config(1)},"-=0.2")
          .to(".al7",0.4,{ top: '10%', ease: Back.easeOut.config(1)},"-=0.2")
          .addPause()
          //EPISODE 17
          .to("#page15",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page16",0.4,{ right: '0%', ease: Power0.easeNone})
          .addPause()
          .to("#cb01",0.7,{ left: '10%',scale: '0.01', ease: Back.easeOut}, "charoBaeza")
          .to("#cb04",0.7,{ left: '45%',scale: '1', ease: Back.easeOut},"charoBaeza+=2")
          .to("#texto61",0.7,{ left: '5%',scale: '0.01', ease: Back.easeOut},"charoBaeza+=2")
          .to("#texto63",0.7,{ left: '25%',scale: '1', ease: Back.easeOut},"charoBaeza+=2")
          .addPause()
          //EPISODE 18
          .to("#page16",0.4,{ right: '100%', ease: Power0.easeNone},"epilogo")
          .to("#page17",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .addPause()
          //EPISODE 19
          .to("#page17",0.4,{ right: '100%', ease: Power0.easeNone})
          .to("#page18",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.4")
          .addPause();

       tl.play();
       setTimeout(playTimeLine, 7000);
       /* setTimeout(drawFace, 5000);*/

      //---------------------------------
      //----------MOUSE CONTROLS --------

        $(window).bind('mousewheel DOMMouseScroll', function(event){
            event.preventDefault();
            TweenMax.to('.additional', 0.2, {opacity: 0, scale:0, ease:Back.easeOut});
            if(event.type != 'mousedown'){
              if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                tl.reverse();
              }
              else {
                tl.play();
              }
            }
          });

    //------------------------------------
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
          console.log(value);
          $('#introVideo').attr('src', '');
          $('#introVideo').attr('src', 'https://www.youtube.com/embed/wpWO4L0qPPw?showinfo=0');
          tl.play(value);
        };
        $(document).on('click','#mapIcon, #arrowClose',function(){
          openCloseMap();
        });

        $(document).on('click','#arrowNext',function(){
          nextFoto();
        });

        $(document).on('click','#arrowPrev',function(){
          prevFoto();
        });

        $(document).on('click','.plusInfo',function(){
          console.log($(this).css('opacity'));
          var value = $(this).attr('value');
          if($(this).css('opacity') == 1)$(this).css('opacity', '0');
          else $(this).css('opacity', '1');
          var target = '.ad'+value;
          var opacityValue = $(target).css('opacity');
          if(opacityValue == 0) TweenMax.to(target, 0.3, {opacity: 1, scale:1, ease:Back.easeOut});
          else  TweenMax.to(target, 0.3, {opacity: 0, scale:0, ease:Back.easeOut});
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
        function playTimeLine(){
          tl.play();
        }
        function insertWords(variable,num){
          $('#cita'+num+'suma').append(variable);
          TweenMax.from(variable, 0.1, {opacity: 0, y:-40, transformOrigin:"0% 50% -50", ease: Power2.easeOut});
        }
        function deleteWords(variable){
          $(variable).remove();
        }

        function drawFace(){
          facePortada.drawsvg('animate');
          TweenMax.to(".instructions", 0.2, {opacity:1, repeat: 6,repeatDelay: 0.1, yoyo:true, ease: Power0.easeNone});
        }
        function nextFoto(){
          var firstPhoto = $('.slideimg').last();
          TweenMax.to(firstPhoto, 0.1, {left: '130%', repeatDelay:0, repeat:1, yoyo:true, onRepeat:$('#fotoGroup').prepend(firstPhoto), ease: Power2.easeOut});
        }

        function prevFoto(){
          var firstPhoto = $('.slideimg').first();
          TweenMax.to(firstPhoto, 0.1, {left: '-130%', repeatDelay:0, repeat:1, yoyo:true, onRepeat:$('#fotoGroup').append(firstPhoto), ease: Power2.easeOut});
        }

        function openCloseMap(val) {
          if(val==undefined){
            if(!mapStatus){
              $("#mapIcon").addClass('mapIconMini');
              $(".mapItem").addClass('mapItemMini');
              $("#mapContainer").addClass('mapaD');
              mapStatus = true;
            }
            else {
              $("#mapIcon").removeClass('mapIconMini');
              $(".mapItem").removeClass('mapItemMini');
              $("#mapContainer").removeClass('mapaD');
              mapStatus = false;
            }
          }
          else if(val){
            $("#mapIcon").addClass('mapIconMini');
            $(".mapItem").addClass('mapItemMini');
            $("#mapContainer").addClass('mapaD');
            mapStatus = true;
          }
          else if (!val){
            $("#mapIcon").removeClass('mapIconMini');
            $(".mapItem").removeClass('mapItemMini');
            $("#mapContainer").removeClass('mapaD');
            mapStatus = false;
          }
        }
        function hideVideo(){
          $('#introVideo').attr('src', '');
          $('#introVideo').attr('src', 'https://www.youtube.com/embed/wpWO4L0qPPw?autoplay=1&controls=0&loop=1&showinfo=0');
        }

        function initViaje(){
          viaje1.drawsvg('animate');
        }
      //-----------------------------------

      // MENU

      var container = $( 'div.container' ),
          triggerBttn = $( '#trigger-overlay' ),
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

        triggerBttn.on( 'click', function(){toggleOverlay()} );
        closeBttn.on( 'click', function(){toggleOverlay()} );
  });
