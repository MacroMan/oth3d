export interface Config {
    readonly x: number;
    readonly z: number;
    readonly texture: Texture;
    buildable?: boolean;
}

export enum Texture {
    grass = "grass",
    corridor = "corridor",
    path = "path",
    hedge = "hedge",
}

export function getTextures(): Array<string> {
    return Object.entries(Texture).map(([value]) => (value));
}
