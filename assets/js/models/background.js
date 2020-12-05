/* El fonde es estático. Se añaden complementos en movimiento: 
Burbujas.
si da tiempo-->Corales.*/
class Background {
    constructor (ctx){
        this.ctx = ctx;
        this.x = 0 ;
        this.y = 0 ;

        this.img = new Image();
        this.img.src = './img/deep.jpg';
        this.img.isReady = false;

        this.img.onload = () => { 
            this.img.isReady = true;
            this.img.width = this.ctx.canvas.width;
            this.img.height = this.ctx.canvas.height;
            this.width = this.ctx.canvas.width;
            this.height = this.ctx.canvas.height;
        }
        this.movement = {
            rigth : false,
        }
    }

    draw (){
        if (this.img.isReady){
            this.ctx.drawImage (
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }
}
