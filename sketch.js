var canvas, backgroundImage;
var runner1_img,runner2_img
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var form, player, game;
var runners, runner1, runner2,hurdle
var track
var obstaclesgroup

function preload(){
  track = loadImage("images/pla.jpg");
  runner1_img = loadAnimation("p.png","b.png","y.png");
  runner2_img=loadAnimation("p.png","b.png","y.png");
  hurdle=loadImage("images/hurdle.png")
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}

