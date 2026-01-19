import { board, context } from './config.js';
import { boundaries } from './map.js';

const GRAVITY = 0.4;
const JUMP_POWER = 10;

// player water
let WaterPlayerWidth = 60;
let WaterPlayerHeight = 60;

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

const WaterPlayerWalkingImg = new Image();
WaterPlayerWalkingImg.src = "assets/img/players/water-lopend-1.png";

const WaterPlayerWalking2Img = new Image();
WaterPlayerWalking2Img.src = "assets/img/players/water-lopend-2.png";

WaterPlayerImg.onload = () => {
    const maxHeight = 100;
    const scale = maxHeight / WaterPlayerImg.naturalHeight;

    WaterPlayerWidth = WaterPlayerImg.naturalWidth * scale;
    WaterPlayerHeight = maxHeight;
};

// player fire
let FirePlayerWidth = 60;
let FirePlayerHeight = 60;

let FireLeftPressed = false;
let FireRightPressed = false;

let FirePlayer = {
    x: 200,
    y: 500,
    vy: 0,
    onGround: false
};

// walking
let waterWalkFrame = 0;
let fireWalkFrame = 0;

let walkFrameCounter = 0;
const WALK_FRAME_SPEED = 14; // lager = sneller wisselen

// imgs
const FirePlayerImg = new Image();
FirePlayerImg.src = "assets/img/players/vuur-poppetje.png";

const FirePlayerWalkingImg = new Image();
FirePlayerWalkingImg.src = "assets/img/players/vuur-lopend-1.png";

const FirePlayerWalking2Img = new Image();
FirePlayerWalking2Img.src = "assets/img/players/vuur-lopend-2.png";

FirePlayerImg.onload = () => {
    const maxHeight = 100;
    const scale = maxHeight / FirePlayerImg.naturalHeight;

    FirePlayerWidth = FirePlayerImg.naturalWidth * scale;
    FirePlayerHeight = maxHeight;

};

let PlayersSpeed = 2;

// background
const BackgroundImg = new Image();
BackgroundImg.src = "assets/img/levelmuur.png";

window.onload = function () {
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

    walkFrameCounter++;

    if (walkFrameCounter >= WALK_FRAME_SPEED) {
        walkFrameCounter = 0;
        waterWalkFrame = (waterWalkFrame + 1) % 2;
        fireWalkFrame = (fireWalkFrame + 1) % 2;
    }

    // background
    if (BackgroundImg.complete && BackgroundImg.naturalWidth > 0) {
        context.drawImage(BackgroundImg, 0, 0, board.width, board.height);
    } else {
        context.fillStyle = "black";
        context.fillRect(0, 0, board.width, board.height);
    }

    boundaries.forEach((boundary) => {
        boundary.draw();
    });

    // water move
    if (WaterLeftPressed) {
        WaterPlayer.x -= PlayersSpeed;
    }
    if (WaterRightPressed) {
        WaterPlayer.x += PlayersSpeed;
    }
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
    if (FireLeftPressed) {
        FirePlayer.x -= PlayersSpeed;
    }
    if (FireRightPressed) {
        FirePlayer.x += PlayersSpeed;
    }

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
    let currentWaterImg = WaterPlayerImg;

    if (WaterLeftPressed || WaterRightPressed) {
        currentWaterImg = waterWalkFrame === 0
            ? WaterPlayerWalkingImg
            : WaterPlayerWalking2Img;
    }

    if (WaterLeftPressed === true) {
        context.drawImage(currentWaterImg, WaterPlayer.x, WaterPlayer.y, WaterPlayerWidth, WaterPlayerHeight);
    } else if (WaterRightPressed === true) {
        context.save();
        context.translate(WaterPlayer.x + WaterPlayerWidth, WaterPlayer.y);
        context.scale(-1, 1);
        context.drawImage(currentWaterImg, 0, 0, WaterPlayerWidth, WaterPlayerHeight);
        context.restore();
    } else {
        context.drawImage(WaterPlayerImg, WaterPlayer.x, WaterPlayer.y, WaterPlayerWidth, WaterPlayerHeight);
    }

    // draw fire player
    let currentFireImg = FirePlayerImg;

    if (FireLeftPressed || FireRightPressed) {
        currentFireImg = fireWalkFrame === 0
            ? FirePlayerWalkingImg
            : FirePlayerWalking2Img;
    }

    if (FireLeftPressed === true) {
        context.save();
        context.translate(FirePlayer.x + FirePlayerWidth, FirePlayer.y);
        context.scale(-1, 1);
        context.drawImage(currentFireImg, 0, 0, FirePlayerWidth, FirePlayerHeight);
        context.restore();
    } else if (FireRightPressed === true) {
        context.drawImage(currentFireImg, FirePlayer.x, FirePlayer.y, FirePlayerWidth, FirePlayerHeight);
    } else {
        context.drawImage(FirePlayerImg, FirePlayer.x, FirePlayer.y, FirePlayerWidth, FirePlayerHeight);
    }

    requestAnimationFrame(update);
}

function resizeBoard() {
    board.width = window.innerWidth;
    board.height = window.innerHeight;
}