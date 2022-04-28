
class Controls {
    constructor(game) {
        this.game = game;
        this.cat = this.game.cat;
    }
    keyDown() {
        window.addEventListener('keydown', (event) => {
            if (event.code == "ArrowUp") {
                this.cat.arrowUp = true;
                this.cat.moveUp();
            } else if (event.code == "ArrowDown") {
                this.cat.arrowDown = true;
                this.cat.moveDown();
            } else if (event.code == 'ArrowLeft') {
                this.cat.arrowLeft = true;
                this.cat.moveLeft();
            } else if (event.code == 'ArrowRight') {
                this.cat.arrowRight = true;
                this.cat.moveRight();
            }
        })
    }
    keyUp() {
        window.addEventListener('keydown', (event) => {
            if (event.code == "ArrowUp") {
                this.cat.arrowUp = false;
            } else if (event.code == "ArrowDown") {
                this.cat.arrowDown = false;
            } else if (event.code == 'ArrowLeft') {
                this.cat.arrowLeft = false;
            } else if (event.code == 'ArrowRight') {
                this.cat.arrowRight = false;
            }
        })
    }
}
// keyboardEvents() {
    // window.addEventListener('keydown', (e) => {
    //     switch (e.code) {
    //         case 'ArrowUp':
    //             this.cat.moveUp();
    //             break;
    //         case 'ArrowDown':
    //             this.cat.moveDown();
    //             break;
    //         case 'ArrowLeft':
    //             this.cat.moveLeft();
    //             break;
    //         case 'ArrowRight':
    //             this.catx.moveRight();
    //             break;
    //     }
    // });
// }
// window.addEventListener("keydown", this.keyDown);
// window.addEventListener("keyup", this.keyUp);
