import { context } from "./config.js";

export const mapData = {
    "fireSpawn": {
        "x": 13,
        "y": 55
    },
    "waterSpawn": {
        "x": 65,
        "y": 55
    },
    "objects": [
        {
            "id": 1,
            "type": "block",
            "x": -1,
            "y": -9,
            "width": 1000,
            "height": 60
        },
        {
            "id": 2,
            "type": "poison",
            "poisonType": "poison",
            "x": 1000,
            "y": 1,
            "width": 150,
            "height": 50
        },
        {
            "id": 3,
            "type": "poison",
            "poisonType": "fire",
            "x": 1150,
            "y": 1,
            "width": 150,
            "height": 50
        },
        {
            "id": 4,
            "type": "poison",
            "poisonType": "water",
            "x": 1300,
            "y": 1,
            "width": 150,
            "height": 50
        },
        {
            "id": 5,
            "type": "door",
            "doorType": "waterdoor",
            "x": 800,
            "y": 40,
            "width": 121,
            "height": 144,
        },
        {
            "id": 6,
            "type": "door",
            "doorType": "firedoor",
            "x": 679,
            "y": 40,
            "width": 121,
            "height": 144,
        },
        {
            "id": 7,
            "type": "button",
            "color": "blue",
            "targetID": 8,
            "newTargetPos": {
                "y": 280,
            },
            "x": 529,
            "y": 47,
            "width": 74,
            "height": 31
        },
        {
            "id": 8,
            "type": "block",
            "x": 100,
            "y": 250,
            "width": 60,
            "height": 60
        }
    ]
}