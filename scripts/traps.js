class spikes{

    constructor(posX, posY, velocityX, velocityY, gravity, p) {
        this.size = 32;
        this.gravity = gravity;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.p1 = p.createVector(posX, posY + 18);
        this.p2 = p.createVector(posX+9, posY);
        this.p3 = p.createVector(posX+18, posY+18);
        this.center = p.createVector(posX + 9, posY + 9);
    }

    stopSpike(x, y){
        return (this.p1.y < y && this.p2.y < y && this.p3.y < y) && 
        (this.p1.x < x && this.p2.x < x && this.p3.x < x);
    }

    draw = function(p, player) {
        p.stroke('black');
        p.fill('grey');
        p.beginShape();

        this.velocityY += this.gravity;
        if(this.stopSpike(500, 500))
        {
            this.p1.y += this.velocityY;
            this.p2.y += this.velocityY;
            this.p3.y += this.velocityY;
        }

        p.vertex(this.p1.x, this.p1.y);
        p.vertex(this.p2.x, this.p2.y);
        p.vertex(this.p3.x, this.p3.y);

        p.endShape(p.CLOSE);
        if (this.collision(p, player)) {
            // the player died
            player.isDead = true;
            console.log("oh shit");
        }
    }

    collision(p, player){
        return p.collidePointTriangleVector(
            p.createVector(player.posX+32, player.posY+16),
            this.p1,
            this.p2,
            this.p3
        ) || p.collidePointTriangleVector(
            p.createVector(player.posX+5, player.posY+32),
            this.p1,
            this.p2,
            this.p3
        ) || p.collidePointTriangleVector(
            p.createVector(player.posX+16, player.posY+32),
            this.p1,
            this.p2,
            this.p3
        ) || p.collidePointTriangleVector(
            p.createVector(player.posX, player.posY+16),
            this.p1,
            this.p2,
            this.p3);
    }

    rotate(p, degrees)
    {
        this.p1 = p.createVector(
            (this.p1.x - this.center.x) * p.cos(degrees) - (this.p1.y - this.center.y) * p.sin(degrees) + this.center.x,
            (this.p1.x - this.center.x) * p.sin(degrees) + (this.p1.y - this.center.y) * p.cos(degrees) + this.center.y);
        this.p2 = p.createVector(
            (this.p2.x - this.center.x) * p.cos(degrees) - (this.p2.y - this.center.y) * p.sin(degrees) + this.center.x,
            (this.p2.x - this.center.x) * p.sin(degrees) + (this.p2.y - this.center.y) * p.cos(degrees) + this.center.y);
        this.p3 = p.createVector(
            (this.p3.x - this.center.x) * p.cos(degrees) - (this.p3.y - this.center.y) * p.sin(degrees) + this.center.x,
            (this.p3.x - this.center.x) * p.sin(degrees) + (this.p3.y - this.center.y) * p.cos(degrees) + this.center.y);
    }
}