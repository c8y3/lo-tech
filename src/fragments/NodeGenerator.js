import LetterCase from '/fragments/LetterCase';

const letterCase = LetterCase();

function generateType(tagName) {
    if (letterCase.startsWithCapitalLetter(tagName[0])) {
        return tagName;
    }
    return 'lotech.' + letterCase.capitalize(tagName);
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

export default function() {
    return {
        generateText,
        generateDeclarations
    };
};
