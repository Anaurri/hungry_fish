class Fish0 extends Fish {
    constructor(ctx, x, y) {
        /*Position and size's attributes*/
        super(ctx, x, y);
        /*Sprite's attributes*/
        this.sprite.src = './img/spriteFish0.png';
        /*Level's attributes*/
        this.level = 0;
        /*Score's attribute*/
        this.input = INPUT_FISH0;
        this.speed = SPEED_FISH0;
        this.factor = FACTOR_SIZE_FISH0;
    }
  }