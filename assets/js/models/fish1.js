class Fish1 extends Fish {
  constructor(ctx, x, y) {
      /*Position and size's attributes*/
      super(ctx, x, y);
      /*Sprite's attributes*/
      this.sprite.src = './img/spriteFish1.png';
      /*Level's attributes*/
      this.level = 1;
      /*Score's attribute*/
      this.input = INPUT_FISH1;
      this.speed = SPEED_FISH1;
      this.factor = FACTOR_SIZE_FISH1;
  }
}