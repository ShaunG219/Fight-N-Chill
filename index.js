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
    offset:{
    x:0,
    y:0
    },
    imageSrc: './img/medievalFighter/Sprites/Idle.png',
    framesMax: 10,
    scale: 3
});

const enemy = new Fighter({
    position:{
    x: 400,
    y: 100
    },
    velocity:{
    x: 0,
    y: 0
    },
    color: 'blue',
    offset:{
    x: -50,
    y: 0
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
    }
    else if(keys.d.pressed && player.lastKey === 'd')
    {
        player.velocity.x = 5;
    }

    //Enemy
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft')
        {
            enemy.velocity.x = -5;
        }
        else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight')
        {
            enemy.velocity.x = 5;
        }

    // detect for collision
    if(rectangularCollision({rectangle1: player, rectangle2: enemy}) && player.isAttacking)
    {
        player.isAttacking = false;
        if(enemy.health > 0 && player.health > 0 && timer > 0)
            enemy.health -= 20;
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    }

    if(rectangularCollision({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking)
    {
        enemy.isAttacking = false;
        if(player.health > 0 && enemy.health > 0 && timer > 0)
            player.health -= 20;
        document.querySelector("#playerHealth").style.width = player.health + '%';
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
            player.attack()
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
