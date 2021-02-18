var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bageera, sherKhan;
var bageeraImg, sherKhanImg;
var invisibleGround;
var backgroundImg;
var sherKhanGroup;
var score = 0;
var reset,resetImg;
var jumpSound;

function preload() {
    bageeraImg = loadAnimation("images/bageera.gif");
    backgroundImg = loadImage("images/jungle.jpg");
    sherKhanImg = loadAnimation("images/sherkhan.png");
    resetImg = loadImage("images/Quick_restart.png");
    jumpSound =  loadSound("CheckpointSoundEffect.mp3");
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);
    bageera =  createSprite(50, height-50, 50,10);
    bageera.addAnimation("bageera",bageeraImg);
    //bageera.debug = true;
    bageera.setCollider("rectangle",0,0,50,50);
    invisibleGround = createSprite(0,height-30,width,10);
    invisibleGround.visible = false;   

    sherKhanGroup = new Group();
    reset = createSprite(width/2,height/2+100,10,10);
    reset.addImage("reset button",resetImg);
    reset.scale = 0.5
    reset.visible = false;
     
}

function draw(){
    background(backgroundImg);  
    fill("white");
    textSize(24);
    text("Score: "+score,200,200);
    
    score = score + Math.round(getFrameRate()/60);
    if(gameState === PLAY){
        if(touches.length >0 || (keyDown("space") && bageera.y > height-100)){
            bageera.velocityY = -14;
            jumpSound.play();
            touches = [];
        }  
         
        bageera.velocityY += 0.3;
        spawnSherkhan();
        if(sherKhanGroup.isTouching(bageera)){
            gameState = END;            
        }
    }else if (gameState === END){
        bageera.velocityY = 0;
        sherKhanGroup.setVelocityXEach(0);
        sherKhanGroup.setLifetimeEach(-1);

        reset.visible = true;
        if(mousePressedOver(reset)){
            refresh();
            
        }    
            
       
    }  
    bageera.collide(invisibleGround);
    
    drawSprites();
}


function spawnSherkhan() {
    if(World.frameCount%120 === 0){
        var sherKhan = createSprite(width,height-30,10,20);
        sherKhan.addAnimation("sherKhan",sherKhanImg);
        sherKhan.scale= 0.4;
        //sherKhan.debug = true
        sherKhan.velocityX = -8;        
        sherKhanGroup.add(sherKhan);
        sherKhan.lifeTime = width/8;
    }
    
    
}

function refresh(){
    reset.visible = false;   
    sherKhanGroup.destroyEach();
    score = 0;
    gameState = PLAY;
}
