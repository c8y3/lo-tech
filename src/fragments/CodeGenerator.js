import NodeGenerator from '/fragments/NodeGenerator';

const generator = NodeGenerator();

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

export default function() {

    const instructions = [];
    const methods = [];

    function generateVariable(name) {
        if (name === 'children') {
            return generator.generateVariableChildren();
        }
        const node = generator.generateVariable(name);
        instructions.push(['const node1 = ' + node + ';']);
        methods.push('set' + capitalize(name));
        return 'node1';
    }

    function generateChildren(children) {
        return children.map(generateNode);
    }

    function generateNode(htpl) {
        if (htpl.type === 'element') {
            const children = generateChildren(htpl.children);
            return generator.generateElement(htpl.tagName, htpl.attributes, children);
        }
        if (htpl.type === 'variable') {
            return generateVariable(htpl.name);
        }
        if (htpl.type === 'text') {
            return generator.generateText(htpl.content);
        }
    }
    
    function generate(htpl) {
        const root = generateNode(htpl);
        let resultObject = 'result';
        if (methods.length !== 0) {
            resultObject = '{...' + resultObject + ', ' + methods.join(' ') + '}';
        }
        return [
            ...instructions,
            'const result = lotech.Component(' + root + ');',
            'return ' + resultObject + ';'
        ];
    }
    return {generate};
}

