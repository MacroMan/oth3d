import WallTile from '../objects/WallTile';

export default class {
    constructor(config) {
        this.config = config;

        this.tiles = [];
    }

    drawRectangle(coords) {
        this.removeUnusedTiles(coords);

        for (let x = coords.from.x; x <= coords.to.x; x++) {
            // from x to x along min z - South side
            this.drawTile(x, coords.from.z);
        }
        for (let x = coords.from.x; x <= coords.to.x; x++) {
            // from x to x along max z - North side
            this.drawTile(x, coords.to.z + 1);
        }
        for (let z = coords.from.z; z <= coords.to.z; z++) {
            // from z to z along min x - East side
            this.drawTile(coords.from.x, z, true);
        }
        for (let z = coords.from.z; z <= coords.to.z; z++) {
            // from z to z along max x - West side
            this.drawTile(coords.to.x + 1, z, true);
        }
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

    drawTile(x, z, north) {
        if (!this.tileIsDrawn(x, z)) {
            this.config.north = north;
            this.tiles.push(new WallTile(x, z, this.config));
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
