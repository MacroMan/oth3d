import Level from '../Level';
import Floor from './Floor';
import Walls from './Walls';

/**
 * Level 01
 */
export default class extends Level {
    width() {
        return 32;
    }

    height() {
        return 32;
    }

    floor() {
        return new Floor(this.scene);
    }

    walls() {
        return new Walls(this.scene);
    }
}
