import buble from 'rollup-plugin-buble';
import rootImport from 'rollup-plugin-root-import';

const banner = '#!/usr/bin/env node';

export default [{
    input: 'src/lotech/index.js',
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
        file: 'bin/lotech.js',
        format: 'es'
    }
}, {
    input: 'src/fragments/index.js',
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
        file: 'bin/fragments',
        format: 'cjs',
        banner: banner
    }
}];
