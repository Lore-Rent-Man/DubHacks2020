//Loading animations
let spike = new Sprite(1, '../sprite_folders/traps/output-onlinepngtools.png');
player1 = new player();
plat1 = new platform(100, 430, 60, 10);
plat2 = new platform(200, 350, 60, 10);
plats=[plat1, plat2];
let traps = [];

const l1 = (p)=>{
    let backgroundImg;
    p.preload = function()
    {
        //Function to load sprites, textures, etc
        player1.preloadSprites(p);
        spike.preload(p);
        backgroundImg = p.loadImage('../sprite_folders/backgrounds/meadow.jpg');
    }

    p.setup = function()
    {
        //Initialization of canvas and other code that needs to be run once at the beginning of the level
        p.createCanvas(app.windowWidth, app.windowHeight);
        spike.loadAnimation(p);
        player1.loadAnimations(p);
        player1.setRespawnPoint(0, app.windowHeight - 32);
        for(let i=0;i<10;i++)
        {
            traps[i] = new trap(spike, (i+1)*32, 500-32);
        }
    }

    p.draw = function()
    {
        //Function that draws each frame
        p.image(backgroundImg, -300, -300);
        p.fill(255, 204, 0);
        p.rect(100, 430, 60, 10, 5);
        p.rect(200, 350, 60, 10, 5);
        player1.draw(p, plats);
        for(let i=0;i<10;i++)
        {
            traps[i].draw(p, player1);
        }
    }
    p.mousePressed = function()
    {
        //ALWAYS CALL THIS PIECE OF CODE AFTER CREATING A NEW LEVEL
        //p.remove();
        //Example trigger for next level
        //app.nextLevel();
    }
}