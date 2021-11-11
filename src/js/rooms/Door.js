import Events from "../util/Events";
import ThreeHelper from "../util/ThreeHelper";
import Cursor from "../util/Cursor";

export default class Door {
    constructor(room) {
        this.room = room;

        Events.listen('pointermove', event => this.hover(event));
        Events.listen('pointerdown-left', event => this.click(event));
        this.room.animateListen();
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

        const coords = object.coords;
        const previousCoords = this.room.doorTile;

        if (
            ((coords.x === this.room.startTile.x || coords.x === this.room.endTile.x) &&
                (coords.z > this.room.startTile.z && coords.z < this.room.endTile.z)) ||
            ((coords.z === this.room.startTile.z || coords.z === this.room.endTile.z) &&
                (coords.x > this.room.startTile.x && coords.x < this.room.endTile.x))
        ) {
            this.room.doorTile = coords;
        } else {
            this.room.doorTile = null;
        }

        this.room.needsDraw = (this.room.doorTile !== previousCoords);
    }

    placeDoor(event) {
        if (!this.room.doorTile) {
            return;
        }

        Events.removeListenersByName('pointermove');
        Events.removeListenersByName('pointerdown-left');
        this.room.removeAnimateListen();
    }
}