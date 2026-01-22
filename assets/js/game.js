import { board, context } from './config.js';
import { loadPlayers, updatePlayers } from './players.js';
import { loadGameObjects, updateGameObjects } from './objects.js';

import { getDoors } from './objects.js';

export let gameOver = false;

let gameLoopId = null;

let gamePaused = false;

// timer
let timerInterval = null;
let startTime = 0;

export function setGameOver(value) {
    gameOver = value;

    if (value && timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// background
const BackgroundImg = new Image();
BackgroundImg.src = "assets/img/levelmuur.png";

window.onload = function () {
    startGame();
};

function startGame() {
    if (gameLoopId !== null) cancelAnimationFrame(gameLoopId);

    gameOver = false;
    gamePaused = false;

    loadPlayers();
    loadGameObjects();
    resizeBoard();

    window.removeEventListener("resize", resizeBoard);
    window.addEventListener("resize", resizeBoard);

    // TIMER
    const timerText = document.getElementById("timer-text");

    if (timerInterval) clearInterval(timerInterval);

    timerText.textContent = "00:00";
    startTime = Date.now();

    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;

        timerText.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }, 1000);

    update();
}

function drawGameOverScreen() {
    context.save();

    // donkere overlay
    context.fillStyle = "rgba(0,0,0,0.65)";
    context.fillRect(0, 0, board.width, board.height);

    // tekst
    context.fillStyle = "white";
    context.textAlign = "center";

    context.font = "bold 64px Arial";
    context.fillText("Game Over", board.width / 2, board.height / 2 - 40);

    context.font = "24px Arial";
    context.fillText("Press R to restart", board.width / 2, board.height / 2 + 20);
    context.fillText("Press M to return to the level menu", board.width / 2, board.height / 2 + 80);

    context.restore();
}

function checkLevelComplete() {
    const doors = getDoors();
    if (gamePaused) return;
    if (doors.length < 2) return;

    const allDoorsOpen = doors.every(door => door.isOpen());

    if (allDoorsOpen) {
        gamePaused = true;
        window.showLevelCompletePopup();
    }
}

window.addEventListener("keydown", (e) => {
    if (gameOver && e.code === "KeyR") {
        startGame(); // restart
    }

    if (gameOver && e.code === "KeyM") {
        window.location.href = "levelscherm.php";
    }
});


// let levelCompleted = false;

window.showLevelCompletePopup = function () {
    document
        .getElementById('levelCompletePopup')
        .classList.add('active');
};

function update() {
    context.clearRect(0, 0, board.width, board.height);

    // background
    if (BackgroundImg.complete && BackgroundImg.naturalWidth > 0) {
        context.drawImage(BackgroundImg, 0, 0, board.width, board.height);
    }

    if (gameOver) {
        drawGameOverScreen();
        gameLoopId = requestAnimationFrame(update); // blijft renderen zodat overlay zichtbaar blijft
        return;
    }

    if (!gamePaused) {
        updateGameObjects();
        updatePlayers();
        checkLevelComplete();
    }

    gameLoopId = requestAnimationFrame(update);
}

function resizeBoard() {
    board.width = window.innerWidth;
    board.height = window.innerHeight;
}


window.goToLevelScreen = function () {
    window.location.href = 'levelscherm.php';
};
