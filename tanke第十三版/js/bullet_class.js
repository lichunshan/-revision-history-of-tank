function Bullet(tankobj){
	this.ctx = window.ctx;
	this.x = tankobj.x;//这个是没有加上偏移量的坦克的坐标
	this.y = tankobj.y;//并不是子弹的真实坐标
	this.bullet_size = 6;
	this.dir = tankobj.dir;
	this.owner = null;//子弹的所有者
	this.speed = 1;
	this.type = "bullet";//这是一个子弹
	this.timer = null;//定时器标识
	this.timer1 = null;//爆炸效果定时器标识
	this.isHit = false;
	this.isDestroy = false;
	this.times = 0;
	this.isStop = false;
	//画子弹
	this.draw = function(){
		//根据坦克的方向画子弹
		switch(this.dir){
			case UP:
			var tempX = this.x+parseInt((tankobj.size-this.bullet_size)/2)+OFFSET_X;
			var tempY = this.y+OFFSET_Y;
				this.ctx.drawImage(SOURCE_IMG,BULLETS[0]+this.dir*this.bullet_size,BULLETS[1],this.bullet_size,this.bullet_size,tempX,tempY,this.bullet_size,this.bullet_size);
			break;
			case DOWN:
			var tempX = this.x+parseInt((tankobj.size-this.bullet_size)/2)+OFFSET_X;
			var tempY = this.y+tankobj.size+OFFSET_Y-5;
				this.ctx.drawImage(SOURCE_IMG,BULLETS[0]+this.dir*this.bullet_size,BULLETS[1],this.bullet_size,this.bullet_size,tempX,tempY,this.bullet_size,this.bullet_size);
			break;
			case LEFT:
			var tempX = this.x+OFFSET_X;
			var tempY = this.y+parseInt((tankobj.size-this.bullet_size)/2)+OFFSET_Y;
				this.ctx.drawImage(SOURCE_IMG,BULLETS[0]+this.dir*this.bullet_size,BULLETS[1],this.bullet_size,this.bullet_size,tempX,tempY,this.bullet_size,this.bullet_size);
			break;
			case RIGHT:
			var tempX = this.x+tankobj.size+OFFSET_X-5;
			var tempY = this.y+parseInt((tankobj.size-this.bullet_size)/2)+OFFSET_Y;
				this.ctx.drawImage(SOURCE_IMG,BULLETS[0]+this.dir*this.bullet_size,BULLETS[1],this.bullet_size,this.bullet_size,tempX,tempY,this.bullet_size,this.bullet_size);
			break;
		}
	}
	//子弹运动
	this.move = function(){
		//根据方向改变坐标
		switch(this.dir){
			case UP:
				this.timer = setInterval(()=>{
					console.log("子弹上移定时器");
					if(!this.isHit){
						this.y -= this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
						this.isCollisionTank(enemy_tank_arr);
						// this.isCollisionTank(hero_tank_arr);
					}else{
						clearInterval(this.timer);
					}
				},10);
			break;
			case DOWN:
				this.timer = setInterval(()=>{
					console.log("子弹下移定时器");
					if(!this.isHit){
						this.y +=this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
						this.isCollisionTank(enemy_tank_arr);
					}else{
						clearInterval(this.timer);
					}
				},10);
			break;
			case LEFT:
				this.timer = setInterval(()=>{
					console.log("子弹左移定时器");
					if(!this.isHit){
						this.x -= this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
						this.isCollisionTank(enemy_tank_arr);
					}else{	
						clearInterval(this.timer);
					}
				},10);
			break;
			case RIGHT:
				this.timer = setInterval(()=>{
					console.log("子弹右移定时器");
					if(!this.isHit){
						this.x += this.speed;
						this.isCollisionBorder();
						this.isCollisionWall(window[map.stage]);
						this.isCollisionTank(enemy_tank_arr);
					}else{
						clearInterval(this.timer);
					}
				},10);
			break;
		}
	}
	//子弹爆炸
	this.destroy = function(){
		this.timer1 = setInterval(()=>{
			this.times++;
		if(!this.isDestroy){
			var index = parseInt(this.times/2);
			if(this.times < 6){
				switch(this.dir){
					case UP:
						this.ctx.drawImage(SOURCE_IMG,BULLET_BLOW[0]+index*32,BULLET_BLOW[1],32,32,this.x-16+32+16,this.y,32,32);
					break;
					case DOWN:
						this.ctx.drawImage(SOURCE_IMG,BULLET_BLOW[0]+index*32,BULLET_BLOW[1],32,32,this.x-16+32+16,this.y+32,32,32);
					break;
					case LEFT:
						this.ctx.drawImage(SOURCE_IMG,BULLET_BLOW[0]+index*32,BULLET_BLOW[1],32,32,this.x+16,this.y+16,32,32);
					break;
					case RIGHT:
						this.ctx.drawImage(SOURCE_IMG,BULLET_BLOW[0]+index*32,BULLET_BLOW[1],32,32,this.x+32+16,this.y+16,32,32);
					break;
				}
				this.times++;
			}else{
				this.isDestroy = true;
				tankobj.isShooting = false;
				clearInterval(this.timer1);
			}
		}
		},30);	
	}
	//检测是否与边界发生碰撞
	this.isCollisionBorder = function(){
		if(this.y+OFFSET_Y < OFFSET_Y){
			this.y = 0;
			this.isHit = true;
		}
		if(this.y > 416-32){
			this.y = 416-32;
			this.isHit = true;
		}
		if(this.x < 0){
			this.x = 0;
			this.isHit = true;
		}
		if(this.x > 416-32){
			this.x = 416-32;
			this.isHit = true;
		}
	}
	//检测是否与砖块发生碰撞
	//参数map为二维地图数组
	this.isCollisionWall = function(map){
		var overlap = 2;
		var temp_T_L_X,temp_T_L_Y,temp_T_R_X,temp_T_R_Y,temp_B_L_X,temp_B_L_Y,temp_B_R_X,temp_B_R_Y;
		switch(this.dir){
			case UP:
				temp_T_L_X = parseInt((this.x+13)/16);
				temp_T_L_Y = parseInt((this.y-6)/16);

				temp_T_R_X = parseInt((this.x+16+3)/16);
				temp_T_R_Y = parseInt((this.y-6)/16);
				// 检测左上角
				if(map[temp_T_L_Y][temp_T_L_X]==1||map[temp_T_L_Y][temp_T_L_X]==2||map[temp_T_L_Y][temp_T_L_X]==9||map[temp_T_L_Y][temp_T_L_X]==8){
					this.y = (temp_T_L_Y+1)*16;
					clearInterval(this.timer);
					this.isHit = true;
					if(map[temp_T_L_Y][temp_T_L_X]==1){
						map[temp_T_L_Y][temp_T_L_X]=0;
					}
					if(map[temp_T_L_Y][temp_T_L_X]==2){
						// alert(tankobj.hurt);
						if(tankobj.hurt==3){
							map[temp_T_L_Y][temp_T_L_X]=0;
						}
					}
					if(map[temp_T_L_Y][temp_T_L_X]==9||map[temp_T_L_Y][temp_T_L_X]==8){
						map[24][12]=7;
						// gamestate = "fail";
						homeIsHit = true;
					}
				}
				//检测右上角
				if(map[temp_T_R_Y][temp_T_R_X]==1||map[temp_T_R_Y][temp_T_R_X]==2||map[temp_T_R_Y][temp_T_R_X]==9||map[temp_T_R_Y][temp_T_R_X]==8){
					this.y = (temp_T_L_Y+1)*16;
					clearInterval(this.timer);
					this.isHit = true;
					if(map[temp_T_R_Y][temp_T_R_X]==1){
						map[temp_T_R_Y][temp_T_R_X]=0;
					}
					if(map[temp_T_R_Y][temp_T_R_X]==2){
						if(tankobj.hurt==3){
							map[temp_T_R_Y][temp_T_R_X]=0;
						}
					}
					if(map[temp_T_R_Y][temp_T_R_X]==9||map[temp_T_R_Y][temp_T_R_X]==8){
						map[24][12]=7;
						// gamestate = "fail";
						homeIsHit = true;
					}
				}
			break;
			case DOWN:
				temp_B_L_X = parseInt((this.x+13)/16);
				temp_B_L_Y = parseInt((this.y+32+6)/16);
				temp_B_R_X = parseInt((this.x+16+3)/16);
				temp_B_R_Y = parseInt((this.y+32+6)/16);
				if(this.y+32+6<416){//保证在地图边界内
					if(map[temp_B_L_Y][temp_B_L_X]==1||map[temp_B_L_Y][temp_B_L_X]==2||map[temp_B_L_Y][temp_B_L_X]==9||map[temp_B_L_Y][temp_B_L_X]==8){
						this.y = temp_B_L_Y*16-32-6;
						clearInterval(this.timer);
						this.isHit = true;
						if(map[temp_B_L_Y][temp_B_L_X]==1){
							map[temp_B_L_Y][temp_B_L_X]=0;
						}
						if(map[temp_B_L_Y][temp_B_L_X]==2){
							if(tankobj.hurt==3){
								map[temp_B_L_Y][temp_B_L_X]=0;
							}
						}
						if(map[temp_B_L_Y][temp_B_L_X]==9||map[temp_B_L_Y][temp_B_L_X]==8){
							map[24][12]=7;
							// gamestate = "fail";
							homeIsHit = true;
						}
						
					}
					if(map[temp_B_R_Y][temp_B_R_X]==1||map[temp_B_R_Y][temp_B_R_X]==2||map[temp_B_R_Y][temp_B_R_X]==9||map[temp_B_R_Y][temp_B_R_X]==8){
						this.y = temp_B_L_Y*16-32-6;
						clearInterval(this.timer);
						this.isHit = true;
						console.log(4);
						if(map[temp_B_R_Y][temp_B_R_X]==1){
							map[temp_B_R_Y][temp_B_R_X]=0;
						}
						if(map[temp_B_R_Y][temp_B_R_X]==2){
							if(tankobj.hurt==3){
								map[temp_B_R_Y][temp_B_R_X]=0;
							}
						}
						if(map[temp_B_R_Y][temp_B_R_X]==9||map[temp_B_R_Y][temp_B_R_X]==8){
							map[24][12]=7;
							// gamestate = "fail";
							homeIsHit = true;
						}
						
					}
				}
			break;
			case LEFT:
				temp_T_L_X = parseInt((this.x-6)/16);
				temp_T_L_Y = parseInt((this.y+16-3)/16);
				temp_B_L_X = parseInt((this.x-6)/16);
				temp_B_L_Y = parseInt((this.y+16+3)/16);
				if(map[temp_T_L_Y][temp_T_L_X]==1||map[temp_T_L_Y][temp_T_L_X]==2||map[temp_T_L_Y][temp_T_L_X]==9||map[temp_T_L_Y][temp_T_L_X]==8){
					this.x = (temp_T_L_X+1)*16;
					clearInterval(this.timer);
					this.isHit = true;
					
					if(map[temp_T_L_Y][temp_T_L_X]==1){
						map[temp_T_L_Y][temp_T_L_X]=0;
					}
					if(map[temp_T_L_Y][temp_T_L_X]==2){
						if(tankobj.hurt==3){
							map[temp_T_L_Y][temp_T_L_X]=0;
						}
					}
					if(map[temp_T_L_Y][temp_T_L_X]==9||map[temp_T_L_Y][temp_T_L_X]==8){
						map[24][12]=7;
						// gamestate = "fail";
						homeIsHit = true;
					}
				}
				if(map[temp_B_L_Y][temp_B_L_X]==1||map[temp_B_L_Y][temp_B_L_X]==2||map[temp_B_L_Y][temp_B_L_X]==9||map[temp_B_L_Y][temp_B_L_X]==8){
					this.x = (temp_T_L_X+1)*16;
					clearInterval(this.timer);
					this.isHit = true;
					
					if(map[temp_B_L_Y][temp_B_L_X]==1){
						map[temp_B_L_Y][temp_B_L_X]=0;
					}
					if(map[temp_B_L_Y][temp_B_L_X]==2){
						if(tankobj.hurt==3){
							map[temp_B_L_Y][temp_B_L_X]=0;
						}
					}
					if(map[temp_B_L_Y][temp_B_L_X]==9||map[temp_B_L_Y][temp_B_L_X]==8){
						map[24][12]=7;
						// gamestate = "fail";
						homeIsHit = true;
					}
				}
			break;
			case RIGHT:
				temp_T_R_X = parseInt((this.x+32+6)/16);
				temp_T_R_Y = parseInt((this.y+16-3)/16);
				temp_B_R_X = parseInt((this.x+32+6)/16);
				temp_B_R_Y = parseInt((this.y+16+3)/16);
				if(map[temp_T_R_Y][temp_T_R_X]==1||map[temp_T_R_Y][temp_T_R_X]==2||map[temp_T_R_Y][temp_T_R_X]==9||map[temp_T_R_Y][temp_T_R_X]==8){
					this.x = (temp_T_R_X+1)*16-32-6-6-6;
					clearInterval(this.timer);
					this.isHit = true;
					
					if(map[temp_T_R_Y][temp_T_R_X]==1){
						map[temp_T_R_Y][temp_T_R_X]=0;
					}
					if(map[temp_T_R_Y][temp_T_R_X]==2){
						if(tankobj.hurt==3){
							map[temp_T_R_Y][temp_T_R_X]=0;
						}
					}
					if(map[temp_T_R_Y][temp_T_R_X]==9||map[temp_T_R_Y][temp_T_R_X]==8){
						map[24][12]=7;
						// gamestate = "fail";
						homeIsHit = true;
					}
				}
				if(map[temp_B_R_Y][temp_B_R_X]==1||map[temp_B_R_Y][temp_B_R_X]==2||map[temp_B_R_Y][temp_B_R_X]==9||map[temp_B_R_Y][temp_B_R_X]==8){
					this.x = (temp_T_R_X+1)*16-32-6-6-6;
					clearInterval(this.timer);
					this.isHit = true;
					console.log(5);
					
					if(map[temp_B_R_Y][temp_B_R_X]==1){
						map[temp_B_R_Y][temp_B_R_X]=0;
					}
					if(map[temp_B_R_Y][temp_B_R_X]==2){
						if(tankobj.hurt==3){
							map[temp_B_R_Y][temp_B_R_X]=0;
						}
					}
					if(map[temp_B_R_Y][temp_B_R_X]==9||map[temp_B_R_Y][temp_B_R_X]==8){
						map[24][12]=7;
						// gamestate = "fail";
						homeIsHit = true;
					}
				}
			break;
		}
	}
	//检测子弹是否与坦克发生碰撞
	//参数tankArr为传入的坦克数组
	this.isCollisionTank = function(tankArr){
		var overlap = 2;
		// alert(this.owner.type);
		var temp_T_L_X,temp_T_L_Y,temp_T_R_X,temp_T_R_Y,temp_B_L_X,temp_B_L_Y,temp_B_R_X,temp_B_R_Y;
		var tank_lt,tank_rt,tank_lb,tank_rb;
				temp_T_L_X = this.x+13;
				temp_T_L_Y = this.y-6;
				temp_T_R_X = this.x+16+3;
				temp_T_R_Y = this.y-6;
				temp_B_R_X = this.x+16+3;
				temp_B_R_Y = this.y;
				temp_B_L_X = this.x+13;
				temp_B_L_Y = this.y;
		switch(this.dir){
			case UP:
			if(this.owner.type=="tank"){
				for(var i=0;i<tankArr.length;i++){
					if(temp_T_L_X>=tankArr[i].x&&temp_T_L_X<=tankArr[i].x+32&&temp_T_L_Y>=tankArr[i].y-32&&temp_T_L_Y<=tankArr[i].y+32){
						tankArr[i].isAttack = true;
						this.isHit = true;
					}
				}
			}
			if(this.owner.type=="enemy"){
				for(var j=0;j<hero_tank_arr.length;j++){
					if(temp_T_L_X>=hero_tank_arr[j].x&&temp_T_L_X<=hero_tank_arr[j].x+32&&temp_T_L_Y>=hero_tank_arr[j].y-32&&temp_T_L_Y<=hero_tank_arr[j].y+32){
						if(hero_tank_arr[j].isProtect){
							
						}else{
							hero_tank_arr[j].isAttack = true;
						}
						this.isHit = true;
						hero_tank_arr[j].hurt = 1;
						if(hero_tank_arr[j].bullets.length>0){
							hero_tank_arr[j].bullets[0].speed = 1;
						}
					}
				}
			}
			break;
			case DOWN:
			if(this.owner.type=="tank"){
				for(var i=0;i<tankArr.length;i++){
					if(temp_B_L_X>=tankArr[i].x&&temp_B_L_X<=tankArr[i].x+32&&temp_B_L_Y>=tankArr[i].y-32&&temp_B_L_Y<=tankArr[i].y+32+32){
						tankArr[i].isAttack = true;
						this.isHit = true;
					}
				}
			}
			if(this.owner.type=="enemy"){
				for(var j=0;j<hero_tank_arr.length;j++){
					if(temp_B_L_X>=hero_tank_arr[j].x&&temp_B_L_X<=hero_tank_arr[j].x+32&&temp_B_L_Y>=hero_tank_arr[j].y-32&&temp_B_L_Y<=hero_tank_arr[j].y+32+32){
						if(hero_tank_arr[j].isProtect){
							
						}else{
							hero_tank_arr[j].isAttack = true;
						}
						this.isHit = true;
						hero_tank_arr[j].hurt = 1;
						if(hero_tank_arr[j].bullets.length>0){
							hero_tank_arr[j].bullets[0].speed = 1;
						}
					}
				}

			}
			break;
			case LEFT:
			if(this.owner.type=="tank"){
				for(var i=0;i<tankArr.length;i++){
					if(temp_T_L_X>=tankArr[i].x&&temp_T_L_X<=tankArr[i].x+32&&temp_T_L_Y>=tankArr[i].y-16&&temp_T_L_Y<=tankArr[i].y-16+32){
						tankArr[i].isAttack = true;
						this.isHit = true;
					}
					if(temp_T_R_X>=tankArr[i].x&&temp_T_R_X<=tankArr[i].x+32&&temp_T_R_Y>=tankArr[i].y-16&&temp_T_R_Y<=tankArr[i].y-16+32){
						tankArr[i].isAttack = true;
						this.isHit = true;
					}
				}

			}
			if(this.owner.type=="enemy"){
				for(var j=0;j<hero_tank_arr.length;j++){
					if(temp_T_L_X>=hero_tank_arr[j].x&&temp_T_L_X<=hero_tank_arr[j].x+32&&temp_T_L_Y>=hero_tank_arr[j].y-16&&temp_T_L_Y<=hero_tank_arr[j].y-16+32){
						if(hero_tank_arr[j].isProtect){
							
						}else{
							hero_tank_arr[j].isAttack = true;
						}
						this.isHit = true;
						hero_tank_arr[j].hurt = 1;
						if(hero_tank_arr[j].bullets.length>0){
							hero_tank_arr[j].bullets[0].speed = 1;
						}
					}
					if(temp_T_R_X>=hero_tank_arr[j].x&&temp_T_R_X<=hero_tank_arr[j].x+32&&temp_T_R_Y>=hero_tank_arr[j].y-16&&temp_T_R_Y<=hero_tank_arr[j].y-16+32){
						if(hero_tank_arr[j].isProtect){
							
						}else{
							hero_tank_arr[j].isAttack = true;
						}
						this.isHit = true;
						hero_tank_arr[j].hurt = 1;
						if(hero_tank_arr[j].bullets.length>0){
							hero_tank_arr[j].bullets[0].speed = 1;
						}
					}
				}
			}
			break;
			case RIGHT:
			if(this.owner.type=="tank"){
				for(var i=0;i<tankArr.length;i++){
					if(temp_T_R_X>=tankArr[i].x&&temp_T_R_X<=tankArr[i].x+32&&temp_T_R_Y>=tankArr[i].y-16&&temp_T_R_Y<=tankArr[i].y-16+32){
						tankArr[i].isAttack = true;
						this.isHit = true;
					}
				}
			}
			if(this.owner.type=="enemy"){
				for(var j=0;j<hero_tank_arr.length;j++){
					if(temp_T_R_X>=hero_tank_arr[j].x&&temp_T_R_X<=hero_tank_arr[j].x+32&&temp_T_R_Y>=hero_tank_arr[j].y-16&&temp_T_R_Y<=hero_tank_arr[j].y-16+32){
						if(hero_tank_arr[j].isProtect){
							
						}else{
							hero_tank_arr[j].isAttack = true;
						}
						this.isHit = true;
						hero_tank_arr[j].hurt = 1;
						if(hero_tank_arr[j].bullets.length>0){
							hero_tank_arr[j].bullets[0].speed = 1;
						}
					}
				}
			}
			break;
		}
	}
}
