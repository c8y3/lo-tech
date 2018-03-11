import buble from 'rollup-plugin-buble';
import includePaths from 'rollup-plugin-includepaths';

export default {
    input: 'src/example/Application.js',
    plugins: [
        buble({
            objectAssign: 'Object.assign'
        }), 
        includePaths({
            paths: ['bin/'],
            extensions: ['.js']
        })
    ],
    output: {
        file: 'results/example/Application.js',
        format: 'iife',
        name: 'Application'
    }
};
