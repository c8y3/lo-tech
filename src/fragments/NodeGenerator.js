import LetterCase from '/fragments/LetterCase';

const letterCase = LetterCase();

function isUpperCase(letter) {
    return letter.toUpperCase() === letter;
}

function generateType(tagName) {
    if (isUpperCase(tagName[0])) {
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

function generateAttributes(attributes) {
    const result = Object.keys(attributes).map(function(key) {
        const value = attributes[key];
        return '\'' + key + '\': ' + generateValue(key, value);
    });
    return '{' + result.join(', ') + '}';
}

function generateElement(tagName, attributesDefinition, children) {
    const type = generateType(tagName);
    const attributes = generateAttributes(attributesDefinition);
// TODO remove lotech.createElement, should not be nessary
// TODO most probably go back to addStyle, think about it
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
