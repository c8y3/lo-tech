import NodeGenerator from '/fragments/NodeGenerator';
import LetterCase from '/fragments/LetterCase';

const letterCase = LetterCase();
const generator = NodeGenerator();

const COMPONENT_NAME = 'component';
// TODO should group
//      node creation
//      node attributes initialization
//      setter definitions
export default function() {

    let variableCount;
    let instructions;
    let methods;

    function initializeState() {
        variableCount = 0;
        instructions = [];
        methods = [];
    }

    function generateNodeName() {
        variableCount++;
        return 'node' + variableCount;
    }

    function declareNode(node) {
        const nodeName = generateNodeName();
        instructions.push('const ' + nodeName + ' = ' + node + ';');
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
        instructions.push('function ' + setterName + '(' + name + ') { ' + nodeName + '.setData(' + name + '); }');
        methods.push(setterName);
        return nodeName;
    }

    function generateChildren(children) {
        return children.map(generateNode);
    }

    function generateNode(htpl) {
        if (htpl.type === 'element') {
            const children = generateChildren(htpl.children);
            const node = generator.generateElement(htpl.tagName, htpl.attributes, children);
            return declareNode(node);
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
    
    function generate(htpl, scope) {
        initializeState();
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

