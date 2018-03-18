function generateElement(htpl) {
    let children = generateChildren(htpl.children);
// TODO think about this here. Compare with JSX, but it seems to me there is the possibility to retrieve each element of the array, and it is handled in the component. Think about this and see how this is done...
// or maybe do this only for built components and not base components?
//    return 'lotech.createElement(\'' + htpl.tagName + '\', {}, [' + children + '])';
// this is a hack for now...
    if (children.length === 0) {
        children = '[]';
    }
    return 'lotech.createElement(\'' + htpl.tagName + '\', {}, ' + children + ')';
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

