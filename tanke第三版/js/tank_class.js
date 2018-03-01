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
				this.isCollisionBorder();
				this.isCollisionWall(window[map.stage]);
			break;
			case 68://右
				this.dir = RIGHT;
				this.x += this.speed;
				this.isCollisionBorder();
				this.isCollisionWall(window[map.stage]);
			break;
			case 83://下
				this.dir = DOWN;
				this.y += this.speed;
				this.isCollisionBorder();
				this.isCollisionWall(window[map.stage]);
			break;
			case 65://左
				this.dir = LEFT;
				this.x -= this.speed;
				this.isCollisionBorder();
				this.isCollisionWall(window[map.stage]);
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
	// 发射子弹
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
	//检测是否发生边界碰撞
	this.isCollisionBorder = function(){
			if(this.y+OFFSET_Y < OFFSET_Y){
				this.y = 0;
			} 
			if(this.y +OFFSET_Y > OFFSET_Y + BATTLE_FIELD_H-this.size){
				this.y = BATTLE_FIELD_H-this.size;
			}
			if(this.x +OFFSET_X < OFFSET_X){
				this.x = 0;
			}
			if(this.x + OFFSET_X > OFFSET_X + BATTLE_FIELD_W-this.size){
				// alert(1);
				this.x = BATTLE_FIELD_W-this.size;
			}
	}
	//检测是否与砖块发生碰撞
	//参数map为地图数组 
	this.isCollisionWall = function(map){
		//坦克当前坐标对应的地图上的16*16小方块的索引
		// +--16--+--16--+
		// |		     |
		// +         +
		// |		     |	
		// +--16--+---16-+
		var overlap = 2;
		var tempIndex_X = parseInt((this.x+overlap) / 16);//坦克左上角坐标对应的地图块
		var tempIndex_Y = parseInt((this.y+overlap) / 16);
		var tempIndex_R_X = parseInt((this.x+32-overlap)/16);//右上角的砖块坐标
		var tempIndex_R_Y = parseInt((this.y+overlap) / 16);
		var tempIndex_B_L_X = tempIndex_X;//左下角
		var tempIndex_B_L_Y = parseInt((this.y+32-overlap)/16);
		var tempIndex_B_R_X = parseInt((this.x+32-overlap)/16);//右下角
		var tempIndex_B_R_Y = tempIndex_B_L_Y;
 		switch(this.dir){
				case UP:
				//验证左上角
					if(map[tempIndex_Y][tempIndex_X]!=3&&map[tempIndex_Y][tempIndex_X]!=5&&map[tempIndex_Y][tempIndex_X]!=9&&map[tempIndex_Y][tempIndex_X]!=0){
						this.y = (tempIndex_Y+1) * 16;
					}
				//验证右上角
					if(map[tempIndex_R_Y][tempIndex_R_X]!=3&&map[tempIndex_R_Y][tempIndex_R_X]!=5&&map[tempIndex_R_Y][tempIndex_R_X]!=9&&map[tempIndex_R_Y][tempIndex_R_X]!=0){
						this.y = (tempIndex_R_Y+1) * 16;
					}
				break;
				case DOWN:
					//左下角的点
					if(map[tempIndex_B_L_Y][tempIndex_B_L_X]!=3&&map[tempIndex_B_L_Y][tempIndex_B_L_X]!=5&&map[tempIndex_B_L_Y][tempIndex_B_L_X]!=9&&map[tempIndex_B_L_Y][tempIndex_B_L_X]!=0){
						this.y = (tempIndex_Y-2)*16+32;
					}
					// 右下角的点
					if(map[tempIndex_B_L_Y][tempIndex_B_R_X]!=3&&map[tempIndex_B_L_Y][tempIndex_B_R_X]!=5&&map[tempIndex_B_L_Y][tempIndex_B_R_X]!=9&&map[tempIndex_B_L_Y][tempIndex_B_R_X]!=0){
						this.y = (tempIndex_Y-2)*16+32;
					}
					
				break;
				case LEFT:
				//左上角
					if(map[tempIndex_Y][tempIndex_X]!=3&&map[tempIndex_Y][tempIndex_X]!=5&&map[tempIndex_Y][tempIndex_X]!=9&&map[tempIndex_Y][tempIndex_X]!=0){
							this.x = (tempIndex_X+1) * 16;
						}
				//左下角
					if(map[tempIndex_B_L_Y][tempIndex_B_L_X]!=3&&map[tempIndex_B_L_Y][tempIndex_B_L_X]!=5&&map[tempIndex_B_L_Y][tempIndex_B_L_X]!=9&&map[tempIndex_B_L_Y][tempIndex_B_L_X]!=0){
						this.x = (tempIndex_X+1) * 16;
					}
				break;
				case RIGHT:
					//验证右上角
					if(map[tempIndex_R_Y][tempIndex_R_X]!=3&&map[tempIndex_R_Y][tempIndex_R_X]!=5&&map[tempIndex_R_Y][tempIndex_R_X]!=9&&map[tempIndex_R_Y][tempIndex_R_X]!=0){
						this.x = (tempIndex_R_X-2) * 16;
					}
					// 右下角的点
					if(map[tempIndex_B_L_Y][tempIndex_B_R_X]!=3&&map[tempIndex_B_L_Y][tempIndex_B_R_X]!=5&&map[tempIndex_B_L_Y][tempIndex_B_R_X]!=9&&map[tempIndex_B_L_Y][tempIndex_B_R_X]!=0){
						this.x = (tempIndex_R_X-2) * 16;
					}
				break;
			}
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
			var index = parseInt(this.times/3);
			if(this.times < 20){
					this.ctx.drawImage(SOURCE_IMG,STARS[0]+index*this.size,STARS[1],this.size,this.size,this.x+OFFSET_X,this.y+OFFSET_Y,this.size,this.size);
			}else{
				this.isAppear = true;
				this.times = 0;
			}
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
