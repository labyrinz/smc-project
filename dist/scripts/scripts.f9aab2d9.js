"use strict";angular.module("smcApp",["ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("smcApp").controller("MainCtrl",["$scope",function(a){function b(){q.play()}function c(a,b){$("#cita"+b+"suma").append(a),TweenMax.from(a,.1,{opacity:0,y:-40,transformOrigin:"0% 50% -50",ease:Power2.easeOut})}function d(a){$(a).remove()}function e(){var a=$(".slideimg").last();TweenMax.to(a,.1,{left:"130%",repeatDelay:0,repeat:1,yoyo:!0,onRepeat:$("#fotoGroup").prepend(a),ease:Power2.easeOut})}function f(){var a=$(".slideimg").first();TweenMax.to(a,.1,{left:"-130%",repeatDelay:0,repeat:1,yoyo:!0,onRepeat:$("#fotoGroup").append(a),ease:Power2.easeOut})}function g(a){void 0==a?k?($("#mapIcon").removeClass("mapIconMini"),$(".mapItem").removeClass("mapItemMini"),$("#mapContainer").removeClass("mapaD"),k=!1):($("#mapIcon").addClass("mapIconMini"),$(".mapItem").addClass("mapItemMini"),$("#mapContainer").addClass("mapaD"),k=!0):a?($("#mapIcon").addClass("mapIconMini"),$(".mapItem").addClass("mapItemMini"),$("#mapContainer").addClass("mapaD"),k=!0):a||($("#mapIcon").removeClass("mapIconMini"),$(".mapItem").removeClass("mapItemMini"),$("#mapContainer").removeClass("mapaD"),k=!1)}function h(){$("#introVideo").attr("src",""),$("#introVideo").attr("src","https://www.youtube.com/embed/wpWO4L0qPPw?showinfo=0")}function i(){p.drawsvg("animate")}function j(){if(t.hasClass("open")){t.removeClass("open"),r.removeClass("overlay-open"),t.addClass("close");var a=function(a){t.removeClass("close")};if(x.transitions)try{t.on(w,function(){a()})}catch(b){a()}else a()}else t.hasClass("close")||(t.addClass("open"),r.addClass("overlay-open"))}var k=!1,l=($("body"),[]),m=($("#quote h2").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"introLetters"}),$("#quote h3 span.subtitle").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"introLettersSubtitle"}),$("#quote h3 span.cugat-name").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"introLettersName"}),$(".introLetters")),n=$(".introLettersSubtitle"),o=$(".introLettersName");$("#cita12").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita12Letters"});l[12]=$(".cita12Letters");$("#cita42").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita42Letters"});l[42]=$(".cita42Letters");$("#cita51").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita51Letters"});l[51]=$(".cita51Letters");$("#cita52").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita52Letters"});l[52]=$(".cita52Letters");$("#cita53").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita53Letters"});l[53]=$(".cita53Letters");$("#cita61").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita61Letters"});l[61]=$(".cita61Letters");var p=$("#viaje1Svg").drawsvg({duration:8e3,easing:"linear",callback:function(){console.log("dibujo terminado")}});TweenMax.set(".scrollIcon, .hiddenCanvas, .dinamycText, .ageTitle, .napFace, .addon1, .prel01",{visibility:"visible"});var q=new TimelineMax({repeat:0});q.to(".videoCover",3,{opacity:"0.6",delay:1,ease:Power0.easeOut},"inicio").staggerFrom(m,.6,{opacity:0,cycle:{scale:[0,5],y:[-50,200],x:[-50,200],transformOrigin:"0% 50% -50",delay:[0,.2]},ease:Back.easeOut.config(.8)},.1).staggerFrom(n,.6,{opacity:0,cycle:{scale:[0,5],y:[-50,200],x:[-50,200],transformOrigin:"0% 50% -50",delay:[0,.2]},ease:Back.easeOut.config(.8)},.1).staggerFrom(o,.6,{opacity:0,cycle:{scale:[0,5],y:[-50,200],x:[-50,200],transformOrigin:"0% 50% -50",delay:[0,.2]},ease:Back.easeOut.config(.8)},.1).addPause().to(".ed1",.5,{left:"0%",ease:Bounce.easeOut},"prologo").to(".ed2",.5,{top:"0%",ease:Bounce.easeOut}).to(".ed3",.5,{left:"0%",ease:Bounce.easeOut},"-=1").to(".ed4",.5,{transform:"rotateX(0deg)",ease:Back.easeOut.config(1)}).to("#page1",.1,{right:"0%",onComplete:h,ease:Power0.easeNone}).to(".pentagramRect",.2,{bottom:"1%",ease:Power0.easeNone},"-=0.2").to(".pentagramBack",.2,{bottom:"0%",ease:Power0.easeNone},"-=0.2").to(".pentagramNotesGroup",.2,{bottom:"2%",ease:Power0.easeNone},"-=0.2").to(".age1",.2,{transform:"rotateX(0deg)",ease:Back.easeOut.config(.7)},"-=0.2").to(".blurEffect1",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").to(".texto11",.5,{top:"9%",scale:"1",ease:Back.easeOut.config(.7)},"-=1").to(".texto12",.5,{top:"30%",scale:"1",ease:Back.easeOut.config(.7)},"-=0.2").to(".texto13",.5,{top:"55%",scale:"1",ease:Back.easeOut.config(.7)},"-=0.2").to(".cita11",.5,{bottom:"10%",scale:"1",ease:Back.easeOut.config(.7)},"-=1").to(".prelGroup",.5,{top:"10%",scale:"1",ease:Back.easeOut.config(.7)},"-=1").to("#page0",.5,{scale:"0",ease:Back.easeIn.config(1)}).addPause().to(".texto11",.5,{scale:"0",ease:Back.easeOut.config(.7)}).to(".texto12",.5,{scale:"0",ease:Back.easeOut.config(.7)},"-=0.3").to(".texto13",.5,{scale:"0",ease:Back.easeOut.config(.7)},"-=0.3").to(".cita11",.5,{scale:"0",ease:Back.easeOut.config(.7)},"-=0.3").to(".prelGroup",.5,{scale:"0",ease:Back.easeOut.config(.7)},"-=0.3").to(".blurEffect1",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone}).to(".ed2",.5,{left:"-5%",ease:Power2.easeIn},"scrollGer").to(".ed3",.5,{left:"-10%",ease:Power2.easeIn},"scrollGer").to(".ed4",.5,{left:"-15%",ease:Power2.easeIn},"scrollGer").to("#page1",.4,{right:"100%",ease:Power0.easeNone},"-=0.5").to("#page2",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").from(".mapSvgClassTop",1,{scale:0,onComplete:i,ease:Back.easeOut}).to(".mapSvgClassTop",4,{width:"250%",top:"-60%",left:"-25%",ease:Power2.easeIn},"+=1").to(".cub1",.5,{top:"0%",ease:Power0.easeNone}).to(".ed1",.5,{top:"120%",ease:Power2.easeIn}).to(".ed2",.5,{top:"120%",ease:Power2.easeIn}).to(".ed3",.5,{top:"120%",ease:Power2.easeIn},"-=1").to(".ed4",.5,{top:"120%",ease:Power2.easeIn}).to(".mapSvgClassTop",2,{width:"800%",top:"-385%",left:"-140%",ease:Power2.easeIn},"-=1.2").addPause().to("#page2",.4,{right:"100%",ease:Power0.easeNone}).to("#page3",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").to(".age1",.2,{transform:"rotateX(90deg)",ease:Back.easeOut.config(.7)}).to(".age2",.2,{transform:"rotateX(0deg)",ease:Back.easeOut.config(.7)},"-=0.2").to(".blurEffect2",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").to(".prel05",.4,{top:"10%",scale:"1",ease:Back.easeOut.config(1)}).to(".prelpant1",.4,{top:"10%",scale:"1",ease:Back.easeOut.config(1)},"-=0.2").to(".prel06",.4,{top:"10%",scale:"1",ease:Back.easeOut.config(1)},"-=0.2").to(".texto14",.4,{top:"48%",scale:"1",ease:Back.easeOut.config(1)},"-=0.2").to(".texto15",.4,{top:"65%",scale:"1",ease:Back.easeOut.config(1)},"-=0.2").to(".texto16",.4,{top:"78%",scale:"1",ease:Back.easeOut.config(1)},"-=0.2").addPause().to(".prel05",.4,{scale:"0",ease:Back.easeOut.config(1)}).to(".prelpant1",.4,{scale:"0",ease:Back.easeOut.config(1)},"-=0.2").to(".prel06",.4,{scale:"0",ease:Back.easeOut.config(1)},"-=0.2").to(".texto14",.4,{scale:"0",ease:Back.easeOut.config(1)},"-=0.2").to(".texto15",.4,{scale:"0",ease:Back.easeOut.config(1)},"-=0.2").to(".texto16",.4,{scale:"0",ease:Back.easeOut.config(1)},"-=0.2").to(".cub1",.5,{transform:"rotateY(165deg)",ease:Power2.easeIn}).to("#page3",.4,{right:"100%",ease:Back.easeInOut.config(1)},"-=0.4").to("#page4",.4,{right:"0%",ease:Back.easeInOut.config(1)},"-=0.4").to(".ny4",.2,{top:"0%",ease:Bounce.easeOut},"-=0.5").to(".ny3",.5,{top:"0%",ease:Bounce.easeOut},"-=0.2").to(".ny1",.5,{top:"0%",ease:Bounce.easeOut},"-=0.2").to(".ny2",.5,{top:"0%",ease:Bounce.easeOut},"-=0.2").to(".ny5",.8,{scale:"1",right:"0",ease:Power4.easeOut},"-=0.2").to(".ny6",.8,{scale:"1",right:"0",ease:Power4.easeOut},"-=0.2").to(".ny7",.8,{scale:"1",right:"0",ease:Power4.easeOut},"-=0.2").to(".blurEffect3",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").to(".texto17",.4,{right:"55%",ease:Back.easeOut.config(1)},"-=1").to(".texto18",.4,{right:"10%",ease:Back.easeOut.config(1)},"-=0.2").to(".cita12",.4,{right:"20%",ease:Back.easeOut.config(1)},"-=0.2").to(".p31Video",.4,{right:"10%",ease:Back.easeOut.config(1)},"-=0.2").addPause().to("#page4",.4,{right:"100%",ease:Back.easeInOut.config(1)},"ritaMontaner").to("#page5",.4,{right:"0%",ease:Back.easeInOut.config(1)},"-=0.4").to(".rm12",.4,{right:"70%",ease:Back.easeOut.config(1)}).to(".texto21",.4,{right:"10%",ease:Back.easeOut.config(1)},"-=0.2").to(".cita13",.4,{right:"10%",ease:Back.easeOut.config(1)},"-=0.2").to(".rm11",.4,{right:"58%",ease:Back.easeOut.config(1)},"-=0.2").to(".rm13",.4,{right:"60%",ease:Back.easeOut.config(1)},"-=0.2").addPause().to("#page5",.4,{right:"100%",ease:Back.easeInOut.config(1)}).to("#page6",.4,{right:"0%",ease:Back.easeInOut.config(1)},"-=0.4").to(".blurEffect3",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone},"+=1").to(".ny5",.5,{scale:"5",right:"200%",ease:Power4.easeIn}).to(".ny6",.5,{scale:"5",right:"200%",ease:Power4.easeIn},"-=0.2").to(".ny7",.5,{scale:"5",right:"200%",ease:Power4.easeIn},"-=0.2").to(".ny3",.3,{transform:"rotateY(165deg)",ease:Power2.easeIn}).to(".ny1",.3,{transform:"rotateY(165deg)",ease:Power2.easeIn}).to(".ny2",.3,{transform:"rotateY(165deg)",ease:Power2.easeIn}).to(".ny4",.3,{transform:"rotateY(165deg)",ease:Power2.easeIn}).to(".ber1",.3,{transform:"rotateY(0deg)",ease:Back.easeOut.config(1)}).to(".blurEffect4",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").to(".texto23",.4,{right:"60%",ease:Back.easeOut.config(1)}).to(".rm14",.4,{right:"60%",ease:Back.easeOut.config(1)},"-=0.2").to(".texto24",.4,{right:"10%",ease:Back.easeOut.config(1)},"-=0.2").to(".cita14",.4,{right:"5%",ease:Back.easeOut.config(1)},"-=0.2").addPause().to("#page6",.4,{right:"100%",ease:Back.easeInOut.config(1)}).to("#page7",.2,{right:"0%",ease:Back.easeInOut.config(1)},"-=0.4").to(".blurEffect4",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone},"+=1").to(".ber1",.3,{transform:"rotateY(165deg)",ease:Back.easeOut.config(1)}).to(".holly1",.5,{transform:"rotateX(0deg)",ease:Back.easeOut.config(1)}).to(".holly2",.5,{transform:"rotateX(0deg)",ease:Back.easeOut.config(1)}).to(".holly3",.5,{transform:"rotateX(0deg)",ease:Back.easeOut.config(1)}).to(".holly4",.5,{transform:"rotateX(0deg)",ease:Back.easeOut.config(1)}).to(".holly7",.5,{top:"0%",ease:Bounce.easeOut}).to(".holly6",2,{top:"0%",ease:Power4.easeOut}).to(".blurEffect6",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").to(".texto25",.4,{right:"10%",ease:Back.easeOut.config(1)},"-=1.2").to(".rm15",.4,{right:"80%",ease:Back.easeOut.config(1)},"-=0.2").to(".texto26",.4,{right:"10%",ease:Back.easeOut.config(1)},"-=0.2").to(".rm16",.4,{right:"70%",ease:Back.easeOut.config(1)},"-=0.2").to(".rm17",.4,{right:"55%",ease:Back.easeOut.config(1)},"-=0.2").to(".rm18",.4,{right:"70%",ease:Back.easeOut.config(1)},"-=0.2").to(".holly5",2,{opacity:"1",ease:Power4.easeOut}).addPause().to("#page7",.4,{right:"100%",ease:Back.easeInOut.config(1)}).to(".blurEffect6",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone},"+=1").to(".holly5",2,{opacity:"0",ease:Power4.easeOut}).to(".holly1",.5,{transform:"rotateX(165deg)",ease:Back.easeOut.config(1)},"-=1.5").to(".holly2",.5,{transform:"rotateX(165deg)",ease:Back.easeOut.config(1)},"-=0.5").to(".holly3",.5,{transform:"rotateX(165deg)",ease:Back.easeOut.config(1)},"-=0.5").to(".holly4",.5,{transform:"rotateX(165deg)",ease:Back.easeOut.config(1)},"-=0.5").to(".holly7",.5,{top:"150%",ease:Bounce.easeOut},"-=0.5").to(".holly6",2,{top:"-150%",ease:Power4.easeOut},"-=0.5").to(".carn1",.3,{transform:"rotateY(0deg)",ease:Back.easeOut.config(1)},"carmenCastillo").to(".blurEffect5",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").to("#page8",.4,{right:"0%",ease:Back.easeInOut.config(1)},"-=0.4").to(".texto31",.4,{right:"30%",ease:Back.easeOut.config(1)},"-=0.2").to(".cc31",.4,{right:"60%",ease:Back.easeOut.config(1)},"-=0.2").to(".cc32",.4,{right:"70%",ease:Back.easeOut.config(1)},"-=0.2").addPause().to("#page8",.4,{right:"100%",ease:Back.easeInOut.config(1)}).to("#page9",.4,{right:"0%",ease:Back.easeInOut.config(1)},"-=0.4").to(".texto33",.4,{right:"10%",ease:Back.easeOut.config(1)},"-=0.2").to(".cc33",.4,{top:"22%",ease:Back.easeOut.config(1)},"-=0.2").to(".texto34",.4,{right:"10%",ease:Back.easeOut.config(1)},"-=0.2").to(".cc34",.4,{top:"18%",ease:Back.easeOut.config(1)},"-=0.2").to(".cc35",.4,{top:"19%",ease:Back.easeOut.config(1)},"-=0.2").to(".cc36",.4,{top:"23%",ease:Back.easeOut.config(1)},"-=0.2").to(".cc37",.4,{top:"27%",ease:Back.easeOut.config(1)},"-=0.2").to(".cc38",.4,{top:"20%",ease:Back.easeOut.config(1)},"-=0.2").to(".cc39",.4,{top:"40%",ease:Back.easeOut.config(1)},"-=0.2").addPause().to("#page9",.4,{right:"100%",ease:Back.easeInOut.config(1)}).to("#page10",.4,{right:"0%",ease:Back.easeInOut.config(1)},"-=0.4").addPause().to("#page10",.4,{right:"100%",ease:Power0.easeNone},"lorraineAllen").to(".blurEffect5",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone},"-=0.2").to(".carn1",.3,{transform:"rotateY(165deg)",ease:Back.easeOut.config(1)}).to(".chi1",.3,{transform:"rotateY(0deg)",ease:Back.easeOut.config(1)},"-=0.2").to(".blurEffect7",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").to("#page11",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").to(".lorraine",.4,{right:"35%",ease:Back.easeOut.config(1)},"-=0.2").to(".texto41",.4,{right:"75%",ease:Back.easeOut.config(1)},"-=0.2").to(".la3",.4,{right:"55%",ease:Back.easeOut.config(1)},"-=0.2").addPause().to("#page11",.4,{right:"100%",ease:Power0.easeNone}).to("#page12",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").to(".cita42",.4,{right:"10%",ease:Back.easeOut.config(1)},"-=0.2").to(".texto42",.4,{right:"50%",ease:Back.easeOut.config(1)},"-=0.2").to(".la4",.4,{right:"15%",ease:Back.easeOut.config(1)},"-=0.2").addPause().to("#page12",.4,{right:"100%",ease:Power0.easeNone}).to("#page13",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").to(".texto43",.4,{right:"20%",ease:Back.easeOut.config(1)},"-=0.2").to(".la6",.4,{bottom:"45%",ease:Back.easeOut.config(1)},"-=0.2").to(".la7",.4,{top:"25%",ease:Back.easeOut.config(1)},"-=0.2").to(".la8",.4,{bottom:"55%",ease:Back.easeOut.config(1)},"-=0.2").to(".texto44",.4,{right:"20%",ease:Back.easeOut.config(1)},"-=0.2").to(".la9",.4,{bottom:"60%",ease:Back.easeOut.config(1)},"-=0.2").addPause().to("#page13",.4,{right:"100%",ease:Power0.easeNone}).to("#page14",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").to(".chi1",.3,{transform:"rotateY(165deg)",ease:Back.easeOut.config(1)},"-=0.2").to(".blurEffect7",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone},"+=1").to(".lasv1",.3,{transform:"rotateY(0deg)",ease:Back.easeOut.config(1)},"-=0.2").to(".blurEffect8",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").to(".texto52",.4,{right:"10%",ease:Back.easeOut.config(1)},"-=0.2").to(".cita53",.4,{right:"40%",ease:Back.easeOut.config(1)},"-=0.2").addPause().to(".texto52",.4,{top:"-100%",ease:Back.easeOut.config(1)},"abbeLane").to(".cita53",.4,{bottom:"150%",ease:Back.easeOut.config(1)},"-=0.2").to(".cita52",.4,{top:"5%",ease:Back.easeOut.config(1)},"-=0.2").to(".cita51",.4,{top:"25%",ease:Back.easeOut.config(1)},"-=0.2").to(".al1",.4,{top:"25%",ease:Back.easeOut.config(1)},"-=0.2").to(".texto51",.4,{bottom:"15%",ease:Back.easeOut.config(1)},"-=0.2").to(".teLoDijoAdela",.4,{top:"45%",ease:Back.easeOut.config(1)},"-=0.2").addPause().to("#page14",.4,{right:"100%",ease:Power0.easeNone}).to("#page15",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").to(".texto53",.4,{left:"25%",ease:Back.easeOut.config(1)},"-=0.2").to(".al4",.4,{right:"20%",ease:Back.easeOut.config(1)},"-=0.2").to(".al5",.4,{top:"12%",ease:Back.easeOut.config(1)},"-=0.2").to(".cita56",.4,{right:"40%",ease:Back.easeOut.config(1)},"-=0.2").to(".al7",.4,{top:"10%",ease:Back.easeOut.config(1)},"-=0.2").addPause().to("#page15",.4,{right:"100%",ease:Power0.easeNone},"charoBaeza").to("#page16",.4,{right:"0%",ease:Power0.easeNone}).addPause().to("#cb01",.7,{left:"10%",scale:"0.01",ease:Back.easeOut},"charoBaezatrans").to("#cb04",.7,{left:"45%",scale:"1",ease:Back.easeOut},"charoBaezatrans").to("#texto61",.7,{left:"5%",scale:"0.01",ease:Back.easeOut},"charoBaezatrans").to("#texto63",.7,{left:"25%",scale:"1",ease:Back.easeOut},"charoBaezatrans").addPause().to(".blurEffect8",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone},"epilogo").to(".lasv1",.3,{transform:"rotateY(165deg)",ease:Back.easeOut.config(1)},"+=1").to("#page16",.4,{right:"100%",ease:Power0.easeNone}).to("#page17",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").addPause().to("#page17",.4,{right:"100%",ease:Power0.easeNone}).to("#page18",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").addPause(),q.pause(),setTimeout(b,15e3),$(window).bind("mousewheel DOMMouseScroll",function(a){a.preventDefault(),TweenMax.to(".additional",.2,{opacity:0,scale:0,ease:Back.easeOut}),"mousedown"!=a.type&&(a.originalEvent.wheelDelta>0||a.originalEvent.detail<0?q.reverse():q.play())}),a.upTo=function(a){"inicio"==a?$("#introVideo").attr("src","https://www.youtube.com/embed/wpWO4L0qPPw?playlist=wpWO4L0qPPw&autoplay=1&controls=0&loop=1&showinfo=0"):($("#introVideo").attr("src",""),$("#introVideo").attr("src","https://www.youtube.com/embed/wpWO4L0qPPw?showinfo=0")),q.play(a),$("div.overlay").hasClass("open")&&j()},$(document).on("click","#mapIcon, #arrowClose",function(){g()}),$(document).on("click","#arrowNext",function(){e()}),$(document).on("click","#arrowPrev",function(){f()}),$(document).on("click",".plusInfo",function(){console.log($(this).css("opacity"));var a=$(this).attr("value");1==$(this).css("opacity")?$(this).css("opacity","0"):$(this).css("opacity","1");var b=".ad"+a,c=$(b).css("opacity");0==c?TweenMax.to(b,.3,{opacity:1,scale:1,ease:Back.easeOut}):TweenMax.to(b,.3,{opacity:0,scale:0,ease:Back.easeOut})}),$(document).on("click",".plusInfoCita",function(){var a=$(this).attr("value");"[+]"==$(this).text()?($(this).text("[-]"),_.each(l[parseInt(a)],function(b,d){setTimeout(function(){c(b,a)},5*d)})):($(this).text("[+]"),_.each($("#cita"+a+"suma").children(),function(a,b){setTimeout(function(){d(a)},5*b)}))});var r=$("div.container"),s=$("#trigger-overlay"),t=$("div.overlay"),u=$("button.overlay-close"),v={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},w=v[Modernizr.prefixed("transition")],x={transitions:Modernizr.csstransitions};s.on("click",function(){j()}),u.on("click",function(){j()})}]),angular.module("smcApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);