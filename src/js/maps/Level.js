/**
 * Base class for all levels
 *
 * Cannot be instantiated
 */
export default class Level {
    constructor(scene) {
        if (new.target === Level) throw TypeError('new of abstract class Level');

        this.scene = scene;
    }

    width() {
        throw TypeError('missing method `width` in class ' + this.constructor.name);
    }

    height() {
        throw TypeError('missing method `height` in class ' + this.constructor.name);
    }

    floor() {
        throw TypeError('missing method `floor` in class ' + this.constructor.name);
    }

    walls() {
        throw TypeError('missing method `walls` in class ' + this.constructor.name);
    }

    draw() {
        this.floor().draw();
        this.walls().draw();
    }
}
