class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.height = 350;
    this.canvas.width = 600;
    this.ctx = this.canvas.getContext('2d');

    this.fps = 1000 / 60;
    this.drawIntervalId = undefined;

    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx, this.canvas.width / 2, this.canvas.height / 2);

    this.freqNewFish = 800;
    this.newFishIntervalId = undefined;
    this.bankOfFish = [];

    const themeAudio = new Audio;
    themeAudio.src = './sound/donkey-kong-country.mp3';
    themeAudio.volume = 0.2;


    const lose1Audio= new Audio;
    lose1Audio.src = './sound/gameOverSound.mp3';
    lose1Audio.volume = 0.2;
    const loseAPMAudio = new Audio;
    loseAPMAudio.src = './sound/gameOverAPM.m4a';
    loseAPMAudio.volume = 1;
    const winAudio = new Audio;
    winAudio.src = './sound/winTrompetas.m4a';
    winAudio.volume = 0.2;
    const winAPMAudio = new Audio;
    winAPMAudio.src = './sound/campeon.m4a';
    winAPMAudio.volume = 1;
    const youWinAudio = new Audio;
    youWinAudio.src = './sound/youWin.m4a';
    youWinAudio.volume = 0.2;

    this.sounds = {
      theme: themeAudio,
      lose1: lose1Audio,
      loseAPM: loseAPMAudio,
      win: winAudio,
      winAPM: winAPMAudio,
      youWin: youWinAudio,

    }
  }

  start() {
    /*setTimeOut con INTRO*/
    if (!this.drawIntervalId) {
      this.sounds.theme.play();
      this.drawIntervalId = setInterval(() => {
        if (this.sounds.theme.ended) {
          this.sounds.theme.play();
        }
        this.clear();
        this.fishGeneration();
        this.move();
        this.draw();
        this.checkCollisions();
        //   this.removeFish ();
      }, this.fps)
    }
  }

  fishGeneration() {
    /*Cada segundo genero un pez*/
    if (!this.newFishIntervalId) {
      this.newFishIntervalId = setInterval(() => {
        /*Random position Y axis. (98 es la altura del pez más grande)*/
        const maxY = this.canvas.height - (98 + 110);
        /*El 50que sumamos de más es para la parte de arriba , para q no moleste al marcador*/
        const yAxis = (Math.floor(Math.random() * maxY))+70;
        

        /*Random type of fish. Números entre 0 y 9*/
        const auxType = Math.floor(Math.random() * 10);
        /*Level 1 : F0 70%, F1 10% , F2 10% , F3 10%. El 30% mata*/
        if (this.player.level === 1) {
          switch (auxType) {
            case 1:
              this.fish = new Fish1(this.ctx, this.canvas.width, yAxis);
              break;
            case 2:
              this.fish = new Fish2(this.ctx, this.canvas.width, yAxis);
              break;
            case 3:
              this.fish = new Fish3(this.ctx, this.canvas.width, yAxis);
              break;
            default:
              this.fish = new Fish0(this.ctx, this.canvas.width, yAxis);
          }
        }
        /*Level 2 : F0 20%, F1 40% , F2 30% , F3 10%. El 40% mata*/
        if (this.player.level === 2) {
          switch (auxType) {
            case 1, 2:
              this.fish = new Fish0(this.ctx, this.canvas.width, yAxis);
              break;
            case 3, 4, 5, 6:
              this.fish = new Fish1(this.ctx, this.canvas.width, yAxis);
              break;
            case 7, 8 ,9:
              this.fish = new Fish2(this.ctx, this.canvas.width, yAxis);
              break;
            default:
              this.fish = new Fish3(this.ctx, this.canvas.width, yAxis);
          }
        }
        /*Level 3 : F0 10%, F1 10% , F2 20% , F3 60%. El 60% mata*/
        if (this.player.level === 3) {
          switch (auxType) {
            case 1:
              this.fish = new Fish0(this.ctx, this.canvas.width, yAxis);
              break;
            case 2:
              this.fish = new Fish1(this.ctx, this.canvas.width, yAxis);
              break;
            case 3, 4 , 5:
              this.fish = new Fish2(this.ctx, this.canvas.width, yAxis);
              break;
            default:
              this.fish = new Fish3(this.ctx, this.canvas.width, yAxis);
          }
        }
        this.bankOfFish.push(this.fish);
      }, this.freqNewFish)
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
    this.bankOfFish = this.bankOfFish.filter(fish => fish.x > 0);
    /*clear Bubbles*/
  }
  draw() {
    /*draw background*/
    this.background.draw();
    /*draw player*/
  
    this.player.draw();
    if (this.player.y === this.player.maxY && this.player.lose) {
      this.sounds.lose1.play();
      setTimeout(() => {
        this.stop();
      }, 3000)
    }  else if (this.player.level === 4 && !this.player.lose){
      this.sounds.win.play();
      this.sounds.youWin.play();
      setTimeout(() => {
        this.stop();
      }, 3000)
    }
    /*draw all fish*/
    for (const fish of this.bankOfFish) {
      if (!fish.taken && fish.x > 0) {
        fish.draw();
      }
    }
    // this.drawScore();
    /*draw Bubbles*/
  }
  move() {
    /*Move player*/
    this.player.move();
    this.bankOfFish.forEach(fish => fish.move());
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

    /*draw all fish*/
    let aux = false;
    for (const fish of this.bankOfFish) {
      const collision = this.player.collidesWith(fish);
      if (collision) {
        if (this.player.level > fish.level) {
          this.player.score += fish.input;
          fish.taken = true;

          if ((this.player.score >= SCORE_TO_2 && this.player.level === 1) ||
             (this.player.score >= SCORE_TO_3 && this.player.level === 2) ||
             (this.player.score >= SCORE_TO_WIN && this.player.level === 3))
          {
            this.player.change = true;
            this.player.changeLevel();
          } 
        } else {
          this.player.lose = true;
        }
      }
      this.bankOfFish = this.bankOfFish.filter(fish => !fish.taken);
    }
  }

  drawScore() {
    const score= product.querySelector(".score");
    score.innerText = this.player.score;
  }
 
  stop() {
      /*LOSE/WIN*/
      clearInterval(this.drawIntervalId);
      this.drawIntervalId = undefined;
      clearInterval(this.newFishIntervalId);
      this.newFishIntervalId = undefined;

      const element = document.getElementById('bg');
      const child = document.getElementById('game-canvas');
      element.removeChild(child);
      if (this.player.y === this.player.maxY && this.player.lose) {
        this.sounds.loseAPM.play();
        element.setAttribute('id', 'lose');


      } else if (this.player.level === 4 && !this.player.lose){
        element.setAttribute('id', 'win');
        setTimeout(() => {
          this.sounds.winAPM.play();
        }, 1500)


      }
  }

}