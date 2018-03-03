import path from 'path';
import buble from 'rollup-plugin-buble';
import rootImport from 'rollup-plugin-root-import';

export default {
    input: 'src/Application.js',
    plugins: [
        buble(), 
        rootImport({
            root: path.join(__dirname, '/src'),
            extensions: '.js'
        })
    ],
    output: {
        file: 'results/Application.js',
        format: 'iife',
        name: 'Application'
    }
};
