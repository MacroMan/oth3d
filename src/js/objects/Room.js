import Events from '../util/Events';
import Cursor from '../util/Cursor';

/**
 * Base class for all rooms.
 *
 * Cannot be instantiated
 */
export default class Room {
    constructor() {
        if (new.target === Room) throw TypeError("new of abstract class Floor");
    }

    /**
     * Start building the room
     */
    build() {
        // Turn camera control off
        Events.fire('controls', false);

        // Change the mouse cursor
        Cursor.crosshair();


    }
}
