import FloorTile from '../objects/FloorTile';
import WallTile from '../objects/WallTile';
import Matrix from '../util/Matrix';
import Config from "../Config";

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
        Matrix.init(this.width(), this.height());
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
        for (let z = 0; z <= this.height(); z++) {
            for (let x = 0; x <= this.width(); x++) {
                if (!this.hasFloorTile(x, z)) {
                    new FloorTile(x, z, {
                        type: 'grass',
                        color: Config.colors.grass,
                        texture: Config.textures.grass,
                    });
                }
            }
        }
    }

    drawFloor() {
        this.floorData().forEach(row => {
            for (let z = row.from.z; z <= row.to.z; z++) {
                for (let x = row.from.x; x <= row.to.x; x++) {
                    this._floorTiles.push(new FloorTile(x, z, row));
                    if (row.buildable) {
                        Matrix.setBuildable(x, z);
                    }
                }
            }
        });

        return this._floorTiles;
    }

    drawWalls() {
        this.wallData().forEach(row => {
            for (let i = 0; i < row.length1; i++) {
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

    hasFloorTile(x, z) {
        return this.floorData().filter(row => {
            return x >= row.from.x && x <= row.to.x && z >= row.from.z && z <= row.to.z;
        }).length;
    }
}
