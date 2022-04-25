class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.x = 0;
        this.y = 0;
        this.background = this.drawBackground();
        this.frames = 0;
        this.score = 0;
        this.time = 60;
        this.cat = null;
        this.friends = [];
        this.enemies = [];
    }
    start() {
        this.cat = new Cat(this, 250, 400, 60, 90)
        this.cat.draw();
        this.controls = new Controls(this);
        this.controls.keyboardEvents();
        this.intervalId = setInterval(() => {
            this.update();
        }
            , 1000 / 60)
        this.scoreIntervalId = setInterval(() => {
            this.keepScore();
            this.time--
        }, 1000)
    };

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.frames++
        this.drawBackground();
        this.drawTime();
        this.drawScore();
        this.cat.draw();
        this.createFriends();
        this.friends.forEach((friend) => {
            friend.y++;
            friend.drawFriends();
        });
        this.createEnemies();
        this.enemies.forEach((enemy) => {
            enemy.y++;
            enemy.drawEnemies();
        });
        this.checkGameOver();
    }
    createFriends() {
        if (this.frames % 300 === 0) {
          this.friends.push(new Obstacles(this, 70, 50));
        }
    }
    createEnemies() {
        if (this.frames % 200 === 0) {
          this.enemies.push(new Obstacles(this, 50, 30, 1));
        }
    }
    decreaseScore() {
        const cat = this.cat;
        const crashed = this.enemies.forEach( (enemy,i, arr) => {
            if(cat.crashesWith(enemy)){
                this.score--;
                arr.splice(i, 1);
            }
        })
    }
     increaseScore() {
        const cat = this.cat;
        const crashed = this.friends.forEach( (friend, i, arr) => {
            if(cat.crashesWith(friend)){
                this.score++
                arr.splice(i, 1);
            }
        })
     }
    keepScore() {
        let score = this.score;
        this.decreaseScore();
        this.increaseScore();
    }

    checkGameOver() {
        if (this.score === 10) {
            this.stop();
        } else if (this.time === 0) {
            this.stop();
        }
    }
    stop() {
        clearInterval(this.intervalId);
      }

    drawBackground() {
        this.ctx.fillStyle = 'lightgrey';
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    drawTime() {
        let time = this.time;
        this.ctx.font = '20px serif';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`time remaining: ${time}`, 100, 30);
    }
    drawScore() {
        let score = this.score;
        this.ctx.font = '20px serif';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`score: ${score}`, 10, 30);
      }
}



