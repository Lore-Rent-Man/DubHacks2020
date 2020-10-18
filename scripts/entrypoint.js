let timer = setInterval(() => {
    if (!$("myContainer").classList.contains("hidden")) {
        clearInterval(timer);
        app = new Application();
        app.pushLevel(level1);
        app.pushLevel(level2);
        app.pushLevel(level3);
        app.startGame();
    }
}, 500);
