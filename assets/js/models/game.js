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
      this.fish1 = new Fish1(this.ctx, this.canvas.width, this.canvas.height/2);
      this.fish4 = new Fish4(this.ctx, this.canvas.width, this.canvas.height/2+50);

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
        if (!this.player.lose){
          this.player.draw();
        }
        /*draw all fish*/
        if(!this.fish1.taken && this.fish1.x > 0){
          this.fish1.draw();
        }
        console.log (this.fish4.x);
        if(this.fish4.x > 0){
          this.fish4.draw();
        }
        

        /*draw Bubbles*/
    }
  
    move() {
        /*Move player*/
        this.player.move();
        /*Move all fish*/
        this.fish1.move();
        this.fish4.move();

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
        const collision1 = this.player.collidesWith(this.fish1);
        if  (collision1){
          if(this.player.level > this.fish1.level){
            this.player.score += INPUT_FISH_1;
            this.fish1.taken  = true;
          } else {
            this.player.lose  = true;
          }
        }
        const collision4 = this.player.collidesWith(this.fish4);
        if  (collision4){
          if(this.player.level > this.fish4.level){
            this.player.score += INPUT_FISH_4;
            this.fish4.taken  = true;
          } else {
            this.player.lose  = true;
          }
        }

        console.log (this.player.score);

        // if (this.player.score >= SCORE_TO_WIN){
        //   //pantalla win
        // }else if (this.player.score >= SCORE_TO_4){
        //   //CAMBIAMOS DE NIVEL
        // }else if(this.player.score >= SCORE_TO_3){
        //   //CAMBIAMOS DE NIVEL
        // }else if(this.player.score >= SCORE_TO_2){
        //   //CAMBIAMOS DE NIVEL
        // }
    }

    stop() {
        /*LOSE/WIN*/
          clearInterval (this.drawIntervalId);
          this.drawIntervalId = undefined;
    }
  
  }