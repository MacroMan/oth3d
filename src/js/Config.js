export default {
    backgroundColor: 0xbfd1e5,
    ambientLight: {
        color: 0xFFFFFF,
        intensity: 1,
    },
    directionalLight: {
        color: 0xFFFFFF,
        intensity: 0.16,
        position: {
            x: 1400,
            y: 5000,
            z: -2000,
        },
        target: {
            x: 0,
            y: 0,
            z: 0,
        },
    },
    camera: {
        polarAngle: 0.785398, // 45 degrees
    },
    textures: {
        grass: 'grass',
        hallway: 'hallway',
        path: null,
        externalWallOutside: 'brick-01',
        externalWallInside: 'brick-01-white',
        buildableRoomFloor: 'room-buildable',
        unbuildableRoomFloor: 'room-unbuildable',
        buildableRoomWall: null,
        unbuildableRoomWall: null,
    },
    colors: {
        grass: 0x00A945,
        hallway: 0xBBBBBB,
        path: 0xAAAAAA,
        externalWallOutside: 0xCF552A,
        externalWallInside: 0xC7C7C7,
        buildableRoomFloor: 0x00A945,
        unbuildableRoomFloor: 0xA91100,
        buildableRoomWall: 0x00A945,
        unbuildableRoomWall: 0xA91100,
    },
    rooms: {
        gp: {
            floorColor: 0xE38787,
            floorTexture: null,
            wallColor: 0xD9D9D9,
            wallTexture: null,
        }
    },
}
