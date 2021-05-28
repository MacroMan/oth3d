import Room from './Room';

/**
 * GPs office
 */
export default class Gp extends Room {
    get floorColor() {
        return 0x444444;
    }

    get wallColor() {
        return 0x00ff00;
    }
}
