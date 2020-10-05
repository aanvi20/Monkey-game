
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survival_time
var forestImage, gameoverImage, gameover
var gameState
var title, titleImage


function preload(){
  
  //load Images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  forestImage = loadImage("10x8FT-Vinyl-Background-Studio-Backdrop-Prop-Tropical-Green.jpg")
  gameoverImage = loadImage("game-background_23-2148080815.jpg")
   titleImage = loadImage("MonkeySlots-logo.jpg")
  
 
}


function setup() {
  
  //Create Background
 forest = createSprite(300, 100)
 forest.addImage("background", forestImage)
 forest.scale=2
  
  //Create Monkey
 monkey = createSprite(50, 200)
 monkey.addAnimation("monkey", monkey_running ) 
 monkey.scale=0.1
  
  //Create invisible ground
 invisibleGround = createSprite(200, 250, 400, 20) 
 invisibleGround.visible=false; 
  
  //Create game over
 gameover = createSprite(200, 200) 
 gameover.addImage("game over", gameoverImage)
 gameover.scale=0.8
 gameover.visible=false;
  
  //Create game title
 title = createSprite(200, 170) 
 title.addImage("game title", titleImage)
 title.scale=0.68
 title.lifetime=50
  
  
 
 //Create groups for bananas and obstacles
 FoodGroup = new Group();
 obstacleGroup = new Group(); 
  
  //Create score and game state
  score=0;
  survival_time=0;
  gameState="serve"
  
}


function draw() {
 drawSprites();
  
  if(frameCount===50){
     gameState="play"
     }
  

  if(gameState==="play"){
    
    //Create infinite background
  forest.velocityX=-2
  if(forest.x<0){
    forest.x=forest.width/2
    }
  
    //Make the monkey jump when <space is pressed>
  if(keyDown("space") && monkey.y>=200){
     monkey.velocityY=-14     
     }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround)
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+1
     
     }
  
   if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
    gameState="end"
     
     }
  
 
  //Display survival time and score
  survival_time = survival_time+Math.round((getFrameRate()/60))
  fill("black")
  textSize(20)
  text("Survival Time: " + survival_time,50, 30)
  text("Score: " + score, 250, 30)
  
  //Spawn bananas and stones
  bananas();
  obstacles();
  }
  
   if(gameState==="end"){
     gameover.visible=true;
     monkey.destroy();
     forest.destroy();
     FoodGroup.destroyEach();
     FoodGroup.setVelocityXEach(0)
     obstacleGroup.setVelocityXEach(0)
     obstacleGroup.destroyEach();
     }
  
  
    
  
}

function bananas(){
  
  if(frameCount%100===0){
     banana = createSprite(400, 200)
     banana.addImage(bananaImage)
     banana.scale=0.1
     banana.y = Math.round(random(120, 150))
     banana.velocityX=-4
     banana.lifetime=100
     FoodGroup.add(banana)
     }
}

function obstacles (){
  
  if(frameCount%300===0){
    obstacle = createSprite(400, 220)
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.08
    obstacle.velocityX=-4
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle)
     
     }
}






