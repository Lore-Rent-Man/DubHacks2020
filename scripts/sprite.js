class Sprite{
    constructor(speed, spritelink, spritedata){
        this.x = 0;
        this.y = 0;

        this.speed = speed;
        this.spritelink = spritelink;
        this.spritedata = spritedata;
        this.animation = [];
        this.index = 0;
        this.spritesheet;
    }

    preload(p){
        if(this.spritedata)
        {
            this.spritedata = p.loadJSON(this.spritedata);
        }
        this.spritesheet = p.loadImage(this.spritelink);
    }

    loadAnimation(){
        if(this.spritedata)
        {
            let frames = this.spritedata.data;
            for(let i=0;i<frames.length;i++)
            {
                let pos = frames[i];
                let img = this.spritesheet.get(pos.x, pos.y, pos.w, pos.h);
                this.animation.push(img);
            }
        }
        else
        {
            this.animation.push(this.spritesheet);
        }
    }

    show(posX, posY, p, offset = 0, frameCount = 0)
    {
        if(this.animation.length == 1)
        {
            p.image(this.animation[0], posX, posY);
        }
        else
        {
            let index = offset + (p.floor(this.index) % frameCount);
            p.image(this.animation[index], posX, posY);
        }
    }

    animate()
    {
        this.index += this.speed;
    }
}

class BunnySprite{
    constructor(speed, spritelink, frameCount){
        this.x = 0;
        this.y = 0;

        this.speed = speed;
        this.spritelink = spritelink;
        this.animation = [];
        this.index = 0;
        this.spritesheet;

        this.frameCount = frameCount;
    }

    preload(p){
        this.spritesheet = p.loadImage(this.spritelink);
    }

    loadAnimation(){
        let posX = 0;
        for(let i=0;i<this.frameCount;i++)
        {
            let img = this.spritesheet.get(posX, 0, 32, 33);
            this.animation.push(img);
            posX += 32;
        }
    }

    show(posX, posY, p, moveLeft)
    {
        let index = p.floor(this.index) % this.frameCount;
        p.push();
        if(moveLeft){
            p.scale(-1.0, 1.0);
        }
        p.image(this.animation[index], posX, posY);
        p.pop();
    }

    showFrames(posX, posY, offset, frameCount, p)
    {
        let index = offset + p.floor(this.index) % frameCount;
        p.push();
        p.scale(-1.0, 1.0);
        p.image(this.animation[index], posX, posY);
        p.pop();
    }

    animate()
    {
        this.index += this.speed;
    }
}