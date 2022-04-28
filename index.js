
window.onload = () => {
    const startScreen = document.querySelector('.start-screen')
    const canvas = document.querySelector('.canvas-container')
    const winnerScreen = document.querySelector('.gameover-screen-winner')
    const loserScreen = document.querySelector('.gameover-screen-loser')

    const startBtn = document.querySelector('.start');
    const restartBtnLost = document.getElementById('restart-lost')
    const restartBtnWon = document.getElementById('restart-won')


    startBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        canvas.classList.remove('hidden');
        const game = new Game();
        game.start();
    })

    restartBtnLost.addEventListener('click', () => {
        loserScreen.classList.add('hidden');
        const game = new Game();
        canvas.classList.remove("hidden")
        game.start();
    })
    restartBtnWon.addEventListener('click', () => {
        winnerScreen.classList.add('hidden');
        const game = new Game();
        canvas.classList.remove('hidden')
        game.start();

    })

}


