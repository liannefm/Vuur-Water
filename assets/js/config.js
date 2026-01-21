export const board = document.getElementById("board");
export const context = board.getContext("2d");

export const PLAYER_MAX_HEIGHT = 100;

export const PLAYER_SPEED = 3.5;
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

export const POISON_CONFIGS = {
    frame_speed: 12.5,

    poison: [
        'assets/img/poison/poison-frame-1.png',
        'assets/img/poison/poison-frame-2.png',
        'assets/img/poison/poison-frame-3.png',
        'assets/img/poison/poison-frame-4.png'
    ],

    fire: [
        'assets/img/poison/fire-frame-1.png',
        'assets/img/poison/fire-frame-2.png',
        'assets/img/poison/fire-frame-3.png',
        'assets/img/poison/fire-frame-4.png',
        'assets/img/poison/fire-frame-5.png'
    ],

    water: [
        'assets/img/poison/water-frame-1.png',
        'assets/img/poison/water-frame-2.png',
        'assets/img/poison/water-frame-3.png',
        'assets/img/poison/water-frame-4.png',
        'assets/img/poison/water-frame-5.png'
    ],
}