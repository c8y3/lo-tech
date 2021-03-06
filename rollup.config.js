import buble from 'rollup-plugin-buble';
import rootImport from 'rollup-plugin-root-import';

export default {
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
};
