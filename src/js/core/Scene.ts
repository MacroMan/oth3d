import Config from '../Config';
import { AmbientLight, AxesHelper, Color, DirectionalLight, Object3D, Scene as ThreeSecene } from "three";
import Camera from "./Camera";
import * as THREE from "three";

/**
 * Set up the scene
 */
export default class {
    readonly camera: Camera;
    readonly scene: ThreeSecene;
    readonly directionalLight: DirectionalLight;
    readonly ambientLight: AmbientLight;

    constructor (camera: Camera) {
        this.camera = camera;
        this.scene = new ThreeSecene();
        this.scene.background = new Color(Config.backgroundColor);

        this.ambientLight = new AmbientLight(Config.ambientLight.color, Config.ambientLight.intensity);
        this.scene.add(this.ambientLight);

        this.directionalLight = new DirectionalLight(Config.directionalLight.color, Config.directionalLight.intensity);
        this.directionalLight.position.set(
            Config.directionalLight.position.x,
            Config.directionalLight.position.y,
            Config.directionalLight.position.z
        );

        this.scene.add(this.directionalLight);
        // this.scene.add(directionalLight.target);

        const axesHelper = new AxesHelper(10000);
        this.scene.add(axesHelper);
    }

    add (object: Object3D) {
        this.scene.add(object);
    }

    remove (object: Object3D) {
        this.scene.remove(object);
    }

    getIntersectedFloors(event: PointerEvent, type: string|undefined) {
        const pointer = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // @ts-ignore
        raycaster.setFromCamera(pointer, this.camera.camera);

        // @ts-ignore
        let intersects = raycaster.intersectObjects(this.scene.children)
            .map(item => item.object);

        if (type) {
            intersects = intersects.filter(object => object.userData['mainType'] === type);
        }

        return intersects;
    }
}
