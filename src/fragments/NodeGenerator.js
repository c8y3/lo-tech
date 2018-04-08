import LetterCase from '/fragments/LetterCase';

// TODO this object could be enriched in the configuration to set names to some elements... (it could also be a function, or just some convention. Think about it...) => would avoid the import section (but be global, ask advice...?)
const PREDEFINED = {
    div: 'lotech.Div',
    span: 'lotech.Span',
    p: 'lotech.P',
    form: 'lotech.Form',
    text: 'lotech.input.Text',
    checkbox: 'lotech.input.Checkbox'
};

const letterCase = LetterCase();

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

function generateInitialization(initialization) {
    const parameters = initialization.parameters.join('\', \'');
    return initialization.node + '.' + initialization.method + '(\'' + parameters + '\');';
}

function generateInitializations(initializations) {
    return initializations.map(generateInitialization);
}

export default function() {
    return {
        generateText,
        generateElement, // TODO should not be public, but easier for testing, think about how to split things up
        generateDeclarations,
        generateInitialization,
        generateInitializations
    };
};
