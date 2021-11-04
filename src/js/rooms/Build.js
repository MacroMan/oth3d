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
        Cursor.default();
        this.callback();
    }

}
