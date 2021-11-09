import Events from '../util/Events';
import ThreeHelper from '../util/ThreeHelper';
import Cursor from '../util/Cursor';

export default class Alter {
    constructor(room) {
        this.room = room;

        this._dragging = false;
        this._checkCoord = 'x';
        this._currentX = null;
        this._currentZ = null;

        Events.listen('pointermove', event => this.hover(event));
        Events.listen('pointerdown-left', event => this.click(event));
        Events.fire('controls-pan', true);
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

        let coords = object.coords;

        if (this.room.isCoordsOverStartX(coords) || this.room.isCoordsOverEndX(coords)) {
            Cursor.ewResize();
            Events.fire('controls-pan', false);
        } else if (this.room.isCoordsOverStartZ(coords) || this.room.isCoordsOverEndZ(coords)) {
            Cursor.nsResize();
            Events.fire('controls-pan', false);
        } else if (this.room.isCoordsOverRoom(coords)) {
            Cursor.grab();
            Events.fire('controls-pan', false);
        } else {
            Cursor.default();
            Events.fire('controls-pan', true);
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

        let coords = object.coords;
        let draggingFunction = 'midDragResize';

        this.room.isCoordsOverStartX(coords)
        if (this.room.isCoordsOverStartX(coords)) {
            this._dragging = 'startTile';
            this._checkCoord = 'x';
        } else if (this.room.isCoordsOverEndX(coords)) {
            this._dragging = 'endTile';
            this._checkCoord = 'x';
        } else if (this.room.isCoordsOverStartZ(coords)) {
            this._dragging = 'startTile';
            this._checkCoord = 'z';
        } else if (this.room.isCoordsOverEndZ(coords)) {
            this._dragging = 'endTile';
            this._checkCoord = 'z';
        } else if (this.room.isCoordsOverRoom(coords)) {
            this._dragging = 'centerTile';
            this._currentX = coords.x;
            this._currentZ = coords.z;
            draggingFunction = 'midDragMove';
        } else {
            return;
        }

        Events.removeListenersByName('pointermove');
        Events.listen('pointermove', event => this[draggingFunction](event));
        Events.listen('pointerup-left', event => this.endDrag(event));
        this.room.animateListen();
    }

    midDragResize(event) {
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

    midDragMove(event) {
        let objects = ThreeHelper.getIntersectedFloors(event, 'floor');
        if (!objects.length) {
            return;
        }

        objects.forEach(object => {
            let coords = object.coords;
            if (coords.x !== this._currentX || coords.z !== this._currentZ) {
                let diffX = coords.x - this._currentX;
                let diffZ = coords.z - this._currentZ;
                this._currentX = coords.x;
                this._currentZ = coords.z;
                this.room.move(diffX, diffZ);
                this.room.needsDraw = true;
            }
        });
    }

    endDrag() {
        this._dragging = false;
        Events.removeListenersByName('pointermove');
        Events.removeListenersByName('pointerup-left');
        this.room.removeAnimateListen();

        Events.listen('pointermove', event => this.hover(event));
        Events.listen('pointerdown-left', event => this.click(event));
    }
}
