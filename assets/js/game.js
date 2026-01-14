// board
let board;
let context;

// player water
let WaterPlayerWidth = 40;
let WaterPlayerHeight = 40;

let WaterLeftPressed = false;
let WaterRightPressed = false;

let WaterPlayer = {
    x: 100,
    y: 500
};

// player fire
let FirePlayerWidth = 40;
let FirePlayerHeight = 40;

let FireLeftPressed = false;
let FireRightPressed = false;

let FirePlayer = {
    x: 200,
    y: 500
};

//snelheid is pixels per frame
let PlayersSpeed = 2;

//achtergronds afbeelding
const BackgroundImg = new Image();
BackgroundImg.src = "assets/img/levelmuur.png";

window.onload = function () {
    board = document.getElementById("board");
    context = board.getContext("2d"); //word gebruikt om op het bord te tekenen.

    resizeBoard();

    window.addEventListener("resize", resizeBoard);

    document.addEventListener("keydown", (e) => {
        e.preventDefault();

        // water controls
        if (e.code === "KeyA") {
            WaterLeftPressed = true;
        }

        if (e.code === "KeyD") {
            WaterRightPressed = true;
        }

        // fire controls
        if (e.code === "ArrowLeft") {
            FireLeftPressed = true;
        }

        if (e.code === "ArrowRight") {
            FireRightPressed = true;
        }


    });

    document.addEventListener("keyup", (e) => {
        //water controls
        if (e.code === "KeyA") WaterLeftPressed = false;
        if (e.code === "KeyD") WaterRightPressed = false;

        //fire controls
        if (e.code === "ArrowLeft") FireLeftPressed = false;
        if (e.code === "ArrowRight") FireRightPressed = false;
    });

    update();
}

function update() {
    context.clearRect(0, 0, board.width, board.height);

    // water moves per frame
    if (WaterLeftPressed) {
        WaterPlayer.x -= PlayersSpeed;
    }
    if (WaterRightPressed) {
        WaterPlayer.x += PlayersSpeed;
    }

    // fire moves per frame
    if (FireLeftPressed) {
        FirePlayer.x -= PlayersSpeed;
    }
    if (FireRightPressed) {
        FirePlayer.x += PlayersSpeed;
    }

    // draws background
    if (BackgroundImg.complete && BackgroundImg.naturalWidth > 0) {
        context.drawImage(BackgroundImg, 0, 0, board.width, board.height);
    } else {
        context.fillStyle = "black";
        context.fillRect(0, 0, board.width, board.height);
    }

    // draw water
    context.fillStyle = "blue";
    context.fillRect(
        WaterPlayer.x,
        WaterPlayer.y,
        WaterPlayerWidth,
        WaterPlayerHeight
    );

    // draw fire
    context.fillStyle = "red";
    context.fillRect(
        FirePlayer.x,
        FirePlayer.y,
        FirePlayerWidth,
        FirePlayerHeight
    );

    requestAnimationFrame(update);
}

function resizeBoard() {
    board.width = window.innerWidth;
    board.height = window.innerHeight;

    BoardWidth = board.width;
    BoardHeight = board.height;
}