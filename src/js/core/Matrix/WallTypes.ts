export interface Config {
    readonly x: number;
    readonly z: number;
    readonly side: Side;
    readonly texture: WallTexture;
}

export enum WallTexture {
    Brick01 = "brick-01",
    Brick01White = "brick-01-white",
    TileWhite = "tile-white",
    TileBlue = "tile-blue",
    TileGreen = "tile-green",
    TileYellow = "tile-yellow",
}

export enum Side {
    North = "north",
    East = "east",
    South = "south",
    West = "west",
}
