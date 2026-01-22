import { Block } from './objects/block.js';
import { Poison } from './objects/poison.js';

import { Door } from './objects/door.js';

export const doors = [];

import { mapData } from './map.js';


export const gameObjects = [];

export function loadGameObjects() {
    gameObjects.length = 0;
    doors.length = 0; // <-- belangrijk bij restart

    for (const obj of mapData.objects) {
        if (obj.type === "block") {
            gameObjects.push(new Block({
                position: { x: obj.x, y: obj.y },
                size: { width: obj.width, height: obj.height }
            }));
        }
        else if (obj.type === "poison") {
            gameObjects.push(new Poison({
                poisonType: obj.poisonType,
                position: { x: obj.x, y: obj.y },
                size: { width: obj.width, height: obj.height }
            }));
        }
        else if (obj.type === "door") {
            const door = new Door({
                doorType: obj.doorType,
                position: { x: obj.x, y: obj.y },
                size: { width: obj.width, height: obj.height }
            });

            gameObjects.push(door);
            doors.push(door);
        }
    }
}
export function updateGameObjects() {
    for (const obj of gameObjects) obj.draw();
}



export function getDoors() {
    return doors;
}

