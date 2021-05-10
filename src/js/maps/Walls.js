import WallTile from '../objects/WallTile';

/**
 * Base class for all walls
 *
 * Cannot be instantiated
 */
export default class Walls {
    constructor(scene) {
        if (new.target === Walls) throw TypeError('new of abstract class Walls');

        this.scene = scene;

        this._tiles = [];
    }

    data() {
        throw TypeError('missing method `data` in class ' + this.constructor.name);
    }

    draw() {
        this.data().forEach(config => {
            if (!config.type) {
                config.type = 'standard';
            }

            this._tiles.push(new WallTile(this.scene, config.x, config.z, config.north, config.texture));
        });

        return this._tiles;
    }
}
