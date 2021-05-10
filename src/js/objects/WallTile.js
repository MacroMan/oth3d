import * as THREE from 'three';
import Unit from '../util/Unit';

/**
 * Base class for all wall tiles
 *
 * Cannot be instantiated
 */
export default class {
    constructor(scene, x, z, north, textureName) {
        const textureFront = new THREE.TextureLoader().load('/images/' + textureName + '.png');
        // textureFront.magFilter = THREE.NearestFilter;

        const textureBack = new THREE.TextureLoader().load('/images/' + textureName + '-back.png');
        // textureBack.magFilter = THREE.NearestFilter;

        const materials = [
            new THREE.MeshBasicMaterial({ map: textureFront, side: THREE.FrontSide }),
            new THREE.MeshBasicMaterial({ map: textureBack, side: THREE.BackSide }),
        ];

        const geometry = new THREE.PlaneGeometry(Unit.tileToPixel(1), Unit.tileToPixel(2));

        console.log(geometry);

        if (north) {
            geometry.rotateY(-Math.PI / 2);
            geometry.translate(Unit.tileToPixel(x) - 50, Unit.tileToPixel(1), Unit.tileToPixel(z));
        } else {
            geometry.translate(Unit.tileToPixel(x), Unit.tileToPixel(1), Unit.tileToPixel(z) - 50);
        }

        for (let i = 0, len = geometry.faces.length; i < len; i++) {
            let face = geometry.faces[i].clone();
            face.materialIndex = 1;
            geometry.faces.push(face);
            geometry.faceVertexUvs[0].push(geometry.faceVertexUvs[0][i].slice(0));
        }


        const mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.tileType = 'wall';
        scene.add(mesh);
    }

    hide() {

    }

    show() {

    }
}
