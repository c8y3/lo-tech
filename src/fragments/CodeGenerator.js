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

    function generateSetterName(variableName) {
        return 'set' + letterCase.capitalize(variableName);
    }

    function addSetter(name, body) {
        const setterName = generateSetterName(name);
        functionDefinitions.push('function ' + setterName + '(' + name + ') { ' + body + ' }');
        methods.push(setterName);
    }

    function generateNodeName() {
        variableCount++;
        return 'node' + variableCount;
    }

    function declareNode(node) {
        const nodeName = generateNodeName();
        nodeDeclarations.push('const ' + nodeName + ' = ' + node + ';');
        return nodeName;
    }

    function generateVariable(name) {
        if (name === 'children') {
            return generator.generateVariableChildren();
        }
        const node = generator.generateVariable(name);
        const nodeName = declareNode(node);

        addSetter(name, nodeName + '.setData(' + name + ');');
        return nodeName;
    }

    function generateCall(nodeName, methodName, className) {
        return nodeName + '.' + methodName + '(\'' + className + '\');';
    }

    function generateClassNames(nodeName, classNames) {
        classNames.forEach(function(className) {
            if (className.type === 'text') {
                const style = scope + '__' + className.content;
                const addClass = generateCall(nodeName, 'addClass', style);
                instructions.push(addClass);
            } else {
                const style = scope + '__' + className.name;
                const addClass = generateCall(nodeName, 'addClass', style);
                const removeClass = generateCall(nodeName, 'removeClass', style);
                addSetter('isMissing', 'if (isMissing) { ' + addClass + ' } else { ' + removeClass + ' }');
            }
        });
    }

    function generateAttributes(nodeName, attributes) {
        const classNames = attributes.className;
        if (classNames !== undefined) {
            generateClassNames(nodeName, classNames);
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
            generateAttributes(nodeName, htpl.attributes);
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

