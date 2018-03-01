//画布的尺寸和背景颜色
var SCREEN_W = 512;
var SCREEN_H = 449;
var SCREEN_C = "#7F7F7F";
//游戏区域的尺寸和位置
var BATTLE_FIELD_W = 416;
var BATTLE_FIELD_H = 416;
var BATTLE_FIELD_C = "#000000";
var OFFSET_X = 32;
var OFFSET_Y = 16;
// 方向
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

//墙体类型
var SOIL_WALL = 1;
var ARMS_WALL = 2;
var GRASS = 3;
var WATER = 4;
var ICE = 5;
var HOME = 9;
var WASTE = 7;

//图片资源
var SOURCE_IMG = new Image();
SOURCE_IMG.src = './images/tankAll.gif';
var MENU_IMG = new Image();
MENU_IMG.src = './images/menu.gif';

//资源在图片上的位置
var STARS = [256,32];//坦克出现前的效果
var PLAYERS=[[0,0],[128,0]];//我方坦克的坐标
var ENEMYTANK1 = [128,32];
var ENEMYTANK2 = [0,32];
var ENEMYTANK3 = [0,64];
var ENEMYPOS = [0,192,384];//敌方坦克刷新位置的横坐标
var WALLS = [[0,96],[16,96],[32,96],[48,96],[64,96],[256,0],[288,0]];//四种墙体地图元素对应的坐标,最后连个是城堡的图标
var PANELS = [[0,112],[30,112],[60,112],[90,112]];//对应有小红旗的那一行四个图片
var DIGITAL = [256,96];//数字的位置
var BULLETS = [80,96];//子弹的位置
var BULLET_BLOW = [320,0];//子弹爆炸效果图片的位置
var TANK_BLOW = [0,159];//坦克爆炸效果在图片的位置
var GAMEOVER = [384,64];//gameover图标在图片上的位置
var SELECT_TANK_POS1 = [128,96];//选择坦克在图片上的位置
var SELECT_TANK_POS2 = [128,128];
var AWARDS = [256,110];//奖励图片在图片上的位置
var PROTECT = [160,96];//保护罩在图片上的位置
//玩家坦克在地图上应该出现的位置
var PLAYER1 = [128,384];
var PLAYER2 = [256,384];
//右侧计数板相关元素在地图上的位置
var FLAG_POSITION = [463,350];
var FLAG_NUM = [468,382];
var PONE_LOGO = [464,257];
var PTWO_LOGO = [464,305];
var PONE_LIVES = [480,273];
var PTWO_LIVES = [480,321];
//gameover图标出现在地图上的位置
var GAMEOVER_POS = [139,416];
var SELECT_TANK1 = [148,250];//选择坦克在地图上的位置
var SELECT_TANK2 = [148,282];


