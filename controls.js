
class Controls {
    constructor(game) {
        this.game = game;
        this.cat = this.game.cat;
    }
    keyboardEvents() {
        window.addEventListener('keydown', (event) => {
            if (event.code == "ArrowUp") {
                this.cat.isMovingUp = true;
            } else if (event.code == "ArrowDown") {
                this.cat.isMovingDown = true;
            } else if (event.code == 'ArrowLeft') {
                this.cat.isMovingLeft = true;
            } else if (event.code == 'ArrowRight') {
                this.cat.isMovingRight = true;
            }
        })
        window.addEventListener('keyup', (event) => {
            if (event.code == "ArrowUp") {
                this.cat.isMovingUp = false;
            } else if (event.code == "ArrowDown") {
                this.cat.isMovingDown = false;
            } else if (event.code == 'ArrowLeft') {
                this.cat.isMovingLeft = false;
            } else if (event.code == 'ArrowRight') {
                this.cat.isMovingRight = false;
            }
        })
    }
}