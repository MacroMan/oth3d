import * as THREE from 'three';
import Level01 from '../maps/Level01';
import Storage from '../util/Storage';
import Config from '../Config';

/**
 * Setup the scene
 */
export default class {
    constructor() {
        this.camera = Storage.get('camera').camera;
        this.scene = new THREE.Scene();
        Storage.set('scene', this);
        this.scene.background = new THREE.Color(Config.backgroundColor);

        const ambientLight = new THREE.AmbientLight(Config.ambientLight.color, Config.ambientLight.intensity);
        this.scene.add(ambientLight);
        Storage.set('ambientLight', ambientLight);

        const directionalLight = new THREE.DirectionalLight(Config.directionalLight.color, Config.directionalLight.intensity);
        directionalLight.position.set(
            Config.directionalLight.position.x,
            Config.directionalLight.position.y,
            Config.directionalLight.position.z
        );

        this.scene.add(directionalLight);
        // this.scene.add(directionalLight.target);
        Storage.set('directionalLight', directionalLight);

        const axesHelper = new THREE.AxesHelper(10000);
        this.scene.add(axesHelper);

        this.level = new Level01();
        Storage.set('currentLevel', this.level);
        this.level.draw();
    }

    add(object) {
        this.scene.add(object);
    }

    remove(object) {
        this.scene.remove(object);
    }
}
