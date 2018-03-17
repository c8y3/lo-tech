export default function() {
    return {
        compile: function() {
            return 'import lotech from \'/lotech\';\n'
                 + 'export default function() {\n'
                 + '    return lotech.Div([]);\n'
                 + '};';
        }
    };
};
