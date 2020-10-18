class circleTrap {
    constructor(x, y, diameter) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    draw = function(p, player){
        p.fill(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
        p.circle(this.x, this.y, this.diameter);

        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.collide(p, player)) {
            player.isDead = true;
            return true;
        }
    }

    collide(p, player) {
        return p.collideRectCircle(player.posX, player.posY, 32, 32, this.x, this.y, this.diameter);
    }
}