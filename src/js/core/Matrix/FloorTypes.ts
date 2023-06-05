export interface Config {
    readonly x: number;
    readonly z: number;
    readonly texture: FloorTexture;
}

export enum FloorTexture {
    grass = "grass",
    corridor = "corridor",
    path = "path",
    hedge = "hedge",
}

export function getTextures(): Array<string> {
    return Object.entries(FloorTexture).map(([value]) => (value));
}
