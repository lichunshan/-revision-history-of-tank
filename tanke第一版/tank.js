var TANK_TYPES = [0,32,64];
document.body.style.background = "pink";
var canvas = document.getElementById("canvas");
canvas.width = 416;
canvas.height = 416;
canvas.style.background = "black";
var ctx = canvas.getContext("2d");

function Tank(){
	this.ctx = ctx;
	this.size = 32;
	this.dir = 0;
	this.x = 0;
	this.y = 0;
	this.lives = 0;
	this.type = TANK_TYPES;
	this.speed = 3;
	this.draw = ()=>{
		var source_image = new Image();
		source_image.src = './images/tankAll.gif';
		source_image.onload = ()=>{
			// 需要根据方向判断绘制的图形
			switch(this.dir){
				case 0:
				this.ctx.drawImage(source_image,this.dir*this.size,this.type[2],this.size,this.size,this.x,this.y,this.size,this.size);
				break;
				case 3:
				this.ctx.drawImage(source_image,this.dir*this.size,0,this.size,this.size,this.x,this.y,this.size,this.size);				break;
				case 1:
				this.ctx.drawImage(source_image,this.dir*this.size,0,this.size,this.size,this.x,this.y,this.size,this.size);				break;
				case 2:
				this.ctx.drawImage(source_image,this.dir*this.size,0,this.size,this.size,this.x,this.y,this.size,this.size);				break;
			}
			
		}
		
	}
	this.move = ()=>{
		switch(event.keyCode){
		case 87:
		this.dir = 0;
		this.y -= this.speed;
		break;
		case 68:
		this.dir = 3;
		this.x += this.speed;
		break;
		case 83:
		this.dir = 1;
		this.y += this.speed;
		break;
		case 65:
		this.dir = 2;
		this.x -= this.speed;
		break;
	}
	}
}

	function Hero(){
		
		this.dir = 0;
		this.lives = 3;
		this.speed = 3;
		this.type = TANK_TYPES[0];
		this.draw = ()=>{
			var source_image = new Image();
			source_image.src = './images/tankAll.gif';
			source_image.onload = ()=>{
				// 需要根据方向判断绘制的图形
				switch(this.dir){
					case 0:
					this.ctx.drawImage(source_image,this.dir*this.size,this.type[0],this.size,this.size,this.x,this.y,this.size,this.size);
					break;
					case 3:
					this.ctx.drawImage(source_image,this.dir*this.size,this.type[0],this.size,this.size,this.x,this.y,this.size,this.size);				break;
					case 1:
					this.ctx.drawImage(source_image,this.dir*this.size,this.type[0],this.size,this.size,this.x,this.y,this.size,this.size);				break;
					case 2:
					this.ctx.drawImage(source_image,this.dir*this.size,this.type[0],this.size,this.size,this.x,this.y,this.size,this.size);				break;
				}
				
			}
			
		}
	}
	Hero.prototype = new Tank();
var tank = new Tank();
tank.draw();
document.body.onkeydown = (event)=>{
	tank.draw();
	ctx.clearRect(0,0,416,416);
	tank.move();
	tank.draw();
	
}