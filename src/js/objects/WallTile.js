import * as THREE from 'three';
import Unit from '../util/Unit';
import Storage from '../util/Storage';

/**
 * Base class for all wall tiles
 *
 * Cannot be instantiated
 */
export default class {
    constructor(x, z, config) {
        this.config = config;
        const geometry = new THREE.PlaneGeometry(Unit.tileToPixel(1), Unit.tileToPixel(2));

        if (config.north) {
            geometry.rotateY(-Math.PI / 2);
            geometry.translate(Unit.tileToPixel(x) - 50, Unit.tileToPixel(1), Unit.tileToPixel(z));
        } else {
            geometry.translate(Unit.tileToPixel(x), Unit.tileToPixel(1), Unit.tileToPixel(z) - 50);
        }

        let material;
        if (config.texture) {
            const texture = new THREE.TextureLoader().load('/images/walls/' + config.texture + '.png');
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(4, 8);
            material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide, opacity: config.opacity ?? 1, transparent: true });
        } else {
            material = new THREE.MeshLambertMaterial({ color: config.color, side: THREE.DoubleSide, opacity: config.opacity ?? 1, transparent: true });
        }

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.tileType = config.type;
        this.mesh.isWallTile = true;
        Storage.get('scene').add(this.mesh);
    }

    hide() {
        this.mesh.visible = false;
    }

    show() {
        this.mesh.visible = true;
    }

    remove() {
        Storage.get('scene').remove(this.mesh);
    }
}
