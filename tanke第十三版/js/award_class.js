//奖励基类
function Award(){
	this.ctx = window.ctx;
	this.size = 30;
	this.isHit = false;
	this.isAppear = false;
	this.isStart = false;//已经开始倒计时
	this.timer = null;
	// this.x = Math.random()*416+32;
	// this.y = Math.random()*416+16;
}
//增加生命奖励
function AddLife(){
	this.ctx = window.ctx;
	// alert(this.ctx);
	this.x = Math.random()*416+32-30;
	this.y = Math.random()*416+16-30;
	this.type = "addlife";
	this.draw = function(){
		if(!this.isAppear){
			var temp_x = this.x;
			var temp_y = this.y;
			this.isAppear = true;
			this.timer = setInterval(()=>{
			this.ctx.drawImage(SOURCE_IMG,AWARDS[0],AWARDS[1],this.size,this.size,temp_x,temp_y,this.size,this.size);
			// alert(1);
			if(!this.isHit){
				if(!this.isStart){
				// alert(2);
				this.isStart = true;
				setTimeout(()=>{
				clearInterval(this.timer);
				awardArr.pop();
				this.isAppear = false;
				this.isStart = false;
				isHaveAward = false;
				temp_x = null;
				temp_y = null;
			},10000);
			}
			}else{
				clearInterval(this.timer);
				awardArr.pop();
				this.isAppear = false;
				this.isStart = false;
				isHaveAward = false;
				temp_x = null;
				temp_y = null;
				// alert("吃到了");
			}
			
		},10);
		}else{

		}
	}
}
AddLife.prototype = new Award();
//时间静止奖励
function StopEnemy(){
	this.ctx = window.ctx;
	// alert(this.ctx);
	this.x = Math.random()*416+32-30;
	this.y = Math.random()*416+16-30;
	this.type = "stopenemy";
	this.draw = function(){
		if(!this.isAppear){
			var temp_x = this.x;
			var temp_y = this.y;
			this.isAppear = true;
			this.timer = setInterval(()=>{
			this.ctx.drawImage(SOURCE_IMG,AWARDS[0]+this.size,AWARDS[1],this.size,this.size,temp_x,temp_y,this.size,this.size);
			// alert(1);
			if(!this.isHit){
				if(!this.isStart){
				// alert(2);
				this.isStart = true;
				setTimeout(()=>{
				clearInterval(this.timer);
				awardArr.pop();
				this.isAppear = false;
				this.isStart = false;
				isHaveAward = false;
				temp_x = null;
				temp_y = null;
			},10000);
			}
			}else{
				clearInterval(this.timer);
				awardArr.pop();
				this.isAppear = false;
				this.isStart = false;
				isHaveAward = false;
				temp_x = null;
				temp_y = null;
				// alert("吃到了");
			}
			
		},10);
		}else{

		}
	}
}
StopEnemy.prototype = new Award();

