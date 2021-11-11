import Build from './Build';
import Alter from './Alter';
import Unit from '../util/Unit';
import Events from '../util/Events';
import Floor from './Floor';
import Walls from './Walls';
import Cursor from '../util/Cursor';
import RoomDialog from '../dialogs/Room';
import Config from "../Config";
import Door from "./Door";

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
        this.doorTile = null;
        this._animateListenerID = null;
        this.needsDraw = false;

        this.dialog = new RoomDialog({
            actions: {
                cancel: () => this.cancel(),
            }
        });

        new Build(this, () => this.alter());
    }

    // ####################
    // Accessors / Mutators
    // ####################

    set opacity(opacity) {
        this.floor.config.opacity = opacity;
        this.walls.config.opacity = opacity;
        this.redraw();
    }

    get slug() {
        throw TypeError('missing required getter `slug` in class ' + this.constructor.name);
    }

    get name() {
        throw TypeError('missing required getter `name` in class ' + this.constructor.name);
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

    // #######
    // Helpers
    // #######

    isCoordsOverStartX(coords) {
        return coords.x === this.startTile.x && this.isCoordsOverRoom(coords);
    }

    isCoordsOverStartZ(coords) {
        return coords.z === this.startTile.z && this.isCoordsOverRoom(coords);
    }

    isCoordsOverEndX(coords) {
        return coords.x === this.endTile.x && this.isCoordsOverRoom(coords);
    }

    isCoordsOverEndZ(coords) {
        return coords.z === this.endTile.z && this.isCoordsOverRoom(coords);
    }

    isCoordsOverRoom(coords) {
        return coords.x >= this.startTile.x &&
            coords.x <= this.endTile.x &&
            coords.z >= this.startTile.z &&
            coords.z <= this.endTile.z;
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
        this.unlistenAll();

        this.floor.config.opacity = 1;
        // this.floor.config.color = Config.rooms[this.slug].floorColor;
        // this.floor.config.texture = Config.rooms[this.slug].floorTexture;
        //
        // this.walls.config.opacity = 1;
        // this.walls.config.opacityFront = 1;
        // this.walls.config.opacityBack = 1;
        // this.walls.config.color = Config.rooms[this.slug].wallColor;
        // this.walls.config.texture = Config.rooms[this.slug].wallTexture;

        this.redraw();

        if (this.mode === 'alter') {
            this.mode = 'door';
            new Door(this);
        }
    }

    cancel() {
        this.removeAnimateListen();
        this.floor.removeAllTiles();
        this.walls.removeAllTiles();
        this.dialog.destroy();
        this.floor = null;
        this.walls = null;
        this.dialog = null;
        this.unlistenAll();

        delete rooms[this.roomIndex];
    }

    unlistenAll() {
        Events.removeListenersByName('pointerdown-left');
        Events.removeListenersByName('pointerup-left');
        Events.removeListenersByName('pointermove');
        Events.fire('controls-pan', true);
        Cursor.default();
    }

    alter() {
        this.mode = 'alter';
        new Alter(this);
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
        this.walls.drawRectangle(coords, {door: this.doorTile});
        this.needsDraw = false;

        if (this.isProceedable) {
            this.addProceed();
        } else {
            this.removeProceed();
        }
    }

    redraw() {
        this.floor.removeAllTiles();
        this.walls.removeAllTiles();
        this.needsDraw = true;
        this.draw();
    }

    /**
     * Move the room on the map by x and z units
     *
     * @param x
     * @param z
     */
    move(x, z) {
        this.startTile.x += x;
        this.startTile.z += z;
        this.endTile.x += x;
        this.endTile.z += z;
    }

}
