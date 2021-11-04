import Build from './Build';
import Alter from './Alter';
import Unit from '../util/Unit';
import Events from '../util/Events';
import Floor from './Floor';
import Walls from './Walls';
import Cursor from '../util/Cursor';
import RoomDialog from '../dialogs/Room';
import Config from "../Config";

let rooms = [];

/**
 * Base class for all rooms.
 *
 * Cannot be instantiated
 */
export default class Room {
    constructor() {
        if (new.target === Room) throw TypeError('new of abstract class Floor');

        this.roomIndex = rooms.push(this) - 1;

        this.mode = 'build';
        this.floor = new Floor(this, {
            color: Config.colors.buildableRoomFloor,
            texture: Config.textures.buildableRoomFloor,
            opacity: 0.5,
        });
        this.walls = new Walls(this, {
            color: Config.colors.buildableRoomWall,
            texture: Config.textures.buildableRoomWall,
            opacity: 0.5,
            opacityFront: 0,
            opacityBack: 0,
            type: 'room',
        });
        this.startTile = {};
        this.endTile = {};
        this._animateListenerID = null;
        this.needsDraw = false;

        this.dialog = new RoomDialog({
            actions: {
                cancel: () => {
                    this.cancel();
                },
            }
        });

        new Build(this, () => this.alter());
    }

    set opacity(opacity) {
        this.floor.config.opacity = opacity;
        this.walls.config.opacity = opacity;
        this.redraw();
    }

    get minSize() {
        throw TypeError('missing required getter `minSize` in class ' + this.constructor.name);
    }

    get isBigEnough() {
        const coords = Unit.rectangleCoords(this.startTile.x, this.startTile.z, this.endTile.x, this.endTile.z);

        return (
            coords.to.x - coords.from.x + 1 >= this.minSize &&
            coords.to.z - coords.from.z + 1 >= this.minSize
        );
    }

    get isProceedable() {
        return (this.isBigEnough && this.floor.isCompletable);
    }

    addProceed() {
        if (this.proceedButton) {
            return;
        }

        this.proceedButton = this.dialog.add(this, 'proceed');
    }

    removeProceed() {
        if (this.proceedButton) {
            this.dialog.remove(this.proceedButton);
            this.proceedButton = null;
        }
    }

    proceed() {
        console.log('proceeding');
    }

    cancel() {
        this.removeAnimateListen();
        this.floor.removeAllTiles();
        this.walls.removeAllTiles();
        this.dialog.destroy();
        this.floor = null;
        this.walls = null;
        this.dialog = null;
        Events.removeListenersByName('mousedown');
        Events.removeListenersByName('mouseup');
        Events.removeListenersByName('mousemove');
        Cursor.default();
        Events.fire('controls', true);

        delete rooms[this.roomIndex];
    }

    alter() {
        this.mode = 'alter';
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

        if (this.isProceedable) {
            this.addProceed();
        } else {
            this.removeProceed();
        }
    }

    redraw() {
        this.floor.removeAllTiles();
        this.needsDraw = true;
        this.draw();
    }

}
