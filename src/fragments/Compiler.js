import Parser from '/fragments/Parser';

const parser = Parser();

// note, a node will have a constructor with its children
// and a method setAttributes and also setAttribute
export default function() {
    return {
        compile: function(code) {
            const tree = parser.parse(code);
            const template = 'function() {\n'
                           + '    return lotech.Div([]);\n'
                           + '}'
            return 'import lotech from \'/lotech\';\n'
                 + 'export default ' + template + ';';
        }
    };
};
