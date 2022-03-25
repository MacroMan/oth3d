export default class ArrayHelper {
    /**
     * Move an item in an array from `from` to `to`
     *
     * @param array
     * @param from
     * @param to
     */
    static move(array: Array<any>, from: number, to: number): Array<any> {
        return array.splice(to, 0, array.splice(from, 1)[0]);
    }

    /**
     * @param object1
     * @param mergeObjects
     */
    static mergeObjects(object1: any, ...mergeObjects: any[]) {
        let newObject = Object.assign({}, object1);

        return Object.assign(newObject, ...mergeObjects);
    }
}
