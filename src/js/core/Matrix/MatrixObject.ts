import FloorTile from "./FloorTile";
import WallTile from "./WallTile";
import { FloorTexture } from "./FloorTypes";
import { WallTexture } from "./WallTypes";
import Scene from "../Scene";
import { Side } from "./WallTypes";

interface WallTiles {
    north: WallTile[];
    east: WallTile[];
    south: WallTile[];
    west: WallTile[];
}

export default class MatrixObject {
    private readonly scene: Scene;
    public readonly x: number;
    public readonly z: number;
    public readonly floorTiles: FloorTile[] = [];
    public readonly wallTiles: WallTiles = {
        north: [],
        east: [],
        south: [],
        west: [],
    };

    constructor(scene: Scene, x: number, z: number) {
        this.scene = scene;
        this.x = x;
        this.z = z;

        // Add default floor tile of grass
        this.addFloorTile(FloorTexture.grass);
    }

    /**
     * Add a new floor tile. Only the most recently added tile will be visible.
     */
    addFloorTile(texture: FloorTexture): FloorTile {
        const floorTile = new FloorTile(this.scene, { x: this.x, z: this.z, texture: texture });
        this.floorTiles.push(floorTile);

        this.drawFloor();
        return floorTile;
    }

    /**
     * Remove the last added floor tile
     */
    popFloorTile(): void {
        if (this.floorTiles.length > 1) {
            this.floorTiles.pop();

            this.drawFloor();
        }
    }

    addWallTile(side: Side, texture: WallTexture): WallTile {
        const wallTile = new WallTile(this.scene, { x: this.x, z: this.z, texture, side });
        this.wallTiles[side].push(wallTile);

        this.drawWalls();
        return wallTile;
    }

    popWallTile(side: Side): void {
        if (this.wallTiles[side].length > 1) {
            this.wallTiles[side].pop();

            this.drawWalls();
        }
    }

    /**
     * Draw all tiles at this matrix coordinate
     */
    draw() {
        this.drawFloor();
        this.drawWalls();
    }

    /**
     * Draw the topmost floor tile
     */
    drawFloor(): void {
        this.floorTiles.forEach((tile: FloorTile) => {
            tile.remove();
        });

        const lastTile = this.floorTiles.at(-1) as FloorTile;
        if (lastTile) {
            lastTile.draw();
        }
    }

    /**
     * Draw the wall tiles, the topmost on each side
     */
    drawWalls() {
        [Side.North, Side.East, Side.South, Side.West].forEach((side: Side) => {
            this.wallTiles[side].forEach((tile: WallTile) => {
                tile.remove();
            });

            const lastTile = this.wallTiles[side].at(-1) as WallTile;

            console.log(lastTile);
            if (lastTile) {
                lastTile.draw();
            }
        });
    }
}
