var title, titleImage;
var multiplayer, multiplayerImage;
var singleButton, singleButtonImage;
var multiButton, multiButtonImage;
var portal, portalImage;
var bg, backgroundImage;
var START = 0;
var SINGLE = 1;
var END = 2;
var SELECTION = 3;
var gameState = START;
var character1Image, character1;
var character2Image, character1;
var selectionTitle, selectionTitleImage;
var player;
var stoneGroup, stoneImage;
var count = 0;
var boyCopy ; 
var girlCopy;
var ground;
var score = 0;
var monsterGroup;
var monsterImage;
var start;
var bulletGroup;
var bulletImage;
var tempBullet;
var restartButtonImage;
// var stone;

function preload(){

  //Preloading Images
  titleImage = loadImage("Images/TitleImage.png");
  multiplayerImage = loadImage("Images/MultiplayerImage.png");
  singleButtonImage = loadImage("Images/SinglePlayerButton.png");
  multiButtonImage = loadImage("Images/MultiPlayerButton.png");
  portalImage = loadImage("Images/PortalImage.png");
  backgroundImage = loadImage("Images/PortalBackground.jpg");
  boyImage = loadImage("Images/maleCharacter.png");
  girlImage = loadImage("Images/femaleCharacter.png");
  selectionTitleImage = loadImage("Images/selectionTitle.png");
  stoneImage = loadImage("Images/stoneImage.png");
  monsterImage = loadImage("Images/monsterImage.png");
  bulletImage = loadImage("Images/bulletImage.png");
  restartButtonImage = loadImage("Images/restartButton.png");

}


function setup() {
  createCanvas(1000,600);

  if(gameState === START){
    singleButton = createSprite(500, 350, 50, 50);
    singleButton.addImage("singler", singleButtonImage);
    singleButton.scale = 0.8;
    singleButton.visible = true;
  
    multiButton = createSprite(500, 395, 50, 50);
    multiButton.addImage("multi", multiButtonImage);
    multiButton.scale = 0.8;

  
  }

  girlSprite = createSprite(700, 400, 50, 50);
  girlSprite.addImage( "girl",girlImage);
  girlSprite.scale= 1.2;
  girlSprite.visible = false ;

  boySprite = createSprite(350, 400, 50, 50);
  boySprite.addImage( "girl",boyImage);
  boySprite.visible = false ;

  boyCopy = createSprite(350, 400, 50, 50);
  boyCopy.addImage( "girl",boyImage);
  boyCopy.visible = false ;
  boyCopy.debug;

  girlCopy = createSprite(350, 400, 50, 50);
  girlCopy.addImage( "girl",girlImage);
  girlCopy.visible = false;
    
  ground = createSprite(500, 550, 1000, 10);
  ground.visible = false;

  start = createSprite(825, 100, 50, 50);
  start.shapeColor = "blue";
  start.addImage("start", restartButtonImage);
  start.scale = 0.2;
  start.visible = true;

  bg= createSprite(500, 300);
  
  bg.addImage("mybg", backgroundImage);
  bg.scale = 1.8;
  

  stoneGroup = new Group();
  monsterGroup = new Group();

  boyCopy.setCollider("circle", 0, 0, 120);
  boyCopy.debug = true;

  girlCopy.debug = true;

  bulletGroup = new Group();



  
 }

