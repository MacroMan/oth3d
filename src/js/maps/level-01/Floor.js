import Floor from '../Floor';

/**
 * Floor data for level 01
 */
export default class extends Floor {
    constructor(scene) {
        super(scene);
    }

    data() {
        let data = [
            [this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass]
        ];

        for (let i = 0; i < 12; i++) {
            data.push([this.grass, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.inter, this.grass]);
        }

        for (let i = 0; i < 19; i++) {
            data.push([this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass, this.grass]);
        }

        return data;
    }
}
