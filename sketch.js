var tower,towerimg;
var door,doorimg,doorgroup;
var  climber,climberimg,climbergroup;
var ghost,ghostimg;
var PLAY = 1
var END = 0
var gameState = PLAY
var invis,invisgroup;
var sound
function preload(){
 towerimg = loadImage("tower.png")
 doorimg = loadImage("door.png");
 climberimg = loadImage("climber.png");
 ghostimg = loadImage("ghost.png");
 sound = loadSound("spooky.wav")
}

function setup() {
  createCanvas(600, 600);

tower = createSprite(300,300)
  tower.addImage(towerimg);
  tower.velocityY = 1;
  doorgroup = new Group();
  climbergroup = new Group(); 
  invisgroup  = new Group();
 ghost = createSprite(200,200)
 ghost.addImage(ghostimg)
 ghost.scale = 0.3


}

function draw() {
  background(200);

  if(gameState===PLAY){

  //sound.play();
  //sound.setVolume(0.1)

  if(tower.y > 600){
    tower.y = 300;
  }
  if(keyDown("left")){
    ghost.x = ghost.x-3
  }
  if(keyDown("right")){
    ghost.x+=3
  }
  if(keyDown("space")){
    ghost.velocityY = -5
  }
  ghost.velocityY +=0.6
  spawnDoor();
  drawSprites();
   if(climbergroup.isTouching(ghost)){
     ghost.velocityY = 0
   }

  if(ghost.y > 600 || invisgroup.isTouching(ghost)){
    gameState = END  
  }
 
  }else if(gameState===END){
    textSize(30)
    text("GAME OVER",250,300);
    
  }
}
function spawnDoor(){
  if(frameCount%200===0){
    door = createSprite(200,-50);
    door.addImage(doorimg);
    door.velocityY = 1;
    door.x = Math.round(random(120,400))
    door.lifetime = 650;   
    doorgroup.add(door);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1

    climber = createSprite(200,20)
    climber.addImage(climberimg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 650;
    climbergroup.add(climber)

    invis = createSprite(200,15)
    invis.width = climber.width;
    invis.velocityY = 1;
    invis.x = door.x;
    invis.lifetime = 650; 
    invisgroup.add(invis);  
    invis.height = 2
    invis.visible = false
  }
}