import Level from './Level';
import Config from "../Config";

/**
 * Level 01
 */
export default class extends Level {
    width() {
        return 51;
    }

    height() {
        return 36;
    }

    /**
     * Get the floor data
     *
     * @returns []
     */
    floorData() {
        return [
            {
                // Right wing
                type: 'corridor',
                color: Config.colors.hallway,
                texture: Config.textures.hallway,
                from: { x: 3, z: 12 },
                to: { x: 13, z: 24 },
            }, {
                // Small hallway
                type: 'corridor',
                color: Config.colors.hallway,
                texture: Config.textures.hallway,
                from: { x: 14, z: 12 },
                to: { x: 17, z: 14 },
            }, {
                // Right
                type: 'corridor',
                color: Config.colors.hallway,
                texture: Config.textures.hallway,
                from: { x: 18, z: 12 },
                to: { x: 25, z: 24 },
            },{
                // Center
                type: 'corridor',
                color: Config.colors.hallway,
                texture: Config.textures.hallway,
                from: { x: 26, z: 4 },
                to: { x: 39, z: 32 },
            }, {
                // Left
                type: 'corridor',
                color: Config.colors.hallway,
                texture: Config.textures.hallway,
                from: { x: 40, z: 12 },
                to: { x: 47, z: 24 },
            }, {
                // Path
                type: 'path',
                color: Config.colors.path,
                texture: Config.textures.path,
                from: { x: 31, z: 0 },
                to: { x: 33, z: 3 },
            },
        ];
    }

    wallData() {
        return [
            {
                // i
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureBack: Config.textures.externalWallInside,
                x: 3,
                z: 12,
                length1: 23,
            }, {
                // ii
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureFront: Config.textures.externalWallInside,
                x: 26,
                z: 4,
                length1: 8,
                north: true,
            }, {
                // iii (a)
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureBack: Config.textures.externalWallInside,
                x: 26,
                z: 4,
                length1: 5,
            }, {
                // iii (b)
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureBack: Config.textures.externalWallInside,
                x: 34,
                z: 4,
                length1: 6,
            }, {
                // iv
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureBack: Config.textures.externalWallInside,
                x: 40,
                z: 4,
                length1: 8,
                north: true,
            }, {
                // v
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureBack: Config.textures.externalWallInside,
                x: 40,
                z: 12,
                length1: 8,
            }, {
                // vi
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureBack: Config.textures.externalWallInside,
                x: 48,
                z: 12,
                length1: 13,
                north: true,
            }, {
                // vii
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureFront: Config.textures.externalWallInside,
                x: 40,
                z: 25,
                length1: 8,
            }, {
                // viii
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureBack: Config.textures.externalWallInside,
                x: 40,
                z: 25,
                length1: 8,
                north: true,
            }, {
                // ix
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureFront: Config.textures.externalWallInside,
                x: 26,
                z: 33,
                length1: 14,
            }, {
                // x
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureFront: Config.textures.externalWallInside,
                x: 26,
                z: 25,
                length1: 8,
                north: true,
            }, {
                // xi
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureFront: Config.textures.externalWallInside,
                x: 18,
                z: 25,
                length1: 8,
            }, {
                // xii
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureFront: Config.textures.externalWallInside,
                x: 18,
                z: 15,
                length1: 10,
                north: true,
            }, {
                // xiii
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureFront: Config.textures.externalWallInside,
                x: 14,
                z: 15,
                length1: 4,
            }, {
                // xiv
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureBack: Config.textures.externalWallInside,
                x: 14,
                z: 15,
                length1: 10,
                north: true,
            }, {
                // xv
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureFront: Config.textures.externalWallInside,
                x: 3,
                z: 25,
                length1: 11,
            }, {
                // xvi
                type: 'external',
                color: Config.colors.externalWallOutside,
                colorBack: Config.colors.externalWallInside,
                texture: Config.textures.externalWallOutside,
                textureFront: Config.textures.externalWallInside,
                x: 3,
                z: 12,
                length1: 13,
                north: true,
            },
        ];
    }
}
