import htmlparser from 'htmlparser2';

function TextNode(content) {
    return {
        type: 'text',
        content: content
    }
}

function VariableNode(text) {
    return {
        type: 'variable',
        name: text.substring(1, text.length-1)
    };
}

let nodes;

function reset() {
    nodes = [{
        children: []
    }];
}

function getResult() {
    return nodes[0].children[0];
}

function appendChild(node) {
    const father = nodes[nodes.length-1];
    father.children.push(node);
}

function isVariable(text) {
    return (text[0] === '{') && (text[text.length-1] === '}');
}

function parseText(text) {
    text = text.replace(/\n/g, ' ');
    text = text.trim();
    if (text === '') {
        return undefined;
    }
    if (isVariable(text)) {
        return VariableNode(text);
    }
    return TextNode(text);
}

function parseAttribute(key, value) {
    if (key === 'className') {
        const classNames = value.split(' ');
        return classNames.map(function(className) {
            if (isVariable(className)) {
                return VariableNode(className);
            }
            return TextNode(className);
        });
    }
    if (isVariable(value)) {
        return VariableNode(value);
    }
    return value;
}

function parseAttributes(attributes) {
    const result = {};
    Object.keys(attributes).forEach(function(key) {
        const value = parseAttribute(key, attributes[key]);
        result[key] = value;
    });
    return result;
}

const parser = new htmlparser.Parser({
    onopentag(name, attributes) {
        nodes.push({
            type: 'element',
            tagName: name,
            attributes: parseAttributes(attributes),
            children: []
        });
    },
    ontext(text) {
        const node = parseText(text);
        if (node === undefined) {
            return;
        }
        appendChild(node);
    },
    onclosetag(tagName) {
        const node = nodes.pop();
        appendChild(node);
    }
}, {
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
    recognizeSelfClosing: true
});

export default function() {
    return {
        parse(input) {
            reset();
            parser.parseComplete(input);
            return getResult();
        }
    };
};
