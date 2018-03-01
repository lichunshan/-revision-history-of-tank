var tankCanvas = document.getElementById("tankCanvas");
tankCanvas.width = 416;
tankCanvas.height = 416;
var tankctx = tankCanvas.getContext("2d");
var hero = new HeroTank(tankctx,0,0,1,1);
hero.draw();