
const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
const gravity = 0.7;
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

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
    }
})

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
console.log(player);


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

function rectangularCollision({rectangle1, rectangle2})
{
    return(rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
} 

function determineWinner({player, enemy, timerId})
{
    clearTimeout(timerId);
    document.querySelector('#displayText').style.display = 'flex';
    if(player.health === enemy.health)
        {
            document.querySelector('#displayText').innerHTML = 'Tie';
        }
        else if(player.health > enemy.health)
        {
            document.querySelector('#displayText').innerHTML = 'Player 1 wins';
        }
        else
        {
            document.querySelector('#displayText').innerHTML = 'Player 2 wins';
        }
}

let timer = 10;
let timerId;
function decreaseTimer()
{
    if(timer > 0) 
    {
        timer--;
        document.querySelector("#timer").innerHTML = timer;
        timerId = setTimeout(decreaseTimer, 1000);
    }
    if(timer === 0)
    {
        determineWinner({player, enemy, timerId});
    }
}

decreaseTimer();
function animate(){
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
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
            if(player.position.y + player.height >= canvas.height)
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
            if(enemy.position.y + enemy.height >= canvas.height)
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
