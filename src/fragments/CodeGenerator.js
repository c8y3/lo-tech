import NodeGenerator from '/fragments/NodeGenerator';
import LetterCase from '/fragments/LetterCase';

const letterCase = LetterCase();
const generator = NodeGenerator();

const COMPONENT = 'component';
const CHILDREN = 'children';
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

    function generateMethodName(prefix, variableName) {
        return prefix + letterCase.capitalize(variableName);
    }

    function addMethod(methodName, parameterName, body) {
        functionDefinitions.push('function ' + methodName + '(' + parameterName + ') { ' + body + ' }');
        methods.push(methodName);
    }

    function addSetter(name, body) {
        const methodName = generateMethodName('set', name);
        addMethod(methodName, name, body);
    }

    function generateNodeName() {
        variableCount++;
        return 'node' + variableCount;
    }

    function declareNode(nodeName, node) {
        nodeDeclarations.push('const ' + nodeName + ' = ' + node + ';');
    }

    function generateVariableChildren(parentNode, position) {
        addSetter(CHILDREN, parentNode + '.replaceChildren(' + position + ', ' + CHILDREN + ');');
        // Template parameter {children} is necessarily an array.
        // It is flattened to be inserted amoung the list of element children.
        return '...' + CHILDREN;
    }

    function generateVariable(parentNode, position, name) {
        if (name === CHILDREN) {
            return generateVariableChildren(parentNode, position);
        }
        const node = generator.generateVariable(name);
        const nodeName = generateNodeName();
        declareNode(nodeName, node);

        addSetter(name, nodeName + '.setData(' + name + ');');
        return nodeName;
    }

    function generateCall(nodeName, methodName, values) {
        const parameters = values.join('\', \'');
        return nodeName + '.' + methodName + '(\'' + parameters + '\');';
    }

    // TODO rename className into class and have a special field (instead of mixing with other attributes) Do this in the parser
    function generateClassNames(nodeName, classNames) {
        classNames.forEach(function(className) {
            if (className.type === 'text') {
                const style = [scope, className.content];
                const addStyle = generateCall(nodeName, 'addStyle', style);
                instructions.push(addStyle);
            } else {
                const style = [scope, className.name];
                const addStyle = generateCall(nodeName, 'addStyle', style);
                const removeStyle = generateCall(nodeName, 'removeStyle', style);
                addSetter('isMissing', 'if (isMissing) { ' + addStyle + ' } else { ' + removeStyle + ' }');
            }
        });
    }

    function generateAttribute(nodeName, key, value) {
        if (key === 'className') {
            generateClassNames(nodeName, value);
            return;
        }
        if (key.startsWith('on')) {
            const methodName = generateMethodName('addListenerOn', value.name);
            addMethod(methodName, 'listener', nodeName + '.addListener' + letterCase.capitalize(key) + '(listener);');
            return;
        }
        // TODO there is probably room to clean up the code...
        const setterName = generateMethodName('set', key);
        if (value.type === 'variable') {
            addSetter(value.name, nodeName + '.' + setterName + '(' + value.name + ');');
            return;
        }
        const setAttribute = generateCall(nodeName, setterName, [value]);
        instructions.push(setAttribute);
    }

    function generateAttributes(nodeName, attributes) {
        Object.keys(attributes).forEach(function(key) {
            const value = attributes[key];
            generateAttribute(nodeName, key, value);
        });
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
            return COMPONENT;
        }
        return '{...' + COMPONENT + ', ' + methods.join(', ') + '}';
    }
    
    function generate(htpl) {
        const root = generateNode(undefined, 0, htpl);
        let resultObject = generateResultObject();
        return [
            ...nodeDeclarations,
            ...instructions,
            ...functionDefinitions,
            'const ' + COMPONENT + ' = lotech.Component(' + root + ');',
            'return ' + resultObject + ';'
        ];
    }

    return {generate};
}

