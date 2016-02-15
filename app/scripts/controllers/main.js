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

      var camera, scene, renderer, car,
        width = window.innerWidth,
        height = window.innerHeight;

      var soundEpilogo = new Howl({
        urls: ['audio/ValsViudaAlegre.mp3'],
        loop: true,
        volume: 0.0001,
        onend: function() {
          console.log('Finished!');
        }
      })
      var body = $('body');
      var backColorArray = ['#635957','#F7B862','#6B4B30','#63431D','#C48332','#F7B862','#6B4B30'];

      var mySplitText = $("#quote").splitText({'type':'words','animation':'glowOnHover','useLite':true});
      var wordsElement = $(".word-measure");

      var step = 0;
      TweenMax.set(".videoClass, .scrollIcon, .hiddenCanvas, .dinamycText", {visibility:"visible"})
      var tl = new TimelineMax({repeat:0});

      tl
        //.to(".BackVideo", 1, {opacity: 0.6, scale: 0.1, transformOrigin:"0.5% 2%", ease: Back.easeIn, onComplete: playMusic}, "miniVideo")
        //.to(".videoClass", 1.5, {volume: 0.005, ease: Power2.easeOut},"-=0.7")
        //.to(soundEpilogo, 3,{volume: 0.05, ease: Power0.easeNone},"miniVideo")
        //.to(".footer", 0.5,{bottom: 0, ease: Back.easeOut}, "0.2+=miniVideo")
        //.to(".BackVideo", 3, {opacity:0, volume: 0, ease: Power2.easeOut})
        //.staggerTo(".boxAnim", 0.2, {opacity: 1, scale: 1, ease: Elastic.easeOut, onComplete: animeButtons}, 0.1, "-=3")
        //.to(".fase3", 3.06, {right:'0%', ease: Power0.easeNone})
        //.to(".fase2", 3.03, {right:'0%', ease: Power0.easeNone}, "-=3")
        //.to(".fase1", 3, {right:'0%', ease: Power0.easeNone}, "-=3")
        //.to(".napFace", 3, {right:'0%', ease: Power0.easeNone, onComplete: animateText}, "-=3")
        .to(".pentagramaCompleto", 14, {left:'-1490%', ease: Power0.easeNone}, "penta")
        .to(".back", 14, {left:'-1490%', ease: Power0.easeNone}, "penta");
        //.to(".pentagram2", 3, {left:'-9090px', ease: Power0.easeNone}, "penta")
      tl.pause();

    $(window).bind('mousewheel DOMMouseScroll mousedown', function(event){
        event.preventDefault();
        if(event.type != 'mousedown'){
          if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
            if(step>0){
              if(step>0.001)step -= 0.001;
              else if(step<=0.001 )step = 0;
              car.rotation.y += 0.0015;
              TweenLite.to(tl, 0.5, {progress:step, ease:Power2.easeOut, onComplete: pauseAnim});
            }
          }
          else {
            if(step<1){
              TweenLite.to(tl, 0.5, {progress:step, ease:Power2.easeOut, onComplete: pauseAnim});
              car.rotation.y -= 0.0015;
              step += 0.001;
            }
          }
        }
        else if(event.type == 'mousedown' && event.button == 1) {
          tl.play();
        }
      });

    $(".videoClass").bind("ended", function() {
      tl.play();
    });

    function animateText(){
      console.log('entra')
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

    function playMusic(){
      console.log(soundEpilogo);
      //soundEpilogo.play();
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
    /////----------WEBGL-----------------

      init();
      animate();

      function init() {

        scene = new THREE.Scene();

        renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true, alpha: true } );
        renderer.setSize( width, height );
        renderer.setViewport( 0,0,width, height );
        renderer.getMaxAnisotropy();

        var container = document.getElementById('car');
        container.appendChild(renderer.domElement);

        //camera = new THREE.PerspectiveCamera( 50, (width/height), 0.1, 1000 );
        //camera.position.set( 0, 0, 150 );
        camera = new THREE.PerspectiveCamera( 50, (width/height), 0.1, 1000 );
        camera.position.set( 0, 0, 10 );

        buildShape();

        var directionalLight = new THREE.SpotLight(0xeeeeee, 1.5);
        directionalLight.position.set(20,35,25);
        directionalLight.name = 'luzDireccional'

        scene.add( directionalLight );

        window.addEventListener( 'resize', onWindowResize, false );
      }
      function buildShape(){
        var loader = new THREE.OBJLoader(  );
        loader.load( 'images/models/cit.obj', function ( object ) {
          car = object;
          car.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
            }
          } );
          //object.rotation.x = 1.5;
          //object.rotation.y = 1.5;
          car.rotation.y = 1;
          //object.position.set(0,-35,0);
          car.position.set(-7,0.5,0);
          car.name="classicCar";
          scene.add( car );
        });
      }
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
      }
      function animate() {
        setTimeout( function() {
          requestAnimationFrame( animate );
        }, 1000/30 );
        render();
      }
      function render(){
        renderer.render(scene,camera);
     }
  });
