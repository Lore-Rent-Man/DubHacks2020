class platform {
    constructor (posX, posY, width, height, color = [220, 204, 0]){
      this.posX = posX;
      this.posY = posY;
      this.width = width;
      this.height = height;
      this.color = color;
    }

    draw(p)
    {
      p.fill(this.color[0], this.color[1], this.color[2]);
      p.rect(this.posX, this.posY, this.width, this.height);
    }
}