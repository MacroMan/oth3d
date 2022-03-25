export default class ColorGUIHelper {
    private object: any;
    private prop: string;

    constructor(object: any, prop: string = 'color') {
        this.object = object;
        this.prop = prop;
    }

    get value() {
        return `#${this.object[this.prop].getHexString()}`;
    }

    set value(hexString) {
        this.object[this.prop].set(hexString);
    }
}
