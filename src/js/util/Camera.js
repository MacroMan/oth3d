import * as THREE from 'three';
import Unit from './Unit';

/**
 * Setup the camera
 */
export default class {
    constructor() {
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
        this.camera.position.y = Unit.tileToPixel(10);

        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
}
