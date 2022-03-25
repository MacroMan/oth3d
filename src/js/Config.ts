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
    controls: {
        damping: true,
        dampingFactor: 0.14,
    },
}
