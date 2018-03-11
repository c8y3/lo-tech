import buble from 'rollup-plugin-buble';
import rootImport from 'rollup-plugin-root-import';

export default {
    input: 'src/example/Application.js',
    plugins: [
        buble({
            objectAssign: 'Object.assign'
        }), 
        rootImport({
            root: 'src/',
            extensions: '.js'
        })
    ],
    output: {
        file: 'results/Application.js',
        format: 'iife',
        name: 'Application'
    }
};
