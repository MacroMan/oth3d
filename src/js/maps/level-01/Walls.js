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
                texture: 'brick-01',
            });
        }

        // West wall
        for (let z = 1; z <= 12; z++) {
            data.push({
                x: 31,
                z: z,
                texture: 'brick-01',
                north: true,
            });
        }

        // North wall
        for (let x = 30; x >= 1; x--) {
            data.push({
                x: x,
                z: 13,
                texture: 'brick-01',
            });
        }

        // East wall
        for (let z = 12; z >= 1; z--) {
            data.push({
                x: 1,
                z: z,
                texture: 'brick-01',
                north: true,
            });
        }

        return data;
    }
}
