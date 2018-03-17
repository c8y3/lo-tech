// note, a node will have a constructor with its children
// and a method setAttributes and also setAttribute
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
