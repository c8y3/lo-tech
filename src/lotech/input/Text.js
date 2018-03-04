import Element from '/lotech/Element';

export default function(placeholder) {
    const node = document.createElement('input');
    node.type = 'text';
    node.placeholder = placeholder;
    return Element(node);
};
