import Build from './Build';
import Alter from './Alter';
import Unit from '../util/Unit';
import Events from '../util/Events';

/**
 * Base class for all rooms.
 *
 * Cannot be instantiated
 */
export default class Room {
    constructor() {
        if (new.target === Room) throw TypeError('new of abstract class Floor');

        this.mode = 'build';
        this.floor = null;
        this.walls = null;
        this.startTile = {};
        this.endTile = {};
        this._animateListenerID = null;
        this.needsDraw = false;

        new Build(this, () => this.alter());
    }

    get floorColor() {
        throw TypeError('missing required method `get floorColor` in class ' + this.constructor.name);
    }

    // set opacity(opacity) {
    //     this.floor.config.opacity = opacity;
    //     this.walls.config.opacity = opacity;
    //     this.redraw();
    // }

    get wallColor() {
        throw TypeError('missing required method `get wallColor` in class ' + this.constructor.name);
    }

    alter() {
        new Alter(this, () => {

        });
    }

    animateListen() {
        this._animateListenerID = Events.listen('animate', () => this.draw());
    }

    removeAnimateListen() {
        Events.removeListenersByID(this._animateListenerID);
    }

    draw() {
        if (!this.needsDraw) {
            return;
        }

        const coords = Unit.rectangleCoords(this.startTile.x, this.startTile.z, this.endTile.x, this.endTile.z);

        this.floor.drawRectangle(coords);
        this.walls.drawRectangle(coords);
        this.needsDraw = false;
    }

    redraw() {
        this.floor.removeAllTiles();
        this.needsDraw = true;
        this.draw();
    }

}
