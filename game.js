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
    }
    start() {
        this.intervalId = setInterval(() => {
            this.update();
        }
        , 1000 / 60)
    };

    update() {
        this.frames++
        this.drawBackground();

    }

    drawBackground() {
        this.ctx.fillStyle = 'pink';
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

