import { context, BUTTON_CONFIGS } from '../config.js';
import { gameObjects } from '../objects.js';

export class Button {
    constructor({ id, color, targetID, newTargetPos, position, size }) {
        this.id = id;
        this.touch = {};
        this.type = 'button';

        this.targetID = targetID;
        this.newTargetPos = newTargetPos;
        this.targetObject = null;

        const imageSrc = BUTTON_CONFIGS[color] || BUTTON_CONFIGS['white'];

        this.image = new Image();
        this.image.src = imageSrc;

        this.position = {
            x: position.x,
            y: window.innerHeight - (position.y + size.height)
        };

        this.size = size;
    }

    onTouch(player) {
        if (this.touch[player.type] === true) return;
        this.touch[player.type] = true;

        if (!this.targetObject) {
            this.targetObject = gameObjects.find(obj => obj.id === this.targetID);
            if (this.targetObject) {
                this.targetObject.originalPosition = {
                    x: this.targetObject.position.x,
                    y: this.targetObject.position.y
                };
            }
        }
    }

    onRelease(player) {
        if (this.touch[player.type] === false) return;
        this.touch[player.type] = false;   
    }

    draw() {
        const isButtonPressed = Object.values(this.touch).some(value => value === true);

        if (isButtonPressed && this.targetObject) {
            if (this.targetObject.position.x !== this.newTargetPos.x) {
                if (this.targetObject.position.x < this.newTargetPos.x) {
                    this.targetObject.position.x += 1;
                }else if (this.targetObject.position.x > this.newTargetPos.x) {
                    this.targetObject.position.x -= 1;
                }
            }

            if (this.targetObject.position.y !== this.newTargetPos.y) {
                if (this.targetObject.position.y < this.newTargetPos.y) {
                    this.targetObject.position.y += 1;
                }else if (this.targetObject.position.y > this.newTargetPos.y) {
                    this.targetObject.position.y -= 1;
                }
            }
        }else if (!isButtonPressed && this.targetObject) {
            if (this.targetObject.position.x !== this.targetObject.originalPosition.x) {
                if (this.targetObject.position.x < this.targetObject.originalPosition.x) {
                    this.targetObject.position.x += 1;
                }else if (this.targetObject.position.x > this.targetObject.originalPosition.x) {
                    this.targetObject.position.x -= 1;
                }
            }

            if (this.targetObject.position.y !== this.targetObject.originalPosition.y) {
                if (this.targetObject.position.y < this.targetObject.originalPosition.y) {
                    this.targetObject.position.y += 1;
                }else if (this.targetObject.position.y > this.targetObject.originalPosition.y) {
                    this.targetObject.position.y -= 1;
                }
            }
        }

        context.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
    }
}