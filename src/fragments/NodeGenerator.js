function generateValue(key, value) {
    if (key === 'style') {
        value = value.split(' ');
    }
    return JSON.stringify(value);
}

function generateElement(type, children) {
    return type + '([' + children.join(', ') + '])';
}

function generateVariable(name) {
    return 'lotech.String(\'\')';
}

function generateText(content) {
    return 'lotech.String(\'' + content + '\')';
}

function generateDeclaration(declaration) {
    return 'const ' + declaration.nodeName + ' = ' + declaration.node + ';'
}

function generateDeclarations(declarations) {
    return declarations.map(generateDeclaration);
}

export default function() {
    return {
        generateElement,
        generateVariable,
        generateText,
        generateDeclarations
    };
};
