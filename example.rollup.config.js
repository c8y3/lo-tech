import buble from 'rollup-plugin-buble';
import rootImport from 'rollup-plugin-root-import';
import fragments from './bin/rollup-plugin-fragments';

export default [{
    input: 'src/example/raw/Application.js',
    plugins: [
        buble({
            objectAssign: 'Object.assign'
        }), 
        rootImport({
            root: ['src/example/raw', 'bin/'],
            extensions: '.js'
        })
    ],
    output: {
        file: 'results/example/raw/Application.js',
        format: 'iife',
        name: 'main',
        footer: 'main();'
    }
}, {
    input: 'src/example/templates/Application.js',
    plugins: [
        fragments(),
        buble({
            objectAssign: 'Object.assign'
        }), 
        rootImport({
            root: ['src/example/templates', 'bin/'],
            extensions: '.js'
        })
    ],
    output: {
        file: 'results/example/templates/Application.js',
        format: 'iife',
        name: 'main',
        footer: 'main();'
    }
}];
