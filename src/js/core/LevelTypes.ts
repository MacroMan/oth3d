export type LevelData = {
    width: number,
    height: number,
    matrix: MatrixEntry[],
};

export type MatrixEntry = {
    x: number,
    z: number,
    floorTexture: string,
    buildable: boolean,
    walls?: Wall[],
};

export type Wall = {
    texture: string,
    side: string,
};
