let listeners = [];

/**
 * Generic events fire/listen
 */
export default class {
    static listen(name, func) {
        if (typeof func !== 'function') {
            throw TypeError("in Events, func is not a function");
        }

        listeners.push({
            name: name,
            func: func,
        });

        console.log("New event listener", name, func);
    }

    static fire(name, ...args) {
        listeners.forEach(listener => {
            if (listener.name === name) {
                console.log("Firing event", name, ...args);
                listener.func(...args);
            }
        });
    }
}