//家的墙变成铁皮奖励
function ArmsHome(){
	this.ctx = window.ctx;
	// alert(this.ctx);
	this.x = Math.random()*416+32-30;
	this.y = Math.random()*416+16-30;
	this.type = "armshome";
	this.draw = function(){
		if(!this.isAppear){
			var temp_x = this.x;
			var temp_y = this.y;
			this.isAppear = true;
			this.timer = setInterval(()=>{
			this.ctx.drawImage(SOURCE_IMG,AWARDS[0]+this.size*2,AWARDS[1],this.size,this.size,temp_x,temp_y,this.size,this.size);
			// alert(1);
			if(!this.isHit){
				if(!this.isStart){
				// alert(2);
				this.isStart = true;
				setTimeout(()=>{
				clearInterval(this.timer);
				awardArr.pop();
				this.isAppear = false;
				this.isStart = false;
				isHaveAward = false;
				temp_x = null;
				temp_y = null;
			},10000);
			}
			}else{
				clearInterval(this.timer);
				awardArr.pop();
				this.isAppear = false;
				this.isStart = false;
				isHaveAward = false;
				temp_x = null;
				temp_y = null;
				// alert("吃到了");
			}
			
		},10);
		}else{

		}
	}
}
ArmsHome.prototype = new Award();
//炸弹奖励
function Bomb(){
	this.ctx = window.ctx;
	// alert(this.ctx);
	this.x = Math.random()*416+32-30;
	this.y = Math.random()*416+16-30;
	this.type = "bomb";
	this.draw = function(){
		if(!this.isAppear){
			var temp_x = this.x;
			var temp_y = this.y;
			this.isAppear = true;
			this.timer = setInterval(()=>{
			this.ctx.drawImage(SOURCE_IMG,AWARDS[0]+this.size*3,AWARDS[1],this.size,this.size,temp_x,temp_y,this.size,this.size);
			// alert(1);
			if(!this.isHit){
				if(!this.isStart){
				// alert(2);
				this.isStart = true;
				setTimeout(()=>{
				clearInterval(this.timer);
				awardArr.pop();
				this.isAppear = false;
				this.isStart = false;
				isHaveAward = false;
				temp_x = null;
				temp_y = null;
			},10000);
			}

			}else{
				clearInterval(this.timer);
				awardArr.pop();
				this.isAppear = false;
				this.isStart = false;
				isHaveAward = false;
				temp_x = null;
				temp_y = null;
				// alert("吃到了");
			}
			
		},10);
		}else{

		}
	}
}
Bomb.prototype = new Award();
//五角星奖励
function Star(){
	this.ctx = window.ctx;
	// alert(this.ctx);
	this.x = Math.random()*416+32-30;
	this.y = Math.random()*416+16-30;
	this.type = "star";
	this.draw = function(){
		if(!this.isAppear){
			var temp_x = this.x;
			var temp_y = this.y;
			this.isAppear = true;
			this.timer = setInterval(()=>{
			this.ctx.drawImage(SOURCE_IMG,AWARDS[0]+this.size*4,AWARDS[1],this.size,this.size,temp_x,temp_y,this.size,this.size);
			// alert(1);
			if(!this.isHit){
				if(!this.isStart){
				// alert(2);
				this.isStart = true;
				setTimeout(()=>{
				clearInterval(this.timer);
				awardArr.pop();
				this.isAppear = false;
				this.isStart = false;
				isHaveAward = false;
				temp_x = null;
				temp_y = null;
			},10000);
			}
			}else{
				clearInterval(this.timer);
				awardArr.pop();
				this.isAppear = false;
				this.isStart = false;
				isHaveAward = false;
				temp_x = null;
				temp_y = null;
				// alert("吃到了");
			}
			
		},10);
		}else{

		}
	}
}
Star.prototype = new Award();
//防御奖励
function Protect(){
	this.ctx = window.ctx;
	// alert(this.ctx);
	this.x = Math.random()*416+32-30;
	this.y = Math.random()*416+16-30;
	this.type = "protect";
	this.draw = function(){
		if(!this.isAppear){
			var temp_x = this.x;
			var temp_y = this.y;
			this.isAppear = true;
			this.timer = setInterval(()=>{
			this.ctx.drawImage(SOURCE_IMG,AWARDS[0]+this.size*5,AWARDS[1],this.size,this.size,temp_x,temp_y,this.size,this.size);
			// alert(1);
			if(!this.isHit){
				if(!this.isStart){
				// alert(2);
				this.isStart = true;
				setTimeout(()=>{
				clearInterval(this.timer);
				awardArr.pop();
				this.isAppear = false;
				this.isStart = false;
				isHaveAward = false;
				temp_x = null;
				temp_y = null;
			},10000);
			}
			}else{
				clearInterval(this.timer);
				awardArr.pop();
				this.isAppear = false;
				this.isStart = false;
				isHaveAward = false;
				temp_x = null;
				temp_y = null;
				// alert("吃到了");
			}
			
		},10);
		}else{

		}
	}
}
Protect.prototype = new Award();