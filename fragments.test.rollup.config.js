import buble from 'rollup-plugin-buble';
import rootImport from 'rollup-plugin-root-import';

export default [{
    input: 'test/fragments/Parser.spec.js',
    plugins: [
        buble({
            objectAssign: 'Object.assign'
        }), 
        rootImport({
            root: 'src/',
            extensions: '.js'
        })
    ],
    external: ['parse5'],
    output: {
        file: 'results/fragments.test.js',
        format: 'cjs'
    }
}];
