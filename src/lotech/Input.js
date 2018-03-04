import Element from './Element';

export default function(type) {
    const node = document.createElement('input');
    node.type = type;
    return Element(node);
};
