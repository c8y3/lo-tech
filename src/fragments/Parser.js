import parse5 from 'parse5';

function simplifyAttributes(attributes) {
    if (attributes === undefined) {
        return {};
    }
    const result = {};
    attributes.forEach(function(attribute) {
        result[attribute.name] = attribute.value;
    });
    return result;
}

function simplifyChildren(children) {
    if (children === undefined) {
        return [];
    }
    return children.map(simplifyNode);
}

function simplifyTextNode(node) {
    const content = node.value;
    if (content === '{children}') {
        return {
            type: 'variable'
        };
    }
    return node.value;
}

function simplifyNode(tree) {
    if (tree.nodeName === '#text') {
        return simplifyTextNode(tree);
    }
    return {
        tagName: tree.tagName,
        attributes: simplifyAttributes(tree.attrs),
        children: simplifyChildren(tree.childNodes)
    };
}

function simplifyDocumentFragment(tree) {
    return simplifyNode(tree.childNodes[0]);
}

export default function() {
    return {
        parse: function(input) {
            const tree = parse5.parseFragment(input);
            return simplifyDocumentFragment(tree);
        }
    };
};
