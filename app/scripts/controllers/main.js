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
          TweenMax.to(".BackVideo", 4, {opacity: 0, ease: Back.easeIn, onComplete: playMusic}, "miniVideo")
          TweenMax.to(".videoClass", 1.5, {volume: 0, ease: Power2.easeOut})
        });

      //-----------------------
      //-----TIMELINE ---------

        TweenMax.set(".scrollIcon, .hiddenCanvas, .dinamycText", {visibility:"visible"})

        var tl = new TimelineMax({repeat:0});

        tl.to(".back", 14, {left:'-690%', ease: Power0.easeNone}, "penta");
        tl.pause();

      //---------------------------------
      //----------MOUSE CONTROLS --------

        $(window).bind('mousewheel DOMMouseScroll', function(event){
            event.preventDefault();
            if(event.type != 'mousedown'){
              if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                if(step>0){
                  if(step>0.005)step -= 0.005;
                  else if(step<=0.005 )step = 0;
                  TweenLite.to(tl, 0.5, {progress:step, ease:Power2.easeOut, onComplete: pauseAnim});
                }
              }
              else {
                if(step<1){
                  TweenLite.to(tl, 0.5, {progress:step, ease:Power2.easeOut, onComplete: pauseAnim});
                  step += 0.005;
                  //$("input[type=range]").val((step/2.5)*26.5);
                }
              }
            }
          });

      //------------------------------------
      //------SLIDE CONTROL ---------------

        $("#slider").on("input", function(){

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

      //--------------------------------------
      //------TEXTS --------------------------

      function animateText(){
          $(".dinamycText").css("opacity", "1");
          _.each(wordsElement, function(element){
            TweenMax.from(element, 3, {
                opacity:0,
                scale:Math.floor((Math.random() * 5) + 0),
                y: Math.floor((Math.random() * 200) + 0),
                x: Math.floor((Math.random() * 200) + 0),
                transformOrigin:"0% 50% -50",
                delay: Math.floor((Math.random() * 3) + 0),
                ease: Power2.easeOut},
              Math.random());
          })
        }

      //-------------------------------------
      //-------FUNCTIONS --------------------

        function playMusic(){
            $(".BackVideo").css("display","none");
            soundEpilogo.play();
            TweenMax.to(soundEpilogo, 20,{volume: 0.5, ease: Power0.easeNone})
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
            console.log(child);
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
          car.scale.set(0.8,1,0.7);
          car.position.set(-35,-61,0);
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
  });
