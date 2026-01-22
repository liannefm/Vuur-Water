import { Block } from './objects/block.js';
import { Poison } from './objects/poison.js';
import { mapData } from './map.js';

export const gameObjects = [];

export function loadGameObjects() {
    gameObjects.length = 0;

    for (const obj of mapData.objects) {
        if (obj.type === "block") {
            gameObjects.push(new Block({
                position: { x: obj.x, y: obj.y },
                size: { width: obj.width, height: obj.height }
            }));
        }

        if (obj.type === "poison") {
            gameObjects.push(new Poison({
                poisonType: obj.poisonType,
                position: { x: obj.x, y: obj.y },
                size: { width: obj.width, height: obj.height }
            }));
        }
    }
}

export function updateGameObjects() {
    for (const obj of gameObjects) obj.draw();
}
