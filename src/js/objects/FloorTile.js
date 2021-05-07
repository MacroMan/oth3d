import * as THREE from 'three';

/**
 * Base class for all floor tiles
 *
 * Cannot be instantiated
 */
export default class {
    constructor(scene, x, z, textureName) {
        const geometry = new THREE.PlaneGeometry(100, 100);
        geometry.rotateX(-Math.PI / 2);
        geometry.translate(x * 100, 0, z * 100);

        const texture = new THREE.TextureLoader().load('/images/' + textureName + '.png');
        texture.magFilter = THREE.NearestFilter;

        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, opacity: 1, transparent: true });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.tileType = 'floor';
        scene.add(mesh);
    }
}
