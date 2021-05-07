import Walls from '../Walls';

/**
 * Wall data for level 01
 */
export default class extends Walls {
    data() {
        let data = [];

        // South wall
        for (let x = 1; x <= 30; x++) {
            data.push({
                x: x,
                z: 1,
                texture: 'wall',
            });
        }

        // West wall
        for (let z = 1; z <= 12; z++) {
            data.push({
                x: 31,
                z: z,
                texture: 'wall',
                north: true,
            });
        }

        // North wall
        for (let x = 30; x >= 1; x--) {
            data.push({
                x: x,
                z: 13,
                texture: 'wall',
            });
        }

        // East wall
        for (let z = 12; z >= 1; z--) {
            data.push({
                x: 1,
                z: z,
                texture: 'wall',
                north: true,
            });
        }

        return data;
    }
}
