import NodeGenerator from '/fragments/NodeGenerator';

const generator = NodeGenerator();

function generateChildren(children) {
    return children.map(generateNode);
}

function generateNode(htpl) {
    if (htpl.type === 'element') {
        const children = generateChildren(htpl.children);
        return generator.generateElement(htpl.tagName, htpl.attributes, children);
    }
    if (htpl.type === 'variable') {
        return generator.generateVariable(htpl.name);
    }
    if (htpl.type === 'text') {
        return generator.generateText(htpl.content);
    }
}

export default function() {
    return {
        generate(htpl) {
            const root = generateNode(htpl);
            return ['return lotech.Component(' + root + ');'];
        }
    };
}

