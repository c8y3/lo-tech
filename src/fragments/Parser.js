import htmlparser from 'htmlparser2';

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
    if (text === '{children}') {
        return {
            type: 'variable',
            name: 'children'
        };
    }
    return {
        type: 'text',
        content: text
    }
}

const parser = new htmlparser.Parser({
    onopentag(name, attributes) {
        nodes.push({
            type: 'element',
            tagName: name,
            attributes: attributes,
            children: []
        });
    },
    ontext(text) {
        const node = parseText(text);
        appendChild(node);
    },
    onclosetag(tagName) {
        const node = nodes.pop();
        appendChild(node);
    }
}, {
    lowerCaseTags: false
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
