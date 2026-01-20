export const board = document.getElementById("board");
export const context = board.getContext("2d");

export const PLAYER_MAX_HEIGHT = 100;

export const PLAYER_SPEED = 2;
export const WALK_FRAME_SPEED = 14; // lager = sneller wisselen
export const GRAVITY = 0.4;
export const JUMP_POWER = 10;

export const PLAYER_CONFIGS = {
    water: {
        idleImageSrc: 'assets/img/players/water-poppetje.png',
        walkingImageSrcs: [
            'assets/img/players/water-lopend-1.png',
            'assets/img/players/water-lopend-2.png'
        ],

        keys: {
            left: 'KeyA',
            right: 'KeyD',
            jump: 'KeyW'
        },
    },

    fire: {
        idleImageSrc: 'assets/img/players/vuur-poppetje.png',
        walkingImageSrcs: [
            'assets/img/players/vuur-lopend-1.png',
            'assets/img/players/vuur-lopend-2.png'
        ],

        keys: {
            left: 'ArrowLeft',
            right: 'ArrowRight',
            jump: 'ArrowUp'
        },
    }
}

export const LAVA_CONFIGS = {
    frame_speed: 10,

    water: [
        'assets/img/lava/water-lava-frame-1.png',
        'assets/img/lava/water-lava-frame-2.png',
        'assets/img/lava/water-lava-frame-3.png',
        'assets/img/lava/water-lava-frame-4.png'
    ],
}