/**
 * Helper to convert units
 */
export default class Unit {
    static tileToPixel(tiles: number) {
        return tiles * 100;
    }

    static pixelToTile(pixels: number) {
        return pixels / 100;
    }

    static rectangleCoords(fromX: number, fromZ: number, toX: number, toZ: number) {
        return {
            from: {
                x: Math.min(fromX, toX),
                z: Math.min(fromZ, toZ),
            },
            to: {
                x: Math.max(fromX, toX),
                z: Math.max(fromZ, toZ),
            },
        };
    }
}
