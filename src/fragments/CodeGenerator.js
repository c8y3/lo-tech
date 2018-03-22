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

function generateText(content) {
    content = content.replace(/\n/g, ' ');
    return 'lotech.String(\'' + content + '\')';
};

function generate(htpl) {
    if (htpl.type === 'element') {
        return generateElement(htpl);
    }
    if (htpl.type === 'variable') {
        return generateVariable(htpl);
    }
    if (htpl.type === 'text') {
        return generateText(htpl.content);
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

