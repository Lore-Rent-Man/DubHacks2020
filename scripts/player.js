class player{
    constructor(){
        this.posX = 0;
        this.posY = 450;
        this.velocityX = 0;
        this.velocityY = 0;
        this.gravity = 10;
        this.size = 0;

        const idle = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Idle_4.png', 4);
        const walk = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Walk_6.png', 6);
        const jump = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Jump_8.png', 8);

        this.animations = [];
        this.animations.push(idle); //0 --- Idle
        this.animations.push(walk); //1 --- Walk
        this.animations.push(jump); //2 --- Jump

        this.moveLeft = false;
    }

    preloadSprites(p)
    {
        for(let i=0;i<this.animations.length;i++)
        {
            this.animations[i].preload(p);
        }
    }

    loadAnimations(p)
    {
        for(let i=0;i<this.animations.length;i++)
        {
            this.animations[i].loadAnimation(p);
        }
    }

    draw(p)
    {
        if (p.keyIsDown(p.LEFT_ARROW)) {
            this.posX -= 1;
            this.moveLeft = true;
        }
        if (p.keyIsDown(p.RIGHT_ARROW)) {
            this.posX += 1;
            this.moveLeft = false;
        }
        if (p.keyIsDown(p.UP_ARROW)) {
            this.posY -= 1;
        }
        if (p.keyIsDown(p.DOWN_ARROW)) {
            this.posY += 1;
        }
        if(p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown(p.RIGHT_ARROW) || p.keyIsDown(p.UP_ARROW) || p.keyIsDown(p.DOWN_ARROW))
        {
            this.drawAction(p, 1);
        }
        else
        {
            this.drawAction(p, 0);
        }
    }

    drawAction(p, action)
    {
        if(this.moveLeft){
            this.animations[action].show(-this.posX - 32, this.posY, p, this.moveLeft);
        }
        else
        {
            this.animations[action].show(this.posX, this.posY, p, this.moveLeft);
        }
        this.animations[action].animate();
    }

    jump(){

    }
}