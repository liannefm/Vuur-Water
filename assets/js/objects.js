import { mapData } from './map.js';

import { Block } from './objects/block.js';
import { Poison } from './objects/poison.js';
import { Door } from './objects/door.js';


export const gameObjects = [];

export function loadGameObjects() {
    for (const key in mapData['objects']) {
        const object = mapData['objects'][key];
        const objectType = object['type'];

        if (objectType === 'block') {
            gameObjects.push(new Block({
                position: {
                    x: object['x'],
                    y: object['y']
                },
                size: {
                    width: object['width'],
                    height: object['height']
                }
            }));
        }else if (objectType === 'poison') {
            gameObjects.push(new Poison({
                poisonType: object['poisonType'],
                position: {
                    x: object['x'],
                    y: object['y']
                },
                size: {
                    width: object['width'],
                    height: object['height']
                }
            }));
        }else if (objectType === 'door') {
            gameObjects.push(new Door({
                doorType: object['doorType'],
                position: {
                    x: object['x'],
                    y: object['y']
                },
                size: {
                    width: object['width'],
                    height: object['height']
                }
            }));
        }
    }
}

export function updateGameObjects() {
    for (const key in gameObjects) {
        const gameObject = gameObjects[key];
        gameObject.draw();
    }
}


