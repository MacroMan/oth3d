import Floor from '../objects/Floor';
import Walls from '../objects/Walls';
import Events from '../util/Events';
import Cursor from '../util/Cursor';
import Storage from '../util/Storage';
import ThreeHelper from '../util/ThreeHelper';

export default class Build {
    constructor(room, callback) {
        if (typeof callback !== 'function') {
            throw TypeError('callback must be a function. typeof' + typeof callback + ' provided');
        }

        this.room = room;
        this.callback = callback;
        this.needsDraw = false;
        this._animateListenerID = null;

        this.room.floor = new Floor({
            color: 0x00A945,
            opacity: 0.5,
            room: room,
        });
        this.room.walls = new Walls({
            color: 0x00A945,
            opacity: 0.5,
            type: 'room',
            room: room,
        });

        this.build();
    }

    /**
     * Start building the room
     */
    build() {
        Events.listen('mousedown', event => this.startDrag(event));
        Events.listen('mouseup', event => this.endDrag(event));

        // Turn camera control off
        Events.fire('controls', false);

        // Change the mouse cursor
        Cursor.crosshair();

        // Hide the level walls
        Storage.get('currentLevel').hideWalls();
    }

    startDrag(event) {
        Events.listen('mousemove', event => this.midDrag(event));
        this.room.animateListen();

        let object = ThreeHelper.getIntersectedFloors(event, 'floor')[0];
        if (!object) {
            return;
        }

        this.room.startTile = this.room.endTile = object.coords;
        this.room.needsDraw = true;
    }

    midDrag(event) {
        let object = ThreeHelper.getIntersectedFloors(event, 'floor')[0];
        if (!object) {
            return;
        }

        if (this.room.endTile.x !== object.coords.x || this.room.endTile.z !== object.coords.z) {
            this.room.endTile = object.coords;
            this.room.needsDraw = true;
        }
    }

    endDrag() {
        Events.removeListenersByName('mousedown');
        Events.removeListenersByName('mouseup');
        Events.removeListenersByName('mousemove');
        this.room.removeAnimateListen();
        // Events.fire('controls', true);
        Cursor.default();
        // Storage.get('currentLevel').showWalls();
        // this.opacity = 1;
        this.callback();
    }


}
