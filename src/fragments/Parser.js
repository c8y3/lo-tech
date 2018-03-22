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
        appendChild({
            type: 'variable',
            name: 'children'
        });
    },
    onclosetag(tagName) {
        const node = nodes.pop();
        appendChild(node);
    }
})

export default function() {
    return {
        parse(input) {
            reset();
            parser.parseComplete(input);
            return getResult();
        }
    };
};
