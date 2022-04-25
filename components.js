class Cat {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();

    }
    draw() {
        this.img.src = './docs/assets/imgs/596dba64ed07ad6118f99900.png'
        this.game.ctx.drawImage(this.img,this.x, this.y, this.width, this.height)
    }
    moveUp() {
        if (this.y > 0) {
            this.y -= 10;
        }
    }
    moveDown() {
        if (this.y + this.height < this.game.height) {
            this.y += 10;
        }
    }
    moveRight() {
        if (this.x + this.width < this.game.width) {
            this.x += 10;
        }
    }
    moveLeft() {
        if (this.x > 0) {
            this.x -= 10;
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
        this.x = Math.floor(Math.random() * 500);
        this.y = 0;
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
    
    drawFriends() {
        this.img.src = './docs/assets/imgs/pngwing.com.png'
        this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    drawEnemies() {
        this.img.src = './docs/assets/imgs/brokkoli.png'
        this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}