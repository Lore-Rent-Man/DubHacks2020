class SpritePNG{
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
        this.spritedata = p.loadJSON(this.spritedata);
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

    show(posX, posY, offset, frameCount, p)
    {
        let index = offset + (p.floor(this.index) % frameCount);
        p.image(this.animation[index], posX, posY);
    }

    animate()
    {
        this.index += this.speed;
    }
}