import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import json from "@rollup/plugin-json";

export default {
    input: './tsc-out/src/js/app.js',
    output: {
        file: 'public/app.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        sourcemaps(),
        json()
    ]
};
