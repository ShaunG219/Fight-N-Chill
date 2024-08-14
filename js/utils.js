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

function restart({player, enemy})
{
    player.revive();
    player.position.x = 0;
    player.position.y = 0;
    
    gsap.killTweensOf('#playerHealth');
    document.querySelector('#playerHealth').style.width = player.health + '%';
    

    enemy.revive();
    enemy.position.x = 942;
    enemy.position.y = 0;
    gsap.killTweensOf('#enemyhealth');
    document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    
    timeRestart = true;
    decreaseTimer(timeRestart);

    document.querySelector('#displayText').style.display = 'none';
}

let timer = 10;
let timerId;
function decreaseTimer(timeRestart)
{
    if(timeRestart === true)
    {
        timer = 10;
    }
    if(timer > 0) 
    {
        document.querySelector("#timer").innerHTML = timer;
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
    }
    if(timer === 0)
    {
        document.querySelector("#timer").innerHTML = timer;
        determineWinner({player, enemy, timerId});
    }
}