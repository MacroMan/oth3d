import FloorTile from '../objects/FloorTile';

/**
 * Base class for all Floors
 *
 * Cannot be instantiated
 */
export default class Floor {
    constructor(scene) {
        if (new.target === Floor) throw TypeError("new of abstract class Floor");

        this.scene = scene;

        this.grass = 'grass';
        this.inter = {
            'texture': 'cement',
            'type': 'internal',
        };
        this.roomi = {
            'texture': 'lino',
            'type': 'room',
        };
    }

    data() {
        throw TypeError("missing method `data` in class " + this.constructor.name);
    }

    draw() {
        this.data().forEach((row, z) => {
            row.forEach((config, x) => {
                if (typeof config === 'string') {
                    config = {
                        texture: config,
                    };
                }

                if (!config.type) {
                    config.type = 'external';
                }

                new FloorTile(this.scene, x, z, config.texture);
            });
        });
    }
}
