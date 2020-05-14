
//function to load images

function load_img(){
    stone1=new Image;
    stone1.src="assets/nature.png";

    stone2=new Image;
    stone2.src="assets/stone2.png";

    spaceship=new Image;
    spaceship.src="assets/transport.png";

    planet=new Image;
    planet.src="assets/planet.png";

    stone3=new Image;
    stone3.src="assets/stone3.png";

    stone4=new Image;
    stone4.src="assets/stone4.png";

    stone5=new Image;
    stone5.src="assets/stone5.png";

    energy=new Image;
    energy.src="assets/energy.png";
}

// =====================================================================
// ====================================================================

function init(){
    canvas=document.getElementById("mycanvas");
    pen=canvas.getContext('2d');

    canvas.width=1200;
    canvas.height=570;
    w=canvas.width;
    h=canvas.height;

    score=0;
    gameover=false;

    //JSON Object

    ship={
        x:20,
        y:400,
        w:70,
        h:70,
        speed:8,
        moving:"false",
    };

    mars={
        x:1000,
        y:250,
        w:180,
        h:180,
    };

    e1={
        x:20,
        y:100,
        w:60,
        h:60,
    };

    e2={
        x:300,
        y:250,
        w:60,
        h:60,
    };

    e3={
        x:700,
        y:350,
        w:60,
        h:60,
    };

    e4={
        x:1100,
        y:50,
        w:60,
        h:60,
    };

    energies=[e1,e2,e3,e4];

    ast1={
        x:200,
        y:50,
        w:90,
        h:90,
        speed:10,
    };

    ast2={
        x:400,
        y:150,
        w:60,
        h:60,
        speed:18,
    };

    ast3={
        x:550,
        y:50,
        w:60,
        h:60,
        speed:15,
    };

    ast4={
        x:720,
        y:2,
        w:60,
        h:60,
        speed:40,
    };

    ast5={
        x:870,
        y:90,
        w:60,
        h:60,
        speed:10,
    };

    stones=[ast1,ast2,ast3,ast4,ast5];

    //adding event listeners to perform keyboard functions

    document.addEventListener('keydown',function(e){
        ship.moving = e.keyCode;

    })

    document.addEventListener('keyup',function(e){
        ship.moving = false;

    })

}

// =========================================================================================
// =========================================================================================


//collision function
function iscolliding(o1,o2){
    if(Math.abs(o1.x-o2.x)<=30 && Math.abs(o1.y-o2.y)<=30){
        return true;
    }
    return false;
}

// ==============================================================================================
// ==============================================================================================

//draw function- to draw the image
function draw(){

    pen.clearRect(0,0,w,h);

    pen.drawImage(spaceship,ship.x,ship.y,ship.w,ship.h);
    pen.drawImage(planet,mars.x,mars.y,mars.w,mars.h);

    pen.drawImage(energy,e1.x,e1.y,e1.w,e1.h);
    pen.drawImage(energy,e2.x,e2.y,e2.w,e2.h);
    pen.drawImage(energy,e3.x,e3.y,e3.w,e3.h);
    pen.drawImage(energy,e4.x,e4.y,e4.w,e4.h);

        pen.drawImage(stone1,ast1.x,ast1.y,ast1.w,ast1.h);
        pen.drawImage(stone2,ast2.x,ast2.y,ast2.w,ast2.h);
        pen.drawImage(stone3,ast3.x,ast3.y,ast3.w,ast3.h);
        pen.drawImage(stone4,ast4.x,ast4.y,ast4.w,ast4.h);
        pen.drawImage(stone5,ast5.x,ast5.y,ast5.w,ast5.h);

    pen.fillStyle = "white";
    pen.font="30px sans-serif"
    pen.fillText("Score:" + score,20,30);  

}

// =================================================================================================
// =================================================================================================

//function to update the position
function update(){
    
    for(let i=0;i<stones.length;i++){
    
        //updating asteroids
        if(stones[i]==ast4){
            stones[i].x -= stones[i].speed;
            stones[i].y += stones[i].speed;

            if(stones[i].y> h ){
                stones[i].y=0;
                stones[i].x=700;
            }
            
        }else{
            stones[i].y += stones[i].speed;

            if(stones[i].y + stones[i].h > h ){
                stones[i].y=0;
            }
        }
    }

    //updating ship

    if(ship.moving && ship.moving==37){
        ship.x -= ship.speed;
        // score +=5;
    }

    if(ship.moving && ship.moving==38){
        ship.y -= ship.speed;
        // score +=5;
    }

    if(ship.moving && ship.moving==39){
        ship.x += ship.speed;
        score +=2;
    }

    if(ship.moving && ship.moving==40){
        ship.y += ship.speed;
        // score +=5;
    }

    //COLLISIONS
    //collision between ship and mars

    if(iscolliding(ship,mars)){
        gameover=true;
        draw();
        alert("your score:"+score);
    }

    //collision between ship and asteroid

    for(let i=0;i<stones.length;i++){
        if(iscolliding(ship,stones[i])){
            score -= 10;
        }

        if(score<0){
            gameover=true;
            alert("GAME OVER!!");
        }
    }

    //collision between energy and ship

    for(let i=0;i<energies.length;i++){
        if(iscolliding(ship,energies[i])){
            score-=5;
        }

        if(score<0){
            gameover=true;
            alert("GAME OVER!!");
        }
    }

}

// ==================================================================================================
// ==================================================================================================

function gameloop(){

    if(gameover){
        clearInterval(f);
    }
    draw();
    update();
}

// =======================================================================================================
// =======================================================================================================

load_img();
init()
f = setInterval(gameloop,100);