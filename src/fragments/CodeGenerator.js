import NodeGenerator from '/fragments/NodeGenerator';

const generator = NodeGenerator();

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

const COMPONENT_NAME = 'component';

export default function() {

    let variableCount = 0;
    const instructions = [];
    const methods = [];

    function generateNodeName() {
        variableCount++;
        return 'node' + variableCount;
    }

    function generateSetterName(variableName) {
        return 'set' + capitalize(variableName);
    }

    function generateVariable(name) {
        if (name === 'children') {
            return generator.generateVariableChildren();
        }
        const nodeName = generateNodeName();
        const node = generator.generateVariable(name);
        const setterName = generateSetterName(name);
        instructions.push('const ' + nodeName + ' = ' + node + ';');
        instructions.push('function ' + setterName + '(' + name + ') { node1.setData(' + name + '); }');
        methods.push(setterName);
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

    function generateResultObject() {
        if (methods.length === 0) {
            return COMPONENT_NAME;
        }
        return '{...' + COMPONENT_NAME + ', ' + methods.join(', ') + '}';
    }
    
    function generate(htpl) {
        const root = generateNode(htpl);
        let resultObject = generateResultObject();
        return [
            ...instructions,
            'const ' + COMPONENT_NAME + ' = lotech.Component(' + root + ');',
            'return ' + resultObject + ';'
        ];
    }
    return {generate};
}

