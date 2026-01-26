import { board, context, camera } from './config.js';
import { loadPlayers, updatePlayers, players } from './players.js';
import { loadGameObjects, updateGameObjects, gameObjects, getDoors } from './objects.js';
import { mapData } from './map.js';

const params = new URLSearchParams(window.location.search);
export const level = params.get("level");

export let gameOver = false;

let gameLoopId = null;

let gamePaused = false;
let elapsedTime = 0;

// timer
let timerInterval = null;
let startTime = 0;

let lastGroundFireY = null;
let lastGroundWaterY = null;

// camera
function updateCamera() {
    const viewW = board.width;
    const viewH = board.height;

    const p1 = players.fire;
    const p2 = players.water;
    if (!p1 || !p2) return;

    // laatste grond Y" alleen als speler op de grond staat
    if (p1.onGround) lastGroundFireY = p1.position.y;
    if (p2.onGround) lastGroundWaterY = p2.position.y;

    // fallback (eerste frame)
    if (lastGroundFireY === null) lastGroundFireY = p1.position.y;
    if (lastGroundWaterY === null) lastGroundWaterY = p2.position.y;

    // centerX blijft echt center (mag mee bij lopen)
    const centerX =
        (p1.position.x + p1.size.width / 2 + p2.position.x + p2.size.width / 2) / 2;

    // centerY gebruikt de laatst bekende grond-hoogte (springt niet mee!)
    const centerY =
        (lastGroundFireY + p1.size.height / 2 + lastGroundWaterY + p2.size.height / 2) / 2;

    // world bounds: min én max (zodat omhoog/omlaag kan)
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;

    for (const obj of gameObjects) {
        minX = Math.min(minX, obj.position.x);
        minY = Math.min(minY, obj.position.y);
        maxX = Math.max(maxX, obj.position.x + obj.size.width);
        maxY = Math.max(maxY, obj.position.y + obj.size.height);
    }

    // players meenemen
    minX = Math.min(minX, p1.position.x, p2.position.x);
    minY = Math.min(minY, p1.position.y, p2.position.y);
    maxX = Math.max(maxX, p1.position.x + p1.size.width, p2.position.x + p2.size.width);
    maxY = Math.max(maxY, p1.position.y + p1.size.height, p2.position.y + p2.size.height);

    if (!isFinite(minX)) { minX = 0; minY = 0; maxX = viewW; maxY = viewH; }

    // target camera (center -> linksboven)
    const targetX = centerX - viewW / 2;
    const targetY = centerY - viewH / 2;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const minCamX = minX;
    const maxCamX = Math.max(minX, maxX - viewW);

    const minCamY = minY;
    const maxCamY = Math.max(minY, maxY - viewH);

    const SMOOTH = 0.12;
    camera.x += (clamp(targetX, minCamX, maxCamX) - camera.x) * SMOOTH;
    camera.y += (clamp(targetY, minCamY, maxCamY) - camera.y) * SMOOTH;
}

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
    if (mapData[level] == undefined) return;
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

    context.restore();
}

function checkLevelComplete() {
    const doors = getDoors();
    if (gamePaused) return;
    if (doors.length < 2) return;

    const allDoorsOpen = doors.every(door => door.isOpen());

    if (allDoorsOpen) {
        window.showLevelCompletePopup();
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
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

window.showLevelCompletePopup = function () {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    document.querySelector('#levelCompletePopup .timeCompleted').textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    document
        .getElementById('levelCompletePopup')
        .classList.add('active');
};

function update() {
    updateCamera();

    // reset transform + clear
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, board.width, board.height);

    // background blijft vast aan scherm
    if (BackgroundImg.complete && BackgroundImg.naturalWidth > 0) {
        context.drawImage(BackgroundImg, 0, 0, board.width, board.height);
    }

    // camera toepassen
    context.save();
    context.translate(-camera.x, -camera.y);

    if (gameOver) {
        drawGameOverScreen();
        context.restore();
        gameLoopId = requestAnimationFrame(update);
        return;
    }

    if (!gamePaused) {
        updateGameObjects();
        updatePlayers();
        checkLevelComplete();
    }

    context.restore(); // camera uit

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