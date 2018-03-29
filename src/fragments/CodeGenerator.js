import NodeGenerator from '/fragments/NodeGenerator';
import LetterCase from '/fragments/LetterCase';

const letterCase = LetterCase();
const generator = NodeGenerator();

const componentName = 'component';
// TODO should group
//      node creation
//      node attributes initialization
//      setter definitions
export default function(scope) {

    let variableCount = 0;
    const nodeDeclarations = [];
    const functionDefinitions = [];
    const instructions = [];
    const methods = [];

    function generateNodeName() {
        variableCount++;
        return 'node' + variableCount;
    }

    function declareNode(node) {
        const nodeName = generateNodeName();
        nodeDeclarations.push('const ' + nodeName + ' = ' + node + ';');
        return nodeName;
    }

    function generateSetterName(variableName) {
        return 'set' + letterCase.capitalize(variableName);
    }

    function generateVariable(name) {
        if (name === 'children') {
            return generator.generateVariableChildren();
        }
        const node = generator.generateVariable(name);
        const nodeName = declareNode(node);

        const setterName = generateSetterName(name);
        functionDefinitions.push('function ' + setterName + '(' + name + ') { ' + nodeName + '.setData(' + name + '); }');
        methods.push(setterName);
        return nodeName;
    }

    function generateClassName(nodeName, attributes) {
        const classNames = attributes.className;
        if (classNames !== undefined) {
            classNames.forEach(function(className) {
                instructions.push(nodeName + '.addClass(\'' + scope + '__' + className.content + '\');');
            });
        }
    }

    function generateChildren(children) {
        return children.map(generateNode);
    }

    function generateNode(htpl) {
        if (htpl.type === 'element') {
            const children = generateChildren(htpl.children);
            const node = generator.generateElement(htpl.tagName, children);
            const nodeName = declareNode(node);
            generateClassName(nodeName, htpl.attributes);
            return nodeName;
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
            return componentName;
        }
        return '{...' + componentName + ', ' + methods.join(', ') + '}';
    }
    
    function generate(htpl) {
        const root = generateNode(htpl);
        let resultObject = generateResultObject();
        return [
            ...nodeDeclarations,
            ...instructions,
            ...functionDefinitions,
            'const ' + componentName + ' = lotech.Component(' + root + ');',
            'return ' + resultObject + ';'
        ];
    }

    return {generate};
}

