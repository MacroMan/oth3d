import Events from '../util/Events';

/**
 * Base class for all rooms.
 *
 * Cannot be instantiated
 */
export default class Room {
    constructor() {
        if (new.target === Room) throw TypeError("new of abstract class Floor");

        Events.fire('controls', false);
    }
}