function draw() {
  background(0);
  bg.velocityX = -4;
  bg.depth = -1;
  if(bg.x < 0) {
    bg.x = bg.width/2;

  }
  
  if (gameState === START){

    if(mousePressedOver(singleButton)) {
      multiButton.visible= false;
      singleButton.visible= false;
      girlSprite.visible = true;
      boySprite.visible =true;
      gameState = SELECTION;
        
    
    
     }
     else if(mousePressedOver(multiButton)) {
      singleButton.visible= false;
      
     }

  }

  if (gameState === SELECTION){
    if(mousePressedOver(girlSprite) && girlSprite.visible === true) {
      girlCopy.visible = true;
      girlSprite.visible = false;
      boySprite.visible = false;
      boySprite.depth = -4;
      gameState = SINGLE;
      girlCopy.scale = 0.85;
      girlCopy.x = 100;
    
    
    }
  
    else if(mousePressedOver(boySprite) && boySprite.visible === true) {
      boyCopy.visible =true;
      boySprite.visible = false
      girlSprite.visible = false;
      girlSprite.depth= -4;
      gameState = SINGLE;
      boyCopy.scale = 0.75;
      boyCopy.x = 100;
  
    }
  }

  if (gameState === SINGLE){
    if (keyDown("space") && girlCopy.visible === false){
      boyCopy.velocityY = -14;
      
  
      
    }

    if (keyDown("space") && boyCopy.visible === false){
      girlCopy.velocityY = -14;
      
  
      
    }

    boyCopy.velocityY = boyCopy.velocityY + 0.5;
    girlCopy.velocityY = girlCopy.velocityY + 0.5;
    

    if (keyWentDown("q")){
      tempBullet = createBullet();
      tempBullet.y = boyCopy.y;
      tempBullet.x = boyCopy.x + 15;
      tempBullet.addImage("bullet", bulletImage);
      tempBullet.scale = 0.08;


    }

    if (frameCount % 150  === 0){
      var stone = createSprite(700, 500, 50, 50);
      stone.addImage("stone", stoneImage);
      stone.velocityX = -6;
      stone.scale = 0.2;
      stone.depth = boyCopy.depth+1;
      score = score+1;
      stone.lifetime = 150;
      stoneGroup.add(stone);
      console.log(stone.x);
  
    
      }

    if (score >= 3){
      if (frameCount % 100 === 0){
        var monster = createSprite(800, 350, 50, 50);
        monster.addImage("monster", monsterImage);
        monster.scale = 0.3;
        monster.velocityX = -6;
        monster.depth = boyCopy.depth+1;
        monster.lifetime = 150;

        monsterGroup.add(monster);
      }

      bg.velocityX = -4;
      bg.depth = -1;
      if(bg.x < 0) {
        bg.x = bg.width/2;
    
      }
    }

    if (bulletGroup.isTouching(monsterGroup)){
      score = score+10;
      bulletGroup.destroyEach();
      monsterGroup.destroyEach();
    }

    if (boyCopy.isTouching(stoneGroup) && boyCopy.visible === true){
      bg.velocityX = 0;
      stoneGroup.destroyEach();
      monsterGroup.destroyEach();
      gameState = END;
  
    }

    if (girlCopy.isTouching(stoneGroup) && girlCopy.visible === true){
      bg.velocityX = 0;
      stoneGroup.destroyEach();
      monsterGroup.destroyEach();
      gameState = END;
  
    }
  
    if (boyCopy.isTouching(monsterGroup) && boyCopy.visible === true){
      bg.velocityX = 0;
      monsterGroup.destroyEach();
      stoneGroup.destroyEach();
      gameState = END;
    }

    if (girlCopy.isTouching(monsterGroup) && girlCopy.visible === true){
      bg.velocityX = 0;
      monsterGroup.destroyEach();
      stoneGroup.destroyEach();
      gameState = END;
    }





      

  }



  


  drawSprites();
  textSize(20);
  text("Score: " + score, 700, 50);

  if (gameState === END){
    textSize(20);
    text("GAME OVER", 400, 300);

    // var restart = createSprite(500, 300, 50, 50);
    // restart.shapeColor = "red";

    // start.visible = true;
    
    // if (mousePressedOver(restart)){
    //   gameState = SINGLE;
    //   score = 0;
    //   restart.destroy();
    //   console.log(gameState)
    //   restart.depth = singleButton-1;
    // }


  }

  boyCopy.collide(ground);
  girlCopy.collide(ground);


    if (mousePressedOver(start)){
      gameState = START;
      score = 0;
      console.log(gameState);
      multiButton.visible = true;
      singleButton.visible = true;
      boyCopy.visible = false;
      

    }
}

// function spawnRocks(){
  

//   }

function createBullet(){
  var bullet = createSprite(500, boyCopy.y, 50, 50);
  bullet.velocityX = 6;
  bulletGroup.add(bullet);
  return bullet;
}


  

  









