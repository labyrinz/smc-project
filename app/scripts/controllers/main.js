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

      var camera, scene, renderer, car, directionalLight, velocity,
        width = window.innerWidth,
        height = window.innerHeight;
      var carMovOrient = 0;
      var mapStatus = true;
      var videoDisplay = true;
      var body = $('body');

      var mySplitText = $("#quote").splitText({'type':'words','animation':'glowOnHover','useLite':true});
      var wordsElement = $(".word-measure");

      var step = 0;

      //-----------------------
      //----SOUND TRACKS -----

        var soundEpilogo = new Howl({
          urls: ['audio/ValsViudaAlegre.mp3'],
          loop: false,
          volume: 0.0001,
          onend: function() {
            console.log('Finished!');
          }
        });

      //-----------------------
      //---------VIDEOS--------

        $(".videoClass").bind("ended", function() {
            quitVideo(4);
        });

        $("#skip").on("click", function(){
            quitVideo(1);
        });

        function quitVideo(time){
          if(videoDisplay){
              TweenMax.to(".BackVideo", time, {opacity: 0, ease: Power0.easeNone, onComplete: playMusic}, "miniVideo");
              TweenMax.to(".napFace", 8, {opacity: 0.5, ease: Power0.easeNone});
              TweenMax.to(".videoClass", 1.5, {volume: 0, ease: Power0.easeNone});
              TweenMax.staggerFrom(wordsElement, 2, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,1]}, ease: Back.easeOut.config(0.5)}, 0.5)
              videoDisplay = false;
            }
          }
      //-----------------------
      //-----TIMELINE ---------

        TweenMax.set(".scrollIcon, .hiddenCanvas, .dinamycText, .ageTitle, .napFace", {visibility:"visible"});

        var tl = new TimelineMax({repeat:0});

        tl
          .to(".back", 14, {left:'-660%', ease: Power0.easeNone}, "penta")
          .to(".napFace", 1.8, {left:'9%', ease: Power0.easeNone}, "penta")
          .staggerTo(wordsElement, 1, {opacity: 0, cycle:{scale:[0,5], y:[-50,200], x:[-50,200], transformOrigin:"0% 50% -50", delay:[0,0.5], ease: Power2.easeOut}}, 0.1, "penta")
          .staggerTo(".ageTitle", 1, {color:'#ffd85f', fontSize: '1.5em', opacity: 1, repeat:1,repeatDelay:0.2, yoyo:true, ease:Power2.easeOut}, 2, "penta");
        tl.pause();

      //---------------------------------
      //----------MOUSE CONTROLS --------

        $(window).bind('mousewheel DOMMouseScroll', function(event){
            event.preventDefault();
            if(event.type != 'mousedown'){
              if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                if(step>0){
                  if(!mapStatus && step < 0.1){openCloseMap();}
                  if(step>0.005)step -= 0.005;
                  else if(step<=0.005 ) step = 0;
                  TweenLite.to(tl, 0.5, {progress:step, ease:Power2.easeOut, onComplete: pauseAnim});
                }
              }
              else {
                if(step<1){
                  if(mapStatus) openCloseMap();
                  TweenLite.to(tl, 0.5, {progress:step, ease:Power2.easeOut, onComplete: pauseAnim});
                  step += 0.005;
                }
              }
            }
          });

      //------------------------------------
      //------SLIDE CONTROL ---------------

        $("#slider").on("input", function(){
          if(mapStatus) openCloseMap();
          velocity = Math.abs(this.value);
          tl.timeScale(velocity/2);
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

        directionalLight = new THREE.PointLight( 0xffffff, 1, 300 );
        directionalLight.position.set(0,5,60);
        directionalLight.name = 'luzDireccional';

        scene.add( directionalLight );

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
         directionalLight.position.x = 5;
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

      if(width<1500) var dimensions = {leftCenter:-50,scaleX:300, font: "16px"};
      else var dimensions = {leftCenter:-80,scaleX:400, font: "22px"};

      var projection = d3.geo.mercator()
        .center([dimensions.leftCenter, 30])
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

        $(document).on('click','#mapIcon',function(){
          openCloseMap();
        });

        function openCloseMap() {
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

        function playMusic(){
          $(".BackVideo").css("display","none");
          soundEpilogo.play();
          TweenMax.to(soundEpilogo, 20,{volume: 0.5, ease: Power0.easeNone})
          //animateText();
        }

        function pauseAnim(){
          tl.pause();
        }

        function animeButtons() {
          var items = $('.boxAnim');
          function over(){
            TweenMax.to(this, 0.2, {y:-5,opacity:1}, 0.1)
          }
          function out(){
            TweenMax.to(this, 0.2, {y:0,  opacity:1}, 0.1)
          }
          items.hover(over, out);
        }

      //-----------------------------------

  });
