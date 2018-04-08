import Parser from '/fragments/Parser';
import CodeGenerator from '/fragments/CodeGenerator';

// TODO remove the automatic conversion of nodes which start with lower case and correspond to lotech elements? Think about it...

const IDENT = '    ';

// note, a node will have a constructor with its children
// and a method setAttributes and also setAttribute
export default function() {
    const parser = Parser();

    function compile(code, scope) {
// TODO I am not a big fan of calling the constructor object here (rather than up there). Think about it...
//   => it will be better once the codegenerator is split into compile and emit code
        const generator = CodeGenerator(scope);

        const bodyStart = code.indexOf('<');
        const headers = code.substring(0, bodyStart);
        const body = code.substring(bodyStart);
        const tree = parser.parse(body);
        const instructions = generator.generate(tree);
        // TODO the generator should most probably do the generate too...
        return 'import lotech from \'/lotech\';\n'
             + headers
             + 'export default function(children) {\n'
// TODO check it, but most probably it is not necessary to wrap here with a lotech.Component (all components should have the same API?)
             + IDENT + instructions.join('\n' + IDENT) + '\n'
             + '}';
    }

    return {
        compile
    };
};

