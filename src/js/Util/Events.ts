interface Event {
    id: number;
    name: string;
    callback: Function;
}

export enum EventName {
    PointerDownLeft = "pointer-down-left",
    PointerDownMiddle = "pointer-down-middle",
    PointerDownRight = "pointer-down-right",
    PointerUpLeft = "pointer-up-left",
    PointerUpMiddle = "pointer-up-middle",
    PointerUpRight = "pointer-up-right",
    MouseMove = "mousemove",
    PointerMove = "pointermove",
    Animate = "animate",
    Controls = "controls",
    ControlsDamping = "controls-damping",
    ControlsZoom = "controls-zoom",
    ControlsRotate = "controls-rotate",
    ControlsPan = "controls-pan",
}

const listeners: Event[] = [];

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
    static listen(name: EventName, callback: Function) {
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
    static removeListenersByName(name: EventName) {
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
    static fire(name: EventName, ...args: any[]) {
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
document.addEventListener('pointerdown', (event: any) => {
    if (event.button === 0) {
        Events.fire(EventName.PointerDownLeft, event);
    } else if (event.button === 1) {
        Events.fire(EventName.PointerDownMiddle, event);
    } else if (event.button === 3) {
        Events.fire(EventName.PointerDownRight, event);
    }
});

document.addEventListener('pointerup', (event: any) => {
    if (event.button === 0) {
        Events.fire(EventName.PointerUpLeft, event);
    } else if (event.button === 1) {
        Events.fire(EventName.PointerUpMiddle, event);
    } else if (event.button === 3) {
        Events.fire(EventName.PointerUpRight, event);
    }
});

document.addEventListener('pointermove', event => Events.fire(EventName.PointerMove, event));
document.addEventListener('mousemove', event => Events.fire(EventName.MouseMove, event));