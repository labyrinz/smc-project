"use strict";angular.module("smcApp",["ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("smcApp").controller("MainCtrl",["$scope",function(a){function b(a,b){$("#cita"+b+"suma").append(a),TweenMax.from(a,.1,{opacity:0,y:-40,transformOrigin:"0% 50% -50",ease:Power2.easeOut})}function c(a){$(a).remove()}function d(){var a=$(".slideimg").last();TweenMax.to(a,.1,{left:"130%",repeatDelay:0,repeat:1,yoyo:!0,onRepeat:$("#fotoGroup").prepend(a),ease:Power2.easeOut})}function e(){var a=$(".slideimg").first();TweenMax.to(a,.1,{left:"-130%",repeatDelay:0,repeat:1,yoyo:!0,onRepeat:$("#fotoGroup").append(a),ease:Power2.easeOut})}function f(a){void 0==a?k?($("#mapIcon").removeClass("mapIconMini"),$(".mapItem").removeClass("mapItemMini"),$("#mapContainer").removeClass("mapaD"),k=!1):($("#mapIcon").addClass("mapIconMini"),$(".mapItem").addClass("mapItemMini"),$("#mapContainer").addClass("mapaD"),k=!0):a?($("#mapIcon").addClass("mapIconMini"),$(".mapItem").addClass("mapItemMini"),$("#mapContainer").addClass("mapaD"),k=!0):a||($("#mapIcon").removeClass("mapIconMini"),$(".mapItem").removeClass("mapItemMini"),$("#mapContainer").removeClass("mapaD"),k=!1)}function g(){$("#introVideo").attr("src",""),$("#introVideo").attr("src","https://www.youtube.com/embed/wpWO4L0qPPw?showinfo=0")}function h(){$(".fullScreeVideoEnter").attr("src","")}function i(){p.drawsvg("animate")}function j(){if(t.hasClass("open")){t.removeClass("open"),r.removeClass("overlay-open"),t.addClass("close");var a=function(a){t.removeClass("close")};if(x.transitions)try{t.on(w,function(){a()})}catch(b){a()}else a()}else t.hasClass("close")||(t.addClass("open"),r.addClass("overlay-open"))}var k=!1,l=($("body"),[]),m=($("#quote h2").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"introLetters"}),$("#quote h3 span.subtitle").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"introLettersSubtitle"}),$("#quote h3 span.cugat-name").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"introLettersName"}),$(".introLetters")),n=$(".introLettersSubtitle"),o=$(".introLettersName");$("#cita12").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita12Letters"});l[12]=$(".cita12Letters");$("#cita41").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita41Letters"});l[41]=$(".cita41Letters");$("#cita42").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita42Letters"});l[42]=$(".cita42Letters");$("#cita51").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita51Letters"});l[51]=$(".cita51Letters");$("#cita52").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita52Letters"});l[52]=$(".cita52Letters");$("#cita53").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita53Letters"});l[53]=$(".cita53Letters");$("#cita61").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita61Letters"});l[61]=$(".cita61Letters");$("#cita62").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita62Letters"});l[62]=$(".cita62Letters");$("#cita63").splitText({type:"words",animation:"glowOnHover",useLite:!0,addClass:"cita63Letters"});l[63]=$(".cita63Letters");var p=$("#viaje1Svg").drawsvg({duration:8e3,easing:"linear",callback:function(){console.log("dibujo terminado")}});TweenMax.set(".scrollIcon, .hiddenCanvas, .dinamycText, .ageTitle, .napFace, .addon1, .prel01",{visibility:"visible"});var q=new TimelineMax({repeat:0});q.to(".videoCover",3,{opacity:"0.6",delay:4,ease:Power0.easeOut},"inicio").staggerFrom(m,.6,{opacity:0,cycle:{scale:[0,5],y:[-50,200],x:[-50,200],transformOrigin:"0% 50% -50",delay:[0,.2]},ease:Back.easeOut.config(.8)},.1).staggerFrom(n,.6,{opacity:0,cycle:{scale:[0,5],y:[-50,200],x:[-50,200],transformOrigin:"0% 50% -50",delay:[0,.2]},ease:Back.easeOut.config(.8)},.1).staggerFrom(o,.6,{opacity:0,cycle:{scale:[0,5],y:[-50,200],x:[-50,200],transformOrigin:"0% 50% -50",delay:[0,.2]},ease:Back.easeOut.config(.8)},.1).addPause().to(".ed1",.5,{left:"0%",ease:Bounce.easeOut},"prologo").to(".ed2",.5,{top:"0%",ease:Bounce.easeOut}).to(".ed3",.5,{left:"0%",ease:Bounce.easeOut},"-=1").to(".ed4",.5,{transform:"rotateX(0deg)",ease:Back.easeOut.config(1)}).to("#page1",.1,{right:"0%",onComplete:g,ease:Power0.easeNone}).to(".pentagramRect",.2,{bottom:"1%",ease:Power0.easeNone},"-=0.2").to(".pentagramBack",.2,{bottom:"0%",ease:Power0.easeNone},"-=0.2").to(".pentagramNotesGroup",.2,{bottom:"2%",ease:Power0.easeNone},"-=0.2").to(".age1",.3,{transform:"rotateX(0deg)",ease:Bounce.easeOut},"-=0.2").to(".blurEffect1",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").staggerFrom($("#page1").children(),.6,{scale:"100",opacity:"0",ease:Back.easeInOut.config(1)},.01).to("#page0",.5,{scale:"0",ease:Back.easeIn.config(1)}).addPause().staggerTo($("#page1").children(),.6,{scale:"0",opacity:"0",ease:Back.easeInOut.config(1)},.01).to(".blurEffect1",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone}).to(".ed2",.5,{left:"-5%",ease:Power2.easeIn},"scrollGer").to(".ed3",.5,{left:"-10%",ease:Power2.easeIn},"scrollGer").to(".ed4",.5,{left:"-15%",ease:Power2.easeIn},"scrollGer").to("#page1",.4,{right:"100%",ease:Power0.easeNone},"-=0.5").to("#page2",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").from(".mapSvgClassTop",1,{scale:0,onComplete:i,ease:Back.easeOut}).to(".mapSvgClassTop",4,{width:"250%",top:"-60%",left:"-25%",ease:Power2.easeIn},"+=1").to(".cub1",.5,{top:"0%",ease:Power0.easeNone}).to(".ed1",.5,{top:"120%",ease:Power2.easeIn}).to(".ed2",.5,{top:"120%",ease:Power2.easeIn}).to(".ed3",.5,{top:"120%",ease:Power2.easeIn},"-=1").to(".ed4",.5,{top:"120%",ease:Power2.easeIn}).to(".mapSvgClassTop",2,{width:"800%",top:"-385%",left:"-140%",ease:Power2.easeIn},"-=1.2").addPause().to("#page2",.4,{right:"100%",ease:Power0.easeNone}).to("#page3",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").to(".age1",.3,{transform:"rotateX(90deg)",ease:Bounce.easeOut}).to(".age2",.3,{transform:"rotateX(0deg)",ease:Bounce.easeOut},"-=0.3").to(".blurEffect2",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").staggerFrom($("#page3").children(),.6,{scale:"100",opacity:"0",ease:Back.easeInOut.config(1)},.01).addPause().staggerTo($("#page3").children(),.6,{scale:"0",opacity:"0",ease:Back.easeInOut.config(1)},.01).to(".cub1",.5,{transform:"rotateY(165deg)",ease:Power2.easeIn}).to(".ny4",.2,{top:"0%",ease:Bounce.easeOut},"-=0.5").to(".ny3",.5,{top:"0%",ease:Bounce.easeOut},"-=0.2").to(".ny1",.5,{top:"0%",ease:Bounce.easeOut},"-=0.2").to(".ny2",.5,{top:"0%",ease:Bounce.easeOut},"-=0.2").to(".ny5",.8,{scale:"1",right:"0",ease:Power4.easeOut},"-=0.2").to(".ny6",.8,{scale:"1",right:"0",ease:Power4.easeOut},"-=0.2").to(".ny7",.8,{scale:"1",right:"0",ease:Power4.easeOut},"-=0.2").to("#page3",.4,{right:"100%",ease:Power0.easeNone}).to("#page4",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").to(".blurEffect3",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").staggerFrom($("#page4").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.1).addPause().to("#page4",.4,{right:"100%",ease:Back.easeInOut.config(1)},"ritaMontaner").to("#page5",.4,{right:"0%",ease:Back.easeInOut.config(1)},"-=0.4").staggerFrom($("#page5").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.1).addPause().to("#page5",.4,{right:"100%",ease:Back.easeInOut.config(1)}).to("#page6",.4,{right:"0%",ease:Back.easeInOut.config(1)},"-=0.4").to(".blurEffect3",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone},"+=1").to(".ny5",.5,{scale:"5",right:"200%",ease:Power4.easeIn}).to(".ny6",.5,{scale:"5",right:"200%",ease:Power4.easeIn},"-=0.2").to(".ny7",.5,{scale:"5",right:"200%",ease:Power4.easeIn},"-=0.2").to(".ny3",.3,{transform:"rotateY(165deg)",ease:Power2.easeIn}).to(".ny1",.3,{transform:"rotateY(165deg)",ease:Power2.easeIn}).to(".ny2",.3,{transform:"rotateY(165deg)",ease:Power2.easeIn}).to(".ny4",.3,{transform:"rotateY(165deg)",ease:Power2.easeIn}).to(".ber1",.3,{transform:"rotateY(0deg)",ease:Back.easeOut.config(1)}).to(".blurEffect4",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").staggerFrom($("#page6").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.1).addPause().to("#page6",.4,{right:"100%",ease:Back.easeInOut.config(1)}).to("#page7",.2,{right:"0%",ease:Back.easeInOut.config(1)},"-=0.4").to(".blurEffect4",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone},"+=1").to(".ber1",.3,{transform:"rotateY(165deg)",ease:Back.easeOut.config(1)}).to(".holly1",.5,{transform:"rotateX(0deg)",ease:Back.easeOut.config(1)}).to(".holly2",.5,{transform:"rotateX(0deg)",ease:Back.easeOut.config(1)}).to(".holly3",.5,{transform:"rotateX(0deg)",ease:Back.easeOut.config(1)}).to(".holly4",.5,{transform:"rotateX(0deg)",ease:Back.easeOut.config(1)}).to(".holly7",.5,{top:"0%",ease:Bounce.easeOut}).to(".holly6",2,{top:"0%",ease:Power4.easeOut}).staggerFrom($("#page7").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).to(".holly5",2,{opacity:"1",ease:Power4.easeOut}).addPause().to("#page7",.4,{right:"100%",ease:Back.easeInOut.config(1)}).to(".blurEffect6",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone},"+=1").to(".holly5",2,{opacity:"0",ease:Power4.easeOut}).to(".holly1",.5,{transform:"rotateX(165deg)",ease:Back.easeOut.config(1)},"-=1.5").to(".holly2",.5,{transform:"rotateX(165deg)",ease:Back.easeOut.config(1)},"-=0.5").to(".holly3",.5,{transform:"rotateX(165deg)",ease:Back.easeOut.config(1)},"-=0.5").to(".holly4",.5,{transform:"rotateX(165deg)",ease:Back.easeOut.config(1)},"-=0.5").to(".holly7",.5,{top:"150%",ease:Bounce.easeOut},"-=0.5").to(".holly6",2,{top:"-150%",ease:Power4.easeOut},"-=0.5").to(".carn1",.3,{transform:"rotateY(0deg)",ease:Back.easeOut.config(1)},"carmenCastillo").to(".blurEffect5",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").to("#page8",.4,{right:"0%",ease:Back.easeInOut.config(1)},"-=0.4").staggerFrom($("#page8").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).addPause().to("#page8",.4,{right:"100%",ease:Back.easeInOut.config(1)}).to("#page9",.4,{right:"0%",ease:Back.easeInOut.config(1)},"-=0.4").staggerFrom($("#page9").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).addPause().to("#page9",.4,{right:"100%",ease:Back.easeInOut.config(1)}).to("#page10",.4,{right:"0%",ease:Back.easeInOut.config(1)},"-=0.4").to(".age2",.3,{transform:"rotateX(90deg)",ease:Bounce.easeOut}).to(".age3",.3,{transform:"rotateX(0deg)",ease:Bounce.easeOut},"-=0.3").staggerFrom($("#page10").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).addPause().to("#page10",.4,{right:"100%",ease:Power0.easeNone},"lorraineAllen").to(".blurEffect5",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone},"-=0.2").to(".carn1",.3,{transform:"rotateY(165deg)",ease:Back.easeOut.config(1)}).to(".chi1",.3,{transform:"rotatex(0deg)",ease:Back.easeOut.config(1)},"-=0.2").to(".chi4",.3,{opacity:"1",ease:Bounce.easeOut},"+=0.5").to(".chi5",1,{left:"0",ease:Power4.easeOut}).to(".chi6",1,{left:"0",ease:Power4.easeOut}).to(".blurEffect7",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").to("#page11",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").staggerFrom($("#page11").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).addPause().to("#page11",.4,{right:"100%",ease:Power0.easeNone}).to("#page12",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").staggerFrom($("#page12").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).addPause().to("#page12",.4,{right:"100%",ease:Power0.easeNone}).to("#page13",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").staggerFrom($("#page13").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).addPause().to("#page13",.4,{right:"100%",ease:Power0.easeNone}).to(".blurEffect7",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone},"+=1").to(".chi4",.3,{opacity:"0",ease:Bounce.easeOut},"+=0.5").to(".chi5",1,{left:"150%",ease:Power4.easeOut}).to(".chi6",1,{left:"-150%",ease:Power4.easeOut}).to(".chi1",.3,{transform:"rotatex(-165deg)",ease:Back.easeOut.config(1)},"-=0.2").to("#page14",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").to(".lasv1",.3,{opacity:"1",ease:Back.easeOut.config(1)},"abbeLane").to(".lasv2",.3,{top:"0%",ease:Bounce.easeOut}).to(".lasv3",.3,{top:"0%",ease:Bounce.easeOut}).to(".lasv10",.3,{top:"0%",ease:Bounce.easeOut}).to(".lasv4",.3,{transform:"rotate(0deg)",ease:Back.easeOut.config(1)}).to(".lasv5",.3,{transform:"rotate(0deg)",ease:Back.easeOut.config(1)}).to(".lasv6",.3,{opacity:"1",ease:Back.easeOut.config(1)}).to(".lasv7",.3,{opacity:"1",ease:Back.easeOut.config(1)}).to(".lasv8",.3,{opacity:"1",ease:Back.easeOut.config(1)}).to(".lasv9",.3,{opacity:"1",ease:Back.easeOut.config(1)}).to(".blurEffect8",.2,{filter:"blur(8px)",webkitFilter:"blur(8px)",ease:Power0.easeNone},"+=1").staggerFrom($("#page14").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).addPause().to("#page14",.4,{right:"100%",ease:Power0.easeNone}).to("#page15",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").staggerFrom($("#page15").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).addPause().to("#page15",.4,{right:"100%",ease:Power0.easeNone}).to("#page16",.4,{right:"0%",ease:Power0.easeNone}).staggerFrom($("#page16").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).addPause().to("#page16",.4,{right:"100%",ease:Power0.easeNone}).to("#page17",.4,{right:"0%",ease:Power0.easeNone}).to(".blurEffect8",.2,{filter:"blur(0px)",webkitFilter:"blur(0px)",ease:Power0.easeNone}).to(".lasv8",.3,{opacity:"0",ease:Back.easeOut.config(1)},"+=1").to(".lasv9",.3,{opacity:"0",ease:Back.easeOut.config(1)}).to(".lasv6",.3,{opacity:"0",ease:Back.easeOut.config(1)}).to(".lasv7",.3,{opacity:"0",ease:Back.easeOut.config(1)}).to(".lasv5",.3,{transform:"rotate(180deg)",ease:Back.easeOut.config(1)}).to(".lasv4",.3,{transform:"rotate(180deg)",ease:Back.easeOut.config(1)}).to(".lasv10",.3,{top:"-150%",ease:Bounce.easeOut}).to(".lasv3",.3,{top:"-1500%",ease:Bounce.easeOut}).to(".lasv2",.3,{top:"-150%",ease:Bounce.easeOut}).to(".lasv1",.3,{opacity:"0",ease:Back.easeOut.config(1)}).staggerFrom($("#page17").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).addPause().to("#page17",.4,{right:"100%",ease:Power0.easeNone}).to("#page18",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").staggerFrom($("#page18").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).addPause().to("#cb01",.4,{right:"80%",scale:"0",ease:Power4.easeOut},"bTrans").to("#texto61",.4,{right:"80%",scale:"0",ease:Power4.easeOut},"bTrans").to("#texto63",.4,{right:"25%",scale:"1",ease:Power4.easeOut},"bTrans").to("#cb04",.4,{right:"45%",scale:"1",ease:Power4.easeOut},"bTrans").addPause().to(".age3",.3,{transform:"rotateX(90deg)",ease:Bounce.easeOut}).to(".age4",.3,{transform:"rotateX(0deg)",ease:Bounce.easeOut},"-=0.3").to("#page18",.4,{right:"100%",ease:Power0.easeNone},"epilogo").to("#page19",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").staggerFrom($("#page19").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).addPause().to("#page19",.4,{right:"100%",ease:Power0.easeNone}).to("#page20",.4,{right:"0%",ease:Power0.easeNone},"-=0.4").staggerFrom($("#page20").children(),.6,{right:"-150%",ease:Back.easeInOut.config(1)},.3).addPause(),q.play(),$(window).bind("mousewheel DOMMouseScroll",function(a){a.preventDefault(),TweenMax.to(".additional",.2,{opacity:0,scale:0,ease:Back.easeOut}),"mousedown"!=a.type&&(a.originalEvent.wheelDelta>0||a.originalEvent.detail<0?q.reverse():q.play())}),a.upTo=function(a){"inicio"==a?$("#introVideo").attr("src","https://www.youtube.com/embed/wpWO4L0qPPw?playlist=wpWO4L0qPPw&autoplay=1&controls=0&loop=1&showinfo=0"):($("#introVideo").attr("src",""),$("#introVideo").attr("src","https://www.youtube.com/embed/wpWO4L0qPPw?showinfo=0")),q.play(a),$("div.overlay").hasClass("open")&&j()},a.openVideo=function(a){$(".fullScreeVideoEnter").attr("src","https://www.youtube.com/embed/"+a+"?playlist="+a+"&autoplay=1&controls=0&loop=1&showinfo=0"),TweenMax.to(".fullScreenVideo",3,{css:{transform:"scale(0.3) rotate(20deg)"},delay:.5,ease:Expo.easeOut}),TweenMax.to(".fullScreenVideo",3,{css:{transform:"scale(1) rotate(0deg)"},delay:3,ease:Expo.easeOut})},a.closeVideo=function(){TweenMax.to(".fullScreenVideo",3,{css:{transform:"scale(0.3) rotate(0deg)"},ease:Expo.easeOut}),TweenMax.to(".fullScreenVideo",1,{css:{transform:"scale(0) rotate(30deg)"},delay:3,onComplete:h,ease:Expo.easeOut})},$(document).on("click","#mapIcon, #arrowClose",function(){f()}),$(document).on("click","#arrowNext",function(){d()}),$(document).on("click","#arrowPrev",function(){e()}),$(document).on("click",".plusInfo",function(){console.log($(this).css("opacity"));var a=$(this).attr("value");1==$(this).css("opacity")?$(this).css("opacity","0"):$(this).css("opacity","1");var b=".ad"+a,c=$(b).css("opacity");0==c?TweenMax.to(b,.3,{opacity:1,scale:1,ease:Back.easeOut}):TweenMax.to(b,.3,{opacity:0,scale:0,ease:Back.easeOut})}),$(document).on("click",".plusInfoCita",function(){var a=$(this).attr("value");"[+]"==$(this).text()?($(this).text("[-]"),_.each(l[parseInt(a)],function(c,d){setTimeout(function(){b(c,a)},5*d)})):($(this).text("[+]"),_.each($("#cita"+a+"suma").children(),function(a,b){setTimeout(function(){c(a)},5*b)}))});var r=$("div.container"),s=$("#trigger-overlay"),t=$("div.overlay"),u=$("button.overlay-close"),v={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},w=v[Modernizr.prefixed("transition")],x={transitions:Modernizr.csstransitions};s.on("click",function(){j()}),u.on("click",function(){j()})}]),angular.module("smcApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);