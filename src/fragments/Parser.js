import htmlparser from 'htmlparser2';
import Text from '/fragments/nodes/Text';
import Variable from '/fragments/nodes/Variable';
import Element from '/fragments/nodes/Element';
import NodeStack from '/fragments/NodeStack';

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
        return Variable(text);
    }
    return Text(text);
}

function parseClassNames(value) {
    if (value === undefined) {
        return [];
    }
    const classNames = value.split(' ');
    return classNames.map(function(className) {
        if (isVariable(className)) {
            return Variable(className);
        }
        return Text(className);
    });
}

function parseAttribute(key, value) {
    if (key === 'className') {
        return parseClassNames(value);
    }
    if (isVariable(value)) {
        return Variable(value);
    }
    return Text(value);
}

function parseAttributes(htmlAttributes) {
    const style = parseClassNames(htmlAttributes.className);
    const attributes = {};
    const events = {};
    Object.keys(htmlAttributes).forEach(function(key) {
        if (key === 'className') {
            return;
        }
        const value = parseAttribute(key, htmlAttributes[key]);
        if (key.startsWith('on')) {
            events[key] = value;
        }
            attributes[key] = value;
    });
    return {
        style,
        attributes,
        events
    };
}

let nodes;

function onopentag(name, htmlAttributes) {
    const attributes = parseAttributes(htmlAttributes);
    const node = {
        ...Element(name),
        ...attributes
    }
    nodes.push(node);
}

function onclosetag() {
    const node = nodes.pop();
    nodes.appendChild(node);
}

function ontext(text) {
    const node = parseText(text);
    if (node === undefined) {
        return;
    }
    nodes.appendChild(node);
}

const parseOptions = {
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
    recognizeSelfClosing: true
};

const parser = new htmlparser.Parser({ onopentag, ontext, onclosetag }, parseOptions);

export default function() {

    function parse(input) {
        nodes = NodeStack();
        parser.parseComplete(input);
        return nodes.getResult();
    }

    return {
        parse
    };
};
