import { board, context } from './config.js';
import { loadPlayers, updatePlayers } from './players.js';
import { loadGameObjects, updateGameObjects } from './objects.js';
import { getDoors } from './objects.js';

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

    updateGameObjects();
    updatePlayers();
    
    requestAnimationFrame(update);



const doors = getDoors();

if (!gamePaused && doors.length >= 2) {
    const allDoorsOpen = doors.every(door => door.isOpen());

    if (allDoorsOpen) {
        gamePaused = true;
        showLevelCompletePopup();
    }
}

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

let levelCompleted = false;

window.showLevelCompletePopup = function () {
    document
        .getElementById('levelCompletePopup')
        .classList.add('active');
};

window.goToLevelScreen = function () {
    window.location.href = 'levelscherm.php';
};
