import * as THREE from 'three';
import Unit from '../util/Unit';

/**
 * Base class for all floor tiles
 *
 * Cannot be instantiated
 */
export default class {
    constructor(scene, x, z, config) {
        this.scene = scene;
        this.x = x;
        this.z = z;

        const geometry = new THREE.PlaneGeometry(Unit.tileToPixel(config.width) || 100, Unit.tileToPixel(config.height) || 100);
        geometry.rotateX(-Math.PI / 2);
        geometry.translate(
            Unit.tileToPixel((config.width - 1) / 2) || Unit.tileToPixel(x),
            config.depth || 0,
            Unit.tileToPixel((config.height - 1) / 2) || Unit.tileToPixel(z)
        );

        let material;
        if (config.texture) {
            const texture = new THREE.TextureLoader().load('/images/floor/' + config.texture + '.png');
            texture.repeat.set(config.width || 1, config.height || 1);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            material = new THREE.MeshPhongMaterial({ map: texture, side: THREE.FrontSide, opacity: config.opacity ?? 1, transparent: true });
        } else {
            material = new THREE.MeshLambertMaterial({ color: config.color, side: THREE.FrontSide, opacity: config.opacity ?? 1, transparent: true });
        }

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.mainType = 'floor';
        this.mesh.tileType = config.type;
        this.mesh.room = config.room;
        this.mesh.coords = { x: x, z: z };

        this.scene.add(this.mesh);
    }

    remove() {
        this.scene.remove(this.mesh);
    }
}
