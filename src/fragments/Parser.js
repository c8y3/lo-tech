import htmlparser from 'htmlparser2';
import Text from '/fragments/nodes/Text'

function VariableNode(text) {
    return {
        type: 'variable',
        name: text.substring(1, text.length-1)
    };
}

function ElementNode(tagName, attributes) {
    return {
        type: 'element',
        tagName,
        attributes,
        children: []
    }
}

let nodeStack;

function reset() {
    nodeStack = [{
        children: []
    }];
}

function getResult() {
    return nodeStack[0].children[0];
}

function appendChild(node) {
    const father = nodeStack[nodeStack.length-1];
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
    return Text(text);
}

function parseAttribute(key, value) {
    if (key === 'className') {
        const classNames = value.split(' ');
        return classNames.map(function(className) {
            if (isVariable(className)) {
                return VariableNode(className);
            }
            return Text(className);
        });
    }
    if (isVariable(value)) {
        return VariableNode(value);
    }
    return Text(value);
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
        const node = ElementNode(name, parseAttributes(attributes));
        nodeStack.push(node);
    },
    ontext(text) {
        const node = parseText(text);
        if (node === undefined) {
            return;
        }
        appendChild(node);
    },
    onclosetag(tagName) {
        const node = nodeStack.pop();
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
