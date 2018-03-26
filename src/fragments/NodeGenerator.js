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

function generateVariable(name) {
    return 'lotech.String(\'\')';
}

function generateVariableChildren() {
    // Template parameter {children} is necessarily an array.
    // It is flattened to be inserted amoung the list of element children.
    return '...children';
}

function generateText(content) {
    return 'lotech.String(\'' + content + '\')';
}

export default function() {
    return {
        generateElement,
        generateVariable,
        generateVariableChildren,
        generateText
    };
};
