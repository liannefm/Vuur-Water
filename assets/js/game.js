import { board, context } from './config.js';
import { loadPlayers, updatePlayers } from './players.js';
import { loadGameObjects, updateGameObjects } from './objects.js';

import { getDoors } from './objects.js';

export let gameOver = false;

let gameLoopId = null;

let gamePaused = false;
let elapsedTime = 0;

// timer
let timerInterval = null;
let startTime = 0;

export function setGameOver(value) {
    gameOver = value;

    if (value) {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        showGameOverPopup();
    }
}

// background
const BackgroundImg = new Image();
BackgroundImg.src = "assets/img/levelmuur.png";

window.onload = function () {

    startGame();

    document.getElementById("pausebutton").addEventListener("click", togglePause);

    document.getElementById("resumeBtn").addEventListener("click", () => {
        togglePause();
    });

    document.getElementById("restartBtn").addEventListener("click", () => {
        document.getElementById("pausePopup").classList.remove("active");
        startGame();
    });

};

function startGame() {
    if (gameLoopId !== null) cancelAnimationFrame(gameLoopId);

    gameOver = false;
    gamePaused = false;
    elapsedTime = 0;

    const pausePopup = document.getElementById("pausePopup");
    if (pausePopup) pausePopup.classList.remove("active");

    const pauseIcon = document.querySelector("#pausebutton i");
    if (pauseIcon) {
        pauseIcon.classList.remove("fa-play");
        pauseIcon.classList.add("fa-pause");
    }

    const gameOverPopup = document.getElementById("gameOverPopup");
    if (gameOverPopup) gameOverPopup.classList.remove("active");

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
        elapsedTime = elapsed;

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

    //in het pauze scherm menu
    if (gamePaused && !gameOver) {
        if (e.code === "KeyR") {
            e.preventDefault();
            document.getElementById("pausePopup").classList.remove("active");
            startGame();
            return;
        }

        if (e.code === "KeyM") {
            e.preventDefault();
            window.goToLevelScreen();
            return;
        }

        if (e.code === "Space") {
            e.preventDefault();
            togglePause();
            return;
        }
    }

    //in het dood scherm menu 
    if (gameOver && e.code === "KeyR") {
        startGame(); // restart
    }

    if (gameOver && e.code === "KeyM") {
        window.location.href = "levelscherm.php";
    }
});

function togglePause() {
    if (gameOver) return;

    gamePaused = !gamePaused;

    const pausePopup = document.getElementById("pausePopup");
    const pauseIcon = document.querySelector("#pausebutton i");

    if (gamePaused) {
        pausePopup.classList.add("active");

        pauseIcon.classList.remove("fa-pause");
        pauseIcon.classList.add("fa-play");

        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    } else {
        pausePopup.classList.remove("active");

        pauseIcon.classList.remove("fa-play");
        pauseIcon.classList.add("fa-pause");

        startTime = Date.now() - elapsedTime * 1000;

        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            elapsedTime = elapsed;

            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;

            document.getElementById("timer-text").textContent =
                `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        }, 1000);
    }
}


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

    if (gamePaused && !gameOver) {
        context.save();
        context.fillStyle = "rgba(0,0,0,0.5)";
        context.fillRect(0, 0, board.width, board.height);

        context.fillStyle = "white";
        context.font = "bold 48px Arial";
        context.textAlign = "center";
        context.fillText("Paused", board.width / 2, board.height / 2);

        context.restore();
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

function showGameOverPopup() {
    document.getElementById("gameOverPopup").classList.add("active");
}

window.resumeGame = function () {
    if (!gamePaused) return;
    togglePause();
};

window.restartGame = function () {
    // kan vanuit pause en gameOver gebruikt worden
    const pausePopup = document.getElementById("pausePopup");
    if (pausePopup) pausePopup.classList.remove("active");

    gamePaused = false;
    startGame();
};