import LetterCase from '/fragments/LetterCase';

// TODO this object could be enriched in the configuration to set names to some elements... (it could also be a function, or just some convention. Think about it...) => would avoid the import section (but be global, ask advice...?)
const PREDEFINED = {
    div: 'lotech.Div',
    span: 'lotech.Span',
    p: 'lotech.P',
    form: 'lotech.Form',
    inputText: 'lotech.input.Text',
    inputCheckbox: 'lotech.input.Checkbox'
};

const COMPONENT = 'component';

const letterCase = LetterCase();

function generateMethodName(prefix, variableName) {
    return prefix + letterCase.capitalize(variableName);
}

function generateType(tagName) {
    const type = PREDEFINED[tagName];
    if (type !== undefined) {
        return type;
    }
    return tagName;
}

function generateValue(key, value) {
    if (key === 'style') {
        value = value.split(' ');
    }
    return JSON.stringify(value);
}

function generateElement(tagName, children) {
    const type = generateType(tagName);
    return type + '([' + children.join(', ') + '])';
}

function generateText(content) {
    return 'lotech.String(\'' + content + '\')';
}

function generateNode(node) {
// TODO use a switch here
    if (node.type === 'element') {
        return generateElement(node.tagName, node.children);
    }
    if (node.type === 'text') {
        return generateText(node.content);
    }
}

function generateDeclaration(declaration) {
    const node = generateNode(declaration.node);
    return 'const ' + declaration.nodeName + ' = ' + node + ';'
}

function generateDeclarations(declarations) {
    return declarations.map(generateDeclaration);
}

function generateValue(value) {
    let method;
    let parameters;
    if (value.type === 'style') {
        method = 'addStyle';
        parameters = value.scope + '\', \'' + value.className;
    }
    if (value.type === 'attribute') {
        method = generateMethodName('set', value.key);
        parameters = value.value;
    }
    method + '(\'' + parameters + '\')';
}

function generateMethodCall(node, method, parameters) {
    return node + '.' + method + '(\'' + parameters.join('\', \'') + '\');';    
}

function generateInitialization(initialization) {
    let method;
    let parameters;
    if (initialization.type === 'style') {
        method = 'addStyle';
        parameters = [initialization.scope, initialization.className];
    }
    if (initialization.type === 'attribute') {
        method = generateMethodName('set', initialization.key);
        parameters = [initialization.value];
    }
    return generateMethodCall(initialization.node, method, parameters);
}

function generateStyleToggle(nodeName, scope, className) {
    const addStyle = generateMethodCall(nodeName, 'addStyle', [scope, className]);
    const removeStyle = generateMethodCall(nodeName, 'removeStyle', [scope, className]);
    // FIXME should not be isMissing here
    return 'if (isMissing) { ' + addStyle + ' } else { ' + removeStyle + ' }';
}

function generateInitializations(initializations) {
    return initializations.map(generateInitialization);
}

function generateMethod(method) {
    return 'function ' + method.name + '(' + method.parameter + ') { ' + method.body + ' }';
}

function generateMethods(methods) {
    return methods.map(generateMethod);
}

function generateResultObject(methods) {
    if (methods.length === 0) {
        return COMPONENT;
    }
    const methodNames = methods.map(function(method) {
        return method.name;
    });
    return '{...' + COMPONENT + ', ' + methodNames.join(', ') + '}';
}

export default function() {
    return {
        generateText,
        generateElement, // TODO should not be public, but easier for testing, think about how to split things up
        generateDeclarations,
        generateInitialization,
        generateInitializations,
        generateMethods,
        generateResultObject,
        generateStyleToggle
    };
};
