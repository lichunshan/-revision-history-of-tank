// 坦克基类
function Tank(){
	this.ctx = window.ctx;//画布
	this.x = 0;//坐标
	this.y = 0;
	this.type = "tank";//这是一个坦克
	this.times = 0;//控制坦克出现前的效果绘制节奏
	this.speed = 1;//速度
	this.lives = 1;//生命
	this.bullets = [];//子弹数组
	this.size = 32;//尺寸
	this.dir = UP;//方向
	this.health = 1;//血量
	this.hurt = 1;//伤害
	this.protectTime = 15;//受保护时间
	this.isAI = false;//是否是自动的
	this.isHit = false;//是否碰撞了
	this.isDestroy = false;//是否爆炸
	this.isProtect = true;//是否受保护
	this.isShooting = false;//是否正在射击
	this.isAppear = false;

	this.draw = function(){
	}
	//传入tank_tag用于识别玩家的两个坦克
	this.move = function(tank_tag){
		if(p == 1 && !tank_tag){
			switch(event.keyCode){
			case 87://上
				this.dir = UP;
				this.y -= this.speed;
				isCollisionBorder(hero_tank_arr);
			break;
			case 68://右
				this.dir = RIGHT;
				this.x += this.speed;
				isCollisionBorder(hero_tank_arr);
			break;
			case 83://下
				this.dir = DOWN;
				this.y += this.speed;
				isCollisionBorder(hero_tank_arr);
			break;
			case 65://左
				this.dir = LEFT;
				this.x -= this.speed;
				isCollisionBorder(hero_tank_arr);
			break;
		}
		}else if(p ==2 && tank_tag){
			if(tank_tag == 1){
				switch(event.keyCode){
					case 87://上
						this.dir = UP;
						this.y -= this.speed;
					break;
					case 68://右
						this.dir = RIGHT;
						this.x += this.speed;
					break;
					case 83://下
						this.dir = DOWN;
						this.y += this.speed;
					break;
					case 65://左
						this.dir = LEFT;
						this.x -= this.speed;
					break;
				}
			}else if(tank_tag == 2){
				switch(event.keyCode){
					case 38://上
						this.dir = UP;
						this.y -= this.speed;
					break;
					case 39://右
						this.dir = RIGHT;
						this.x += this.speed;
					break;
					case 40://下
						this.dir = DOWN;
						this.y += this.speed;
					break;
					case 37://左
						this.dir = LEFT;
						this.x -= this.speed;
					break;
				}
			}
		}
	}
	this.shoot = function(){
		if(event.keyCode == 32){
			// alert(1);
			if(!this.isShooting){
				var bullet = new Bullet(this);
				bullet.draw();
				bullet.move();
				this.isShooting = true;
				this.bullets.push(bullet);
			}
		}
	}
	this.destroy = function(){

	}

}
/**
*pos 为传入的玩家坦克初始位置
*tank_tag 用于区分两个坦克
*/
function Hero(pos,tank_tag){
	this.ctx = window.ctx;
	this.x = pos[0];
	this.y = pos[1];
	this.speed = 3;
	this.lives = 3;
	this.grade = 1;//坦克等级
	this.draw = function(){
		// 坦克出现之前的画面
		if(!this.isAppear){
			this.times++;
			// console.log(this.times);
			var index = parseInt(this.times/7);
			if(this.times < 48){
					this.ctx.drawImage(SOURCE_IMG,STARS[0]+index*this.size,STARS[1],this.size,this.size,this.x+OFFSET_X,this.y+OFFSET_Y,this.size,this.size);
			}else{
				this.isAppear = true;
				this.times = 0;
			}
			console.log("end");
		}else{	
				if(p == 1 && !tank_tag){
					this.ctx.drawImage(SOURCE_IMG,PLAYERS[0][0]+this.dir*this.size,PLAYERS[0][1],this.size,this.size,this.x+OFFSET_X,this.y+OFFSET_Y,this.size,this.size);
				}else if(p == 2 && tank_tag){
					if(tank_tag == 1){
						this.ctx.drawImage(SOURCE_IMG,PLAYERS[0][0]+this.dir*this.size,PLAYERS[0][1],this.size,this.size,this.x+OFFSET_X,this.y+OFFSET_Y,this.size,this.size);
					}else if(tank_tag == 2){
						this.ctx.drawImage(SOURCE_IMG,PLAYERS[1][0]+this.dir*this.size,PLAYERS[1][1],this.size,this.size,this.x+OFFSET_X,this.y+OFFSET_Y,this.size,this.size);
					}
				}	
		}
		
	}
}
Hero.prototype = new Tank();
