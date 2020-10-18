const level2 = (p)=>{
    let traps = [];

    player1 = new player(750, 400);
    player1.moveLeft = true;

    plat1 = new platform(650, 475, 100, 10);
    plat2 = new platform(550, 400, 40, 60);
    plat3 = new platform(450, 320, 40, 60);
    plat4 = new platform(350, 490, 40, 10);
    plat5 = new platform(0, 420, 260, 10);
    plat6 = new platform(175, 490, 40, 10);
    plat7 = new platform(10, 490, 50, 10);
    plat8 = new platform(30, 410, 120, 10);
    plat9 = new platform(100, 250, 120, 10);
    plat10 = new platform(300, 150, 400, 10);
    fallingplatform = new platform(70, 320, 120, 10);
    let fpVelocity = 0;
    let fpGravity = 0;

    plats=[plat1, plat2, plat3, plat4, plat6, plat7, plat8, plat9, plat10, fallingplatform];
    drawPlats = [plat1, plat2, plat3, plat4, plat5, plat6, plat7, plat8, plat9, plat10, fallingplatform];

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
        player1.setRespawnPoint(750, 400);
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

        drawPlats.forEach(function(arrayItem)
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
                fallingplatform = new platform(70, 320, 120, 10);
                fpVelocity = 0;
                fpGravity = 0;
                drawPlats = [plat1, plat2, plat3, plat4, plat5, plat6, plat7, plat8, plat9, plat10, fallingplatform];
                plats = [plat1, plat2, plat3, plat4, plat6, plat7, plat8, plat9, plat10, fallingplatform];
            }
            arrayItem.draw(p, player1);
        });

        fpVelocity += fpGravity;

        plats[plats.length - 1].posY += fpVelocity;
        drawPlats[drawPlats.length - 1].posY += fpVelocity;

        if(checkCollide(p, plat5, player1))
        {
            drawPlats = plats;
        }
        if(checkCollide(p, fallingplatform, player1))
        {
            fpGravity = 0.05;
        }

        if(player1.posX + 32 >= 685 && player1.posY < 50)
        {
            p.remove();
            app.nextLevel();
        }
    }

    p.mousePressed = function()
    {
        p.remove();
        //Example trigger for next level
        app.nextLevel();
    }
}

function checkCollide(p, plat, player) {
    return p.collideRectRect(player.posX, player.posY, 27, 32, plat.posX, plat.posY, plat.width, plat.height);
}