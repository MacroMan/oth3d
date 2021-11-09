class Logging {
    constructor() {
        this.events = false;
    }

    log(type, ...data) {
        if (this[type]) {
            console.log(type.toUpperCase() + ':', data);
        }
    }
}

export default new Logging();