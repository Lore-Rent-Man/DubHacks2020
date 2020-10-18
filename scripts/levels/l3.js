const level3 = (p)=>{
    let traps = [];

    let count = 0;
    player1 = new player(330, 468);
    player1.moveLeft = true;

    plat1 = new platform(650, 445, 100, 10);
    plat2 = new platform(550, 300, 100, 10);
    plat3 = new platform(450, 300, 100, 10);
    plat4 = new platform(350, 350, 100, 10);

    plats=[plat1, plat2, plat3, plat4];

    let backgroundImg;
    let flag;
    p.preload = function()
    {
        //Function to load sprites, textures, etc
        player1.preloadSprites(p);
        backgroundImg = p.loadImage('../sprite_folders/backgrounds/meadow.jpg');
        flag = p.loadImage('../sprite_folders/trophy/flag.png');

        for(let i = 0; i < 20; i++)
        {
            traps[i] = new circleTrap(Math.floor(Math.random() * app.windowWidth),
            Math.floor(Math.random() * app.windowHeight), 10);
        }
    }

    p.setup = function()
    {
        //Initialization of canvas and other code that needs to be run once at the beginning of the level
        p.createCanvas(app.windowWidth, app.windowHeight);
        player1.loadAnimations(p);
        player1.setRespawnPoint(330, 468);
        flag.resize(32, 32);

    }

    p.draw = function()
    {
        count++;
        if (count >= 900) {
            $("myContainer").classList.add("hidden");
            //TODO: game win
            p.remove();
            qs("canvas").remove();
            $("chat-room").classList.remove("hidden");
        }
        //Function that draws each frame
        p.image(backgroundImg, 0, 0);
        p.image(flag, 685, 10 + p.sin(p.frameCount/60) * 5);
        p.fill(255, 204, 0);
        player1.draw(p, plats, true);

        plats.forEach(function(arrayItem)
        {
            arrayItem.draw(p);
        });

        traps.forEach(function(arrayItem)
        {
            if (arrayItem.draw(p, player1)) {
                traps.forEach(arrayItem => {
                    arrayItem.velocityX = 0;
                    arrayItem.velocityY = 0;
                    arrayItem.y = Math.min(arrayItem.y, app.windowHeight - 50);
                });
                count = 0;
            }

            arrayItem.velocityX += (Math.random() - 0.5);
            arrayItem.velocityX = Math.min(5, arrayItem.velocityX);
            arrayItem.velocityX = Math.max(-5, arrayItem.velocityX);
            arrayItem.velocityY += (Math.random() - 0.5);
            arrayItem.velocityY = Math.min(5, arrayItem.velocityY);
            arrayItem.velocityY = Math.max(-5, arrayItem.velocityY);


            if (arrayItem.x >= app.windowWidth || arrayItem.x <= 0) {
                arrayItem.velocityX *= -1;
            }

            if (arrayItem.y >= app.windowHeight || arrayItem.y <= 0) {
                arrayItem.velocityY *= -1;
            }
        });
    }
    p.mousePressed = function()
    {
        //ALWAYS CALL THIS PIECE OF CODE AFTER CREATING A NEW LEVEL
        p.remove();
        //Example trigger for next level
        app.nextLevel();
    }
}