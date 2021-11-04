import Room from './Room';

/**
 * GPs office
 */
export default class Gp extends Room {
    get minSize() {
        return 4;
    }
}
