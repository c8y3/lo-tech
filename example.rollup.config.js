import buble from 'rollup-plugin-buble';
import rootImport from 'rollup-plugin-root-import';
import fragments from './bin/rollup-plugin-fragments';

export default [{
    input: 'src/example/Application.js',
    plugins: [
        buble({
            objectAssign: 'Object.assign'
        }), 
        rootImport({
            root: ['src/example', 'bin/'],
            extensions: '.js'
        })
    ],
    output: {
        file: 'results/example/Application.js',
        format: 'iife',
        name: 'Application'
    }
}, {
    input: 'src/example/templates/Application.js',
    plugins: [
        buble({
            objectAssign: 'Object.assign'
        }), 
        rootImport({
            root: ['src/example/templates', 'bin/'],
            extensions: '.js'
        }),
        fragments()
    ],
    output: {
        file: 'results/example/TemplatesApplication.js',
        format: 'iife',
        name: 'Application'
    }
}];
