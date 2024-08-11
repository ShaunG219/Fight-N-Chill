class Sprite
{
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}})
    {
        
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.image.src = imageSrc;
        this.offset = offset
        //Chekcs if image loaded
        this.loaded = false;
        this.image.onload = () => {this.loaded = true;};
    }

    draw()
    {
        //checks if image loaded, wont draw until image is loaded.
        if(!this.loaded) return;
        c.drawImage(
            this.image, //image
            this.framesCurrent * (this.image.width / this.framesMax), //crop width starting position
            0, //crop height starting position
            this.image.width / this.framesMax, //crop width size
            this.image.height, //crop height size
            this.position.x, - this.offset.x,//where image should be placed on x coordinate
            this.position.y - this.offset.y, //where image should be placed on y coordinate
            (this.image.width / this.framesMax) * this.scale, //image scaled up for width
            this.image.height * this.scale //image scaled up for height
        ) 
    }

    update()
    {
        this.draw();
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold === 0)
        {
            if(this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++;
            }
            else{
                this.framesCurrent = 0;
            }
        }
    }
}

class Fighter extends Sprite{
    constructor({
        position, 
        velocity, 
        color = 'red', 
        offset, 
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = {x: 0, y: 0}
    }) {
        super({
            position,
            imageSrc, 
            scale, 
            framesMax,
            offset
        })
    
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey
        this.attackBox = {
            position: 
            {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        }

        this.color = color;
        this.isAttacking;
        this.health = 100;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
    }

    update(){
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 35)
        {
            this.velocity.y = 0;
        }
        else
        {
            this.velocity.y += gravity;
        }
    }
    attack(){
        this.isAttacking = true;
        setTimeout(() =>{
            this.isAttacking = false;
        }, 100)
    }
    
}