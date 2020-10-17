class Sprite{
    constructor(speed, animation, spritesheet, spritedata)
    {
        this.spritelink = spritelink;
        this.spritedata;
        this.spritesheet;
        this.animation = animation;
        this.len = this.animation.len;
        this.speed = speed;
        this.index = 0;
    }

    show(p){
        p.image(this.animation[this.index % this.len], 0, 0); 
    }

    animate(){
        this.index += this.speed;
    }
}

class player{
    constructor(spritelink){
        this.posX = 0;
        this.posY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 10;
        this.size = 0;

        this.sprite;
    }

    loadSprite()
    {
        
    }

    useSprite(sprite)
    {
        this.sprite = sprite;
    }

    loadplayer(p5, speed)
    {
        this.spritedata = p5.loadJSON('spriteness.json');
        this.spritesheet = p5.loadImage(this.spritelink);
    }

    jump(){
    }
}