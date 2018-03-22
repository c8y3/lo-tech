function isUpperCase(letter) {
    return letter.toUpperCase() === letter;
}

function generateType(tagName) {
    if (isUpperCase(tagName[0])) {
        return tagName;
    }
    return '\'' + tagName + '\'';
}

function generateValue(key, value) {
    if (key === 'style') {
        value = [value]; //value.split(' ');
    }
    return JSON.stringify(value);
}

function generateAttributes(attributes) {
    let result = '';
    Object.keys(attributes).forEach(function(key) {
        const value = attributes[key];
        result += '\'' + key + '\': ' + generateValue(key, value);
    });
    return '{' + result + '}';
}

function generateElement(htpl) {
    const type = generateType(htpl.tagName);
    const attributes = generateAttributes(htpl.attributes);
    const children = generateChildren(htpl.children);
    return 'lotech.createElement(' + type + ', ' + attributes + ', [' + children + '])';
}

function generateVariable() {
    // Template parameter {children} is necessarily an array.
    // It is flattened to be inserted amoung the list of element children.
    return '...children';
}

function generate(htpl) {
    if (htpl.type === 'element') {
        return generateElement(htpl);
    }
    if (htpl.type === 'variable') {
        return generateVariable(htpl);
    }
}

function generateChildren(children) {
    return children.map(generate);
}

export default function() {
    return {
        generate
    };
}

