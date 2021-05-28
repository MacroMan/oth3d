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
    static removeListenersByID(id) {
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
['mousedown', 'mouseup', 'mousemove'].forEach(type => {
    document.addEventListener(type, event => Events.fire(type, event));
});
