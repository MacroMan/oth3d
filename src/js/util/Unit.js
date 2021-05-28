/**
 * Helper to convert units
 */
export default class Unit {
    static tileToPixel(tiles) {
        return tiles * 100;
    }

    static pixelToTile(pixels) {
        return pixels / 100;
    }

    static rectangleCoords(fromX, fromZ, toX, toZ) {
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
