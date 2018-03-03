import buble from 'rollup-plugin-buble';

export default {
    input: 'src/Application.js',
    plugins: [ buble() ],
    output: {
        file: 'results/Application.js',
        format: 'iife',
        name: 'Application'
    }
};
