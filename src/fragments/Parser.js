import htmlparser from 'htmlparser2';
import Text from '/fragments/nodes/Text';
import Variable from '/fragments/nodes/Variable';
import Element from '/fragments/nodes/Element';
import Stack from '/fragments/Stack';

const CLASS_ATTRIBUTE = 'class';

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
    if (isVariable(value)) {
        return Variable(value);
    }
    return Text(value);
}

function parseAttributes(htmlAttributes) {
    const style = parseClassNames(htmlAttributes[CLASS_ATTRIBUTE]);
    const attributes = {};
    const events = {};
    Object.keys(htmlAttributes).forEach(function(key) {
        if (key === CLASS_ATTRIBUTE) {
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

function parseElement(name, htmlAttributes) {
    const attributes = parseAttributes(htmlAttributes);
    return {
        ...Element(name),
        ...attributes
    };
}

export default function() {
    let nodes = Stack();
    let tree;

    function appendChild(node) {
        const parent = nodes.peek();
        if (parent === undefined) {
            return;
        }
        parent.children.push(node);
    }

    function onopentag(name, attributes) {
        const node = parseElement(name, attributes);
        nodes.push(node);
    }

    function onclosetag() {
        const node = nodes.pop();
        appendChild(node);
        tree = node;
    }

    function ontext(text) {
        const node = parseText(text);
        if (node === undefined) {
            return;
        }
        appendChild(node);
    }

    const parseOptions = {
        lowerCaseTags: false,
        lowerCaseAttributeNames: false,
        recognizeSelfClosing: true
    };

    const parser = new htmlparser.Parser({ onopentag, ontext, onclosetag }, parseOptions);

    function parse(input) {
        parser.parseComplete(input);
        const result = tree;
        tree = undefined;
        return result;
    }

    return {
        parse
    };
};
