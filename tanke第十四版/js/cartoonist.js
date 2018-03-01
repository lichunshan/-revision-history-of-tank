function Cartoonist(){
	this.ctx = window.gameoverctx;
	this.ctx2 = window.ctx;
	this.x = GAMEOVER_POS[0];
	this.y = GAMEOVER_POS[1];
	this.menu_y = 499;
	this.isOk = false;
	this.gtx = 0;
	this.gty = 0;
	this.gbx = 0;
	this.gby = 480;
	this.drawGameOver = function(){
		// alert(121);
		if(this.y>200){
			// alert(12);
			this.ctx.drawImage(SOURCE_IMG,GAMEOVER[0],GAMEOVER[1],66,32,this.x+32+32+4+2,this.y--,66,32);
		}else{
			this.ctx.drawImage(SOURCE_IMG,GAMEOVER[0],GAMEOVER[1],66,32,this.x+32+32+4+2,this.y,66,32);
		}
	}
	this.drawStart = function(){
			if(this.menu_y>0){
			this.ctx2.drawImage(SOURCE_IMG,0,252,512,499,0,this.menu_y--,512,499);
			}
		if(this.menu_y<=0){
			this.ctx2.clearRect(0,0,512,499);
			this.ctx2.drawImage(SOURCE_IMG,0,252,512,499,0,0,512,499);
			 selecttank.draw();
			}
	}
	//stage参数为当前的关卡
	this.drawGuoDuClose = function(stage){
		if(!this.isOk){
			this.ctx.fillStyle = "#F7F7F7";
		if(this.gty<250){
			// alert(1);
			this.ctx.fillRect(0,0,512,this.gty+=4);
		}
		if(this.gby>240){
			// alert(2);
			this.ctx.fillRect(0,this.gby-=4,512,250);

		}
		if(this.gty>180){
			this.ctx.font = "24px 宋体";
			this.ctx.fillStyle = "#000000";
			this.ctx.fillText("关卡"+stage,this.x+32+32+2+32,180);
		}
		}else{
			gameoverctx.clearRect(0,0,512,499);
			ctx.clearRect(0,0,512,499);
			gctx.clearRect(0,0,512,499);
			this.ctx.fillStyle = "#F7F7F7";

			if(this.gty>-250){
				// alert(1);
				this.ctx.fillRect(0,-(this.gty+=5),512,250);
			}else{
				this.gty = -250;
			}
			if(this.gby<480){
				// alert(2);
				this.ctx.fillRect(0,this.gby+=4,512,250);
			}else{
				this.gby = 480;
			}
			if(this.gby==480){
				// alert(23232);
				enemy_tank_arr.length = 0;
				des_enemy_arr.length = 0;
				totalenemy = 1;
				hero_tank_arr[0].isAppear = false;
				hero_tank_arr[0].x = PLAYER1[0];
				hero_tank_arr[0].y = PLAYER1[1];
				hero_tank_arr[0].dir = UP;
				hero_tank_arr[0].isProtect = true;
				setTimeout(function(){
				if(tank){
					hero_tank_arr[0].isProtect = false;
				}
				// alert("没了");
				},3000);
				enemy_tank_arr.push(new EnemyTank1());
				window.gamestate = "battle";
				this.isOk = false;
				this.x = GAMEOVER_POS[0];
				this.y = GAMEOVER_POS[1];
				this.gtx = 0;
				this.gty = 0;
				this.gbx = 0;
				this.gby = 480;
				getScore = 0;
				if(awardArr.length>0){
					awardArr[0].isHit = true;
				}
			}
		}
		if(this.gty>=250&&this.gby<=240&&!this.isOk){
			this.isOk = true;
			this.gty = 0;
			this.gby = 240;
			// gameoverctx.clearRect(0,0,512,499);
		}
		// setTimeout(()=>{
		// 	this.isOk = true;
		// },3000);
		// if(this.isOk){
		// 	this.ctx.fillStyle = "#F7F7F7";
		
		// 	if(this.gty>0){
		// 		this.ctx.fillRect(0,0,512,this.gty-=4);
		// 	}
		// 	if(this.gby<480){
		// 		this.ctx.fillRect(0,this.gby+=4,512,250);
		// 	}
		// }
		
	}
}