import Events from '../util/Events';
import ThreeHelper from '../util/ThreeHelper';
import Cursor from '../util/Cursor';

export default class Alter {
    constructor(room) {
        this.room = room;

        this._dragging = false;
        this._checkCoord = 'x';

        Events.listen('mousemove', event => this.hover(event));
        Events.listen('mousedown', event => this.click(event));
        Events.fire('controls', true);
    }

    hover(event) {
        let objects = ThreeHelper.getIntersectedFloors(event, 'floor');
        if (!objects.length) {
            return;
        }

        objects.forEach(object => this.updateCursor(object));
    }

    updateCursor(object) {
        if (object.room === this.room) {
            return;
        }

        if (object.coords.x === this.room.startTile.x || object.coords.x === this.room.endTile.x) {
            Cursor.ewResize();
            Events.fire('controls', false);
        } else if (object.coords.z === this.room.startTile.z || object.coords.z === this.room.endTile.z) {
            Cursor.nsResize();
            Events.fire('controls', false);
        } else {
            Cursor.default();
            Events.fire('controls', true);
        }
    }

    click(event) {
        let objects = ThreeHelper.getIntersectedFloors(event, 'floor');
        if (!objects.length) {
            return;
        }

        objects.forEach(object => this.startDrag(object));
    }

    startDrag(object) {
        if (this._dragging) {
            return;
        }

        if (object.coords.x === this.room.startTile.x) {
            this._dragging = 'startTile';
            this._checkCoord = 'x';
        } else if (object.coords.x === this.room.endTile.x) {
            this._dragging = 'endTile';
            this._checkCoord = 'x';
        } else if (object.coords.z === this.room.startTile.z) {
            this._dragging = 'startTile';
            this._checkCoord = 'z';
        } else if (object.coords.z === this.room.endTile.z) {
            this._dragging = 'endTile';
            this._checkCoord = 'z';
        } else {
            return;
        }

        Events.removeListenersByName('mousemove');
        Events.listen('mousemove', event => this.midDrag(event));
        Events.listen('mouseup', () => this.endDrag());
        this.room.animateListen();
    }

    midDrag(event) {
        let objects = ThreeHelper.getIntersectedFloors(event, 'floor');
        if (!objects.length) {
            return;
        }

        objects.forEach(object => {
            if (this.room[this._dragging][this._checkCoord] !== object.coords[this._checkCoord]) {
                this.room[this._dragging][this._checkCoord] = object.coords[this._checkCoord];
                this.room.needsDraw = true;
            }
        });
    }

    endDrag() {
        this._dragging = false;
        Events.removeListenersByName('mousemove');
        Events.removeListenersByName('mouseup');
        this.room.removeAnimateListen();

        Events.listen('mousemove', event => this.hover(event));
        Events.listen('mousedown', event => this.click(event));
    }
}
