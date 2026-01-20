import { context } from './config.js';
import { PLAYER_CONFIGS, PLAYER_SPEED, WALK_FRAME_SPEED, JUMP_POWER, GRAVITY, PLAYER_MAX_HEIGHT } from './config.js';
import { mapData } from './map.js';
import { gameObjects } from './objects.js';

export const players = {};

class Player {
    constructor({ type, position, }) {
        this.type = type;
        this.position = {
            x: position.x,
            y: position.y - PLAYER_MAX_HEIGHT
        }

        this.size = {
            width: null,
            height: PLAYER_MAX_HEIGHT
        }

        this.velocity = {
            y: 0
        }

        this.presseds = {
            left: false,
            right: false
        }

        this.images = {}
        this.loadImages();

        this.walk = {
            frame: 0,
            frameCounter: 0
        }

        this.onGround = false;

        window.addEventListener('keydown', (event) => {
            const playerConfig = PLAYER_CONFIGS[this.type];
            if (event.code === playerConfig.keys.left) {
                this.presseds.left = true;
            }

            if (event.code === playerConfig.keys.right) {
                this.presseds.right = true;
            }

            if (event.code === playerConfig.keys.jump && this.onGround) {
                this.velocity.y = -JUMP_POWER;
                this.onGround = false;
            }
        });

        window.addEventListener('keyup', (event) => {
            const playerConfig = PLAYER_CONFIGS[this.type];

            if (event.code === playerConfig.keys.left) {
                this.presseds.left = false;
            }

            if (event.code === playerConfig.keys.right) {
                this.presseds.right = false;
            }
        });
    }

    loadImages() {
        const playerConfig = PLAYER_CONFIGS[this.type];
        this.images.idle = new Image();
        this.images.idle.src = playerConfig.idleImageSrc;

        this.images.idle.onload = this.imageLoaded.bind(this);

        this.images.walking = playerConfig.walkingImageSrcs.map(src => {
            const img = new Image();
            img.src = src;
            img.onload = this.imageLoaded.bind(this);
            return img;
        });
    }

    imageLoaded() {
        const scale = PLAYER_MAX_HEIGHT / this.images.idle.naturalHeight;
        this.width = this.images.idle.naturalWidth * scale;
        this.height = PLAYER_MAX_HEIGHT;

        if (this.size.width === null) {
            this.size.width = this.width;
        }

    }

    checkCollision(a, b) {
        return (
            a.position.x < b.position.x + b.size.width &&
            a.position.x + a.size.width > b.position.x &&
            a.position.y < b.position.y + b.size.height &&
            a.position.y + a.size.height > b.position.y
        );
    }


    applyGravity() {
        this.velocity.y += GRAVITY;
        this.onGround = false;

        this.position.y += this.velocity.y;

        for (const key in gameObjects) {
            const object = gameObjects[key];
            if (object.type !== 'block' && object.type !== 'poison') continue;

            if (this.checkCollision(this, object)) {
                if (typeof object.onTouch === "function"){
                    object.onTouch(this);
                }

                if (this.velocity.y > 0) {
                    this.position.y = object.position.y - this.size.height;
                    this.velocity.y = 0;
                    this.onGround = true;
                }

                if (this.velocity.y < 0) {
                    this.position.y = object.position.y + object.size.height;
                    this.velocity.y = 0;
                }
            }
        }
    }

    moveX(direction) {
        this.position.x += direction * PLAYER_SPEED;

        for (const key in gameObjects) {
            const object = gameObjects[key];

            if (object.type !== 'block' && object.type !== 'poison') continue;
            if (this.checkCollision(this, object)) {
                if (direction > 0) {
                    this.position.x = object.position.x - this.size.width;
                } else if (direction < 0) {
                    this.position.x = object.position.x + object.size.width;
                }
            }
        }
    }


    update() {
        this.walk.frameCounter++;
        if (this.walk.frameCounter >= WALK_FRAME_SPEED) {
            this.walk.frameCounter = 0;
            this.walk.frame = (this.walk.frame + 1) % 2;
        }

        if (this.presseds.left) {
            this.moveX(-1);
        }
        if (this.presseds.right) {
            this.moveX(1);
        }

        this.applyGravity();
    }


    draw() {
        if (this.presseds.left == false && this.presseds.right == false) {
            context.drawImage(this.images.idle, this.position.x, this.position.y, this.size.width, this.size.height);
        } else if ((this.presseds.left == true && this.type == 'water') || (this.presseds.right == true && this.type == 'fire')) {
            const walkingImage = this.images.walking[this.walk.frame];
            context.drawImage(walkingImage, this.position.x, this.position.y, this.size.width, this.size.height);
        } else if ((this.presseds.right == true && this.type == 'water') || (this.presseds.left == true && this.type == 'fire')) {
            const walkingImage = this.images.walking[this.walk.frame];

            context.save();
            context.translate(this.position.x + this.size.width, this.position.y);
            context.scale(-1, 1);
            context.drawImage(walkingImage, 0, 0, this.size.width, this.size.height);
            context.restore();
        }
    }
}

export function loadPlayers() {
    players.water = new Player({
        type: 'water',
        position: {
            x: mapData.waterSpawn.x,
            y: window.innerHeight - mapData.waterSpawn.y // Andersom omdat y=0 bovenaan is
        }
    });

    players.fire = new Player({
        type: 'fire',
        position: {
            x: mapData.fireSpawn.x,
            y: window.innerHeight - mapData.fireSpawn.y // Andersom omdat y=0 bovenaan is
        }
    });
}

export function updatePlayers() {
    for (const key in players) {
        const player = players[key];
        player.update();
        player.draw();
    }
}