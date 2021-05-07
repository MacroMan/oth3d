import * as THREE from 'three';
import Unit from '../util/Unit';

/**
 * Base class for all wall tiles
 *
 * Cannot be instantiated
 */
export default class {
    constructor(scene, x, z, north, texture) {
        const geometry = new THREE.PlaneGeometry(Unit.tileToPixel(1), Unit.tileToPixel(2));

        if (north) {
            geometry.rotateY(-Math.PI / 2);
            geometry.translate(Unit.tileToPixel(x) - 50, Unit.tileToPixel(1), Unit.tileToPixel(z));
        } else {
            geometry.translate(Unit.tileToPixel(x), Unit.tileToPixel(1), Unit.tileToPixel(z) - 50);
        }

        const material = new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide, opacity: 1, transparent: true });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.tileType = 'wall';
        scene.add(mesh);
    }
}
