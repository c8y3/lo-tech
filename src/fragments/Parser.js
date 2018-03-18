import parse5 from 'parse5';

function simplifyAttributes(attributes) {
    const result = {};
    attributes.forEach(function(attribute) {
        result[attribute.name] = attribute.value;
    });
    return result;
}

function simplifyChildren(children = []) {
    return children.map(simplifyNode);
}

function simplifyTextNode(node) {
    return {
        type: 'variable',
        name: 'children'
    };
}

function simplifyNode(node) {
    if (node.nodeName === '#text') {
        return simplifyTextNode(node);
    }
    return {
        type: 'element',
        tagName: node.tagName,
        attributes: simplifyAttributes(node.attrs),
        children: simplifyChildren(node.childNodes)
    };
}

function simplifyDocumentFragment(tree) {
    return simplifyNode(tree.childNodes[0]);
}

export default function() {
    return {
        parse(input) {
            const tree = parse5.parseFragment(input);
            return simplifyDocumentFragment(tree);
        }
    };
};
