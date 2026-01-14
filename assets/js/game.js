// player water
let WaterPlayerWidth = 40;
let WaterPlayerHeight = 40;

let WaterLeftPressed = false;
let WaterRightPressed = false;

// player fire
let FirePlayerWidth = 40;
let FirePlayerHeight = 40;

let FireLeftPressed = false;
let FireRightPressed = false;

//snelheid is pixels per frame
let PlayersSpeed = 2;

let WaterPlayer = {
    width: WaterPlayerWidth,
    height: WaterPlayerHeight,
}

let FirePlayer = {
    width: FirePlayerWidth,
    height: FirePlayerHeight,
}

window.onload = function () {

    document.addEventListener("keydown", (e) => {
        if (["ArrowLeft", "ArrowRight", "ArrowUp", "KeyA", "KeyD", "KeyW", "Space"].includes(e.code)) e.preventDefault();

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

        document.addEventListener("keyup", (e) => {
            //water controls
            if (e.code === "KeyA") WaterLeftPressed = false;
            if (e.code === "keyD") WaterRightPressed = false;

            //fire controls
            if (e.code === "ArrowLeft") FireLeftPressed = false;
            if (e.code === "ArrowRight") FireRightPressed = false;
        });

    });


}