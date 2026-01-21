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


function gameLoop() {
    if (gameState.isGameOver) {
        document.getElementById('gameoverPopup').style.display = 'flex';
        return;
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();

document.getElementById('restartLevel').addEventListener('click', () => {
    location.reload();
});

document.getElementById('backToLevels').addEventListener('click', () => {
    window.location.href = 'levelkeuze.php';
});

document.getElementById('closeGameOver').addEventListener('click', () => {
    document.getElementById('gameoverPopup').style.display = 'none';
});


// tijdelijk
setTimeout(() => {
    document.getElementById('gameoverPopup').style.display = 'flex';
}, 1000);

