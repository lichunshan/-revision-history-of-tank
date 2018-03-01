var Map = function(wCtx,gCtx){
	this.level = 1;
	this.mapLevel = null;
	this.wallCtx = wCtx;
	this.grassCtx = gCtx;
	this.offsetX = 32;
	this.offsetY = 16;
	this.wTileCount = 26;
	this.hTileCount = 26;
	this.tileSize = 16;
	this.homeSize = 32;
	this.num = new Num(this.wallCtx);
	this.mapWidth = 416;
	this.mapHeight = 416;

	this.setMapLevel = function(level){
		this.level = level;
		var tempMap = eval("map"+this.level);
		this.mapLevel = new Array();
		for(var i=0;i<tempMap.length;i++){
			this.mapLevel[i] = new Array();
			for(var j=0;j<tempMap[i].length;j++){
				this.mapLevel[i][j] = tempMap[i][j]
			}
		}

	}
	this.draw = function(){
		this.wallCtx.fillStyle = "#7f7f7f";
		this.wallCtx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT); 
		this.wallCtx.fillStyle = "#000";
		this.wallCtx.fillRect(this.offsetX,this.offsetY,this.mapWidth,this.mapHeight);
		this.grassCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
		for(var i=0;i<HTileCount;i++){
			for(var j=0;j<WTileCount;j++){
				if(this.mapLevel[i][j] == WALL || this.mapLevel[i][j] ==GRID || this.mapLevel[i][j] == WATER || this.mapLevel[i][j] == ICE){
					this.wallCtx.drawImage(RESOURCE_IMAGE,this.tileSize*(this.mapLevel[i][j]-1)+POS["map"][0],POS["map"][1],this.tileSize,this.tileSize,j*this.tileSize+this.offsetX,i*this.tileSize+this.offsetY,this.tileSize,this.tileSize);

				}else if(this.mapLevel[i][j]==GRASS){
					this.grassCtx.drawImage(RESOURCE_IMAGE,this.tileSize*(this.mapLevel[i][j]-1) + POS["map"][0], POS["map"][1],this.tileSize,this.tileSize,j*this.tileSize + this.offsetX, i*this.tileSize + this.offsetY,this.tileSize,this.tileSize);
				}else if(this.mapLevel[i][j]==HOME){
					this.wallCtx.drawImage(RESOURCE_IMAGE,POS["home"][0], POS["home"][1], this.homeSize, this.homeSize, j*this.tileSize + this.offsetX, i*this.tileSize + this.offsetY, this.homeSize, this.homeSize) ;

				}
			}
		}
		this.drawNoChange();
		this.drawEnemyNum(maxEnemy);
		this.drawLevel();
		this.drawLives(0,1);
		this.drawLives(0,2);
	}

	this.drawNoChange = function(){
		this.wallCtx.drawImage(RESOURCE_IMAGE, POS["score"][0], POS["score"][1], 30, 32, 464, 256, 30, 32);//player1
		
		this.wallCtx.drawImage(RESOURCE_IMAGE, 30 + POS["score"][0], POS["score"][1], 30, 32, 464, 304, 30, 32);//player2
		//30,32旗帜的size, 464, 352旗帜在canvas中位置
		this.wallCtx.drawImage(RESOURCE_IMAGE, 60 + POS["score"][0], POS["score"][1], 30, 32, 464, 352, 32, 30);//画旗帜
	}
	this.drawLevel = function(){
		this.num.draw(this.level,468, 384);
	};
	this.drawEnemyNum = function(enemyNum){
		var x = 446;
		var y = 34;
		var enemySize = 16;
		for(var i=1;i<=enemyNum;i++){
			var tempX = x;
			var tempY = y +parseInt((i+1)/2)*enemySize;
			if(i % 2 == 0){
				tempX = x + enemySize;
			}
			this.wallCtx.drawImage(RESOURCE_IMAGE,92 + POS["score"][0],POS["score"][1],14, 14,tempX, tempY,14, 14);
		}
	}
}