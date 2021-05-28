export default class ArrayHelper {
    static spliceableForEach(array, callback) {
        if (typeof callback !== 'function') {
            throw TypeError("callback is not a function. typeof " + typeof callback + " provided");
        }

        array.slice().reverse().forEach((args, index, object) => callback(args, object.length - 1 - index, object));
    }

    static mergeObjects(object1, ...mergeObjects) {
        let newObject = Object.assign({}, object1);

        return Object.assign(newObject, ...mergeObjects);
    }
}
