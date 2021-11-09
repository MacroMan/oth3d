import Logging from '../debug/Logging';

let listeners = [];

/**
 * Generic events fire/listen
 */
export default class Events {

    /**
     * Register a callback
     *
     * @param name The event name
     * @param callback Callable to be invoked
     * @returns {number} Listener ID
     */
    static listen(name, callback) {
        if (typeof callback !== 'function') {
            throw TypeError("callback is not a function");
        }

        const listener = listeners.push({
            id: listeners.length,
            name: name,
            callback: callback,
        }) - 1;

        Logging.log('events', 'New event listener registered', listener)

        return listener;
    }

    /**
     * Stop listening for a specific listener ID
     *
     * @param id
     */
    static removeListenersByID(id) {
        Logging.log('events', 'Removing listener(s) by id', id);

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
    static removeListenersByName(name) {
        Logging.log('events', 'Removing listener(s) by name', name);

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
    static fire(name, ...args) {
        let fired = 0;

        listeners.forEach(listener => {
            if (listener.name === name) {
                listener.callback(...args);
                fired++;
            }
        });

        if (name !== 'animate') {
            Logging.log('events', 'Fired event', name, 'with', fired, 'callbacks executed');
        }
    }
}

/**
 * Register document events
 */
['pointerdown', 'pointerup'].forEach(type => {
    document.addEventListener(type, event => {
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