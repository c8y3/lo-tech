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

export default function() {
    return {
        generateElement(tagName, attributesDefinition, children) {
            const type = generateType(tagName);
            const attributes = generateAttributes(attributesDefinition);
        // TODO remove lotech.createElement, should not be nessary
        // TODO most probably go back to addStyle, think about it
            return 'lotech.createElement(' + type + ', ' + attributes + ', [' + children + '])';
        },
        generateVariable(name) {
            if (name === 'children') {
                // Template parameter {children} is necessarily an array.
                // It is flattened to be inserted amoung the list of element children.
                return '...children';
            }
            return 'lotech.String(\'\')';
        },
        generateText(content) {
            return 'lotech.String(\'' + content + '\')';
        }
    };
};
