/**
 * Generic events fire/listen
 */

const listeners: any[] = [];

export default class Events {
    /**
     * Register a callback
     *
     * @param name The event name
     * @param callback Callable to be invoked
     * @returns {number} Listener ID
     */
    static listen(name: string, callback: Function) {
        return listeners.push({
            id: listeners.length,
            name: name,
            callback: callback,
        }) - 1;
    }

    /**
     * Stop listening for a specific listener ID
     *
     * @param id
     */
    static removeListenersByID(id: number) {
        listeners.slice().reverse().forEach((listener, index, object) => {
            if (listener.id === id) {
                listeners.splice(object.length - 1 - index, 1);
            }
        });
    }

    /**
     * Remove all listeners by name
     *
     * @param name
     */
    static removeListenersByName(name: string) {
        listeners.slice().reverse().forEach((listener, index, object) => {
            if (listener.name === name) {
                listeners.splice(object.length - 1 - index, 1);
            }
        });
    }

    /**
     * Fire an event and invoke the registered callbacks
     *
     * @param name
     * @param args
     */
    static fire(name: string, ...args: any[]) {
        listeners.forEach(listener => {
            if (listener.name === name) {
                listener.callback(...args);
            }
        });
    }
}

/**
 * Register document events
 */
['pointerdown', 'pointerup'].forEach(type => {
    document.addEventListener(type, (event: any) => {
        if (event.button === 0) {
            Events.fire(type + '-left', event);
        } else if (event.button === 1) {
            Events.fire(type + '-middle', event);
        } else if (event.button === 3) {
            Events.fire(type + '-right', event);
        }
    });
});

document.addEventListener('pointermove', event => Events.fire('pointermove', event));
document.addEventListener('mousemove', event => Events.fire('mousemove', event));