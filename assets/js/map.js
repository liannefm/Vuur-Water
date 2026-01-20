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
            "type": "block",
            "x": -1,
            "y": -9,
            "width": 1000,
            "height": 60
        },
        {
            "type": "poison",
            "poisonType": "poison",
            "x": 1000,
            "y": 1,
            "width": 150,
            "height": 50
        },
        {
            "type": "poison",
            "poisonType": "fire",
            "x": 1150,
            "y": 1,
            "width": 150,
            "height": 50
        },
        {
            "type": "poison",
            "poisonType": "water",
            "x": 1300,
            "y": 1,
            "width": 150,
            "height": 50
        },
    ]
}