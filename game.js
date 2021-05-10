class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    runner1 = createSprite(10,200);
    runner1.addAnimation("runner1",runner1_img);
    runner2 = createSprite(10,500);
    runner2.addAnimation("runner2",runner2_img);
    runners = [runner1, runner2];
    obstaclesgroup=new Group()
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getRunnersAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, -1000,-20,displayWidth*5, displayHeight);
      spawnObstacles()
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 50 ;
      var y=140;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 260;
        //use data form the database to display the cars in y direction
        x = allPlayers[plr].distance
      runners [index-1].x = x;
      runners[index-1].y = y;
       // console.log(index, player.index)

       if(keyIsDown(UP_ARROW)){
       runners[index-1].y=runners[index-1].y-200
       }
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          runners[index - 1].shapeColor = "red";
          camera.position.x = runners[index-1].x;
          camera.position.y = runners[index-1].y;ytt
          if(runners[index-1].isTouching(obstaclesgroup)){
          gameState=2
          }
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
      Player.updateRunnersAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
function spawnObstacles () {
  if(frameCount%60===0){
  var obstacle=createSprite(1000,random(0,400))
  obstacle.velocityX=-10
    obstacle.scale=0.8
    obstacle.lifeTime=1000
    obstaclesgroup.add(obstacle)
  }
}
