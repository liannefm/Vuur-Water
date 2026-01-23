import { context } from '../config.js';

export class Triangle {
    constructor({ id, triangleType, position, size }) {
        this.id = id;
        this.type = 'triangle';              // belangrijk!
        this.triangleType = triangleType;    // "left" of "right"

        // zelfde y-omkering als Block
        this.position = {
            x: position.x,
            y: window.innerHeight - (position.y + size.height)
        };

        this.size = size;
    }

    // Hoogte van de driehoek op een X binnen de bounding box
    // yLocal = 0 boven, yLocal = height onder
    heightAtLocalX(xLocal) {
        const w = this.size.width;
        const h = this.size.height;

        if (w <= 0) return h;

        if (this.triangleType === 'left') {
            // links: hoog links, laag rechts
            // top-lijn gaat van (0,0) naar (w,h)
            return (xLocal / w) * h;
        } else {
            // rechts: hoog rechts, laag links
            // top-lijn gaat van (0,h) naar (w,0)
            return ((w - xLocal) / w) * h;
        }
    }

    // Check of een punt (px,py) in de bounding box "onder de helling" zit (dus in solid gebied)
    // px,py zijn wereldcoördinaten
    isPointInsideSolid(px, py) {
        const x0 = this.position.x;
        const y0 = this.position.y;
        const w = this.size.width;
        const h = this.size.height;

        // buiten bounding box
        if (px < x0 || px > x0 + w || py < y0 || py > y0 + h) return false;

        const xLocal = px - x0;
        const yLocal = py - y0;

        // yLocal >= hoogte van de "lucht" boven de helling => dan zit je in de solid driehoek
        const slopeY = this.heightAtLocalX(xLocal);
        return yLocal >= slopeY;
    }

    draw() {
        context.fillStyle = 'rgba(221, 249, 252, 0.76)';

        const x = this.position.x;
        const y = this.position.y;
        const w = this.size.width;
        const h = this.size.height;

        context.beginPath();

        if (this.triangleType === 'left') {
            // punten: (x,y) top-left, (x,y+h) bottom-left, (x+w,y+h) bottom-right
            context.moveTo(x, y);
            context.lineTo(x, y + h);
            context.lineTo(x + w, y + h);
        } else {
            // right: (x+w,y) top-right, (x,y+h) bottom-left, (x+w,y+h) bottom-right
            context.moveTo(x + w, y);
            context.lineTo(x, y + h);
            context.lineTo(x + w, y + h);
        }

        context.closePath();
        context.fill();
    }
}