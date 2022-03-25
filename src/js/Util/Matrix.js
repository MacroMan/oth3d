let _matrix = [];

export default class Matrix {
    static init(width, height) {
        for (let z = 0; z <= height; z++) {
            for (let x = 0; x <= width; x++) {
                if (!_matrix[x]) {
                    _matrix[x] = [];
                }

                _matrix[x][z] = {
                    buildable: false,
                    doorable: false,
                };
            }
        }
    }

    static set(x, z, property, value) {
        _matrix[x][z][property] = value;
    }

    static get(x, z, property) {
        return _matrix[x][z][property];
    }

    static setBuildable(x, z, buildable = true) {
        Matrix.set(x, z, 'buildable', buildable);
    }

    static isBuildable(x, z) {
        return Matrix.get(x, z, 'buildable');
    }

    static setDoorable(x, z, doorable = true) {
        Matrix.set(x, z, 'doorable', doorable);
    }

    static isDoorable(x, z) {
        return Matrix.get(x, z, 'doorable');
    }
}
