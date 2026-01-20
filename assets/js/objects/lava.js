import { context, LAVA_CONFIGS } from '../config.js';

export class Lava {
    constructor({ lavaType, position, size }) {
        this.type = 'lava';
        this.lavaType = lavaType;

        this.images = {};

        for (const [index, src] of LAVA_CONFIGS[this.lavaType].entries()) {
            const img = new Image();
            img.src = src;
            this.images[index] = img;
        }
        
        this.currentFrame = 0;
        this.frameCounter = 0;

        this.position = {
            x: position.x,
            y: window.innerHeight - (position.y + size.height)
        };

        this.size = size;
    }

    draw() {
        const image = this.images[this.currentFrame];
        if (image.complete && image.naturalWidth > 0) {
            context.drawImage(image, this.position.x, this.position.y, this.size.width, this.size.height);
        }
        
        this.frameCounter++;
        if (this.frameCounter >= LAVA_CONFIGS.frame_speed) {
            this.currentFrame = (this.currentFrame + 1) % Object.keys(this.images).length;
            this.frameCounter = 0;
        }
    }
}