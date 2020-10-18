class trap {
    constructor(sprite, posX, posY, velocity, gravity) {
        this.size = 32;
        this.x = posX;
        this.y = posY;
        this.velocity = velocity;
        this.gravity = gravity;
        this.sprite = sprite;
    }

    draw = function(p, player) {
        this.sprite.show(this.x, this.y, p);
        if (this.collision(p, player)) {
            // the player died
            player.isDead = true;
            console.log("oh shit");
        }
    }

    collision(p, player)
    {
        return p.collidePointTriangle(
            player.posX+32,
            player.posY+16,
            this.x,
            this.y+32,
            this.x+16,
            this.y, 
            this.x+32,
            this.y+32
        ) || p.collidePointTriangle(
            player.posX+16,
            player.posY+32,
            this.x,
            this.y+32,
            this.x+16,
            this.y, 
            this.x+32,
            this.y+32
        );
    }
}