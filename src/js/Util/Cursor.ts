/**
 * Helpers for changing the cursor
 */
export enum CursorType {
    Default = "default",
    Pointer = "pointer",
    Wait = "wait",
    Crosshair = "crosshair",
    Move = 'move',
    Grab = 'grab',
    Grabbing = "grabbing",
    ResizeX = 'ew-resize',
    ResizeZ = 'ns-resize',
}

export default class Cursor {
    static set(cursor: CursorType) {
        document.body.style.cursor = cursor as unknown as string;
    }
}
