import NodeGenerator from '/fragments/NodeGenerator';
import LetterCase from '/fragments/LetterCase';

const letterCase = LetterCase();
const generator = NodeGenerator();

const COMPONENT = 'component';
const CHILDREN = 'children';

// TODO should do in two steps (and split in two classes):
//     1) collect everything
//     2) generate code
// compile/generate (or compile/emit) (CodeTransformation/transform)

// TODO add this in design explanations
// templates should be simple and follow html
// accept attributes
// and a list of children

// TODO should group
//      node creation
//      node attributes initialization
//      setter definitions
export default function(scope) {

    let variableCount = 0;
    const nodeDeclarations = [];
    const functionDefinitions = [];
    const initializations = [];
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

    function addListener(variableName, nodeName, eventName) {
        const methodName = generateMethodName('addListenerOn', variableName);
        addMethod(methodName, 'listener', nodeName + '.addListener' + letterCase.capitalize(eventName) + '(listener);');
    }

    function generateNodeName() {
        variableCount++;
        return 'node' + variableCount;
    }

    function declareNode(node) {
        const nodeName = generateNodeName();
        nodeDeclarations.push({ nodeName, node });
        return nodeName;
    }

    function generateVariableChildrenSetter(parentNode, children) {
        children.forEach(function(child, position) {
            if (child.type !== 'variable') {
                return;
            }
            if (child.name === CHILDREN) {
                addSetter(CHILDREN, parentNode + '.replaceChildren(' + position + ', ' + CHILDREN + ');');
            }
        });
    }

    function generateVariableChildren() {
        // Template parameter {children} is necessarily an array.
        // It is flattened to be inserted amoung the list of element children.
        return '...' + CHILDREN;
    }

    function generateVariable(name) {
        if (name === CHILDREN) {
            return generateVariableChildren();
        }
        const nodeName = declareNode({ 
            type: 'text',
            content: ''
        });

        addSetter(name, nodeName + '.setData(' + name + ');');
        return nodeName;
    }

    // TODO rename className into class and have a special field (instead of mixing with other attributes) Do this in the parser
    function generateStyle(nodeName, classNames) {
        classNames.forEach(function(className) {
            if (className.type === 'text') {
                const style = [scope, className.content];
                initializations.push({node: nodeName, method: 'addStyle', parameters: style});
            } else {
                const style = [scope, className.name];
                const addStyle = generator.generateInitialization({node: nodeName, method: 'addStyle', parameters: style});
                const removeStyle = generator.generateInitialization({node: nodeName, method: 'removeStyle', parameters: style});
                addSetter('isMissing', 'if (isMissing) { ' + addStyle + ' } else { ' + removeStyle + ' }');
            }
        });
    }

    function generateAttribute(nodeName, key, value) {
        const setterName = generateMethodName('set', key);
        if (value.type === 'variable') {
            addSetter(value.name, nodeName + '.' + setterName + '(' + value.name + ');');
            return;
        }
        initializations.push({node: nodeName, method: setterName, parameters: [value.content]});
    }

    function generateAttributes(nodeName, attributes) {
        Object.keys(attributes).forEach(function(key) {
            const value = attributes[key];
            generateAttribute(nodeName, key, value);
        });
    }

    function generateEvent(nodeName, key, value) {
        const methodName = generateMethodName('addListenerOn', value.name);
        addListener(value.name, nodeName, key);
    }

    function generateEvents(nodeName, events) {
        Object.keys(events).forEach(function(key) {
            const value = events[key];
            generateEvent(nodeName, key, value);
        });        
    }

    function generateChildren(children) {
        return children.map(function(child) {
            return generateNode(child);
        });
    }

    function generateNode(htpl) {
        if (htpl.type === 'element') {
            const children = htpl.children;
            const childNodes = generateChildren(children);
            const nodeName = declareNode({
                type: 'element',
                tagName: htpl.tagName,
                children: childNodes
            });
            generateVariableChildrenSetter(nodeName, children);
            generateStyle(nodeName, htpl.style);
            generateAttributes(nodeName, htpl.attributes);
            generateEvents(nodeName, htpl.events);
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
            return COMPONENT;
        }
        return '{...' + COMPONENT + ', ' + methods.join(', ') + '}';
    }
    
    function generate(htpl) {
        const root = generateNode(htpl);
        let resultObject = generateResultObject();
        const declarations = generator.generateDeclarations(nodeDeclarations);
        const instructions = generator.generateInitializations(initializations);
        return [
            ...declarations,
            ...instructions,
            ...functionDefinitions,
            'const ' + COMPONENT + ' = lotech.Component(' + root + ');',
            'return ' + resultObject + ';'
        ];
    }

    return {generate};
}

