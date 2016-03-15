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

      var camera, scene, renderer, car, directionalLight, fixedLight, velocity,
        width = window.innerWidth,
        height = window.innerHeight;
      var carMovOrient = 0;
      var mapStatus = false;
      var videoDisplay = true;
      var body = $('body');
      var stepIncrement = 0.01;
      var totalWords = [];
      var mapaSVG, mapaSvgAnimado;

      var introLetters = $("#quote").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"introLetters"});
      var introWords = $(".introLetters");

      var cita1Letters = $("#cita1").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita1Letters"});
        totalWords[0] = $(".cita1Letters");
      var cita2Letters = $("#cita2").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita2Letters"});
        totalWords[1] = $(".cita2Letters");
      var cita3Letters = $("#cita3").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita3Letters"});
        totalWords[2] = $(".cita3Letters");
      var cita4Letters = $("#cita4").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita4Letters"});
        totalWords[3] = $(".cita4Letters");
      var cita5Letters = $("#cita5").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita5Letters"});
        totalWords[4] = $(".cita5Letters");
      var cita6Letters = $("#cita6").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita6Letters"});
        totalWords[5] = $(".cita6Letters");
      var cita7Letters = $("#cita7").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita7Letters"});
        totalWords[6] = $(".cita7Letters");
      var cita8Letters = $("#cita8").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita8Letters"});
        totalWords[7] = $(".cita8Letters");
      var cita9Letters = $("#cita9").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita9Letters"});
        totalWords[8] = $(".cita9Letters");
      var cita10Letters = $("#cita10").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita10Letters"});
        totalWords[9] = $(".cita10Letters");
      var cita11Letters = $("#cita11").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita11Letters"});
        totalWords[10] = $(".cita11Letters");
      var cita13Letters = $("#cita13").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita13Letters"});
        totalWords[11] = $(".cita13Letters");
      var cita14Letters = $("#cita14").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"cita14Letters"});
        totalWords[12] = $(".cita14Letters");

      var texto1Letters = $("#texto1").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"texto1Letters"});
      var texto1lines = $(".texto1Letters");
      var texto2Letters = $("#texto2").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"texto2Letters"});
      var texto2lines = $(".texto2Letters");
      var texto3Letters = $("#texto3").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"texto3Letters"});
      var texto3lines = $(".texto3Letters");

      var step = 0;
      //---------------------------
      //----SOUND TRACKS -----

        var soundEpilogo = new Howl({
          urls: ['audio/ValsViudaAlegre.mp3'],
          loop: false,
          volume: 0.5,
          onend: function() {
            console.log('Finished!');
          }
        });

      //-----------------------
      //------ DRAW SVG ------------
      var facePortada = $('#FirstFace').drawsvg({
        duration: 3000,
        easing: 'linear',
        callback: function() {
          console.log('dibujo terminado');
        }
      });
      var viaje1 = $('#viaje1Svg').drawsvg({
        duration: 8000,
        easing: 'linear',
        callback: function() {
          console.log('dibujo terminado');
        }
      });
      //----------------------------
      //---------VIDEOS--------

        $(".videoClass").bind("ended", function() {
            quitVideo();
        });

        $("#skip").on("click", function(){
            quitVideo();
        });

        function quitVideo(){
          if(videoDisplay){
              facePortada.drawsvg('animate');
              soundEpilogo.play();
              tl.play();
              videoDisplay = false;
            }
          }
      //-----------------------
      //-----TIMELINE ---------

        var arr1 = [0, 0, 60, 0, 35, 100, 0, 100];
        var arr2 = [90, 0, 90, 0, 90, 100, 90, 100];
        var arr3 = [56, 0, 90, 0, 90, 100, 43, 100];

        TweenMax.to('.openBook', 0.5, {right: '4%', repeatDelay:0.1, repeat:-1, yoyo:true, ease: Power2.easeOut});

        arr2.onUpdate = function() {
          TweenMax.set('.prel01',{webkitClipPath:'polygon('+arr1[0]+'%'+arr1[1]+'%,'+arr1[2]+'%'+arr1[3]+'%,'+arr1[4]+'%'+arr1[5]+'%,'+arr1[6]+'%'+arr1[7]+'%)'});
          TweenMax.set('.prelGroup',{webkitClipPath:'polygon('+arr3[0]+'%'+arr3[1]+'%,'+arr3[2]+'%'+arr3[3]+'%,'+arr3[4]+'%'+arr3[5]+'%,'+arr3[6]+'%'+arr3[7]+'%)'});
        };

        TweenMax.set(".scrollIcon, .hiddenCanvas, .dinamycText, .ageTitle, .napFace, .addon1, .prel01", {visibility:"visible"});

        var tl = new TimelineMax({repeat:0});

        tl
          //EPISODE 1
          //.staggerTo(introWords, 0.5, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.5], ease: Power2.easeOut}}, 0.1, "penta")
          //.staggerTo(".ageTitle", 1, {color:'#ffd85f', fontSize: '2em', opacity: 1, repeat:1,repeatDelay:2.5, yoyo:true, ease:Power2.easeOut}, 2.02, "penta")
          .to(".videoClass", 0.2, {scale:0, ease: Power0.easeNone})
          .to(".BackVideo", 0.2, {opacity: 0, onComplete: hideVideo, ease: Power0.easeNone},"-=0.1")
          .to(".videoClass", 0.5, {volume: 0, ease: Power0.easeNone})
          .to("#page0",0.4,{ right: '0%', ease: Power0.easeNone})
          .staggerFrom(introWords, 0.1, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2]}, ease: Back.easeOut.config(0.8)}, 0.1)
          .to(".instructions", 0.2, {opacity:1, repeat: 6,repeatDelay: 0.1, yoyo:true, ease: Power0.easeNone})
          //EPISODE 2
          .to("#page0",0.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page1",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.5")
          .staggerFrom(texto1lines, 0.1, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.2],  ease: Back.easeOut.config(0.8)}}, 0.1)
          .to(".age1", 2, {color:'#ffd85f', fontSize: '2em', opacity: 1, ease:Power0.easeNone}, "penta")
          //EPISODE 2
          .to("#page1",0.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page2",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.5")
          .staggerTo(".cita", 0.3, {scale: 1, ease: Back.easeOut},0.1)
          .staggerFrom(totalWords[0], 0.5, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.5],  ease: Power2.easeOut}}, 0.1)
          .staggerTo(".addon1", 0.3, {opacity: 0.6, scale: 1, ease: Back.easeOut}, 0.2)
          .to(arr1,1, arr2,"step3")
          .to(arr3,1, arr2,"step3")
          .staggerFrom(texto2lines, 0.1, {opacity: 0,scale:5, y:200, x:200, transformOrigin:"0% 50% -50", delay:0.01,  ease: Power2.easeOut}, 0.01)
          .to(".cita01", 0.5, {scale: 0, ease: Back.easeOut})
          .staggerTo(".addon1", 0.5, {opacity: 0, scale: 0, ease: Power2.easeOut}, 0.5)
          .staggerTo(".texto2", 0.3, {opacity: 0,  ease: Power2.easeOut})
          .staggerFrom(texto3lines, 1, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.5],  ease: Back.easeOut.config(1.7)}}, 0.1)
          .from(".mapSvgClassTop", 1, {scale: 0,onComplete:initViaje, ease: Back.easeOut },"-=6")
          .to(".mapSvgClassTop", 4, {width: '250%', top: '-50%', left: '-25%' , ease: Power2.easeIn},"-=3")
          .to(".mapSvgClassTop", 2, {width: '800%', top: '-370%', left: '-140%', ease: Power2.easeIn})
          .to(".gironaMap",2,{opacity: 0, ease: Power2.easeOut},"-=7")
          .staggerTo(totalWords[0], 0.5, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.5], ease: Power2.easeOut}}, 0.1, "-=1")
          .to("#page2",0.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page3",0.4,{ right: '0%', ease: Power0.easeNone},"-=0.5")
          .staggerTo(".addon2", 0.5, {opacity: 0.6, scale: 1, ease: Power2.easeOut}, 0.5)
          .to("#page3",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page4",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5")
          .to("#page4",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page5",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5")
          .to("#page5",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page6",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5")
          .to("#page6",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page7",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5")
          .to("#page7",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page8",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5")
          .to("#page8",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page9",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5")
          .to("#page9",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page10",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5")
          .to("#page10",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page11",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5")
          .to("#page11",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page12",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5")
          .to("#page12",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page13",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5")
          .to("#page13",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page14",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5")
          .to("#page14",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page15",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5")
          .to("#page15",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page16",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5")
          .to("#page16",3.4,{ right: '110%', ease: Power0.easeNone})
          .to("#page17",3.4,{ right: '0%', ease: Power0.easeNone},"-=3.5");

          //EPISODE 3

       tl.pause();

      //---------------------------------
      //----------MOUSE CONTROLS --------

        $(window).bind('mousewheel DOMMouseScroll', function(event){
            event.preventDefault();
            if(event.type != 'mousedown'){
              if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                if(step > 0){
                  velocity = 3;
                  carMovOrient = -1;
                  //if(!mapStatus && step < 0.1){openCloseMap();}
                  if(step > stepIncrement)step -= stepIncrement;
                  else if(step <= stepIncrement ) step = 0;
                  TweenLite.to(tl, 0.5, {progress:step, ease:Power2.easeOut, onComplete: pauseAnim});
                  //$("#bookPages").turn("previous");
                }
              }
              else {
                if(step < 1){
                  //if(mapStatus) openCloseMap();
                  velocity = 3;
                  carMovOrient = 1;
                  TweenLite.to(tl, 0.5, {progress:step, ease:Power2.easeOut, onComplete: pauseAnim});
                  step += stepIncrement;
                  //$("#bookPages").turn("next");
                }
              }
            }
          });

    //------------------------------------
    //---------D3 CONTROLLER -----------

      var width = window.innerWidth/1.5,
          height = window.innerHeight/2;
      var circulitos;

      if(width<1500) var dimensions = {leftCenter:-40,upCenter: 20,scaleX:300, font: "14px"};
      else var dimensions = {leftCenter:-80,scaleX:400, font: "22px"};

      var projection = d3.geo.mercator()
        .center([dimensions.leftCenter, dimensions.upCenter])
        .scale(dimensions.scaleX)
        .rotate([0,0]);

      var svg = d3.select("#mapContainer").append("svg")
        .attr("width", width)
        .attr("height", height);

      var path = d3.geo.path()
        .projection(projection);

      var g = svg.append("g");

      d3.json("images/models/world-110m2.json", function(error, topology) {
        d3.csv("images/models/cities.csv", function(error, data) {
        var elementy1 = g.selectAll("circle")
            .data(data)
            .enter()
          circulitos = elementy1.append("circle")
              .attr("cx", function(d) {
                return projection([d.lon, d.lat])[0];
              })
              .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];
              })
              .attr("r", 7)
              .attr("id", 'circulos')
              .style("opacity", "0.7")
              .style("fill", "rgba(255,255,255,0.2)")
              .style("stroke", "#ffd85f")
              .style("stroke-width", "2")
              .style("cursor", "pointer");
          elementy1.append('text')
              .text(function(d) {
                return d.name;
              })
              .attr('x', function(d) {
                return (projection([d.lon, d.lat])[0])+ (d.precisionX*1);
              })
              .attr('y', function(d) {
                return (projection([d.lon, d.lat])[1])+ (d.precisionY*1);
              })
              .attr('fill', '#ffd85f')
              .style("font-size", dimensions.font)
              .style("font-family", "'Alice',serif")
              .style("cursor", "pointer");
        });
        g.selectAll("path")
          .data(
          topojson
            .object(topology, topology.objects.countries)
            .geometries)
          .enter()
          .append("path")
          .attr("d", path)
          .attr('stroke', '#ffd85f')
          .attr('stroke-width', '0.5px')
          .attr('fill', '#56481e')
          .on('mouseover', function(d) {
            console.log(d);
          })
      });

      setInterval(function(){
          circulitos.attr("r",10);
          circulitos
            .transition()
            .duration(800)
            .attr("r",1);
        }, 1000);

      //--------------------------------------
      //-------FUNCTIONS --------------------

        $(document).on('click','#mapIcon, #arrowClose',function(){
          openCloseMap();
        });

        $(document).on('click','.plusInfoCita', function(){
          var numTexto = $(this).attr('value');
          if($(this).text()=='[+]'){
            $(this).text('[-]');
            _.each(totalWords[parseInt(numTexto)], function(val,i){
              setTimeout(function(){insertWords(val,numTexto)}, 40*i);
            });
          }
          else {
            $(this).text('[+]');
            _.each($('#cita'+numTexto+'suma').children(), function(val,i){
              setTimeout(function(){deleteWords(val)}, 5*i);
            });
          }
        });

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
          $(".BackVideo").css("display","none");
        }

        function pauseAnim(){
          velocity = 0;
          carMovOrient = 0;
          tl.pause();
        }

        function insertWords(variable,num){
          $('#cita'+num+'suma').append(variable);
          TweenMax.from(variable, 0.5, {opacity: 0, y:-40, transformOrigin:"0% 50% -50", ease: Power2.easeOut});
        }
        function deleteWords(variable){
            $(variable).remove();
        }
        function initViaje(){
          viaje1.drawsvg('animate');
        }
      //-----------------------------------

  });
