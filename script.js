

let board;
let bWidth=360;
let bHeight=640;
let context;

let velX=-2;
let velY=0;
let gravity=0.4;

let birdW=34;
let birdH=24;
let birdX=bWidth/8;
let birdY=bHeight/2;

let gameover=false;

let bird={
    x:birdX,
    y:birdY,
    wid:birdW,
    hei:birdH
}

let pipArr=[];
let pipW=64;
let pipH=512;
let pipX=bWidth;
let pipY=0;

let pipTopImg;
let pipBotImg;

let score=0;

window.onload=function(){
    board=document.getElementById("board");
    board.width=bWidth;
    board.height=bHeight;
    context=board.getContext('2d');

    birdIMG=new Image();
    birdIMG.src="./flappybird.png";
    birdIMG.onload=function(){
        context.drawImage(birdIMG,bird.x,bird.y,bird.wid,bird.hei);
    }
    
    pipTopImg=new Image();
    pipTopImg.src="./toppipe.png";

    pipBotImg=new Image();
    pipBotImg.src="./botpipe.png";

    requestAnimationFrame(update);
    setInterval(placeP,1500);
    document.addEventListener("keydown",movBird);
    document.addEventListener("touchstart",movBird);

}

function update(){
    requestAnimationFrame(update);

    if(gameover){
        return;
    }
        
    context.clearRect(0,0,board.width,board.height);
        
    velY+=gravity;
    bird.y=Math.max(velY+bird.y,0);
    context.drawImage(birdIMG,bird.x,bird.y,bird.wid,bird.hei);

    if(bird.y>board.height){
        gameover=true;
    }

    for(let i=0;i<pipArr.length;i++){
        let pipe=pipArr[i];
        pipe.x+=velX;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
    
        if(!pipe.passed && bird.x>pipe.x + pipe.width)
        {
            score+=0.5;
            pipe.passed=true;
        }

        if(detectcollision(bird,pipe))
        {
            gameover=true;
        }

    }
    
    context.fillStyle="Black";
    context.font="45px sans-serif";
    context.fillText(score,5,45);

    if(gameover)
    {
        context.fillText("Game Over",5,90);
    }

    while(pipArr.length>0 && pipArr[0].x<-pipe.width){
        pipArr.shift();
    }

}

function placeP(){

    if(gameover){
        return;
    }

    let RandomY=pipY-pipH/4-Math.random()*(pipH/2);
    let space=board.height/4;

    let topPip={
        img:pipTopImg,
        x:pipX,
        y:RandomY,
        width:pipW,
        height:pipH,
        pass:false
    }

    pipArr.push(topPip);

    let botPip={
        img:pipBotImg,
        x:pipX,
        y:RandomY+pipH+space,
        width:pipW,
        height:pipH,
        pass:false
    }

    pipArr.push(botPip);

}

function movBird(e){
    if(e.code=="Space" ||e.code=="KeyX" ||e.code=="ArrowUp" || e.type==="touchstart"){
        velY=-6;
    }

    if(gameover){
        bird.y=birdY;
        pipArr=[];
        score=0;
        gameover=false;          
    }
}

function detectcollision(a,b)
{
    return a.x<b.x+b.width&&
            a.x+a.wid>b.x&&
            a.y<b.y+b.height&&
            a.y+a.hei>b.y;
}
