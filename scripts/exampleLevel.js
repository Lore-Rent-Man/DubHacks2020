//Loading animations
idle = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Idle_4.png', 4);
walk = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Walk_6.png', 6);
jump = new BunnySprite(0.2, '../sprite_folders/pink_monster/Pink_Monster_Jump_8.png', 8);


const l1 = (p)=>{
    p.preload = function()
    {
        idle.preload(p);
        walk.preload(p);
        jump.preload(p);
        rock.preload(p);
        //Function to load sprites, textures, etc
    }

    p.setup = function()
    {
        //Initialization of canvas and other code that needs to be run once at the beginning of the level
        p.createCanvas(app.windowWidth, app.windowHeight);
        idle.loadAnimation(p);
        walk.loadAnimation(p);
        jump.loadAnimation(p);
        rock.loadAnimation(p);
    }

    p.draw = function()
    {
        //Function that draws each frame
        p.background(220);
        idle.show(250, 250, p);
        idle.animate();

        walk.show(250, 300, p);
        walk.animate();

        jump.show(250, 350, p);
        jump.animate();

        rock.show(250, 400, p);
    }

    p.mousePressed = function()
    {
        //ALWAYS CALL THIS PIECE OF CODE AFTER CREATING A NEW LEVEL
        //p.remove();
        //Example trigger for next level
        //app.nextLevel();
    }
}