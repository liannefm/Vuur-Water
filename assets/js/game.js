import { board, context } from './config.js';
import { loadPlayers, updatePlayers } from './players.js';
import { loadGameObjects, updateGameObjects } from './objects.js';

// export let gameState = {
//     isGameOver: false
// };


// background
const BackgroundImg = new Image();
BackgroundImg.src = "assets/img/levelmuur.png";

window.onload = function () {
    loadPlayers();
    loadGameObjects();

    resizeBoard();
    window.addEventListener("resize", resizeBoard);

    update();
};

function update() {
    context.clearRect(0, 0, board.width, board.height);

    // background
    if (BackgroundImg.complete && BackgroundImg.naturalWidth > 0) {
        context.drawImage(BackgroundImg, 0, 0, board.width, board.height);
    }

    // players
    updatePlayers();

    // objects
    updateGameObjects();

    requestAnimationFrame(update);
}

function resizeBoard() {
    board.width = window.innerWidth;
    board.height = window.innerHeight;
}


let gamePaused = false;

window.addEventListener('gameover', () => {
    gamePaused = true;
    document.getElementById('gameoverPopup').style.display = 'flex';
});

window.onload = function () {
    loadPlayers();
    loadGameObjects();

    resizeBoard();
    window.addEventListener("resize", resizeBoard);

    // TIMER
    const timerText = document.getElementById("timer-text");
    let startTime = Date.now();

    setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;

        timerText.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }, 1000);

    update();
};


// console.log("timer script bereikt");

// setInterval(() => {
//     console.log("timer interval loopt");
// }, 1000);
