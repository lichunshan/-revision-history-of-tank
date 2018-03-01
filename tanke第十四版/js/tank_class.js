// 坦克基类
function Tank(){
	this.ctx = window.ctx;//画布
	this.x = 0;//坐标
	this.y = 0;
	this.type = "tank";//这是一个坦克
	this.times = 0;//控制坦克出现前的效果绘制节奏
	this.protag = 0;//控制坦克保护动画节奏
	this.timer1 = null;//坦克爆炸效果定时器
	this.moveTimer = null;
	this.enemyStopTimer = null;//暂停奖励的定时器
	this.isMove = false;
	this.speed = 1;//速度
	this.lives = 1;//生命
	this.bullets = [];//子弹数组
	this.size = 32;//尺寸
	this.dir = UP;//方向
	this.health = 1;//血量
	this.hurt = 1;//伤害
	this.shootSum = 0;//开枪的概率
	this.protectTime = 15;//受保护时间
	this.isStop = false;//坦克没有被静止
	//this.isAI = false;//是否是自动的
	this.isHit = false;//是否碰撞了
	this.isDestroy = false;//是否爆炸
	this.isProtect = true;//是否受保护
	this.isAttack = false;//坦克是否被攻击
	this.isShooting = false;//是否正在射击
	// this.isAppear = false;

	this.draw = function(){
	}
	//传入tank_tag用于识别玩家的两个坦克
	this.move = function(tank_tag){
		if(this.isAppear || this.isStop){
			 console.log(3);
			// console.log(this.isAI);
			if(this.isAI){
				 console.log("2");
				this.moveTimer = setInterval(()=>{
					switch(this.dir){
					case UP:
						this.dir = UP;
						this.y -= this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
					case RIGHT:
						this.dir = RIGHT;
						this.x += this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
					case DOWN:
						this.dir = DOWN;
						this.y += this.speed;
						console.log("ai");
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
					case LEFT:
						this.dir = LEFT;
						this.x -= this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
				}
				},100);
				this.isStop = false;
		}else{
			if(p == 1 && !tank_tag){
				switch(keyArr[keyArr.length-1]){
						case 87:
						if(this.dir!=UP){
							clearInterval(this.moveTimer);
						}
						this.dir = UP;
						if(!this.moveTimer){
							this.moveTimer = setInterval(()=>{
		 					this.y -= this.speed;
		 					this.isCollisionBorder();
							this.isCollisionWall(window[map.stage]);
							this.isCollisionAward();
						},30);
						}
						break;
						case 68:
						if(this.dir!=RIGHT){
							clearInterval(this.moveTimer);
						}
						this.dir = RIGHT;
						if(!this.moveTimer){
							this.moveTimer = setInterval(()=>{
					 		this.x += this.speed;
					 		this.isCollisionBorder();
					 		this.isCollisionWall(window[map.stage]);
					 		this.isCollisionAward();
						},30);
						}
						break;
						case 83:
						if(this.dir!=DOWN){
							clearInterval(this.moveTimer);
						}
						this.dir = DOWN;
						if(!this.moveTimer){
							this.moveTimer = setInterval(()=>{
					 		this.y += this.speed;
					 		this.isCollisionBorder();
					 		this.isCollisionWall(window[map.stage]);
					 		this.isCollisionAward();
						},30);
						}
						break;
						case 65:
						if(this.dir!=LEFT){
							clearInterval(this.moveTimer);
						}
						this.dir = LEFT;
						if(!this.moveTimer){
							this.moveTimer = setInterval(()=>{
							this.x -= this.speed;
					 		this.isCollisionBorder();
					 		this.isCollisionWall(window[map.stage]);
					 		this.isCollisionAward();
						},30);
						}
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
		}
	}
	// 发射子弹
	this.shoot = function(){
		if(this.isAI){
			this.shootSum = parseInt(Math.random()*100);
			if(this.shootSum>14&&this.shootSum<18){
				var bullet = new Bullet(this);
				bullet.owner = this;
				// bullet.draw();
				 bullet.move();
				 this.isShooting = true;
				 this.bullets.push(bullet);
			}
		}else{
		// 	if(event.keyCode == 32){
		// 	// alert(1);
		// 	if(!this.isShooting){
		// 		var bullet = new Bullet(this);
		// 		bullet.owner = this;
		// 		bullet.draw();
		// 		bullet.move();
		// 		this.isShooting = true;
		// 		this.bullets.push(bullet);
		// 	}
		// }
		for(var j=0;j<keyArr.length;j++){
			if(keyArr[j]==32&&!this.isShooting){
				var bullet = new Bullet(this);
				bullet.owner = this;
				bullet.draw();
				bullet.move();
				this.isShooting = true;
				this.bullets.push(bullet);
			}
		}
		}
	}
	this.destroy = function(){
		this.timer1 = setInterval(()=>{
			// this.times++;
		if(!this.isDestroy){
			var index = parseInt(this.times%3);
			if(parseInt(this.times/6) <6 ){
				switch(this.dir){
					case UP:
						this.ctx.drawImage(SOURCE_IMG,TANK_BLOW[0]+index*70,TANK_BLOW[1],64,64,this.x+6,this.y,64,64);
					break;
					case DOWN:
						this.ctx.drawImage(SOURCE_IMG,TANK_BLOW[0]+index*70,TANK_BLOW[1],64,64,this.x+6,this.y,64,64);
					break;
					case LEFT:
						this.ctx.drawImage(SOURCE_IMG,TANK_BLOW[0]+index*70,TANK_BLOW[1],64,64,this.x+6,this.y,64,64);
					break;
					case RIGHT:
						this.ctx.drawImage(SOURCE_IMG,TANK_BLOW[0]+index*70,TANK_BLOW[1],64,64,this.x+6,this.y,64,64);
					break;
				}
				this.times++;
			}else{
				this.isDestroy = true;
				// tankobj.isShooting = false;
				clearInterval(this.timer1);
			}
		}})
	}
	//检测是否发生边界碰撞
	this.isCollisionBorder = function(){
			if(this.y+OFFSET_Y < OFFSET_Y){
				this.y = 0;
				if(this.isAI){
					this.isHit = true;
				}
			} 
			if(this.y +OFFSET_Y > OFFSET_Y + BATTLE_FIELD_H-this.size){
				this.y = BATTLE_FIELD_H-this.size-1;
				if(this.isAI){
					this.isHit = true;
				}
			}
			if(this.x +OFFSET_X < OFFSET_X){
				this.x = 0;
				if(this.isAI){
					this.isHit = true;
				}
			}
			if(this.x + OFFSET_X > OFFSET_X + BATTLE_FIELD_W-this.size){
				// alert(1);
				this.x = BATTLE_FIELD_W-this.size;
				if(this.isAI){
					this.isHit = true;
				}
			}
			if(this.isAI&&this.isHit){
					var fangxiang = parseInt(Math.random()*4);
					// console.log(fangxiang);
					switch(fangxiang){
						case 0:
							this.dir = UP;
							// alert(12);
							break;
						case 1:
							this.dir = DOWN;
							break;
						case 2:
							this.dir = LEFT;
							break;
						case 3:
							this.dir = RIGHT;
							break;

					}
					this.isHit = false;
					// alert(212);
		}
	}
	//检测我方是否与砖块发生碰撞
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
		var L_CENTER_X = parseInt((this.x) / 16);//左侧中间点
		var L_CENTER_Y = parseInt((this.y+16) / 16);
		var R_CENTER_X = parseInt((this.x+32)/16);//右侧中间点
		var R_CENTER_Y = parseInt((this.y+16) / 16);
		var T_CENTER_X = parseInt((this.x+16) / 16);//上面中间点
		var T_CENTER_Y = parseInt((this.y) / 16);
		var B_CENTER_X = parseInt((this.x+16) / 16);//下面中间点
		var B_CENTER_Y = parseInt((this.y+32)/16);
 		switch(this.dir){
				case UP:
				//验证左上角
					if(map[tempIndex_Y][tempIndex_X]!=3&&map[tempIndex_Y][tempIndex_X]!=5&&map[tempIndex_Y][tempIndex_X]!=9&&map[tempIndex_Y][tempIndex_X]!=0){
						this.y = (tempIndex_Y+1) * 16;
						if(this.isAI&&map[tempIndex_Y][tempIndex_X]){
							this.isHit = true;
						}
					}
				//验证右上角
					if(map[tempIndex_R_Y][tempIndex_R_X]!=3&&map[tempIndex_R_Y][tempIndex_R_X]!=5&&map[tempIndex_R_Y][tempIndex_R_X]!=9&&map[tempIndex_R_Y][tempIndex_R_X]!=0){
						this.y = (tempIndex_R_Y+1) * 16;
						if(this.isAI&&map[tempIndex_R_Y][tempIndex_R_X]){
							this.isHit = true;
						}
					}
				//验证上面中间点
				if(map[T_CENTER_Y][T_CENTER_X]!=3&&map[T_CENTER_Y][T_CENTER_X]!=5&&map[T_CENTER_Y][T_CENTER_X]!=9&&map[T_CENTER_Y][T_CENTER_X]!=0){
						this.y = (T_CENTER_Y+1) * 16;
						if(this.isAI&&map[T_CENTER_Y][T_CENTER_X]){
							this.isHit = true;
						}
					}
				break;
				case DOWN:
					//左下角的点
					if(map[tempIndex_B_L_Y][tempIndex_B_L_X]!=3&&map[tempIndex_B_L_Y][tempIndex_B_L_X]!=5&&map[tempIndex_B_L_Y][tempIndex_B_L_X]!=9&&map[tempIndex_B_L_Y][tempIndex_B_L_X]!=0){
						this.y = (tempIndex_Y-2)*16+32;
						if(this.isAI&&map[tempIndex_B_L_Y][tempIndex_B_L_X]){
							// alert(2);
							this.isHit = true;
						}
					}
					// 右下角的点
					if(map[tempIndex_B_L_Y][tempIndex_B_R_X]!=3&&map[tempIndex_B_L_Y][tempIndex_B_R_X]!=5&&map[tempIndex_B_L_Y][tempIndex_B_R_X]!=9&&map[tempIndex_B_L_Y][tempIndex_B_R_X]!=0){
						this.y = (tempIndex_Y-2)*16+32;
						if(this.isAI&&map[tempIndex_B_L_Y][tempIndex_B_R_X]){
							this.isHit = true;
						}
					}
					//验证下面中间点
					if(B_CENTER_Y<=25&&map[B_CENTER_Y][B_CENTER_X]!=3&&map[B_CENTER_Y][B_CENTER_X]!=5&&map[B_CENTER_Y][B_CENTER_X]!=9&&map[B_CENTER_Y][B_CENTER_X]!=0){
						this.y = (T_CENTER_Y-2)*16+32;
						if(this.isAI&&map[B_CENTER_Y][B_CENTER_X]){
							this.isHit = true;
						}
					}
				break;
				case LEFT:
				//左上角
					if(map[tempIndex_Y][tempIndex_X]!=3&&map[tempIndex_Y][tempIndex_X]!=5&&map[tempIndex_Y][tempIndex_X]!=9&&map[tempIndex_Y][tempIndex_X]!=0){
							this.x = (tempIndex_X+1) * 16;
							if(this.isAI&&map[tempIndex_Y][tempIndex_X]){
							this.isHit = true;
						}
						}
				//左下角
					if(map[tempIndex_B_L_Y][tempIndex_B_L_X]!=3&&map[tempIndex_B_L_Y][tempIndex_B_L_X]!=5&&map[tempIndex_B_L_Y][tempIndex_B_L_X]!=9&&map[tempIndex_B_L_Y][tempIndex_B_L_X]!=0){
						this.x = (tempIndex_X+1) * 16;
						if(this.isAI&&map[tempIndex_B_L_Y][tempIndex_B_L_X]){
							this.isHit = true;
						}
					}
					//验证左面中间点
					if(map[L_CENTER_Y][L_CENTER_X]!=3&&map[L_CENTER_Y][L_CENTER_X]!=5&&map[L_CENTER_Y][L_CENTER_X]!=9&&map[L_CENTER_Y][L_CENTER_X]!=0){
						this.x = (L_CENTER_X+1) * 16;
						if(this.isAI&&map[L_CENTER_Y][L_CENTER_X]){
							this.isHit = true;
						}
					}
				break;
				case RIGHT:
					//验证右上角
					if(map[tempIndex_R_Y][tempIndex_R_X]!=3&&map[tempIndex_R_Y][tempIndex_R_X]!=5&&map[tempIndex_R_Y][tempIndex_R_X]!=9&&map[tempIndex_R_Y][tempIndex_R_X]!=0){
						this.x = (tempIndex_R_X-2) * 16;
						if(this.isAI&&map[tempIndex_R_Y][tempIndex_R_X]){
							this.isHit = true;
						}
					}
					// 右下角的点
					if(map[tempIndex_B_L_Y][tempIndex_B_R_X]!=3&&map[tempIndex_B_L_Y][tempIndex_B_R_X]!=5&&map[tempIndex_B_L_Y][tempIndex_B_R_X]!=9&&map[tempIndex_B_L_Y][tempIndex_B_R_X]!=0){
						this.x = (tempIndex_R_X-2) * 16;
						if(this.isAI&&map[tempIndex_B_L_Y][tempIndex_B_R_X]){
							this.isHit = true;
						}
					}
					//验证右面中间点
					if(map[R_CENTER_Y][R_CENTER_X]!=3&&map[R_CENTER_Y][R_CENTER_X]!=5&&map[R_CENTER_Y][R_CENTER_X]!=9&&map[R_CENTER_Y][R_CENTER_X]!=0){
						this.x = (R_CENTER_X-2) * 16;
						if(this.isAI&&map[R_CENTER_Y][R_CENTER_X]){
							this.isHit = true;
						}
					}
				break;
			}
			if(this.isAI&&this.isHit){
						var fangxiang = parseInt(Math.random()*4);
						// console.log(fangxiang);
						switch(fangxiang){
							case 0:
								this.dir = UP;
								// alert(12);
								break;
							case 1:
								this.dir = DOWN;
								break;
							case 2:
								this.dir = LEFT;
								break;
							case 3:
								this.dir = RIGHT;
								break;

						}
						this.isHit = false;
						// alert(212);
			}
	}
	//检测坦克是否与奖励发生碰撞
	this.isCollisionAward = function(){
		if(awardArr[0]){
			var tempIndex_X = this.x+OFFSET_X;//坦克左上角坐标对应的地图块
			var tempIndex_Y = this.y+OFFSET_Y;
			var tempIndex_R_X = this.x+32+OFFSET_X;//右上角的砖块坐标
			var tempIndex_R_Y = this.y+OFFSET_Y;
			var tempIndex_B_L_X = tempIndex_X;//左下角
			var tempIndex_B_L_Y = this.y+32+OFFSET_Y;
			var tempIndex_B_R_X = this.x+32+OFFSET_X;//右下角
			var tempIndex_B_R_Y = tempIndex_B_L_Y;
			switch(this.dir){
				case UP:
					if(tempIndex_X>awardArr[0].x&&tempIndex_X<awardArr[0].x+awardArr[0].size&&tempIndex_Y>awardArr[0].y&&tempIndex_Y<awardArr[0].y+awardArr[0].size){
						awardArr[0].isHit = true;
					}
					if(tempIndex_R_X>awardArr[0].x&&tempIndex_R_X<awardArr[0].x+awardArr[0].size&&tempIndex_R_Y>awardArr[0].y&&tempIndex_R_Y<awardArr[0].y+awardArr[0].size){
						awardArr[0].isHit = true;
					}
				break;
				case DOWN:
					if(tempIndex_B_L_X>awardArr[0].x&&tempIndex_B_L_X<awardArr[0].x+awardArr[0].size&&tempIndex_B_L_Y>awardArr[0].y&&tempIndex_B_L_Y<awardArr[0].y+awardArr[0].size){
						awardArr[0].isHit = true;
					}
					if(tempIndex_B_R_X>awardArr[0].x&&tempIndex_B_R_X<awardArr[0].x+awardArr[0].size&&tempIndex_B_R_Y>awardArr[0].y&&tempIndex_B_R_Y<awardArr[0].y+awardArr[0].size){
						awardArr[0].isHit = true;
					}
				break;
				case LEFT:
					if(tempIndex_X>awardArr[0].x&&tempIndex_X<awardArr[0].x+awardArr[0].size&&tempIndex_Y>awardArr[0].y&&tempIndex_Y<awardArr[0].y+awardArr[0].size){
						awardArr[0].isHit = true;
					}
					if(tempIndex_B_L_X>awardArr[0].x&&tempIndex_B_L_X<awardArr[0].x+awardArr[0].size&&tempIndex_B_L_Y>awardArr[0].y&&tempIndex_B_L_Y<awardArr[0].y+awardArr[0].size){
						awardArr[0].isHit = true;
					}
				break;
				case RIGHT:
					if(tempIndex_R_X>awardArr[0].x&&tempIndex_R_X<awardArr[0].x+awardArr[0].size&&tempIndex_R_Y>awardArr[0].y&&tempIndex_R_Y<awardArr[0].y+awardArr[0].size){
						awardArr[0].isHit = true;
					}
					if(tempIndex_B_R_X>awardArr[0].x&&tempIndex_B_R_X<awardArr[0].x+awardArr[0].size&&tempIndex_B_R_Y>awardArr[0].y&&tempIndex_B_R_Y<awardArr[0].y+awardArr[0].size){
						awardArr[0].isHit = true;
					}
				break;
			}
			if(awardArr[0].isHit == true){
						switch(awardArr[0].type){
							case "addlife":
								this.lives++;
							break;
							case "stopenemy":
								this.enemyStopTimer = setInterval(()=>{
									for(var k=0;k<enemy_tank_arr.length;k++){
										clearInterval(enemy_tank_arr[k].moveTimer);
										if(enemy_tank_arr[k].bullets.length>0){
											clearInterval(enemy_tank_arr[k].bullets[0].timer);
										}
										enemy_tank_arr[k].isMove = false;
									}
								},30);
								setTimeout(()=>{
									clearInterval(this.enemyStopTimer);
									for(var k=0;k<enemy_tank_arr.length;k++){
										enemy_tank_arr[k].isStop = true;
										enemy_tank_arr[k].isMove = true;
										if(enemy_tank_arr[k].bullets.length>0){
											enemy_tank_arr[k].bullets[0].isStop = true;
										}
									}

								},10000);

							break;
							case "armshome":
									window["map"+stage][23][11]=2;
									window["map"+stage][23][12]=2;
									window["map"+stage][23][13]=2;
									window["map"+stage][23][14]=2;
									window["map"+stage][24][11]=2;
									window["map"+stage][24][14]=2;
									window["map"+stage][25][11]=2;
									window["map"+stage][25][14]=2;
								setTimeout(()=>{
									if(window["map"+stage][23][11]==2){
									window["map"+stage][23][11]=1;
									}
									if(window["map"+stage][23][12]==2){
										window["map"+stage][23][12]=1;
									}
									if(window["map"+stage][23][13]==2){
										window["map"+stage][23][13]=1;
									}
									if(window["map"+stage][23][14]==2){
										window["map"+stage][23][14]=1;
									}
									if(window["map"+stage][24][11]==2){
										window["map"+stage][24][11]=1;
									}
									if(window["map"+stage][24][14]==2){
										window["map"+stage][24][14]=1;
									}
									if(window["map"+stage][25][11]==2){
										window["map"+stage][25][11]=1;
									}
									if(window["map"+stage][25][14]==2){
										window["map"+stage][25][14]=1;
									}
								},15000);
							break;
							case "bomb":
								for(var k=0;k<enemy_tank_arr.length;k++){
									enemy_tank_arr[k].isAttack = true;
								}
							break;
							case "star":
							if(this.hurt<3){
								this.hurt++;
							}
							break;
							case "protect":
								this.isProtect = true;
								setTimeout(()=>{
									this.isProtect = false;
								},15000);
							break;
						}
						awardArr[0].isHit == true
						awardArr.length = 0;
			}
		}
	}
	//检测坦克与坦克碰撞
	// this.isCollisionTank = function(){
	// 	switch(this.dir){
	// 		case UP:
				
	// 		break;
	// 		case DOWN:
	// 		break;
	// 		case LEFT:
	// 		break;
	// 		case RIGHT:
	// 		break;
	// 	}
	// }

}

function SelectTank(){
	this.ctx = window.ctx;
	// alert(this.ctx);
	this.x = SELECT_TANK1[0];
	this.y = SELECT_TANK1[1];
	this.draw = function(){
		this.ctx.drawImage(SOURCE_IMG,SELECT_TANK_POS1[0],SELECT_TANK_POS1[1],32,28,this.x,this.y,32,28);
	}
}
SelectTank.prototype = new Tank();
/**
*pos 为传入的玩家坦克初始位置
*tank_tag 用于区分两个坦克
*/
function Hero(pos,tank_tag){
	this.ctx = window.ctx;
	this.x = pos[0];
	this.y = pos[1];
	this.speed = 2;
	this.lives = 3;
	this.grade = 1;//坦克等级
	this.isAI = false;
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
				setTimeout(function(){
				if(tank){
					tank.isProtect = false;
				}
				// alert("没了");
				},3000);
			}
		}else{	
				if(p == 1 && !tank_tag){
					if(this.isProtect){
						// this.protag++;
						this.times = parseInt(this.protag++/4)%2;
						 // alert(this.times);
						this.ctx.drawImage(SOURCE_IMG,PLAYERS[0][0]+this.dir*this.size,PLAYERS[0][1],this.size,this.size,this.x+OFFSET_X,this.y+OFFSET_Y,this.size,this.size);
						if(this.times==0){
							this.ctx.drawImage(SOURCE_IMG,PROTECT[0],PROTECT[1],32,32,this.x+OFFSET_X,this.y+OFFSET_Y,32,32);
							
						}else{
							// alert("hello");
							this.ctx.drawImage(SOURCE_IMG,PROTECT[0],PROTECT[1]+32,32,32,this.x+OFFSET_X,this.y+OFFSET_Y,32,32);
						}
					}else{
						this.ctx.drawImage(SOURCE_IMG,PLAYERS[0][0]+this.dir*this.size,PLAYERS[0][1],this.size,this.size,this.x+OFFSET_X,this.y+OFFSET_Y,this.size,this.size);
					}
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
//第一种类型敌方坦克
function EnemyTank1(){
	this.ctx = window.ctx;
	this.score = 10;
	this.dir = DOWN;
	this.speed = 2;
	this.health = 1;
	this.type = "enemy";
	this.isMove = true;
	this.isAI = true;
	this.isAppear = false;
	this.moveTimer = null;
	this.posnum = parseInt(Math.random()*3);
	this.isStop = false;
	this.draw = function(){
		//随机刷新位置下标
		// var posnum = parseInt(Math.random()*3);
		if(!this.isAppear){
			this.times++;
			var index = parseInt(this.times/3);
			if(this.times < 20){
					this.ctx.drawImage(SOURCE_IMG,STARS[0]+index*this.size,STARS[1],this.size,this.size,ENEMYPOS[this.posnum]+OFFSET_X,this.y+OFFSET_Y,this.size,this.size);
					this.x = ENEMYPOS[this.posnum];
			}else{
				this.isAppear = true;
				this.times = 0;
			}
		}else{
			this.ctx.drawImage(SOURCE_IMG,ENEMYTANK1[0]+this.size*this.dir,ENEMYTANK1[1],this.size,this.size,this.x+OFFSET_X,this.y+OFFSET_Y,this.size,this.size);
		}
	}
	this.move = function(){
		if(this.isAppear || this.isStop){
			 // alert(this.isMove);
			if(this.isAI&&this.isMove){
				// alert(1);
			this.moveTimer = setInterval(()=>{
					switch(this.dir){
					case UP:
						this.y -= this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
					case RIGHT:
						this.x += this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
					case DOWN:
						this.y += this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
					case LEFT:
						this.x -= this.speed;
						// console.log(this.x);
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
				}
				},30);
			this.isMove = false;
		}
		}
	}

}
EnemyTank1.prototype = new Tank();
//第二种敌方坦克类型
function EnemyTank2(){
	this.ctx = window.ctx;
	this.score = 20;
	this.dir = DOWN;
	this.speed = 1;
	this.type = "enemy";
	this.health = 1;
	this.isMove = true;
	this.isAI = true;
	this.isAppear = false;
	this.moveTimer = null;
	this.posnum = parseInt(Math.random()*3);
	this.isStop = false;
	this.draw = function(){
		//随机刷新位置下标
		// var posnum = parseInt(Math.random()*3);
		if(!this.isAppear){
			this.times++;
			var index = parseInt(this.times/3);
			if(this.times < 20){
					this.ctx.drawImage(SOURCE_IMG,STARS[0]+index*this.size,STARS[1],this.size,this.size,ENEMYPOS[this.posnum]+OFFSET_X,this.y+OFFSET_Y,this.size,this.size);
					this.x = ENEMYPOS[this.posnum];
			}else{
				this.isAppear = true;
				this.times = 0;
			}
		}else{
			this.ctx.drawImage(SOURCE_IMG,ENEMYTANK2[0]+this.size*this.dir,ENEMYTANK2[1],this.size,this.size,this.x+OFFSET_X,this.y+OFFSET_Y,this.size,this.size);
		}
	}
	this.move = function(){
		if(this.isAppear || this.isStop){
			if(this.isAI&&this.isMove){
			this.moveTimer = setInterval(()=>{
					switch(this.dir){
					case UP:
						this.y -= this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
					case RIGHT:
						this.x += this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
					case DOWN:
						this.y += this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
					case LEFT:
						this.x -= this.speed;
						// console.log(this.x);
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
				}
				
				},30);
			this.isMove = false;
		}
		}
	}

}
EnemyTank2.prototype = new Tank();
//第三种敌方坦克类型
function EnemyTank3(){
	this.ctx = window.ctx;
	this.score = 30;
	this.dir = DOWN;
	this.speed = 1;
	this.health = 1;
	this.type = "enemy";
	this.isMove = true;
	this.isAI = true;
	this.isAppear = false;
	this.moveTimer = null;
	this.posnum = parseInt(Math.random()*3);
	this.isStop = false;
	this.draw = function(){
		//随机刷新位置下标
		// var posnum = parseInt(Math.random()*3);
		if(!this.isAppear){
			this.times++;
			var index = parseInt(this.times/3);
			if(this.times < 20){
					this.ctx.drawImage(SOURCE_IMG,STARS[0]+index*this.size,STARS[1],this.size,this.size,ENEMYPOS[this.posnum]+OFFSET_X,this.y+OFFSET_Y,this.size,this.size);
					this.x = ENEMYPOS[this.posnum];
			}else{
				this.isAppear = true;
				this.times = 0;
			}
		}else{
			this.ctx.drawImage(SOURCE_IMG,ENEMYTANK3[0]+this.size*this.dir,ENEMYTANK3[1],this.size,this.size,this.x+OFFSET_X,this.y+OFFSET_Y,this.size,this.size);
		}
	}
	this.move = function(){
		if(this.isAppear || this.isStop){
			if(this.isAI&&this.isMove){
			this.moveTimer = setInterval(()=>{
					switch(this.dir){
					case UP:
						this.y -= this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
					case RIGHT:
						this.x += this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
					case DOWN:
						this.y += this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
					case LEFT:
						this.x -= this.speed;
						// console.log(this.x);
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
					break;
				}
				
				},30);
			this.isMove = false;
		}
		}
	}

}
EnemyTank3.prototype = new Tank();