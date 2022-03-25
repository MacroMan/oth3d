export interface Config {
    readonly insideTexture: Texture;
    readonly outsideTexture: Texture;
    readonly window?: boolean;
}

export enum Texture {
    brick = "brick",
    tileWhite = "tile-white",
    tileBlue = "tile-blue",
    tileGreen = "tile-green",
    tileYellow = "tile-yellow",
}