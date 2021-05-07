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
}
