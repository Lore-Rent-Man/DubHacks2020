//Loading animations
player1 = new player();
const color = [255, 204, 0];
let traps = [];
let plats = [];

const l1 = (p)=>{
    let backgroundImg;
    p.preload = function()
    {
        //Function to load sprites, textures, etc
        player1.preloadSprites(p);
        backgroundImg = p.loadImage('../sprite_folders/backgrounds/meadow.jpg');
        flag = p.loadImage('../sprite_folders/trophy/flag.png');
        trap1 = new spikes(40, 500, 0, 0, 0, p);
    }

    p.setup = function()
    {
        //Initialization of canvas and other code that needs to be run once at the beginning of the level
        p.createCanvas(app.windowWidth, app.windowHeight);
        player1.loadAnimations(p);
        player1.setRespawnPoint(0, app.windowHeight - 32);
        for (let i=0;i<10;i++)
        {
            traps[i] = new trap(spike, (i+1)*32, 500-32);
        }
    }

    p.draw = function()
    {
        //Function that draws each frame
        p.image(backgroundImg, -300, -300);
        plat1 = new platform(p, 100, 430, 60, 10, color);
        plat2 = new platform(p, 200, 350, 60, 10, color);
        plats.push(plat1);
        plats.push(plat2);
        player1.draw(p, plats);
        trap1.draw(p, player1);
    }
    p.mousePressed = function()
    {
        //ALWAYS CALL THIS PIECE OF CODE AFTER CREATING A NEW LEVEL
        //p.remove();
        //Example trigger for next level
        //app.nextLevel();
    }
}