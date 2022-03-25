import * as THREE from 'three';

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

export default class ThreeHelper {
    static getIntersectedFloors(event: PointerEvent, type: string|undefined) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // @ts-ignore
        raycaster.setFromCamera(pointer, window["oth3d"].camera.camera);

        // @ts-ignore
        let intersects = raycaster.intersectObjects(window["oth3d"].scene.scene.children)
            .map(item => item.object);

        if (type) {
            intersects = intersects.filter(object => object.userData['mainType'] === type);
        }

        return intersects;
    }
}
