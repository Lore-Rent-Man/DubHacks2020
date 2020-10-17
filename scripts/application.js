class Application{
  constructor(player){
    this.levels = [];
    this.end; 
    this.totalLevels = 0;
    this.levelCounter = 0;
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
    this.player = player;
  };

  pushLevel(level)
  {
    this.levels.push(level);
    this.totalLevels++;
  };

  setEnd(endingScreen)
  {
    this.end = endingScreen;
  };

  startGame()
  {
    let myp5 = new p5(this.levels[0]);
  };

  nextLevel()
  {
    this.levelCounter++;
    if(this.levelCounter <= this.totalLevels)
    {
      let myp5 = new p5(this.levels[this.levelCounter]);
    }
    else
    {
      let myp5 = new p5(this.end);
    }
  };
};



