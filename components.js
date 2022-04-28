class Cat {

  constructor(game, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.currentFrame = 0;
    this.isEating = false;
    this.isHurt = false;
    this.img = new Image();
    // new key events
    this.arrowDown = false;
    this.arrowUp = false;
    this.arrowLeft = false;
    this.arrowRight = false;
    this.speedX = 20;
    this.speedY = 20;
  }
  draw() {
    this.img.src = "./docs/assets/imgs/596dba64ed07ad6118f99900.png";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  drawAnimation() {
    this.img.src =
      "./docs/assets/imgs/DS_DSi_-_Garfields_Fun_Fest_-_Garfield-removebg.png";
    const spriteWidth = 35;
    const spriteHeight = 54;

    let column = this.currentFrame % 5;
    let row = 4;

    if (this.game.frames % 8 === 0) {
      this.currentFrame++;
      let maxFrame = 4;
      if (this.currentFrame > maxFrame) {
        this.currentFrame = 0;
      }
    }
    this.game.ctx.drawImage(
      this.img,
      column * spriteWidth,
      267,
      spriteWidth,
      spriteHeight,
      this.x,
      this.y,
      45,
      65
    );
  }
  drawEatingCat() {
    this.img.src =
      "./docs/assets/imgs/DS_DSi_-_Garfields_Fun_Fest_-_Garfield-removebg.png";
    const spriteWidth = 50;
    const spriteHeight = 60;

    let column = this.currentFrame % 4;

    if (this.game.frames % 8 === 0) {
      this.currentFrame++;
      let maxFrame = 3;
      if (this.currentFrame > maxFrame) {
        this.currentFrame = 0;
      }
    }
    this.game.ctx.drawImage(
      this.img,
      column * spriteWidth,
      453,
      spriteWidth,
      spriteHeight,
      this.x,
      this.y,
      60,
      70
    );
  }
  drawHurtCat() {
    this.img.src =
      "./docs/assets/imgs/DS_DSi_-_Garfields_Fun_Fest_-_Garfield-removebg.png";
    const spriteWidth = 56;
    const spriteHeight = 60;

    let column = this.currentFrame % 4;

    if (this.game.frames % 7 === 0) {
      this.currentFrame++;
      let maxFrame = 5;
      if (this.currentFrame > maxFrame) {
        this.currentFrame = 0;
      }
    }
    this.game.ctx.drawImage(
      this.img,
      column * spriteWidth,
      824,
      spriteWidth,
      spriteHeight,
      this.x,
      this.y,
      66,
      71
    );
  }

  moveUp() {
    if (this.arrowUp && this.y > 0) {
      this.y -= this.speedY;
    }
  }
  moveDown() {
    if (this.arrowDown && this.y + this.height < this.game.height) {
      this.y += this.speedY;
      
    }
  }
  moveRight() {
    if (this.arrowRight && this.x + this.width < this.game.width) {
      this.x += this.speedX;
    }
  }
  moveLeft() {
    if (this.arrowLeft && this.x > 0) {
      this.x -= this.speedX;
    }
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }
  crashesWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}

class Obstacles {
  constructor(game, width, height) {
    this.game = game;

    if (randomBoolean()) {
      this.x = Math.floor(Math.random() * (600 - 50) + 50);
      this.y = 0;
    } else {
      this.x = Math.round(Math.random()) * this.game.width;
      this.y = Math.floor(Math.random() * 100);
    }
    this.origin = {
      x: this.x,
      y: this.y,
    };
    this.width = width;
    this.height = height;
    this.img = new Image();
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  drawLasagne() {
    this.img.src = "./docs/assets/imgs/lasagne.webp";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  drawCake() {
    this.img.src = "./docs/assets/imgs/cake.png";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  drawBroccoli() {
    this.img.src = "./docs/assets/imgs/brokkoli.png";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  drawCarrot() {
    this.img.src = "./docs/assets/imgs/carrot.png";
    this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
