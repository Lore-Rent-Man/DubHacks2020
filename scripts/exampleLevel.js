const l1 = (p)=>{
    p.preload = function()
    {
        //Function to load sprites, textures, etc
    }

    p.setup = function()
    {
        //Initialization of canvas and other code that needs to be run once at the beginning of the level
        p.createCanvas(app.windowWidth, app.windowHeight);
    }

    p.draw = function()
    {
        //Function that draws each frame
        p.background(220);
    }

    p.mousePressed = function()
    {
        //ALWAYS CALL THIS PIECE OF CODE AFTER CREATING A NEW LEVEL
        p.remove();
        //Example trigger for next level
        app.nextLevel();
    }
}