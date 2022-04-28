class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.gameoverScreenWinner = document.querySelector(
      ".gameover-screen-winner"
    );
    this.gameoverScreenLoser = document.querySelector(".gameover-screen-loser");
    this.canvasContainer = document.querySelector(".canvas-container");
    this.comic = document.querySelector(".comic");
    this.numKg = document.querySelector(".num-kg");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.x = 0;
    this.y = 0;
    this.background = new Image();
    this.frames = 0;
    this.score = 5;
    this.time = 0;
    this.cat = null;
    this.lasagne = [];
    this.broccoli = [];
    this.carrot = [];
    this.cake = [];
    this.img = new Image();
    this.sound = new Audio();
    this.num = Math.floor(Math.random() * 13); 
  }
  // STARTS THE GAME
  start() {
    this.cat = new Cat(this, 300, 380, 60, 90);
    this.cat.drawMovingCat();
    this.controls = new Controls(this);
    this.controls.keyboardEvents();
    this.intervalId = setInterval(() => {
      this.update();
    }, 1000 / 60);
    this.timeIntervalId = setInterval(() => {
      this.time++;
    }, 1000);
    this.scoreIntervalId = setInterval(() => {
      this.keepScore();
    }, 500);
  }
  // UPDATING THE CANVAS
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.frames++;
    this.drawBackground();
    this.drawTime();
    this.drawScore();
    //CAT ANIMATION
    this.animateCat();
    this.moveCat();
    //CREATES & DRAWS LASAGNE
    this.createLasagne();
    this.lasagne.forEach((friend) => {
      friend.drawLasagne();
      friend.y += 2;
      if (friend.origin.x > this.width / 2) {
        friend.x -= 1;
      } else {
        friend.x += 1;
      }
    });
    //CREATES & DRAWS CAKE
    this.createCake();
    this.cake.forEach((friend) => {
      friend.drawCake();
      friend.y += 2;
    });
    //CREATES & DRAWS BROCCOLI
    this.createBroccoli();
    this.broccoli.forEach((enemy) => {
      enemy.drawBroccoli();
        enemy.y += 2;
        if (enemy.origin.x > this.width / 2) {
            enemy.x -= 1;
          } else {
            enemy.x += 1;
          }
    });
    //CREATES & DRAWS CARROTS
    this.createCarrot();
    this.carrot.forEach((enemy) => {
      enemy.drawCarrot();
      enemy.y += 2;
      if (enemy.origin.x > this.width / 2) {
        enemy.x -= 1;
      } else {
        enemy.x += 1;
      }
    });
    this.checkGameOver();
  }
  // LETS ENEMIES AND FRIENDS APPEAR ON CANVAS
  createLasagne() {
    if (this.frames % 150 === 0) {
      this.lasagne.push(new Obstacles(this, 50, 50));
    }
    if (this.time > 30 && this.frames % 300 === 0) {
        this.lasagne.push(new Obstacles(this, 50, 50));
      }
  }
    createCake() {
        if (this.frames % 400 === 0) {
            this.cake.push(new Obstacles(this, 50, 30));
        }
    }
  createBroccoli() {
    if (this.frames % 100 === 0) {
      this.broccoli.push(new Obstacles(this, 50, 30));
    }
      if (this.time > 30 && this.frames % 200 === 0) {
        this.broccoli.push(new Obstacles(this, 50, 30));
      }
  }
  createCarrot() {
    if (this.frames % 100 === 0) {
      this.carrot.push(new Obstacles(this, 50, 50));
      }
      if (this.frames % 200 === 0) {
        this.carrot.push(new Obstacles(this, 50, 30));
      }
      if (this.time > 30 && this.frames % 200 === 0) {
        this.carrot.push(new Obstacles(this, 50, 30));
      }
  }
 //COLLISSION DETECTION - ENEMY
    crashWithEnemy() {
    const cat = this.cat;
    const handleCrash = (enemy, i, arr) => {
      if (cat.crashesWith(enemy)) {
        this.makeAngrySound();
        this.score-=2;
        arr.splice(i, 1);
        this.cat.isHurt = true;
        this.cat.isEating = false;
        setTimeout(() => {
          this.cat.isHurt = false;
        }, 800);
      }
    };
    this.carrot.forEach((enemy, i, arr) => {
      handleCrash(enemy, i, arr);
    });
    this.broccoli.forEach((enemy, i, arr) => {
      handleCrash(enemy, i, arr);
    });
    }
  //COLLISSION DETECTION - FRIEND
  crashWithFriend() {
    const cat = this.cat;
      this.lasagne.forEach((friend, i, arr) => {
      if (cat.crashesWith(friend)) {
        this.makeFriendlySound();
        this.score++;
        arr.splice(i, 1);
        this.cat.isEating = true;
        this.cat.isHurt = false;
        setTimeout(() => {
          this.cat.isEating = false;
        }, 800);
      }
    });
     this.cake.forEach((friend, i, arr) => {
      if (cat.crashesWith(friend)) {
        this.score += 2;
        arr.splice(i, 1);
        this.broccoli.splice(0, this.broccoli.length);
        this.carrot.splice(0, this.carrot.length);
        this.cat.isEating = true;
        this.cat.isHurt = false;
        setTimeout(() => {
          this.cat.isEating = false;
        }, 800);
      }
    });
  }
  // SCORE KEEPING & CHECK GAME OVER
  keepScore() {
    this.crashWithEnemy();
    this.crashWithFriend();
  }
  checkGameOver() {
    if (this.score > 15 && this.time >= 60) {
      this.stop();
      this.drawWinner();
    } else if (this.score < 3 || (this.time >= 60 && this.score < 15)) {
      this.stop();
      this.drawLoser();
    } 
  }
  stop() {
    clearInterval(this.intervalId);
  }
  // DRAWING METHODS
  drawBackground() {
    this.background.src = "./docs/assets/imgs/bg5.png";
    this.ctx.drawImage(
      this.background,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  drawTime() {
    let time = this.time;
    this.ctx.font = "20px sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Time: ${time}`, 500, 30);
  }
  drawScore() {
    let score = this.score;
    this.ctx.font = "20px sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Kilograms: ${score}`, 10, 30);
  }
  drawWinner() {
    this.canvasContainer.classList.add("hidden");
    this.gameoverScreenWinner.classList.remove("hidden");
    this.comic.src = `./docs/assets/imgs/garfieldcomic${this.num}.jpg`;
    this.numKg.innerHTML = `${this.score - 5}`;
  }
  drawLoser() {
    this.canvasContainer.classList.add("hidden");
    this.gameoverScreenLoser.classList.remove("hidden");
    this.loserSound();
  }
  // SOUNDS
  makeAngrySound() {
  this.sound.src = './docs/assets/sounds/mixkit-little-cat-pain-meow-87.wav';
    this.sound.volume = 0.05;
    this.sound.loop = false;
    this.sound.play();
  }
  makeFriendlySound() {
    this.sound.src = './docs/assets/sounds/mixkit-hungry-man-eating-2252.wav';
      this.sound.volume = 0.05;
      this.sound.loop = false;
      this.sound.play();
    }
  loserSound() {
    this.sound.src = './docs/assets/sounds/thisSucks.mp3';
      this.sound.volume = 0.05;
      this.sound.loop = false;
      this.sound.play();
  }
   // CAT MOVEMENT
  moveCat() {
    if (this.cat.isMovingLeft) {
      this.cat.moveLeft()
    }
    if (this.cat.isMovingUp) {
      this.cat.moveUp()
    } 
    if (this.cat.isMovingRight) {
      this.cat.moveRight()
    } 
    if (this.cat.isMovingDown) {
      this.cat.moveDown()
    }
  }
  animateCat() {
    if (this.cat.isEating === false && this.cat.isHurt === false) {
      this.cat.drawMovingCat();
    }
    if (this.cat.isEating === true) {
      this.cat.drawEatingCat();
    }
    if (this.cat.isHurt === true) {
      this.cat.drawHurtCat();
    }
  }
}
