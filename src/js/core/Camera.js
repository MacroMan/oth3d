import * as THREE from 'three';
import Unit from '../util/Unit';
import Storage from '../util/Storage';

/**
 * Setup the camera
 */
export default class {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 20000);
        this.camera.position.y = Unit.tileToPixel(20);
        this.camera.lookAt(Unit.tileToPixel(20), 0, 0);
        // this.camera.rotateZ(0.785398); // 45 degrees

        window.addEventListener('resize', () => {
            this.resize();
        });

        Storage.set('camera', this);
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}
