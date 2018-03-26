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
