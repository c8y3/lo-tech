function generateElement(htpl) {
    const attributes = JSON.stringify(htpl.attributes);
    const children = generateChildren(htpl.children);
    return 'lotech.createElement(\'' + htpl.tagName + '\', ' + attributes + ', [' + children + '])';
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

