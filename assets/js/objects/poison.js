import { context, POISON_CONFIGS } from '../config.js';

export class Poison {
    constructor({ poisonType, position, size }) {
        this.type = 'poison';
        this.poisonType = poisonType;

        this.images = [];

        for (const src of POISON_CONFIGS[this.poisonType]) {
            const img = new Image();
            img.src = src;
            this.images.push(img);
        }
        
        this.currentFrame = 0;
        this.frameCounter = 0;

        this.position = {
            x: position.x,
            y: window.innerHeight - (position.y + size.height)
        };

        this.size = size;
    }

    onTouch(player) {
        const playerType = player.type;
        
        if(this.poisonType == 'poison' || 
        (this.poisonType == 'fire' && playerType == 'water') || 
        (this.poisonType == 'water' && playerType == 'fire')){
            console.log("DOOOOOOD");
        }
    }

    draw() {
        const image = this.images[this.currentFrame];
        if (image.complete && image.naturalWidth > 0) {
            context.drawImage(image, this.position.x, this.position.y, this.size.width, this.size.height);
        }
        
        this.frameCounter++;
        if (this.frameCounter >= POISON_CONFIGS.frame_speed) {
            this.currentFrame = (this.currentFrame + 1) % this.images.length;
            this.frameCounter = 0;
        }
    }
}