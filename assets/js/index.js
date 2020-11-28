window.addEventListener('load', () => {
    const game = new Game('game-canvas');
    game.start();
   document.addEventListener('keydown', (event) => {
    console.log("addeventlistener1")

      game.onKeyEvent(event);
    });
    document.addEventListener('keyup', (event) => {
      console.log("addeventlistener2")

      game.onKeyEvent(event);
    })
   /* document.addEventListener('keypress', (event) => {
      
    })*/
  });