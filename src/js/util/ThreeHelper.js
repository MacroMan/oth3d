import Storage from './Storage';
import * as THREE from 'three';

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

export default class ThreeHelper {
    static getIntersectedFloors(event, type = null) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(pointer, Storage.get('camera').camera);

        let intersects = raycaster.intersectObjects(Storage.get('scene').scene.children)
            .map(item => item.object);

        if (type) {
            intersects = intersects.filter(object => object.mainType === type);
        }

        return intersects;
    }
}
