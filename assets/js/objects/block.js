import { context } from '../config.js';

export class Block {
    constructor({ id, position, size }) {
        this.id = id;
        this.type = 'block';

        this.position = {
            x: position.x,
            y: window.innerHeight - (position.y + size.height) // Andersom omdat y=0 bovenaan is
        };
        this.size = size;
    }

    draw() {
        context.fillStyle = 'rgba(221, 249, 252, 0.76)';
        context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
}