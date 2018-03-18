import buble from 'rollup-plugin-buble';
import rootImport from 'rollup-plugin-root-import';
import multiEntry from 'rollup-plugin-multi-entry';

export default [{
    input: 'test/fragments/**/*.spec.js',
    plugins: [
        buble({
            objectAssign: 'Object.assign'
        }), 
        rootImport({
            root: 'src/',
            extensions: '.js'
        }),
        multiEntry()
    ],
    external: ['parse5'],
    output: {
        file: 'results/fragments.test.js',
        format: 'cjs'
    }
}];
