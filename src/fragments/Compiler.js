import Parser from '/fragments/Parser';
import CodeGenerator from '/fragments/CodeGenerator';

const parser = Parser();
const generator = CodeGenerator();

// note, a node will have a constructor with its children
// and a method setAttributes and also setAttribute
export default function() {
    return {
        compile(code, scope) {
            const bodyStart = code.indexOf('<');
            const headers = code.substring(0, bodyStart);
            const body = code.substring(bodyStart);
            const tree = parser.parse(body);
            const instructions = generator.generate(tree, scope);
            // TODO the generator should most probably do the generate too...
            return 'import lotech from \'/lotech\';\n'
                 + headers
                 + 'export default function(children) {\n'
// TODO check it, but most probably it is not necessary to wrap here with a lotech.Component (all components should have the same API?)
                 + '  ' + instructions.join('\n  ') + '\n'
                 + '}';
        }
    };
};

