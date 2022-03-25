let storage = {};

export default class Storage {
    static get(name, defaultValue) {
        return storage[name] ?? defaultValue;
    }

    static set(name, value) {
        storage[name] = value;
    }
}
