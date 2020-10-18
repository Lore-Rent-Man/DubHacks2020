class player{
    constructor(){

        const idle  = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Idle_4.png', 4);
        const walk  = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Walk_6.png', 6);
        const jump  = new BunnySprite(0.001, '../sprite_folders/pink_monster/Pink_Monster_Jump_8.png', 8);
        const run   = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Run_6.png', 6);
        const death = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Death_8.png', 8);

        this.speed = 3;
        this.gravity = 0.5;
        this.numJumps = 5;

        this.posX = 0;
        this.posY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.size = 0;

        this.animations = [];
        this.animations.push(idle);  //0 --- Idle
        this.animations.push(walk);  //1 --- Walk
        this.animations.push(jump);  //2 --- Jump
        this.animations.push(run);   //3 --- Run
        this.animations.push(death); //4 --- Death

        this.moveLeft = false;
        this.isJumping = false;

        this.isDead = false;
        this.deadFrameCount = 0;
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

        p.keyPressed = () =>
        {
            console.log(p.keyCode);
            if(p.keyCode == p.UP_ARROW && ((!this.isJumping) || this.numJumps != 0))
            {
                this.velocityY = -8;
                this.isJumping = true;
                this.numJumps--;
            }
            if(p.keyCode == 82 && this.deadFrameCount >= 8/0.2)
            {
                this.isDead = false;
                this.deadFrameCount = 0;
            }
            if(p.keyCode == 65)
            {
                this.isDead = true;
            }
        }
    }

    draw(p)
    {
        if(!this.isDead)
        {
            if (p.keyIsDown(p.LEFT_ARROW)) {
                this.velocityX = -this.speed;
                this.moveLeft = true;
            }
            else if (p.keyIsDown(p.RIGHT_ARROW)) {
                this.velocityX = this.speed;
                this.moveLeft = false;
            }else
            {
                this.velocityX = 0;
            }
            if (p.keyIsDown(p.DOWN_ARROW)){
                this.velocityY = 8;
            }
            this.velocityY += this.gravity;
    
            this.posX += this.velocityX;
            this.posY += this.velocityY;
    
            if(player1.posY > app.windowHeight - 32)
            {
                player1.posY = app.windowHeight - 32;
                this.isJumping = false;
                this.numJumps = 5;
            }
            if(p.isJumping)
            {
                this.drawAction(p, 2);
            }
            else if((p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown(p.RIGHT_ARROW) || p.keyIsDown(p.UP_ARROW) || p.keyIsDown(p.DOWN_ARROW)))
            {
                this.drawAction(p, 3);
            }
            else
            {
                this.drawAction(p, 0);
            }
        }
        else
        {
            if(this.deadFrameCount < 8/0.2)
            {
                this.drawAction(p, 4);   
                this.deadFrameCount++;
            }
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