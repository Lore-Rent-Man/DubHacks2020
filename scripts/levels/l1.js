const level1 = (p)=>{
    let backgroundImg;
    let flag;

    player1 = new player(0, 500-18);
    plat1 = new platform(100, 430, 60, 10);
    plat2 = new platform(200, 350, 60, 10);
    plat3 = new platform(380, 350, 60, 10);
    plat4 = new platform(0, 260, 440, 10);
    plat5 = new platform(550, 150, 50, 500);
    plat6 = new platform(0, 175, 60, 10);
    plat7 = new platform(100, 100, 300, 10);
    plat8 = new platform(650, 50, 100, 450, [50, 50, 50]);

    plats=[plat1, plat2, plat3, plat4, plat5, plat6, plat7, plat8];

    let traps = [];
    p.preload = function()
    {
        //Function to load sprites, textures, etc
        player1.preloadSprites(p);
        backgroundImg = p.loadImage('../sprite_folders/backgrounds/level1.jpg');
        flag = p.loadImage('../sprite_folders/trophy/flag.png');

        //static spikes
        for(let i=0;i<22;i++)
        {
            traps[i] = new spikes((i+3)*18, 500-18, 0, 0, 0, p);
        }
        firstSpike = new spikes(242, 350-18, 0, 0, 0, p);
        secondSpike = new spikes(300, 270, 0, 0, 0, p);
        secondSpike.rotate(p, p.PI);
        thirdSpike = new spikes(410, 270-28, 0, 0, 0, p);
        traps.push(firstSpike);
        traps.push(secondSpike);
        traps.push(thirdSpike);

        let positions = [0, 18, 36, 91, 108, 126];

        for(let i=0;i<positions.length;i++)
        {
            spike = new spikes(positions[i], 270-28, 0, 0, 0, p);
            traps.push(spike);
        }
    }

    p.setup = function()
    {
        //Initialization of canvas and other code that needs to be run once at the beginning of the level
        p.createCanvas(app.windowWidth, app.windowHeight);
        player1.loadAnimations(p);
        player1.setRespawnPoint(0, app.windowHeight - 32);
        backgroundImg.resize(1500, 1000);
        flag.resize(32, 32);
    }

    p.draw = function()
    {
        //Function that draws each frame
        p.image(backgroundImg, -300, -300);
        p.image(flag, 685, 10 + p.sin(p.frameCount/60) * 5);
        p.fill(255, 204, 0);

        player1.draw(p, plats, true);

        plats.forEach(function(arrayItem)
        {
            arrayItem.draw(p);
        });

        traps.forEach(function(arrayItem)
        {
            arrayItem.draw(p, player1);
        });

        if(player1.posX + 32 >= 685)
        {
            p.remove();
            app.nextLevel();
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