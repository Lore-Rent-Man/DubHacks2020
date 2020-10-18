class player{
    constructor(){

        this.speed = 3;
        this.gravity = 2;

        this.posX = 0;
        this.posY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.size = 0;

        const idle = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Idle_4.png', 4);
        const walk = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Walk_6.png', 6);
        const jump = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Jump_8.png', 8);

        this.animations = [];
        this.animations.push(idle); //0 --- Idle
        this.animations.push(walk); //1 --- Walk
        this.animations.push(jump); //2 --- Jump

        this.moveLeft = false;
        
        this.numJumps = 2;
        this.isJumping = false;
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
            this.velocityX = -this.speed;
            this.moveLeft = true;
        }
        else if (p.keyIsDown(p.RIGHT_ARROW)) {
            this.velocityX = this.speed;
            this.moveLeft = false;
        }
        else
        {
            this.velocityX = 0;
        }

        if(p.keyIsDown(p.UP_ARROW) && ((!this.isJumping) || this.numJumps != 0))
        {
            this.velocityY = -30;
            this.isJumping = true;
            this.numJumps--;
        }

        this.velocityY += this.gravity;

        this.posX += this.velocityX;
        this.posY += this.velocityY;

        if(player1.posY > app.windowHeight - 32)
        {
            player1.posY = app.windowHeight - 32;
            this.isJumping = false;
            this.numJumps = 2;
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
}