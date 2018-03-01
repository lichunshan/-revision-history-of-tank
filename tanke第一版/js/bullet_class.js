function Bullet(tankobj){
	this.ctx = window.ctx;
	this.x = tankobj.x;//这个是没有加上偏移量的坦克的坐标
	this.y = tankobj.y;//并不是子弹的真实坐标
	this.bullet_size = 6;
	this.dir = tankobj.dir;
	this.speed = 1;
	this.type = "bullet";//这是一个子弹
	this.timer = null;//定时器标识
	this.timer1 = null;//爆炸效果定时器标识
	this.isHit = false;
	this.isDestroy = false;
	this.times = 0;
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
	this.move = function(){
		//根据方向改变坐标
		switch(this.dir){
			case UP:
				this.timer = setInterval(()=>{
					console.log("子弹上移定时器");
					if(!this.isHit){
						this.y -= this.speed;
						// this.draw();
					}else{
						clearInterval(this.timer);
					}
					isCollisionBorder(hero_tank_arr);
				},10);
			break;
			case DOWN:
				this.timer = setInterval(()=>{
					console.log("子弹下移定时器");
					if(!this.isHit){
						this.y +=this.speed;
						// this.draw();
					}else{
						clearInterval(this.timer);
					}
					isCollisionBorder(hero_tank_arr);
				},10);
			break;
			case LEFT:
				this.timer = setInterval(()=>{
					console.log("子弹左移定时器");
					if(!this.isHit){
						this.x -= this.speed;
						// this.draw();
					}else{	
						clearInterval(this.timer);
					}
					isCollisionBorder(hero_tank_arr);
				},10);
			break;
			case RIGHT:
				this.timer = setInterval(()=>{
					console.log("子弹右移定时器");
					if(!this.isHit){
						// alert(1);
						this.x += this.speed;
						// this.draw();
					}else{
						clearInterval(this.timer);
					}
					isCollisionBorder(hero_tank_arr);
				},10);
			break;
		}
	}
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
				clearInterval(this.timer1);
			}
		}
		},30);
		
	}
}
