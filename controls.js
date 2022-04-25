
class Controls {
    constructor(game) {
        this.game = game;
        this.cat = this.game.cat;
    }
    keyboardEvents() {
        window.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowUp':
                    this.cat.moveUp();
                    break;
                case 'ArrowDown':
                    this.cat.moveDown();
                    break;
                case 'ArrowLeft':
                    this.cat.moveLeft();
                    break;
            
                case 'ArrowRight':
                    this.cat.moveRight();
                    break;
            }
        });
    }
}

// document.addEventListener('keyup', (e) => {
//     cat.speedX = 0;
//     cat.speedY = 0;
// });
