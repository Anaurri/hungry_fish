class Game {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.canvas.height = 500;
      this.canvas.width = 1000;
      this.ctx = this.canvas.getContext('2d');
  
      this.fps = 1000 / 60;
      this.drawIntervalId = undefined;
  
      this.background = new Background(this.ctx);
      this.player = new Player(this.ctx, this.canvas.width/2, this.canvas.height/2);
      this.fish = [];
    }
  
    start() {
    /*setTimeOut con INTRO*/
      if (!this.drawIntervalId) {
        this.drawIntervalId = setInterval(() => {
          this.clear();
          this.move();
          this.draw();
          this.checkCollisions();
        }, this.fps)
      }
    }
  
    onKeyEvent(event) {
        /*onKeyEvent player*/
        console.log("entro en el onkey game")

        this.player.onKeyEvent(event);

    }
  
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        /*clear player*/
        /*clear all fish*/
        /*clear Bubbles*/
    }
  
    draw() {
        /*draw background*/
        this.background.draw();
        /*draw player*/
        this.player.draw();
        /*draw all fish*/
        /*draw Bubbles*/
    }
  
    move() {
        /*Move player*/
        this.player.move();
        /*Move all fish*/
        /*Move Bubbles*/
    }
  
    checkCollisions() {
        /*Check collision*/
        /*Imprimir score*/
        /*Check score 
        swhitch case :
        -      continuar
        -      cambiar nivel --> irá progresivamente creciendo ( puede crecer más y luego bajar otra vez para hacer efecto) y con sonido
        -      ganar
        -      perder */
    }

    stop() {
        /*LOSE/WIN*/
          clearInterval (this.drawIntervalId);
          this.drawIntervalId = undefined;
    }
  
  }