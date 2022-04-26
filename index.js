const startScreen = document.querySelector('.start-screen')
const canvas = document.querySelector('.canvas-container')
const gameover = document.querySelector('.gameover-screen')
const comic = document.querySelector('.comic')

const startbutton = document.querySelector('.start');

// insertRandomComic() {
//     comic.src = ''
// }

startbutton.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    canvas.classList.remove('hidden');
     const game = new Game();
    game.start();
   
})


    