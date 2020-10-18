const level2 = (p)=>{
    let traps = [];

    player1 = new player(750, 400);
    player1.moveLeft = true;

    plat1 = new platform(650, 475, 100, 10);
    plat2 = new platform(550, 400, 10, 60);
    plat3 = new platform(450, 300, 10, 60);
    plat4 = new platform(350, 490, 10, 10);

    plats=[plat1, plat2, plat3, plat4];

    let backgroundImg;
    let flag;
    p.preload = function()
    {
        //Function to load sprites, textures, etc
        player1.preloadSprites(p);
        backgroundImg = p.loadImage('../sprite_folders/backgrounds/level2.jpg');
        flag = p.loadImage('../sprite_folders/trophy/flag.png');
    }

    p.setup = function()
    {
        //Initialization of canvas and other code that needs to be run once at the beginning of the level
        p.createCanvas(app.windowWidth, app.windowHeight);
        player1.loadAnimations(p);
        player1.setRespawnPoint(750, 450);
        flag.resize(32, 32);


        traps[0] = new spikes(547, -20, 0, 0, 0, p);
        traps[0].rotate(p, p.PI);
        traps[1] = new spikes(447, 520, 0, 0, 0, p);
    }

    p.draw = function()
    {
        //Function that draws each frame
        p.image(backgroundImg, 0, 0);
        p.image(flag, 685, 10 + p.sin(p.frameCount/60) * 5);
        p.fill(255, 204, 0);
        player1.draw(p, plats, false);

        plats.forEach(function(arrayItem)
        {
            arrayItem.draw(p);
        });

        traps.forEach(function(arrayItem)
        {
            if(player1.posX <= 575)
            {
                traps[0].gravity = 0.5;
            }
            if(player1.posX <= 465)
            {
                traps[1].gravity = -0.5;
                traps[0] = new spikes(547, -20, 0, 0, 0, p);
                traps[0].rotate(p, p.PI);
                traps[0].gravity = 0.5;
            }
            if(player1.isDead)
            {
                traps[0] = new spikes(547, -20, 0, 0, 0, p);
                traps[0].rotate(p, p.PI);
                traps[1] = new spikes(447, 520, 0, 0, 0, p);
            }
            arrayItem.draw(p, player1);
        });
    }
    p.mousePressed = function()
    {
        //ALWAYS CALL THIS PIECE OF CODE AFTER CREATING A NEW LEVEL
        //p.remove();
        //Example trigger for next level
        //app.nextLevel();
    }
}