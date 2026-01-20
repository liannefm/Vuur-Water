import { board, context } from './config.js';
import { loadPlayers, updatePlayers } from './players.js';
import { loadGameObjects, updateGameObjects } from './objects.js';


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