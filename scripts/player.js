class player{
    constructor(posX, posY){

        const idle  = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Idle_4.png', 4);
        const walk  = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Walk_6.png', 6);
        const jump  = new BunnySprite(0.001, '../sprite_folders/pink_monster/Pink_Monster_Jump_8.png', 8);
        const run   = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Run_6.png', 6);
        const death = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Death_8.png', 8);
        //const doubleJump = new BunnySprite(0.2, '../sprite_folders/pink_monster/Double_Jump_Dust_5.png', 5); Implement dust particles if I have the time

        this.speed = 3;
        this.gravity = 0.5;
        this.numJumps = 2;

        this.posX = posX;
        this.posY = posY;
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
        this.onPlatform = false;

        this.isDead = false;
        this.deadFrameCount = 0;

        this.respawnX = 0;
        this.respawnY = 0;
        this.automaticRespawn = true;
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
            if (p.keyCode == p.UP_ARROW && ((!this.isJumping) || this.numJumps != 0))
            {
                this.velocityY = -7;
                this.isJumping = true;
                this.numJumps--;
                this.onPlatform = false;
            }
            if (p.keyCode == 82 && this.deadFrameCount >= 8/0.2)
            {
                this.isDead = false;
                this.deadFrameCount = 0;
                this.posX = this.respawnX;
                this.posY = this.respawnY;
            }
            if (p.keyCode == 65)
            {
                this.isDead = true;
            }
        }
    }

    draw(p, plats)
    {
        if(!this.isDead){
            if (p.keyIsDown(p.LEFT_ARROW)) {
                this.velocityX = -this.speed;
                this.moveLeft = true;
            }
            else if (p.keyIsDown(p.RIGHT_ARROW)) {
                this.velocityX = this.speed;
                this.moveLeft = false;
            }
            else if (p.keyIsDown(p.DOWN_ARROW)){
                this.velocityY = 8;
            }
            else {
                this.velocityX = 0;
            }

            this.velocityY += this.gravity;

            this.posX += this.velocityX;
            this.posY += this.velocityY;

            for (let i=0; i<plats.length; i++) {
                if (this.checkCollide(p, plats[i])) {
                    //right
                    if (this.posX < plats[i].posX + plats[i].width - 7 && this.posX > plats[i].posX + plats[i].width - 15) {
                        this.posX = plats[i].posX + plats[i].width - 7;
                    } else
                    //left
                    if (this.posX + 25 > plats[i].posX && this.posX + 25 < plats[i].posX + 15) {
                        console.log(this.posX +" "+plats[i].posX);
                        this.posX = plats[i].posX - 25;
                    } else
                    // buttom
                    if (this.posY < plats[i].posY + plats[i].height && this.posY > plats[i].posY + plats[i].height - 15) {
                        this.posY = plats[i].posY + plats[i].height;
                    } else
                    // top
                    if (this.posY + 32 > plats[i].posY && this.posY + 32 < plats[i].posY + 15) {
                        this.posY = plats[i].posY - 32;
                        this.isJumping = false;
                        this.numJumps = 2;
                        this.velocityY = 0;
                    }
                }
            }


            if (player1.posY > app.windowHeight - 32)
            {
                player1.posY = app.windowHeight - 32;
                this.isJumping = false;
                this.numJumps = 2;
            }
            if (player1.posX < -5) {
                player1.posX  = -5;
            }
            if (player1.posX > app.windowWidth - 27) {
                player1.posX  = app.windowWidth - 27;
            }

            if(p.isJumping)
            {
                this.drawAction(p, 2);
            }
            else if(p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown(p.RIGHT_ARROW))
            {
                this.drawAction(p, 3);
            } else
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
            if(this.automaticRespawn && this.deadFrameCount >= 8/0.2)
            {
                this.respawn();
            }
        }
    }

    drawAction(p, action, x = this.posX, y = this.posY)
    {
        if(this.moveLeft){
            this.animations[action].show(-x - 32, y, p, this.moveLeft);
        }
        else
        {
            this.animations[action].show(x, y, p, this.moveLeft);
        }
        this.animations[action].animate();
    }

    checkCollide(p, plat) {
        return p.collideRectRect(this.posX, this.posY, 27, 32, plat.posX, plat.posY, plat.width, plat.height);
    }

    setRespawnPoint(x, y)
    {
        this.respawnX = x;
        this.respawnY = y;
    }

    respawn()
    {
        this.isDead = false;
        this.deadFrameCount = 0;
        this.posX = this.respawnX;
        this.posY = this.respawnY;
    }
}