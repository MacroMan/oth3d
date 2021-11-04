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
                };
            }
        }
    }

    static setBuildable(x, z, buildable = true) {
        _matrix[x][z].buildable = buildable;
    }

    static isBuildable(x, z) {
        return _matrix[x][z].buildable;
    }
}
