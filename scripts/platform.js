class platform {
    constructor (p, posX, posY, width, height, color){
      this.posX = posX;
      this.posY = posY;
      this.width = width;
      this.height = height;
      this.color = color;
      p.fill(color[0], color[1], color[2]);
      p.rect(posX, posY, width, height, 5);
    }

}