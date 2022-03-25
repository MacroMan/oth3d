export type LevelData = {
    width: number,
    height: number,
    matrix: MatrixEntry[],
};

export type MatrixEntry = {
    x: number,  // x coord
    z: number,  // z coord
    t: string,  // Texture
    b: boolean, // Buildable?
    w?: Wall[],      // Wall data
};

export type Wall = {
    i: string, // Internal texture
    o: string, // External texture
};