import htmlparser from 'htmlparser2';

function TextNode(content) {
    return {
        type: 'text',
        content: content
    }
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

function parseText(text) {
    text = text.replace(/\n/g, ' ');
    text = text.trim();
    if (text === '') {
        return undefined;
    }
    if (text[0] === '{' && text[text.length-1] === '}') {
        return {
            type: 'variable',
            name: text.substring(1, text.length-1)
        };
    }
    return TextNode(text);
}

function parseAttribute(key, value) {
    if (key === 'className') {
        const classNames = value.split(' ');
        return classNames.map(function(className) {
            return TextNode(className);
        });
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
    lowerCaseAttributeNames: false
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
