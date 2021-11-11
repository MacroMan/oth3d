import * as THREE from 'three';
import Unit from '../util/Unit';
import Storage from '../util/Storage';
import Logging from "../debug/Logging";

/**
 * Base class for all wall tiles
 *
 * Cannot be instantiated
 */
export default class {
    constructor(x, z, config) {
        this.config = config;
        this.config.opacity ??= 1;

        const geometry = new THREE.BoxGeometry(Unit.tileToPixel(1), Unit.tileToPixel(2), 10);

        if (config.north) {
            geometry.rotateY(-Math.PI / 2);
        }

        const transCoords = this._getTranslationCoords(x, z, config.north);
        geometry.translate(...transCoords);

        let material;

        if (config.texture) {
            const blankTexture = new THREE.MeshPhongMaterial({ visible: false });
            const frontImage = (typeof config.textureFront !== 'undefined') ? config.textureFront : config.texture;
            const backImage = (typeof config.textureBack !== 'undefined') ? config.textureBack : config.texture;
            const topImage = (typeof config.textureTop !== 'undefined') ? config.textureTop : config.texture;
            const sideImage = (typeof config.textureSide !== 'undefined') ? config.textureSide : config.texture;

            let textureFront, textureBack, textureTop, textureSide;

            if (frontImage) {
                textureFront = this._loadTexture(frontImage);
                textureFront.repeat.set(4, 8);
            }

            if (backImage) {
                textureBack = this._loadTexture(backImage);
                textureBack.repeat.set(4, 8);
            }

            if (topImage) {
                textureTop = this._loadTexture(topImage);
                textureTop.repeat.set(4, 0.5);
            }

            if (sideImage) {
                textureSide = this._loadTexture(sideImage);
                textureSide.repeat.set(0.5, 8);
            }

            material = [
                (textureSide) ? new THREE.MeshPhongMaterial({ map: textureSide, side: THREE.FrontSide, opacity: config.opacity, transparent: true }) : blankTexture, // left
                (textureSide) ? new THREE.MeshPhongMaterial({ map: textureSide, side: THREE.FrontSide, opacity: config.opacity, transparent: true }) : blankTexture, // right
                (textureTop) ? new THREE.MeshPhongMaterial({ map: textureTop, side: THREE.FrontSide, opacity: config.opacity, transparent: true }) : blankTexture, // top
                blankTexture, // bottom
                (textureBack) ? new THREE.MeshPhongMaterial({ map: textureBack, side: THREE.FrontSide, opacity: config.opacity, transparent: true }) : blankTexture, // back
                (textureFront) ? new THREE.MeshPhongMaterial({ map: textureFront, side: THREE.FrontSide, opacity: config.opacity, transparent: true }) : blankTexture, // front
            ];
        } else {
            const blankColor = new THREE.MeshPhongMaterial({ visible: false });
            const colorFront = config.colorFront ?? config.color;
            const colorBack = config.colorBack ?? config.color;
            const colorTop = config.colorTop ?? config.color;
            const colorSide = config.colorSide ?? config.color;

            material = [
                (colorSide) ? new THREE.MeshPhongMaterial({ color: colorSide, side: THREE.DoubleSide, opacity: config.opacitySide ?? config.opacity, transparent: true }) : blankColor, // left
                (colorSide) ? new THREE.MeshPhongMaterial({ color: colorSide, side: THREE.DoubleSide, opacity: config.opacitySide ?? config.opacity, transparent: true }) : blankColor, // right
                (colorTop) ? new THREE.MeshPhongMaterial({ color: colorTop, side: THREE.DoubleSide, opacity: config.opacityTop ?? config.opacity, transparent: true }) : blankColor, // top
                blankColor, // bottom
                (colorBack) ? new THREE.MeshPhongMaterial({ color: colorBack, side: THREE.DoubleSide, opacity: config.opacityBack ?? config.opacity, transparent: true }) : blankColor, // back
                (colorFront) ? new THREE.MeshPhongMaterial({ color: colorFront, side: THREE.DoubleSide, opacity: config.opacityFront ?? config.opacity, transparent: true }) : blankColor, // front
            ];

            // material = new THREE.MeshLambertMaterial({ color: config.color, side: THREE.DoubleSide, opacity: config.opacity ?? 1, transparent: true });
        }

        Logging.log('roomConstruction', "Placing wall", geometry, material);

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.tileType = config.type;
        this.mesh.isWallTile = true;
        Storage.get('scene').add(this.mesh);
    }

    _loadTexture(image) {
        const texture = new THREE.TextureLoader().load('/images/walls/' + image + '.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    _getTranslationCoords(x, z) {
        let transX = Unit.tileToPixel(x);
        const transY = Unit.tileToPixel(1);
        let transZ = Unit.tileToPixel(z);

        if (this.config.north) {
            transX -= 50;
            transX += Unit.tileToPixel(this.config.offset ?? 0);
        } else {
            transZ -= 50;
            transZ += Unit.tileToPixel(this.config.offset ?? 0);
        }

        return [
            transX,
            transY,
            transZ,
        ];
    }

    hide() {
        this.mesh.visible = false;
    }

    show() {
        this.mesh.visible = true;
    }

    remove() {
        Storage.get('scene').remove(this.mesh);
    }
}
