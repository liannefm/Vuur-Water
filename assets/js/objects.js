import { Block } from './objects/block.js';
import { Poison } from './objects/poison.js';
import { Door } from './objects/door.js';
import { Button } from './objects/button.js';
import { Triangle } from './objects/triangle.js';

export const doors = [];

import { mapData } from './map.js';


export const gameObjects = [];

export function loadGameObjects() {
    gameObjects.length = 0;
    doors.length = 0; // <-- belangrijk bij restart

    for (const obj of mapData.objects) {
        if (obj.type === "block") {
            gameObjects.push(new Block({
                id: obj.id,
                position: { x: obj.x, y: obj.y },
                size: { width: obj.width, height: obj.height }
            }));
        }
        else if (obj.type === "triangle") {
            gameObjects.push(new Triangle({
                id: obj.id,
                triangleType: obj.triangleType, // "left" of "right"
                position: { x: obj.x, y: obj.y },
                size: { width: obj.width, height: obj.height }
            }));
        }
        else if (obj.type === "poison") {
            gameObjects.push(new Poison({
                id: obj.id,
                poisonType: obj.poisonType,
                position: { x: obj.x, y: obj.y },
                size: { width: obj.width, height: obj.height }
            }));
        }
        else if (obj.type === "door") {
            const door = new Door({
                id: obj.id,
                doorType: obj.doorType,
                position: { x: obj.x, y: obj.y },
                size: { width: obj.width, height: obj.height }
            });

            gameObjects.push(door);
            doors.push(door);
        }
        else if (obj.type === "button") {
            gameObjects.push(new Button({
                id: obj.id,
                color: obj.color,
                targetID: obj.targetID,
                newTargetPos: obj.newTargetPos,
                position: { x: obj.x, y: obj.y },
                size: { width: obj.width, height: obj.height }
            }));
        }
    }
}
export function updateGameObjects() {
    for (const obj of gameObjects) obj.draw();
}



export function getDoors() {
    return doors;
}

