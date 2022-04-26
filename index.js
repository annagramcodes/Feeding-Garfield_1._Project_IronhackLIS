const startScreen = document.querySelector('.start-screen')
const canvas = document.querySelector('.canvas-container')
const gameover = document.querySelector('.gameover-screen')

const startbutton = document.querySelector('.start');



startbutton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    canvas.style.display = 'flex';
     const game = new Game();
    game.start();
})
    