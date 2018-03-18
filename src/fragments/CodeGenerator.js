function generateElement(htpl) {
    const children = generateChildren(htpl.children);
    return 'lotech.createElement(\'' + htpl.tagName + '\', {}, [' + children + '])';
}

function generateVariable() {
    return 'children';
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

