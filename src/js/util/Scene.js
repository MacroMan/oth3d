import * as THREE from 'three';
import Level from '../maps/level-01/Level';

/**
 * Setup the scene
 */
export default class {
    constructor(camera) {
        this.camera = camera.camera;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xbfd1e5);

        this.scene.add(new THREE.AmbientLight(0xcccccc));

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 0.5).normalize();
        this.scene.add(directionalLight);

        const axesHelper = new THREE.AxesHelper(10000);
        this.scene.add(axesHelper);

        (new Level(this)).draw();
    }

    add(object) {
        this.scene.add(object);
    }
}
