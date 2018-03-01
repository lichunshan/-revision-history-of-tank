//检测是否与边界发生碰撞
//接收一个对象数组
function isCollisionBorder(obj){
	var bullet;
	if(obj.length!=0){
		for(var i=0; i<obj.length; i++){

			//检测子弹的碰撞
			if(obj[i].bullets.length != 0){
				bullet = obj[i].bullets[i];
				// alert(bullet.type);
				// alert(bullet.y);
				if(bullet.y+OFFSET_Y <= OFFSET_Y){
					bullet.y = 0;
					bullet.isHit = true;
					// bullet.destroy();
					// obj[i].bullets.length = 0;
					obj[i].isShooting = false;
				}
				if(bullet.y >= 416-32){
					bullet.y = 416-32;
					bullet.isHit = true;
					// bullet.destroy();
					// obj[i].bullets.length = 0;
					obj[i].isShooting = false;
				}
				if(bullet.x <= 0){
					bullet.x = 0;
					bullet.isHit = true;
					// bullet.destroy();
					// obj[i].bullets.length = 0;
					obj[i].isShooting = false;
				}
				if(bullet.x >= 416-32){
					bullet.x = 416-32;
					bullet.isHit = true;
					// bullet.destroy();
					// obj[i].bullets.length = 0;
					obj[i].isShooting = false;
				}
			}
			

				//检测坦克的碰撞
			if(obj[i].y+OFFSET_Y <= OFFSET_Y){
				obj[i].y = 1;
			} 
			if(obj[i].y +OFFSET_Y >= OFFSET_Y + BATTLE_FIELD_H-obj[i].size){
				obj[i].y = BATTLE_FIELD_H-obj[i].size-1;
			}
			if(obj[i].x +OFFSET_X <= OFFSET_X){
				obj[i].x = 1;
			}
			if(obj[i].x + OFFSET_X >= OFFSET_X + BATTLE_FIELD_W-obj[i].size){
				// alert(1);
				obj[i].x = BATTLE_FIELD_W-obj[i].size-1;
			}
		}
	}else{
		alert("报错");
	}
}
