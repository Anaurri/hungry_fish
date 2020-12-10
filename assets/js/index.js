window.addEventListener('load', () => {
  setTimeout(() => {
    const element = document.getElementById('intro');
    element.setAttribute('id', 'bg');

  document.querySelector('#btn').addEventListener('click', () => {
        const element = document.getElementById('canvas');
        element.setAttribute('id', 'game-canvas');

        const element2 = document.getElementById('bg');
        const child = document.getElementById('btn');
        element2.removeChild(child);

        const game = new Game('game-canvas');
        game.start();
        document.addEventListener('keydown', (event) => {
          game.onKeyEvent(event);
        });
        document.addEventListener('keyup', (event) => {
          game.onKeyEvent(event);
        })
    });
  }, 1000)

  });