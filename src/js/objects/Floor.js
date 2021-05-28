import FloorTile from '../objects/FloorTile';
import ArrayHelper from '../util/ArrayHelper';

export default class {
    constructor(config) {
        this.config = config;

        this._tiles = [];
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
