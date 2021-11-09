import Room from './Room';

/**
 * GPs office
 */
export default class Gp extends Room {
    get slug() {
        return 'gp';
    }

    get name() {
        return 'GPs office';
    }

    get minSize() {
        return 4;
    }
}
