class Fish3 extends Fish {
  constructor(ctx, x, y) {
      /*Position and size's attributes*/
      super(ctx, x, y);
      /*Sprite's attributes*/
      this.sprite.src = './img/spriteFish3.png';
      /*Level's attributes*/
      this.level = 3;
      /*Score's attribute*/
      this.input = INPUT_FISH3;
      this.speed = SPEED_FISH3;
      this.factor = FACTOR_SIZE_FISH3;
  }
}