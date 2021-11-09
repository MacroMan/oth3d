import WallTile from '../objects/WallTile';
import ArrayHelper from '../util/ArrayHelper';
import Matrix from '../util/Matrix';
import Config from "../Config";

export default class {
    constructor(room, config) {
        this.room = room;
        this.config = config;

        this.tiles = [];
    }

    drawRectangle(coords, config = {}) {
        this.removeUnusedTiles(coords);

        for (let x = coords.from.x; x <= coords.to.x; x++) {
            // from x to x along min z - South side
            this.drawTile(x, coords.from.z, config);
        }
        for (let x = coords.from.x; x <= coords.to.x; x++) {
            // from x to x along max z - North side
            this.drawTile(x, coords.to.z, ArrayHelper.mergeObjects(config, { offset: 1 }));
        }
        for (let z = coords.from.z; z <= coords.to.z; z++) {
            // from z to z along min x - East side
            this.drawTile(coords.from.x, z, ArrayHelper.mergeObjects(config, { north: true }));
        }
        for (let z = coords.from.z; z <= coords.to.z; z++) {
            // from z to z along max x - West side
            this.drawTile(coords.to.x, z, ArrayHelper.mergeObjects(config, { north: true, offset: 1 }));
        }
    }

    /**
     * @todo Add door position into config
     *
     * @param x
     * @param z
     * @param config
     * @param additionalConfig
     *
     * @return array The new config
     */
    drawRectangleConfig(x, z, config, additionalConfig = {}) {
        if (config.door && config.door.x === x && config.door.z === z) {
            additionalConfig.isDoor = true;
        }

        return ArrayHelper.mergeObjects(config, additionalConfig);
    }

    removeUnusedTiles(coords) {
        this.tiles.slice().reverse().forEach((tile, index, object) => {
            if (this.config.north) {
                if (
                    tile.x !== coords.from.x ||
                    tile.x !== coords.to.x ||
                    tile.z < coords.from.z ||
                    tile.z > coords.to.z
                ) {
                    tile.remove();
                    this.tiles.splice(object.length - 1 - index, 1);
                }
            } else {
                if (
                    tile.x < coords.from.x ||
                    tile.x > coords.to.x ||
                    tile.z !== coords.from.z ||
                    tile.z !== coords.to.z
                ) {
                    tile.remove();
                    this.tiles.splice(object.length - 1 - index, 1);
                }
            }
        });
    }

    removeAllTiles() {
        this.tiles.forEach(tile => tile.remove());
        this.tiles = [];
    }

    drawTile(x, z, config = {}) {
        if (!this.tileIsDrawn(x, z)) {
            config = ArrayHelper.mergeObjects(this.config, config)
            if (config.door && config.door.x === x && config.door.z === z) {
                config.isDoor = true;
            }

            if (!this.room.isBigEnough || !Matrix.isBuildable(x, z)) {
                config.color = Config.colors.unbuildableRoomWall;
                config.texture = Config.textures.unbuildableRoomWall;
            }

            this.tiles.push(new WallTile(x, z, config));
        }
    }

    tileIsDrawn(x, z) {
        for (let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i];
            if (x === tile.x && z === tile.z) {
                return true;
            }
        }

        return false;
    }
}
