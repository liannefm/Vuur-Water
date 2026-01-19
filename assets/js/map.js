import { context } from "./config.js";

class Boundary {
    constructor({ position, size }) {
        this.position = position
        this.size = size
    }

    draw() {
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


const map = [

];

export const boundaries = [];

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: 100,
                            y: 100
                        }
                    })
                )
                break
        }
    });
});