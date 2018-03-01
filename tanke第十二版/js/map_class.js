function Map(){
	this.ctx = window.ctx;
	this.gctx = window.gctx;
	this.ictx = window.ictx;
	this.x = OFFSET_X;
	this.y = OFFSET_Y;
	this.size = 16;
	this.homesize = 32;
	this.mapsize = [BATTLE_FIELD_W,BATTLE_FIELD_H];
	this.stage = null;
	this.draw = function(stage,hero_tank_arr){
		//根据关卡选择地图
		if(stage > 22){
			stage = 1;
		}
		this.stage = "map"+stage;
		// alert(window[this.stage]);
		//画计数面板
		this.ictx.fillStyle = BATTLE_FIELD_C;
		this.ictx.fillRect(this.x,this.y,this.mapsize[0],this.mapsize[1]);
		this.ictx.fill();
		//画面板上的元素
		this.ctx.drawImage(SOURCE_IMG,PANELS[0][0],PANELS[0][1],30,30,PONE_LOGO[0],PONE_LOGO[1],30,30);
		this.ctx.drawImage(SOURCE_IMG,PANELS[1][0],PANELS[1][1],30,30,PTWO_LOGO[0],PTWO_LOGO[1],30,30);
		this.ctx.drawImage(SOURCE_IMG,PANELS[2][0],PANELS[2][1],32,32,FLAG_POSITION[0],FLAG_POSITION[1],32,32);
		//关卡数
		if(parseInt(stage/10) == 0){
			this.ctx.drawImage(SOURCE_IMG,DIGITAL[0]+stage*14,DIGITAL[1],14,14,FLAG_NUM[0],FLAG_NUM[1],14,14);
		}else if(parseInt(stage/10)!=0){
			this.ctx.drawImage(SOURCE_IMG,DIGITAL[0]+parseInt(stage/10)*14,DIGITAL[1],14,14,FLAG_NUM[0],FLAG_NUM[1],14,14);
			this.ctx.drawImage(SOURCE_IMG,DIGITAL[0]+(stage%10)*14,DIGITAL[1],14,14,FLAG_NUM[0]+14,FLAG_NUM[1],14,14);
		}
		//玩家坦克生命数
		if(window.hero_tank_arr.length == 1){
			var p1_live_num = window.hero_tank_arr[0].lives;
			var p2_live_num = 0;
			if(parseInt(p1_live_num/10) == 0){
				this.ctx.drawImage(SOURCE_IMG,DIGITAL[0]+p1_live_num*14,DIGITAL[1],14,14,PONE_LIVES[0],PONE_LIVES[1],14,14);
				this.ctx.drawImage(SOURCE_IMG,DIGITAL[0]+p2_live_num*14,DIGITAL[1],14,14,PTWO_LIVES[0],PTWO_LIVES[1],14,14);
			}else if(parseInt(p1_live_num/10)!=0){
				this.ctx.drawImage(SOURCE_IMG,DIGITAL[0]+parseInt(p1_live_num/10)*14,DIGITAL[1],14,14,PONE_LIVES[0],PONE_LIVES[1],14,14);
				this.ctx.drawImage(SOURCE_IMG,DIGITAL[0]+(p1_live_num%10)*14,DIGITAL[1],14,14,PONE_LIVES[0]+14,PONE_LIVES[1],14,14);
				this.ctx.drawImage(SOURCE_IMG,DIGITAL[0]+p2_live_num*14,DIGITAL[1],14,14,PTWO_LIVES[0],PTWO_LIVES[1],14,14);
			}
		}else if(window.hero_tank_arr.length == 2){
			var p1_live_num = window.hero_tank_arr[0].lives;
			var p2_live_num = window.hero_tank_arr[1].lives;;
			if(parseInt(p1_live_num/10) == 0){
				this.ctx.drawImage(SOURCE_IMG,DIGITAL[0]+p1_live_num*14,DIGITAL[1],14,14,PONE_LIVES[0],PONE_LIVES[1],14,14);
				this.ctx.drawImage(SOURCE_IMG,DIGITAL[0]+p2_live_num*14,DIGITAL[1],14,14,PTWO_LIVES[0],PTWO_LIVES[1],14,14);
			}else if(parseInt(p1_live_num/10)!=0){
				this.ctx.drawImage(SOURCE_IMG,DIGITAL[0]+parseInt(p1_live_num/10)*14,DIGITAL[1],14,14,PONE_LIVES[0],PONE_LIVES[1],14,14);
				this.ctx.drawImage(SOURCE_IMG,DIGITAL[0]+(p1_live_num%10)*14,DIGITAL[1],14,14,PONE_LIVES[0]+14,PONE_LIVES[1],14,14);
				this.ctx.drawImage(SOURCE_IMG,DIGITAL[0]+p2_live_num*14,DIGITAL[1],14,14,PTWO_LIVES[0],PTWO_LIVES[1],14,14);
			}
			
		}
		//画剩余敌方坦克数量图标，固定的20个
		for(var k=0;k<Math.ceil((20-totalenemy)/2);k++){
			for(var j=0;j<20-totalenemy;j++){
				this.ctx.drawImage(SOURCE_IMG,PANELS[3][0],PANELS[3][1],16,16,(j%2)*16+466,k*16+50,16,16);
			}
		}
		//画地图元素
		for(var i=0;i<window[this.stage].length;i++){
			for(var j=0;j<window[this.stage].length;j++){

				if(window[this.stage][i][j]==SOIL_WALL){
					// alert("土");
					this.ctx.drawImage(SOURCE_IMG,WALLS[0][0],WALLS[0][1],this.size,this.size,j*this.size+this.x,i*this.size+this.y,this.size,this.size);
				}else if(window[this.stage][i][j]==ARMS_WALL){
					// alert("铁");
					this.ctx.drawImage(SOURCE_IMG,WALLS[1][0],WALLS[1][1],this.size,this.size,j*this.size+this.x,i*this.size+this.y,this.size,this.size);
				}else if(window[this.stage][i][j]==GRASS){
					// alert("草");
					this.gctx.drawImage(SOURCE_IMG,WALLS[2][0],WALLS[2][1],this.size,this.size,j*this.size+this.x,i*this.size+this.y,this.size,this.size);
				}else if(window[this.stage][i][j]==WATER){
					this.ctx.drawImage(SOURCE_IMG,WALLS[3][0],WALLS[3][1],this.size,this.size,j*this.size+this.x,i*this.size+this.y,this.size,this.size);
				}else if(window[this.stage][i][j]==ICE){
					this.ictx.drawImage(SOURCE_IMG,WALLS[4][0],WALLS[4][1],this.size,this.size,j*this.size+this.x,i*this.size+this.y,this.size,this.size);
				}else if(window[this.stage][i][j]==HOME){
					this.ctx.drawImage(SOURCE_IMG,WALLS[5][0],WALLS[5][1],this.homesize,this.homesize,j*this.size+this.x,i*this.size+this.y,this.homesize,this.homesize);
				}else if(window[this.stage][i][j]==WASTE){
					this.ctx.drawImage(SOURCE_IMG,WALLS[6][0],WALLS[6][1],this.homesize,this.homesize,j*this.size+this.x,i*this.size+this.y,this.homesize,this.homesize);
				}
			}
		}
	}
}
