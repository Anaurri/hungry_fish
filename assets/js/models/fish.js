class Fish {
    constructor(ctx, x, y) {
        /*Position and size's attributes*/
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 0;
        this.height = 0;
        this.vx = 0;   
        this.drawCount=0;

        /*Sprite's attributes*/
        this.sprite = new Image ();
        this.sprite.horizontalFrames = 5;
        this.sprite.verticalFrames = 1;
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
    }
    isReady() {
      return this.sprite.isReady;
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
            this.width * this.factor ,
            this.height * this.factor
          ) 
      this.drawCount++;
      this.animate();
      }
    }
    
    move() {
        this.vx = -this.speed;
        // Check canvas bounds
        if (this.x <= 0) {
            //borramos pez
        }else {
            this.x += this.vx;
        }
    }
    animate() {
      if (this.drawCount % 10 === 0) {
        this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
        this.drawCount = 0;
      }
    }
    collidesWith(element) {
    }
}