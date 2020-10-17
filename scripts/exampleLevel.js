player = new SpritePNG(0.1, 'scripts/spriteness.png', 'scripts/spriteness.json');
const l1 = (p)=>{
    p.preload = function()
    {
        player.preload(p);
        //Function to load sprites, textures, etc
    }

    p.setup = function()
    {
        //Initialization of canvas and other code that needs to be run once at the beginning of the level
        p.createCanvas(app.windowWidth, app.windowHeight);
        player.loadAnimation(p);
    }

    p.draw = function()
    {
        //Function that draws each frame
        p.background(220);
        player.show(250, 250, 23, 4, p);
        player.animate();
    }

    p.mousePressed = function()
    {
        //ALWAYS CALL THIS PIECE OF CODE AFTER CREATING A NEW LEVEL
        //p.remove();
        //Example trigger for next level
        //app.nextLevel();
    }
}