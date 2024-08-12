const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.7;

const background1 = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/pixelArtHill/PNG/hillsLayerLarge01.png'
});
const background2 = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/pixelArtHill/PNG/hillsLayerLarge02.png'
});
const background3 = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/pixelArtHill/PNG/hillsLayerLarge03.png'
});
const background4 = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/pixelArtHill/PNG/hillsLayerLarge04.png'
});
const background5 = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/pixelArtHill/PNG/hillsLayerLarge05.png'
});
const background6 = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/pixelArtHill/PNG/hillsLayerLarge06.png'
});

const shop = new Sprite({
    position: {
        x: 477,
        y: 350,
    }, 
    imageSrc: './img/shop.png',
    scale: 1.5,
    framesMax: 6
});

const player = new Fighter({
    position:{
    x: 0,
    y: 0
    },
    velocity:{
    x: 0,
    y: 0
    },
    offset: {
        x: 185,
        y: 107
    },
    imageSrc: './img/medievalFighter/Sprites/Idle.png',
    framesMax: 10,
    scale: 3,
    sprites:{
        idle:{
            imageSrc: './img/medievalFighter/Sprites/Idle.png',
            framesMax: 10
        },
        run: {
            imageSrc: './img/medievalFighter/Sprites/Run.png',
            framesMax: 6
        },
        jump: {
            imageSrc: './img/medievalFighter/Sprites/Jump.png',
            framesMax: 2
        },
        fall:{
            imageSrc: './img/medievalFighter/Sprites/Fall.png',
            framesMax: 2
        },
        attack:{
            imageSrc: './img/medievalFighter/Sprites/Attack1.png',
            framesMax: 4
        },
        takeHit:{
            imageSrc: './img/medievalFighter/Sprites/takeHit.png',
            framesMax: 3
        }
    },
    attackBox: {
        offset:{
            x: 65,
            y: 40
        },
        width: 120,
        height: 50
    }
})

const enemy = new Fighter({
    position:{
    x: 942,
    y: 100
    },
    velocity:{
    x: 0,
    y: 0
    },
    color: 'blue',
    offset:{
    x: 215,
    y: 158
    },
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale: 2.4,
    sprites:{
        idle:{
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2
        },
        fall:{
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2
        },
        attack:{
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4
        },
        takeHit:{
            imageSrc: './img/kenji/takeHit.png',
            framesMax: 3
        }
    },
    attackBox: {
        offset:{
            x: -172,
            y: 40
        },
        width: 157,
        height: 50
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }
}

decreaseTimer();

function animate()
{
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background1.update();
    background2.update();
    background3.update();
    shop.update();
    background4.update();
    background5.update();
    
    player.update();
    enemy.update();
    background6.update();
    player.velocity.x = 0;
    enemy.velocity.x = 0;
    
    //Player
    if(keys.a.pressed && player.lastKey === 'a')
    {
        player.velocity.x = -5;
        player.switchSprite('run');
    }
    else if(keys.d.pressed && player.lastKey === 'd')
    {
        player.velocity.x = 5;
        player.switchSprite('run');
    }
    else{
        player.switchSprite('idle');
    }

    if(player.velocity.y < 0){
        player.switchSprite('jump');
    }
    else if(player.velocity.y > 0){
        player.switchSprite('fall');
    }

    //Enemy
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft')
    {
        enemy.velocity.x = -5
        enemy.switchSprite('run');
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight')
    {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    }
    else{
        enemy.switchSprite('idle');
    }

    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump');
    }
    else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall');
    }

    // detect for collision
    //player hits succesfully
    if(rectangularCollision({rectangle1: player, rectangle2: enemy}) && player.isAttacking && player.framesCurrent === 2)
    {
        player.isAttacking = false;
        if(enemy.health > 0 && player.health > 0 && timer > 0)
        {
            enemy.takeHit();
        }
            
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    }
    //player misses
    if(player.isAttacking && player.framesCurrent === 2)
    {
        player.isAttacking = false;
    }

    //detect for collision
    //enemy hit successfully
    if(rectangularCollision({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking)
    {
        enemy.isAttacking = false;
        if(player.health > 0 && enemy.health > 0 && timer > 0)
            player.takeHit();
        document.querySelector("#playerHealth").style.width = player.health + '%';
    }
    //enemy misses
    if(enemy.isAttacking && enemy.framesCurrent === 1)
    {
        enemy.isAttacking = false;
    }


    if(enemy.health <= 0 || player.health <=0)
    {
        determineWinner({player, enemy, timerId});
    }

    window.requestAnimationFrame(animate);
}
animate();

window.addEventListener('keydown', (event) => { 
    console.log(event.key);
    switch(event.key){
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break; 
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            if(player.position.y + player.height >= canvas.height - 35)
            {
                player.velocity.y = -20;
            }
            break;
        case ' ':
            player.attack();
            break;
//Enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break; 
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            if(enemy.position.y + enemy.height >= canvas.height - 35)
            {
                enemy.velocity.y = -20;
            }
            break;
        case 'ArrowDown':
            enemy.attack();
            break;
    }
    console.log(event.key);
})

window.addEventListener('keyup', (event) => { 
    console.log(event.key);
    
    switch(event.key){
        case 'd':
            keys.d.pressed = false;
            break; 
        case 'a':
            keys.a.pressed = false;
            break;
      
    }

    //Enemy
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break; 
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
      
    }
    console.log(event.key);
})
