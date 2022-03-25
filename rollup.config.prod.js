import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

import merge from 'deepmerge';
import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createBasicConfig();

export default merge(baseConfig, {
    input: './tsc-out/src/js/app.js',
    output: {
        dir: null,
        file: 'public/app.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        sourcemaps()
    ]
});
