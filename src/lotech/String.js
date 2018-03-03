import Element from '/lotech/Element';

export default function(data) {
    const node = document.createTextNode(data);

    return Element(node);
};
