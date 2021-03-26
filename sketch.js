var startButton,startimg;
var start = 0,play = 1,lose = 2;
var gamestate = 0;
var screen;
var story,soryimg;
var fruit,fruit1,fruit2,fruit3,fruit4,fruitGroup;
var trap,trapimg,trapGroup;
var bomb,bombimg,bombGroup;
var score = 0,food = 3;
var gameover,restart,r,img

function preload(){
  monkeyRunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
startimg = loadImage("1.png")
  forest = loadImage("22.jfif")
  storyimg = loadImage("ss.JPG")
  storyButtonImg = loadImage("6.png")
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  trapimg = loadImage("11.png")
  
  bombimg = loadImage("12.png")
  img = loadImage("gameover.png")
  sound = loadSound("gameover.mp3")
  r = loadImage("21.png")
}

function setup() {
  createCanvas(600,600)
  
  monkey = createSprite(50,550,10,10)
  monkey.addAnimation("a",monkeyRunning)
  monkey.scale = 0.2;
  
     screen = createSprite(monkey.x,300,600,600);
  screen.addImage("F",forest)
  screen.scale = 5;
  monkey.depth=screen.depth
  monkey.depth+=1
  ground = createSprite(200,590,500000,10)
  ground.visible = false;
  
  
  
  startButton = createSprite(monkey.x,250,50,50);
  startButton.addImage("s",startimg)
   startButton.visible = false;
  
  storyButton = createSprite(monkey.x,350,50,50)
  storyButton.addImage("SS",storyButtonImg)
  storyButton.scale=0.2
  
  
  story = createSprite(300,200,10,10);
  story.addImage("S",storyimg)
  gameover = createSprite(monkey.x,300,50,50)
  gameover.addImage(img)
  restart=createSprite(monkey.x,400,50,50)
  restart.addImage(r)
  restart.scale=0.4
  
 
    
  
  fruitGroup = new Group();
  trapGroup = new Group();
  bombGroup = new Group();
}

function draw() {
 //console.log(monkey.x)
  background("black")
  
  monkey.collide(ground)
  camera.position.x=monkey.x


  if(gamestate === 0){
    startButton.x=monkey.x
    storyButton.x=monkey.x
   
   
   monkey.x=300
   screen.x=monkey.x
    restart.visible=false
    gameover.visible=false
    screen.visible = false;
    startButton.visible = true;
    storyButton.visible  = true;
    story.visible = false;
    monkey.visible = false;
    screen.velocityX = 0;
    story.depth = screen.depth;
    story.depth = story.depth +1;
    
    
    if(mousePressedOver(storyButton)){
      textSize(20)
      fill("white")
       text("try to catch food so monkey can fed himself",monkey.x-200,100)
       text("also ry to avoid obscles like bomb and traps",monkey.x-200,150)
       text("bomb insanly kill you and traps lower your food",monkey.x-200,200)
      storyButton.visible = false
      startButton.y = 550;
       }
 
   if(mousePressedOver(startButton)){
gamestate = 1;
   }
   
   
 }

if(gamestate === 1) {
  monkey.visible=true
  screen.visible=true
  storyButton.visible = false;
  startButton.visible = false;
  restart.visible=false
    gameover.visible=false
  
  
  if(screen.x<monkey.x){
    screen.x = monkey.x+400
  }
  score = Math.round(monkey.x/4-75);
  
  
  if(keyDown("space")&& monkey.y>=460){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY +0.5;
  monkey.visible = true;
  
  if(monkey.isTouching(fruitGroup)){
    fruitGroup.destroyEach();
food = food+1;
  }
  if(monkey.isTouching(trapGroup)){
    trapGroup.destroyEach();
    food = food-1
  }
  
  spawnFruits();
  spawntraps();
  spawnbombs();
  
  if(food === 0||monkey.isTouching(bombGroup)){
    
    
    gamestate = 2;
  }
    
}
  
  if(gamestate === 2){
    bombGroup.destroyEach();
    fruitGroup.destroyEach();
    trapGroup.destroyEach();
   
    
  storyButton.visible = false;
  startButton.visible = false;
     gameover.visible = true
     restart.visible=true
    
    screen.visible=false
    monkey.visible=false
    monkey.velocityX=0
    screen.velocityX = 0;
    gameover.x=monkey.x
    restart.x=monkey.x
   if(mousePressedOver(restart)){
     gamestate=0
     score=0
     food=3
     
   }
    
    
    
  }
  
  drawSprites();
  fill("white")
textSize(25)
  text("Food = "+ food,monkey.x-280,50) 
  text("score = "+ score,monkey.x+150,50)
}



function spawnFruits(){
  
   if(World.frameCount%150===0){ 
    fruit=createSprite(monkey.x+400,400,20,20); 
    
    fruit.velocityX = 0
    
    
     rand=Math.round(random(1,4)); 
    if (rand == 1) {
    fruit.addImage(fruit1);
    } 
    else if (rand == 2) { 
      fruit.addImage(fruit2); 
    } 
    else if (rand == 3) { 
      fruit.addImage(fruit3); 
    } 
    else { 
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(300,450));
    fruit.scale = 0.2;
  
    fruit.setLifetime=100; 
fruitGroup.add(fruit)
   }
}

function spawntraps() {
  if(frameCount% 100===0){
    trap = createSprite(monkey.x+400,540,50,50);
    trap.addImage("T",trapimg)
    trap.velocityX = 0;
    trap.scale =0.08
    trapGroup.add(trap)
  }
}
function spawnbombs(){

  if(frameCount% 242 ===0){
    bomb = createSprite(monkey.x+400,540,50,50)
    //console.debug(bomb)
    bomb.addImage(bombimg);
    bomb.scale = 0.5
    bomb.velocityX = 0;
    bombGroup.add(bomb)
  }

}

function keyPressed(){
  if(keyCode === RIGHT_ARROW){
    monkey.velocityX=5
  }
}
function keyReleased(){
  if(keyCode === RIGHT_ARROW){
    monkey.velocityX=0
  }
}
