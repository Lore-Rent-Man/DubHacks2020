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
    
    drawIdle(p)
    {
        this.animations[1].show(this.posX, this.posY, p);
        this.animations[1].animate();
    }

    jump(){

    }
}