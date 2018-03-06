import Element from './Element';

export default function(text) {
    const node = document.createElement('span');
    node.textContent = text;
    return Element(node);
};
