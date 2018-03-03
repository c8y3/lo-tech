import Element from '/lotech/Element';

export default function(tagName) {
    const node = document.createElement(tagName);
    return Element(node);
};
