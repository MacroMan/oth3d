/**
 * Helpers for changing the cursor
 *
 * @todo This can probably be tidier using a magic method rather than defining lots of static methods
 */
export default class Cursor {
    static set(cursor) {
        document.body.style.cursor = cursor;
    }

    static default() {
        Cursor.set('default');
    }

    static pointer() {
        Cursor.set('pointer');
    }

    static wait() {
        Cursor.set('wait');
    }

    static crosshair() {
        Cursor.set('crosshair');
    }

    static move() {
        Cursor.set('move');
    }

    static grab() {
        Cursor.set('grab');
    }

    static grabbing() {
        Cursor.set('grabbing');
    }

    static ewResize() {
        Cursor.set('ew-resize');
    }

    static nsResize() {
        Cursor.set('ns-resize');
    }
}
