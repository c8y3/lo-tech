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

    function declareNode(nodeName, node) {
        nodeDeclarations.push('const ' + nodeName + ' = ' + node + ';');
    }

    function generateVariableChildren(parentNode, position, name) {
        const nodeName = generator.generateVariableChildren();
        addSetter(name, parentNode + '.replaceChildren(' + position + ', ' + name + ');');
        return generator.generateVariableChildren();
    }

    function generateVariable(parentNode, position, name) {
        if (name === 'children') {
            return generateVariableChildren(parentNode, position, name);
        }
        const node = generator.generateVariable(name);
        const nodeName = generateNodeName();
        declareNode(nodeName, node);

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

    // TODO remove ScopedStyle and go back to addStyle/removeStyle
    // TODO rename className into class and have a special field (instead of mixing with other attributes) Do this in the parser
    function generateAttributes(nodeName, attributes) {
        const classNames = attributes.className;
        if (classNames !== undefined) {
            generateClassNames(nodeName, classNames);
        }
    }

    function generateChildren(parentNode, children) {
        return children.map(function(child, position) {
            return generateNode(parentNode, position, child);
        });
    }

    function generateNode(parentNode, position, htpl) {
        if (htpl.type === 'element') {
            const nodeName = generateNodeName();
            const children = generateChildren(nodeName, htpl.children);
            const node = generator.generateElement(htpl.tagName, children);
            declareNode(nodeName, node);
            generateAttributes(nodeName, htpl.attributes);
            return nodeName;
        }
        if (htpl.type === 'variable') {
            return generateVariable(parentNode, position, htpl.name);
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
        const root = generateNode(undefined, 0, htpl);
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

