"use strict";angular.module("smcApp",["ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("smcApp").controller("MainCtrl",["$scope",function(a){function b(a){z&&(I.play(),TweenMax.to(".videoClass",a,{scale:0,onComplete:i,ease:Power0.easeNone}),TweenMax.to(".BackVideo",a,{opacity:0,ease:Power0.easeNone}),TweenMax.to(".napFace",8,{opacity:.5,ease:Power0.easeNone}),TweenMax.to(".videoClass",1.5,{volume:0,ease:Power0.easeNone}),TweenMax.staggerFrom(C,2,{opacity:0,cycle:{scale:[0,5],y:[-50,200],x:[-50,200],transformOrigin:"0% 50% -50",delay:[0,1]},ease:Back.easeOut.config(.8)},.5),z=!1)}function c(){p=new THREE.Scene,q=new THREE.WebGLRenderer({antialias:!0,preserveDrawingBuffer:!0,alpha:!0}),q.setSize(v,.1*w),q.setViewport(0,0,v,w),q.getMaxAnisotropy();var a=document.getElementById("car");a.appendChild(q.domElement),o=new THREE.PerspectiveCamera(50,v/w,.1,1e3),o.position.set(0,0,150),d(),s=new THREE.PointLight(16777113,1,300),s.position.set(0,5,60),s.name="luzDireccional",t=new THREE.PointLight(16777215,1,150),t.position.set(0,5,60),t.name="luzFija",p.add(s),p.add(t),window.addEventListener("resize",e,!1)}function d(){var a=new THREE.OBJLoader;a.load("images/models/corvega.obj",function(a){r=a,r.traverse(function(a){a instanceof THREE.Mesh&&("CorvegaConvBody"==a.name&&(a.material.ambient.setHex(16777215),a.material.color.setHex(16777215)),"CorvegaConvGlass"==a.name&&(a.material.ambient.setHex(16777215),a.material.color.setHex(5592524)),"CorvegaConvSeat"==a.name&&(a.material.ambient.setHex(16777215),a.material.color.setHex(13382451)))}),r.rotation.x=1.35,r.rotation.y=1.57,r.scale.set(.6,.6,.5),r.position.set(-35,-60,0),r.name="classicCar",p.add(r)})}function e(){o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),q.setSize(window.innerWidth,.1*window.innerHeight)}function f(){x>0?s.position.x<-300?s.position.x=300:s.position.x=s.position.x-10*u:0>x&&(s.position.x>300?s.position.x=-300:s.position.x=s.position.x+10*u),setTimeout(function(){requestAnimationFrame(f)},1e3/30),g()}function g(){q.render(p,o)}function h(a){void 0==a?y?($("#mapIcon").removeClass("mapIconMini"),$(".mapItem").removeClass("mapItemMini"),$("#mapContainer").removeClass("mapaD"),y=!1):($("#mapIcon").addClass("mapIconMini"),$(".mapItem").addClass("mapItemMini"),$("#mapContainer").addClass("mapaD"),y=!0):a?($("#mapIcon").addClass("mapIconMini"),$(".mapItem").addClass("mapItemMini"),$("#mapContainer").addClass("mapaD"),y=!0):a||($("#mapIcon").removeClass("mapIconMini"),$(".mapItem").removeClass("mapItemMini"),$("#mapContainer").removeClass("mapaD"),y=!1)}function i(){$(".BackVideo").css("display","none")}function j(){u=0,x=0,M.pause()}function k(a,b){$("#cita"+b+"suma").append(a),TweenMax.from(a,.5,{opacity:0,y:-40,transformOrigin:"0% 50% -50",ease:Power2.easeOut})}function l(a){$(a).remove()}function m(a){$("#bookPages").turn("page",a)}function n(){H.drawsvg("animate")}var o,p,q,r,s,t,u,v=window.innerWidth,w=window.innerHeight,x=0,y=!1,z=!0,A=($("body"),.01),B=[],C=($("#quote").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"introLetters"}),$(".introLetters"));$("#cita1").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita1Letters"});B[0]=$(".cita1Letters");$("#cita2").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita2Letters"});B[1]=$(".cita2Letters");$("#cita3").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita3Letters"});B[2]=$(".cita3Letters");$("#cita4").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita4Letters"});B[3]=$(".cita4Letters");var D=($("#texto1").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"texto1Letters"}),$(".texto1Letters")),E=($("#texto2").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"texto2Letters"}),$(".texto2Letters")),F=0,G=$("#FirstFace").drawsvg({duration:8e3,easing:"linear",callback:function(){console.log("dibujo terminado")}}),H=$("#viaje1Svg").drawsvg({duration:8e3,easing:"linear",callback:function(){console.log("dibujo terminado")}});$("#bookPages").turn({duration:1e3,display:"double",width:v,height:w,autoCenter:!0,elevation:100}),$("#bookPages").bind("turning",function(a,b,c){console.log(b),2==b&&G.drawsvg("animate"),h(1==b?!0:!1)});var I=new Howl({urls:["audio/ValsViudaAlegre.mp3"],loop:!1,volume:.5,onend:function(){console.log("Finished!")}});$(".videoClass").bind("ended",function(){b(4)}),$("#skip").on("click",function(){b(1)}),setInterval(function(){var a=document.getElementById("video2");a.play()},500);var J=[0,0,60,0,35,100,0,100],K=[90,0,90,0,90,100,90,100],L=[56,0,90,0,90,100,43,100];TweenMax.to(".openBook",.5,{right:"4%",repeatDelay:.1,repeat:-1,yoyo:!0,ease:Power2.easeOut}),K.onUpdate=function(){TweenMax.set(".prel01",{webkitClipPath:"polygon("+J[0]+"%"+J[1]+"%,"+J[2]+"%"+J[3]+"%,"+J[4]+"%"+J[5]+"%,"+J[6]+"%"+J[7]+"%)"}),TweenMax.set(".prelGroup",{webkitClipPath:"polygon("+L[0]+"%"+L[1]+"%,"+L[2]+"%"+L[3]+"%,"+L[4]+"%"+L[5]+"%,"+L[6]+"%"+L[7]+"%)"})},TweenMax.set(".scrollIcon, .hiddenCanvas, .dinamycText, .ageTitle, .napFace, .addon1, .prel01",{visibility:"visible"});var M=new TimelineMax({repeat:0});M.staggerFrom(D,.5,{opacity:0,cycle:{scale:[0,5],y:[-50,200],x:[-50,200],transformOrigin:"0% 50% -50",delay:[0,.5],ease:Power2.easeOut}},.1).to(".age1",2,{color:"#ffd85f",fontSize:"2em",opacity:1,onComplete:m,onReverseComplete:m,onCompleteParams:[4],onReverseCompleteParams:[2],ease:Power0.easeNone},"penta").staggerFrom(B[0],.5,{opacity:0,cycle:{scale:[0,5],y:[-50,200],x:[-50,200],transformOrigin:"0% 50% -50",delay:[0,.5],ease:Power2.easeOut}},.1).staggerTo(".addon1",.5,{opacity:.6,scale:1,ease:Back.easeOut},.5).to(J,7,K,"step3").to(L,7,K,"step3").staggerFrom(E,.5,{opacity:0,cycle:{scale:[0,5],y:[-50,200],x:[-50,200],transformOrigin:"0% 50% -50",delay:[0,.5],ease:Power2.easeOut}},.1).to(".mapSvgClassTop",4,{width:"250%",top:"-20%",left:"-25%",onComplete:n,ease:Power2.easeIn},"+=2").to(".mapSvgClassTop",4,{width:"800%",top:"-150%",left:"-150%",ease:Power2.easeIn},"+=2").staggerTo(".addon1",.5,{opacity:0,scale:0,ease:Power2.easeOut},.5).staggerTo(B[0],.5,{opacity:0,cycle:{scale:[0,5],y:[-50,200],x:[-50,200],transformOrigin:"0% 50% -50",delay:[0,.5],ease:Power2.easeOut}},.1,"-=1").staggerTo(E,.5,{opacity:0,cycle:{scale:[0,5],y:[-50,200],x:[-50,200],transformOrigin:"0% 50% -50",delay:[0,.5],ease:Power2.easeOut}},.1).to(".cita",2,{opacity:0,onComplete:m,onReverseComplete:m,onCompleteParams:[6],onReverseCompleteParams:[4],ease:Power2.easeOut}).to(".cita",5,{opacity:1,ease:Power2.easeOut}).to(".cita",5,{opacity:0,ease:Power2.easeOut}),M.pause(),$(window).bind("mousewheel DOMMouseScroll",function(a){a.preventDefault(),"mousedown"!=a.type&&(a.originalEvent.wheelDelta>0||a.originalEvent.detail<0?F>0&&(u=3,x=-1,F>A?F-=A:A>=F&&(F=0),TweenLite.to(M,.5,{progress:F,ease:Power2.easeOut,onComplete:j})):1>F&&(u=3,x=1,TweenLite.to(M,.5,{progress:F,ease:Power2.easeOut,onComplete:j}),F+=A))}),$("#slider").on("input",function(){y&&h(),u=Math.abs(this.value),M.timeScale(2*u),r.position.x=-35+3*this.value,this.value>=0?(M.play(),x=1):(M.reverse(),x=-1)}),$("#slider").on("mouseup",function(){this.value=0,x=0,r.position.x=-35,M.timeScale(0),M.pause()}),c(),f();var N,v=window.innerWidth/1.5,w=window.innerHeight/2;if(1500>v)var O={leftCenter:-40,upCenter:20,scaleX:300,font:"14px"};else var O={leftCenter:-80,scaleX:400,font:"22px"};var P=d3.geo.mercator().center([O.leftCenter,O.upCenter]).scale(O.scaleX).rotate([0,0]),Q=d3.select("#mapContainer").append("svg").attr("width",v).attr("height",w),R=d3.geo.path().projection(P),S=Q.append("g");d3.json("images/models/world-110m2.json",function(a,b){d3.csv("images/models/cities.csv",function(a,b){var c=S.selectAll("circle").data(b).enter();N=c.append("circle").attr("cx",function(a){return P([a.lon,a.lat])[0]}).attr("cy",function(a){return P([a.lon,a.lat])[1]}).attr("r",7).attr("id","circulos").style("opacity","0.7").style("fill","rgba(255,255,255,0.2)").style("stroke","#ffd85f").style("stroke-width","2").style("cursor","pointer"),c.append("text").text(function(a){return a.name}).attr("x",function(a){return P([a.lon,a.lat])[0]+1*a.precisionX}).attr("y",function(a){return P([a.lon,a.lat])[1]+1*a.precisionY}).attr("fill","#ffd85f").style("font-size",O.font).style("font-family","'Alice',serif").style("cursor","pointer")}),S.selectAll("path").data(topojson.object(b,b.objects.countries).geometries).enter().append("path").attr("d",R).attr("stroke","#ffd85f").attr("stroke-width","0.5px").attr("fill","#56481e").on("mouseover",function(a){console.log(a)})}),setInterval(function(){N.attr("r",10),N.transition().duration(800).attr("r",1)},1e3),$(document).on("click","#mapIcon, #arrowClose",function(){h()}),$(document).on("click",".plusInfoCita",function(){var a=$(this).attr("value");"[+]"==$(this).text()?($(this).text("[-]"),_.each(B[parseInt(a)],function(b,c){setTimeout(function(){k(b,a)},40*c)})):($(this).text("[+]"),_.each($("#cita"+a+"suma").children(),function(a,b){setTimeout(function(){l(a)},5*b)}))})}]),angular.module("smcApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);