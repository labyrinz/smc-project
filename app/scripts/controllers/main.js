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
      var mapStatus = true;
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

      var texto1Letters = $("#texto1").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"texto1Letters"});
      var texto1lines = $(".texto1Letters");
      var texto2Letters = $("#texto2").splitText({'type':'words','animation':'glowOnHover','useLite':true,'addClass':"texto2Letters"});
      var texto2lines = $(".texto2Letters");

      var step = 0;
      //---------------------------
      //------ DRAW SVG ------------
      var facePortada = $('#FirstFace').drawsvg({
        duration: 8000,
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
      //---- PAGE TRANSITIONS ------

      $("#bookPages").turn({
        duration: 1000,
        display: 'double',
        //width: (width*4)/5,
        //height: (height*4)/5,
        width: width,
        height: height,
        autoCenter: true,
        elevation: 100
      });
      $("#bookPages").bind("turning", function(event, page, view) {
        console.log(page);
        if(page==2) facePortada.drawsvg('animate');
        //if(page==4) mapaSvgAnimado.drawsvg('animate');
        if(page==1) openCloseMap(true);
        else openCloseMap(false);
      });

      //---------------------
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
      //---------VIDEOS--------

        $(".videoClass").bind("ended", function() {
            //soundEpilogo.play();
            quitVideo(4);
        });

        $("#skip").on("click", function(){
            quitVideo(1);
        });

        function quitVideo(time){
          if(videoDisplay){
              soundEpilogo.play();
              TweenMax.to(".videoClass", time, {scale:0, onComplete: hideVideo, ease: Power0.easeNone});
              TweenMax.to(".BackVideo", time, {opacity: 0, ease: Power0.easeNone});
              TweenMax.to(".napFace", 8, {opacity: 0.5, ease: Power0.easeNone});
              TweenMax.to(".videoClass", 1.5, {volume: 0, ease: Power0.easeNone});
              TweenMax.staggerFrom(introWords, 2, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,1]}, ease: Back.easeOut.config(0.8)}, 0.5)
              videoDisplay = false;
            }
          }

        setInterval(function(){
            var vid = document.getElementById("video2");
            vid.play();
          }, 500);

      //-----------------------
      //-----TIMELINE ---------

        var arr1 = [0, 0, 60, 0, 35, 100, 0, 100];
        var arr2 = [90, 0, 90, 0, 90, 100, 90, 100];
        var arr3 = [56, 0, 90, 0, 90, 100, 43, 100];

        TweenMax.to('.openBook', 0.5, {right: '4%', repeatDelay:0.1, repeat:-1, yoyo:true, ease: Power2.easeOut});

        arr2.onUpdate = function() {
          TweenMax.set('.prel01', {webkitClipPath:'polygon('+arr1[0]+'%'+arr1[1]+'%,'+arr1[2]+'%'+arr1[3]+'%,'+arr1[4]+'%'+arr1[5]+'%,'+arr1[6]+'%'+arr1[7]+'%)'});
          TweenMax.set('.prelGroup', {webkitClipPath:'polygon('+arr3[0]+'%'+arr3[1]+'%,'+arr3[2]+'%'+arr3[3]+'%,'+arr3[4]+'%'+arr3[5]+'%,'+arr3[6]+'%'+arr3[7]+'%)'});
        };

        TweenMax.set(".scrollIcon, .hiddenCanvas, .dinamycText, .ageTitle, .napFace, .addon1, .prel01", {visibility:"visible"});

        var tl = new TimelineMax({repeat:0});

        tl
          //EPISODE 1
          //.staggerTo(introWords, 0.5, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.5], ease: Power2.easeOut}}, 0.1, "penta")
          //.staggerTo(".ageTitle", 1, {color:'#ffd85f', fontSize: '2em', opacity: 1, repeat:1,repeatDelay:2.5, yoyo:true, ease:Power2.easeOut}, 2.02, "penta")
          .staggerFrom(texto1lines, 0.5, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.5],  ease: Power2.easeOut}}, 0.1)
          .to(".age1", 2, {color:'#ffd85f', fontSize: '2em', opacity: 1, onComplete: turnPage, onReverseComplete: turnPage, onCompleteParams:[4], onReverseCompleteParams:[2], ease:Power0.easeNone}, "penta")
          //EPISODE 2
          .staggerFrom(totalWords[0], 0.5, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.5],  ease: Power2.easeOut}}, 0.1)
          .staggerTo(".addon1", 0.5, {opacity: 0.6, scale: 1, ease: Back.easeOut}, 0.5)
          .to(arr1,7, arr2,"step3")
          .to(arr3,7, arr2,"step3")
          .staggerFrom(texto2lines, 0.5, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.5],  ease: Power2.easeOut}}, 0.1)
          .to(".mapSvgClassTop", 4, {width: '250%', top: '-20%', left: '-25%',onComplete:initViaje , ease: Power2.easeIn},"+=2")
          .to(".mapSvgClassTop", 4, {width: '800%', top: '-150%', left: '-150%', ease: Power2.easeIn},"+=2")
          .staggerTo(".addon1", 0.5, {opacity: 0, scale: 0, ease: Power2.easeOut}, 0.5)
          .staggerTo(totalWords[0], 0.5, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.5], ease: Power2.easeOut}}, 0.1, "-=1")
          .staggerTo(texto2lines, 0.5, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.5],  ease: Power2.easeOut}}, 0.1)
          .to(".cita", 2, {opacity: 0, onComplete: turnPage, onReverseComplete: turnPage, onCompleteParams:[6], onReverseCompleteParams:[4], ease: Power2.easeOut})
          .to(".cita", 5, {opacity: 1, ease: Power2.easeOut})
          .to(".cita", 5, {opacity: 0, ease: Power2.easeOut});
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
      //------SLIDE CONTROL ---------------

        $("#slider").on("input", function(){
          if(mapStatus) openCloseMap();
          velocity = Math.abs(this.value);
          tl.timeScale(velocity*2);
          car.position.x = -35 + (this.value*3);
          if(this.value>=0){ tl.play(); carMovOrient = 1; }
          else { tl.reverse(); carMovOrient = -1; }
        });

        $("#slider").on("mouseup", function(){
            this.value = 0;
            carMovOrient = 0;
            car.position.x = -35;
            tl.timeScale(0);
            tl.pause();
          });

      //-------------------------------------
      //----------WEBGL--------------------

      init();
      animate();

      function init() {

        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true, alpha: true } );
        renderer.setSize( width, height*0.1 );
        renderer.setViewport( 0,0,width, height );
        renderer.getMaxAnisotropy();

        var container = document.getElementById('car');
        container.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera( 50, (width/height), 0.1, 1000 );
        camera.position.set( 0, 0, 150 );

        buildShape();

        directionalLight = new THREE.PointLight( 0xffff99, 1, 300 );
        directionalLight.position.set(0,5,60);
        directionalLight.name = 'luzDireccional';

        fixedLight = new THREE.PointLight( 0xffffff, 1, 150 );
        fixedLight.position.set(0,5,60);
        fixedLight.name = 'luzFija';

        scene.add( directionalLight );
        scene.add( fixedLight );

        window.addEventListener( 'resize', onWindowResize, false );
      }
      function buildShape(){
        var loader = new THREE.OBJLoader(  );
        loader.load( 'images/models/corvega.obj', function ( object ) {
          car = object;
          car.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              if(child.name == "CorvegaConvBody") {
                child.material.ambient.setHex(0xFFFFFF);
                child.material.color.setHex(0xFFFFFF);
              }
              if(child.name == "CorvegaConvGlass") {
                child.material.ambient.setHex(0xFFFFFF);
                child.material.color.setHex(0x5555CC);
              }
              if(child.name == "CorvegaConvSeat") {
                child.material.ambient.setHex(0xFFFFFF);
                child.material.color.setHex(0xCC3333);
              }
            }
          } );
          car.rotation.x = 1.35;
          car.rotation.y = 1.57;
          car.scale.set(0.6,0.6,0.5);
          car.position.set(-35,-60,0);
          car.name="classicCar";
          scene.add( car );
        });
      }
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight*0.1 );
      }
     function animate() {

       if(carMovOrient > 0){
         if(directionalLight.position.x < -300) directionalLight.position.x = 300;
         else directionalLight.position.x = directionalLight.position.x - velocity*10;
       }
       else if(carMovOrient < 0) {
         if(directionalLight.position.x > 300) directionalLight.position.x = -300;
         else directionalLight.position.x = directionalLight.position.x + velocity*10;
       }
       else if(carMovOrient == 0) {
         //directionalLight.position.x = 5;
       }

       setTimeout( function() {
         requestAnimationFrame( animate );
       }, 1000/30 );
       render();
     }
     function render(){
        renderer.render(scene,camera);
     }

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
        function turnPage(page){
          $("#bookPages").turn("page", page);
        }
        function initViaje(){
          viaje1.drawsvg('animate');
        }
      //-----------------------------------

  });
