class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.gameoverScreen = document.querySelector('.gameover-screen-winner')
        this.gameoverScreenLoser = document.querySelector('.gameover-screen-looser')
        this.comic = document.querySelector('.comic')
        this.numKg = document.querySelector('.num-kg')
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.x = 0;
        this.y = 0;
        // this.background = this.drawBackground();
        this.background = new Image();
        this.frames = 0;
        this.score = 0;
        this.time = 60;
        this.cat = null;
        this.friends = [];
        this.enemies = [];
        this.img = new Image();
        this.num = Math.floor(Math.random() * 13);
    }
    start() {
        this.cat = new Cat(this, 300, 380, 60, 90)
        this.cat.drawAnimation();
        this.controls = new Controls(this);
        this.controls.keyboardEvents();
        this.intervalId = setInterval(() => {
            this.update();
        }
            , 1000 / 60)
        this.timeIntervalId = setInterval(() => {
            this.time--
        }, 1000)
        this.scoreIntervalId = setInterval(() => {
            this.keepScore();
        }, 500)
    };

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.frames++
        // this.drawWinner();
        this.drawBackground();
        this.drawTime();
        this.drawScore();
        if (this.cat.isEating === false &&
            this.cat.isHurt === false) {
            this.cat.drawAnimation();
        }
        if(this.cat.isEating === true){
            this.cat.drawEatingCat();
        }
        if (this.cat.isHurt === true) {
            this.cat.drawHurtCat();
        }
        this.createFriends();
        this.friends.forEach((friend) => {
            friend.y++;
            friend.drawFriends();
        });
        // this.superFriends.forEach((friend) => {
        //     friend.y++;
        //     friend.drawSuperFriends();
        // });
        this.createEnemies();
        this.enemies.forEach((enemy) => {
            enemy.y++;
            enemy.drawEnemies();
        });
        this.checkGameOver();
    }
    createFriends() {
        if (this.frames % 200 === 0) {
            this.friends.push(new Obstacles(this, 50, 50));
        }
    }
    createEnemies() {
        if (this.frames % 100 === 0) {
          this.enemies.push(new Obstacles(this, 50, 30, 1));
        }
    }
    crashWithEnemy() {
        const cat = this.cat;
        const crashed = this.enemies.forEach( (enemy,i, arr) => {
            if(cat.crashesWith(enemy)){
                this.score -=2;
                arr.splice(i, 1);
                this.cat.isHurt = true;
                this.cat.isEating = false;
                setTimeout(() => { this.cat.isHurt = false }, 1000)
            }
        })
    }
    crashWithFriend() {
        const cat = this.cat;
        const crashed = this.friends.forEach( (friend, i, arr) => {
            if(cat.crashesWith(friend)){
                this.score++
                arr.splice(i, 1);
                this.cat.isEating = true;
                this.cat.isHurt = false;
                setTimeout(() => { this.cat.isEating = false }, 1000)
            }
        })
     }
    keepScore() {
        let score = this.score;
        this.crashWithEnemy();
        this.crashWithFriend();
    }

    checkGameOver() {
        if (this.score > 10) {
            this.stop();
            this.drawWinner()

            

        } else if (this.time === 0) {
            this.stop();
            this.drawLoser();
        }
    }
    stop() {
        clearInterval(this.intervalId);
        // this.drawWinner();

    }
    

    drawBackground() {
        // this.ctx.fillStyle = 'white';
        // this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.background.src = './docs/assets/imgs/bg-4.jpg'
        this.ctx.drawImage(this.background, this.x ,this.y, this.width, this.height)
    }
    drawTime() {
        let time = this.time;
        this.ctx.font = '20px serif';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Time: ${time}`, 100, 30);
    }
    drawScore() {
        let score = this.score;
        this.ctx.font = '20px serif';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`score: ${score}`, 10, 30);
    }

    drawWinner() {
        this.canvas.style.display = 'none';
        this.gameoverScreen.style.display = 'block';
        this.comic.src = `./docs/assets/imgs/garfieldcomic${this.num}.jpg`;
        this.numKg.innerHTML = `${Math.floor(Math.random() *(27-8) +8)}`
    }
    drawLoser() {
        this.canvas.style.display = 'none';
        this.gameoverScreenLoser.style.display = 'block';
    
    }
    // drawWinner() {
    //     this.ctx.clearRect(0, 0, this.width, this.height);
    //     this.ctx.fillStyle = 'white';
    //     this.ctx.font = '32px sans-serif';
    //     this.ctx.fillStyle = 'orange';
    //     this.ctx.fillText(`YOU WON`, 200, 150);
    //     this.ctx.fillRect = this.x, this.y, this.width, this.height;
    //     this.img.src = `./docs/assets/imgs/garfieldcomic${this.num}.jpg`;
       
    //     setInterval(() => { this.ctx.drawImage(this.img, 0, 250, 600, 200) }
    //     , 100)
    // }

    // drawLoser() {
    //     this.ctx.clearRect(0, 0, this.width, this.height);
    //     this.ctx.fillStyle = 'pink';
    //     this.ctx.fillRect = this.x, this.y, this.width, this.height;
    //     this.ctx.font = '20px serif';
    //     this.ctx.fillStyle = 'Black';
    //     this.img.src = '../docs/assets/imgs/garfieldcomic1.jpg';
    //     this.ctx.drawImage(this.img, this.x ,this.y)
    //     this.ctx.fillText(`YOU LOST`, 10, 30);
    // }
}



