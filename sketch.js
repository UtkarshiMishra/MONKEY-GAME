var PLAY = 1;
var END = 0;
var gameState = PLAY;



var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas (400,400);  

 monkey = createSprite (80,315,20,20);
 monkey.addAnimation ("moving",monkey_running); 
 monkey.scale = 0.1;
  
 ground = createSprite(400,350,600,10);
  ground.velocityx = -4;
  ground.x = ground.width /2;
  
  
 
 foodGroup = createGroup ();
 obstacleGroup = createGroup ();
  score = 0;
}


function draw() {
background ("lightgreen");
  stroke ("white");
  textSize(20);
  fill("white");
  text("SCORE: "+ score, 300,50);
  
  stroke ("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil (frameCount / frameRate ())
  text ("SURVIVAL TIME: " + survivalTime,100,50);
 
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }

    
    monkey.velocityY = monkey.velocityY + 1.1;
  monkey.collide(ground);
  
  if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach(); 
      score = score+1;  
    }
  if (obstacleGroup.isTouching(monkey)) {
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    text ("YOU LOST",150,200);
    
    //survivalTime.visible = false;
    //score.visible = false;
    monkey.velocity = 0;
  }
  spawnbananas ();
  spawnobstacles ();
  
 drawSprites () ;
  
  }

function spawnbananas() {
  if (frameCount % 70 === 0) {
    banana = createSprite(300,100,40,10);
    banana.y = Math.round(random(10,60));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    
   foodGroup.add(banana);
    }
}

function spawnobstacles () {
  
  if (frameCount % 60 === 0){
   var obstacle = createSprite(600,330,10,40);
   obstacle.velocityX = -(6 + score/100);
    
  
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 260;
    
    
    
    
    obstacleGroup.add (obstacle);
  }
}



