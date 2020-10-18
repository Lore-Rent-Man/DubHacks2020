class platform {
    constructor (posX, posY, width, height, r = 255, g = 204, b = 0){
      this.posX = posX;
      this.posY = posY;
      this.width = width;
      this.height = height;
      this.r = r;
      this.b = b;
      this.g = g;
    }

    draw(p)
    {
      p.fill(this.r, this.g, this.b);
      p.rect(this.posX, this.posY, this.width, this.height);
    }
}