import FloorTile from '../objects/FloorTile';
import WallTile from '../objects/WallTile';
import Floor from '../objects/Floor';
import Unit from '../util/Unit';
import Walls from '../objects/Walls';

/**
 * Base class for all levels
 *
 * Cannot be instantiated
 */
export default class Level {
    constructor() {
        if (new.target === Level) throw TypeError('new of abstract class Level');

        this._wallTiles = [];
        this._floorTiles = [];
        this.grass = new Floor({
            type: 'grass',
        });
        this.floor = new Floor({
            opacity: 0.5,
        });
        this.walls = new Walls();
    }

    width() {
        throw TypeError('missing required method `width` in class ' + this.constructor.name);
    }

    height() {
        throw TypeError('missing required method `height` in class ' + this.constructor.name);
    }

    floorData() {
        throw TypeError('missing required method `floorData` in class ' + this.constructor.name);
    }

    wallData() {
        throw TypeError('missing required method `wallData` in class ' + this.constructor.name);
    }

    draw() {
        this.drawGrass();
        this.drawFloor();
        this.drawWalls();
    }

    drawGrass() {
        new FloorTile(0, 0, {
            type: 'grass',
            // color: (x % 2) ? 0x008d28 : 0x34A842,
            texture: 'grass2',
            width: this.width(),
            height: this.height(),
            depth: -20
        });
    }

    drawFloor() {
        this.floorData().forEach(row => {
            for (let z = row.from.z; z <= row.to.z; z++) {
                for (let x = row.from.x; x <= row.to.x; x++) {
                    this._floorTiles.push(new FloorTile(x, z, row));
                }
            }
        });

        return this._floorTiles;
    }

    drawWalls() {
        this.wallData().forEach(row => {
            for (let i=0; i < row.length1; i++) {
                this._wallTiles.push(new WallTile(row.x, row.z, row));

                row.x += (row.north) ? 0 : 1;
                row.z += (row.north) ? 1 : 0;
            }
        });

        return this._wallTiles;
    }

    hideWalls() {
        this._wallTiles.forEach(wall => {
            wall.hide();
        });
    }

    showWalls() {
        this._wallTiles.forEach(wall => {
            wall.show();
        });
    }
}
