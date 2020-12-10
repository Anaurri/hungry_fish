class Player {

    constructor(ctx, x, y) {
        /*Position and size's attributes*/
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 0;
        this.height = 0;
        this.maxX = this.ctx.canvas.width-70;
        this.minX = 20;
        this.maxY = this.ctx.canvas.height-70;
        this.minY = 20;
        this.vx = 0;   
        this.vy = 0;    
        this.factorSize = 0.6;
        /*Sprite's attributes*/
        this.sprite = new Image ();
        this.sprite.src = './img/spritePlayerb.png';
        this.sprite.horizontalFrames = 4;
        this.sprite.verticalFrames = 3;
        this.sprite.verticalFrameIndex = 0; /*Inicializamos en (0,0) && toRight*/
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.isReady = false;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        }
        /*Movement's attributes*/
        this.movements = {
          up: false,
          right: false,
          down : false,
          left: false
        }
        this.toRight = true;
        this.drawCount = 0;
        /*Level's attributes*/
        this.level = 1;
        this.change = false;
        /*Score's attribute*/
        this.score = 0;
        /*State's attribute: vivo/comiendo/muerto*/    
        this.lose = false; 

    }
    isReady() {
      return this.sprite.isReady;
    }
    onKeyEvent(event) {

      const state = event.type === 'keydown';
      switch (event.keyCode) {
        
      case KEY_RIGHT:
        this.movements.right = state;
        this.movements.left = false;
        this.sprite.verticalFrameIndex = 0;
        break;
      case KEY_LEFT:
        this.movements.left = state;
        this.movements.right = false;
        this.sprite.verticalFrameIndex = 1;
        break;
      case KEY_UP:
        this.movements.up = state;
        break;  
      case KEY_DOWN:
        this.movements.down = state;
        break;       
      }
    }
    clear() {
    }
    draw() {
      if (this.sprite.isReady){
          this.ctx.drawImage (             
              /*TODO ESTO ES POSICIONAMIENTO DENTRO DE A IMAGEN SPRITE*/
              this.sprite,
              this.sprite.frameWidth * this.sprite.horizontalFrameIndex ,
              this.sprite.frameHeight * this.sprite.verticalFrameIndex ,
              this.sprite.frameWidth ,
              this.sprite.frameHeight ,
              /*LUEGO TENGO QUE POSICIONARLO EN EL CANVAS*/
              this.x,
              this.y, 
              this.width*this.factorSize ,
              this.height*this.factorSize
            ) 
        this.drawCount++;
        this.animate();
      }
    }
    
    move() {
      if (!this.lose){
        if (this.movements.right) {
          this.vx = SPEED;
        } else if (this.movements.left) {
          this.vx = -SPEED;
        } else {
          this.vx = 0;
        }
        if (this.movements.up) {
          this.vy = -SPEED;
        } else if (this.movements.down) {
          this.vy = SPEED;
        } else {
          this.vy = 0;
        }
        this.x += this.vx;
        this.y += this.vy;


        // Check canvas bounds
        if (this.x >= this.maxX) {
          this.x = this.maxX;
        } else if (this.x <= this.minX) {
          this.x = this.minX;
        }
        if (this.y >= this.maxY) {
          this.y = this.maxY;
        }else if (this.y <= this.minY) {
          this.y = this.minY;
        }
      } else {
        /*El player ha perdido*/
        if (this.y >= this.maxY) {
          this.y = this.maxY;
        } else {
          this.vy = SPEED ;
          this.y += this.vy;
        }

      }
    }
    animate() {
      if (this.drawCount % 10 === 0) {
        if (!this.lose){
        this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
        } else {
          this.sprite.verticalFrameIndex = 2;
          this.sprite.horizontalFrameIndex = 0;
        }
        this.drawCount = 0;
      }

    }
    collidesWith(element) {
      return this.x + this.width < element.x + element.width &&
        this.x + this.width > element.x &&
        this.y + this.height/1.4 < element.y + element.height &&
        this.y + this.height/1.4 > element.y;

    } 
    changeLevel () {
      if (this.change){
      this.level ++;
      this.factorSize = this.factorSize * 1.5;
      this.change = false;
      }
    } 
}