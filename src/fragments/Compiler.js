import Parser from '/fragments/Parser';
import CodeGenerator from '/fragments/CodeGenerator';

const parser = Parser();
const generator = CodeGenerator();

// note, a node will have a constructor with its children
// and a method setAttributes and also setAttribute
export default function() {
    return {
        compile: function(code) {
            const tree = parser.parse(code);
            const template = generator.generate(tree);
            return 'import lotech from \'/lotech\';\n'
                 + 'export default ' + template + ';';
        }
    };
};
