// board
let board;
let context;

const GRAVITY = 0.4;
const JUMP_POWER = 10;

// player water
let WaterPlayerWidth = 40;
let WaterPlayerHeight = 40;

let WaterLeftPressed = false;
let WaterRightPressed = false;

let WaterPlayer = {
    x: 100,
    y: 500,
    vy: 0,
    onGround: false
};

const WaterPlayerImg = new Image();
WaterPlayerImg.src = "assets/img/players/water-poppetje.png";

// player fire
let FirePlayerWidth = 40;
let FirePlayerHeight = 40;

let FireLeftPressed = false;
let FireRightPressed = false;

let FirePlayer = {
    x: 200,
    y: 500,
    vy: 0,
    onGround: false
};

const FirePlayerImg = new Image();
FirePlayerImg.src = "assets/img/players/vuur-poppetje.png";

let PlayersSpeed = 2;

// background
const BackgroundImg = new Image();
BackgroundImg.src = "assets/img/levelmuur.png";

window.onload = function () {
    board = document.getElementById("board");
    context = board.getContext("2d");

    resizeBoard();
    window.addEventListener("resize", resizeBoard);

    document.addEventListener("keydown", (e) => {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "KeyA", "KeyD", "KeyW", "Space"].includes(e.code)) e.preventDefault();

        // water
        if (e.code === "KeyA") WaterLeftPressed = true;
        if (e.code === "KeyD") WaterRightPressed = true;
        if (e.code === "KeyW" && WaterPlayer.onGround) {
            WaterPlayer.vy = -JUMP_POWER;
            WaterPlayer.onGround = false;
        }

        // fire
        if (e.code === "ArrowLeft") FireLeftPressed = true;
        if (e.code === "ArrowRight") FireRightPressed = true;
        if (e.code === "ArrowUp" && FirePlayer.onGround) {
            FirePlayer.vy = -JUMP_POWER;
            FirePlayer.onGround = false;
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.code === "KeyA") WaterLeftPressed = false;
        if (e.code === "KeyD") WaterRightPressed = false;

        if (e.code === "ArrowLeft") FireLeftPressed = false;
        if (e.code === "ArrowRight") FireRightPressed = false;
    });

    update();
};

function update() {
    context.clearRect(0, 0, board.width, board.height);

    // background
    if (BackgroundImg.complete && BackgroundImg.naturalWidth > 0) {
        context.drawImage(BackgroundImg, 0, 0, board.width, board.height);
    } else {
        context.fillStyle = "black";
        context.fillRect(0, 0, board.width, board.height);
    }

    // water move
    if (WaterLeftPressed) WaterPlayer.x -= PlayersSpeed;
    if (WaterRightPressed) WaterPlayer.x += PlayersSpeed;

    WaterPlayer.vy += GRAVITY;
    WaterPlayer.y += WaterPlayer.vy;

    const groundYWater = board.height - WaterPlayerHeight;
    if (WaterPlayer.y >= groundYWater) {
        WaterPlayer.y = groundYWater;
        WaterPlayer.vy = 0;
        WaterPlayer.onGround = true;
    } else {
        WaterPlayer.onGround = false;
    }

    // fire move
    if (FireLeftPressed) FirePlayer.x -= PlayersSpeed;
    if (FireRightPressed) FirePlayer.x += PlayersSpeed;

    FirePlayer.vy += GRAVITY;
    FirePlayer.y += FirePlayer.vy;

    const groundYFire = board.height - FirePlayerHeight;
    if (FirePlayer.y >= groundYFire) {
        FirePlayer.y = groundYFire;
        FirePlayer.vy = 0;
        FirePlayer.onGround = true;
    } else {
        FirePlayer.onGround = false;
    }

    // draw water player 

    if (WaterPlayerImg.complete && WaterPlayerImg.naturalWidth > 0) {
        context.drawImage(WaterPlayerImg, WaterPlayer.x, WaterPlayer.y, WaterPlayerWidth, WaterPlayerHeight);
    } else {
        // fallback als image nog niet geladen is
        context.fillStyle = "blue";
        context.fillRect(WaterPlayer.x, WaterPlayer.y, WaterPlayerWidth, WaterPlayerHeight);
    }

    // draw fire player

    if (FirePlayerImg.complete && FirePlayerImg.naturalWidth > 0) {
        context.drawImage(FirePlayerImg, FirePlayer.x, FirePlayer.y, FirePlayerWidth, FirePlayerHeight);
    } else {
        // fallback als image nog niet geladen is
        context.fillStyle = "red";
        context.fillRect(FirePlayer.x, FirePlayer.y, FirePlayerWidth, FirePlayerHeight);
    }

    requestAnimationFrame(update);
}

function resizeBoard() {
    board.width = window.innerWidth;
    board.height = window.innerHeight;
}