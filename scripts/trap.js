class trap {
    constructor(sprite, posX, posY) {
        this.size = 32;
        this.x = posX;
        this.y = posY;
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
            player1.posX+32,
            player1.posY+16,
            this.x,
            this.y+40,
            this.x+20,
            this.y, 
            this.x+40,
            this.y+40
        ) || p.collidePointTriangle(
            player1.posX+16,
            player1.posY+32,
            this.x,
            this.y+40,
            this.x+20,
            this.y, 
            this.x+40,
            this.y+40
        );
    }
}