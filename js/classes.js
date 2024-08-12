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
        this.offset = offset;
        //Checks if image loaded
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
            this.position.x - this.offset.x,//where image should be placed on x coordinate
            this.position.y - this.offset.y, //where image should be placed on y coordinate
            (this.image.width / this.framesMax) * this.scale, //image scaled up for width
            this.image.height * this.scale //image scaled up for height
        ) 
    }

    animateFrames()
    {
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
    update()
    {
        this.draw();
        this.animateFrames();
    }
}

class Fighter extends Sprite{
    constructor({
        position, 
        velocity, 
        color = 'red', 
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = {x: 0, y: 0},
        sprites
    }) 
    {
        super({
                position,
                imageSrc, 
                scale, 
                framesMax,
                offset
        });
    
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
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
        this.sprites = sprites;

        for(const sprite in this.sprites)
        {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = this.sprites[sprite].imageSrc;
        }
        console.log(this.sprites);
    }

    update(){
        this.draw();
        this.animateFrames();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        //gravity function
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 35)
        {
            this.velocity.y = 0;
            this.position.y = 391;
        }
        else
        {
            this.velocity.y += gravity;
        }
    }
    attack(){
        this.switchSprite('attack');
        this.isAttacking = true;
        setTimeout(() =>{
            this.isAttacking = false;
        }, 100)
    }

    switchSprite(sprite){
        if((this.image === this.sprites.attack.image) && this.framesCurrent < this.sprites.attack.framesMax - 1) return;
        switch(sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image)
                {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurrent = 0;
                }
                break;   
            case 'run':
                if(this.image !== this.sprites.run.image)
                {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'jump':
                if(this.image !== this.sprites.jump.image)
                {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'fall':
                if(this.image !== this.sprites.fall.image)
                {
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'attack':
                if(this.image !== this.sprites.attack.image)
                {
                    this.image = this.sprites.attack.image;
                    this.framesMax = this.sprites.attack.framesMax;
                    this.framesCurrent = 0;
                }
        }
    }
    
}