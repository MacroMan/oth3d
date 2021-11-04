import FloorTile from '../objects/FloorTile';
import ArrayHelper from '../util/ArrayHelper';
import Matrix from '../util/Matrix';
import Config from "../Config";

export default class {
    constructor(room, config) {
        this.room = room;
        this.config = config;
        this._tiles = [];
    }

    get isCompletable() {
        for (let i = 0; i < this._tiles.length; i++) {
            if (!Matrix.isBuildable(this._tiles[i].x, this._tiles[i].z)) {
                return false;
            }
        }

        return true;
    }

    drawRectangle(coords, config = {}) {
        this.removeUnusedTiles(coords);

        for (let z = coords.from.z; z <= coords.to.z; z++) {
            for (let x = coords.from.x; x <= coords.to.x; x++) {
                this.drawTile(x, z, true, config);
            }
        }
    }

    drawTile(x, z, overwrite = false, config = {}) {
        if (!this.tileIsDrawn(x, z, overwrite)) {
            config = ArrayHelper.mergeObjects(this.config, config)

            if (!this.room.isBigEnough || !Matrix.isBuildable(x, z)) {
                config.color = Config.colors.unbuildableRoomFloor;
                config.texture = Config.textures.unbuildableRoomFloor;
            }

            this._tiles.push((new FloorTile(x, z, config)));
        }
    }

    tileIsDrawn(x, z, deleteOnFind = false) {
        ArrayHelper.spliceableForEach(this._tiles, (tile, index) => {
            if (x === tile.x && z === tile.z) {
                if (deleteOnFind) {
                    this.removeTile(index);
                }

                return true;
            }
        });

        return false;
    }

    removeTile(index) {
        this._tiles[index].remove();
        this._tiles.splice(index, 1);
    }

    removeAllTiles() {
        this._tiles.forEach(tile => tile.remove());
        this._tiles = [];
    }

    removeUnusedTiles(coords) {
        ArrayHelper.spliceableForEach(this._tiles, (tile, index) => {
            if (
                tile.x < coords.from.x ||
                tile.z < coords.from.z ||
                tile.x > coords.to.x ||
                tile.z > coords.to.z
            ) {
                this.removeTile(index);
            }
        });
    }
}
