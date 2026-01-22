import { context, DOOR_CONFIGS } from '../config.js';

export class Door {
    constructor({ doorType, position, size }) {
        this.type = 'door';
        this.doorType = doorType;
        this.touch = false;

        this.images = {};
        
        for (const doorKey of ['opendoor', this.doorType]) {
            const src = DOOR_CONFIGS[doorKey];
            const img = new Image();

            img.src = src;
            this.images[doorKey] = img;
        }

        this.position = {
            x: position.x,
            y: window.innerHeight - (position.y + size.height)
        };

        this.doorPosition = {
            x: this.position.x,
            y: this.position.y
        };

        this.size = size;
    }

    onTouch(player) {
        const playerType = player.type;
        
        if(
        (this.doorType == 'firedoor' && playerType == 'fire') || 
        (this.doorType == 'waterdoor' && playerType == 'water')){
            this.touch = true;
        }
    }

    onRelease(player) {
        const playerType = player.type;

        if(
        (this.doorType == 'firedoor' && playerType == 'fire') || 
        (this.doorType == 'waterdoor' && playerType == 'water')){
            this.touch = false;
        }
    }

    draw() {
        if(this.touch && this.position.y - this.doorPosition.y <= 100){
            this.doorPosition.y -= 1;
        }else if (this.touch == false && this.position.y - this.doorPosition.y > 0){
            this.doorPosition.y += 1;
        }

        context.drawImage(this.images['opendoor'], this.position.x, this.position.y, this.size.width, this.size.height);
        context.drawImage(this.images[this.doorType], this.doorPosition.x, this.doorPosition.y, this.size.width, this.size.height);
    }
}