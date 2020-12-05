class Fish2 extends Fish {
  constructor(ctx, x, y) {
      /*Position and size's attributes*/
      super(ctx, x, y);
      /*Sprite's attributes*/
      this.sprite.src = './img/spriteFish2.png';
      /*Level's attributes*/
      this.level = 2;
      /*Score's attribute*/
      this.input = INPUT_FISH2;
      this.speed = SPEED_FISH2;
      this.factor = FACTOR_SIZE_FISH2;
  }
}