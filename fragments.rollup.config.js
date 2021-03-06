import buble from 'rollup-plugin-buble';
import rootImport from 'rollup-plugin-root-import';


export default  {
    input: 'src/fragments/RollupPlugin.js',
    plugins: [
        buble({
            objectAssign: 'Object.assign'
        }), 
        rootImport({
            root: 'src/',
            extensions: '.js'
        })
    ],
    external: ['path', 'htmlparser2'],
    output: {
        file: 'bin/rollup-plugin-fragments',
        format: 'es'
    }
};
