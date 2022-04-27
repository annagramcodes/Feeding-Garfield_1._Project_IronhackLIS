

class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.gameoverScreenWinner = document.querySelector('.gameover-screen-winner')
        this.gameoverScreenLoser = document.querySelector('.gameover-screen-loser')
        this.comic = document.querySelector('.comic')
        this.numKg = document.querySelector('.num-kg')
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.x = 0;
        this.y = 0;
        this.background = new Image();
        this.frames = 0;
        this.score = 0;
        this.time = 60;
        this.cat = null;
        this.lasagne = [];
        this.broccoli = [];
        this.carrot = [];
        this.cake =[];
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

// UPDATES THE CANVAS
    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.frames++
        //updates canvas
        this.drawBackground();
        this.drawTime();
        this.drawScore();

        //updates Animation of the cat
        if (this.cat.isEating === false &&
            this.cat.isHurt === false) {
            this.cat.drawAnimation();
        }
        if (this.cat.isEating === true) {
            this.cat.drawEatingCat();
        }
        if (this.cat.isHurt === true) {
            this.cat.drawHurtCat();
        }
        //CREATES AND DRAWS FRIENDS & ENEMIES
        this.createLasagne();
        this.lasagne.forEach((friend) => {
            friend.drawLasagne();
            friend.y += 2;
            // friend.x++ 
        });
        this.createCake();
        this.cake.forEach((friend) => {
            friend.drawCake();
            friend.y += 2;
            
        });
        this.createBroccoli();
        this.broccoli.forEach((enemy) => {
            enemy.drawBroccoli();
            enemy.y += 2;
            // enemy.x += 1;
        });
        this.createCarrot();
        this.carrot.forEach((enemy) => {
            enemy.drawCarrot();
            enemy.y += 2;
            enemy.x -= 1;
        });
        this.checkGameOver();
    }

// PUSHES ENEMIES & FRIENDS INTO ARRAY
    createLasagne() {
        if (this.frames % 150 === 0) {
            this.lasagne.push(new Obstacles(this, 50, 50));
        }
    }
    createCake() {
        if (this.frames % 300 === 0) {
            this.cake.push(new Obstacles(this, 50, 30));
        }
    }
    createBroccoli() {
        if (this.frames % 100 === 1) {
          this.broccoli.push(new Obstacles(this, 50, 30));
        }
    }
    createCarrot() {
        if (this.frames % 100 === 0) {
            this.carrot.push(new Obstacles(this, 50, 50));
          }
    }

    //Collission Detection
    crashWithEnemy() {
        const cat = this.cat;
        const crashedWithCarrot = this.carrot.forEach((enemy, i, arr) => {
            if(cat.crashesWith(enemy)){
                this.score--;
                arr.splice(i, 1);
                this.cat.isHurt = true;
                this.cat.isEating = false;
                setTimeout(() => { this.cat.isHurt = false }, 1000)
            }
            
        })
        const crashedWithBroccoli =
            this.broccoli.forEach((enemy, i, arr) => {
            if(cat.crashesWith(enemy)){
                this.score--;
                arr.splice(i, 1);
                this.cat.isHurt = true;
                this.cat.isEating = false;
                setTimeout(() => { this.cat.isHurt = false }, 1000)
            }
            
        })
    }
    crashWithFriend() {
        const cat = this.cat;
        const crashedWidthLasagne = this.lasagne.forEach( (friend, i, arr) => {
            if(cat.crashesWith(friend)){
                this.score++
                arr.splice(i, 1);
                this.cat.isEating = true;
                this.cat.isHurt = false;
                setTimeout(() => { this.cat.isEating = false }, 1000)
            }
        })
        const crashedWithCake =
            this.cake.forEach((friend, i, arr) => {
            if(cat.crashesWith(friend)){
                this.score += 2;
                arr.splice(i, 1);
                this.broccoli.splice(0, this.broccoli.length)
                this.carrot.splice(0, this.carrot.length)
                this.cat.isEating = true;
                this.cat.isHurt = false;
                setTimeout(() => { this.cat.isEating = false }, 1000)
            }
        })
    }
    // SCORE KEEPING & CHECK GAME OVER
    keepScore() {
        let score = this.score;
        this.crashWithEnemy();
        this.crashWithFriend();
    }

    checkGameOver() {
        if (this.score > 9) {
            this.stop();
            this.drawWinner()

        } else if (this.time < 1) {
            this.stop();
            this.drawLoser();
        }
    }
    stop() {
        clearInterval(this.intervalId);

    }
    
// DRAWING METHODS
    
    drawBackground() {
        // this.ctx.fillStyle = 'white';
        // this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.background.src = './docs/assets/imgs/bg4.jpeg'
        this.ctx.drawImage(this.background, this.x ,this.y, this.width, this.height)
    }
    drawTime() {
        let time = this.time;
        this.ctx.font = '20px sans-serif';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Time: ${time}`, 500, 30);
    }
    drawScore() {
        let score = this.score;
        this.ctx.font = '20px sans-serif';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Score: ${score}`, 10, 30);
    }

    drawWinner() {
        this.canvas.classList.add('hidden')
        this.gameoverScreenWinner.classList.remove('hidden')
        this.comic.src = `./docs/assets/imgs/garfieldcomic${this.num}.jpg`;
        this.numKg.innerHTML = `${Math.floor(Math.random() *(27-8) +8)}`
    }
    drawLoser() {
        this.canvas.classList.add('hidden')
        this.gameoverScreenLoser.classList.remove('hidden')
    
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



