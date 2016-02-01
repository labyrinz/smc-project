"use strict";angular.module("smcApp",["ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("smcApp").controller("MainCtrl",["$scope",function(a){function b(){j.pause()}function c(){i.play();var a=($("#quote").splitText({type:"words",animation:"glowOnHover",useLite:!0}),$(".word-measure"));j.staggerTo(".boxAnim",1,{opacity:1,scale:1,ease:Elastic.easeOut},.3),j.to(".dinamycText",.2,{opacity:1,ease:Power2.easeOut},.3),j.to(".napFace",2,{opacity:1,repeat:10,onRepeat:e,repeatDelay:2,ease:RoughEase.ease.config({template:Power0.easeNone,strength:1.5,points:20,taper:"none",randomize:!0,clamp:!1})},"-=0.5"),_.each(a,function(a){TweenMax.from(a,3,{opacity:0,scale:Math.floor(5*Math.random()+0),y:Math.floor(200*Math.random()+0),x:Math.floor(200*Math.random()+0),transformOrigin:"0% 50% -50",delay:Math.floor(3*Math.random()+0),ease:Power2.easeOut},Math.random())})}function d(a){TweenMax.to(".napFace",.5,{rotation:a,ease:Elastic.easeOut})}function e(){}function f(){$(".videoClass").css("display","none")}function g(){TweenMax.to(this,.2,{y:-10,opacity:1},.1),d(40)}function h(){TweenMax.to(this,.2,{y:0,opacity:1},.1),d(0)}var i=new Howl({urls:["audio/ValsViudaAlegre.mp3"],loop:!1,volume:.3,onend:function(){console.log("Finished!")}});TweenMax.from(".videoClass",15,{opacity:0,volume:0,ease:Power2.easeOut});var j=new TimelineMax;$(".videoClass").bind("ended",function(){console.log("video finalizado"),TweenMax.to(".videoClass",5,{opacity:0,volume:0,ease:Power2.easeOut,onComplete:f}),setTimeout(c,7e3)}),TweenMax.set(".napFace, .boxAnim, .word-measure .videoClass",{visibility:"visible"}),$(window).bind("mousewheel DOMMouseScroll mousedown",function(a){a.preventDefault(),"mousedown"!=a.type?a.originalEvent.wheelDelta>0||a.originalEvent.detail<0?(j.play(),i.volume(i._volume-.005),setTimeout(b,300)):(j.reverse(),i.volume(i._volume+.005),setTimeout(b,300)):"mousedown"==a.type&&1==a.button&&(j.paused()?j.play():j.pause())});var k=$(".boxAnim");k.hover(g,h)}]),angular.module("smcApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);